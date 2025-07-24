-- ================================================
-- ACCOUNT DELETION WORKFLOW
-- Step-by-step process for manually deleting accounts
-- ================================================

-- STEP 1: MARK REQUEST AS PROCESSING
-- Replace 'REQUEST_ID_HERE' with the actual request ID
-- Replace 'ADMIN_USER_ID_HERE' with your admin user ID
UPDATE privacy_requests 
SET 
  status = 'processing',
  completed_by = 'ADMIN_USER_ID_HERE',
  notes = CONCAT(COALESCE(notes, ''), ' | Started processing: ', NOW()::text)
WHERE id = 'REQUEST_ID_HERE';

-- STEP 2: VERIFY USER DATA BEFORE DELETION
-- Replace 'USER_ID_HERE' with the user ID from the deletion request
SELECT 
  'Confirming user data before deletion' as action,
  u.email,
  up.first_name,
  up.last_name,
  up.company_name,
  u.created_at
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.id
WHERE u.id = 'USER_ID_HERE';

-- STEP 3: EXPORT USER DATA (OPTIONAL - FOR COMPLIANCE)
-- Run this if you need to keep a backup for legal purposes
SELECT 
  row_to_json(t) as user_data_backup
FROM (
  SELECT 
    u.id,
    u.email,
    u.created_at,
    up.*,
    ARRAY(
      SELECT row_to_json(pr) 
      FROM privacy_requests pr 
      WHERE pr.user_id = u.id
    ) as privacy_requests
  FROM auth.users u
  LEFT JOIN user_profiles up ON u.id = up.id
  WHERE u.id = 'USER_ID_HERE'
) t;

-- STEP 4: DELETE USER DATA (CASCADING)
-- Replace 'USER_ID_HERE' with the actual user ID
-- This will cascade delete related records due to foreign key constraints

-- Delete user profile first
DELETE FROM user_profiles WHERE id = 'USER_ID_HERE';

-- Delete waitlist requests
DELETE FROM waitlist_requests WHERE user_id = 'USER_ID_HERE';

-- The privacy_requests will remain for audit trail (they reference the user but don't prevent deletion)

-- Finally, delete the auth user (this cascades to any remaining references)
DELETE FROM auth.users WHERE id = 'USER_ID_HERE';

-- STEP 5: MARK REQUEST AS COMPLETED
-- Replace 'REQUEST_ID_HERE' with the actual request ID
UPDATE privacy_requests 
SET 
  status = 'completed',
  completed_at = NOW(),
  notes = CONCAT(COALESCE(notes, ''), ' | Deletion completed: ', NOW()::text)
WHERE id = 'REQUEST_ID_HERE';

-- STEP 6: VERIFY DELETION WAS SUCCESSFUL
-- Replace 'USER_ID_HERE' with the user ID that was deleted
-- This should return 0 rows if deletion was successful
SELECT 
  'user_profiles' as table_name, COUNT(*) as remaining_records
FROM user_profiles WHERE id = 'USER_ID_HERE'
UNION ALL
SELECT 
  'auth.users' as table_name, COUNT(*) as remaining_records
FROM auth.users WHERE id = 'USER_ID_HERE'
UNION ALL
SELECT 
  'waitlist_requests' as table_name, COUNT(*) as remaining_records
FROM waitlist_requests WHERE user_id = 'USER_ID_HERE';

-- OPTIONAL: SEND MANUAL CONFIRMATION EMAIL
-- Copy this template and send via your email client:
/*
Subject: Account Deletion Confirmation - CoreBrief

Dear [User Name],

Your CoreBrief account has been permanently deleted as requested on [Request Date].

All personal data associated with your account has been removed from our systems, including:
- Profile information
- Account preferences
- Waitlist requests
- Communication history

This deletion is permanent and cannot be undone.

If you have any questions about this process, please contact us at privacy@corebrief.ai.

Best regards,
CoreBrief Team
*/ 