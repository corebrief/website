import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Hero Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-primary !leading-tight mb-6 md:mb-8 animate-in fade-in duration-700">
            Equity Research Modeled After Institutional Frameworks
            <br />
            Delivered in Hours
          </h1>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-8 md:mb-12 leading-relaxed px-2 animate-in fade-in duration-700 delay-200">
            Multi-agent AI system inspired by institutional research methods, providing analytical summaries for defensive, income-focused allocators in 24 hours instead of weeks
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
            The Defensive Investor&apos;s Challenge
          </h2>
          
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mb-8 md:mb-16 leading-relaxed px-2 animate-in slide-in-from-bottom duration-600 delay-100">
            Family offices and RIAs focused on income generation and downside protection need defensible investment analysis, but current solutions fall short
          </p>

          {/* Problem Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-4xl">
            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm animate-in slide-in-from-left duration-600 delay-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-red-50 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:scale-110">
                <span className="text-red-600 font-bold text-base md:text-lg">$</span>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primary">Wall Street Research</h3>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-muted-foreground">
                <li>• Costs over $5,000 per report</li>
                <li>• Takes weeks to deliver</li>
                <li>• Often lacks defensive perspective</li>
              </ul>
            </div>

            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm animate-in slide-in-from-right duration-600 delay-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 text-primary">DIY Analysis</h3>
              <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-muted-foreground">
                <li>• Lacks institutional depth</li>
                <li>• Takes over 30 hours per company</li>
                <li>• Inconsistent methodology</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Agent AI Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-primary/5">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 md:mb-6 animate-in fade-in duration-600">
            Multi-Agent AI Intelligence System
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-2 animate-in fade-in duration-600 delay-100">
            Three specialized AI agents analyze 5+ years of SEC filings to deliver analytical summaries for defensive, income-focused allocators.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto mt-3 md:mt-4 px-2 animate-in fade-in duration-600 delay-200">
            Reports are generated using AI tools and reviewed by qualified analysts for quality assurance. AI-driven analysis is subject to human validation and oversight.
          </p>
          
          <div className="bg-card border rounded-lg p-3 md:p-4 mt-6 md:mt-8 max-w-2xl mx-auto animate-in fade-in duration-600 delay-300">
            <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-primary">Built by research professionals</span> with PhD-level training, university faculty experience in AI and data science, and 10+ years of enterprise AI implementation
            </p>
          </div>
        </div>
      </div>

      {/* AI Features Grid */}
      <div className="w-full px-4 py-8 md:py-16 bg-background border-y border-primary/10">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full">
            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom duration-600 delay-100 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primary">Multi-Year Trend Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Historical patterns and business evolution analysis to identify long-term investment themes and cyclical risks
              </p>
            </div>

            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom duration-600 delay-200 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primary">Management Credibility</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Leadership quality assessment and execution track record evaluation for defensive investor confidence
              </p>
            </div>

            <div className="bg-card border rounded-lg p-4 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 animate-in slide-in-from-bottom duration-600 delay-300 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 md:mb-4 transition-all duration-200 group-hover:bg-primary/20 group-hover:scale-110">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-primary transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-base md:text-lg mb-2 md:mb-3 text-primary">Forward-Looking Analysis</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Forward scenarios and comprehensive risk assessments to help identify potential downside risks. All outputs are reviewed by analysts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Synthesis */}
      <div className="w-full px-4 py-8 md:py-16 bg-primary">
        <div className="mx-auto max-w-4xl">
          <div className="text-center animate-in fade-in duration-600">
            <h3 className="text-xl md:text-2xl font-semibold mb-3 md:mb-4 text-primary-foreground">Final Synthesis</h3>
            <p className="text-primary-foreground/90 text-base md:text-lg leading-relaxed mb-4 md:mb-6 px-2">
              Clear investment research, built to mirror the depth and structure of institutional reports, designed specifically for defensive, income-focused allocators
            </p>
            <p className="text-primary-foreground/70 text-xs md:text-sm max-w-2xl mx-auto px-2">
              Built by research professionals with PhD-level training, university faculty experience in AI and data science, and 10+ years of enterprise AI implementation
            </p>
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
            Specialized analysis frameworks tailored to defensive, income-focused institutional investment strategies
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
                  Dividend durability assessment, capital allocation quality evaluation, and multi-cycle downside risk research (proprietary research signal, not a guarantee)
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-green-200">Dividend Safety</span>
                  <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-green-200">Capital Allocation</span>
                  <span className="px-2 md:px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-green-200">Downside Protection</span>
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
                  AFFO coverage analysis, lease risk assessment, and tenant diversification evaluation with comprehensive safety indicators
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-blue-200">AFFO Coverage</span>
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-blue-200">Lease Risks</span>
                  <span className="px-2 md:px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-blue-200">Tenant Diversification</span>
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
                  DCF coverage evaluation, energy transition risk analysis, and infrastructure quality assessment for energy allocators
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-purple-200">DCF Coverage</span>
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-purple-200">Transition Risks</span>
                  <span className="px-2 md:px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs md:text-sm transition-all duration-200 hover:bg-purple-200">Infrastructure Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full px-4 py-8 md:py-16 bg-primary">
        <div className="mx-auto max-w-5xl animate-in fade-in duration-600">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground mb-4 md:mb-6 text-center">
            Join the Early Access Waitlist
          </h2>
          <p className="text-base md:text-lg text-primary-foreground/90 max-w-3xl mx-auto text-center mb-8 md:mb-12 leading-relaxed px-2">
            Join select family offices and RIAs on our exclusive waitlist for priority access to CoreBrief&apos;s institutional research platform
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
                  <h4 className="font-semibold text-primary-foreground mb-1 text-sm md:text-base">50% Discount</h4>
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
                  Join Early Access Waitlist
                </Link>
              </Button>
              <p className="text-primary-foreground/70 text-xs md:text-sm">
                Complete signup takes less than 3 minutes
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
            CoreBrief does not provide personalized investment advice and is not a registered investment advisor. All content is for informational purposes only. Suitability assessments are framework-based and do not constitute financial advice.<br />
            AI methodologies are continually evaluated for accuracy and limitations. All research is subject to human review.<br />
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
