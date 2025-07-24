-- ================================================
-- PRIVACY REQUEST ADMIN QUERIES
-- Templates for manual privacy request management
-- ================================================

-- 1. VIEW PENDING DELETION REQUESTS
-- Run this daily to check for new deletion requests
SELECT 
  pr.id as request_id,
  pr.created_at,
  u.email,
  up.first_name,
  up.last_name,
  up.company_name,
  pr.request_details->>'reason' as deletion_reason,
  pr.status,
  pr.notes
FROM privacy_requests pr
JOIN auth.users u ON pr.user_id = u.id
LEFT JOIN user_profiles up ON pr.user_id = up.id
WHERE pr.request_type = 'data_deletion' 
  AND pr.status = 'pending'
ORDER BY pr.created_at DESC;

-- 2. VIEW ALL PRIVACY REQUESTS (LAST 30 DAYS)
SELECT 
  pr.id as request_id,
  pr.created_at,
  u.email,
  pr.request_type,
  pr.status,
  pr.completed_at,
  pr.notes
FROM privacy_requests pr
JOIN auth.users u ON pr.user_id = u.id
WHERE pr.created_at >= NOW() - INTERVAL '30 days'
ORDER BY pr.created_at DESC;

-- 3. GET DETAILED USER INFO FOR DELETION
-- Replace 'USER_ID_HERE' with actual user ID from deletion request
SELECT 
  u.id,
  u.email,
  u.created_at as account_created,
  up.*,
  (SELECT COUNT(*) FROM privacy_requests WHERE user_id = u.id) as total_privacy_requests
FROM auth.users u
LEFT JOIN user_profiles up ON u.id = up.id
WHERE u.id = 'USER_ID_HERE';

-- 4. CHECK FOR RELATED DATA BEFORE DELETION
-- Replace 'USER_ID_HERE' with actual user ID
SELECT 
  'user_profiles' as table_name, COUNT(*) as record_count
FROM user_profiles WHERE id = 'USER_ID_HERE'
UNION ALL
SELECT 
  'privacy_requests' as table_name, COUNT(*) as record_count
FROM privacy_requests WHERE user_id = 'USER_ID_HERE'
UNION ALL
SELECT 
  'waitlist_requests' as table_name, COUNT(*) as record_count
FROM waitlist_requests WHERE user_id = 'USER_ID_HERE'; 