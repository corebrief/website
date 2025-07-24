# SaaS Starter with Stripe + Supabase

A full-featured SaaS starter with authentication, subscription billing, and access control—powered by **Stripe** and **Supabase**.

## Features

- 🔐 **Authentication** — Sign up, sign in, and manage users with Supabase Auth
- 💳 **Subscription Billing** — Stripe Checkout for subscription plans with webhooks
- 🔓 **Access Control** — Feature gating based on subscription status stored in Supabase
- 🗄️ **Database** — PostgreSQL with Supabase for user profiles and subscription data
- 🎨 **UI Components** — Built with Tailwind CSS and Radix UI
- 📱 **Responsive** — Mobile-first design
- 🚀 **Production Ready** — Optimized for deployment

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe Checkout & Billing
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Language**: TypeScript

## Quick Start

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the environment variables:

```bash
cp .env.example .env.local
```

Fill in your environment variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Set up the database

Run the SQL schema in your Supabase dashboard:

```bash
# Apply the schema from sql/schema.sql in Supabase SQL Editor
```

### 5. Configure Stripe

1. Create products and prices in your Stripe dashboard
2. Set up a webhook endpoint pointing to `/api/stripe-webhook`
3. Configure webhook events: `customer.created`, `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_*`

### 6. Sync Stripe products to Supabase

```bash
# You can create an admin script or use the syncStripeProducts function
```

### 7. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   │   ├── stripe-webhook/    # Stripe webhook handler
│   │   ├── create-checkout-session/  # Checkout session creation
│   │   └── manage-subscription/      # Subscription management
│   ├── protected/         # Protected pages requiring auth
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
├── utils/                 # Utility functions
│   ├── stripe/           # Stripe utilities
│   └── supabase/         # Supabase utilities and entitlements
├── sql/                  # Database schema
└── README.md
```

## Key Features

### 🔓 **Access Control**
- Check user entitlements with `checkEntitlement("premium")`
- Store subscription status in Supabase user profiles
- Automatic access updates via Stripe webhooks

### 💳 **Subscription Management**
- Stripe Checkout integration for subscription sign-up
- Cancel/reactivate subscriptions
- Handle payment failures and subscription updates
- Support for multiple pricing plans and intervals

### 🔐 **Authentication Flow**
- Supabase Auth for secure user management
- Automatic user profile creation on sign-up
- Session management with middleware

### 📊 **Database Schema**
- User profiles with subscription data
- Products and pricing from Stripe
- Entitlements and access control
- Row Level Security (RLS) policies

## API Routes

- `POST /api/stripe-webhook` - Handle Stripe webhook events
- `POST /api/create-checkout-session` - Create Stripe checkout sessions
- `POST /api/manage-subscription` - Cancel/reactivate subscriptions
- `POST /api/generator` - Example protected API endpoint

## Deployment

### Environment Variables

Ensure all environment variables are set in your production environment:

- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Stripe: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
- App: `NEXT_PUBLIC_APP_URL`

### Webhook Configuration

Configure your Stripe webhook endpoint to point to your deployed application:
`https://your-domain.com/api/stripe-webhook`

## License

MIT License - see [LICENSE](LICENSE) for details.
