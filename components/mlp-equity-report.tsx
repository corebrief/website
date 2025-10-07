'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Shield,
  Brain,
  Building2,
  Eye,
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
import { type ParsedReport, type MLPMultiYearAnalysis } from '@/utils/report-parsers';

// Use the centralized interface
type MLPMultiYearData = MLPMultiYearAnalysis;

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

// Define section keys type
type SectionKey = 'multi_year' | 'management' | 'predictive' | 'thesis';

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
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(new Set());

  const toggleSection = (section: SectionKey) => {
    if (expandedSections.has(section)) {
      // If clicking the currently open section, close it
      setExpandedSections(new Set());
    } else {
      // If clicking a different section, show only that section
      setExpandedSections(new Set([section]));
    }
  };

  const company = multiYearData?.company || managementData?.company || predictiveData?.company || thesisData?.company || 'MLP Analysis';
  const yearsRange = multiYearData ? `FY${multiYearData.window.start_fy}-${multiYearData.window.end_fy}` : '';

  return (
    <div className="w-full space-y-8">
      
      {/* Mobile-Responsive Navigation Header */}
      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-sm border-b border-slate-200 mb-4">
        <div className="py-3 px-4">
          {/* Title - Always on top */}
          <div className="text-center lg:text-left mb-3 lg:mb-0">
            <h2 className="text-base font-semibold text-slate-800">Business Analysis Framework</h2>
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
                <div className="font-semibold">Business Thesis</div>
                {!expandedSections.has('thesis') && <div className="text-[10px] opacity-75 mt-0.5">Click to View</div>}
              </div>
            </button>
          </div>

          {/* Mobile: Grid Layout */}
          <div className="lg:hidden grid grid-cols-2 gap-2">
            <button 
              className={`px-3 py-3 text-xs rounded-md border transition-all duration-200 ${
                expandedSections.has('multi_year') 
                  ? 'bg-blue-500 text-white border-blue-500 shadow-md' 
                  : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
              }`}
              onClick={() => toggleSection('multi_year')}
            >
              <div className="text-center">
                <div className="font-medium">Multi-Year</div>
                {!expandedSections.has('multi_year') && <div className="text-[10px] opacity-75 mt-1">Tap to View</div>}
              </div>
            </button>
            <button 
              className={`px-3 py-3 text-xs rounded-md border transition-all duration-200 ${
                expandedSections.has('management') 
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' 
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
              }`}
              onClick={() => toggleSection('management')}
            >
              <div className="text-center">
                <div className="font-medium">Management</div>
                {!expandedSections.has('management') && <div className="text-[10px] opacity-75 mt-1">Tap to View</div>}
              </div>
            </button>
            <button 
              className={`px-3 py-3 text-xs rounded-md border transition-all duration-200 ${
                expandedSections.has('predictive') 
                  ? 'bg-amber-500 text-white border-amber-500 shadow-md' 
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              onClick={() => toggleSection('predictive')}
            >
              <div className="text-center">
                <div className="font-medium">Predictive</div>
                {!expandedSections.has('predictive') && <div className="text-[10px] opacity-75 mt-1">Tap to View</div>}
              </div>
            </button>
            <button 
              className={`px-3 py-3 text-xs rounded-md border-2 transition-all duration-200 font-medium ${
                expandedSections.has('thesis') 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                  : 'bg-orange-50 text-orange-700 border-orange-300 hover:bg-orange-100'
              }`}
              onClick={() => toggleSection('thesis')}
            >
              <div className="text-center">
                <div className="font-semibold">Business Thesis</div>
                {!expandedSections.has('thesis') && <div className="text-[10px] opacity-75 mt-1">Tap to View</div>}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Company Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-800">{company}</h1>
          <Badge className="bg-purple-100 text-purple-800">MLP</Badge>
          {yearsRange && <span className="text-slate-500">({yearsRange})</span>}
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
        <div className="flex flex-wrap gap-2 px-4">
          {multiYearData.classification.mlp_profile_tags.map((tag, index) => (
            <Badge key={index} className={getMLPProfileColor(tag)}>
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Default State */}
      {expandedSections.size === 0 && (
        <div className="text-center py-12 bg-slate-50 rounded-lg border border-slate-200 mx-4">
          <div className="max-w-md mx-auto">
            <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-medium text-slate-700 mb-2">MLP Analysis Dashboard</h3>
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
              <button
                className="text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => toggleSection('multi_year')}
              >
                <span className="text-xs">✕</span>
              </button>
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {multiYearData ? (
              <>
                {/* Header Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-blue-800 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Multi-Year MLP Performance Analysis
                    </h4>
                    <div className="flex items-center gap-3">
                      <Badge className={`px-3 py-1 ${
                        multiYearData.grading.letter.startsWith('A') ? 'bg-green-500 text-white' :
                        multiYearData.grading.letter.startsWith('B') ? 'bg-blue-500 text-white' :
                        multiYearData.grading.letter.startsWith('C') ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        Grade: {multiYearData.grading.letter}
                      </Badge>
                      <Badge variant="outline" className="bg-white">
                        Score: {multiYearData.scores.composite_score.toFixed(1)}/10
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="text-2xl font-bold text-blue-600">{multiYearData.window.num_years}</div>
                      <div className="text-xs text-blue-600">Years Analyzed</div>
                      <div className="text-xs text-gray-500">FY{multiYearData.window.start_fy}-{multiYearData.window.end_fy}</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="text-2xl font-bold text-green-600">{multiYearData.classification.primary}</div>
                      <div className="text-xs text-green-600">Primary Classification</div>
                    </div>
                    <div className="text-center p-3 bg-white rounded border">
                      <div className="text-lg font-bold text-purple-600">{multiYearData.semantic_themes.throughput_trend.label}</div>
                      <div className="text-xs text-purple-600">Throughput Trend</div>
                    </div>
                  </div>
                  
                  <p className="text-blue-700 text-sm leading-relaxed">{multiYearData.ui_summaries.synopsis}</p>
                </div>

                {/* Key Highlights & Watch Items */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h5 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Key Operational Highlights
                    </h5>
                    <ul className="space-y-2">
                      {multiYearData.ui_summaries.bullet_highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-amber-50">
                    <h5 className="font-semibold mb-3 text-amber-800 flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Watch Items & Considerations
                    </h5>
                    <ul className="space-y-2">
                      {multiYearData.ui_summaries.watch_items.map((item, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Coverage Analysis */}
                <div className="p-4 border rounded-lg bg-slate-50">
                  <h4 className="font-semibold mb-4 text-slate-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Data Coverage & Quality Assessment
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium mb-2 text-slate-700">Years Covered</h5>
                      <div className="flex flex-wrap gap-2">
                        {multiYearData.coverage.years_received.map((year, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            FY{year}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="font-medium mb-2 text-slate-700">Data Quality Notes</h5>
                      <div className="space-y-1 max-h-32 overflow-y-auto">
                        {multiYearData.coverage.notes.map((note, index) => (
                          <p key={index} className="text-xs text-slate-600 p-2 bg-white rounded border">
                            {note}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operational Themes Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Throughput & Utilization */}
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-semibold mb-4 text-blue-800 flex items-center gap-2">
                      <Fuel className="h-5 w-5" />
                      Throughput & Utilization Analysis
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Throughput Direction</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.throughput_trend.label === 'Rising' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.throughput_trend.label === 'Stable' ? 'bg-blue-100 text-blue-800' :
                          multiYearData.semantic_themes.throughput_trend.label === 'Falling' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {multiYearData.semantic_themes.throughput_trend.label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Utilization Trend</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.utilization_trend.label === 'Improving' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.utilization_trend.label === 'Stable' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.utilization_trend.label}
                        </Badge>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Asset Portfolio</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {multiYearData.semantic_themes.throughput_trend.assets.map((asset, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {asset}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-blue-700">
                          <strong>Analysis:</strong> {multiYearData.semantic_themes.throughput_trend.rationale}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-blue-700">
                          <strong>Utilization Notes:</strong> {multiYearData.semantic_themes.utilization_trend.notes}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Fee Mix & Contract Quality */}
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h4 className="font-semibold mb-4 text-green-800 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Fee Mix & Contract Structure
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Fee-Based Exposure</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.fee_mix_contracts.fee_based_exposure_label === 'High' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.fee_mix_contracts.fee_based_exposure_label === 'Medium' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.fee_mix_contracts.fee_based_exposure_label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Take-or-Pay/MVC</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.fee_mix_contracts.take_or_pay_mvc_presence === 'Prevalent' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.fee_mix_contracts.take_or_pay_mvc_presence === 'Selective' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.fee_mix_contracts.take_or_pay_mvc_presence}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Contract Tenor</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.fee_mix_contracts.average_contract_tenor_label.includes('Long') ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.fee_mix_contracts.average_contract_tenor_label.includes('Balanced') ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {multiYearData.semantic_themes.fee_mix_contracts.average_contract_tenor_label}
                        </Badge>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-green-700">
                          <strong>Commodity Exposure:</strong> {multiYearData.semantic_themes.fee_mix_contracts.commodity_exposure_comment}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Counterparty & Geographic Analysis */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Counterparty Profile */}
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <h4 className="font-semibold mb-4 text-purple-800 flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      Counterparty Profile
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Investment Grade Exposure</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.counterparty_profile.investment_grade_exposure_label === 'High' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.counterparty_profile.investment_grade_exposure_label === 'Medium' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.counterparty_profile.investment_grade_exposure_label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Customer Concentration</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.counterparty_profile.top_customer_concentration_label.includes('Low') ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.counterparty_profile.top_customer_concentration_label.includes('Medium') ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.counterparty_profile.top_customer_concentration_label}
                        </Badge>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-purple-700">
                          <strong>Profile Notes:</strong> {multiYearData.semantic_themes.counterparty_profile.notes}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Geographic Footprint */}
                  <div className="p-4 border rounded-lg bg-indigo-50">
                    <h4 className="font-semibold mb-4 text-indigo-800 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Geographic Footprint
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {multiYearData.semantic_themes.asset_footprint_basin.map((basin, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                          <span className="text-sm font-medium">{basin.basin_or_region}</span>
                          <Badge className={`text-xs ${
                            basin.importance_label === 'High' ? 'bg-green-100 text-green-800' :
                            basin.importance_label === 'Medium' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {basin.importance_label}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Financial Profile */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* DCF Coverage & Leverage */}
                  <div className="p-4 border rounded-lg bg-teal-50">
                    <h4 className="font-semibold mb-4 text-teal-800 flex items-center gap-2">
                      <Gauge className="h-5 w-5" />
                      Financial Profile
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">DCF Coverage Character</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.dcf_coverage_character.label === 'Conservative' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.dcf_coverage_character.label === 'Balanced' ? 'bg-blue-100 text-blue-800' :
                          multiYearData.semantic_themes.dcf_coverage_character.label === 'Tight' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.dcf_coverage_character.label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Leverage Profile</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.leverage_liquidity.leverage_label === 'Low' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.leverage_liquidity.leverage_label === 'Medium' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.leverage_liquidity.leverage_label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Rate Exposure</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.leverage_liquidity.rate_exposure_label === 'MostlyFixed' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.leverage_liquidity.rate_exposure_label === 'Mixed' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.leverage_liquidity.rate_exposure_label}
                        </Badge>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-teal-700">
                          <strong>Coverage Analysis:</strong> {multiYearData.semantic_themes.dcf_coverage_character.stability_comment}
                        </p>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-teal-700">
                          <strong>Liquidity Profile:</strong> {multiYearData.semantic_themes.leverage_liquidity.liquidity_comment}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Growth & Competitive Position */}
                  <div className="p-4 border rounded-lg bg-orange-50">
                    <h4 className="font-semibold mb-4 text-orange-800 flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Growth & Competitive Dynamics
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Growth Activity</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.external_growth_recycling.activity_label === 'Active' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.external_growth_recycling.activity_label === 'Selective' ? 'bg-blue-100 text-blue-800' :
                          multiYearData.semantic_themes.external_growth_recycling.activity_label === 'Limited' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.external_growth_recycling.activity_label}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Competitive Posture</span>
                        <Badge className={`${
                          multiYearData.semantic_themes.competitive_posture.label === 'Strengthening' ? 'bg-green-100 text-green-800' :
                          multiYearData.semantic_themes.competitive_posture.label === 'Stable' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {multiYearData.semantic_themes.competitive_posture.label}
                        </Badge>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Growth Modes</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {multiYearData.semantic_themes.external_growth_recycling.modes.map((mode, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {mode}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium">Competitive Drivers</span>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {multiYearData.semantic_themes.competitive_posture.drivers.map((driver, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {driver}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white rounded border">
                        <p className="text-xs text-orange-700">
                          <strong>Growth Discipline:</strong> {multiYearData.semantic_themes.external_growth_recycling.discipline_note}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Series Analysis */}
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Multi-Year Trend Analysis
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium mb-3 text-gray-700">Volume Trends by Year</h5>
                      <div className="space-y-2">
                        {multiYearData.timeseries_semantic.volumes_by_year.map((volume, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <span className="text-sm font-medium">FY{volume.year}</span>
                            <Badge className={`text-xs ${
                              volume.label === 'Up' ? 'bg-green-100 text-green-800' :
                              volume.label === 'Flat' ? 'bg-blue-100 text-blue-800' :
                              volume.label === 'Down' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {volume.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-3 text-gray-700">Fee Mix Evolution</h5>
                      <div className="space-y-2">
                        {multiYearData.timeseries_semantic.fee_mix_by_year.map((feeMix, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <span className="text-sm font-medium">FY{feeMix.year}</span>
                            <Badge className={`text-xs ${
                              feeMix.label === 'MoreFeeBased' ? 'bg-green-100 text-green-800' :
                              feeMix.label === 'Stable' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {feeMix.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-3 text-gray-700">Distribution Policy</h5>
                      <div className="space-y-2">
                        {multiYearData.timeseries_semantic.distribution_policy_by_year.map((policy, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <span className="text-sm font-medium">FY{policy.year}</span>
                            <Badge className={`text-xs ${
                              policy.label === 'Increased' ? 'bg-green-100 text-green-800' :
                              policy.label === 'Stable' ? 'bg-blue-100 text-blue-800' :
                              policy.label === 'Cut' ? 'bg-red-100 text-red-800' :
                              policy.label === 'Suspended' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {policy.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Distribution Analysis - Enhanced */}
                {multiYearData.distribution_analysis.applies && (
                  <div className="p-6 border-2 rounded-lg bg-gradient-to-br from-slate-50 to-purple-50 border-slate-300">
                    <h4 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                      MLP Distribution Analysis
                    </h4>
                    
                    <div className="space-y-6">
                      {/* Policy Overview */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-4 border rounded-lg bg-purple-50">
                          <h5 className="font-semibold mb-2 text-purple-800">Policy Overview</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Cadence:</span>
                              <Badge variant="outline" className="text-xs">
                                {multiYearData.distribution_analysis.cadence || 'Not Specified'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Character:</span>
                              <Badge variant="outline" className="text-xs">
                                {multiYearData.distribution_analysis.policy_characterization}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Philosophy:</span>
                              <Badge variant="outline" className="text-xs">
                                {multiYearData.distribution_analysis.policy_philosophy}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg bg-blue-50">
                          <h5 className="font-semibold mb-2 text-blue-800">Coverage Metrics</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">DCF Coverage:</span>
                              <Badge variant="outline" className="text-xs">
                                {multiYearData.distribution_analysis.coverage_metrics.dcf_coverage_bucket}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Coverage Trend:</span>
                              <Badge variant="outline" className="text-xs">
                                {multiYearData.distribution_analysis.coverage_metrics.coverage_trend}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 border rounded-lg bg-green-50">
                          <h5 className="font-semibold mb-2 text-green-800">Sustainability Signals</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">DCF Coverage:</span>
                              <Badge className={`text-xs ${
                                multiYearData.distribution_analysis.sustainability_signals.dcf_coverage === 'Strong' ? 'bg-green-100 text-green-800' :
                                multiYearData.distribution_analysis.sustainability_signals.dcf_coverage === 'Adequate' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {multiYearData.distribution_analysis.sustainability_signals.dcf_coverage}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Policy Consistency:</span>
                              <Badge className={`text-xs ${
                                multiYearData.distribution_analysis.sustainability_signals.policy_consistency === 'Consistent' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {multiYearData.distribution_analysis.sustainability_signals.policy_consistency}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs">Management Commitment:</span>
                              <Badge className={`text-xs ${
                                multiYearData.distribution_analysis.sustainability_signals.management_commitment === 'High' ? 'bg-green-100 text-green-800' :
                                multiYearData.distribution_analysis.sustainability_signals.management_commitment === 'Medium' ? 'bg-blue-100 text-blue-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {multiYearData.distribution_analysis.sustainability_signals.management_commitment}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Distribution Actions Timeline */}
                      {multiYearData.distribution_analysis.distribution_actions.length > 0 && (
                        <div className="p-4 border rounded-lg bg-slate-50">
                          <h5 className="font-semibold mb-3 text-slate-800">Distribution Actions Timeline</h5>
                          <div className="space-y-3">
                            {multiYearData.distribution_analysis.distribution_actions.map((action, index) => (
                              <div key={index} className="flex items-start gap-3 p-3 bg-white rounded border">
                                <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">FY{action.year}</span>
                                    <Badge className={`text-xs ${
                                      action.action === 'Increased' ? 'bg-green-100 text-green-800' :
                                      action.action === 'Maintained' ? 'bg-blue-100 text-blue-800' :
                                      action.action === 'Cut' ? 'bg-red-100 text-red-800' :
                                      action.action === 'Suspended' ? 'bg-red-100 text-red-800' :
                                      'bg-gray-100 text-gray-800'
                                    }`}>
                                      {action.action}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-600">{action.context}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* MLP-Specific Factors */}
                      <div className="p-4 border rounded-lg bg-indigo-50">
                        <h5 className="font-semibold mb-3 text-indigo-800">MLP-Specific Factors</h5>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">IDRs Elimination</span>
                            <Badge className={`text-xs ${
                              multiYearData.distribution_analysis.mlp_specific_factors.idrs_elimination_mentioned ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {multiYearData.distribution_analysis.mlp_specific_factors.idrs_elimination_mentioned ? 'Mentioned' : 'Not Mentioned'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">GP/LP Simplification</span>
                            <Badge variant="outline" className="text-xs">
                              {multiYearData.distribution_analysis.mlp_specific_factors.gp_lp_simplification}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">C-Corp Conversion</span>
                            <Badge variant="outline" className="text-xs">
                              {multiYearData.distribution_analysis.mlp_specific_factors.c_corp_conversion_mentions}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Sustainability Factors */}
                      {multiYearData.distribution_analysis.sustainability_factors.length > 0 && (
                        <div className="p-4 border rounded-lg bg-teal-50">
                          <h5 className="font-semibold mb-3 text-teal-800">Key Sustainability Factors</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {multiYearData.distribution_analysis.sustainability_factors.map((factor, index) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-white rounded border">
                                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-xs text-teal-700">{factor}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Risk Register - Enhanced */}
                {multiYearData.semantic_themes.risk_register.length > 0 && (
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h4 className="font-semibold mb-4 text-red-800 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Comprehensive Risk Register
                    </h4>
                    <div className="grid gap-4">
                      {multiYearData.semantic_themes.risk_register.map((risk, index) => (
                        <div key={index} className="p-4 border border-red-200 bg-white rounded">
                          <div className="flex items-start gap-3">
                            <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                              risk.severity === 'High' ? 'text-red-600' :
                              risk.severity === 'Med' ? 'text-yellow-600' :
                              'text-gray-600'
                            }`} />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-red-800">{risk.name}</span>
                                <Badge className={`text-xs ${
                                  risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                                  risk.severity === 'Med' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {risk.severity} Risk
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {risk.recurrence_years.length} years
                                </Badge>
                              </div>
                              <p className="text-sm text-red-700 mb-2">{risk.note}</p>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-red-600 font-medium">Mentioned in:</span>
                                <div className="flex flex-wrap gap-1">
                                  {risk.recurrence_years.map((year, yearIndex) => (
                                    <Badge key={yearIndex} variant="outline" className="text-xs">
                                      FY{year}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performance Scoring - Enhanced */}
                <div className="p-6 border-2 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 border-blue-200">
                  <h4 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    Comprehensive Performance Scoring
                  </h4>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Throughput Stability & Utilization</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.throughput_stability_utilization.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.throughput_stability_utilization >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.throughput_stability_utilization >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.throughput_stability_utilization >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.throughput_stability_utilization >= 8 ? 'Strong' :
                               multiYearData.scores.throughput_stability_utilization >= 6 ? 'Good' :
                               multiYearData.scores.throughput_stability_utilization >= 4 ? 'Fair' : 'Weak'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.throughput_stability_utilization * 10} className="h-3" />
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Fee Mix & Contract Quality</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.fee_mix_contract_quality.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.fee_mix_contract_quality >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.fee_mix_contract_quality >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.fee_mix_contract_quality >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.fee_mix_contract_quality >= 8 ? 'Strong' :
                               multiYearData.scores.fee_mix_contract_quality >= 6 ? 'Good' :
                               multiYearData.scores.fee_mix_contract_quality >= 4 ? 'Fair' : 'Weak'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.fee_mix_contract_quality * 10} className="h-3" />
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">DCF Stability & Coverage</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.dcf_stability_coverage.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.dcf_stability_coverage >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.dcf_stability_coverage >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.dcf_stability_coverage >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.dcf_stability_coverage >= 8 ? 'Strong' :
                               multiYearData.scores.dcf_stability_coverage >= 6 ? 'Good' :
                               multiYearData.scores.dcf_stability_coverage >= 4 ? 'Fair' : 'Weak'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.dcf_stability_coverage * 10} className="h-3" />
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Leverage & Liquidity</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.leverage_liquidity.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.leverage_liquidity >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.leverage_liquidity >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.leverage_liquidity >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.leverage_liquidity >= 8 ? 'Strong' :
                               multiYearData.scores.leverage_liquidity >= 6 ? 'Good' :
                               multiYearData.scores.leverage_liquidity >= 4 ? 'Fair' : 'Weak'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.leverage_liquidity * 10} className="h-3" />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Counterparty Quality & Concentration</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.counterparty_quality_concentration.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.counterparty_quality_concentration >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.counterparty_quality_concentration >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.counterparty_quality_concentration >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.counterparty_quality_concentration >= 8 ? 'Strong' :
                               multiYearData.scores.counterparty_quality_concentration >= 6 ? 'Good' :
                               multiYearData.scores.counterparty_quality_concentration >= 4 ? 'Fair' : 'Weak'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.counterparty_quality_concentration * 10} className="h-3" />
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Asset Footprint & Basin Quality</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.asset_footprint_basin_quality.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.asset_footprint_basin_quality >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.asset_footprint_basin_quality >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.asset_footprint_basin_quality >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.asset_footprint_basin_quality >= 8 ? 'Strong' :
                               multiYearData.scores.asset_footprint_basin_quality >= 6 ? 'Good' :
                               multiYearData.scores.asset_footprint_basin_quality >= 4 ? 'Fair' : 'Weak'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.asset_footprint_basin_quality * 10} className="h-3" />
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">External Growth Discipline</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.external_growth_discipline.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.external_growth_discipline >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.external_growth_discipline >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.external_growth_discipline >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.external_growth_discipline >= 8 ? 'Strong' :
                               multiYearData.scores.external_growth_discipline >= 6 ? 'Good' :
                               multiYearData.scores.external_growth_discipline >= 4 ? 'Fair' : 'Weak'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.external_growth_discipline * 10} className="h-3" />
                      </div>
                      
                      <div className="p-4 bg-white rounded-lg border">
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-medium">Risk Management (Inverse)</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">{multiYearData.scores.risk_overhangs.toFixed(1)}/10</span>
                            <Badge className={`text-xs ${
                              multiYearData.scores.risk_overhangs >= 8 ? 'bg-green-100 text-green-800' :
                              multiYearData.scores.risk_overhangs >= 6 ? 'bg-blue-100 text-blue-800' :
                              multiYearData.scores.risk_overhangs >= 4 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {multiYearData.scores.risk_overhangs >= 8 ? 'Low Risk' :
                               multiYearData.scores.risk_overhangs >= 6 ? 'Moderate Risk' :
                               multiYearData.scores.risk_overhangs >= 4 ? 'Elevated Risk' : 'High Risk'}
                            </Badge>
                          </div>
                        </div>
                        <Progress value={multiYearData.scores.risk_overhangs * 10} className="h-3" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Composite Score Summary */}
                  <div className="mt-6 p-4 bg-white rounded-lg border-2 border-blue-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-bold text-blue-800">Composite Performance Score</span>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-blue-600">{multiYearData.scores.composite_score.toFixed(1)}/10</span>
                        <Badge className={`text-lg px-4 py-2 ${
                          multiYearData.grading.letter.startsWith('A') ? 'bg-green-500 text-white' :
                          multiYearData.grading.letter.startsWith('B') ? 'bg-blue-500 text-white' :
                          multiYearData.grading.letter.startsWith('C') ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          Grade: {multiYearData.grading.letter}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={multiYearData.scores.composite_score * 10} className="h-4" />
                    <p className="text-xs text-blue-600 mt-2">{multiYearData.grading.mapping_note}</p>
                  </div>
                </div>

                {/* Structure & Governance Notes */}
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <h4 className="font-semibold mb-4 text-yellow-800 flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    MLP Structure & Governance
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">IDRs Status</span>
                      <Badge className={`text-xs ${
                        multiYearData.semantic_themes.structure_notes.idrs_status === 'Eliminated' ? 'bg-green-100 text-green-800' :
                        multiYearData.semantic_themes.structure_notes.idrs_status === 'Present' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {multiYearData.semantic_themes.structure_notes.idrs_status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">C-Corp Conversion</span>
                      <Badge variant="outline" className="text-xs">
                        {multiYearData.semantic_themes.structure_notes.c_corp_conversion_mentions}
                      </Badge>
                    </div>
                    <div className="col-span-1 md:col-span-1">
                      <span className="text-sm font-medium">Structure Notes</span>
                      <p className="text-xs text-yellow-700 mt-1">{multiYearData.semantic_themes.structure_notes.notes}</p>
                    </div>
                  </div>
                </div>

                {/* Optional Numerics */}
                {(multiYearData.optional_numerics.mentioned_throughput.length > 0 || 
                  multiYearData.optional_numerics.mentioned_leverage_debt_to_ebitda || 
                  multiYearData.optional_numerics.capex_split_notes) && (
                  <div className="p-4 border rounded-lg bg-gray-50">
                    <h4 className="font-semibold mb-4 text-gray-800 flex items-center gap-2">
                      <Gauge className="h-5 w-5" />
                      Quantitative Highlights
                    </h4>
                    <div className="space-y-4">
                      {multiYearData.optional_numerics.mentioned_throughput.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-2 text-gray-700">Mentioned Throughput Metrics</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {multiYearData.optional_numerics.mentioned_throughput.map((throughput, index) => (
                              <div key={index} className="p-3 bg-white rounded border">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium">{throughput.asset}</span>
                                  <Badge variant="outline" className="text-xs">{throughput.unit}</Badge>
                                </div>
                                <p className="text-xs text-gray-600">{throughput.value_range || 'Range not specified'}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {multiYearData.optional_numerics.mentioned_leverage_debt_to_ebitda && (
                        <div className="p-3 bg-white rounded border">
                          <span className="text-sm font-medium">Mentioned Leverage (Debt/EBITDA): </span>
                          <Badge className="ml-2">{multiYearData.optional_numerics.mentioned_leverage_debt_to_ebitda.toFixed(1)}x</Badge>
                        </div>
                      )}
                      
                      {multiYearData.optional_numerics.capex_split_notes && (
                        <div className="p-3 bg-white rounded border">
                          <span className="text-sm font-medium">CapEx Split Notes: </span>
                          <p className="text-xs text-gray-600 mt-1">{multiYearData.optional_numerics.capex_split_notes}</p>
                        </div>
                      )}
                      
                      {multiYearData.optional_numerics.notes && (
                        <div className="p-3 bg-white rounded border">
                          <span className="text-sm font-medium">Additional Notes: </span>
                          <p className="text-xs text-gray-600 mt-1">{multiYearData.optional_numerics.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Classification Summary */}
                <div className="p-4 border rounded-lg bg-indigo-50">
                  <h4 className="font-semibold mb-4 text-indigo-800 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    MLP Classification & Profile
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-medium">Primary Classification:</span>
                        <Badge className="bg-indigo-100 text-indigo-800">{multiYearData.classification.primary}</Badge>
                      </div>
                      {multiYearData.classification.secondary.length > 0 && (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">Secondary:</span>
                          <div className="flex flex-wrap gap-1">
                            {multiYearData.classification.secondary.map((secondary, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {secondary}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <span className="text-sm font-medium">MLP Profile Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {multiYearData.classification.mlp_profile_tags.map((tag, index) => (
                          <Badge key={index} className="bg-purple-100 text-purple-800 text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-white rounded border">
                      <span className="text-sm font-medium">Classification Rationale:</span>
                      <p className="text-xs text-indigo-700 mt-1">{multiYearData.classification.rationale}</p>
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-3 bg-slate-100 border border-slate-300 rounded-lg">
                  <p className="text-xs text-slate-600 text-center">
                    <strong>Disclaimer:</strong> {multiYearData.ui_summaries.disclaimer}
                  </p>
                </div>
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
              <button
                className="text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => toggleSection('management')}
              >
                <span className="text-xs">✕</span>
              </button>
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
              <button
                className="text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => toggleSection('predictive')}
              >
                <span className="text-xs">✕</span>
              </button>
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
              <button
                className="text-slate-400 hover:text-slate-600 transition-colors"
                onClick={() => toggleSection('thesis')}
              >
                <span className="text-xs">✕</span>
              </button>
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
    return Boolean(data) && 
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
