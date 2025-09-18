'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Building2, 
  TrendingUp, 
  Shield, 
  Brain, 
  Eye,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronRight,
  Zap,
  DollarSign,
  Home,
  MapPin
} from 'lucide-react';

// Type definitions based on REIT schemas
interface REITMultiYearData {
  company: string;
  window: {
    start_fy: number;
    end_fy: number;
    num_years: number;
  };
  coverage: {
    years_received: number[];
    notes: string[];
  };
  semantic_themes: {
    same_store_noi_trend: {
      label: string;
      persistence_years: number;
      rationale: string;
    };
    occupancy_trend: {
      label: string;
      average_occupancy_pct?: number;
      rationale: string;
    };
    leasing_economics: {
      rent_spread_trend: string;
      escalators_presence: string;
      notes: string;
    };
    lease_profile: {
      walt_years?: number;
      expiry_buckets: {
        next_12m_pct?: number;
        next_36m_pct?: number;
        next_60m_pct?: number;
      };
      releasing_risk_label: string;
    };
    tenant_concentration: {
      top_tenant_pct_rent?: number;
      investment_grade_exposure_label: string;
      concentration_label: string;
      notes: string;
    };
    property_type_mix: Array<{
      type: string;
      approx_share_label: string;
    }>;
    geography_mix: Array<{
      region_or_market: string;
      approx_share_label: string;
    }>;
    competitive_posture: {
      label: string;
      drivers: string[];
    };
    external_growth: {
      activity_label: string;
      modes: string[];
      discipline_note: string;
    };
    balance_sheet_liquidity: {
      leverage_label: string;
      liquidity_comment: string;
      rate_exposure_label: string;
    };
    risk_register: Array<{
      name: string;
      recurrence_years: number[];
      severity: string;
      note: string;
    }>;
  };
  scores: {
    portfolio_quality_occupancy: number;
    same_store_noi_trend: number;
    affo_stability_payout: number;
    balance_sheet_liquidity: number;
    lease_maturity_concentration_risk: number;
    tenant_industry_diversification: number;
    external_growth_discipline: number;
    risk_overhangs: number;
    composite_score: number;
  };
  grading: {
    letter: string;
    mapping_note: string;
  };
  distribution_analysis: {
    applies: boolean;
    cadence?: string;
    policy_characterization: string;
    sustainability_signals: {
      affo_coverage: string;
      ffo_coverage: string;
      policy_consistency: string;
      management_commitment: string;
    };
    coverage_metrics: {
      affo_payout_ratio_bucket: string;
      ffo_payout_ratio_bucket: string;
      coverage_trend: string;
    };
  };
  ui_summaries: {
    one_liner: string;
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
    disclaimer: string;
  };
}

interface REITManagementData {
  company: string;
  window: {
    start_fy: number;
    end_fy: number;
    num_years: number;
  };
  credibility_assessment: {
    commitment_followthrough: Array<{
      commitment_year: number;
      commitment_type: string;
      commitment: string;
      outcome_label: string;
      rationale: string;
    }>;
    tone_profile: {
      tone_balance_label: string;
      superlative_frequency_label: string;
      guidance_style_label: string;
      change_in_tone_label: string;
      notes: string;
    };
    disclosure_hygiene: {
      nareit_ffo_definition_clarity: string;
      affo_definition_stability: string;
      reconciliation_quality: string;
      same_store_cohort_integrity: string;
    };
    red_flags: string[];
    green_flags: string[];
  };
  scores: {
    promise_follow_through: number;
    tone_discipline: number;
    disclosure_hygiene: number;
    risk_candor: number;
    strategic_coherence: number;
    capital_allocation_consistency: number;
    composite_score: number;
    credibility_tier: string;
  };
  ui_summaries: {
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
  };
}

interface REITPredictiveData {
  company: string;
  window: {
    start_fy: number;
    end_fy: number;
    num_years: number;
  };
  horizon_selection: {
    type: string;
    length: number;
    reason: string;
  };
  scenarios: Array<{
    name: string;
    outcomes: {
      ssnoi: string;
      occupancy: string;
      leasing_spreads: string;
      affo: string;
      distribution_trajectory: string;
      coverage_direction: string;
      leverage: string;
      releasing_risk: string;
    };
    key_drivers: string[];
    leading_indicators: string[];
    falsifiers: string[];
    confidence: number;
  }>;
  distribution_forward_analysis: {
    applies: boolean;
    base_outlook: string;
    sustainability_drivers: {
      affo_trajectory: string;
      coverage_trend: string;
      capital_allocation_priority: string;
    };
    reit_specific_factors: {
      payout_ratio_sustainability: string;
      tax_distribution_pressure: string;
    };
  };
  ui_summaries: {
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
  };
}

interface REITThesisData {
  company: string;
  window: {
    start_fy: number;
    end_fy: number;
    num_years: number;
  };
  coverage: {
    years_received: number[];
    source_versions: {
      multi_year: string;
      management: string;
      predictive: string;
    };
    warnings: string[];
  };
  consensus_map: {
    aligned_themes: string[];
    tensions: Array<{
      topic: string;
      positions: {
        multi_year: string;
        management: string;
        predictive: string;
      };
      diagnosis: string;
    }>;
    missing_info: string[];
  };
  reit_thesis: {
    thesis_statement: string;
    portfolio_engine: {
      noi_drivers: string[];
      constraints: string[];
    };
    value_creation_drivers: string[];
    fragilities: string[];
    capital_allocation_model: {
      development_discipline: string;
      acquisition_selectivity: string;
      capital_recycling: string;
      distribution_sustainability: string;
      notes: string;
    };
  };
  viability_assessment: {
    tier: string;
    subscores: {
      portfolio_durability: number;
      execution_quality: number;
      financial_resilience: number;
      risk_balance: number;
      governance_quality: number;
    };
    weights: number[];
    composite: number;
    rationale: string;
  };
  agreement: {
    alignment_score: number;
    areas_of_agreement: string[];
    areas_of_divergence: string[];
  };
  scenarios_bridge: {
    base_path: string;
    upside_falsifiers: string[];
    downside_falsifiers: string[];
  };
  watchlist: {
    leading_indicators: string[];
    early_warnings: string[];
    data_gaps: string[];
  };
  transition_triggers: Array<{
    event: string;
    interpretation: string;
    expected_effect: string;
    thesis_update_rule: string;
  }>;
  contribution_breakdown: {
    weights: {
      multi_year: number;
      management: number;
      predictive: number;
    };
    components: {
      MY_comp: number;
      MG_comp: number;
      PR_comp: number;
    };
    viability_composite: number;
    notes: string;
  };
  one_liner: string;
  synopsis: string;
  disclaimer: string;
  version: string;
}

import { type ParsedReport } from '@/utils/report-parsers';

interface REITReportProps {
  report: ParsedReport;
}

interface REITMultiYearDataProps {
  multiYearData: REITMultiYearData | null;
  managementData: REITManagementData | null;
  predictiveData: REITPredictiveData | null;
  thesisData: REITThesisData | null;
}

type SectionKey = 'multi_year' | 'management' | 'predictive' | 'thesis';

function REITEquityReportContent({ 
  multiYearData, 
  managementData, 
  predictiveData, 
  thesisData 
}: REITMultiYearDataProps) {
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(new Set());
  const [showAnalyticalTensions, setShowAnalyticalTensions] = useState(false);
  const [showThesisUpdateTriggers, setShowThesisUpdateTriggers] = useState(false);

  // Early return if no data
  if (!multiYearData && !managementData && !predictiveData && !thesisData) {
    return (
      <div className="w-full space-y-8">
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800">
              No REIT analysis data available. Please generate a report first.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const toggleSection = (section: SectionKey) => {
    if (expandedSections.has(section)) {
      setExpandedSections(new Set());
    } else {
      setExpandedSections(new Set([section]));
    }
  };

  // Helper functions for styling
  const getGradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'bg-green-500 text-white';
    if (grade?.startsWith('B')) return 'bg-blue-500 text-white';
    if (grade?.startsWith('C')) return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getCredibilityTierColor = (tier: string) => {
    if (tier === 'High') return 'bg-green-500 text-white';
    if (tier === 'Medium') return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getViabilityColor = (tier: string) => {
    if (tier === 'VeryStrong' || tier === 'Strong') return 'bg-green-500 text-white';
    if (tier === 'Adequate') return 'bg-yellow-500 text-white';
    return 'bg-red-500 text-white';
  };

  const getTrendColor = (trend: string) => {
    if (trend?.includes('Up') || trend?.includes('Positive') || trend?.includes('Strong')) return 'bg-green-100 text-green-800';
    if (trend?.includes('Down') || trend?.includes('Negative') || trend?.includes('Weak')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="w-full space-y-8">
      {/* Mobile-Responsive Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 mb-4">
        <div className="py-3 px-4">
          {/* Title - Always on top */}
          <div className="text-center lg:text-left mb-3 lg:mb-0">
            <h2 className="text-base font-semibold text-slate-800">REIT Analysis Framework</h2>
            <div className="text-xs text-slate-500">
              {multiYearData?.window?.num_years || 5} Years • Filing Year {multiYearData?.window?.start_fy || 'XXXX'}–{multiYearData?.window?.end_fy || 'XXXX'}
            </div>
          </div>
          
          {/* Desktop: Horizontal Layout */}
          <div className="hidden lg:flex items-center justify-end gap-2">
            <button 
              className={`px-3 py-2 text-xs rounded-md border transition-all duration-200 ${
                expandedSections.has('multi_year') 
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 hover:shadow-sm'
              }`}
              onClick={() => toggleSection('multi_year')}
            >
              <div className="text-center">
                <div className="font-medium">Multi-Year Analysis</div>
                {!expandedSections.has('multi_year') && <div className="text-[10px] opacity-75 mt-0.5">Click to View</div>}
              </div>
            </button>
            <button 
              className={`px-3 py-2 text-xs rounded-md border transition-all duration-200 ${
                expandedSections.has('management') 
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:shadow-sm'
              }`}
              onClick={() => toggleSection('management')}
            >
              <div className="text-center">
                <div className="font-medium">Management Assessment</div>
                {!expandedSections.has('management') && <div className="text-[10px] opacity-75 mt-0.5">Click to View</div>}
              </div>
            </button>
            <button 
              className={`px-3 py-2 text-xs rounded-md border transition-all duration-200 ${
                expandedSections.has('predictive') 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md' 
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:shadow-sm'
              }`}
              onClick={() => toggleSection('predictive')}
            >
              <div className="text-center">
                <div className="font-medium">Predictive Inference</div>
                {!expandedSections.has('predictive') && <div className="text-[10px] opacity-75 mt-0.5">Click to View</div>}
              </div>
            </button>
            <div className="text-slate-400 text-xs px-1">→</div>
            <button 
              className={`px-3 py-2 text-xs rounded-md border-2 transition-all duration-200 font-medium ${
                expandedSections.has('thesis') 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                  : 'bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100 hover:shadow-sm'
              }`}
              onClick={() => toggleSection('thesis')}
            >
              <div className="text-center">
                <div className="font-semibold">REIT Thesis</div>
                {!expandedSections.has('thesis') && <div className="text-[10px] opacity-75 mt-0.5">Click to View</div>}
              </div>
            </button>
          </div>

          {/* Mobile: 2x2 Grid Layout */}
          <div className="lg:hidden">
            <div className="text-center mb-2">
              <span className="text-xs text-slate-500">Tap to View</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                className={`px-3 py-3 text-xs rounded-md border transition-all duration-200 ${
                  expandedSections.has('multi_year') 
                    ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                }`}
                onClick={() => toggleSection('multi_year')}
              >
                <div className="font-medium">Multi-Year</div>
              </button>
              <button 
                className={`px-3 py-3 text-xs rounded-md border transition-all duration-200 ${
                  expandedSections.has('management') 
                    ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
                onClick={() => toggleSection('management')}
              >
                <div className="font-medium">Management</div>
              </button>
              <button 
                className={`px-3 py-3 text-xs rounded-md border transition-all duration-200 ${
                  expandedSections.has('predictive') 
                    ? 'bg-amber-500 text-white border-amber-500 shadow-md' 
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}
                onClick={() => toggleSection('predictive')}
              >
                <div className="font-medium">Predictive</div>
              </button>
              <button 
                className={`px-3 py-3 text-xs rounded-md border-2 transition-all duration-200 font-medium ${
                  expandedSections.has('thesis') 
                    ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                    : 'bg-orange-50 text-orange-700 border-orange-300'
                }`}
                onClick={() => toggleSection('thesis')}
              >
                <div className="font-semibold">REIT Thesis</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Getting Started Indicator - Shows when no section is selected */}
      {expandedSections.size === 0 && (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <div className="mb-4">
              <Eye className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            </div>
            <h3 className="text-lg font-semibold text-slate-700 mb-2">
              Choose an Analysis to Begin
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Select one of the analysis buttons above to view detailed REIT insights from our multi-agent AI system.
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
              <span>Click</span>
              <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-medium">Multi-Year Analysis</div>
              <span>to get started</span>
            </div>
          </div>
        </div>
      )}

      {/* Analysis Sections */}
      <div className="space-y-6">
        {/* Multi-Year REIT Analysis */}
        {expandedSections.has('multi_year') && multiYearData && (
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Home className="h-5 w-5 text-blue-600" />
                Multi-Year REIT Operational Analysis
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Analysis Coverage */}
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-semibold mb-2 text-slate-800">Analysis Coverage</h4>
                  <div className="flex items-center gap-4 text-sm">
                    <span><strong>Filing Period:</strong> {multiYearData.window.start_fy}–{multiYearData.window.end_fy} filing years ({multiYearData.window.num_years} years)</span>
                    <span><strong>Data Quality:</strong> {multiYearData.coverage.years_received.length}/{multiYearData.window.num_years} filing years received</span>
                  </div>
                </div>

                {/* Historical Performance Synopsis */}
                {multiYearData.ui_summaries?.synopsis && (
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold mb-2 text-blue-800">Historical Performance Synopsis</h4>
                    <p className="text-sm text-blue-700">{multiYearData.ui_summaries.synopsis}</p>
                  </div>
                )}

                {/* Historical Performance Grade */}
                {multiYearData.grading && (
                  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-semibold">Historical Performance Grade</h4>
                    </div>
                    <Badge className={`text-lg px-4 py-2 ${getGradeColor(multiYearData.grading.letter)}`}>
                      {multiYearData.grading.letter}
                    </Badge>
                  </div>
                )}

                {/* Key REIT Metrics */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <h5 className="font-medium text-blue-800">Same Store NOI</h5>
                    </div>
                    <p className="text-sm text-slate-700">{multiYearData.semantic_themes?.same_store_noi_trend?.label}</p>
                    <p className="text-xs text-slate-500 mt-1">{multiYearData.semantic_themes?.same_store_noi_trend?.rationale}</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Activity className="h-4 w-4 text-green-600" />
                      <h5 className="font-medium text-green-800">Occupancy Trend</h5>
                    </div>
                    <p className="text-sm text-slate-700">{multiYearData.semantic_themes?.occupancy_trend?.label}</p>
                    {multiYearData.semantic_themes?.occupancy_trend?.average_occupancy_pct && (
                      <p className="text-xs text-slate-500 mt-1">Avg: {multiYearData.semantic_themes.occupancy_trend.average_occupancy_pct}%</p>
                    )}
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      <h5 className="font-medium text-purple-800">Leasing Economics</h5>
                    </div>
                    <p className="text-sm text-slate-700">{multiYearData.semantic_themes?.leasing_economics?.rent_spread_trend}</p>
                    <p className="text-xs text-slate-500 mt-1">Escalators: {multiYearData.semantic_themes?.leasing_economics?.escalators_presence}</p>
                  </div>
                </div>

                {/* Component Analysis */}
                <div>
                  <h4 className="font-semibold mb-3">Component Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'Portfolio Quality & Occupancy', score: multiYearData.scores.portfolio_quality_occupancy },
                      { name: 'Same Store NOI Trend', score: multiYearData.scores.same_store_noi_trend },
                      { name: 'AFFO Stability & Payout', score: multiYearData.scores.affo_stability_payout },
                      { name: 'Balance Sheet & Liquidity', score: multiYearData.scores.balance_sheet_liquidity },
                      { name: 'Lease Maturity Risk', score: multiYearData.scores.lease_maturity_concentration_risk },
                      { name: 'Tenant Diversification', score: multiYearData.scores.tenant_industry_diversification },
                      { name: 'External Growth Discipline', score: multiYearData.scores.external_growth_discipline },
                      { name: 'Risk Management', score: multiYearData.scores.risk_overhangs },
                    ].map((component, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-white">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">{component.name}</span>
                          <span className="text-sm text-muted-foreground">{component.score.toFixed(1)}/10</span>
                        </div>
                        <Progress value={component.score * 10} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Portfolio Mix */}
                {multiYearData.semantic_themes?.property_type_mix && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                    <h4 className="font-semibold mb-3 text-green-800">🏢 Property Portfolio Mix</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {multiYearData.semantic_themes.property_type_mix.map((prop, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg border">
                          <div className="font-medium text-sm">{prop.type}</div>
                          <Badge className={`text-xs mt-1 ${getTrendColor(prop.approx_share_label)}`}>
                            {prop.approx_share_label} Share
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Geographic Mix */}
                {multiYearData.semantic_themes?.geography_mix && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <h4 className="font-semibold mb-3 text-blue-800">🗺️ Geographic Exposure</h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      {multiYearData.semantic_themes.geography_mix.map((geo, index) => (
                        <div key={index} className="p-3 bg-white rounded-lg border">
                          <div className="font-medium text-sm">{geo.region_or_market}</div>
                          <Badge className={`text-xs mt-1 ${getTrendColor(geo.approx_share_label)}`}>
                            {geo.approx_share_label} Exposure
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Distribution Analysis */}
                {multiYearData.distribution_analysis?.applies && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                    <h4 className="font-semibold mb-3 text-purple-800">💰 Distribution Analysis</h4>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg bg-white shadow-sm">
                          <h5 className="font-medium mb-2">Policy Characterization</h5>
                          <p className="text-sm text-slate-700">{multiYearData.distribution_analysis.policy_characterization}</p>
                          {multiYearData.distribution_analysis.cadence && (
                            <p className="text-xs text-slate-500 mt-1">Cadence: {multiYearData.distribution_analysis.cadence}</p>
                          )}
                        </div>
                        <div className="p-4 border rounded-lg bg-white shadow-sm">
                          <h5 className="font-medium mb-2">Coverage Metrics</h5>
                          <div className="space-y-1 text-sm">
                            <div>AFFO Coverage: <Badge className="text-xs ml-1">{multiYearData.distribution_analysis.coverage_metrics.affo_payout_ratio_bucket}</Badge></div>
                            <div>FFO Coverage: <Badge className="text-xs ml-1">{multiYearData.distribution_analysis.coverage_metrics.ffo_payout_ratio_bucket}</Badge></div>
                            <div>Trend: <Badge className="text-xs ml-1">{multiYearData.distribution_analysis.coverage_metrics.coverage_trend}</Badge></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Highlights */}
                {multiYearData.ui_summaries?.bullet_highlights && (
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold mb-2 text-green-800">Key Highlights</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                      {multiYearData.ui_summaries.bullet_highlights.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-6 p-3 bg-slate-100 border border-slate-300 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    <strong>Disclaimer:</strong> For informational purposes only. Operational analysis of historical disclosures. Not investment advice or a recommendation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Management Credibility */}
        {expandedSections.has('management') && (
          managementData ? (
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Management Credibility Assessment
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Management Synopsis */}
                {managementData.ui_summaries?.synopsis && (
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                    <h4 className="font-semibold mb-2 text-slate-800">Management Synopsis</h4>
                    <p className="text-sm text-slate-700">{managementData.ui_summaries.synopsis}</p>
                  </div>
                )}

                {/* Credibility Score */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold mb-1">Credibility Score</h4>
                    <p className="text-sm text-muted-foreground">
                      Overall assessment of REIT management's past actions and communication
                    </p>
                  </div>
                  {managementData.scores?.credibility_tier && (
                    <Badge className={`text-lg px-4 py-2 ${getCredibilityTierColor(managementData.scores.credibility_tier)}`}>
                      {managementData.scores.credibility_tier}
                    </Badge>
                  )}
                </div>

                {/* REIT-Specific Disclosure Quality */}
                <div className="p-4 border rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
                  <h4 className="font-semibold mb-3 text-indigo-800">
                    📊 REIT-Specific Disclosure Quality
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">NAREIT FFO Clarity:</span>
                        <Badge className="text-xs">{managementData.credibility_assessment.disclosure_hygiene.nareit_ffo_definition_clarity}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">AFFO Definition Stability:</span>
                        <Badge className="text-xs">{managementData.credibility_assessment.disclosure_hygiene.affo_definition_stability}</Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Same Store Cohort Integrity:</span>
                        <Badge className="text-xs">{managementData.credibility_assessment.disclosure_hygiene.same_store_cohort_integrity}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Reconciliation Quality:</span>
                        <Badge className="text-xs">{managementData.credibility_assessment.disclosure_hygiene.reconciliation_quality}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Red and Green Flags */}
                <div className="grid md:grid-cols-2 gap-6">
                  {managementData.credibility_assessment.red_flags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-red-600">Red Flags</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-red-500">
                        {managementData.credibility_assessment.red_flags.map((flag, index) => (
                          <li key={index}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {managementData.credibility_assessment.green_flags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2 text-green-600">Green Flags</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-green-500">
                        {managementData.credibility_assessment.green_flags.map((flag, index) => (
                          <li key={index}>{flag}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-3 bg-slate-100 border border-slate-300 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    <strong>Disclaimer:</strong> For informational purposes only. Operational analysis of historical disclosures. Not investment advice or a recommendation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          ) : (
            <Card>
              <CardHeader className="pb-3">
                <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  Management Credibility Assessment
                </h3>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Data Processing</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Management credibility analysis is being processed and will be available in the enhanced interface soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          )
        )}

        {/* Predictive Analysis */}
        {expandedSections.has('predictive') && predictiveData && (
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Brain className="h-5 w-5 text-amber-600" />
                Predictive Inference Analysis
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Predictive Synopsis */}
                {predictiveData.ui_summaries?.synopsis && (
                  <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                    <h4 className="font-semibold mb-2 text-slate-800">Forward-Looking Synopsis</h4>
                    <p className="text-sm text-slate-700">{predictiveData.ui_summaries.synopsis}</p>
                  </div>
                )}

                {/* Horizon Selection */}
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-semibold mb-2 text-blue-800">Analysis Horizon</h4>
                  <p className="text-sm text-slate-700">
                    {predictiveData.horizon_selection.length} {predictiveData.horizon_selection.type} - {predictiveData.horizon_selection.reason}
                  </p>
                </div>

                {/* Scenario Analysis */}
                <div>
                  <h4 className="font-semibold mb-3">Scenario Analysis</h4>
                  {predictiveData.scenarios?.length > 0 ? (
                    <div className="space-y-6">
                      {predictiveData.scenarios.map((scenario, index) => (
                        <Card key={index} className="p-4 bg-white shadow-sm">
                          <h5 className="font-semibold mb-3 flex items-center gap-2">
                            <Zap className="h-4 w-4 text-blue-600" />
                            {scenario.name} Scenario ({(scenario.confidence * 100).toFixed(0)}% Confidence)
                          </h5>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">Same Store NOI:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.ssnoi)}`}>
                                    {scenario.outcomes.ssnoi}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">Occupancy:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.occupancy)}`}>
                                    {scenario.outcomes.occupancy}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">Leasing Spreads:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.leasing_spreads)}`}>
                                    {scenario.outcomes.leasing_spreads}
                                  </Badge>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">AFFO:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.affo)}`}>
                                    {scenario.outcomes.affo}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">Distribution:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.distribution_trajectory)}`}>
                                    {scenario.outcomes.distribution_trajectory}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">Coverage:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.coverage_direction)}`}>
                                    {scenario.outcomes.coverage_direction}
                                  </Badge>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">Leverage:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.leverage)}`}>
                                    {scenario.outcomes.leverage}
                                  </Badge>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="font-medium text-sm">Re-leasing Risk:</span>
                                  <Badge className={`text-xs ${getTrendColor(scenario.outcomes.releasing_risk)}`}>
                                    {scenario.outcomes.releasing_risk}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6">
                              {/* Key Drivers */}
                              <div>
                                <h5 className="font-medium mb-2">Key Drivers</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                  {scenario.key_drivers.map((driver, i) => (
                                    <li key={i}>{driver}</li>
                                  ))}
                                </ul>
                              </div>
                              {/* Leading Indicators */}
                              <div>
                                <h5 className="font-medium mb-2">Leading Indicators</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                  {scenario.leading_indicators.map((indicator, i) => (
                                    <li key={i}>{indicator}</li>
                                  ))}
                                </ul>
                              </div>
                              {/* Falsifiers */}
                              <div>
                                <h5 className="font-medium mb-2">Falsifiers</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                                  {scenario.falsifiers.map((falsifier, i) => (
                                    <li key={i}>{falsifier}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No detailed scenarios available.</p>
                  )}
                </div>

                {/* Distribution Forward Analysis */}
                {predictiveData.distribution_forward_analysis?.applies && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                    <h4 className="font-semibold mb-3 text-purple-800">💰 Distribution Forward Analysis</h4>
                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 border rounded-lg bg-white shadow-sm">
                          <h5 className="font-medium mb-2">Base Distribution Outlook</h5>
                          <Badge className={`${getTrendColor(predictiveData.distribution_forward_analysis.base_outlook)}`}>
                            {predictiveData.distribution_forward_analysis.base_outlook}
                          </Badge>
                        </div>
                        <div className="p-4 border rounded-lg bg-white shadow-sm">
                          <h5 className="font-medium mb-2">Sustainability Factors</h5>
                          <div className="space-y-1 text-sm">
                            <div>AFFO Trajectory: <Badge className="text-xs ml-1">{predictiveData.distribution_forward_analysis.sustainability_drivers.affo_trajectory}</Badge></div>
                            <div>Coverage Trend: <Badge className="text-xs ml-1">{predictiveData.distribution_forward_analysis.sustainability_drivers.coverage_trend}</Badge></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-6 p-3 bg-slate-100 border border-slate-300 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    <strong>Disclaimer:</strong> For informational purposes only. Operational analysis of historical disclosures. Not investment advice or a recommendation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* REIT Thesis */}
        {expandedSections.has('thesis') && thesisData && (
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-orange-600" />
                REIT Thesis & Viability Assessment
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Synopsis and Analysis Alignment Side by Side */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Synopsis */}
                  {thesisData.synopsis && (
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-semibold mb-2 text-slate-800">REIT Thesis Synopsis</h4>
                      <p className="text-sm text-slate-700">{thesisData.synopsis}</p>
                    </div>
                  )}
                  {/* One Liner */}
                  {thesisData.one_liner && (
                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-semibold mb-2 text-slate-800">One Liner</h4>
                      <p className="text-sm text-slate-700">{thesisData.one_liner}</p>
                    </div>
                  )}
                </div>

                {/* Thesis Statement */}
                {thesisData.reit_thesis?.thesis_statement && (
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold mb-2 text-blue-800">Thesis Statement</h4>
                    <p className="text-sm text-blue-700">{thesisData.reit_thesis.thesis_statement}</p>
                  </div>
                )}

                {/* Viability Assessment */}
                <div className="p-4 border rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                  <h4 className="font-semibold mb-3 text-orange-800">📈 Viability Assessment</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <span className="font-semibold text-sm">Overall Viability Tier:</span>
                      {thesisData.viability_assessment?.tier && (
                        <Badge className={`text-sm px-3 py-1 ${getViabilityColor(thesisData.viability_assessment.tier)}`}>
                          {thesisData.viability_assessment.tier}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div className="p-3 bg-white rounded-lg border">
                          <h5 className="font-medium mb-2">Portfolio Durability</h5>
                          <p className="text-sm text-slate-700">{thesisData.viability_assessment.subscores.portfolio_durability.toFixed(1)}/10</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border">
                          <h5 className="font-medium mb-2">Execution Quality</h5>
                          <p className="text-sm text-slate-700">{thesisData.viability_assessment.subscores.execution_quality.toFixed(1)}/10</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border">
                          <h5 className="font-medium mb-2">Financial Resilience</h5>
                          <p className="text-sm text-slate-700">{thesisData.viability_assessment.subscores.financial_resilience.toFixed(1)}/10</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="p-3 bg-white rounded-lg border">
                          <h5 className="font-medium mb-2">Risk Balance</h5>
                          <p className="text-sm text-slate-700">{thesisData.viability_assessment.subscores.risk_balance.toFixed(1)}/10</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border">
                          <h5 className="font-medium mb-2">Governance Quality</h5>
                          <p className="text-sm text-slate-700">{thesisData.viability_assessment.subscores.governance_quality.toFixed(1)}/10</p>
                        </div>
                        <div className="p-3 bg-white rounded-lg border">
                          <h5 className="font-medium mb-2">Composite Score</h5>
                          <p className="text-sm text-slate-700">{thesisData.viability_assessment.composite?.toFixed(2) || 'N/A'}/10</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Consensus Map */}
                {thesisData.consensus_map && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
                    <h4 className="font-semibold mb-3 text-purple-800">🤝 Consensus Map</h4>
                    
                    {/* Aligned Themes */}
                    {thesisData.consensus_map.aligned_themes && thesisData.consensus_map.aligned_themes.length > 0 && (
                      <div className="mb-4">
                        <h5 className="font-semibold mb-2 text-green-800">Areas of Agreement</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                          {thesisData.consensus_map.aligned_themes.map((theme, index) => (
                            <li key={index}>{theme}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Analytical Tensions */}
                    {thesisData.consensus_map.tensions && thesisData.consensus_map.tensions.length > 0 && (
                      <div className="p-4 border rounded-lg bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
                        <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowAnalyticalTensions(!showAnalyticalTensions)}>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <h4 className="font-semibold text-red-800">
                              Analytical Tensions ({thesisData.consensus_map.tensions.length})
                            </h4>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-red-600">
                              {showAnalyticalTensions ? 'Hide details' : 'Show details'}
                            </span>
                            {showAnalyticalTensions ? (
                              <ChevronDown className="h-4 w-4 text-red-600" />
                            ) : (
                              <ChevronRight className="h-4 w-4 text-red-600" />
                            )}
                          </div>
                        </div>
                        {showAnalyticalTensions && (
                          <div className="mt-4 space-y-4">
                            {thesisData.consensus_map.tensions.map((tension, index) => (
                              <div key={index} className="p-4 border rounded-lg bg-amber-50">
                                <h6 className="font-medium text-sm text-amber-800 mb-2">{tension.topic}</h6>
                                <div className="grid md:grid-cols-3 gap-3 mb-3">
                                  <div className="text-xs">
                                    <span className="font-medium text-slate-600">Multi-Year:</span>
                                    <p className="text-slate-700">{tension.positions.multi_year}</p>
                                  </div>
                                  <div className="text-xs">
                                    <span className="font-medium text-slate-600">Management:</span>
                                    <p className="text-slate-700">{tension.positions.management}</p>
                                  </div>
                                  <div className="text-xs">
                                    <span className="font-medium text-slate-600">Predictive:</span>
                                    <p className="text-slate-700">{tension.positions.predictive}</p>
                                  </div>
                                </div>
                                <p className="text-sm text-slate-700"><strong>Diagnosis:</strong> {tension.diagnosis}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Portfolio Engine */}
                <div className="p-4 border rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
                  <h4 className="font-semibold mb-3 text-green-800">🏢 Portfolio Engine</h4>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="p-4 border rounded-lg bg-green-50">
                        <h5 className="font-semibold mb-3 text-green-800">NOI Drivers</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                          {thesisData.reit_thesis.portfolio_engine.noi_drivers.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg bg-red-50">
                        <h5 className="font-semibold mb-3 text-red-800">Constraints</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                          {thesisData.reit_thesis.portfolio_engine.constraints.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Value Creation & Fragilities */}
                    <div className="grid md:grid-cols-2 gap-6 mb-4">
                      <div className="p-4 border rounded-lg bg-blue-50">
                        <h5 className="font-semibold mb-3 text-blue-800">Value Creation Drivers</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-blue-700">
                          {thesisData.reit_thesis.value_creation_drivers.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg bg-red-50">
                        <h5 className="font-semibold mb-3 text-red-800">Fragilities</h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                          {thesisData.reit_thesis.fragilities.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Capital Allocation Model */}
                {thesisData.reit_thesis?.capital_allocation_model && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                    <h4 className="font-semibold mb-3 text-blue-800">💼 Capital Allocation Model</h4>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">Development Discipline:</span>
                          <Badge className="text-xs">{thesisData.reit_thesis.capital_allocation_model.development_discipline}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">Acquisition Selectivity:</span>
                          <Badge className="text-xs">{thesisData.reit_thesis.capital_allocation_model.acquisition_selectivity}</Badge>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">Capital Recycling:</span>
                          <Badge className="text-xs">{thesisData.reit_thesis.capital_allocation_model.capital_recycling}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">Distribution Sustainability:</span>
                          <Badge className="text-xs">{thesisData.reit_thesis.capital_allocation_model.distribution_sustainability}</Badge>
                        </div>
                      </div>
                    </div>
                    {thesisData.reit_thesis.capital_allocation_model.notes && (
                      <p className="text-sm text-slate-700 p-3 bg-white rounded-lg border">
                        {thesisData.reit_thesis.capital_allocation_model.notes}
                      </p>
                    )}
                  </div>
                )}

                {/* Scenarios Bridge */}
                {thesisData.scenarios_bridge && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <h4 className="font-semibold mb-3 text-yellow-800">🌉 Scenarios Bridge</h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded-lg border">
                        <h5 className="font-medium mb-2">Base Path</h5>
                        <p className="text-sm text-slate-700">{thesisData.scenarios_bridge.base_path}</p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="p-4 border rounded-lg bg-green-50">
                          <h5 className="font-semibold mb-3 text-green-800">Upside Falsifiers</h5>
                          <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                            {thesisData.scenarios_bridge.upside_falsifiers.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 border rounded-lg bg-red-50">
                          <h5 className="font-semibold mb-3 text-red-800">Downside Falsifiers</h5>
                          <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                            {thesisData.scenarios_bridge.downside_falsifiers.map((item, index) => (
                              <li key={index}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Monitoring Watchlist */}
                <div className="p-4 border rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
                  <h4 className="font-semibold mb-3 text-blue-800">👁️ Monitoring Watchlist</h4>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="p-4 border rounded-lg bg-green-50">
                        <h5 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Leading Indicators
                        </h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-green-700">
                          {thesisData.watchlist.leading_indicators.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg bg-red-50">
                        <h5 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Early Warnings
                        </h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                          {thesisData.watchlist.early_warnings.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 border rounded-lg bg-gray-50">
                        <h5 className="font-semibold mb-3 text-gray-800 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Data Gaps
                        </h5>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                          {thesisData.watchlist.data_gaps.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transition Triggers */}
                {thesisData.transition_triggers && thesisData.transition_triggers.length > 0 && (
                  <div className="p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
                    <div className="flex justify-between items-center cursor-pointer" onClick={() => setShowThesisUpdateTriggers(!showThesisUpdateTriggers)}>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-600" />
                        <h4 className="font-semibold text-yellow-800">
                          Thesis Update Triggers ({thesisData.transition_triggers.length})
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-yellow-600">
                          {showThesisUpdateTriggers ? 'Hide details' : 'Show details'}
                        </span>
                        {showThesisUpdateTriggers ? (
                          <ChevronDown className="h-4 w-4 text-yellow-600" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                    </div>
                    {showThesisUpdateTriggers && (
                      <div className="mt-4 space-y-4">
                        {thesisData.transition_triggers.map((trigger, index) => (
                          <div key={index} className="p-4 border rounded-lg bg-white">
                            <h6 className="font-medium text-sm mb-2">{trigger.event}</h6>
                            <div className="grid md:grid-cols-3 gap-3 mb-2">
                              <div className="text-xs">
                                <span className="font-medium text-slate-600">Interpretation:</span>
                                <Badge className={`ml-1 text-xs ${trigger.interpretation === 'Positive' ? 'bg-green-100 text-green-800' : trigger.interpretation === 'Negative' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                  {trigger.interpretation}
                                </Badge>
                              </div>
                              <div className="text-xs">
                                <span className="font-medium text-slate-600">Expected Effect:</span>
                                <p className="text-slate-700">{trigger.expected_effect}</p>
                              </div>
                            </div>
                            <p className="text-xs text-slate-700"><strong>Update Rule:</strong> {trigger.thesis_update_rule}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Disclaimer */}
                <div className="mt-6 p-3 bg-slate-100 border border-slate-300 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    <strong>Disclaimer:</strong> {thesisData.disclaimer || 'For informational purposes only. Operational analysis of historical disclosures. Not investment advice or a recommendation.'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-800">
            {multiYearData?.ui_summaries?.disclaimer || 
             "For informational purposes only. Analysis of historical disclosures. Not investment advice or a recommendation."}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to safely parse JSON content
function parseJSONContent(content: string): any {
  try {
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

// Main wrapper component that handles ParsedReport structure
export default function REITEquityReport({ report }: REITReportProps) {
  // Try to get structured data from each section first, fallback to parsing content
  const multiYearData = report.sections.multi_year_analysis.structured_data || parseJSONContent(report.sections.multi_year_analysis.content);
  const managementData = report.sections.management_credibility.structured_data || parseJSONContent(report.sections.management_credibility.content);
  const predictiveData = report.sections.predictive_inference.structured_data || parseJSONContent(report.sections.predictive_inference.content);
  const thesisData = report.sections.final_thesis.structured_data || parseJSONContent(report.sections.final_thesis.content);

  // Check if we have any valid objects (not just truthy values)
  const hasMultiYear = multiYearData && typeof multiYearData === 'object' && Object.keys(multiYearData).length > 0;
  const hasManagement = managementData && typeof managementData === 'object' && Object.keys(managementData).length > 0;
  const hasPredictive = predictiveData && typeof predictiveData === 'object' && Object.keys(predictiveData).length > 0;
  const hasThesis = thesisData && typeof thesisData === 'object' && Object.keys(thesisData).length > 0;

  // If we have any structured JSON data, use the full REIT component
  // But we need to handle mixed scenarios where some sections have JSON and others are text
  if (hasMultiYear || hasManagement || hasPredictive || hasThesis) {
    return (
      <REITEquityReportContent
        multiYearData={hasMultiYear ? multiYearData : null}
        managementData={hasManagement ? managementData : null}
        predictiveData={hasPredictive ? predictiveData : null}
        thesisData={hasThesis ? thesisData : null}
      />
    );
  }

  // For text-based REIT reports, display them in a structured format
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{report.ticker}</h2>
          <Badge className="bg-blue-100 text-blue-800">REIT</Badge>
          <span className="text-muted-foreground">({report.years_range})</span>
        </div>
      </div>

      {/* REIT Analysis Sections */}
      <div className="grid gap-6">
        {Object.entries(report.sections).map(([key, section]) => {
          // Get appropriate icon and color for each section
          let icon = <Building2 className="h-5 w-5" />;
          let colorClass = "text-slate-600";
          
          if (key === 'multi_year_analysis') {
            icon = <TrendingUp className="h-5 w-5 text-blue-600" />;
            colorClass = "text-blue-600";
          } else if (key === 'management_credibility') {
            icon = <Shield className="h-5 w-5 text-emerald-600" />;
            colorClass = "text-emerald-600";
          } else if (key === 'predictive_inference') {
            icon = <Brain className="h-5 w-5 text-amber-600" />;
            colorClass = "text-amber-600";
          } else if (key === 'final_thesis') {
            icon = <Building2 className="h-5 w-5 text-orange-600" />;
            colorClass = "text-orange-600";
          }

          return (
            <Card key={key}>
              <CardHeader>
                <h3 className={`text-lg font-semibold flex items-center gap-2 ${colorClass}`}>
                  {icon}
                  {section.title}
                </h3>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  {/* Check if content indicates structured data is available */}
                  {section.content === "Structured analysis data available" ? (
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">Structured Data Available</span>
                      </div>
                      <p className="text-sm text-blue-700">
                        This section contains structured analysis data that will be displayed in the enhanced REIT interface once the data parsing is fully implemented.
                      </p>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                      {section.content}
                    </div>
                  )}
                  
                  {/* Render subsections if they exist */}
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {section.subsections.map((subsection, index) => (
                        <div key={index} className="border-l-2 border-gray-200 pl-4">
                          <h4 className="font-semibold text-slate-800 mb-2">{subsection.title}</h4>
                          <div className="whitespace-pre-wrap text-sm text-slate-600 leading-relaxed">
                            {subsection.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Enhanced Notice */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Enhanced REIT Analysis</h4>
              <p className="text-sm text-blue-700">
                This REIT analysis includes multi-year operational trends, management credibility assessment, 
                and predictive inference specific to real estate investment trusts. The structured interface 
                with interactive components will be available once the data parsing is fully implemented.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> For informational purposes only. Analysis of historical disclosures. 
            Not investment advice or a recommendation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
