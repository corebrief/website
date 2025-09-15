import { createSupabaseClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const supabase = await createSupabaseClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const ticker = searchParams.get('ticker');
    const reportType = searchParams.get('type'); // 'general', 'reit', 'mlp', or 'all'
    const accessType = searchParams.get('access'); // 'free', 'purchased', or 'all'

    // Build the query using the user_accessible_analyses view
    let query = supabase
      .from('user_accessible_analyses')
      .select(`
        ticker,
        years_range,
        multi_year_analysis,
        management_credibility,
        predictive_inference,
        business_assessment,
        analysis_metadata,
        years_used,
        analysis_years,
        model_used,
        generated_at,
        is_free,
        created_at,
        updated_at,
        has_access
      `);

    // Filter by ticker if specified
    if (ticker) {
      query = query.eq('ticker', ticker.toUpperCase());
    }

    // Filter by access type
    if (accessType === 'free') {
      query = query.eq('is_free', true);
    } else if (accessType === 'purchased') {
      query = query.eq('has_access', true).eq('is_free', false);
    } else if (accessType === 'all') {
      // Show all reports user has access to (free + purchased)
      query = query.eq('has_access', true);
    }

    const { data: reports, error: reportsError } = await query.order('updated_at', { ascending: false });

    if (reportsError) {
      console.error('Error fetching reports:', reportsError);
      return NextResponse.json({ error: 'Failed to fetch reports' }, { status: 500 });
    }

    // Classify reports by type (REIT, MLP, or General)
    const classifiedReports = await Promise.all(
      (reports || []).map(async (report) => {
        // Check if ticker is a REIT
        const { data: isReit } = await supabase
          .from('reits')
          .select('ticker')
          .eq('ticker', report.ticker)
          .single();

        // Check if ticker is an MLP
        const { data: isMlp } = await supabase
          .from('mlps')
          .select('ticker')
          .eq('ticker', report.ticker)
          .single();

        let classification = 'general';
        if (isReit) {
          classification = 'reit';
        } else if (isMlp) {
          classification = 'mlp';
        }

        return {
          ...report,
          classification,
        };
      })
    );

    // Filter by report type if specified
    const filteredReports = reportType && reportType !== 'all' 
      ? classifiedReports.filter(report => report.classification === reportType)
      : classifiedReports;

    return NextResponse.json({
      reports: filteredReports,
      total: filteredReports.length,
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
