import { NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/utils/stripe/subscription';

export async function POST(req: NextRequest) {
  try {
    const { priceId, redirectUrl, userId } = await req.json();

    if (!priceId || !redirectUrl) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const session = await createCheckoutSession(priceId, redirectUrl, userId);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
} 