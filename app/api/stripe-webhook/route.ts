import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/utils/stripe/client';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', (err as Error).message);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Use service role client to bypass RLS for webhook operations
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // Service role key bypasses RLS
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );

  try {
    switch (event.type) {
      case 'customer.created': {
        const customer = event.data.object as Stripe.Customer;
        // Update user profile with Stripe customer ID
        if (customer.email) {
          await supabase
            .from('user_profiles')
            .update({ stripe_customer_id: customer.id })
            .eq('email', customer.email);
        }
        break;
      }

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        
        if (session.mode === 'subscription' && session.subscription) {
          // Retrieve the subscription details
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          await updateUserSubscription(supabase, subscription);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription;
        await updateUserSubscription(supabase, subscription);
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        
        // Update user profile to remove subscription
        await supabase
          .from('user_profiles')
          .update({
            subscription_id: null,
            subscription_status: 'canceled',
            subscription_plan_id: null,
            subscription_current_period_start: null,
            subscription_current_period_end: null,
            subscription_cancel_at_period_end: false,
            has_paid: false,
            entitlements: {}
          })
          .eq('stripe_customer_id', subscription.customer as string);
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          // Ensure user has access when payment succeeds
          await supabase
            .from('user_profiles')
            .update({
              has_paid: true,
              entitlements: { premium: true }
            })
            .eq('stripe_customer_id', invoice.customer as string);
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        
        if (invoice.subscription) {
          // Remove access when payment fails
          await supabase
            .from('user_profiles')
            .update({
              has_paid: false,
              entitlements: {}
            })
            .eq('stripe_customer_id', invoice.customer as string);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}

async function updateUserSubscription(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabase: SupabaseClient<any, 'public', any>,
  subscription: Stripe.Subscription
) {
  const customerId = subscription.customer as string;
  const priceId = subscription.items.data[0]?.price.id;

  // Determine entitlements based on subscription status and product
  const hasAccess = subscription.status === 'active' || subscription.status === 'trialing';
  const entitlements = hasAccess ? { premium: true } : {};

  await supabase
    .from('user_profiles')
    .update({
      subscription_id: subscription.id,
      subscription_status: subscription.status,
      subscription_plan_id: priceId,
      subscription_current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      subscription_current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      subscription_cancel_at_period_end: subscription.cancel_at_period_end,
      has_paid: hasAccess,
      entitlements: entitlements
    })
    .eq('stripe_customer_id', customerId);
} 