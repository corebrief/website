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

// Management Credibility Analysis schema
export interface ManagementCredibilityAnalysis {
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
  ui_summaries: {
    one_liner: string;
    synopsis: string;
    bullet_highlights: string[];
    watch_items: string[];
    disclaimer: string;
  };
}

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

  // Handle ManagementCredibilityAnalysis schema (management_credibility)
  if (dataObj.company && dataObj.window && dataObj.credibility_assessment && dataObj.scores) {
    const analysis = data as ManagementCredibilityAnalysis;
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
