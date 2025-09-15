"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { type GeneralEquityAnalysis } from '@/utils/report-parsers';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, DollarSign, Target, Award } from 'lucide-react';

interface GeneralEquityAnalysisProps {
  data: GeneralEquityAnalysis;
}

export default function GeneralEquityAnalysisComponent({ data }: GeneralEquityAnalysisProps) {
  // Helper function to get trend icon
  const getTrendIcon = (label: string) => {
    if (label.includes('Rising') || label.includes('Expanding') || label.includes('Strong')) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    }
    if (label.includes('Falling') || label.includes('Compressing') || label.includes('Weak')) {
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
    return <Minus className="h-4 w-4 text-gray-600" />;
  };

  // Helper function to get severity color
  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'med': case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Helper function to get grade color
  const getGradeColor = (letter: string) => {
    if (letter.startsWith('A')) return 'bg-green-100 text-green-800 border-green-300';
    if (letter.startsWith('B')) return 'bg-blue-100 text-blue-800 border-blue-300';
    if (letter.startsWith('C')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Header Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{data.company}</CardTitle>
              <p className="text-muted-foreground">
                Analysis Period: FY{data.window.start_fy} - FY{data.window.end_fy} ({data.window.num_years} years)
              </p>
            </div>
            <div className="text-right">
              <Badge className={`text-lg px-3 py-1 ${getGradeColor(data.grading.letter)}`}>
                Grade: {data.grading.letter}
              </Badge>
              <p className="text-sm text-muted-foreground mt-1">
                Score: {data.scores.composite_score.toFixed(1)}/10
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Executive Summary</h4>
            <p className="text-sm mb-2">{data.ui_summaries.one_liner}</p>
            <p className="text-sm">{data.ui_summaries.synopsis}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Key Operational Themes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {getTrendIcon(data.semantic_themes.growth_trajectory.label)}
                <h4 className="font-semibold">Growth Trajectory</h4>
              </div>
              <Badge variant="outline" className="mb-2">
                {data.semantic_themes.growth_trajectory.label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {data.semantic_themes.growth_trajectory.rationale}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Persistent for {data.semantic_themes.growth_trajectory.persistence_years} years
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {getTrendIcon(data.semantic_themes.margin_trend.label)}
                <h4 className="font-semibold">Margin Trend</h4>
              </div>
              <Badge variant="outline" className="mb-2">
                {data.semantic_themes.margin_trend.label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {data.semantic_themes.margin_trend.rationale}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Persistent for {data.semantic_themes.margin_trend.persistence_years} years
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {getTrendIcon(data.semantic_themes.cash_conversion.label)}
                <h4 className="font-semibold">Cash Conversion</h4>
              </div>
              <Badge variant="outline" className="mb-2">
                {data.semantic_themes.cash_conversion.label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {data.semantic_themes.cash_conversion.rationale}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Persistent for {data.semantic_themes.cash_conversion.persistence_years} years
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scores Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Detailed Scoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Revenue Durability</span>
                <span className="text-sm font-medium">{data.scores.revenue_durability}/10</span>
              </div>
              <Progress value={data.scores.revenue_durability * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Margin Quality Trend</span>
                <span className="text-sm font-medium">{data.scores.margin_quality_trend}/10</span>
              </div>
              <Progress value={data.scores.margin_quality_trend * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Cash Conversion Consistency</span>
                <span className="text-sm font-medium">{data.scores.cash_conversion_consistency}/10</span>
              </div>
              <Progress value={data.scores.cash_conversion_consistency * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Balance Sheet Resilience</span>
                <span className="text-sm font-medium">{data.scores.balance_sheet_resilience}/10</span>
              </div>
              <Progress value={data.scores.balance_sheet_resilience * 10} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Diversification</span>
                <span className="text-sm font-medium">{data.scores.diversification}/10</span>
              </div>
              <Progress value={data.scores.diversification * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Execution & Disclosure</span>
                <span className="text-sm font-medium">{data.scores.execution_disclosure}/10</span>
              </div>
              <Progress value={data.scores.execution_disclosure * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Capital Allocation</span>
                <span className="text-sm font-medium">{data.scores.capital_allocation}/10</span>
              </div>
              <Progress value={data.scores.capital_allocation * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk Overhangs (inverse)</span>
                <span className="text-sm font-medium">{data.scores.risk_overhangs}/10</span>
              </div>
              <Progress value={data.scores.risk_overhangs * 10} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Register */}
      {data.semantic_themes.risk_register.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Risk Register
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.semantic_themes.risk_register.map((risk, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{risk.name}</h4>
                    <Badge className={getSeverityColor(risk.severity)}>
                      {risk.severity} Risk
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{risk.note}</p>
                  <p className="text-xs text-muted-foreground">
                    Mentioned in years: {risk.recurrence_years.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Dividend Analysis */}
      {data.dividend_analysis.applies && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Dividend Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Policy Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Policy Type:</span>
                    <Badge variant="outline">{data.dividend_analysis.policy_characterization}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Philosophy:</span>
                    <Badge variant="outline">{data.dividend_analysis.policy_philosophy}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Yield Profile:</span>
                    <Badge variant="outline">{data.dividend_analysis.yield_profile.characterization}</Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Sustainability Signals</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Payout Coverage:</span>
                    <Badge variant="outline">{data.dividend_analysis.sustainability_signals.payout_coverage}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Policy Consistency:</span>
                    <Badge variant="outline">{data.dividend_analysis.sustainability_signals.policy_consistency}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Management Commitment:</span>
                    <Badge variant="outline">{data.dividend_analysis.sustainability_signals.management_commitment}</Badge>
                  </div>
                </div>
              </div>
            </div>

            {data.dividend_analysis.dividend_actions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Recent Actions</h4>
                <div className="space-y-2">
                  {data.dividend_analysis.dividend_actions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <span className="text-sm font-medium">{action.year}: {action.action}</span>
                        <p className="text-xs text-muted-foreground">{action.context}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Key Highlights & Watch Items */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Key Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.ui_summaries.bullet_highlights.map((highlight, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Watch Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.ui_summaries.watch_items.map((item, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-800">{data.ui_summaries.disclaimer}</p>
        </CardContent>
      </Card>
    </div>
  );
}
