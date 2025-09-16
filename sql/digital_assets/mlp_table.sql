-- Simple MLPs List
-- Just a list of tickers that are Master Limited Partnerships (MLPs) - nothing fancy
-- Run this in Supabase SQL Editor

-- Create simple MLPs table
CREATE TABLE IF NOT EXISTS mlps (
    ticker VARCHAR(10) PRIMARY KEY
);

-- Insert MLP tickers (ordered and restricted to provided list)
INSERT INTO mlps (ticker) VALUES
    ('WMB'),
    ('ENB'),
    ('KMI'),
    ('OKE'),
    ('TRP'),
    ('LNG'),
    ('DTM'),
    ('PBA'),
    ('EPD'),
    ('MPLX'),
    ('WES'),
    ('ET'),
    ('PAA'),
    ('TRGP'),
    ('AM'),
    ('SOBO'),
    ('AROC'),
    ('HESM'),
    ('PAGP'),
    ('CQP'),
    ('KNTK'),
    ('NEXT'),
    ('DKL'),
    ('NFE')
ON CONFLICT (ticker) DO NOTHING;
