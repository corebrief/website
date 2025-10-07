// Schema parsers for different report types (General, REIT, MLP)

export interface BaseReportData {
  ticker: string;
  years_range: string;
  classification: 'general' | 'reit' | 'mlp';
  multi_year_analysis: string;
  management_credibility: string;
  predictive_inference: string;
  business_assessment: string;
  analysis_metadata?: unknown;
  years_used?: number[];
  analysis_years?: number;
  model_used?: string;
  generated_at?: string;
  is_free: boolean;
  has_access: boolean;
}

export interface ParsedSection {
  title: string;
  content: string;
  subsections?: ParsedSection[];
  structured_data?: unknown; // For JSON structured content
}

export interface ParsedReport {
  ticker: string;
  years_range: string;
  classification: 'general' | 'reit' | 'mlp';
  sections: {
    multi_year_analysis: ParsedSection;
    management_credibility: ParsedSection;
    predictive_inference: ParsedSection;
    final_thesis: ParsedSection;
  };
  metadata: {
    years_used?: number[];
    analysis_years?: number;
    model_used?: string;
    generated_at?: string;
    is_free: boolean;
    has_access: boolean;
  };
}

// Schema interfaces for structured data
export interface GeneralEquityAnalysis {
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
    growth_trajectory: {
      label: string;
      persistence_years: number;
      rationale: string;
    };
    margin_trend: {
      label: string;
      persistence_years: number;
      rationale: string;
    };
    cash_conversion: {
      label: string;
      persistence_years: number;
      rationale: string;
    };
    strategy_evolution: Array<{
      year: number;
      change: string;
    }>;
    competitive_posture: {
      label: string;
      drivers: string[];
    };
    risk_register: Array<{
      name: string;
      recurrence_years: number[];
      severity: string;
      note: string;
    }>;
  };
  timeseries_semantic: {
    growth_by_year: Array<{
      year: number;
      label: string;
    }>;
    margin_by_year: Array<{
      year: number;
      label: string;
    }>;
    cash_conversion_by_year: Array<{
      year: number;
      label: string;
    }>;
  };
  optional_numerics: {
    mentioned_revenue_cagr_pct: number | null;
    mentioned_margin_change_bps: number | null;
    mentioned_fcf_direction: string | null;
    notes: string;
  };
  classification: {
    primary: string;
    secondary: string[];
    rationale: string;
  };
  scores: {
    revenue_durability: number;
    margin_quality_trend: number;
    cash_conversion_consistency: number;
    balance_sheet_resilience: number;
    diversification: number;
    execution_disclosure: number;
    capital_allocation: number;
    risk_overhangs: number;
    weights: number[];
    composite_score: number;
  };
  grading: {
    letter: string;
    mapping_note: string;
  };
  dividend_analysis: {
    applies: boolean;
    policy_characterization: string;
    sustainability_signals: {
      payout_coverage: string;
      policy_consistency: string;
      management_commitment: string;
    };
    dividend_actions: Array<{
      year: number;
      action: string;
      context: string;
    }>;
    policy_philosophy: string;
    yield_profile: {
      characterization: string;
      trend: string;
    };
    sustainability_factors: string[];
    notes: string | null;
  };
  features_for_downstream: {
    growth_trajectory: string;
    margin_trend: string;
    cash_conversion: string;
    diversification: string;
    risk_themes: string[];
    capital_allocation_stance: string;
    execution_consistency: string;
    recent_structural_changes: string[];
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

// General Equity Management Credibility Analysis schema
export interface GeneralManagementCredibilityAnalysis {
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
      commitment_type?: string;
      commitment: string;
      subsequent_followup_years: number[];
      outcome_label: string;
      rationale: string;
    }>;
    tone_profile: {
      tone_balance_label: string;
      superlative_frequency_label: string;
      guidance_style_label: string;
      change_in_tone_label: string;
      notes: string;
    };
    disclosure_hygiene: {
      non_gaap_policy_clarity: string;
      impairment_restructure_clarity: string;
      restatement_or_weakness_mentions: string;
      accounting_policy_change_transparency: string;
      segment_bridge_quality: string;
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
      resegmentation_transparency_label: string;
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

// REIT Management Credibility Analysis schema
export interface REITManagementCredibilityAnalysis {
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
      change_in_tone_label: string;
      notes: string;
    };
    disclosure_hygiene: {
      nareit_ffo_definition_clarity: string;
      affo_definition_stability: string;
      reconciliation_quality: string;
      same_store_cohort_integrity: string;
      impairment_restructure_clarity: string;
      restatement_or_weakness_mentions: string;
      segment_bridge_quality: string;
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
      resegmentation_transparency_label: string;
      same_store_definition_changes_label: string;
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
      cadence_label: string;
      change_communication_label: string;
      coverage_context_label: string;
      notes: string;
    };
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

// Backward compatibility alias - defaults to REIT version for existing code
export type ManagementCredibilityAnalysis = REITManagementCredibilityAnalysis;

// Predictive Inference Analysis schema
export interface PredictiveInferenceAnalysis {
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
      growth: string;
      margin: string;
      cash_generation: string;
      risk_level: string;
    };
    recent_inflections: string[];
  };
  scenarios: Array<{
    name: string;
    outcomes: {
      topline: string;
      margin: string;
      cash_generation: string;
      capex_intensity: string;
      leverage: string;
      diversification: string;
      execution_load: string;
      risk_level: string;
      dividend_outlook: string;
    };
    coarse_numeric_notes: {
      yoy_growth_range_pct: string | null;
      margin_change_bps: string | null;
    };
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
  dividend_forward_analysis: {
    applies: boolean;
    base_outlook: string;
    sustainability_drivers: {
      fcf_trajectory: string;
      payout_pressure: string;
      capital_allocation_priority: string;
    };
    scenario_differentiation: {
      upside_dividend_case: string | null;
      downside_dividend_risk: string | null;
    };
    policy_inflection_signals: string[];
    management_signaling: {
      commitment_strength: string;
      recent_messaging_tone: string;
    };
    notes: string | null;
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
}

// REIT Predictive Inference Analysis schema
export interface REITPredictiveInferenceAnalysis {
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
      ssnoi: string;
      occupancy: string;
      leasing_spreads: string;
      affo: string;
      risk_level: string;
    };
    recent_inflections: string[];
  };
  scenarios: Array<{
    name: string;
    outcomes: {
      ssnoi: string;
      occupancy: string;
      leasing_spreads: string;
      affo: string;
      distribution_trajectory: string;
      coverage_direction: string;
      development_pace: string;
      external_growth: string;
      leverage: string;
      liquidity_refi: string;
      rate_sensitivity: string;
      releasing_risk: string;
      supply_pressure: string;
    };
    coarse_numeric_notes: {
      ssnoi_range_pct: string | null;
      leasing_spread_range_pct: string | null;
      affo_change_direction: string | null;
    };
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
  distribution_forward_analysis: {
    applies: boolean;
    base_outlook: string;
    sustainability_drivers: {
      affo_trajectory: string;
      coverage_trend: string;
      taxable_income_alignment: string;
      capital_allocation_priority: string;
    };
    reit_specific_factors: {
      distribution_source_mix: string;
      tax_distribution_pressure: string;
      special_distribution_risk: string;
      payout_ratio_sustainability: string;
    };
    scenario_differentiation: {
      upside_distribution_case: string | null;
      downside_distribution_risk: string | null;
    };
    policy_inflection_signals: string[];
    management_signaling: {
      distribution_commitment_strength: string;
      recent_messaging_tone: string;
      coverage_target_guidance: string | null;
    };
    reit_distribution_mechanics: {
      typical_payout_timing: string;
      historical_volatility: string;
      roc_component_trend: string;
    };
    notes: string | null;
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

// REIT Business Thesis Analysis schema
export interface REITBusinessThesisAnalysis {
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
  reit_thesis: {
    thesis_statement: string;
    portfolio_engine: {
      noi_drivers: string[];
      constraints: string[];
    };
    value_creation_drivers: string[];
    fragilities: string[];
    capital_allocation_model: {
      development_discipline: string;
      acquisition_selectivity: string;
      capital_recycling: string;
      distribution_sustainability: string;
      notes: string;
    };
  };
  viability_assessment: {
    tier: string;
    subscores: {
      portfolio_durability: number;
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

// Business Thesis Analysis schema
export interface BusinessThesisAnalysis {
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
  business_thesis: {
    thesis_statement: string;
    operating_model: {
      strengths: string[];
      constraints: string[];
    };
    value_creation_drivers: string[];
    fragilities: string[];
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
      durability: number;
      execution_quality: number;
      financial_resilience: number;
      risk_balance: number;
      governance_quality: number;
    };
    weights: number[];
    composite: number;
    rationale: string;
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
  one_liner: string;
  synopsis: string;
  disclaimer: string;
  version: string;
}

/**
 * Parse a text section into structured content
 */
function parseSection(content: string, title: string): ParsedSection {
  if (!content) {
    return { title, content: 'No content available' };
  }

  try {
    // Try to parse as JSON first (in case it's structured)
    const parsed = JSON.parse(content);
    if (typeof parsed === 'object') {
      return {
        title,
        content: parsed.content || generateSummaryFromStructured(parsed),
        structured_data: parsed,
        subsections: parsed.subsections || []
      };
    }
  } catch {
    // If not JSON, treat as plain text
  }

  // Handle plain text content
  return {
    title,
    content: content.trim()
  };
}

/**
 * Generate a readable summary from structured JSON data
 */
function generateSummaryFromStructured(data: unknown): string {
  if (!data || typeof data !== 'object') {
    return 'Structured data available';
  }

  // Type guard for object with properties
  const dataObj = data as Record<string, unknown>;

  // Handle GeneralEquityAnalysis schema (multi_year_analysis)
  if (dataObj.company && dataObj.window && dataObj.semantic_themes && dataObj.grading) {
    const analysis = data as GeneralEquityAnalysis;
    return `Analysis of ${analysis.company} covering ${analysis.window.num_years} years (FY${analysis.window.start_fy}-${analysis.window.end_fy}). 
    
Key Themes:
• Growth: ${analysis.semantic_themes.growth_trajectory.label} - ${analysis.semantic_themes.growth_trajectory.rationale}
• Margins: ${analysis.semantic_themes.margin_trend.label} - ${analysis.semantic_themes.margin_trend.rationale}  
• Cash Conversion: ${analysis.semantic_themes.cash_conversion.label} - ${analysis.semantic_themes.cash_conversion.rationale}

Overall Grade: ${analysis.grading.letter} (Composite Score: ${analysis.scores.composite_score.toFixed(1)})

${analysis.ui_summaries.synopsis}`;
  }

  // Handle ManagementCredibilityAnalysis schema (management_credibility) - both General and REIT versions
  if (dataObj.company && dataObj.window && dataObj.credibility_assessment && dataObj.scores) {
    const analysis = data as GeneralManagementCredibilityAnalysis | REITManagementCredibilityAnalysis;
    return `Management credibility assessment of ${analysis.company} covering ${analysis.window.num_years} years (FY${analysis.window.start_fy}-${analysis.window.end_fy}).

Credibility Tier: ${analysis.scores.credibility_tier}
Composite Score: ${analysis.scores.composite_score.toFixed(1)}/10

Key Assessments:
• Tone Profile: ${analysis.credibility_assessment.tone_profile.tone_balance_label}
• Follow-through: ${analysis.credibility_assessment.commitment_followthrough.length} commitments tracked
• Red Flags: ${analysis.credibility_assessment.red_flags.length} identified
• Green Flags: ${analysis.credibility_assessment.green_flags.length} identified

${analysis.ui_summaries.synopsis}`;
  }

  // Handle PredictiveInferenceAnalysis schema (predictive_inference)
  if (dataObj.company && dataObj.window && dataObj.scenarios && dataObj.base_state) {
    const analysis = data as PredictiveInferenceAnalysis;
    const baseScenario = analysis.scenarios.find(s => s.name === 'Base');
    return `Predictive outlook for ${analysis.company} covering ${analysis.window.num_years} years (FY${analysis.window.start_fy}-${analysis.window.end_fy}).

Horizon: ${analysis.horizon_selection.length} ${analysis.horizon_selection.type}
Base Case Confidence: ${baseScenario ? (baseScenario.confidence * 100).toFixed(0) + '%' : 'N/A'}

Current State:
• Growth: ${analysis.base_state.starting_point.growth}
• Margins: ${analysis.base_state.starting_point.margin}  
• Cash Generation: ${analysis.base_state.starting_point.cash_generation}
• Risk Level: ${analysis.base_state.starting_point.risk_level}

${analysis.ui_summaries.synopsis}`;
  }

  // Handle BusinessThesisAnalysis schema (business_assessment)
  if (dataObj.company && dataObj.window && dataObj.business_thesis && dataObj.viability_assessment) {
    const analysis = data as BusinessThesisAnalysis;
    return `Business thesis synthesis for ${analysis.company} covering ${analysis.window.num_years} years (FY${analysis.window.start_fy}-${analysis.window.end_fy}).

Viability Tier: ${analysis.viability_assessment.tier}
Composite Score: ${analysis.viability_assessment.composite.toFixed(1)}/10

Thesis: ${analysis.business_thesis.thesis_statement}

Structural Position:
• Moat: ${analysis.business_thesis.structural_position.moat_label}
• Switching Costs: ${analysis.business_thesis.structural_position.switching_costs}
• Regulatory Posture: ${analysis.business_thesis.structural_position.regulatory_posture}

${analysis.synopsis}`;
  }

  // Fallback for other structured data
  return 'Structured analysis data available';
}

/**
 * Parse General (non-REIT, non-MLP) company reports
 */
export function parseGeneralReport(report: BaseReportData): ParsedReport {
  return {
    ticker: report.ticker,
    years_range: report.years_range,
    classification: 'general',
    sections: {
      multi_year_analysis: parseSection(report.multi_year_analysis, 'Multi-Year Analysis'),
      management_credibility: parseSection(report.management_credibility, 'Management Credibility Assessment'),
      predictive_inference: parseSection(report.predictive_inference, 'Predictive Inference'),
      final_thesis: parseSection(report.business_assessment, 'Investment Thesis')
    },
    metadata: {
      years_used: report.years_used,
      analysis_years: report.analysis_years,
      model_used: report.model_used,
      generated_at: report.generated_at,
      is_free: report.is_free,
      has_access: report.has_access
    }
  };
}

/**
 * Parse REIT-specific reports with real estate focus
 */
export function parseReitReport(report: BaseReportData): ParsedReport {
  return {
    ticker: report.ticker,
    years_range: report.years_range,
    classification: 'reit',
    sections: {
      multi_year_analysis: parseSection(report.multi_year_analysis, 'Multi-Year REIT Performance Analysis'),
      management_credibility: parseSection(report.management_credibility, 'Management & Capital Allocation Assessment'),
      predictive_inference: parseSection(report.predictive_inference, 'Real Estate Market Outlook & REIT Positioning'),
      final_thesis: parseSection(report.business_assessment, 'REIT Investment Thesis')
    },
    metadata: {
      years_used: report.years_used,
      analysis_years: report.analysis_years,
      model_used: report.model_used,
      generated_at: report.generated_at,
      is_free: report.is_free,
      has_access: report.has_access
    }
  };
}

/**
 * Parse MLP-specific reports with energy/infrastructure focus
 */
export function parseMlpReport(report: BaseReportData): ParsedReport {
  return {
    ticker: report.ticker,
    years_range: report.years_range,
    classification: 'mlp',
    sections: {
      multi_year_analysis: parseSection(report.multi_year_analysis, 'Multi-Year MLP Distribution & Performance Analysis'),
      management_credibility: parseSection(report.management_credibility, 'Management & Distribution Coverage Assessment'),
      predictive_inference: parseSection(report.predictive_inference, 'Energy Infrastructure Outlook & MLP Positioning'),
      final_thesis: parseSection(report.business_assessment, 'MLP Investment Thesis')
    },
    metadata: {
      years_used: report.years_used,
      analysis_years: report.analysis_years,
      model_used: report.model_used,
      generated_at: report.generated_at,
      is_free: report.is_free,
      has_access: report.has_access
    }
  };
}

/**
 * Main parser function that routes to appropriate schema parser
 */
export function parseReport(report: BaseReportData): ParsedReport {
  switch (report.classification) {
    case 'reit':
      return parseReitReport(report);
    case 'mlp':
      return parseMlpReport(report);
    case 'general':
    default:
      return parseGeneralReport(report);
  }
}

/**
 * Get display name for report classification
 */
export function getClassificationDisplayName(classification: string): string {
  switch (classification) {
    case 'reit':
      return 'REIT';
    case 'mlp':
      return 'MLP';
    case 'general':
    default:
      return 'General';
  }
}

/**
 * Get classification color for UI display
 */
// MLP Multi-Year Analysis Interface
export interface MLPMultiYearAnalysis {
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
    notes: string | null;
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

export function getClassificationColor(classification: string): string {
  switch (classification) {
    case 'reit':
      return 'bg-blue-100 text-blue-800';
    case 'mlp':
      return 'bg-green-100 text-green-800';
    case 'general':
    default:
      return 'bg-gray-100 text-gray-800';
  }
}
