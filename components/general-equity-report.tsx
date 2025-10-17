"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  type ParsedReport,
  type GeneralEquityAnalysis,
  type GeneralManagementCredibilityAnalysis,
  type PredictiveInferenceAnalysis,
  type BusinessThesisAnalysis
} from '@/utils/report-parsers';
import { 
  ChevronDown, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  AlertTriangle, 
  Award,
  Shield,
  Target,
  Brain,
  Building2,
  AlertCircle,
  HelpCircle,
  Zap,
  Star,
  Eye,
  BarChart3,
  Lightbulb,
  GitBranch,
  Activity,
  CheckCircle,
  XCircle,
  Gauge
} from 'lucide-react';

interface GeneralEquityReportProps {
  report: ParsedReport;
}

type SectionKey = 'multi_year' | 'management' | 'predictive' | 'thesis';

export default function GeneralEquityReport({ report }: GeneralEquityReportProps) {
  const [expandedSections, setExpandedSections] = useState<Set<SectionKey>>(new Set());
  const [showAnalyticalTensions, setShowAnalyticalTensions] = useState(false);
  const [showThesisUpdateTriggers, setShowThesisUpdateTriggers] = useState(false);

  // Early return if report is not properly structured
  if (!report || !report.sections) {
    return (
      <div className="max-w-none w-full space-y-8">
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="pt-6">
            <p className="text-sm text-amber-800">
              Report data is not available or improperly formatted.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const toggleSection = (section: SectionKey) => {
    if (expandedSections.has(section)) {
      // If clicking the currently open section, close it
      setExpandedSections(new Set());
    } else {
      // If clicking a different section, show only that section
      setExpandedSections(new Set([section]));
    }
  };

  // Extract structured data from sections
  const multiYearData = report.sections.multi_year_analysis.structured_data as GeneralEquityAnalysis | undefined;
  const managementData = report.sections.management_credibility.structured_data as GeneralManagementCredibilityAnalysis | undefined;
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
      case 'verystrong':
      case 'strong': return 'bg-green-500 text-white';
      case 'adequate': return 'bg-yellow-500 text-white';
      case 'fragile': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
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
              Select one of the analysis buttons above to view detailed insights from our multi-agent AI system.
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
        {/* Multi-Year Analysis */}
        {expandedSections.has('multi_year') && multiYearData && (
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Multi-Year Operational Analysis
              </h3>
            </CardHeader>
            <CardContent>
            <div className="space-y-6">
              {/* Data Coverage Quality */}
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
        </Card>
        )}

        {/* Management Credibility */}
        {expandedSections.has('management') && managementData && (
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
                        <p className="text-sm text-blue-700 mb-2">&ldquo;{commitment.commitment}&rdquo;</p>
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
        </Card>
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

              {/* Key Highlights & Watch Items */}
              {(predictiveData.ui_summaries.bullet_highlights || predictiveData.ui_summaries.watch_items) && (
                <div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Bullet Highlights */}
                    {predictiveData.ui_summaries.bullet_highlights && predictiveData.ui_summaries.bullet_highlights.length > 0 && (
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
                    )}

                    {/* Watch Items */}
                    {predictiveData.ui_summaries.watch_items && predictiveData.ui_summaries.watch_items.length > 0 && (
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
                    )}
                  </div>
                </div>
              )}

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
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Growth:</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {predictiveData.base_state.starting_point.growth}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Margins:</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {predictiveData.base_state.starting_point.margin}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Cash Gen:</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {predictiveData.base_state.starting_point.cash_generation}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">Risk:</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">
                        {predictiveData.base_state.starting_point.risk_level}
                      </Badge>
                    </div>
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

              {/* Recent Inflections */}
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
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Topline:</span>
                            <Badge variant="outline">{scenario.outcomes.topline}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Margins:</span>
                            <Badge variant="outline">{scenario.outcomes.margin}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Cash Generation:</span>
                            <Badge variant="outline">{scenario.outcomes.cash_generation}</Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Capex Intensity:</span>
                            <Badge variant="outline">{scenario.outcomes.capex_intensity}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Leverage:</span>
                            <Badge variant="outline">{scenario.outcomes.leverage}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Diversification:</span>
                            <Badge variant="outline">{scenario.outcomes.diversification}</Badge>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Execution Load:</span>
                            <Badge variant="outline">{scenario.outcomes.execution_load}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Risk Level:</span>
                            <Badge variant="outline">{scenario.outcomes.risk_level}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Dividend Outlook:</span>
                            <Badge variant="outline">{scenario.outcomes.dividend_outlook}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Numeric Notes */}
                      {(scenario.coarse_numeric_notes.yoy_growth_range_pct || scenario.coarse_numeric_notes.margin_change_bps) && (
                        <div className="mb-4 p-3 bg-white rounded-lg border">
                          <h6 className="font-medium mb-2 text-sm">Quantitative Indicators</h6>
                          <div className="grid md:grid-cols-2 gap-2">
                            {scenario.coarse_numeric_notes.yoy_growth_range_pct && (
                              <div className="text-sm">
                                <span className="font-medium">Growth Range:</span> {scenario.coarse_numeric_notes.yoy_growth_range_pct}
                              </div>
                            )}
                            {scenario.coarse_numeric_notes.margin_change_bps && (
                              <div className="text-sm">
                                <span className="font-medium">Margin Change:</span> {scenario.coarse_numeric_notes.margin_change_bps}
                              </div>
                            )}
                          </div>
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

              {/* Transition Map */}
              {predictiveData.transition_map && predictiveData.transition_map.length > 0 && (
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
                              transition.to === 'Upside' ? 'bg-green-100 text-green-800' :
                              transition.to === 'Downside' ? 'bg-red-100 text-red-800' :
                              'bg-slate-100 text-slate-800'
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
              )}

              {/* Uncertainty Analysis */}
              {predictiveData.uncertainty && (
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
              )}

              {/* Dividend Forward Analysis */}
              {predictiveData.dividend_forward_analysis && predictiveData.dividend_forward_analysis.applies && (
                <div className="p-6 border-2 rounded-lg bg-gradient-to-br from-slate-50 to-blue-50 border-slate-300">
                  <h4 className="font-semibold mb-6 flex items-center gap-2 text-lg">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                    Dividend Forward Analysis
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Base Outlook & Sustainability */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Base Outlook */}
                      <div className="p-4 border rounded-lg bg-white shadow-sm">
                        <h5 className="font-semibold mb-3 text-green-800">Base Case Outlook</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Expected Direction:</span>
                            <Badge className={`${
                              predictiveData.dividend_forward_analysis.base_outlook === 'Increase' ? 'bg-green-100 text-green-800' :
                              predictiveData.dividend_forward_analysis.base_outlook === 'Maintain' ? 'bg-blue-100 text-blue-800' :
                              predictiveData.dividend_forward_analysis.base_outlook === 'Reduce' ? 'bg-orange-100 text-orange-800' :
                              predictiveData.dividend_forward_analysis.base_outlook === 'Suspend' ? 'bg-red-100 text-red-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {predictiveData.dividend_forward_analysis.base_outlook}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 gap-2">
                            <div className="flex justify-between items-center">
                              <span className="text-xs">FCF Trajectory:</span>
                              <Badge variant="outline" className="text-xs">
                                {predictiveData.dividend_forward_analysis.sustainability_drivers.fcf_trajectory}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Payout Pressure:</span>
                              <Badge variant="outline" className="text-xs">
                                {predictiveData.dividend_forward_analysis.sustainability_drivers.payout_pressure}
                              </Badge>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs">Capital Priority:</span>
                              <Badge variant="outline" className="text-xs">
                                {predictiveData.dividend_forward_analysis.sustainability_drivers.capital_allocation_priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Management Signaling */}
                      <div className="p-4 border rounded-lg bg-white shadow-sm">
                        <h5 className="font-semibold mb-3 text-blue-800">Management Signaling</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Commitment Strength:</span>
                            <Badge className={`${
                              predictiveData.dividend_forward_analysis.management_signaling.commitment_strength === 'Strong' ? 'bg-green-100 text-green-800' :
                              predictiveData.dividend_forward_analysis.management_signaling.commitment_strength === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
                              predictiveData.dividend_forward_analysis.management_signaling.commitment_strength === 'Weak' ? 'bg-red-100 text-red-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {predictiveData.dividend_forward_analysis.management_signaling.commitment_strength}
                            </Badge>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">Messaging Tone:</span>
                            <Badge className={`${
                              predictiveData.dividend_forward_analysis.management_signaling.recent_messaging_tone === 'Confident' ? 'bg-green-100 text-green-800' :
                              predictiveData.dividend_forward_analysis.management_signaling.recent_messaging_tone === 'Cautious' ? 'bg-yellow-100 text-yellow-800' :
                              predictiveData.dividend_forward_analysis.management_signaling.recent_messaging_tone === 'Defensive' ? 'bg-red-100 text-red-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {predictiveData.dividend_forward_analysis.management_signaling.recent_messaging_tone}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Scenario Differentiation */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Upside Case */}
                      {predictiveData.dividend_forward_analysis.scenario_differentiation.upside_dividend_case && (
                        <div className="p-4 border rounded-lg bg-white shadow-sm border-green-200">
                          <h5 className="font-semibold mb-2 text-green-800 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Upside Dividend Case
                          </h5>
                          <p className="text-sm text-green-700">
                            {predictiveData.dividend_forward_analysis.scenario_differentiation.upside_dividend_case}
                          </p>
                        </div>
                      )}

                      {/* Downside Risk */}
                      {predictiveData.dividend_forward_analysis.scenario_differentiation.downside_dividend_risk && (
                        <div className="p-4 border rounded-lg bg-white shadow-sm border-red-200">
                          <h5 className="font-semibold mb-2 text-red-800 flex items-center gap-2">
                            <TrendingDown className="h-4 w-4" />
                            Downside Dividend Risk
                          </h5>
                          <p className="text-sm text-red-700">
                            {predictiveData.dividend_forward_analysis.scenario_differentiation.downside_dividend_risk}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Policy Inflection Signals */}
                    {predictiveData.dividend_forward_analysis.policy_inflection_signals && 
                     predictiveData.dividend_forward_analysis.policy_inflection_signals.length > 0 && (
                      <div className="p-4 border rounded-lg bg-white shadow-sm border-orange-200">
                        <h5 className="font-semibold mb-3 text-orange-800 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Policy Inflection Signals to Monitor
                        </h5>
                        <ul className="space-y-2">
                          {predictiveData.dividend_forward_analysis.policy_inflection_signals.map((signal, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-orange-700">{signal}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Additional Notes */}
                    {predictiveData.dividend_forward_analysis.notes && (
                      <div className="p-4 border rounded-lg bg-white shadow-sm border-slate-200">
                        <h5 className="font-semibold mb-2 text-slate-800">Additional Insights</h5>
                        <p className="text-sm text-slate-700">{predictiveData.dividend_forward_analysis.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              {predictiveData.ui_summaries.disclaimer && (
                <div className="p-4 border rounded-lg bg-slate-100">
                  <p className="text-xs text-slate-600 italic">{predictiveData.ui_summaries.disclaimer}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        )}

        {/* Business Thesis */}
        {expandedSections.has('thesis') && thesisData && (
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Building2 className="h-5 w-5 text-orange-600" />
                Business Thesis & Viability Assessment
              </h3>
            </CardHeader>
            <CardContent>
            <div className="space-y-6">
              {/* Synopsis and Analysis Alignment Side by Side */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Synopsis */}
                {thesisData.synopsis && (
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                    <h4 className="font-semibold mb-2 text-slate-800">Business Thesis Synopsis</h4>
                    <p className="text-sm text-slate-700">{thesisData.synopsis}</p>
                  </div>
                )}

                {/* Analysis Alignment */}
                {thesisData.agreement && (
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h4 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
                      <Gauge className="h-4 w-4" />
                      Analysis Alignment
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">Consensus Score:</span>
                        <Badge className="bg-blue-100 text-blue-800">
                          {(thesisData.agreement.alignment_score * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${thesisData.agreement.alignment_score * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-blue-600">
                        Agreement across Multi-Year, Management, and Forward-Looking analyses
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Business Viability Assessment - Top Priority */}
              <div className="p-6 border-2 rounded-lg bg-gradient-to-br from-slate-50 to-indigo-50 border-indigo-200">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-lg flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-indigo-600" />
                    Business Viability Assessment
                  </h4>
                  <Badge className={`text-lg px-4 py-2 ${getViabilityColor(thesisData.viability_assessment.tier)}`}>
                    {thesisData.viability_assessment.tier} ({thesisData.viability_assessment.composite.toFixed(1)}/10)
                  </Badge>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="p-3 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Durability</span>
                        <span className="text-sm font-bold">{thesisData.viability_assessment.subscores.durability.toFixed(1)}/10</span>
                      </div>
                      <Progress value={thesisData.viability_assessment.subscores.durability * 10} className="h-2" />
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Execution Quality</span>
                        <span className="text-sm font-bold">{thesisData.viability_assessment.subscores.execution_quality.toFixed(1)}/10</span>
                      </div>
                      <Progress value={thesisData.viability_assessment.subscores.execution_quality * 10} className="h-2" />
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Financial Resilience</span>
                        <span className="text-sm font-bold">{thesisData.viability_assessment.subscores.financial_resilience.toFixed(1)}/10</span>
                      </div>
                      <Progress value={thesisData.viability_assessment.subscores.financial_resilience * 10} className="h-2" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-3 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Risk Balance</span>
                        <span className="text-sm font-bold">{thesisData.viability_assessment.subscores.risk_balance.toFixed(1)}/10</span>
                      </div>
                      <Progress value={thesisData.viability_assessment.subscores.risk_balance * 10} className="h-2" />
                    </div>
                    
                    <div className="p-3 bg-white rounded-lg border">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">Governance Quality</span>
                        <span className="text-sm font-bold">{thesisData.viability_assessment.subscores.governance_quality.toFixed(1)}/10</span>
                      </div>
                      <Progress value={thesisData.viability_assessment.subscores.governance_quality * 10} className="h-2" />
                    </div>

                    {/* Contribution Breakdown */}
                    {thesisData.contribution_breakdown && (
                      <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-200">
                        <h6 className="font-medium text-sm text-indigo-800 mb-2">Analysis Contribution Weights</h6>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span>Multi-Year Analysis:</span>
                            <span className="font-medium">{(thesisData.contribution_breakdown.weights.multi_year * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Management Analysis:</span>
                            <span className="font-medium">{(thesisData.contribution_breakdown.weights.management * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Forward-Looking Analysis:</span>
                            <span className="font-medium">{(thesisData.contribution_breakdown.weights.predictive * 100).toFixed(0)}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-white rounded-lg border">
                  <h6 className="font-medium text-sm mb-2">Assessment Rationale</h6>
                  <p className="text-sm text-slate-700">{thesisData.viability_assessment.rationale}</p>
                </div>
              </div>

              {/* Consensus Map */}
              {thesisData.consensus_map && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <GitBranch className="h-5 w-5 text-blue-600" />
                    Analysis Consensus Map
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Areas of Agreement and Divergence */}
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Areas of Agreement */}
                      <div className="p-4 border rounded-lg bg-green-50">
                        <h5 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Areas of Agreement
                        </h5>
                        <ul className="space-y-2">
                          {thesisData.consensus_map.aligned_themes.map((theme, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-green-700">{theme}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Areas of Divergence */}
                      <div className="p-4 border rounded-lg bg-red-50">
                        <h5 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
                          <XCircle className="h-4 w-4" />
                          Areas of Divergence
                        </h5>
                        {thesisData.agreement.areas_of_divergence && thesisData.agreement.areas_of_divergence.length > 0 ? (
                          <ul className="space-y-2">
                            {thesisData.agreement.areas_of_divergence.map((divergence, index) => (
                              <li key={index} className="text-sm flex items-start gap-2">
                                <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-red-700">{divergence}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-red-600 italic">No significant divergences identified</p>
                        )}
                      </div>
                    </div>

                  </div>

                  {/* Analytical Tensions - Collapsible */}
                  {thesisData.consensus_map.tensions && thesisData.consensus_map.tensions.length > 0 && (
                    <div className="mt-4">
                      <button 
                        onClick={() => setShowAnalyticalTensions(!showAnalyticalTensions)}
                        className="w-full flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-amber-600" />
                          <h5 className="font-semibold text-amber-800">
                            Analytical Tensions ({thesisData.consensus_map.tensions.length})
                          </h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-amber-600">
                            {showAnalyticalTensions ? 'Hide details' : 'Show details'}
                          </span>
                          <ChevronDown className={`h-4 w-4 text-amber-600 transition-transform ${
                            showAnalyticalTensions ? 'rotate-180' : ''
                          }`} />
                        </div>
                      </button>
                      
                      {showAnalyticalTensions && (
                        <div className="mt-3 space-y-3">
                          {thesisData.consensus_map.tensions.map((tension, index) => (
                            <div key={index} className="p-4 border rounded-lg bg-amber-50">
                              <h6 className="font-medium text-sm text-amber-800 mb-2">{tension.topic}</h6>
                              <div className="grid md:grid-cols-3 gap-3 mb-3">
                                <div className="text-xs">
                                  <span className="font-medium text-slate-600">Multi-Year:</span>
                                  <p className="text-slate-700 mt-1">{tension.positions.multi_year}</p>
                                </div>
                                <div className="text-xs">
                                  <span className="font-medium text-slate-600">Management:</span>
                                  <p className="text-slate-700 mt-1">{tension.positions.management}</p>
                                </div>
                                <div className="text-xs">
                                  <span className="font-medium text-slate-600">Forward-Looking:</span>
                                  <p className="text-slate-700 mt-1">{tension.positions.predictive}</p>
                                </div>
                              </div>
                              <div className="text-xs bg-amber-100 p-2 rounded">
                                <span className="font-medium text-amber-800">Diagnosis:</span>
                                <span className="text-amber-700 ml-1">{tension.diagnosis}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Operating Model Profile */}
              {thesisData.business_thesis && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-purple-600" />
                    Operating Model Profile
                  </h4>
                  
                  {/* Operating Model */}
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h5 className="font-semibold mb-3 text-green-800">Operating Model Strengths</h5>
                      <ul className="space-y-2">
                        {thesisData.business_thesis.operating_model.strengths.map((strength, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-green-700">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg bg-red-50">
                      <h5 className="font-semibold mb-3 text-red-800">Operating Constraints</h5>
                      <ul className="space-y-2">
                        {thesisData.business_thesis.operating_model.constraints.map((constraint, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-red-700">{constraint}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Value Creation & Fragilities */}
                  <div className="grid md:grid-cols-2 gap-6 mb-4">
                    <div className="p-4 border rounded-lg bg-blue-50">
                      <h5 className="font-semibold mb-3 text-blue-800">Value Creation Drivers</h5>
                      <ul className="space-y-2">
                        {thesisData.business_thesis.value_creation_drivers.map((driver, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <TrendingUp className="h-3 w-3 text-blue-600 mt-1 flex-shrink-0" />
                            <span className="text-blue-700">{driver}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg bg-orange-50">
                      <h5 className="font-semibold mb-3 text-orange-800">Key Fragilities</h5>
                      <ul className="space-y-2">
                        {thesisData.business_thesis.fragilities.map((fragility, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <AlertTriangle className="h-3 w-3 text-orange-600 mt-1 flex-shrink-0" />
                            <span className="text-orange-700">{fragility}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Structural Position */}
                  <div className="p-4 border rounded-lg bg-slate-50">
                    <h5 className="font-semibold mb-3 text-slate-800">Structural Position Assessment</h5>
                    <div className="grid md:grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-xs text-slate-600 mb-1">Competitive Moat</div>
                        <Badge className={`${
                          thesisData.business_thesis.structural_position.moat_label === 'Strengthening' ? 'bg-green-100 text-green-800' :
                          thesisData.business_thesis.structural_position.moat_label === 'Stable' ? 'bg-blue-100 text-blue-800' :
                          thesisData.business_thesis.structural_position.moat_label === 'Eroding' ? 'bg-red-100 text-red-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {thesisData.business_thesis.structural_position.moat_label}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-600 mb-1">Switching Costs</div>
                        <Badge className={`${
                          thesisData.business_thesis.structural_position.switching_costs === 'High' ? 'bg-green-100 text-green-800' :
                          thesisData.business_thesis.structural_position.switching_costs === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {thesisData.business_thesis.structural_position.switching_costs}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-slate-600 mb-1">Regulatory Posture</div>
                        <Badge className={`${
                          thesisData.business_thesis.structural_position.regulatory_posture === 'Favorable' ? 'bg-green-100 text-green-800' :
                          thesisData.business_thesis.structural_position.regulatory_posture === 'Neutral' ? 'bg-blue-100 text-blue-800' :
                          thesisData.business_thesis.structural_position.regulatory_posture === 'Adverse' ? 'bg-red-100 text-red-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {thesisData.business_thesis.structural_position.regulatory_posture}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 italic">{thesisData.business_thesis.structural_position.notes}</p>
                  </div>
                </div>
              )}

              {/* Scenarios Bridge */}
              {thesisData.scenarios_bridge && (
                <div>
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-teal-600" />
                    Scenario Outlook & Triggers
                  </h4>
                  
                  <div className="p-4 border rounded-lg bg-teal-50 mb-4">
                    <h5 className="font-semibold mb-2 text-teal-800">Base Path Expectation</h5>
                    <p className="text-sm text-teal-700 font-medium">{thesisData.scenarios_bridge.base_path}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 border rounded-lg bg-green-50">
                      <h5 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Upside Scenario Confirmations
                      </h5>
                      <ul className="space-y-2">
                        {thesisData.scenarios_bridge.upside_falsifiers.map((falsifier, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-3 w-3 text-green-600 mt-1 flex-shrink-0" />
                            <span className="text-green-700">{falsifier}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 border rounded-lg bg-red-50">
                      <h5 className="font-semibold mb-3 text-red-800 flex items-center gap-2">
                        <TrendingDown className="h-4 w-4" />
                        Downside Scenario Confirmations
                      </h5>
                      <ul className="space-y-2">
                        {thesisData.scenarios_bridge.downside_falsifiers.map((falsifier, index) => (
                          <li key={index} className="text-sm flex items-start gap-2">
                            <XCircle className="h-3 w-3 text-red-600 mt-1 flex-shrink-0" />
                            <span className="text-red-700">{falsifier}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Comprehensive Monitoring Framework */}
              <div>
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Eye className="h-5 w-5 text-gray-600" />
                  Monitoring Dashboard
                </h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <h5 className="font-semibold mb-3 text-blue-800">Leading Indicators</h5>
                    <ul className="space-y-2">
                      {thesisData.watchlist.leading_indicators.map((indicator, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-blue-700">{indicator}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-amber-50">
                    <h5 className="font-semibold mb-3 text-amber-800">Early Warning Signals</h5>
                    <ul className="space-y-2">
                      {thesisData.watchlist.early_warnings.map((warning, index) => (
                        <li key={index} className="text-sm flex items-start gap-2">
                          <AlertTriangle className="h-3 w-3 text-amber-600 mt-1 flex-shrink-0" />
                          <span className="text-amber-700">{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Transition Triggers - Collapsible */}
              {thesisData.transition_triggers && thesisData.transition_triggers.length > 0 && (
                <div>
                  <button 
                    onClick={() => setShowThesisUpdateTriggers(!showThesisUpdateTriggers)}
                    className="w-full flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-600" />
                      <h4 className="font-semibold text-yellow-800">
                        Business Thesis Update Triggers ({thesisData.transition_triggers.length})
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-yellow-600">
                        {showThesisUpdateTriggers ? 'Hide details' : 'Show details'}
                      </span>
                      <ChevronDown className={`h-4 w-4 text-yellow-600 transition-transform ${
                        showThesisUpdateTriggers ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </button>
                  
                  {showThesisUpdateTriggers && (
                    <div className="mt-3 space-y-3">
                      {thesisData.transition_triggers.map((trigger, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-yellow-50">
                          <div className="flex items-start justify-between mb-2">
                            <h6 className="font-medium text-sm text-yellow-800">{trigger.event}</h6>
                            <div className="flex gap-2">
                              <Badge className={`text-xs ${
                                trigger.interpretation === 'Positive' ? 'bg-green-100 text-green-800' :
                                trigger.interpretation === 'Negative' ? 'bg-red-100 text-red-800' :
                                'bg-slate-100 text-slate-800'
                              }`}>
                                {trigger.interpretation}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {trigger.expected_effect}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-xs text-yellow-700 italic">
                            <span className="font-medium">Update Rule:</span> {trigger.thesis_update_rule}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Final Disclaimer */}
              {thesisData.disclaimer && (
                <div className="p-4 border rounded-lg bg-slate-100">
                  <p className="text-xs text-slate-600 italic">{thesisData.disclaimer}</p>
                </div>
              )}
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
