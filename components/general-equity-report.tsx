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

  const getCredibilityTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'high': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-red-100 text-red-800 border-red-300';
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
          summary={managementData?.ui_summaries?.one_liner}
        />
        {expandedSections.has('management') && managementData && (
          <CardContent className="pt-0">
            <div className="space-y-6">
              {/* Management Synopsis */}
              {managementData.ui_summaries?.synopsis && (
                <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-slate-400">
                  <h4 className="font-semibold mb-2 text-slate-800">Management Synopsis</h4>
                  <p className="text-sm text-slate-700">{managementData.ui_summaries.synopsis}</p>
                </div>
              )}

              {/* Credibility Component Analysis */}
              <div>
                <h4 className="font-semibold mb-3">Credibility Component Analysis</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Promise Follow-through', score: managementData.scores.promise_follow_through },
                    { name: 'Tone Discipline', score: managementData.scores.tone_discipline },
                    { name: 'Disclosure Hygiene', score: managementData.scores.disclosure_hygiene },
                    { name: 'Risk Candor', score: managementData.scores.risk_candor },
                    { name: 'Strategic Coherence', score: managementData.scores.strategic_coherence },
                    { name: 'Capital Allocation Consistency', score: managementData.scores.capital_allocation_consistency },
                    { name: 'Metric Definition Stability', score: managementData.scores.metric_definition_stability },
                    { name: 'Red Flags (inverse)', score: managementData.scores.red_flags }
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
                        <p className="text-sm text-blue-700 mb-2">"{commitment.commitment}"</p>
                        <div className="text-xs text-blue-600 mb-2">
                          Tracked in: Filing Year {commitment.subsequent_followup_years.join(', Filing Year ')}
                        </div>
                        <p className="text-xs text-blue-600"><span className="font-medium">Rationale:</span> {commitment.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tone Profile */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  Communication Style & Tone Profile
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tone Balance</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {managementData.credibility_assessment.tone_profile.tone_balance_label}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Superlative Frequency</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {managementData.credibility_assessment.tone_profile.superlative_frequency_label}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Guidance Style</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {managementData.credibility_assessment.tone_profile.guidance_style_label}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tone Trend</span>
                      <Badge className="bg-purple-100 text-purple-800">
                        {managementData.credibility_assessment.tone_profile.change_in_tone_label}
                      </Badge>
                    </div>
                  </div>
                </div>
                {managementData.credibility_assessment.tone_profile.notes && (
                  <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700">{managementData.credibility_assessment.tone_profile.notes}</p>
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
                      <span className="text-sm">Non-GAAP Policy Clarity</span>
                      <Badge className="bg-teal-100 text-teal-800">
                        {managementData.credibility_assessment.disclosure_hygiene.non_gaap_policy_clarity}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Impairment/Restructure Clarity</span>
                      <Badge className="bg-teal-100 text-teal-800">
                        {managementData.credibility_assessment.disclosure_hygiene.impairment_restructure_clarity}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Restatement/Weakness Mentions</span>
                      <Badge className="bg-teal-100 text-teal-800">
                        {managementData.credibility_assessment.disclosure_hygiene.restatement_or_weakness_mentions}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Accounting Policy Transparency</span>
                      <Badge className="bg-teal-100 text-teal-800">
                        {managementData.credibility_assessment.disclosure_hygiene.accounting_policy_change_transparency}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Segment Bridge Quality</span>
                      <Badge className="bg-teal-100 text-teal-800">
                        {managementData.credibility_assessment.disclosure_hygiene.segment_bridge_quality}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Candor */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                  Risk Candor Analysis
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Realized Issues Acknowledged</span>
                    <Badge className="bg-red-100 text-red-800">
                      {managementData.credibility_assessment.risk_candor.realized_issues_acknowledged_label}
                    </Badge>
                  </div>
                  
                  {managementData.credibility_assessment.risk_candor.recurring_risks && managementData.credibility_assessment.risk_candor.recurring_risks.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-3 text-red-700">Recurring Risk Disclosures</h5>
                      <div className="grid gap-3">
                        {managementData.credibility_assessment.risk_candor.recurring_risks.map((risk, index) => (
                          <div key={index} className="border rounded-lg p-3 bg-red-50">
                            <div className="flex items-start justify-between mb-2">
                              <div className="font-medium text-red-800">{risk.name}</div>
                              <Badge className="bg-red-100 text-red-800">{risk.candor_label}</Badge>
                            </div>
                            <div className="text-xs text-red-600 mb-2">
                              Mentioned in: Filing Year {risk.recurrence_years.join(', Filing Year ')}
                            </div>
                            <p className="text-sm text-red-700">{risk.note}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Strategic Coherence */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-indigo-600" />
                  Strategic Coherence Assessment
                </h4>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
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
                    <div className="text-sm font-medium text-indigo-800">Resegmentation Transparency</div>
                    <Badge className="mt-2 bg-indigo-100 text-indigo-800">
                      {managementData.credibility_assessment.strategic_coherence.resegmentation_transparency_label}
                    </Badge>
                  </div>
                </div>
                
                {managementData.credibility_assessment.strategic_coherence.examples && managementData.credibility_assessment.strategic_coherence.examples.length > 0 && (
                  <div>
                    <h5 className="font-medium mb-3 text-indigo-700">Strategic Examples</h5>
                    <ul className="space-y-2">
                      {managementData.credibility_assessment.strategic_coherence.examples.map((example, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-2 h-2 bg-indigo-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-indigo-700">{example}</span>
                        </li>
                      ))}
                    </ul>
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
                        Management's Stated Capital Priorities
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

              {/* Overall Classification Summary */}
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
                  For informational purposes only. Operational analysis of historical disclosures. Not investment advice or a recommendation.
                </p>
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

