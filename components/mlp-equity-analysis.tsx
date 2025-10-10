'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Building2,
  Gauge,
  DollarSign,
  MapPin,
  AlertTriangle,
  Activity
} from 'lucide-react';
import { type MLPMultiYearAnalysis } from '@/utils/report-parsers';

interface MLPEquityAnalysisProps {
  data: MLPMultiYearAnalysis;
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

export default function MLPEquityAnalysisComponent({ data }: MLPEquityAnalysisProps) {
  return (
    <div className="space-y-8">
      {/* Analysis Coverage */}
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <h4 className="font-semibold mb-2 text-slate-800">Analysis Coverage</h4>
        <div className="flex items-center gap-4 text-sm">
          <span><strong>Filing Period:</strong> {data.window.start_fy}–{data.window.end_fy} filing years ({data.window.num_years} years)</span>
          <span><strong>Data Quality:</strong> {data.coverage.years_received.length}/{data.window.num_years} filing years received</span>
        </div>
      </div>

      {/* Historical Performance Synopsis */}
      {data.ui_summaries?.synopsis && (
        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
          <h4 className="font-semibold mb-2 text-blue-800">Historical Performance Synopsis</h4>
          <p className="text-sm text-blue-700">{data.ui_summaries.synopsis}</p>
        </div>
      )}

      {/* Historical Performance Grade */}
      {data.grading && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <h4 className="font-semibold">Historical Performance Grade</h4>
          </div>
          <Badge className={`text-lg px-4 py-2 ${getGradeColor(data.grading.letter)}`}>
            {data.grading.letter}
          </Badge>
        </div>
      )}

      {/* Key Highlights */}
      {data.ui_summaries?.bullet_highlights && (
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
      )}

      {/* Watch Items */}
      {data.ui_summaries?.watch_items && (
        <div className="bg-amber-50 p-4 rounded-lg border-l-4 border-amber-400">
          <h4 className="font-semibold mb-3 text-amber-800">Key Monitoring Points</h4>
          <ul className="space-y-2">
            {data.ui_summaries.watch_items.map((item, index) => (
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
            {getTrendIcon(data.semantic_themes.throughput_trend.label)}
            <h4 className="font-semibold">Throughput Trend</h4>
          </div>
          <Badge variant="outline" className="mb-2">
            {data.semantic_themes.throughput_trend.label}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {data.semantic_themes.throughput_trend.rationale}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {getTrendIcon(data.semantic_themes.utilization_trend.label)}
            <h4 className="font-semibold">Utilization Trend</h4>
          </div>
          <Badge variant="outline" className="mb-2">
            {data.semantic_themes.utilization_trend.label}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {data.semantic_themes.utilization_trend.notes}
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            {getTrendIcon(data.semantic_themes.fee_mix_contracts.fee_based_exposure_label)}
            <h4 className="font-semibold">Fee Mix & Contracts</h4>
          </div>
          <Badge variant="outline" className="mb-2">
            {data.semantic_themes.fee_mix_contracts.fee_based_exposure_label}
          </Badge>
          <p className="text-sm text-muted-foreground">
            {data.semantic_themes.fee_mix_contracts.commodity_exposure_comment}
          </p>
        </div>
      </div>

      {/* Business Profile */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Financial Profile */}
        <Card className="border-blue-100">
          <CardHeader className="bg-blue-50/50">
            <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Financial Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* DCF Coverage */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-blue-800">DCF Coverage Character</h4>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="bg-blue-50">
                    {data.semantic_themes.dcf_coverage_character.label}
                  </Badge>
                </div>
                <p className="text-xs text-blue-600/80 mt-2">
                  {data.semantic_themes.dcf_coverage_character.stability_comment}
                </p>
              </div>

              {/* Leverage & Liquidity */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-blue-800">Leverage & Rate Profile</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-700">Leverage:</span>
                    <Badge variant="outline" className="bg-blue-50">
                      {data.semantic_themes.leverage_liquidity.leverage_label}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-700">Rate Exposure:</span>
                    <Badge variant="outline" className="bg-blue-50">
                      {data.semantic_themes.leverage_liquidity.rate_exposure_label}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-blue-600/80 mt-2">
                  {data.semantic_themes.leverage_liquidity.liquidity_comment}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Growth & Competition */}
        <Card className="border-emerald-100">
          <CardHeader className="bg-emerald-50/50">
            <CardTitle className="text-sm font-medium text-emerald-800 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Growth & Competition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* External Growth */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-emerald-800">Growth Strategy</h4>
                <Badge variant="outline" className="mb-2 bg-emerald-50">
                  {data.semantic_themes.external_growth_recycling.activity_label}
                </Badge>
                <div className="flex flex-wrap gap-1 mb-2">
                  {data.semantic_themes.external_growth_recycling.modes.map((mode, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-emerald-50/50">
                      {mode}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-emerald-600/80">
                  {data.semantic_themes.external_growth_recycling.discipline_note}
                </p>
              </div>

              {/* Competitive Position */}
              <div>
                <h4 className="text-sm font-medium mb-2 text-emerald-800">Competitive Position</h4>
                <Badge variant="outline" className="mb-2 bg-emerald-50">
                  {data.semantic_themes.competitive_posture.label}
                </Badge>
                <div className="flex flex-wrap gap-1">
                  {data.semantic_themes.competitive_posture.drivers.map((driver, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-emerald-50/50">
                      {driver}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Structure Notes */}
      {(data.semantic_themes.structure_notes.idrs_status !== 'NotMentioned' ||
        data.semantic_themes.structure_notes.c_corp_conversion_mentions !== 'NotMentioned' ||
        data.semantic_themes.structure_notes.notes) && (
        <Card className="border-purple-100">
          <CardHeader className="bg-purple-50/50">
            <CardTitle className="text-sm font-medium text-purple-800 flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              Structure Considerations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.semantic_themes.structure_notes.idrs_status !== 'NotMentioned' && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-700">IDRs Status:</span>
                  <Badge variant="outline" className="bg-purple-50">
                    {data.semantic_themes.structure_notes.idrs_status}
                  </Badge>
                </div>
              )}
              {data.semantic_themes.structure_notes.c_corp_conversion_mentions !== 'NotMentioned' && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-purple-700">C-Corp Conversion:</span>
                  <Badge variant="outline" className="bg-purple-50">
                    {data.semantic_themes.structure_notes.c_corp_conversion_mentions}
                  </Badge>
                </div>
              )}
              {data.semantic_themes.structure_notes.notes && (
                <p className="text-xs text-purple-600/80">
                  {data.semantic_themes.structure_notes.notes}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Component Analysis */}
      <div>
        <h4 className="font-semibold mb-3">Component Analysis</h4>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Throughput Stability & Utilization', score: data.scores.throughput_stability_utilization },
            { name: 'Fee Mix & Contract Quality', score: data.scores.fee_mix_contract_quality },
            { name: 'DCF Stability & Coverage', score: data.scores.dcf_stability_coverage },
            { name: 'Leverage & Liquidity', score: data.scores.leverage_liquidity },
            { name: 'Counterparty Quality & Concentration', score: data.scores.counterparty_quality_concentration },
            { name: 'Asset Footprint & Basin Quality', score: data.scores.asset_footprint_basin_quality },
            { name: 'External Growth Discipline', score: data.scores.external_growth_discipline },
            { name: 'Risk Overhangs (inverse)', score: data.scores.risk_overhangs },
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
        <h4 className="font-semibold mb-3 text-purple-800 flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Distribution Analysis
        </h4>
          {data.distribution_analysis?.applies ? (
            <div className="space-y-6">
              {/* Policy Overview & Cadence */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg bg-purple-50">
                  <h5 className="font-medium mb-3 text-purple-800">Policy Overview</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">Policy Type</div>
                      <Badge variant="outline" className={`${
                        data.distribution_analysis.policy_characterization === 'Regular' ? 'bg-green-100 text-green-800' :
                        data.distribution_analysis.policy_characterization === 'Variable' ? 'bg-yellow-100 text-yellow-800' :
                        data.distribution_analysis.policy_characterization === 'Suspended' ? 'bg-red-100 text-red-800' :
                        data.distribution_analysis.policy_characterization === 'Initiated' ? 'bg-blue-100 text-blue-800' :
                        data.distribution_analysis.policy_characterization === 'Irregular' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {data.distribution_analysis.policy_characterization}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm font-medium mb-1">Philosophy</div>
                      <Badge variant="outline" className={`${
                        data.distribution_analysis.policy_philosophy === 'Growth-Oriented' ? 'bg-green-100 text-green-800' :
                        data.distribution_analysis.policy_philosophy === 'Yield-Focused' ? 'bg-blue-100 text-blue-800' :
                        data.distribution_analysis.policy_philosophy === 'Balanced-Return' ? 'bg-purple-100 text-purple-800' :
                        data.distribution_analysis.policy_philosophy === 'Opportunistic' ? 'bg-yellow-100 text-yellow-800' :
                        data.distribution_analysis.policy_philosophy === 'Tax-Driven' ? 'bg-orange-100 text-orange-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {data.distribution_analysis.policy_philosophy}
                      </Badge>
                    </div>
                    {data.distribution_analysis.cadence && (
                      <div>
                        <div className="text-sm font-medium mb-1">Distribution Cadence</div>
                        <Badge variant="outline">
                          {data.distribution_analysis.cadence}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-blue-50">
                  <h5 className="font-medium mb-3 text-blue-800">Coverage & Yield</h5>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium mb-1">DCF Coverage</div>
                      <Badge className={`${
                        data.distribution_analysis.coverage_metrics.dcf_coverage_bucket === 'Conservative(>=1.30x)' ? 'bg-green-100 text-green-800' :
                        data.distribution_analysis.coverage_metrics.dcf_coverage_bucket === 'Balanced(1.10–1.29x)' ? 'bg-blue-100 text-blue-800' :
                        data.distribution_analysis.coverage_metrics.dcf_coverage_bucket === 'Tight(1.00–1.09x)' ? 'bg-yellow-100 text-yellow-800' :
                        data.distribution_analysis.coverage_metrics.dcf_coverage_bucket === 'Undercovered(<1.00x)' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {data.distribution_analysis.coverage_metrics.dcf_coverage_bucket}
                      </Badge>
                      <div className="text-xs text-blue-600 mt-1">
                        Trend: {data.distribution_analysis.coverage_metrics.coverage_trend}
                      </div>
                    </div>
                      <div>
                      <div className="text-sm font-medium mb-2">Yield Profile</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Level:</span>
                          <Badge variant="outline" className={
                            data.distribution_analysis.yield_profile.characterization === 'High' ? 'bg-yellow-100 text-yellow-800' :
                            data.distribution_analysis.yield_profile.characterization === 'Moderate' ? 'bg-blue-100 text-blue-800' :
                            data.distribution_analysis.yield_profile.characterization === 'Low' ? 'bg-green-100 text-green-800' :
                            data.distribution_analysis.yield_profile.characterization === 'Variable' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {data.distribution_analysis.yield_profile.characterization}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Trend:</span>
                          <Badge variant="outline" className={
                            data.distribution_analysis.yield_profile.trend === 'Rising' ? 'bg-green-100 text-green-800' :
                            data.distribution_analysis.yield_profile.trend === 'Stable' ? 'bg-blue-100 text-blue-800' :
                            data.distribution_analysis.yield_profile.trend === 'Declining' ? 'bg-red-100 text-red-800' :
                            data.distribution_analysis.yield_profile.trend === 'Volatile' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {data.distribution_analysis.yield_profile.trend}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sustainability Assessment */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-3">Sustainability Signals</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Payout Coverage</span>
                      <Badge className={`${
                        data.distribution_analysis.sustainability_signals.dcf_coverage === 'Strong' ? 'bg-green-100 text-green-800' :
                        data.distribution_analysis.sustainability_signals.dcf_coverage === 'Adequate' ? 'bg-blue-100 text-blue-800' :
                        data.distribution_analysis.sustainability_signals.dcf_coverage === 'Stretched' ? 'bg-yellow-100 text-yellow-800' :
                        data.distribution_analysis.sustainability_signals.dcf_coverage === 'Concerning' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {data.distribution_analysis.sustainability_signals.dcf_coverage}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Policy Consistency</span>
                      <Badge className={`${
                        data.distribution_analysis.sustainability_signals.policy_consistency === 'Consistent' ? 'bg-green-100 text-green-800' :
                        data.distribution_analysis.sustainability_signals.policy_consistency === 'Variable' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {data.distribution_analysis.sustainability_signals.policy_consistency}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Management Commitment</span>
                      <Badge className={`${
                        data.distribution_analysis.sustainability_signals.management_commitment === 'High' ? 'bg-green-100 text-green-800' :
                        data.distribution_analysis.sustainability_signals.management_commitment === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {data.distribution_analysis.sustainability_signals.management_commitment}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg">
                  <h5 className="font-medium mb-3">MLP Structure Factors</h5>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">IDRs Status</span>
                      <Badge variant="outline" className={
                        data.distribution_analysis.mlp_specific_factors.idrs_elimination_mentioned ? 'bg-green-100 text-green-800' :
                        'bg-slate-100 text-slate-800'
                      }>
                        {data.distribution_analysis.mlp_specific_factors.idrs_elimination_mentioned ? 'Eliminated' : 'Present'}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">GP/LP Simplification</span>
                      <Badge variant="outline">
                        {data.distribution_analysis.mlp_specific_factors.gp_lp_simplification}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">C-Corp Conversion</span>
                      <Badge variant="outline">
                        {data.distribution_analysis.mlp_specific_factors.c_corp_conversion_mentions}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribution Actions Timeline */}
              {data.distribution_analysis.distribution_actions.length > 0 && (
                <div>
                  <h5 className="font-medium mb-3">Distribution Actions Timeline</h5>
                  <div className="space-y-3">
                    {data.distribution_analysis.distribution_actions.map((action, index) => (
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
              {data.distribution_analysis.sustainability_factors.length > 0 && (
                <div className="bg-slate-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-3">Key Sustainability Factors</h5>
                  <div className="flex flex-wrap gap-2">
                    {data.distribution_analysis.sustainability_factors.map((factor, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {factor}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Notes */}
              {data.distribution_analysis.notes && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700">
                    <strong>Additional Notes:</strong> {data.distribution_analysis.notes}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 bg-slate-50 rounded-lg text-center">
              <p className="text-sm font-medium text-slate-800">
                No Significant Distribution Activity
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Distribution analysis not applicable based on filing history
              </p>
            </div>
          )}
      </div>

      {/* Business Classification */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-indigo-600" />
            Business Classification
          </h3>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Primary Profile</h4>
                <Badge className="bg-indigo-100 text-indigo-800 border-indigo-300">
                  {data.classification.primary}
                </Badge>
              </div>

              {data.classification.secondary.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Secondary Profiles</h4>
                  <div className="flex flex-wrap gap-2">
                    {data.classification.secondary.map((profile, index) => (
                      <Badge key={index} variant="outline" className="bg-indigo-50 text-indigo-700">
                        {profile}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Business Types</h4>
                <div className="flex flex-wrap gap-2">
                  {data.classification.mlp_profile_tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="bg-slate-50">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-indigo-800">Classification Rationale</h4>
            <p className="text-sm text-indigo-700">{data.classification.rationale}</p>
          </div>
        </CardContent>
      </Card>

      {/* Filing Year Trends */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <h3 className="font-medium text-slate-800">Filing Year Trends</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Volumes Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Volume by Filing Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.timeseries_semantic.volumes_by_year.map((item, index) => (
                  <div key={index} className="grid grid-cols-[40px_1fr] gap-2 items-center">
                    <span className="text-xs">{item.year}:</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {item.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fee Mix Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Fee Mix by Filing Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.timeseries_semantic.fee_mix_by_year.map((item, index) => (
                  <div key={index} className="grid grid-cols-[40px_1fr] gap-2 items-center">
                    <span className="text-xs">{item.year}:</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {item.label === 'MoreFeeBased' ? 'More Fee-Based' :
                       item.label === 'LessFeeBased' ? 'Less Fee-Based' :
                       item.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Distribution Policy Trend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Distribution by Filing Year</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.timeseries_semantic.distribution_policy_by_year.map((item, index) => (
                  <div key={index} className="grid grid-cols-[40px_1fr] gap-2 items-center">
                    <span className="text-xs">{item.year}:</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {item.label}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                data.semantic_themes.counterparty_profile.investment_grade_exposure_label === 'High' ? 'bg-green-100 text-green-800' :
                data.semantic_themes.counterparty_profile.investment_grade_exposure_label === 'Medium' ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {data.semantic_themes.counterparty_profile.investment_grade_exposure_label}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Top Customer Concentration</span>
              <Badge className={`${
                data.semantic_themes.counterparty_profile.top_customer_concentration_label.includes('Low') ? 'bg-green-100 text-green-800' :
                data.semantic_themes.counterparty_profile.top_customer_concentration_label.includes('Medium') ? 'bg-blue-100 text-blue-800' :
                'bg-red-100 text-red-800'
              }`}>
                {data.semantic_themes.counterparty_profile.top_customer_concentration_label}
              </Badge>
            </div>
            
            <div className="p-3 bg-white rounded border">
              <p className="text-xs text-purple-700">
                <strong>Profile Notes:</strong> {data.semantic_themes.counterparty_profile.notes}
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
            {data.semantic_themes.asset_footprint_basin.map((basin, index) => (
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



      {/* Risk Register */}
      {data.semantic_themes.risk_register.length > 0 && (
        <div className="p-4 border rounded-lg bg-red-50">
          <h4 className="font-semibold mb-4 text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Risk Register
          </h4>
          <div className="grid gap-4">
            {data.semantic_themes.risk_register.map((risk, index) => (
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

            {/* Optional Metrics */}
            {(data.optional_numerics.mentioned_throughput.length > 0 ||
        data.optional_numerics.mentioned_fee_based_pct !== null ||
        data.optional_numerics.mentioned_take_or_pay_mvc_pct !== null ||
        data.optional_numerics.mentioned_dcf_coverage_ratio !== null ||
        data.optional_numerics.mentioned_leverage_debt_to_ebitda !== null ||
        data.optional_numerics.capex_split_notes !== null) && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Key Metrics Mentioned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Throughput Metrics */}
              {data.optional_numerics.mentioned_throughput.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Throughput</h4>
                  <div className="space-y-2">
                    {data.optional_numerics.mentioned_throughput.map((item, index) => (
                      <div key={index} className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="font-medium">{item.asset}:</span>
                        {item.value_range && (
                          <span>{item.value_range} {item.unit}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fee-Based Percentage */}
              {data.optional_numerics.mentioned_fee_based_pct !== null && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Fee-Based Exposure</h4>
                  <p className="text-xs text-muted-foreground">
                    ≈{data.optional_numerics.mentioned_fee_based_pct}% of cash flows
                  </p>
                </div>
              )}

              {/* Take-or-Pay/MVC Percentage */}
              {data.optional_numerics.mentioned_take_or_pay_mvc_pct !== null && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Take-or-Pay/MVC Coverage</h4>
                  <p className="text-xs text-muted-foreground">
                    ≈{data.optional_numerics.mentioned_take_or_pay_mvc_pct}% of revenues
                  </p>
                </div>
              )}

              {/* DCF Coverage Ratio */}
              {data.optional_numerics.mentioned_dcf_coverage_ratio !== null && (
                <div>
                  <h4 className="text-sm font-medium mb-1">DCF Coverage Ratio</h4>
                  <p className="text-xs text-muted-foreground">
                    {data.optional_numerics.mentioned_dcf_coverage_ratio}x
                  </p>
                </div>
              )}

              {/* Leverage Ratio */}
              {data.optional_numerics.mentioned_leverage_debt_to_ebitda !== null && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Debt/EBITDA</h4>
                  <p className="text-xs text-muted-foreground">
                    {data.optional_numerics.mentioned_leverage_debt_to_ebitda}x
                  </p>
                </div>
              )}

              {/* Capex Split Notes */}
              {data.optional_numerics.capex_split_notes && (
                <div>
                  <h4 className="text-sm font-medium mb-1">Capex Allocation</h4>
                  <p className="text-xs text-muted-foreground">
                    {data.optional_numerics.capex_split_notes}
                  </p>
                </div>
              )}

              {/* Additional Notes */}
              {data.optional_numerics.notes && (
                <div className="text-xs text-muted-foreground italic">
                  Note: {data.optional_numerics.notes}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

