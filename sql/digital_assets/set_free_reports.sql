-- Set specific company analyses as free reports
-- This script updates the is_free flag for specified ticker + years_range combinations
-- Run this in Supabase SQL Editor

-- Update specific reports to be free
UPDATE company_analyses 
SET is_free = true, updated_at = NOW()
WHERE (ticker, years_range) IN (
    ('PLD', '2021-2025'),
    ('ET', '2021-2025'),
    ('NVDA', '2021-2025')
);

-- Verify the updates
SELECT 
    ticker,
    years_range,
    is_free,
    updated_at,
    CASE 
        WHEN is_free THEN '✅ FREE'
        ELSE '💰 PAID'
    END as status
FROM company_analyses 
WHERE (ticker, years_range) IN (
    ('PLD', '2021-2025'),
    ('ET', '2021-2025'),
    ('NVDA', '2021-2025')
)
ORDER BY ticker;

-- Optional: Show summary of all free reports
SELECT 
    'Summary: Free Reports' as info,
    COUNT(*) as total_free_reports
FROM company_analyses 
WHERE is_free = true;

-- Optional: List all free reports
SELECT 
    ticker,
    years_range,
    generated_at,
    'FREE REPORT' as status
FROM company_analyses 
WHERE is_free = true
ORDER BY ticker, years_range;
