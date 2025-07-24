# Migration Guide: Update Labs → Stripe + Supabase

This guide documents the migration from Update Labs' hosted billing system to a self-hosted solution using Stripe for payments and Supabase for data storage and entitlements.

## Overview of Changes

### Before (Update Labs)
- Used `@updatedev/js` SDK for billing and entitlements
- Entitlements checked via `client.entitlements.check()`
- Subscription management through Update's API
- Billing handled by Update's hosted system

### After (Stripe + Supabase)
- Direct Stripe integration for billing
- Entitlements stored and checked in Supabase
- Webhook-driven subscription status updates
- Full control over billing and access logic

## Key Changes Made

### 1. Database Schema
**New file:** `sql/schema.sql`
- Added `user_profiles` table with subscription fields
- Added `subscription_products` and `subscription_prices` tables
- Implemented Row Level Security (RLS) policies
- Created triggers for automatic user profile creation

### 2. Stripe Integration
**New files:**
- `utils/stripe/client.ts` - Stripe client configuration
- `utils/stripe/subscription.ts` - Subscription management utilities
- `app/api/stripe-webhook/route.ts` - Webhook handler
- `app/api/create-checkout-session/route.ts` - Checkout creation
- `app/api/manage-subscription/route.ts` - Subscription management

### 3. Entitlements System
**New file:** `utils/supabase/entitlements.ts`
- `checkEntitlement()` function replaces Update Labs' entitlements API
- User profile management functions
- Direct Supabase queries for access control

### 4. Updated Components
**Modified files:**
- `components/pricing-card.tsx` - Uses Stripe checkout instead of Update
- `components/subcription-actions.tsx` - Calls new API endpoints
- `components/pricing-content.tsx` - Updated types and interfaces
- `app/protected/*/page.tsx` - Uses new entitlements system

### 5. Removed Dependencies
**Deleted files:**
- `utils/update/client.ts`
- `utils/update/server.ts`
- Removed `@updatedev/js` from `package.json`

## Migration Steps

### 1. Set Up Database
1. Run the SQL schema in your Supabase project
2. Verify tables and policies are created correctly

### 2. Configure Stripe
1. Create products and prices in Stripe dashboard
2. Set up webhook endpoint: `your-domain.com/api/stripe-webhook`
3. Configure webhook events:
   - `customer.created`
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### 3. Environment Variables
Update your environment variables:

```env
# Remove Update Labs variables
# NEXT_PUBLIC_UPDATE_PUBLIC_KEY=... (remove)

# Add Stripe variables
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 4. Sync Products (Optional)
Use the `syncStripeProducts()` function to populate your Supabase tables with Stripe product data.

### 5. Test the Migration
1. Create test subscription
2. Verify entitlements work correctly
3. Test subscription cancellation/reactivation
4. Confirm webhook processing

## API Changes

### Entitlements Check
```typescript
// Before (Update Labs)
const client = await createUpdateClient();
const { data, error } = await client.entitlements.check("premium");

// After (Supabase)
const { data, error } = await checkEntitlement("premium");
```

### Subscription Management
```typescript
// Before (Update Labs)
await client.billing.updateSubscription(id, { cancel_at_period_end: true });

// After (Stripe API)
await fetch('/api/manage-subscription', {
  method: 'POST',
  body: JSON.stringify({ subscriptionId: id, action: 'cancel' })
});
```

### Checkout Creation
```typescript
// Before (Update Labs)
const { data } = await client.billing.createCheckoutSession(priceId, { redirect_url });

// After (Stripe API)
const response = await fetch('/api/create-checkout-session', {
  method: 'POST',
  body: JSON.stringify({ priceId, redirectUrl, userId })
});
```

## Benefits of Migration

### Full Control
- Complete ownership of billing and user data
- Customizable entitlements logic
- Direct Stripe relationship and pricing

### Reduced Dependencies
- No third-party billing service dependency
- Simplified tech stack
- Better debugging and monitoring capabilities

### Cost Efficiency
- No middleman fees from Update Labs
- Direct Stripe pricing (2.9% + 30¢)
- Scalable pricing model

### Flexibility
- Custom subscription logic
- Enhanced user experience
- Better integration with existing systems

## Troubleshooting

### Common Issues

1. **Webhook Not Receiving Events**
   - Verify webhook URL is accessible
   - Check Stripe webhook secret
   - Ensure proper event types are selected

2. **Entitlements Not Updating**
   - Check webhook processing logs
   - Verify Supabase table permissions
   - Ensure user profiles exist

3. **Checkout Session Errors**
   - Confirm Stripe keys are correct
   - Verify product/price IDs exist
   - Check user authentication

### Rollback Plan
If needed, you can temporarily revert by:
1. Restoring Update Labs dependencies
2. Re-adding deleted utility files
3. Reverting component changes

However, ensure your Stripe products are properly set up before fully committing to the new system.

## Support

If you encounter issues during migration:
1. Check the logs for webhook processing
2. Verify Stripe dashboard for event delivery
3. Test entitlements with different user states
4. Ensure database schema is properly applied 