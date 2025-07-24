import { stripe } from './client';
import { createSupabaseClient } from '@/utils/supabase/server';
import Stripe from 'stripe';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  prices: PriceWithProduct[];
}

export interface PriceWithProduct {
  id: string;
  product_id: string;
  currency: string;
  unit_amount: number | null;
  interval_type: 'month' | 'year' | 'one_time';
  interval_count: number;
  active: boolean;
}

export interface Subscription {
  id: string;
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  price: {
    id: string;
    unit_amount: number;
    currency: string;
    interval: string;
  };
  product: {
    id: string;
    name: string;
    description: string;
  };
}

export async function createCheckoutSession(
  priceId: string,
  redirectUrl: string,
  userId?: string
): Promise<{ url: string }> {
  const supabase = await createSupabaseClient();
  let customerId: string | undefined;

  if (userId) {
    // Get user profile to find existing Stripe customer ID
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('stripe_customer_id, email')
      .eq('id', userId)
      .single();

    if (profile?.stripe_customer_id) {
      customerId = profile.stripe_customer_id;
    } else if (profile?.email) {
      // Create new Stripe customer
      const customer = await stripe.customers.create({
        email: profile.email,
        metadata: {
          supabase_user_id: userId,
        },
      });
      customerId = customer.id;

      // Update user profile with customer ID
      await supabase
        .from('user_profiles')
        .update({ stripe_customer_id: customer.id })
        .eq('id', userId);
    }
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: redirectUrl,
    cancel_url: redirectUrl,
    customer: customerId,
    allow_promotion_codes: true,
  });

  if (!session.url) {
    throw new Error('Failed to create checkout session');
  }

  return { url: session.url };
}

export async function getProducts(): Promise<Product[]> {
  const supabase = await createSupabaseClient();
  
  const { data: products, error } = await supabase
    .from('subscription_products')
    .select(`
      *,
      subscription_prices (*)
    `)
    .eq('active', true);

  if (error) {
    throw error;
  }

  return products.map((product: any) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    active: product.active,
    prices: product.subscription_prices?.map((price: any) => ({
      id: price.id,
      product_id: price.product_id,
      currency: price.currency,
      unit_amount: price.unit_amount,
      interval_type: price.interval_type,
      interval_count: price.interval_count,
      active: price.active,
    })) || [],
  }));
}

export async function syncStripeProducts(): Promise<void> {
  const supabase = await createSupabaseClient();
  
  // Fetch products from Stripe
  const stripeProducts = await stripe.products.list({ active: true });
  const stripePrices = await stripe.prices.list({ active: true });

  for (const product of stripeProducts.data) {
    // Sync product to Supabase
    await supabase
      .from('subscription_products')
      .upsert({
        id: product.id,
        stripe_product_id: product.id,
        name: product.name,
        description: product.description,
        active: product.active,
      });

    // Sync prices for this product
    const productPrices = stripePrices.data.filter(
      price => price.product === product.id
    );

    for (const price of productPrices) {
      let intervalType: 'month' | 'year' | 'one_time' = 'one_time';
      
      if (price.recurring) {
        intervalType = price.recurring.interval === 'year' ? 'year' : 'month';
      }

      await supabase
        .from('subscription_prices')
        .upsert({
          id: price.id,
          stripe_price_id: price.id,
          product_id: product.id,
          currency: price.currency,
          unit_amount: price.unit_amount,
          interval_type: intervalType,
          interval_count: price.recurring?.interval_count || 1,
          active: price.active,
        });
    }
  }
}

export async function getUserSubscriptions(userId: string): Promise<Subscription[]> {
  const supabase = await createSupabaseClient();
  
  const { data: profile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !profile?.stripe_customer_id) {
    return [];
  }

  // Get subscriptions from Stripe
  const subscriptions = await stripe.subscriptions.list({
    customer: profile.stripe_customer_id,
    status: 'all',
  });

  const result: Subscription[] = [];

  for (const sub of subscriptions.data) {
    const price = sub.items.data[0]?.price;
    const product = await stripe.products.retrieve(price.product as string);

    result.push({
      id: sub.id,
      status: sub.status,
      current_period_start: new Date(sub.current_period_start * 1000).toISOString(),
      current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
      cancel_at_period_end: sub.cancel_at_period_end,
      price: {
        id: price.id,
        unit_amount: price.unit_amount || 0,
        currency: price.currency,
        interval: price.recurring?.interval || 'month',
      },
      product: {
        id: product.id,
        name: product.name,
        description: product.description || '',
      },
    });
  }

  return result;
}

export async function cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });
}

export async function reactivateSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
  return await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: false,
  });
} 