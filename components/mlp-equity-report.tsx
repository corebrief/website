'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Shield,
  Brain,
  Building2,
  Eye,
  ChevronDown,
  ChevronUp,
  Gauge,
  DollarSign,
  MapPin,
  AlertTriangle,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
  Fuel
} from 'lucide-react';
import { type ParsedReport } from '@/utils/report-parsers';

// MLP Multi-Year Data Interface
interface MLPMultiYearData {
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
    throughput_trend: {
      label: string;
      assets: string[];
      persistence_years: number;
      rationale: string;
    };
    utilization_trend: {
      label: string;
      notes: string;
    };
    fee_mix_contracts: {
      fee_based_exposure_label: string;
      take_or_pay_mvc_presence: string;
      average_contract_tenor_label: string;
      commodity_exposure_comment: string;
    };
    counterparty_profile: {
      investment_grade_exposure_label: string;
      top_customer_concentration_label: string;
      notes: string;
    };
    asset_footprint_basin: Array<{
      basin_or_region: string;
      importance_label: string;
    }>;
    dcf_coverage_character: {
      label: string;
      stability_comment: string;
    };
    leverage_liquidity: {
      leverage_label: string;
      liquidity_comment: string;
      rate_exposure_label: string;
    };
    external_growth_recycling: {
      activity_label: string;
      modes: string[];
      discipline_note: string;
    };
    competitive_posture: {
      label: string;
      drivers: string[];
    };
    structure_notes: {
      idrs_status: string;
      c_corp_conversion_mentions: string;
      notes: string;
    };
    risk_register: Array<{
      name: string;
      recurrence_years: number[];
      severity: string;
      note: string;
    }>;
  };
  timeseries_semantic: {
    volumes_by_year: Array<{
      year: number;
      label: string;
    }>;
    fee_mix_by_year: Array<{
      year: number;
      label: string;
    }>;
    distribution_policy_by_year: Array<{
      year: number;
      label: string;
    }>;
  };
  optional_numerics: {
    mentioned_throughput: Array<{
      asset: string;
      unit: string;
      value_range: string | null;
    }>;
    mentioned_fee_based_pct: number | null;
    mentioned_take_or_pay_mvc_pct: number | null;
    mentioned_dcf_coverage_ratio: number | null;
    mentioned_leverage_debt_to_ebitda: number | null;
    capex_split_notes: string | null;
    notes: string;
  };
  classification: {
    primary: string;
    secondary: string[];
    mlp_profile_tags: string[];
    rationale: string;
  };
  scores: {
    throughput_stability_utilization: number;
    fee_mix_contract_quality: number;
    dcf_stability_coverage: number;
    leverage_liquidity: number;
    counterparty_quality_concentration: number;
    asset_footprint_basin_quality: number;
    external_growth_discipline: number;
    risk_overhangs: number;
    weights: number[];
    composite_score: number;
  };
  grading: {
    letter: string;
    mapping_note: string;
  };
  distribution_analysis: {
    applies: boolean;
    cadence: string | null;
    policy_characterization: string;
    sustainability_signals: {
      dcf_coverage: string;
      policy_consistency: string;
      management_commitment: string;
    };
    distribution_actions: Array<{
      year: number;
      action: string;
      context: string;
    }>;
    policy_philosophy: string;
    yield_profile: {
      characterization: string;
      trend: string;
    };
    coverage_metrics: {
      dcf_coverage_bucket: string;
      coverage_trend: string;
    };
    mlp_specific_factors: {
      idrs_elimination_mentioned: boolean;
      gp_lp_simplification: string;
      c_corp_conversion_mentions: string;
    };
    sustainability_factors: string[];
    notes: string | null;
  };
  features_for_downstream: {
    throughput_direction: string;
    fee_based_exposure: string;
    take_or_pay_presence: string;
    contract_tenor_bucket: string;
    counterparty_quality: string;
    leverage_bucket: string;
    distribution_status: string;
    growth_capex_intensity: string;
    risk_highlights: string[];
  };
  ui_summaries: {
    one_liner: string;
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
    disclaimer: string;
  };
  version: string;
}

// MLP Management Data Interface
interface MLPManagementData {
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
  credibility_assessment: {
    commitment_followthrough: Array<{
      commitment_year: number;
      commitment_type: string;
      commitment: string;
      subsequent_followup_years: number[];
      outcome_label: string;
      rationale: string;
    }>;
    tone_profile: {
      tone_balance_label: string;
      superlative_frequency_label: string;
      guidance_style_label: string;
      incident_transparency_label: string;
      change_in_tone_label: string;
      notes: string;
    };
    disclosure_hygiene: {
      dcf_definition_clarity: string;
      adjusted_ebitda_reconciliation_quality: string;
      maintenance_capex_definition_stability: string;
      segment_bridge_quality: string;
      ferc_rate_case_clarity: string;
      incident_outage_disclosure_quality: string;
      restatement_or_weakness_mentions: string;
    };
    risk_candor: {
      recurring_risks: Array<{
        name: string;
        recurrence_years: number[];
        candor_label: string;
        note: string;
      }>;
      realized_issues_acknowledged_label: string;
    };
    strategic_coherence: {
      pivot_frequency_label: string;
      rationalization_quality_label: string;
      fee_mix_stance_label: string;
      contract_quality_stance_label: string;
      examples: string[];
    };
    capital_allocation_consistency: {
      stated_priorities: string[];
      behavior_alignment_label: string;
      examples: string[];
    };
    metric_definition_stability: Array<{
      metric: string;
      stability_label: string;
      notes: string;
    }>;
    distribution_policy_communication: {
      change_communication_label: string;
      coverage_context_label: string;
    };
    structure_events: Array<{
      event: string;
      communication_label: string;
      outcome_label: string;
      notes: string;
    }>;
    red_flags: string[];
    green_flags: string[];
  };
  classification: {
    communication_style: string;
    credibility_trend: string;
    disclosure_quality_tier: string;
    rationale: string;
  };
  scores: {
    promise_follow_through: number;
    tone_discipline: number;
    disclosure_hygiene: number;
    risk_candor: number;
    strategic_coherence: number;
    capital_allocation_consistency: number;
    metric_definition_stability: number;
    red_flags: number;
    weights: number[];
    composite_score: number;
    credibility_tier: string;
  };
  features_for_downstream: {
    followthrough_label: string;
    tone_label: string;
    disclosure_tier: string;
    risk_candor_label: string;
    strategy_pivot_intensity: string;
    capital_allocation_alignment: string;
    kpi_stability: string;
    red_flag_pressure: string;
    distribution_communication: string;
    idrs_status: string;
  };
  ui_summaries: {
    one_liner: string;
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
    disclaimer: string;
  };
  version: string;
}

// MLP Predictive Data Interface
interface MLPPredictiveData {
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
  horizon_selection: {
    type: string;
    length: number;
    reason: string;
  };
  assumption_journal: string[];
  base_state: {
    starting_point: {
      throughput: string;
      utilization: string;
      fee_based_exposure: string;
      contract_quality: string;
      dcf: string;
      risk_level: string;
    };
    recent_inflections: string[];
  };
  scenarios: Array<{
    name: string;
    outcomes: {
      throughput: string;
      utilization: string;
      fee_based_exposure: string;
      contract_quality: string;
      dcf: string;
      distribution_trajectory: string;
      coverage_direction: string;
      capex_mix: string;
      leverage: string;
      liquidity_refi: string;
      rate_exposure: string;
      risk_level: string;
      external_growth: string;
    };
    numeric_context: string | null;
    key_drivers: string[];
    leading_indicators: string[];
    falsifiers: string[];
    confidence: number;
  }>;
  uncertainty: {
    dominant_unknowns: string[];
    black_swan_notes: string | null;
    confidence_check: string;
  };
  transition_map: Array<{
    from: string;
    to: string;
    trigger: string;
    early_signals: string[];
  }>;
  distribution_outlook: {
    applies: boolean;
    trajectory: string;
    key_factors: string[];
    structure_notes: string | null;
    policy_signals: string[];
  };
  features_for_downstream: {
    directional_tilt: string;
    confidence_bucket: string;
    key_drivers_top3: string[];
    key_falsifiers_top3: string[];
    watchlist_metrics: string[];
  };
  ui_summaries: {
    one_liner: string;
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
    disclaimer: string;
  };
  version: string;
}

// MLP Thesis Data Interface
interface MLPThesisData {
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
  mlp_thesis: {
    thesis_statement: string;
    throughput_engine: {
      throughput_drivers: string[];
      constraints: string[];
    };
    value_creation_drivers: string[];
    fragilities: string[];
    capital_allocation_model: {
      growth_capex_discipline: string;
      mna_selectivity: string;
      dropdowns_usage: string;
      leverage_policy: string;
      distribution_sustainability: string;
      notes: string;
    };
    structural_position: {
      moat_label: string;
      switching_costs: string;
      regulatory_posture: string;
      notes: string;
    };
  };
  viability_assessment: {
    tier: string;
    subscores: {
      system_durability: number;
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
  disclaimer: string;
  version: string;
  one_liner: string;
  synopsis: string;
}

interface MLPReportProps {
  report: ParsedReport;
}

// Helper function to get color for MLP profile tags
function getMLPProfileColor(tag: string): string {
  const colorMap: Record<string, string> = {
    'Gathering & Processing': 'bg-blue-100 text-blue-800',
    'Long-Haul Crude Pipeline': 'bg-amber-100 text-amber-800',
    'Long-Haul Gas Pipeline': 'bg-green-100 text-green-800',
    'NGL Pipeline': 'bg-purple-100 text-purple-800',
    'Fractionation': 'bg-pink-100 text-pink-800',
    'Storage & Terminalling': 'bg-gray-100 text-gray-800',
    'Marine/Export': 'bg-teal-100 text-teal-800',
    'LNG-Adjacent': 'bg-cyan-100 text-cyan-800',
    'Diversified Midstream': 'bg-indigo-100 text-indigo-800',
    'Specialty': 'bg-orange-100 text-orange-800'
  };
  return colorMap[tag] || 'bg-slate-100 text-slate-800';
}

// Helper function to get grade color
function getGradeColor(letter: string): string {
  if (letter.startsWith('A')) return 'text-green-600 bg-green-50';
  if (letter.startsWith('B')) return 'text-blue-600 bg-blue-50';
  if (letter.startsWith('C')) return 'text-amber-600 bg-amber-50';
  return 'text-red-600 bg-red-50';
}

// Main content component for structured MLP data
function MLPEquityReportContent({ 
  multiYearData, 
  managementData, 
  predictiveData, 
  thesisData 
}: {
  multiYearData: MLPMultiYearData | null;
  managementData: MLPManagementData | null;
  predictiveData: MLPPredictiveData | null;
  thesisData: MLPThesisData | null;
}) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    const newExpanded = new Set<string>();
    if (!expandedSections.has(section)) {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const company = multiYearData?.company || managementData?.company || predictiveData?.company || thesisData?.company || 'MLP Analysis';
  const yearsRange = multiYearData ? `FY${multiYearData.window.start_fy}-${multiYearData.window.end_fy}` : '';

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{company}</h2>
          <Badge className="bg-purple-100 text-purple-800">MLP</Badge>
          {yearsRange && <span className="text-muted-foreground">({yearsRange})</span>}
        </div>
        
        {multiYearData && (
          <div className="flex items-center gap-4">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(multiYearData.grading.letter)}`}>
              Historical Performance Grade: {multiYearData.grading.letter}
            </div>
          </div>
        )}
      </div>

      {/* MLP Profile Tags */}
      {multiYearData && multiYearData.classification.mlp_profile_tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {multiYearData.classification.mlp_profile_tags.map((tag, index) => (
            <Badge key={index} className={getMLPProfileColor(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Button
          onClick={() => toggleSection('multi_year')}
          variant={expandedSections.has('multi_year') ? 'default' : 'outline'}
          className="h-auto p-4 justify-start"
        >
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <div className="text-left">
              <div className="font-medium">Multi-Year Analysis</div>
              <div className="text-xs text-muted-foreground">Operational Trends</div>
            </div>
          </div>
          {expandedSections.has('multi_year') ? 
            <ChevronUp className="h-4 w-4 ml-auto" /> : 
            <ChevronDown className="h-4 w-4 ml-auto" />
          }
        </Button>

        <Button
          onClick={() => toggleSection('management')}
          variant={expandedSections.has('management') ? 'default' : 'outline'}
          className="h-auto p-4 justify-start"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-emerald-600" />
            <div className="text-left">
              <div className="font-medium">Management Assessment</div>
              <div className="text-xs text-muted-foreground">Credibility Analysis</div>
            </div>
          </div>
          {expandedSections.has('management') ? 
            <ChevronUp className="h-4 w-4 ml-auto" /> : 
            <ChevronDown className="h-4 w-4 ml-auto" />
          }
        </Button>

        <Button
          onClick={() => toggleSection('predictive')}
          variant={expandedSections.has('predictive') ? 'default' : 'outline'}
          className="h-auto p-4 justify-start"
        >
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-amber-600" />
            <div className="text-left">
              <div className="font-medium">Predictive Inference</div>
              <div className="text-xs text-muted-foreground">Scenario Analysis</div>
            </div>
          </div>
          {expandedSections.has('predictive') ? 
            <ChevronUp className="h-4 w-4 ml-auto" /> : 
            <ChevronDown className="h-4 w-4 ml-auto" />
          }
        </Button>

        <Button
          onClick={() => toggleSection('thesis')}
          variant={expandedSections.has('thesis') ? 'default' : 'outline'}
          className="h-auto p-4 justify-start"
        >
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-orange-600" />
            <div className="text-left">
              <div className="font-medium">Business Thesis</div>
              <div className="text-xs text-muted-foreground">Synthesis</div>
            </div>
          </div>
          {expandedSections.has('thesis') ? 
            <ChevronUp className="h-4 w-4 ml-auto" /> : 
            <ChevronDown className="h-4 w-4 ml-auto" />
          }
        </Button>
      </div>

      {/* Getting Started Indicator */}
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
              Select one of the analysis buttons above to view detailed insights from our multi-agent AI system specialized for MLP analysis.
            </p>
            <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
              <span>Click</span>
              <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-[10px] font-medium">Multi-Year Analysis</div>
              <span>to get started</span>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Year Analysis Section */}
      {expandedSections.has('multi_year') && (
        <Card>
          <CardHeader className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold">Multi-Year MLP Performance Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Operational trends and financial patterns analysis
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('multi_year')}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {multiYearData ? (
              <>
                {/* Executive Summary */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-3">Historical Performance Synopsis</h4>
                  <p className="text-blue-700 mb-4">{multiYearData.ui_summaries.synopsis}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Key Highlights</h5>
                      <ul className="space-y-1">
                        {multiYearData.ui_summaries.bullet_highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-blue-800 mb-2">Watch Items</h5>
                      <ul className="space-y-1">
                        {multiYearData.ui_summaries.watch_items.map((item, index) => (
                          <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Throughput & Utilization Trends */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Fuel className="h-5 w-5 text-blue-600" />
                        Throughput Trends
                      </h4>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Trend Direction</span>
                        <Badge variant={multiYearData.semantic_themes.throughput_trend.label === 'Rising' ? 'default' : 'secondary'}>
                          {multiYearData.semantic_themes.throughput_trend.label}
                        </Badge>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Asset Mix</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {multiYearData.semantic_themes.throughput_trend.assets.map((asset, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {asset}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Rationale</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {multiYearData.semantic_themes.throughput_trend.rationale}
                        </p>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Utilization Trend</span>
                        <div className="flex items-center justify-between mt-1">
                          <Badge variant={multiYearData.semantic_themes.utilization_trend.label === 'Improving' ? 'default' : 'secondary'}>
                            {multiYearData.semantic_themes.utilization_trend.label}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {multiYearData.semantic_themes.utilization_trend.notes}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Fee Mix & Contracts
                      </h4>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Fee-Based Exposure</span>
                        <Badge variant={multiYearData.semantic_themes.fee_mix_contracts.fee_based_exposure_label === 'High' ? 'default' : 'secondary'}>
                          {multiYearData.semantic_themes.fee_mix_contracts.fee_based_exposure_label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Take-or-Pay/MVC</span>
                        <Badge variant={multiYearData.semantic_themes.fee_mix_contracts.take_or_pay_mvc_presence === 'Prevalent' ? 'default' : 'secondary'}>
                          {multiYearData.semantic_themes.fee_mix_contracts.take_or_pay_mvc_presence}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Contract Tenor</span>
                        <Badge variant={multiYearData.semantic_themes.fee_mix_contracts.average_contract_tenor_label.includes('Long') ? 'default' : 'secondary'}>
                          {multiYearData.semantic_themes.fee_mix_contracts.average_contract_tenor_label}
                        </Badge>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Commodity Exposure</span>
                        <p className="text-sm text-muted-foreground mt-1">
                          {multiYearData.semantic_themes.fee_mix_contracts.commodity_exposure_comment}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Geographic Footprint */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-purple-600" />
                      Asset Footprint & Basin Exposure
                    </h4>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {multiYearData.semantic_themes.asset_footprint_basin.map((basin, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <span className="font-medium">{basin.basin_or_region}</span>
                          <Badge variant={basin.importance_label === 'High' ? 'default' : 'secondary'}>
                            {basin.importance_label}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Distribution Analysis */}
                {multiYearData.distribution_analysis.applies && (
                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-indigo-600" />
                        Distribution Analysis
                      </h4>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium mb-3">Policy Overview</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Cadence</span>
                              <Badge variant="outline">{multiYearData.distribution_analysis.cadence || 'Not Specified'}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Policy Character</span>
                              <Badge variant="outline">{multiYearData.distribution_analysis.policy_characterization}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Philosophy</span>
                              <Badge variant="outline">{multiYearData.distribution_analysis.policy_philosophy}</Badge>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium mb-3">Sustainability Signals</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">DCF Coverage</span>
                              <Badge variant={multiYearData.distribution_analysis.sustainability_signals.dcf_coverage === 'Strong' ? 'default' : 'secondary'}>
                                {multiYearData.distribution_analysis.sustainability_signals.dcf_coverage}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Policy Consistency</span>
                              <Badge variant={multiYearData.distribution_analysis.sustainability_signals.policy_consistency === 'Consistent' ? 'default' : 'secondary'}>
                                {multiYearData.distribution_analysis.sustainability_signals.policy_consistency}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Management Commitment</span>
                              <Badge variant={multiYearData.distribution_analysis.sustainability_signals.management_commitment === 'High' ? 'default' : 'secondary'}>
                                {multiYearData.distribution_analysis.sustainability_signals.management_commitment}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Distribution Actions Timeline */}
                      {multiYearData.distribution_analysis.distribution_actions.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-3">Distribution Actions Timeline</h5>
                          <div className="space-y-3">
                            {multiYearData.distribution_analysis.distribution_actions.map((action, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                                <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium">FY{action.year}</span>
                                    <Badge variant="outline" className="text-xs">
                                      {action.action}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600">{action.context}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Risk Register */}
                {multiYearData.semantic_themes.risk_register.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        Risk Register
                      </h4>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4">
                        {multiYearData.semantic_themes.risk_register.map((risk, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 border border-red-200 bg-red-50 rounded">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-red-800">{risk.name}</span>
                                <Badge variant={risk.severity === 'High' ? 'destructive' : risk.severity === 'Med' ? 'secondary' : 'outline'}>
                                  {risk.severity}
                                </Badge>
                              </div>
                              <p className="text-sm text-red-700 mb-2">{risk.note}</p>
                              <div className="text-xs text-red-600">
                                Mentioned in: {risk.recurrence_years.join(', ')}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Performance Scoring */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Performance Scoring
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Throughput Stability</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.throughput_stability_utilization}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.throughput_stability_utilization * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Fee Mix Quality</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.fee_mix_contract_quality}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.fee_mix_contract_quality * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">DCF Coverage</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.dcf_stability_coverage}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.dcf_stability_coverage * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Leverage & Liquidity</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.leverage_liquidity}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.leverage_liquidity * 10} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Counterparty Quality</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.counterparty_quality_concentration}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.counterparty_quality_concentration * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Asset Footprint</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.asset_footprint_basin_quality}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.asset_footprint_basin_quality * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Growth Discipline</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.external_growth_discipline}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.external_growth_discipline * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Risk Management</span>
                            <span className="text-sm text-gray-600">{multiYearData.scores.risk_overhangs}/10</span>
                          </div>
                          <Progress value={multiYearData.scores.risk_overhangs * 10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Data Processing...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Management Assessment Section */}
      {expandedSections.has('management') && (
        <Card>
          <CardHeader className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-emerald-600" />
                <div>
                  <h3 className="text-xl font-semibold">Management & Capital Allocation Assessment</h3>
                  <p className="text-sm text-muted-foreground">
                    Leadership credibility and communication quality analysis
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('management')}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {managementData ? (
              <>
                {/* Executive Summary */}
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-3">Management Assessment Synopsis</h4>
                  <p className="text-emerald-700 mb-4">{managementData.ui_summaries.synopsis}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">Key Highlights</h5>
                      <ul className="space-y-1">
                        {managementData.ui_summaries.bullet_highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-emerald-700 flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-emerald-800 mb-2">Watch Items</h5>
                      <ul className="space-y-1">
                        {managementData.ui_summaries.watch_items.map((item, index) => (
                          <li key={index} className="text-sm text-emerald-700 flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Credibility Tier */}
                <div className="flex items-center justify-center">
                  <div className={`px-6 py-3 rounded-full text-lg font-semibold ${getGradeColor(managementData.scores.credibility_tier)}`}>
                    Credibility Tier: {managementData.scores.credibility_tier}
                  </div>
                </div>

                {/* Red Flags & Green Flags */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {managementData.credibility_assessment.red_flags.length > 0 && (
                    <Card className="border-red-200">
                      <CardHeader>
                        <h4 className="font-semibold text-red-700 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Red Flags
                        </h4>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {managementData.credibility_assessment.red_flags.map((flag, index) => (
                            <li key={index} className="text-sm text-red-700 flex items-start gap-2">
                              <span className="text-red-400 mt-1">•</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {managementData.credibility_assessment.green_flags.length > 0 && (
                    <Card className="border-green-200">
                      <CardHeader>
                        <h4 className="font-semibold text-green-700 flex items-center gap-2">
                          <Target className="h-5 w-5" />
                          Green Flags
                        </h4>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {managementData.credibility_assessment.green_flags.map((flag, index) => (
                            <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Management Scoring */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-emerald-600" />
                      Credibility Scoring
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Promise Follow-Through</span>
                            <span className="text-sm text-gray-600">{managementData.scores.promise_follow_through}/10</span>
                          </div>
                          <Progress value={managementData.scores.promise_follow_through * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Tone Discipline</span>
                            <span className="text-sm text-gray-600">{managementData.scores.tone_discipline}/10</span>
                          </div>
                          <Progress value={managementData.scores.tone_discipline * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Disclosure Hygiene</span>
                            <span className="text-sm text-gray-600">{managementData.scores.disclosure_hygiene}/10</span>
                          </div>
                          <Progress value={managementData.scores.disclosure_hygiene * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Risk Candor</span>
                            <span className="text-sm text-gray-600">{managementData.scores.risk_candor}/10</span>
                          </div>
                          <Progress value={managementData.scores.risk_candor * 10} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Strategic Coherence</span>
                            <span className="text-sm text-gray-600">{managementData.scores.strategic_coherence}/10</span>
                          </div>
                          <Progress value={managementData.scores.strategic_coherence * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Capital Allocation</span>
                            <span className="text-sm text-gray-600">{managementData.scores.capital_allocation_consistency}/10</span>
                          </div>
                          <Progress value={managementData.scores.capital_allocation_consistency * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Metric Stability</span>
                            <span className="text-sm text-gray-600">{managementData.scores.metric_definition_stability}/10</span>
                          </div>
                          <Progress value={managementData.scores.metric_definition_stability * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Red Flag Management</span>
                            <span className="text-sm text-gray-600">{managementData.scores.red_flags}/10</span>
                          </div>
                          <Progress value={managementData.scores.red_flags * 10} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Data Processing...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Predictive Inference Section */}
      {expandedSections.has('predictive') && (
        <Card>
          <CardHeader className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Brain className="h-6 w-6 text-amber-600" />
                <div>
                  <h3 className="text-xl font-semibold">MLP Market Outlook & Positioning</h3>
                  <p className="text-sm text-muted-foreground">
                    Scenario-based forward-looking analysis
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('predictive')}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {predictiveData ? (
              <>
                {/* Executive Summary */}
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-amber-800 mb-3">Predictive Analysis Synopsis</h4>
                  <p className="text-amber-700 mb-4">{predictiveData.ui_summaries.synopsis}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-amber-800 mb-2">Key Highlights</h5>
                      <ul className="space-y-1">
                        {predictiveData.ui_summaries.bullet_highlights.map((highlight, index) => (
                          <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                            <span className="text-amber-400 mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-amber-800 mb-2">Watch Items</h5>
                      <ul className="space-y-1">
                        {predictiveData.ui_summaries.watch_items.map((item, index) => (
                          <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                            <span className="text-amber-400 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Scenarios */}
                <div className="grid gap-6">
                  {predictiveData.scenarios.map((scenario, index) => (
                    <Card key={index} className={`${
                      scenario.name === 'Base' ? 'border-blue-200 bg-blue-50' :
                      scenario.name === 'Upside' ? 'border-green-200 bg-green-50' :
                      'border-red-200 bg-red-50'
                    }`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold ${
                            scenario.name === 'Base' ? 'text-blue-800' :
                            scenario.name === 'Upside' ? 'text-green-800' :
                            'text-red-800'
                          }`}>
                            {scenario.name} Scenario
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            Confidence: {Math.round(scenario.confidence * 100)}%
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Key Drivers */}
                        <div>
                          <h5 className="font-medium mb-2">Key Drivers</h5>
                          <div className="flex flex-wrap gap-2">
                            {scenario.key_drivers.map((driver, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {driver}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Leading Indicators */}
                        <div>
                          <h5 className="font-medium mb-2">Leading Indicators</h5>
                          <ul className="space-y-1">
                            {scenario.leading_indicators.map((indicator, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{indicator}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Falsifiers */}
                        <div>
                          <h5 className="font-medium mb-2">Scenario Falsifiers</h5>
                          <ul className="space-y-1">
                            {scenario.falsifiers.map((falsifier, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <span className="text-gray-400 mt-1">•</span>
                                <span>{falsifier}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {scenario.numeric_context && (
                          <div className="bg-gray-100 p-3 rounded">
                            <h5 className="font-medium mb-1">Numeric Context</h5>
                            <p className="text-sm text-gray-700">{scenario.numeric_context}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Distribution Outlook */}
                {predictiveData.distribution_outlook.applies && (
                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        Distribution Outlook
                      </h4>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Expected Trajectory</span>
                        <Badge variant="outline">{predictiveData.distribution_outlook.trajectory}</Badge>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Key Factors</h5>
                        <ul className="space-y-1">
                          {predictiveData.distribution_outlook.key_factors.map((factor, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-gray-400 mt-1">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Policy Signals</h5>
                        <ul className="space-y-1">
                          {predictiveData.distribution_outlook.policy_signals.map((signal, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-gray-400 mt-1">•</span>
                              <span>{signal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {predictiveData.distribution_outlook.structure_notes && (
                        <div className="bg-blue-50 p-3 rounded">
                          <h5 className="font-medium text-blue-800 mb-1">Structure Notes</h5>
                          <p className="text-sm text-blue-700">{predictiveData.distribution_outlook.structure_notes}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Data Processing...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Business Thesis Section */}
      {expandedSections.has('thesis') && (
        <Card>
          <CardHeader className="sticky top-0 z-10 bg-white border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Building2 className="h-6 w-6 text-orange-600" />
                <div>
                  <h3 className="text-xl font-semibold">MLP Business Thesis</h3>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive synthesis of multi-agent analysis
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('thesis')}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {thesisData ? (
              <>
                {/* Thesis Statement */}
                <div className="bg-orange-50 p-6 rounded-lg text-center">
                  <h4 className="font-semibold text-orange-800 mb-3">Business Thesis Statement</h4>
                  <p className="text-lg text-orange-700 font-medium">{thesisData.mlp_thesis.thesis_statement}</p>
                </div>

                {/* Viability Assessment */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Gauge className="h-5 w-5 text-blue-600" />
                      Viability Assessment
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className={`px-6 py-3 rounded-full text-lg font-semibold ${getGradeColor(thesisData.viability_assessment.tier)}`}>
                        Viability Tier: {thesisData.viability_assessment.tier}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">System Durability</span>
                            <span className="text-sm text-gray-600">{thesisData.viability_assessment.subscores.system_durability}/10</span>
                          </div>
                          <Progress value={thesisData.viability_assessment.subscores.system_durability * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Execution Quality</span>
                            <span className="text-sm text-gray-600">{thesisData.viability_assessment.subscores.execution_quality}/10</span>
                          </div>
                          <Progress value={thesisData.viability_assessment.subscores.execution_quality * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Financial Resilience</span>
                            <span className="text-sm text-gray-600">{thesisData.viability_assessment.subscores.financial_resilience}/10</span>
                          </div>
                          <Progress value={thesisData.viability_assessment.subscores.financial_resilience * 10} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Risk Balance</span>
                            <span className="text-sm text-gray-600">{thesisData.viability_assessment.subscores.risk_balance}/10</span>
                          </div>
                          <Progress value={thesisData.viability_assessment.subscores.risk_balance * 10} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm font-medium">Governance Quality</span>
                            <span className="text-sm text-gray-600">{thesisData.viability_assessment.subscores.governance_quality}/10</span>
                          </div>
                          <Progress value={thesisData.viability_assessment.subscores.governance_quality * 10} className="h-2" />
                        </div>
                        
                        <div className="mt-6">
                          <div className="flex justify-between mb-2">
                            <span className="text-base font-semibold">Composite Score</span>
                            <span className="text-base font-semibold text-blue-600">{thesisData.viability_assessment.composite.toFixed(1)}/10</span>
                          </div>
                          <Progress value={thesisData.viability_assessment.composite * 10} className="h-3" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded">
                      <h5 className="font-medium mb-2">Assessment Rationale</h5>
                      <p className="text-sm text-gray-700">{thesisData.viability_assessment.rationale}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Throughput Engine */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold text-green-700 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Value Creation Drivers
                      </h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {thesisData.mlp_thesis.value_creation_drivers.map((driver, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-green-400 mt-1">•</span>
                            <span>{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold text-red-700 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        Key Fragilities
                      </h4>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {thesisData.mlp_thesis.fragilities.map((fragility, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <span className="text-red-400 mt-1">•</span>
                            <span>{fragility}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Watchlist */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      Monitoring Watchlist
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-green-700 mb-3">Leading Indicators</h5>
                        <ul className="space-y-2">
                          {thesisData.watchlist.leading_indicators.map((indicator, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-green-400 mt-1">•</span>
                              <span>{indicator}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h5 className="font-medium text-amber-700 mb-3">Early Warnings</h5>
                        <ul className="space-y-2">
                          {thesisData.watchlist.early_warnings.map((warning, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-amber-400 mt-1">•</span>
                              <span>{warning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {thesisData.watchlist.data_gaps.length > 0 && (
                      <div>
                        <h5 className="font-medium text-gray-700 mb-3">Data Gaps</h5>
                        <ul className="space-y-2">
                          {thesisData.watchlist.data_gaps.map((gap, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-gray-400 mt-1">•</span>
                              <span>{gap}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Transition Triggers */}
                {thesisData.transition_triggers.length > 0 && (
                  <Card>
                    <CardHeader>
                      <h4 className="font-semibold flex items-center gap-2">
                        <Activity className="h-5 w-5 text-indigo-600" />
                        Transition Triggers
                      </h4>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {thesisData.transition_triggers.map((trigger, index) => (
                          <div key={index} className="border border-gray-200 p-4 rounded">
                            <div className="flex items-start justify-between mb-2">
                              <h5 className="font-medium">{trigger.event}</h5>
                              <Badge variant={trigger.interpretation === 'Positive' ? 'default' : trigger.interpretation === 'Negative' ? 'destructive' : 'secondary'}>
                                {trigger.interpretation}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">
                              <strong>Expected Effect:</strong> {trigger.expected_effect}
                            </p>
                            <p className="text-sm text-gray-600">
                              <strong>Thesis Update Rule:</strong> {trigger.thesis_update_rule}
                            </p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">Data Processing...</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

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

// Helper function to safely parse JSON content
function parseJSONContent(content: string): unknown {
  try {
    return JSON.parse(content);
  } catch {
    return null;
  }
}

// Main wrapper component that handles ParsedReport structure
export default function MLPEquityReport({ report }: MLPReportProps) {
  // Try to get structured data from each section first, fallback to parsing content
  const rawMultiYearData = report.sections.multi_year_analysis.structured_data || parseJSONContent(report.sections.multi_year_analysis.content);
  const rawManagementData = report.sections.management_credibility.structured_data || parseJSONContent(report.sections.management_credibility.content);
  const rawPredictiveData = report.sections.predictive_inference.structured_data || parseJSONContent(report.sections.predictive_inference.content);
  const rawThesisData = report.sections.final_thesis?.structured_data || parseJSONContent(report.sections.final_thesis?.content || '');

  // Type guard function to check if data has the expected MLP structure
  const isValidMLPData = (data: unknown, requiredKeys: string[]): boolean => {
    return data && 
           typeof data === 'object' && 
           data !== null &&
           Object.keys(data).length > 0 &&
           requiredKeys.some(key => key in data);
  };

  // Check if we have valid MLP structured data and cast to proper types
  const hasMultiYear = isValidMLPData(rawMultiYearData, ['company', 'window', 'semantic_themes']);
  const hasManagement = isValidMLPData(rawManagementData, ['company', 'window', 'credibility_assessment']);
  const hasPredictive = isValidMLPData(rawPredictiveData, ['company', 'window', 'scenarios']);
  const hasThesis = isValidMLPData(rawThesisData, ['company', 'window', 'mlp_thesis']);

  // Cast to proper types only if validation passes
  const multiYearData = hasMultiYear ? rawMultiYearData as MLPMultiYearData : null;
  const managementData = hasManagement ? rawManagementData as MLPManagementData : null;
  const predictiveData = hasPredictive ? rawPredictiveData as MLPPredictiveData : null;
  const thesisData = hasThesis ? rawThesisData as MLPThesisData : null;

  // If we have any structured JSON data, use the full MLP component
  if (hasMultiYear || hasManagement || hasPredictive || hasThesis) {
    return (
      <MLPEquityReportContent
        multiYearData={multiYearData}
        managementData={managementData}
        predictiveData={predictiveData}
        thesisData={thesisData}
      />
    );
  }

  // For text-based MLP reports, display them in a structured format
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">{report.ticker}</h2>
          <Badge className="bg-purple-100 text-purple-800">MLP</Badge>
          <span className="text-muted-foreground">({report.years_range})</span>
        </div>
      </div>

      {/* MLP Analysis Sections */}
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
                        This section contains structured analysis data that will be displayed in the enhanced MLP interface once the data parsing is fully implemented.
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
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Eye className="h-5 w-5 text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-semibold text-purple-800 mb-1">Enhanced MLP Analysis</h4>
              <p className="text-sm text-purple-700">
                This MLP analysis includes multi-year operational trends, management credibility assessment, 
                and predictive inference specific to master limited partnerships. The structured interface 
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
