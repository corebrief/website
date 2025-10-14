'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Shield,
  Brain,
  Building2,
  AlertTriangle,
  Gauge,
  Target,
  FileText,
  Award,
  Star,
  Eye,
  AlertCircle,
  HelpCircle,
  Zap
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { type ParsedReport, type MLPMultiYearAnalysis } from '@/utils/report-parsers';
import MLPEquityAnalysisComponent from './mlp-equity-analysis';

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
  classification: {
    communication_style: string;
    credibility_trend: string;
    disclosure_quality_tier: string;
    rationale: string;
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
    type: 'quarters' | 'years';
    length: number;
    reason: string;
  };
  assumption_journal: string[];
  base_state: {
    starting_point: {
      throughput: 'Up' | 'Stable' | 'Down' | 'Mixed' | 'insufficient_detail';
      utilization: 'Improving' | 'Stable' | 'Declining' | 'insufficient_detail';
      fee_based_exposure: 'Higher' | 'Similar' | 'Lower' | 'insufficient_detail';
      contract_quality: 'Strengthening' | 'Stable' | 'Weakening' | 'insufficient_detail';
      dcf: 'Stronger' | 'Similar' | 'Weaker' | 'insufficient_detail';
      risk_level: 'Rising' | 'Stable' | 'Abating' | 'insufficient_detail';
    };
    recent_inflections: string[];
  };
  scenarios: Array<{
    name: 'Base' | 'Upside' | 'Downside';
    outcomes: {
      throughput: 'Up' | 'Stable' | 'Down' | 'insufficient_detail';
      utilization: 'Improving' | 'Stable' | 'Declining' | 'insufficient_detail';
      fee_based_exposure: 'Higher' | 'Similar' | 'Lower' | 'insufficient_detail';
      contract_quality: 'Strengthening' | 'Stable' | 'Weakening' | 'insufficient_detail';
      dcf: 'Stronger' | 'Similar' | 'Weaker' | 'insufficient_detail';
      distribution_trajectory: 'Increase' | 'Stable' | 'Cut' | 'Suspend' | 'NotApplicable' | 'insufficient_detail';
      coverage_direction: 'Improving' | 'Stable' | 'Weakening' | 'insufficient_detail';
      capex_mix: 'Growth Heavier' | 'Similar' | 'Maintenance Heavier' | 'insufficient_detail';
      leverage: 'Down' | 'Stable' | 'Up' | 'insufficient_detail';
      liquidity_refi: 'Easier' | 'Similar' | 'Tighter' | 'insufficient_detail';
      rate_exposure: 'Lower' | 'Medium' | 'Higher' | 'insufficient_detail';
      risk_level: 'Rising' | 'Stable' | 'Abating' | 'insufficient_detail';
      external_growth: 'Active' | 'Selective' | 'Limited' | 'Paused' | 'insufficient_detail';
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
    confidence_check: 'High' | 'Medium' | 'Low';
  };
  transition_map: Array<{
    from: 'Base' | 'Upside' | 'Downside';
    to: 'Base' | 'Upside' | 'Downside';
    trigger: string;
    early_signals: string[];
  }>;
  distribution_outlook: {
    applies: boolean;
    trajectory: 'Increase' | 'Stable' | 'Cut' | 'Suspend' | 'NotApplicable' | 'insufficient_detail';
    key_factors: string[];
    structure_notes: string | null;
    policy_signals: string[];
  };
  features_for_downstream: {
    directional_tilt: 'Positive' | 'Neutral' | 'Negative' | 'Mixed' | 'insufficient_detail';
    confidence_bucket: 'High(>=0.6)' | 'Medium(0.4 to 0.59)' | 'Low(<0.4)' | 'insufficient_detail';
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
  viability_assessment: {
    tier: string;
    subscores: {
      system_durability: number;
      execution_quality: number;
      financial_resilience: number;
      risk_balance: number;
      governance_quality: number;
    };
  };
  thesis_statement: string;
  ui_summaries: {
    synopsis: string;
  };
  version: string;
}

interface MLPReportProps {
  report: ParsedReport;
}

// Helper function to get grade color
function getGradeColor(letter: string): string {
  if (letter.startsWith('A')) return 'bg-green-100 text-green-800 border-green-300';
  if (letter.startsWith('B')) return 'bg-blue-100 text-blue-800 border-blue-300';
  if (letter.startsWith('C')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  return 'bg-red-100 text-red-800 border-red-300';
}

// Helper function to get credibility tier color
function getCredibilityTierColor(tier: string): string {
  switch (tier.toLowerCase()) {
    case 'high': return 'bg-green-100 text-green-800 border-green-300';
    case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'low': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
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

      {/* Multi-Year Analysis Section */}
      {expandedSections.has('multi_year') && (
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Multi-Year Operational Analysis
            </h3>
          </CardHeader>
          <CardContent>
            {multiYearData ? (
              <MLPEquityAnalysisComponent data={multiYearData} />
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No multi-year data available
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Management Assessment Section */}
      {expandedSections.has('management') && (
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-base font-semibold text-slate-800 flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              Management Credibility Assessment
            </h3>
          </CardHeader>
          <CardContent className="space-y-8">
            {managementData ? (
              <>
                {/* Management Synopsis */}
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold mb-2 text-slate-800">Management Synopsis</h4>
                  <p className="text-sm text-slate-700">{managementData.ui_summaries.synopsis}</p>
                </div>

                {/* Credibility Component Analysis */}
                <div>
                  <h4 className="font-semibold mb-3">Credibility Component Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'Promise Follow-Through', score: managementData.scores.promise_follow_through },
                      { name: 'Tone Discipline', score: managementData.scores.tone_discipline },
                      { name: 'Disclosure Hygiene', score: managementData.scores.disclosure_hygiene },
                      { name: 'Risk Candor', score: managementData.scores.risk_candor },
                      { name: 'Strategic Coherence', score: managementData.scores.strategic_coherence },
                      { name: 'Capital Allocation Consistency', score: managementData.scores.capital_allocation_consistency },
                      { name: 'Metric Definition Stability', score: managementData.scores.metric_definition_stability },
                      { name: 'Red Flags (inverse)', score: managementData.scores.red_flags }
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

                {/* Overall Score & Tier */}
                <div className="mt-4 p-4 bg-slate-100 rounded-lg border-2 border-slate-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Overall Credibility Score</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-xl">{managementData.scores.composite_score.toFixed(2)}/10</span>
                      <Badge className={`text-lg px-3 py-1 ${getCredibilityTierColor(managementData.scores.credibility_tier)}`}>
                        {managementData.scores.credibility_tier} Tier
                      </Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Weighted composite assessment
                  </p>
                </div>

                {/* Promise Follow-through Analysis */}
                {managementData.credibility_assessment.commitment_followthrough && managementData.credibility_assessment.commitment_followthrough.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-600" />
                      Promise Follow-through Analysis
                    </h4>
                    <div className="space-y-4">
                      {managementData.credibility_assessment.commitment_followthrough.map((commitment, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-blue-50">
                          <div className="flex items-start justify-between mb-2">
                            <div className="text-sm font-medium text-blue-800">
                              Filing Year {commitment.commitment_year} Commitment
                            </div>
                            <Badge className={`${
                              commitment.outcome_label === 'Achieved' ? 'bg-green-100 text-green-800' :
                              commitment.outcome_label === 'Progressing' ? 'bg-blue-100 text-blue-800' :
                              commitment.outcome_label === 'Stalled' ? 'bg-yellow-100 text-yellow-800' :
                              commitment.outcome_label === 'Reversed' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {commitment.outcome_label}
                            </Badge>
                          </div>
                          <p className="text-sm text-blue-700 mb-2">&ldquo;{commitment.commitment}&rdquo;</p>
                          <div className="text-xs text-blue-600 mb-2">
                            Tracked in: Filing Year {commitment.subsequent_followup_years.join(', Filing Year ')}
                          </div>
                          <p className="text-xs text-blue-600">
                            {commitment.rationale}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Communication Style & Tone Profile */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <h3 className="text-base font-semibold">Communication Style & Tone Profile</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tone Balance</span>
                      <Badge className="bg-purple-100 text-purple-800 text-sm">
                        {managementData.credibility_assessment.tone_profile.tone_balance_label}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Guidance Style</span>
                      <Badge className="bg-purple-100 text-purple-800 text-sm">
                        {managementData.credibility_assessment.tone_profile.guidance_style_label}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Superlative Frequency</span>
                      <Badge className="bg-purple-100 text-purple-800 text-sm">
                        {managementData.credibility_assessment.tone_profile.superlative_frequency_label}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">Tone Trend</span>
                      <Badge className="bg-purple-100 text-purple-800 text-sm">
                        {managementData.credibility_assessment.tone_profile.change_in_tone_label}
                      </Badge>
                    </div>
                  </div>

                  {managementData.credibility_assessment.tone_profile.notes && (
                    <div className="bg-purple-50/50 p-4 rounded-lg">
                      <p className="text-purple-700 text-sm">
                        {managementData.credibility_assessment.tone_profile.notes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Disclosure Hygiene */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-teal-600" />
                    Disclosure Hygiene Assessment
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">DCF Definition</span>
                        <Badge className="bg-teal-100 text-teal-800">
                          {managementData.credibility_assessment.disclosure_hygiene.dcf_definition_clarity}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">EBITDA Reconciliation</span>
                        <Badge className="bg-teal-100 text-teal-800">
                          {managementData.credibility_assessment.disclosure_hygiene.adjusted_ebitda_reconciliation_quality}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Maintenance Capex</span>
                        <Badge className="bg-teal-100 text-teal-800">
                          {managementData.credibility_assessment.disclosure_hygiene.maintenance_capex_definition_stability}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">FERC Rate Case</span>
                        <Badge className="bg-teal-100 text-teal-800">
                          {managementData.credibility_assessment.disclosure_hygiene.ferc_rate_case_clarity}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Incident/Outage</span>
                        <Badge className="bg-teal-100 text-teal-800">
                          {managementData.credibility_assessment.disclosure_hygiene.incident_outage_disclosure_quality}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Candor Analysis */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                    Risk Candor Analysis
                  </h4>
                  
                  {/* Realized Issues Acknowledgment */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg bg-red-50">
                      <span className="text-sm font-medium text-black">Realized Issues Acknowledged</span>
                      <Badge className="bg-red-100 text-red-800">
                        {managementData.credibility_assessment.risk_candor.realized_issues_acknowledged_label}
                      </Badge>
                    </div>
                  </div>

                  {/* Recurring Risk Disclosures */}
                  <div>
                    <h5 className="text-sm font-medium text-red-800 mb-3">Recurring Risk Disclosures</h5>
                    <div className="space-y-4">
                      {managementData.credibility_assessment.risk_candor.recurring_risks.map((risk, index) => (
                        <div key={index} className="border rounded-lg p-4 bg-red-50">
                          <div className="flex items-start justify-between mb-2">
                            <div className="text-sm font-medium text-red-800">
                              {risk.name}
                            </div>
                            <Badge className="bg-red-100 text-red-800">
                              {risk.candor_label}
                            </Badge>
                          </div>
                          <div className="text-xs text-red-600 mb-2">
                            Recurrence: Filing Year {risk.recurrence_years.join(', Filing Year ')}
                          </div>
                          {risk.note && (
                            <p className="text-xs text-red-700">{risk.note}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Strategic Coherence */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-indigo-600" />
                    Strategic Coherence Assessment
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-sm font-medium text-indigo-800">Pivot Frequency</div>
                      <Badge className="mt-2 bg-indigo-100 text-indigo-800">
                        {managementData.credibility_assessment.strategic_coherence.pivot_frequency_label}
                      </Badge>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-sm font-medium text-indigo-800">Rationalization Quality</div>
                      <Badge className="mt-2 bg-indigo-100 text-indigo-800">
                        {managementData.credibility_assessment.strategic_coherence.rationalization_quality_label}
                      </Badge>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-sm font-medium text-indigo-800">Fee Mix Stance</div>
                      <Badge className="mt-2 bg-indigo-100 text-indigo-800">
                        {managementData.credibility_assessment.strategic_coherence.fee_mix_stance_label}
                      </Badge>
                    </div>
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-sm font-medium text-indigo-800">Contract Quality Stance</div>
                      <Badge className="mt-2 bg-indigo-100 text-indigo-800">
                        {managementData.credibility_assessment.strategic_coherence.contract_quality_stance_label}
                      </Badge>
                    </div>
                  </div>
                  {managementData.credibility_assessment.strategic_coherence.examples.length > 0 && (
                    <div className="mt-4">
                      <h5 className="text-sm font-medium text-indigo-800 mb-3">Strategic Examples</h5>
                      <div className="space-y-2">
                        {managementData.credibility_assessment.strategic_coherence.examples.map((example, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <span className="text-indigo-600 mt-1">•</span>
                            <p className="text-sm text-indigo-700">{example}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Capital Allocation Consistency */}
                <div className="p-6 border-2 border-slate-200 rounded-lg bg-gradient-to-r from-slate-50 to-gray-50">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    Capital Allocation Consistency Analysis
                  </h4>
                  <div className="space-y-6">
                    {/* Stated Priorities */}
                    {managementData.credibility_assessment.capital_allocation_consistency.stated_priorities && managementData.credibility_assessment.capital_allocation_consistency.stated_priorities.length > 0 && (
                      <div className="p-4 border rounded-lg bg-green-50">
                        <h5 className="font-medium mb-3 text-green-800">
                          Management&apos;s Stated Capital Priorities
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {managementData.credibility_assessment.capital_allocation_consistency.stated_priorities.map((priority, index) => (
                            <Badge key={index} className="bg-green-100 text-green-800 border border-green-300">
                              {priority.replace(/_/g, ' ')}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Execution Examples */}
                    {managementData.credibility_assessment.capital_allocation_consistency.examples && managementData.credibility_assessment.capital_allocation_consistency.examples.length > 0 && (
                      <div className="p-4 border rounded-lg bg-blue-50">
                        <h5 className="font-medium mb-3 text-blue-800">
                          Actual Execution Track Record
                        </h5>
                        <ul className="space-y-2">
                          {managementData.credibility_assessment.capital_allocation_consistency.examples.map((example, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-blue-700">{example}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Assessment Result */}
                    <div className="p-4 border-2 rounded-lg bg-white">
                      <h5 className="font-medium mb-3 text-slate-800">
                        Behavior Alignment Assessment
                      </h5>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Stated priorities vs. actual execution:</span>
                        <Badge className={`text-lg px-3 py-1 ${
                          managementData.credibility_assessment.capital_allocation_consistency.behavior_alignment_label === 'Aligned' ? 'bg-green-100 text-green-800 border-green-300' :
                          managementData.credibility_assessment.capital_allocation_consistency.behavior_alignment_label === 'Mixed' ? 'bg-yellow-100 text-yellow-800 border-yellow-300' :
                          managementData.credibility_assessment.capital_allocation_consistency.behavior_alignment_label === 'NotAligned' ? 'bg-red-100 text-red-800 border-red-300' :
                          'bg-slate-100 text-slate-800 border-slate-300'
                        }`}>
                          {managementData.credibility_assessment.capital_allocation_consistency.behavior_alignment_label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Structure Events */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-orange-600" />
                    Structure Events
                  </h4>
                  <div className="space-y-4">
                    {managementData.credibility_assessment.structure_events.map((event, index) => (
                      <div key={index} className="border rounded-lg p-4 bg-orange-50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="text-sm font-medium text-orange-800">
                            {event.event}
                          </div>
                          <div className="flex gap-2">
                            <Badge className="bg-orange-100 text-orange-800">
                              {event.communication_label}
                            </Badge>
                            <Badge className={`${
                              event.outcome_label === 'Achieved' ? 'bg-green-100 text-green-800' :
                              event.outcome_label === 'Progressing' ? 'bg-blue-100 text-blue-800' :
                              event.outcome_label === 'Stalled' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {event.outcome_label}
                            </Badge>
                          </div>
                        </div>
                        {event.notes && (
                          <p className="text-xs text-orange-700">{event.notes}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metric Definition Stability */}
                {managementData.credibility_assessment.metric_definition_stability && managementData.credibility_assessment.metric_definition_stability.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Brain className="h-5 w-5 text-cyan-600" />
                      Metric Definition Stability
                    </h4>
                    <div className="space-y-3">
                      {managementData.credibility_assessment.metric_definition_stability.map((metric, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-cyan-50">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-medium text-cyan-800">{metric.metric}</div>
                            <Badge className="bg-cyan-100 text-cyan-800">{metric.stability_label}</Badge>
                          </div>
                          <p className="text-sm text-cyan-700">{metric.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Management Classification Summary */}
                {managementData.classification && (
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-slate-600" />
                      Management Classification Summary
                    </h4>
                    <div className="p-4 border rounded-lg bg-slate-50">
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-700 mb-2">Communication Style</div>
                          <Badge className="bg-slate-100 text-slate-800">
                            {managementData.classification.communication_style}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-700 mb-2">Credibility Trend</div>
                          <Badge className={`${
                            managementData.classification.credibility_trend === 'Improving' ? 'bg-green-100 text-green-800' :
                            managementData.classification.credibility_trend === 'Deteriorating' ? 'bg-red-100 text-red-800' :
                            managementData.classification.credibility_trend === 'Mixed' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {managementData.classification.credibility_trend}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium text-slate-700 mb-2">Disclosure Quality</div>
                          <Badge className={`${
                            managementData.classification.disclosure_quality_tier === 'High' ? 'bg-green-100 text-green-800' :
                            managementData.classification.disclosure_quality_tier === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                            managementData.classification.disclosure_quality_tier === 'Low' ? 'bg-red-100 text-red-800' :
                            'bg-slate-100 text-slate-800'
                          }`}>
                            {managementData.classification.disclosure_quality_tier}
                          </Badge>
                        </div>
                      </div>
                      
                      {managementData.classification.rationale && (
                        <div className="border-t pt-4">
                          <h5 className="font-medium mb-2 text-slate-700">Assessment Rationale</h5>
                          <p className="text-sm text-slate-600">{managementData.classification.rationale}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Bullet Highlights and Watch Items */}
                {(managementData.ui_summaries?.bullet_highlights || managementData.ui_summaries?.watch_items) && (
                  <div className="grid md:grid-cols-2 gap-6">
                    {managementData.ui_summaries?.bullet_highlights && managementData.ui_summaries.bullet_highlights.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-blue-700 flex items-center gap-2">
                          <Award className="h-5 w-5" />
                          Key Highlights
                        </h4>
                        <ul className="space-y-2">
                          {managementData.ui_summaries.bullet_highlights.map((highlight, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-blue-700">{highlight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {managementData.ui_summaries?.watch_items && managementData.ui_summaries.watch_items.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-orange-700 flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5" />
                          Watch Items
                        </h4>
                        <ul className="space-y-2">
                          {managementData.ui_summaries.watch_items.map((item, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                              <span className="text-orange-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Red and Green Flags */}
                <div className="grid md:grid-cols-2 gap-6">
                  {managementData.credibility_assessment.red_flags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-red-700">Red Flags</h4>
                      <ul className="space-y-2">
                        {managementData.credibility_assessment.red_flags.map((flag, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {managementData.credibility_assessment.green_flags.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 text-green-700">Green Flags</h4>
                      <ul className="space-y-2">
                        {managementData.credibility_assessment.green_flags.map((flag, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <Award className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {flag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                  <p className="text-xs text-gray-600">
                    {managementData.ui_summaries?.disclaimer || 'For informational purposes only. Operational analysis of historical disclosures. Not investment advice or a recommendation.'}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No management data available
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Predictive Inference Section */}
      {expandedSections.has('predictive') && (
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Brain className="h-5 w-5 text-amber-600" />
              Predictive Inference Analysis
            </h3>
          </CardHeader>
          <CardContent className="space-y-8">
            {predictiveData ? (
              <>
                {/* Predictive Synopsis */}
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold mb-2 text-slate-800">Forward-Looking Synopsis</h4>
                  <p className="text-sm text-slate-700">{predictiveData.ui_summaries.synopsis}</p>
                </div>

                {/* Key Highlights & Watch Items */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Bullet Highlights */}
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h5 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Key Highlights
                    </h5>
                    <ul className="space-y-2">
                      {predictiveData.ui_summaries.bullet_highlights.map((highlight, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-blue-700">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Watch Items */}
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <h5 className="font-semibold mb-3 text-purple-800 flex items-center gap-2">
                      <Eye className="h-5 w-5" />
                      Priority Watch Items
                    </h5>
                    <ul className="space-y-2">
                      {predictiveData.ui_summaries.watch_items.map((item, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-purple-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Horizon Selection & Assumptions */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Horizon Selection */}
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Forward Analysis Horizon
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Time Frame:</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {predictiveData.horizon_selection.length} {predictiveData.horizon_selection.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-blue-600">
                        <span className="font-medium">Rationale:</span> {predictiveData.horizon_selection.reason}
                      </div>
                    </div>
                  </div>

                  {/* Base State Assessment */}
                  <div className="p-4 border rounded-lg bg-green-50">
                    <h4 className="font-semibold mb-3 text-green-800">Current State Assessment</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(predictiveData.base_state.starting_point).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center">
                          <span className="text-xs">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</span>
                          <Badge className={`text-xs ${
                            value.toLowerCase().includes('up') || value.toLowerCase().includes('improving') || value.toLowerCase().includes('higher') || value.toLowerCase().includes('stronger') ? 'bg-green-100 text-green-800' :
                            value.toLowerCase().includes('down') || value.toLowerCase().includes('declining') || value.toLowerCase().includes('lower') || value.toLowerCase().includes('weaker') ? 'bg-red-100 text-red-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {value}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Assumption Journal */}
                {predictiveData.assumption_journal && predictiveData.assumption_journal.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-indigo-600" />
                      Key Assumptions from Historical Analysis
                    </h4>
                    <div className="space-y-2">
                      {predictiveData.assumption_journal.map((assumption, index) => (
                        <div key={index} className="p-3 border rounded-lg bg-indigo-50">
                          <p className="text-sm text-indigo-700">{assumption}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recent Operational Inflections */}
                {predictiveData.base_state.recent_inflections && predictiveData.base_state.recent_inflections.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-orange-600" />
                      Recent Operational Inflections
                    </h4>
                    <ul className="space-y-2">
                      {predictiveData.base_state.recent_inflections.map((inflection, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-orange-700">{inflection}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Forward Scenarios */}
                <div>
                  <h4 className="font-semibold mb-4">Forward-Looking Scenarios</h4>
                  <div className="space-y-6">
                    {predictiveData.scenarios.map((scenario, index) => (
                      <div key={index} className={`p-6 border-2 rounded-lg ${
                        scenario.name === 'Base' ? 'bg-slate-50 border-slate-300' :
                        scenario.name === 'Upside' ? 'bg-green-50 border-green-300' :
                        'bg-red-50 border-red-300'
                      }`}>
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-semibold text-lg">{scenario.name} Case</h5>
                          <Badge className={`text-lg px-3 py-1 ${
                            scenario.name === 'Base' ? 'bg-slate-100 text-slate-800' :
                            scenario.name === 'Upside' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {(scenario.confidence * 100).toFixed(0)}% Confidence
                          </Badge>
                        </div>

                        {/* Complete Outcomes Grid */}
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          {/* Operational Metrics */}
                          <div className="space-y-2">
                            {Object.entries(scenario.outcomes).slice(0, 4).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-sm font-medium">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</span>
                                <Badge variant="outline">{value}</Badge>
                              </div>
                            ))}
                          </div>

                          {/* Financial Metrics */}
                          <div className="space-y-2">
                            {Object.entries(scenario.outcomes).slice(4, 8).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-sm font-medium">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</span>
                                <Badge variant="outline">{value}</Badge>
                              </div>
                            ))}
                          </div>

                          {/* Risk & Growth Metrics */}
                          <div className="space-y-2">
                            {Object.entries(scenario.outcomes).slice(8).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-sm font-medium">{key.replace(/_/g, ' ').charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' ')}:</span>
                                <Badge variant="outline">{value}</Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Numeric Context */}
                        {scenario.numeric_context && (
                          <div className="mb-4 p-3 bg-white rounded-lg border">
                            <h6 className="font-medium mb-2 text-sm">Quantitative Indicators</h6>
                            <p className="text-sm text-slate-600">{scenario.numeric_context}</p>
                          </div>
                        )}

                        <div className="grid md:grid-cols-3 gap-6">
                          {/* Key Drivers */}
                          <div>
                            <h6 className="font-medium mb-2 text-sm">Key Drivers</h6>
                            <ul className="space-y-1">
                              {scenario.key_drivers.map((driver, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-blue-700">{driver}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Leading Indicators */}
                          <div>
                            <h6 className="font-medium mb-2 text-sm">Leading Indicators</h6>
                            <ul className="space-y-1">
                              {scenario.leading_indicators.map((indicator, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-green-700">{indicator}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Falsifiers */}
                          <div>
                            <h6 className="font-medium mb-2 text-sm">Scenario Falsifiers</h6>
                            <ul className="space-y-1">
                              {scenario.falsifiers.map((falsifier, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <AlertTriangle className="h-3 w-3 text-red-500 mt-1 flex-shrink-0" />
                                  <span className="text-red-700">{falsifier}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Scenario Transitions */}
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-indigo-600" />
                    Scenario Transition Analysis
                  </h4>
                  <div className="space-y-4">
                    {predictiveData.transition_map.map((transition, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-indigo-50">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="text-sm font-medium text-indigo-700">Scenario Shift:</div>
                          <div className="flex items-center gap-3">
                            <Badge className={`${
                              transition.from === 'Base' ? 'bg-slate-100 text-slate-800' :
                              transition.from === 'Upside' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transition.from} Case
                            </Badge>
                            <div className="text-indigo-600 font-bold text-3xl px-2">→</div>
                            <Badge className={`${
                              transition.to === 'Base' ? 'bg-slate-100 text-slate-800' :
                              transition.to === 'Upside' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {transition.to} Case
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h6 className="font-medium text-sm text-indigo-800 mb-1">Transition Trigger</h6>
                            <p className="text-sm text-indigo-700">{transition.trigger}</p>
                          </div>
                          
                          <div>
                            <h6 className="font-medium text-sm text-indigo-800 mb-2">Early Warning Signals</h6>
                            <ul className="space-y-1">
                              {transition.early_signals.map((signal, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-indigo-700">{signal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                                {/* Uncertainty Analysis */}
                                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Uncertainty & Risk Assessment
                  </h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Dominant Unknowns */}
                    <div className="p-4 border rounded-lg bg-amber-50">
                      <h5 className="font-semibold mb-3 text-amber-800">Dominant Unknowns</h5>
                      <ul className="space-y-2">
                        {predictiveData.uncertainty.dominant_unknowns.map((unknown, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-amber-700">{unknown}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Confidence Check & Black Swan */}
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg bg-slate-50">
                        <h5 className="font-semibold mb-2 text-slate-800">Overall Confidence</h5>
                        <Badge className={`${
                          predictiveData.uncertainty.confidence_check === 'High' ? 'bg-green-100 text-green-800' :
                          predictiveData.uncertainty.confidence_check === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {predictiveData.uncertainty.confidence_check}
                        </Badge>
                      </div>

                      {predictiveData.uncertainty.black_swan_notes && (
                        <div className="p-4 border rounded-lg bg-red-50">
                          <h5 className="font-semibold mb-2 text-red-800 flex items-center gap-2">
                            <Zap className="h-4 w-4" />
                            Tail Risk Considerations
                          </h5>
                          <p className="text-sm text-red-700">{predictiveData.uncertainty.black_swan_notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Distribution Forward Analysis */}
                {predictiveData.distribution_outlook.applies && (
                  <div className="p-6 border-2 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 border-slate-300">
                    <h4 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      Distribution Forward Analysis
                    </h4>
                    
                    <div className="space-y-6">
                      {/* Base Outlook & Sustainability */}
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Base Outlook */}
                        <div className="p-4 border rounded-lg bg-white shadow-sm">
                          <h5 className="font-semibold mb-3 text-green-800">Base Case Outlook</h5>
                          <div className="space-y-3">
                            {/* Distribution Trajectory */}
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Expected Direction:</span>
                              <Badge className={`${
                                predictiveData.distribution_outlook.trajectory === 'Increase' ? 'bg-green-100 text-green-800' :
                                predictiveData.distribution_outlook.trajectory === 'Stable' ? 'bg-blue-100 text-blue-800' :
                                predictiveData.distribution_outlook.trajectory === 'Cut' ? 'bg-orange-100 text-orange-800' :
                                predictiveData.distribution_outlook.trajectory === 'Suspend' ? 'bg-red-100 text-red-800' :
                                'bg-slate-100 text-slate-800'
                              }`}>
                                {predictiveData.distribution_outlook.trajectory}
                              </Badge>
                            </div>

                            {/* Coverage Direction */}
                            {predictiveData.scenarios.find(s => s.name === 'Base')?.outcomes.coverage_direction && (
                              <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Coverage Trend:</span>
                                <Badge className={`${
                                  predictiveData.scenarios.find(s => s.name === 'Base')?.outcomes.coverage_direction === 'Improving' ? 'bg-green-100 text-green-800' :
                                  predictiveData.scenarios.find(s => s.name === 'Base')?.outcomes.coverage_direction === 'Stable' ? 'bg-blue-100 text-blue-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {predictiveData.scenarios.find(s => s.name === 'Base')?.outcomes.coverage_direction}
                                </Badge>
                              </div>
                            )}

                            {/* Key Driving Factors */}
                            <div>
                              <h6 className="text-sm font-medium mb-2">Key Driving Factors</h6>
                              <ul className="space-y-1">
                                {predictiveData.distribution_outlook.key_factors.map((factor, idx) => (
                                  <li key={idx} className="text-sm flex items-start gap-2">
                                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                                    <span className="text-slate-700">{factor}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Structure & Policy */}
                        <div className="space-y-4">
                          {predictiveData.distribution_outlook.structure_notes && (
                            <div className="p-4 border rounded-lg bg-white shadow-sm">
                              <h5 className="font-semibold mb-2 text-indigo-800">Structure Considerations</h5>
                              <p className="text-sm text-slate-700">{predictiveData.distribution_outlook.structure_notes}</p>
                            </div>
                          )}

                          <div className="p-4 border rounded-lg bg-white shadow-sm">
                            <h5 className="font-semibold mb-2 text-amber-800">Policy Monitoring Signals</h5>
                            <ul className="space-y-1">
                              {predictiveData.distribution_outlook.policy_signals.map((signal, idx) => (
                                <li key={idx} className="text-sm flex items-start gap-2">
                                  <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2 flex-shrink-0"></div>
                                  <span className="text-slate-700">{signal}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}





                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                  <p className="text-xs text-gray-600">{predictiveData.ui_summaries.disclaimer}</p>
                </div>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No predictive data available
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Business Thesis Section */}
      {expandedSections.has('thesis') && (
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-orange-600" />
              MLP Business Thesis
            </h3>
          </CardHeader>
          <CardContent className="space-y-8">
            {thesisData ? (
              <>
                {/* Thesis Statement */}
                <div className="bg-orange-50 p-6 rounded-lg text-center">
                  <h4 className="font-semibold mb-4 text-orange-800">Investment Thesis</h4>
                  <p className="text-lg text-orange-700 italic">{thesisData.thesis_statement}</p>
                </div>

                {/* Viability Assessment */}
                <Card className="border-orange-200">
                  <CardHeader>
                    <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                      <Gauge className="h-5 w-5" />
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
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No thesis data available
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Type guard functions
function isValidMLPData(data: unknown, requiredKeys: string[]): boolean {
  return Boolean(data) &&
         typeof data === 'object' &&
         data !== null &&
         Object.keys(data).length > 0 &&
         requiredKeys.every(key => key in (data as Record<string, unknown>));
}

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
  const rawMultiYearData = report.sections.multi_year_analysis?.structured_data || parseJSONContent(report.sections.multi_year_analysis?.content || '');
  const rawManagementData = report.sections.management_credibility?.structured_data || parseJSONContent(report.sections.management_credibility?.content || '');
  const rawPredictiveData = report.sections.predictive_inference?.structured_data || parseJSONContent(report.sections.predictive_inference?.content || '');
  const rawThesisData = report.sections.final_thesis?.structured_data || parseJSONContent(report.sections.final_thesis?.content || '');

  // Type guard and cast data
  const hasMultiYear = isValidMLPData(rawMultiYearData, ['company', 'window', 'semantic_themes']);
  const hasManagement = isValidMLPData(rawManagementData, ['company', 'credibility_assessment']);
  const hasPredictive = isValidMLPData(rawPredictiveData, ['company', 'scenarios']);
  const hasThesis = isValidMLPData(rawThesisData, ['company', 'viability_assessment']);

  const multiYearData = hasMultiYear ? rawMultiYearData as MLPMultiYearData : null;
  const managementData = hasManagement ? rawManagementData as MLPManagementData : null;
  const predictiveData = hasPredictive ? rawPredictiveData as MLPPredictiveData : null;
  const thesisData = hasThesis ? rawThesisData as MLPThesisData : null;

  // If we have any structured JSON data, use the full MLP component
  if (hasMultiYear || hasManagement || hasPredictive || hasThesis) {
    return (
      <>
        <MLPEquityReportContent
          multiYearData={multiYearData}
          managementData={managementData}
          predictiveData={predictiveData}
          thesisData={thesisData}
        />
        
        {/* Disclaimer */}
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800">
              {multiYearData?.ui_summaries?.disclaimer || 
               "For informational purposes only. Analysis of historical disclosures. Not investment advice or a recommendation."}
            </p>
          </CardContent>
        </Card>
      </>
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
        {Object.entries(report.sections).map(([key, section]) => (
          <Card key={key}>
            <CardHeader>
              <h3 className="text-lg font-semibold">{section.title}</h3>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap">{section.content}</div>
                {section.subsections && section.subsections.length > 0 && (
                  <div className="mt-4 space-y-3">
                    {section.subsections.map((subsection, index) => (
                      <div key={index} className="border-l-2 border-gray-200 pl-4">
                        <h4 className="font-semibold">{subsection.title}</h4>
                        <div className="whitespace-pre-wrap text-sm">{subsection.content}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-800">
            For informational purposes only. Analysis of historical disclosures. Not investment advice or a recommendation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}