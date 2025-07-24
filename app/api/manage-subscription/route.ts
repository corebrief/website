import { NextRequest, NextResponse } from 'next/server';
import { cancelSubscription, reactivateSubscription } from '@/utils/stripe/subscription';

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId, action } = await req.json();

    if (!subscriptionId || !action) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    let result;

    switch (action) {
      case 'cancel':
        result = await cancelSubscription(subscriptionId);
        break;
      case 'reactivate':
        result = await reactivateSubscription(subscriptionId);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ subscription: result });
  } catch (error) {
    console.error('Error managing subscription:', error);
    return NextResponse.json(
      { error: 'Failed to manage subscription' },
      { status: 500 }
    );
  }
} 