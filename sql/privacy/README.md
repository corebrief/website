# Privacy Management SQL Templates

This folder contains SQL templates for manually processing privacy requests in compliance with data protection regulations.

## Files Overview

### `migration_privacy_compliance.sql`
- **Purpose**: Database migration to add privacy-related tables and columns
- **When to run**: Once, when setting up privacy features
- **Contains**: `privacy_requests` table, RLS policies, privacy columns

### `admin_queries.sql`
- **Purpose**: Daily queries for reviewing pending privacy requests
- **When to use**: Check regularly for new requests
- **Contains**: View pending deletions, exports, user details

### `deletion_workflow.sql`
- **Purpose**: Step-by-step account deletion process
- **When to use**: When processing account deletion requests
- **Contains**: 6-step deletion workflow with verification



## Manual Workflow Process

### For Account Deletions:
1. Run queries from `admin_queries.sql` to find pending deletions
2. Follow the 6-step process in `deletion_workflow.sql`
3. Send manual confirmation email to user
4. Keep privacy_requests record for audit trail

### For Data Exports:
✅ **Fully Automated** - Users click "Download My Data" button and get instant JSON download. No admin intervention needed!

## Important Notes

⚠️ **Always test queries on staging first**
⚠️ **Replace placeholder values** (USER_ID_HERE, REQUEST_ID_HERE, etc.)
⚠️ **Keep audit trail** - don't delete privacy_requests records
⚠️ **Verify deletions** using the verification queries

## Email Templates

The deletion workflow includes email templates for manual sending. Copy and customize these templates when responding to users.

## Compliance Notes

- **GDPR**: Users have right to deletion and data portability
- **CCPA**: Users have right to know what data we collect and delete it
- **Audit Trail**: Keep privacy_requests table for compliance records
- **Response Time**: Process requests within 30 days (sooner is better)

## Getting Help

For questions about these workflows, contact the development team or review the privacy policy at `/privacy`. 