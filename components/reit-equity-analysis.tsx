"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Minus, AlertTriangle, DollarSign, Target, Award, Home, MapPin } from 'lucide-react';

// REIT-specific interfaces based on the schemas you provided
interface REITAnalysisData {
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
    distribution_actions: Array<{
      year: number;
      action: string;
      context: string;
    }>;
  };
  ui_summaries: {
    one_liner: string;
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
    disclaimer: string;
  };
}

interface REITAnalysisProps {
  data: REITAnalysisData;
}

export default function REITEquityAnalysisComponent({ data }: REITAnalysisProps) {
  // Helper function to get trend icon
  const getTrendIcon = (label: string) => {
    if (label.includes('Rising') || label.includes('Up') || label.includes('Improving') || label.includes('Positive')) {
      return <TrendingUp className="h-4 w-4 text-green-600" />;
    }
    if (label.includes('Falling') || label.includes('Down') || label.includes('Declining') || label.includes('Negative')) {
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

  // Helper function to get share color
  const getShareColor = (label: string) => {
    if (label === 'High') return 'bg-blue-100 text-blue-800';
    if (label === 'Medium') return 'bg-yellow-100 text-yellow-800';
    if (label === 'Low') return 'bg-gray-100 text-gray-800';
    return 'bg-gray-100 text-gray-800';
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
          <div className="bg-blue-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold mb-2">Executive Summary</h4>
            <p className="text-sm mb-2">{data.ui_summaries.one_liner}</p>
            <p className="text-sm">{data.ui_summaries.synopsis}</p>
          </div>

          {/* Key Operational Highlights */}
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h4 className="font-semibold mb-3 text-green-800">Key Operational Highlights</h4>
            <ul className="space-y-2">
              {data.ui_summaries.bullet_highlights.map((highlight, index) => (
                <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                  <span className="text-green-500 mt-1 flex-shrink-0">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Key REIT Themes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Key REIT Operational Themes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {getTrendIcon(data.semantic_themes.same_store_noi_trend.label)}
                <h4 className="font-semibold">Same Store NOI</h4>
              </div>
              <Badge variant="outline" className="mb-2">
                {data.semantic_themes.same_store_noi_trend.label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {data.semantic_themes.same_store_noi_trend.rationale}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Persistent for {data.semantic_themes.same_store_noi_trend.persistence_years} years
              </p>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {getTrendIcon(data.semantic_themes.occupancy_trend.label)}
                <h4 className="font-semibold">Occupancy Trend</h4>
              </div>
              <Badge variant="outline" className="mb-2">
                {data.semantic_themes.occupancy_trend.label}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {data.semantic_themes.occupancy_trend.rationale}
              </p>
              {data.semantic_themes.occupancy_trend.average_occupancy_pct && (
                <p className="text-xs text-muted-foreground mt-1">
                  Average: {data.semantic_themes.occupancy_trend.average_occupancy_pct}%
                </p>
              )}
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                {getTrendIcon(data.semantic_themes.leasing_economics.rent_spread_trend)}
                <h4 className="font-semibold">Leasing Economics</h4>
              </div>
              <Badge variant="outline" className="mb-2">
                {data.semantic_themes.leasing_economics.rent_spread_trend}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {data.semantic_themes.leasing_economics.notes}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Escalators: {data.semantic_themes.leasing_economics.escalators_presence}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property Portfolio Mix */}
      {data.semantic_themes.property_type_mix.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Property Portfolio Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.semantic_themes.property_type_mix.map((prop, index) => (
                <div key={index} className="p-3 border rounded-lg text-center">
                  <h4 className="font-semibold text-sm mb-2">{prop.type}</h4>
                  <Badge className={getShareColor(prop.approx_share_label)}>
                    {prop.approx_share_label} Share
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Geographic Mix */}
      {data.semantic_themes.geography_mix.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Geographic Exposure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.semantic_themes.geography_mix.map((geo, index) => (
                <div key={index} className="p-3 border rounded-lg text-center">
                  <h4 className="font-semibold text-sm mb-2">{geo.region_or_market}</h4>
                  <Badge className={getShareColor(geo.approx_share_label)}>
                    {geo.approx_share_label} Exposure
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* REIT Scores Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            REIT Detailed Scoring
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Portfolio Quality & Occupancy</span>
                <span className="text-sm font-medium">{data.scores.portfolio_quality_occupancy}/10</span>
              </div>
              <Progress value={data.scores.portfolio_quality_occupancy * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Same Store NOI Trend</span>
                <span className="text-sm font-medium">{data.scores.same_store_noi_trend}/10</span>
              </div>
              <Progress value={data.scores.same_store_noi_trend * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">AFFO Stability & Payout</span>
                <span className="text-sm font-medium">{data.scores.affo_stability_payout}/10</span>
              </div>
              <Progress value={data.scores.affo_stability_payout * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Balance Sheet & Liquidity</span>
                <span className="text-sm font-medium">{data.scores.balance_sheet_liquidity}/10</span>
              </div>
              <Progress value={data.scores.balance_sheet_liquidity * 10} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Lease Maturity Risk</span>
                <span className="text-sm font-medium">{data.scores.lease_maturity_concentration_risk}/10</span>
              </div>
              <Progress value={data.scores.lease_maturity_concentration_risk * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Tenant Diversification</span>
                <span className="text-sm font-medium">{data.scores.tenant_industry_diversification}/10</span>
              </div>
              <Progress value={data.scores.tenant_industry_diversification * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">External Growth Discipline</span>
                <span className="text-sm font-medium">{data.scores.external_growth_discipline}/10</span>
              </div>
              <Progress value={data.scores.external_growth_discipline * 10} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-sm">Risk Management (inverse)</span>
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

      {/* Distribution Analysis */}
      {data.distribution_analysis.applies && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Distribution Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Policy Overview</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Policy Type:</span>
                    <Badge variant="outline">{data.distribution_analysis.policy_characterization}</Badge>
                  </div>
                  {data.distribution_analysis.cadence && (
                    <div className="flex justify-between">
                      <span className="text-sm">Cadence:</span>
                      <Badge variant="outline">{data.distribution_analysis.cadence}</Badge>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Coverage Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">AFFO Coverage:</span>
                    <Badge variant="outline">{data.distribution_analysis.coverage_metrics.affo_payout_ratio_bucket}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">FFO Coverage:</span>
                    <Badge variant="outline">{data.distribution_analysis.coverage_metrics.ffo_payout_ratio_bucket}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Coverage Trend:</span>
                    <Badge variant="outline">{data.distribution_analysis.coverage_metrics.coverage_trend}</Badge>
                  </div>
                </div>
              </div>
            </div>

            {data.distribution_analysis.distribution_actions.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Recent Actions</h4>
                <div className="space-y-2">
                  {data.distribution_analysis.distribution_actions.map((action, index) => (
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

      {/* Watch Items */}
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

      {/* Disclaimer */}
      <Card className="border-amber-200 bg-amber-50">
        <CardContent className="pt-6">
          <p className="text-sm text-amber-800">{data.ui_summaries.disclaimer}</p>
        </CardContent>
      </Card>
    </div>
  );
}
