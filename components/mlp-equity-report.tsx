'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Brain,
  Building2,
  Gauge,
  DollarSign,
  MapPin,
  AlertTriangle,
  Activity
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
  credibility_assessment: {
    red_flags: string[];
    green_flags: string[];
    disclosure_hygiene: {
      segment_bridge_quality: string;
      impairment_restructure_clarity: string;
      restatement_or_weakness_mentions: string;
    };
    commitment_followthrough: {
      subsequent_followup_years: string[];
    };
  };
  scores: {
    credibility_tier: string;
    metric_definition_stability: string;
    weights: {
      disclosure_hygiene: number;
      commitment_followthrough: number;
    };
  };
  ui_summaries: {
    bullet_highlights: string[];
    watch_items: string[];
    synopsis: string;
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
  scenarios: Array<{
    name: string;
    probability: number;
    description: string;
  }>;
  key_drivers: string[];
  leading_indicators: string[];
  thesis_falsifiers: string[];
  ui_summaries: {
    bullet_highlights: string[];
    watch_items: string[];
    synopsis: string;
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

// Helper function to get trend icon
const getTrendIcon = (label: string) => {
  if (label?.toLowerCase().includes('rising') || label?.toLowerCase().includes('improving') || label?.toLowerCase().includes('strengthening')) {
    return <TrendingUp className="h-4 w-4 text-green-600" />;
  }
  if (label?.toLowerCase().includes('falling') || label?.toLowerCase().includes('declining') || label?.toLowerCase().includes('weakening')) {
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  }
  return <Activity className="h-4 w-4 text-blue-600" />;
};

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
          <CardContent className="space-y-8">
            {multiYearData ? (
              <>
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

                {/* Key Highlights */}
                {multiYearData.ui_summaries?.bullet_highlights && (
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold mb-3 text-green-800">Key Operational Highlights</h4>
                    <ul className="space-y-2">
                      {multiYearData.ui_summaries.bullet_highlights.map((highlight, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                          <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Watch Items */}
                {multiYearData.ui_summaries?.watch_items && (
                  <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                    <h4 className="font-semibold mb-3 text-amber-800">Key Monitoring Points</h4>
                    <ul className="space-y-2">
                      {multiYearData.ui_summaries.watch_items.map((item, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                          <span className="text-amber-500 mt-1 flex-shrink-0">⚠</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Key Themes */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getTrendIcon(multiYearData.semantic_themes.throughput_trend.label)}
                      <h4 className="font-semibold">Throughput Trend</h4>
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {multiYearData.semantic_themes.throughput_trend.label}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {multiYearData.semantic_themes.throughput_trend.rationale}
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getTrendIcon(multiYearData.semantic_themes.utilization_trend.label)}
                      <h4 className="font-semibold">Utilization Trend</h4>
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {multiYearData.semantic_themes.utilization_trend.label}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {multiYearData.semantic_themes.utilization_trend.notes}
                    </p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      {getTrendIcon(multiYearData.semantic_themes.fee_mix_contracts.fee_based_exposure_label)}
                      <h4 className="font-semibold">Fee Mix & Contracts</h4>
                    </div>
                    <Badge variant="outline" className="mb-2">
                      {multiYearData.semantic_themes.fee_mix_contracts.fee_based_exposure_label}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {multiYearData.semantic_themes.fee_mix_contracts.commodity_exposure_comment}
                    </p>
                  </div>
                </div>

                {/* Component Analysis */}
                <div>
                  <h4 className="font-semibold mb-3">Component Analysis</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { name: 'Throughput Stability & Utilization', score: multiYearData.scores.throughput_stability_utilization },
                      { name: 'Fee Mix & Contract Quality', score: multiYearData.scores.fee_mix_contract_quality },
                      { name: 'DCF Stability & Coverage', score: multiYearData.scores.dcf_stability_coverage },
                      { name: 'Leverage & Liquidity', score: multiYearData.scores.leverage_liquidity },
                      { name: 'Counterparty Quality & Concentration', score: multiYearData.scores.counterparty_quality_concentration },
                      { name: 'Asset Footprint & Basin Quality', score: multiYearData.scores.asset_footprint_basin_quality },
                      { name: 'External Growth Discipline', score: multiYearData.scores.external_growth_discipline },
                      { name: 'Risk Overhangs (inverse)', score: multiYearData.scores.risk_overhangs },
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

                {/* Distribution Analysis */}
                <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                  <h4 className="font-semibold mb-3 text-purple-800">💰 Distribution Analysis</h4>
                  {multiYearData.distribution_analysis?.applies ? (
                    <div className="space-y-4">
                      {/* Policy Overview */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Policy Characterization</h5>
                          <Badge variant="outline" className="mb-2">
                            {multiYearData.distribution_analysis.policy_characterization}
                          </Badge>
                          <div className="text-sm space-y-1">
                            <div><strong>DCF Coverage:</strong> {multiYearData.distribution_analysis.coverage_metrics.dcf_coverage_bucket}</div>
                            <div><strong>Coverage Trend:</strong> {multiYearData.distribution_analysis.coverage_metrics.coverage_trend}</div>
                          </div>
                        </div>
                        
                        <div className="p-4 border rounded-lg">
                          <h5 className="font-medium mb-2">Yield Profile</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Characterization:</span>
                              <Badge variant="outline">{multiYearData.distribution_analysis.yield_profile.characterization}</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span>Trend:</span>
                              <Badge variant="outline">{multiYearData.distribution_analysis.yield_profile.trend}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Distribution Actions Timeline */}
                      {multiYearData.distribution_analysis.distribution_actions.length > 0 && (
                        <div>
                          <h5 className="font-medium mb-3">Distribution Actions by Filing Year</h5>
                          <div className="space-y-3">
                            {multiYearData.distribution_analysis.distribution_actions.map((action, index) => (
                              <div key={index} className="p-3 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline">{action.year}</Badge>
                                  <Badge className={
                                    action.action === 'Increased' ? 'bg-green-100 text-green-800' :
                                    action.action === 'Cut' || action.action === 'Suspended' ? 'bg-red-100 text-red-800' :
                                    action.action === 'Initiated' ? 'bg-blue-100 text-blue-800' :
                                    'bg-gray-100 text-gray-800'
                                  }>
                                    {action.action}
                                  </Badge>
                                </div>
                                <p className="text-sm text-blue-700">{action.context}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-white rounded-lg border border-purple-100">
                      <div className="text-center text-purple-600">
                        <p className="text-sm">
                          <strong>No Significant Distribution Activity</strong>
                        </p>
                        <p className="text-xs text-purple-500 mt-1">
                          Distribution analysis not applicable based on filing history
                        </p>
                      </div>
                    </div>
                  )}
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

                  {/* Asset Footprint & Basin Analysis */}
                  <div className="p-4 border rounded-lg bg-teal-50">
                    <h4 className="font-semibold mb-4 text-teal-800 flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Asset Footprint & Basin Analysis
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {multiYearData.semantic_themes.asset_footprint_basin.map((basin, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                          <span className="text-sm font-medium">{basin.basin_or_region}</span>
                          <Badge variant="outline" className="text-xs">
                            {basin.importance_label}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Financial Profile & Capital Allocation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* DCF Coverage & Leverage */}
                  <div className="p-4 border rounded-lg bg-teal-50">
                    <h4 className="font-semibold mb-4 text-teal-800 flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      DCF Coverage & Leverage Profile
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

                {/* Risk Register */}
                {multiYearData.semantic_themes.risk_register.length > 0 && (
                  <div className="p-4 border rounded-lg bg-red-50">
                    <h4 className="font-semibold mb-4 text-red-800 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      Risk Register
                    </h4>
                    <div className="grid gap-4">
                      {multiYearData.semantic_themes.risk_register.map((risk, index) => (
                        <div key={index} className="p-4 border border-red-200 bg-white rounded">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-red-800">{risk.name}</h5>
                            <Badge className={`text-xs ${
                              risk.severity === 'High' ? 'bg-red-100 text-red-800' :
                              risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {risk.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-red-700 mb-2">{risk.note}</p>
                          <div className="text-xs text-red-600">
                            <strong>Recurrence:</strong> {risk.recurrence_years.join(', ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </>
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
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Shield className="h-5 w-5 text-emerald-600" />
              Management & Capital Allocation Assessment
            </h3>
          </CardHeader>
          <CardContent className="space-y-8">
            {managementData ? (
              <>
                {/* Executive Summary */}
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-2 text-emerald-800">Management Assessment Summary</h4>
                  <p className="text-sm text-emerald-700">{managementData.ui_summaries.synopsis}</p>
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
                            <li key={index} className="text-sm text-red-600 flex items-start gap-2">
                              <span className="text-red-500 mt-1 flex-shrink-0">•</span>
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
                          <Shield className="h-5 w-5" />
                          Green Flags
                        </h4>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {managementData.credibility_assessment.green_flags.map((flag, index) => (
                            <li key={index} className="text-sm text-green-600 flex items-start gap-2">
                              <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                              <span>{flag}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
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
              MLP Market Outlook & Positioning
            </h3>
          </CardHeader>
          <CardContent className="space-y-8">
            {predictiveData ? (
              <>
                {/* Executive Summary */}
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h4 className="font-semibold mb-2 text-amber-800">Predictive Analysis Summary</h4>
                  <p className="text-sm text-amber-700">{predictiveData.ui_summaries.synopsis}</p>
                </div>

                {/* Scenarios */}
                {predictiveData.scenarios && predictiveData.scenarios.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-slate-800">Forward-Looking Scenarios</h4>
                    {predictiveData.scenarios.map((scenario, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-slate-50">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{scenario.name}</h5>
                          <Badge variant="outline">{scenario.probability}% probability</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{scenario.description}</p>
                      </div>
                    ))}
                  </div>
                )}
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
    </div>
  );
}
