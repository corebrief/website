import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary !leading-tight mb-6 md:mb-8 animate-in fade-in duration-700">
            Multi-Year Equity Intelligence,
            <br />
            Delivered in Hours
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-8 md:mb-12 leading-relaxed px-2 animate-in fade-in duration-700 delay-200">
            CoreBrief’s parsing system and AI agent fleet turns five years of 10-K filings into structured dashboards. Rigorous, detailed research in hours, not weeks.
          </p>

          <Button size="lg" className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 mb-12 md:mb-24 animate-in fade-in duration-700 delay-300 hover:scale-105 transition-all duration-200" asChild>
            <Link href="/sign-up">Sign Up for Early Access</Link>
          </Button>
        </div>
      </div>

      {/* Problem Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-muted/30 border-y">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 md:mb-8 animate-in slide-in-from-bottom duration-600">
            The Fundamental Analysis Dilemma
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-8 md:mb-16 leading-relaxed px-2 animate-in slide-in-from-bottom duration-600 delay-100">
            Family offices, RIAs, and independent professionals need deep, narrative-driven insights, but are forced to choose between slow, costly reports and time-intensive manual analysis.
          </p>

          {/* Problem Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm animate-in slide-in-from-left duration-600 delay-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:scale-110 mx-auto">
                <span className="text-red-600 font-bold text-base md:text-lg">$</span>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primary">Traditional Research Reporting</h3>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-muted-foreground">
                <li>• Costs thousands per report</li>
                <li>• Takes weeks to commission</li>
                <li>• Often omits the multi-year narrative</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm animate-in slide-in-from-right duration-600 delay-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:scale-110 mx-auto">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primary">DIY Analysis</h3>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-muted-foreground">
                <li>• Requires 30+ hours per issuer</li>
                <li>• Inconsistent methodology across businesses</li>
                <li>• Difficult to scale across companies</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

            {/* Comparison: Not Just Uploading to an LLM */}
      <div className="w-full px-4 py-8 md:py-16 bg-muted/30 border-y">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6 text-center">
          Beyond Generic AI File Upload Tools
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8 md:mb-12 leading-relaxed px-2">
            Generic &quot;upload to an LLM&quot; tools hit token limits and give inconsistent results. 
            CoreBrief processes complete filings into structured, comparable research—with niche specialties in dividend & distribution-paying companies.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Generic File-Chat */}
            <div className="bg-card border-2 border-red-100 rounded-lg p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="font-semibold text-base md:text-lg text-primary">Standard AI File Upload</h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Partial filing coverage (lossy ingestion, token limits)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Inconsistent outputs by company</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>Ad-hoc chat responses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">✗</span>
                  <span>No structured export</span>
                </li>
              </ul>
            </div>

            {/* CoreBrief's AI System*/}
            <div className="bg-card border-2 border-green-100 rounded-lg p-4 md:p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3 md:mb-4">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-base md:text-lg text-primary">CoreBrief&apos;s Structured AI Workflow</h3>
              </div>
              <ul className="space-y-2 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Complete 10-K processing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Dividend/distribution-focused metrics (AFFO, DCF, payout ratios)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Multi-year comparable dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 mt-1">✓</span>
                  <span>Structured JSON</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
      {/* Agential AI Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-primary/5">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6 animate-in fade-in duration-600">
            Domain-Aware Prompt Routing, Multi-Year Context
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 animate-in fade-in duration-600 delay-100">
            CoreBrief’s AI system reads 5 years of 10-K filings per issuer and converts them into structured, multi-year signals and dashboards.
          </p>

          <div className="mt-6 md:mt-8 max-w-4xl mx-auto animate-in fade-in duration-600 delay-300">
            <div className="text-center mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-primary mb-2">Specialized Agents by Asset Class</h3>
              <p className="text-sm text-muted-foreground">Domain-specific schemas for consistent, multi-year analysis.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {/* General Equities */}
              <div className="bg-card border rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:bg-green-100 group-hover:scale-105">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="font-medium text-primary text-sm mb-2">General Equities</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• Payout coverage</div>
                  <div>• Capital allocation</div>
                </div>
              </div>

              {/* REITs */}
              <div className="bg-card border rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:bg-blue-100 group-hover:scale-105">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h4 className="font-medium text-primary text-sm mb-2">REITs</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• AFFO/FFO analysis</div>
                  <div>• Lease/tenant risks</div>
                </div>
              </div>

              {/* MLPs */}
              <div className="bg-card border rounded-lg p-4 text-center hover:shadow-md transition-all duration-200 group">
                <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3 transition-all duration-200 group-hover:bg-purple-100 group-hover:scale-105">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-medium text-primary text-sm mb-2">MLPs</h4>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>• DCF coverage</div>
                  <div>• Contract/throughput quality</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="w-full px-4 py-8 md:py-16 bg-background border-y border-primary/10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div className="bg-card border border-blue-500/20 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom duration-600 delay-100 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:bg-blue-500/20 group-hover:scale-110">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-blue-600">Multi-Year Trend Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Distills five filing years into comprehensive dashboards:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Growth & margin trajectory
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Cash conversion & leverage
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Payout coverage (AFFO/FFO, SSNOI, DCF)
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-blue-500 rounded-full flex-shrink-0"></div>
                  Cyclical vs. structural change patterns
                </li>
              </ul>
            </div>

            <div className="bg-card border border-emerald-500/20 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom duration-600 delay-200 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:bg-emerald-500/20 group-hover:scale-110">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-emerald-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-emerald-600">Management Credibility</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Backward-looking credibility assessment across key dimensions:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  Promise–follow-through tracking
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  Disclosure hygiene & risk candor
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  Guidance consistency patterns
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></div>
                  Capital allocation discipline
                </li>
              </ul>
            </div>

            <div className="bg-card border border-amber-500/20 rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom duration-600 delay-300 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:bg-amber-500/20 group-hover:scale-110">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-amber-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-amber-600">Forward-Looking Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                Calibrated Base/Up/Down scenarios with detailed outcome modeling:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0"></div>
                  Growth, margin & cash projections
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0"></div>
                  Capex, leverage & diversification paths
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0"></div>
                  Dividend/distribution stance scenarios
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-amber-500 rounded-full flex-shrink-0"></div>
                  Falsifiers & leading indicators
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis / Output */}
      <div className="w-full px-4 py-8 md:py-16 bg-background">
        <div className="mx-auto max-w-4xl">
          <div className="bg-primary rounded-lg p-6 md:p-8 shadow-lg animate-in fade-in duration-600">
            {/* Data Ingestion Layer */}
            <div className="mb-6 md:mb-8">
              <div className="text-center mb-4">
                <div className="text-xs md:text-sm text-primary-foreground/70 mb-2">Data Ingestion</div>
                <div className="text-sm md:text-base font-medium text-primary-foreground">5 Years × Complete 10-K Filings</div>
              </div>
              
              {/* Visual representation of massive data */}
              <div className="relative bg-primary-foreground/5 rounded-lg p-4 mb-4 overflow-hidden">
                <div className="grid grid-cols-6 md:grid-cols-12 gap-1 opacity-60">
                  {Array.from({length: 96}).map((_, i) => (
                    <div key={i} className={`h-1 rounded-full bg-primary-foreground/20 ${i % 7 === 0 ? 'bg-primary-foreground/40' : ''} ${i % 13 === 0 ? 'h-2' : ''}`}></div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-foreground/10 via-transparent to-primary-foreground/10 pointer-events-none"></div>
                <div className="absolute top-2 left-2 right-2 flex justify-between text-xs text-primary-foreground/50">
                  <span>2019</span>
                  <span>2020</span>
                  <span>2021</span>
                  <span>2022</span>
                  <span>2023</span>
                </div>
              </div>

              {/* Processing indicator */}
              <div className="flex justify-center items-center gap-2 text-xs text-primary-foreground/60">
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-primary-foreground/40 rounded-full animate-pulse"></div>
                  <div className="w-1 h-1 bg-primary-foreground/40 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                  <div className="w-1 h-1 bg-primary-foreground/40 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                </div>
                <span>Processing complete filings</span>
                <div className="flex gap-1">
                  <div className="w-1 h-1 bg-primary-foreground/40 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                  <div className="w-1 h-1 bg-primary-foreground/40 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                  <div className="w-1 h-1 bg-primary-foreground/40 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
            </div>

            {/* Arrow Down to Analysis */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-3 md:h-4 bg-primary-foreground/30"></div>
                <svg className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className="w-px h-3 md:h-4 bg-primary-foreground/30"></div>
              </div>
            </div>

            {/* Input Sources */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-4 md:mb-6">
              <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 text-sm md:text-sm text-blue-100">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                Multi-Year Trends
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-1 text-sm md:text-sm text-emerald-100">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                Management Credibility
              </div>
              <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1 text-sm md:text-sm text-amber-100">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                Forward-Looking Analysis
              </div>
            </div>

            {/* Arrow Down */}
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="flex flex-col items-center gap-1">
                <div className="w-px h-4 md:h-6 bg-primary-foreground/30"></div>
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                <div className="w-px h-4 md:h-6 bg-primary-foreground/30"></div>
              </div>
            </div>

            {/* Synthesis Output */}
            <div className="text-center">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary-foreground">
                Multi-Agent Business Thesis Synthesis
              </h3>
              <p className="text-primary-foreground/90 text-base md:text-lg leading-relaxed mb-4 md:mb-6 px-2">
                A synthesis agent reconciles findings from all three analyses into executive-level business intelligence with quantified confidence, scenario bridges, and operational watchlists.
              </p>
              
              {/* Output Features */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mt-6">
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-3 text-center">
                  <div className="text-sm md:text-sm font-medium text-primary-foreground mb-1">Viability Assessment</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">Quantified scoring</div>
                </div>
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-3 text-center">
                  <div className="text-sm md:text-sm font-medium text-primary-foreground mb-1">Scenario Bridges</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">Base/Up/Down cases</div>
                </div>
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-3 text-center">
                  <div className="text-sm md:text-sm font-medium text-primary-foreground mb-1">Operational Watchlist</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">Leading indicators</div>
                </div>
                <div className="bg-primary-foreground/10 border border-primary-foreground/20 rounded-lg p-3 text-center">
                  <div className="text-sm md:text-sm font-medium text-primary-foreground mb-1">Consensus Mapping</div>
                  <div className="text-xs md:text-sm text-primary-foreground/80">Agreement & tensions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Purpose-Built Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-muted/20">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6 animate-in slide-in-from-bottom duration-600">
            Purpose-Built for Your Asset Class
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8 md:mb-16 px-2 animate-in slide-in-from-bottom duration-600 delay-100">
            Domain-tuned agents and schemas for dividend & distribution-paying companies, including general equities, REITs, and MLPs.
          </p>

          {/* Asset Class Options */}
          <div className="space-y-6 md:space-y-8 w-full max-w-4xl">
            {/* CoreBrief Equities */}
            <div className="bg-card border rounded-lg p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left duration-600 delay-200 group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-green-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 group-hover:bg-green-100 group-hover:scale-105">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-green-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">CoreBrief Equities</h3>
                <p className="text-muted-foreground mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                  Evaluates payout durability, capital allocation discipline, disclosure consistency, and multi-cycle downside patterns.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-green-200">Payout Coverage</span>
                  <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-green-200">Capital Allocation</span>
                  <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-green-200">Downside Patterns</span>
                  <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-green-200">Disclosure Quality</span>
                </div>
              </div>
            </div>

            {/* CoreBrief REITs */}
            <div className="bg-card border rounded-lg p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-right duration-600 delay-300 group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 group-hover:bg-blue-100 group-hover:scale-105">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">CoreBrief REITs</h3>
                <p className="text-muted-foreground mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                  Maps AFFO/FFO coverage, lease profile (WALT & rollover), tenant concentration, SSNOI trend, and rate/refinancing sensitivity. Built for property-level nuance.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-blue-200">AFFO/FFO Coverage</span>
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-blue-200">Lease Profile (WALT)</span>
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-blue-200">SSNOI Trend</span>
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-blue-200">Tenant Mix</span>
                </div>
              </div>
            </div>

            {/* CoreBrief MLPs */}
            <div className="bg-card border rounded-lg p-4 md:p-6 flex flex-col sm:flex-row gap-4 md:gap-6 items-start shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-left duration-600 delay-400 group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm transition-all duration-200 group-hover:bg-purple-100 group-hover:scale-105">
                <svg className="w-6 h-6 md:w-8 md:h-8 text-purple-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-primary">CoreBrief MLPs</h3>
                <p className="text-muted-foreground mb-3 md:mb-4 leading-relaxed text-sm md:text-base">
                  Assesses DCF coverage, fee-based exposure, contract quality (MVC & tenor), basin momentum, and leverage/liquidity. Tailored to midstream structures.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-purple-200">DCF Coverage</span>
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-purple-200">Fee-Based Mix</span>
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-purple-200">Contract Quality (MVC)</span>
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-purple-200">Leverage & Liquidity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-primary">
        <div className="mx-auto max-w-5xl animate-in fade-in duration-600">
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 text-primary-foreground text-xs md:text-sm px-3 py-1 rounded-full mb-4">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
              Limited Early Access • Discount Pricing Ending Soon
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4 md:mb-6 text-center">
            Join the Early Access Waitlist
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto text-center mb-8 md:mb-12 leading-relaxed px-2">
            Join family offices, RIAs, and independent professionals on our waitlist for priority access to CoreBrief&apos;s professional research platform.
          </p>

          {/* Waitlist Benefits */}
          <div className="bg-primary-foreground/10 rounded-lg p-4 md:p-8 mb-6 md:mb-8">
            <h3 className="text-lg md:text-2xl font-semibold text-primary-foreground mb-4 md:mb-6 text-center">
              Early Access Benefits
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <div className="flex items-start gap-3 animate-in slide-in-from-left duration-600 delay-100">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-200 hover:bg-primary-foreground/30">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-1 text-sm md:text-base">Priority Access</h4>
                  <p className="text-primary-foreground/80 text-xs md:text-sm">First access when platform launches</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 animate-in slide-in-from-right duration-600 delay-200">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-200 hover:bg-primary-foreground/30">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-1 text-sm md:text-base">Discount Pricing</h4>
                  <p className="text-primary-foreground/80 text-xs md:text-sm">Exclusive pricing for early adopters</p>
                </div>
              </div>

              <div className="flex items-start gap-3 animate-in slide-in-from-left duration-600 delay-300">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-200 hover:bg-primary-foreground/30">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-1 text-sm md:text-base">Feature Input</h4>
                  <p className="text-primary-foreground/80 text-xs md:text-sm">Help shape the platform features</p>
                </div>
              </div>

              <div className="flex items-start gap-3 animate-in slide-in-from-right duration-600 delay-400">
                <div className="w-5 h-5 md:w-6 md:h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-200 hover:bg-primary-foreground/30">
                  <svg className="w-3 h-3 md:w-4 md:h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-primary-foreground mb-1 text-sm md:text-base">Direct Support</h4>
                  <p className="text-primary-foreground/80 text-xs md:text-sm">Priority onboarding and support</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-base md:text-lg px-6 md:px-8 py-4 md:py-6 mb-3 md:mb-4 hover:scale-105 transition-all duration-200 w-full sm:w-auto"
                asChild
              >
                <Link href="/sign-up">
                  Secure Your Early Access Spot
                </Link>
              </Button>
              <p className="text-primary-foreground/70 text-xs md:text-sm">
                Only 3 minutes to signup • Limited spots remaining
              </p>
            </div>
          </div>

          {/* Alternative Sign In */}
          <div className="text-center">
            <p className="text-primary-foreground/70 mb-3 md:mb-4 text-sm md:text-base">Already have an account?</p>
            <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all duration-200 text-sm md:text-base px-4 md:px-6 py-3 md:py-4" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <footer className="w-full py-6 md:py-8 px-4 bg-muted/60 border-t">
        <div className="max-w-4xl mx-auto text-center text-xs text-muted-foreground space-y-3 md:space-y-4">
          <div className="leading-relaxed">
            CoreBrief does not provide personalized investment advice and is not a registered investment advisor. All content is for informational purposes only. Assessments are framework-based and do not constitute financial advice.<br />
            AI methodologies are continually evaluated for accuracy and limitations. CoreBrief can make mistakes. Always verify information independently and consult qualified professionals before making investment decisions.<br />
            CoreBrief ratings are proprietary research signals and do not constitute investment recommendations.
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4 text-xs">
            <Link href="/privacy" className="hover:text-primary transition-colors duration-200">Privacy Policy</Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-primary transition-colors duration-200">Terms of Service</Link>
            <span className="hidden sm:inline">•</span>
            <span>© {new Date().getFullYear()} CoreBrief. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
