"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  type ParsedReport,
  type GeneralEquityAnalysis,
  type ManagementCredibilityAnalysis,
  type PredictiveInferenceAnalysis,
  type BusinessThesisAnalysis
} from '@/utils/report-parsers';
import { 
  ChevronDown, 
  ChevronRight, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  Award,
  Shield,
  Target,
  Brain,
  Building2
} from 'lucide-react';

interface GeneralEquityReportProps {
  report: ParsedReport;
}

type SectionKey = 'multi_year' | 'management' | 'predictive' | 'thesis';

export default function GeneralEquityReport({ report }: GeneralEquityReportProps) {
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(new Set());

  const toggleSection = (section: SectionKey) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  // Extract structured data from sections
  const multiYearData = report.sections.multi_year_analysis.structured_data as GeneralEquityAnalysis | undefined;
  const managementData = report.sections.management_credibility.structured_data as ManagementCredibilityAnalysis | undefined;
  const predictiveData = report.sections.predictive_inference.structured_data as PredictiveInferenceAnalysis | undefined;
  const thesisData = report.sections.final_thesis.structured_data as BusinessThesisAnalysis | undefined;

  // Helper functions
  const getTrendIcon = (label: string) => {
    if (label.includes('Rising') || label.includes('Expanding') || label.includes('Strong')) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    }
    if (label.includes('Falling') || label.includes('Compressing') || label.includes('Weak')) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  const getGradeColor = (letter: string) => {
    if (letter.startsWith('A')) return 'bg-green-100 text-green-800 border-green-300';
    if (letter.startsWith('B')) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (letter.startsWith('C')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'med': case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getViabilityColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'verystrong': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'strong': return 'bg-green-100 text-green-800 border-green-300';
      case 'adequate': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'fragile': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Section header component
  const SectionHeader = ({ 
    section, 
    title, 
    icon: Icon, 
    badge, 
    summary 
  }: { 
    section: SectionKey; 
    title: string; 
    icon: React.ComponentType<{ className?: string }>; 
    badge?: string; 
    summary?: string;
  }): React.ReactElement => (
    <Button
      variant="ghost"
      className="w-full justify-start p-4 h-auto hover:bg-gray-50 cursor-pointer"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Icon className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="text-left flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-lg">{title}</h3>
              {badge && (
                <Badge className="flex-shrink-0">{badge}</Badge>
              )}
            </div>
            {summary && <p className="text-sm text-muted-foreground mt-1">{summary}</p>}
          </div>
        </div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground ml-4 flex-shrink-0">
          {expandedSections.has(section) ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </div>
      </div>
    </Button>
  );

  return (
    <div className="max-w-none w-full space-y-6">

      {/* Multi-Year Analysis Section */}
      <Card>
        <SectionHeader
          section="multi_year"
          title="Multi-Year Operational Analysis"
          icon={TrendingUp}
          badge={undefined}
          summary={multiYearData?.ui_summaries?.one_liner}
        />
        {expandedSections.has('multi_year') && multiYearData && (
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Data Coverage Quality */}
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h4 className="font-semibold mb-2 text-slate-800">Analysis Coverage</h4>
                <div className="flex items-center gap-4 text-sm">
                  <span><strong>Filing Period:</strong> {multiYearData.window.start_fy}–{multiYearData.window.end_fy} filing years ({multiYearData.window.num_years} years)</span>
                  <span><strong>Data Quality:</strong> {multiYearData.coverage.years_received.length}/{multiYearData.window.num_years} filing years received</span>
                </div>
              </div>

              {/* Executive Synopsis */}
              {multiYearData.ui_summaries?.synopsis && (
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                  <h4 className="font-semibold mb-2 text-blue-800">Executive Synopsis</h4>
                  <p className="text-sm text-blue-700">{multiYearData.ui_summaries.synopsis}</p>
                </div>
              )}

              {/* Historical Performance Grade */}
              {multiYearData.grading && (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold mb-1">Historical Performance Grade</h4>
                    <p className="text-sm text-muted-foreground">
                      Composite score: {multiYearData.scores.composite_score.toFixed(2)}/10 based on past operational metrics
                    </p>
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
                    {getTrendIcon(multiYearData.semantic_themes.growth_trajectory.label)}
                    <h4 className="font-semibold">Growth Trajectory</h4>
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {multiYearData.semantic_themes.growth_trajectory.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {multiYearData.semantic_themes.growth_trajectory.rationale}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getTrendIcon(multiYearData.semantic_themes.margin_trend.label)}
                    <h4 className="font-semibold">Margin Trend</h4>
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {multiYearData.semantic_themes.margin_trend.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {multiYearData.semantic_themes.margin_trend.rationale}
                  </p>
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {getTrendIcon(multiYearData.semantic_themes.cash_conversion.label)}
                    <h4 className="font-semibold">Cash Conversion</h4>
                  </div>
                  <Badge variant="outline" className="mb-2">
                    {multiYearData.semantic_themes.cash_conversion.label}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {multiYearData.semantic_themes.cash_conversion.rationale}
                  </p>
                </div>
              </div>

              {/* Component Scores */}
              <div>
                <h4 className="font-semibold mb-3">Component Analysis</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Revenue Durability', score: multiYearData.scores.revenue_durability },
                    { name: 'Margin Quality Trend', score: multiYearData.scores.margin_quality_trend },
                    { name: 'Cash Conversion Consistency', score: multiYearData.scores.cash_conversion_consistency },
                    { name: 'Balance Sheet Resilience', score: multiYearData.scores.balance_sheet_resilience },
                    { name: 'Diversification', score: multiYearData.scores.diversification },
                    { name: 'Execution & Disclosure', score: multiYearData.scores.execution_disclosure },
                    { name: 'Capital Allocation', score: multiYearData.scores.capital_allocation },
                    { name: 'Risk Overhangs (inverse)', score: multiYearData.scores.risk_overhangs }
                  ].map((component, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{component.name}</span>
                        <span className="text-sm font-bold">{component.score}/10</span>
                      </div>
                      <Progress value={component.score * 10} className="h-2" />
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-4 bg-slate-100 rounded-lg border-2 border-slate-300">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Historical Performance Score</span>
                    <span className="font-bold text-xl">{multiYearData.scores.composite_score.toFixed(2)}/10</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sum of weighted components = Grade {multiYearData.grading.letter}
                  </p>
                </div>
              </div>

              {/* Dividend Analysis */}
              <div className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
                <h4 className="font-semibold mb-3 text-purple-800">💰 Dividend Analysis</h4>
                {multiYearData.dividend_analysis?.applies ? (
                  <div className="space-y-4">
                    {/* Policy Overview */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Policy Characterization</h5>
                        <Badge variant="outline" className="mb-2">
                          {multiYearData.dividend_analysis.policy_characterization}
                        </Badge>
                        <div className="text-sm space-y-1">
                          <div><strong>Philosophy:</strong> {multiYearData.dividend_analysis.policy_philosophy}</div>
                          <div><strong>Yield Profile:</strong> {multiYearData.dividend_analysis.yield_profile.characterization} ({multiYearData.dividend_analysis.yield_profile.trend})</div>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Sustainability Signals</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Payout Coverage:</span>
                            <Badge variant="outline" className={
                              multiYearData.dividend_analysis.sustainability_signals.payout_coverage === 'Strong' ? 'bg-green-100 text-green-800' :
                              multiYearData.dividend_analysis.sustainability_signals.payout_coverage === 'Adequate' ? 'bg-blue-100 text-blue-800' :
                              multiYearData.dividend_analysis.sustainability_signals.payout_coverage === 'Stretched' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {multiYearData.dividend_analysis.sustainability_signals.payout_coverage}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Policy Consistency:</span>
                            <Badge variant="outline">{multiYearData.dividend_analysis.sustainability_signals.policy_consistency}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span>Management Commitment:</span>
                            <Badge variant="outline">{multiYearData.dividend_analysis.sustainability_signals.management_commitment}</Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dividend Actions Timeline */}
                    {multiYearData.dividend_analysis.dividend_actions.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-3">Dividend Actions by Filing Year</h5>
                        <div className="space-y-3">
                          {multiYearData.dividend_analysis.dividend_actions.map((action, index) => (
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

                    {/* Sustainability Factors */}
                    {multiYearData.dividend_analysis.sustainability_factors.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-3">Sustainability Factors</h5>
                        <div className="flex flex-wrap gap-2">
                          {multiYearData.dividend_analysis.sustainability_factors.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">{factor}</Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Additional Notes */}
                    {multiYearData.dividend_analysis.notes && (
                      <div className="p-3 bg-slate-50 rounded-lg border">
                        <h5 className="font-medium mb-2">Policy Insights</h5>
                        <p className="text-sm text-slate-700">{multiYearData.dividend_analysis.notes}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 bg-white rounded-lg border border-purple-100">
                    <div className="text-center text-purple-600">
                      <p className="text-sm">
                        <strong>No Significant Dividend Activity</strong>
                      </p>
                      <p className="text-xs text-purple-500 mt-1">
                        Dividend analysis not applicable based on filing history
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Classification */}
              <div>
                <h4 className="font-semibold mb-3">Business Classification</h4>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="bg-blue-100 text-blue-800">{multiYearData.classification.primary}</Badge>
                    {multiYearData.classification.secondary.map((sec, index) => (
                      <Badge key={index} variant="outline">{sec}</Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{multiYearData.classification.rationale}</p>
                </div>
              </div>

              {/* Time Series Analysis */}
              {multiYearData.timeseries_semantic && (
                <div>
                  <h4 className="font-semibold mb-3">Filing Year Trends</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium mb-2">Growth by Filing Year</h5>
                      <div className="space-y-1">
                        {multiYearData.timeseries_semantic.growth_by_year.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.year}:</span>
                            <Badge variant="outline" className="text-xs">
                              {item.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium mb-2">Margins by Filing Year</h5>
                      <div className="space-y-1">
                        {multiYearData.timeseries_semantic.margin_by_year.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.year}:</span>
                            <Badge variant="outline" className="text-xs">
                              {item.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-lg">
                      <h5 className="font-medium mb-2">Cash Conversion by Filing Year</h5>
                      <div className="space-y-1">
                        {multiYearData.timeseries_semantic.cash_conversion_by_year.map((item, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>{item.year}:</span>
                            <Badge variant="outline" className="text-xs">
                              {item.label}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Optional Numerics */}
              {multiYearData.optional_numerics && (
                <div>
                  <h4 className="font-semibold mb-3">Quantitative Mentions</h4>
                  <div className="grid md:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="text-center">
                      <h5 className="font-medium text-sm">Revenue CAGR</h5>
                      <p className="text-lg font-bold">
                        {multiYearData.optional_numerics.mentioned_revenue_cagr_pct 
                          ? `${multiYearData.optional_numerics.mentioned_revenue_cagr_pct}%`
                          : 'Not mentioned'}
                      </p>
                    </div>
                    <div className="text-center">
                      <h5 className="font-medium text-sm">Margin Change</h5>
                      <p className="text-lg font-bold">
                        {multiYearData.optional_numerics.mentioned_margin_change_bps 
                          ? `${multiYearData.optional_numerics.mentioned_margin_change_bps} bps`
                          : 'Not mentioned'}
                      </p>
                    </div>
                    <div className="text-center">
                      <h5 className="font-medium text-sm">FCF Direction</h5>
                      <p className="text-lg font-bold">
                        {multiYearData.optional_numerics.mentioned_fcf_direction || 'Not mentioned'}
                      </p>
                    </div>
                  </div>
                  {multiYearData.optional_numerics.notes && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {multiYearData.optional_numerics.notes}
                    </p>
                  )}
                </div>
              )}

              {/* Strategy Evolution */}
              {multiYearData.semantic_themes.strategy_evolution.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Strategic Evolution</h4>
                  <div className="space-y-3">
                    {multiYearData.semantic_themes.strategy_evolution.map((evolution, index) => (
                      <div key={index} className="p-3 border-l-4 border-blue-400 bg-blue-50 rounded-r-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{evolution.year}</Badge>
                          <span className="font-medium">Strategic Shift</span>
                        </div>
                        <p className="text-sm">{evolution.change}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Competitive Posture */}
              <div>
                <h4 className="font-semibold mb-3">Competitive Position</h4>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={
                      multiYearData.semantic_themes.competitive_posture.label.includes('Strengthening') 
                        ? 'bg-green-100 text-green-800' 
                        : multiYearData.semantic_themes.competitive_posture.label.includes('Eroding')
                        ? 'bg-red-100 text-red-800'
                        : 'bg-gray-100 text-gray-800'
                    }>
                      {multiYearData.semantic_themes.competitive_posture.label}
                    </Badge>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Key Competitive Drivers:</h5>
                    <ul className="space-y-1">
                      {multiYearData.semantic_themes.competitive_posture.drivers.map((driver, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {driver}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Risk Register */}
              {multiYearData.semantic_themes.risk_register.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-3">Risk Register</h4>
                  <div className="space-y-3">
                    {multiYearData.semantic_themes.risk_register.map((risk, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-semibold">{risk.name}</h5>
                          <Badge className={getSeverityColor(risk.severity)}>
                            {risk.severity} Risk
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{risk.note}</p>
                        <p className="text-xs text-muted-foreground">
                          Mentioned in: {risk.recurrence_years.join(', ')}
                        </p>
                      </div>
                    ))}
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
        )}
      </Card>

      {/* Management Credibility Section */}
      <Card>
        <SectionHeader
          section="management"
          title="Management Credibility Assessment"
          icon={Shield}
          badge={managementData?.scores?.credibility_tier}
          summary={managementData?.ui_summaries?.one_liner}
        />
        {expandedSections.has('management') && managementData && (
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Management Synopsis */}
              {managementData.ui_summaries?.synopsis && (
                <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
                  <h4 className="font-semibold mb-2 text-amber-800">Management Synopsis</h4>
                  <p className="text-sm text-amber-700">{managementData.ui_summaries.synopsis}</p>
                </div>
              )}

              {/* Credibility Scoring */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Credibility Assessment</h4>
                  <Badge className={getGradeColor(managementData.scores.credibility_tier)}>
                    {managementData.scores.credibility_tier} ({managementData.scores.composite_score.toFixed(1)}/10)
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Promise Follow-through</span>
                      <span className="text-sm font-medium">{managementData.scores.promise_follow_through}/10</span>
                    </div>
                    <Progress value={managementData.scores.promise_follow_through * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tone Discipline</span>
                      <span className="text-sm font-medium">{managementData.scores.tone_discipline}/10</span>
                    </div>
                    <Progress value={managementData.scores.tone_discipline * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Disclosure Hygiene</span>
                      <span className="text-sm font-medium">{managementData.scores.disclosure_hygiene}/10</span>
                    </div>
                    <Progress value={managementData.scores.disclosure_hygiene * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Risk Candor</span>
                      <span className="text-sm font-medium">{managementData.scores.risk_candor}/10</span>
                    </div>
                    <Progress value={managementData.scores.risk_candor * 10} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Strategic Coherence</span>
                      <span className="text-sm font-medium">{managementData.scores.strategic_coherence}/10</span>
                    </div>
                    <Progress value={managementData.scores.strategic_coherence * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Capital Allocation</span>
                      <span className="text-sm font-medium">{managementData.scores.capital_allocation_consistency}/10</span>
                    </div>
                    <Progress value={managementData.scores.capital_allocation_consistency * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Metric Stability</span>
                      <span className="text-sm font-medium">{managementData.scores.metric_definition_stability}/10</span>
                    </div>
                    <Progress value={managementData.scores.metric_definition_stability * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Red Flags (inverse)</span>
                      <span className="text-sm font-medium">{managementData.scores.red_flags}/10</span>
                    </div>
                    <Progress value={managementData.scores.red_flags * 10} className="h-2" />
                  </div>
                </div>
              </div>

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
            </div>
          </CardContent>
        )}
      </Card>

      {/* Predictive Inference Section */}
      <Card>
        <SectionHeader
          section="predictive"
          title="Forward-Looking Analysis"
          icon={Brain}
          badge={predictiveData ? `${predictiveData.horizon_selection.length} ${predictiveData.horizon_selection.type}` : undefined}
          summary={predictiveData?.ui_summaries?.one_liner}
        />
        {expandedSections.has('predictive') && predictiveData && (
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Predictive Synopsis */}
              {predictiveData.ui_summaries?.synopsis && (
                <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400">
                  <h4 className="font-semibold mb-2 text-purple-800">Forward-Looking Synopsis</h4>
                  <p className="text-sm text-purple-700">{predictiveData.ui_summaries.synopsis}</p>
                </div>
              )}

              {/* Current State */}
              <div>
                <h4 className="font-semibold mb-3">Current State Assessment</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Growth:</span>
                      <Badge variant="outline">{predictiveData.base_state.starting_point.growth}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Margins:</span>
                      <Badge variant="outline">{predictiveData.base_state.starting_point.margin}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Cash Generation:</span>
                      <Badge variant="outline">{predictiveData.base_state.starting_point.cash_generation}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Risk Level:</span>
                      <Badge variant="outline">{predictiveData.base_state.starting_point.risk_level}</Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scenarios */}
              <div>
                <h4 className="font-semibold mb-3">Forward Scenarios</h4>
                <div className="space-y-4">
                  {predictiveData.scenarios.map((scenario, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-semibold">{scenario.name} Case</h5>
                        <Badge variant="outline">
                          {(scenario.confidence * 100).toFixed(0)}% Confidence
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4 mb-3">
                        <div className="text-sm">
                          <span className="font-medium">Topline:</span> {scenario.outcomes.topline}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Margins:</span> {scenario.outcomes.margin}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Cash:</span> {scenario.outcomes.cash_generation}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Key Drivers:</span>
                          <ul className="text-sm text-muted-foreground ml-4">
                            {scenario.key_drivers.slice(0, 3).map((driver, idx) => (
                              <li key={idx}>• {driver}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium">Watch For:</span>
                          <ul className="text-sm text-muted-foreground ml-4">
                            {scenario.leading_indicators.slice(0, 2).map((indicator, idx) => (
                              <li key={idx}>• {indicator}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Business Thesis Section */}
      <Card>
        <SectionHeader
          section="thesis"
          title="Investment Thesis Synthesis"
          icon={Building2}
          badge={thesisData?.viability_assessment?.tier}
          summary={thesisData?.one_liner}
        />
        {expandedSections.has('thesis') && thesisData && (
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Thesis Synopsis */}
              {thesisData.synopsis && (
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold mb-2 text-green-800">Investment Synopsis</h4>
                  <p className="text-sm text-green-700">{thesisData.synopsis}</p>
                </div>
              )}

              {/* Thesis Statement */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Investment Thesis</h4>
                <p className="text-sm">{thesisData.business_thesis.thesis_statement}</p>
              </div>

              {/* Viability Assessment */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">Viability Assessment</h4>
                  <Badge className={getViabilityColor(thesisData.viability_assessment.tier)}>
                    {thesisData.viability_assessment.tier} ({thesisData.viability_assessment.composite.toFixed(1)}/10)
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Durability</span>
                      <span className="text-sm font-medium">{thesisData.viability_assessment.subscores.durability}/10</span>
                    </div>
                    <Progress value={thesisData.viability_assessment.subscores.durability * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Execution Quality</span>
                      <span className="text-sm font-medium">{thesisData.viability_assessment.subscores.execution_quality}/10</span>
                    </div>
                    <Progress value={thesisData.viability_assessment.subscores.execution_quality * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Financial Resilience</span>
                      <span className="text-sm font-medium">{thesisData.viability_assessment.subscores.financial_resilience}/10</span>
                    </div>
                    <Progress value={thesisData.viability_assessment.subscores.financial_resilience * 10} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Risk Balance</span>
                      <span className="text-sm font-medium">{thesisData.viability_assessment.subscores.risk_balance}/10</span>
                    </div>
                    <Progress value={thesisData.viability_assessment.subscores.risk_balance * 10} className="h-2" />
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Governance Quality</span>
                      <span className="text-sm font-medium">{thesisData.viability_assessment.subscores.governance_quality}/10</span>
                    </div>
                    <Progress value={thesisData.viability_assessment.subscores.governance_quality * 10} className="h-2" />
                  </div>
                </div>
              </div>

              {/* Structural Position */}
              <div>
                <h4 className="font-semibold mb-3">Structural Position</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-3 border rounded-lg">
                    <h5 className="font-medium mb-1">Moat</h5>
                    <Badge variant="outline">{thesisData.business_thesis.structural_position.moat_label}</Badge>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <h5 className="font-medium mb-1">Switching Costs</h5>
                    <Badge variant="outline">{thesisData.business_thesis.structural_position.switching_costs}</Badge>
                  </div>
                  <div className="text-center p-3 border rounded-lg">
                    <h5 className="font-medium mb-1">Regulatory</h5>
                    <Badge variant="outline">{thesisData.business_thesis.structural_position.regulatory_posture}</Badge>
                  </div>
                </div>
              </div>

              {/* Value Creation vs Fragilities */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3 text-green-700">Value Creation Drivers</h4>
                  <ul className="space-y-2">
                    {thesisData.business_thesis.value_creation_drivers.map((driver, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <Target className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {driver}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3 text-red-700">Key Fragilities</h4>
                  <ul className="space-y-2">
                    {thesisData.business_thesis.fragilities.map((fragility, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                        {fragility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Watchlist */}
              <div>
                <h4 className="font-semibold mb-3">Key Monitoring Items</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium mb-2 text-blue-700">Leading Indicators</h5>
                    <ul className="text-sm space-y-1">
                      {thesisData.watchlist.leading_indicators.slice(0, 3).map((indicator, index) => (
                        <li key={index}>• {indicator}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-amber-700">Early Warnings</h5>
                    <ul className="text-sm space-y-1">
                      {thesisData.watchlist.early_warnings.slice(0, 3).map((warning, index) => (
                        <li key={index}>• {warning}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2 text-gray-700">Data Gaps</h5>
                    <ul className="text-sm space-y-1">
                      {thesisData.watchlist.data_gaps.slice(0, 3).map((gap, index) => (
                        <li key={index}>• {gap}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        )}
      </Card>

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
