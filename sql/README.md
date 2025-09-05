# SQL Schema Evolution for CoreBrief

This folder contains the database schema and migration history for the CoreBrief application. This README documents the evolution of the signup process and provides context for future development.

## 🚨 Critical Context

**The Problem We Solved:** The signup form was failing with "database error saving new user" because of mismatches between:
1. Form fields vs database trigger function
2. Form dropdown values vs database constraints
3. Multiple incomplete migrations creating schema drift

## 📁 File Overview

### Core Schema Files

| File | Purpose | Status |
|------|---------|---------|
| `schema.sql` | **Original base schema** - Comprehensive user profiles with subscription support | ⚠️ Historical |
| `fix_signup_trigger.sql` | **CURRENT WORKING VERSION** - Matches actual signup form | ✅ Active |

### Migration History (Chronological Order)

1. **`migration_enhanced_signup.sql`** - Added extended professional fields
   - Added: `referral_code`, detailed investment profile fields
   - Status: ⚠️ Superseded (too many fields for actual form)

2. **`migration_privacy_compliance.sql`** - Added GDPR compliance
   - Added: `marketing_consent`, `cookie_consent`, privacy tracking
   - Status: ✅ Concepts integrated into final version

3. **`migration_waitlist.sql`** - Added waitlist functionality  
   - Added: `waitlist_status`, `waitlist_position`, waitlist requests table
   - Status: ✅ Concepts integrated into final version

4. **`migration_cleanup_signup.sql`** - Attempted to streamline
   - Removed unused fields, added terms tracking
   - Status: ⚠️ Incomplete (missing constraint fixes)

5. **`fix_signup_trigger.sql`** - Final working solution
   - Matches actual signup form exactly
   - Fixes constraint mismatches
   - Status: ✅ **CURRENT PRODUCTION VERSION**

### Debug/Utility Files

- `debug_signup_issue.sql` - Diagnostic queries for troubleshooting

## 🎯 Current Signup Form Fields

The signup form (`app/(auth)/sign-up/page.tsx`) currently collects:

### Required Fields
- `full_name` - User's complete name
- `email` - Professional email address  
- `password` - 8+ chars with complexity requirements
- `organization_type` - Dropdown with specific values (see below)
- `terms_agreement` - Must agree to terms (checkbox)
- `professional_use` - Must confirm professional use (checkbox)

### Optional Fields
- `organization_name` - Company/firm name
- `referral_source` - How they heard about CoreBrief
- `referral_code` - Optional referral code
- `marketing_consent` - Opt-in for marketing (checkbox)

### Organization Type Values

**Critical:** These values must match exactly between form and database constraint:

```typescript
// Form dropdown values (sign-up/page.tsx)
'individual_investor'    // "Individual Professional"  
'financial_advisor'      // "Financial Advisor"
'family_office'          // "Family Office"
'ria'                    // "RIA (Registered Investment Advisor)"
'asset_manager'          // "Asset Manager"  
'hedge_fund'             // "Hedge Fund"
'other'                  // "Other"
```

## 🔧 Database Trigger Function

The `handle_new_user()` trigger automatically creates a user profile when someone signs up via Supabase Auth. It:

1. Extracts data from `NEW.raw_user_meta_data` (sent by signup form)
2. Inserts into `user_profiles` table
3. Handles consent timestamps and defaults
4. Sets up communication preferences

## ⚠️ Common Pitfalls & How to Avoid Them

### 1. Form-Database Mismatch
**Problem:** Adding form fields without updating the database trigger
**Solution:** Always update both together and test signup flow

### 2. Constraint Violations  
**Problem:** Form dropdown values don't match database CHECK constraints
**Solution:** Keep organization_type values in sync between form and schema

### 3. Missing Columns
**Problem:** Trigger tries to insert into non-existent columns
**Solution:** Use `ADD COLUMN IF NOT EXISTS` in migrations

### 4. Test Data Pollution
**Problem:** Invalid test data prevents constraint updates
**Solution:** Clean up test data before applying new constraints

## 🚀 Future Development Guidelines

### When Adding New Signup Fields

1. **Update the form** (`app/(auth)/sign-up/page.tsx`)
2. **Add database column** (with `ADD COLUMN IF NOT EXISTS`)
3. **Update trigger function** (`handle_new_user()`)
4. **Update TypeScript types** (if applicable)
5. **Test signup flow** with different input combinations
6. **Update this README**

### When Modifying Organization Types

1. **Update form dropdown** values
2. **Update database constraint** (drop old, add new)
3. **Migrate existing data** if needed
4. **Update this documentation**

### Testing Checklist

After any schema changes, test:
- [ ] New user signup works
- [ ] All form fields are saved correctly  
- [ ] Different organization types work
- [ ] Consent checkboxes are tracked properly
- [ ] Email confirmation flow works

## 📊 Database Tables

### `user_profiles`
Main user data table that extends Supabase's `auth.users`

**Key columns for signup:**
- `full_name`, `email` - Basic info
- `organization_name`, `organization_type` - Professional info  
- `referral_source`, `referral_code` - Marketing tracking
- `marketing_consent`, `terms_agreement`, `professional_use` - Consent tracking
- `communication_preferences` - JSONB for structured preferences

### `waitlist_requests` (Optional)
Detailed waitlist tracking for users who want early access

### `privacy_requests` (Optional)  
GDPR compliance - tracks data export/deletion requests

## 🔍 Troubleshooting

### "Database error saving new user"

1. Check server logs for specific error message
2. Verify all form fields have corresponding database columns
3. Check organization_type constraint matches form values
4. Run diagnostic queries from `debug_signup_issue.sql`

### Constraint Violations

1. Check what values are in the database: `SELECT DISTINCT organization_type FROM user_profiles;`
2. Compare with form dropdown values
3. Update constraint or clean up data as needed

## 📝 Change Log

- **2024-01-XX:** Fixed signup database errors - form/schema mismatch resolved
- **2024-01-XX:** Added comprehensive documentation and troubleshooting guide
- **Previous:** Multiple migration attempts with schema drift issues

---

**⚡ Quick Reference:** If signup breaks, the problem is likely in `fix_signup_trigger.sql` - check that the trigger function handles all current form fields correctly.
