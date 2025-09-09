import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>
        
        <p className="text-muted-foreground mb-8">
          <strong>Effective Date:</strong> September 8, 2025<br />
          <strong>Last Updated:</strong> September 8, 2025
        </p>

        <div className="space-y-12 text-sm leading-relaxed">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of CoreBrief&apos;s equity analysis services and platform. 
              By accessing or using our services, you agree to be bound by these Terms and our{" "}
              <Link href="/privacy" className="text-primary underline hover:no-underline">Privacy Policy</Link>.
            </p>
            <p className="mt-4">
              If you do not agree to these Terms, please do not use our services.
            </p>
          </section>

          {/* Definitions Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Definitions</h2>
            <p>
              <strong>&ldquo;Services&rdquo;</strong> refers to CoreBrief&apos;s equity research tools, content, and platform, including all analysis, reports, and related features.
            </p>
            <p className="mt-2">
              <strong>&ldquo;User&rdquo;</strong> means any person or entity accessing or using the Services, including authorized representatives of institutional clients and independent professionals conducting research.
            </p>
            <p className="mt-2">
              <strong>&ldquo;AI&rdquo;</strong> refers to artificial intelligence technologies, including machine learning algorithms, large language models, and automated analysis systems used in our research and report generation processes.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Service Description</h2>
            <p>
              CoreBrief provides institutional-quality equity analysis and research services designed for family offices, 
              registered investment advisors (RIAs), and independent professionals. Our services include:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Multi-agent AI-powered equity analysis</li>
              <li>Investment research reports and summaries</li>
              <li>Historical trend analysis and forward-looking scenarios</li>
              <li>Research frameworks and analysis tools</li>
            </ul>
            <p className="mt-4">
              <strong>Important:</strong> Our services are for informational purposes only and do not constitute investment advice, 
              recommendations, or solicitations to buy or sell securities.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Investment Disclaimers</h2>
            

            <ul className="space-y-4">
              <li>
                <strong className="font-bold">Not Investment Advice:</strong> CoreBrief does not provide personalized investment advice and is not 
                a registered investment advisor. All content is for informational purposes only.
              </li>
              <li>
                <strong className="font-bold">No Guarantees:</strong> Research signals assessments are proprietary 
                frameworks and do not constitute investment recommendations or guarantees of performance.
              </li>
              <li>
                <strong className="font-bold">All investments carry risk</strong> of loss. Past performance does not guarantee 
                future results. You should consult with qualified financial professionals before making investment decisions.
              </li>
              <li>
                <strong>AI Limitations:</strong> Our AI methodologies are continually evaluated for accuracy and limitations 
                but may contain errors or omissions. CoreBrief can make mistakes. Always verify information independently and consult qualified professionals before making investment decisions.
              </li>
            </ul>
          </section>

          {/* User Obligations */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">5. User Obligations</h2>
            <p>By using our services, you agree to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Provide accurate and complete information when registering</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use our services only for lawful business purposes</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not share, redistribute, or resell our research content without permission</li>
              <li>Not attempt to reverse engineer or compromise our systems</li>
            </ul>
          </section>

          {/* Authorized Use - New Section 4.1 */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">5.1 Authorized Use</h2>
            <p>
              You represent and warrant that you are authorized to access the Services on behalf of the entity you identify during registration, 
              and that such use complies with all applicable legal, regulatory, and fiduciary obligations.
            </p>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Intellectual Property</h2>
            <p>
              All content, research, analysis, software, and materials provided through our services are protected by 
              intellectual property rights and remain the property of CoreBrief or our licensors.
            </p>
            <p className="mt-4">
              You are granted a limited, non-exclusive license to use our services for your internal business purposes. 
              This license does not permit redistribution, modification, or commercial use of our content.
            </p>
          </section>

          {/* Payment Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Payment and Report Purchases</h2>
            <p>CoreBrief operates on a pay-per-report model. By purchasing reports, you agree to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Pay all applicable fees for individual reports at the time of purchase</li>
              <li>Provide accurate billing information for each transaction</li>
              <li>Understand that each report purchase is a separate transaction</li>
              <li>Accept that payment is required before gaining access to reports</li>
            </ul>
            <p className="mt-4">
              <strong>Report Delivery:</strong> Reports are delivered digitally upon successful payment processing. 
              You will receive access to your purchased reports through your account dashboard.
            </p>
            <p className="mt-4">
              Refunds are processed in accordance with our{" "}
              <Link href="/refund-policy" className="text-primary underline hover:no-underline">Refund Policy</Link>.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, COREBRIEF SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, 
              INVESTMENT LOSSES, OR DAMAGES ARISING FROM AI-GENERATED CONTENT ERRORS, LIMITATIONS, OR OMISSIONS.
            </p>
            <p className="mt-4">
              <strong>No Warranties:</strong> Our reports and services are provided "AS-IS" without warranties of any kind, 
              including but not limited to warranties of merchantability, fitness for a particular purpose, or accuracy. 
              We do not warrant that our AI analysis will meet your specific research needs or be error-free.
            </p>
            <p className="mt-4">
              Our total liability for any claims arising from these Terms or your use of our services shall not exceed 
              the total amount you paid for reports in the twelve months preceding the claim, or $1,000, whichever is greater.
            </p>
          </section>

          {/* Indemnification */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless CoreBrief from any claims, damages, losses, or expenses arising 
              from your use of our services, violation of these Terms, or infringement of any third-party rights.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Termination</h2>
            
            <h3 className="text-lg font-semibold mb-3">10.1 Termination Rights</h3>
            <p>
              We may terminate or suspend your account access for: (a) material breach of these Terms, 
              (b) fraudulent activity or misuse of our services, (c) violation of applicable laws or regulations, 
              (d) unauthorized sharing or redistribution of reports, or (e) non-payment of fees. 
              You may terminate your account at any time via the privacy page in your account settings.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-6">10.2 Asset Ownership vs. Service Access</h3>
            <p>
              Upon purchase, you own the JSON data files containing our research analysis, which is downloadable from your account dashboard. 
              Our dashboard interface is provided as a convenience service for accessing and viewing your purchased reports. Account termination 
              affects these differently:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Dashboard Access:</strong> Terminates immediately upon account suspension or termination</li>
              <li><strong>JSON Data Ownership:</strong> You retain ownership of all purchased and downloaded report data</li>
              <li><strong>Undownloaded Reports:</strong> Access to previously purchased but undownloaded reports available via grace period (see below)</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">10.3 Grace Period for Purchased Reports</h3>
            <p>
              If your account is terminated, you have <strong>30 days</strong> to request access to any purchased reports 
              that you have not yet downloaded. To request these reports, email{" "}
              <a href="mailto:help@corebrief.ai" className="text-primary underline hover:no-underline">help@corebrief.ai</a>{" "}
              with your account details and order information. We will provide the JSON data files for your purchased reports 
              via email or secure download link.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-6">10.4 Survival of Terms</h3>
            <p>
              Upon termination, provisions regarding intellectual property, liability, indemnification, and dispute resolution 
              will survive. Your ownership of purchased JSON data files remains unaffected by account termination.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">11. Changes to Terms</h2>
            <p>
              We may modify these Terms from time to time. We will notify you of material changes by email or through 
              our service. Your continued use of our services after changes become effective constitutes acceptance 
              of the revised Terms.
            </p>
          </section>

          {/* Governing Law and Arbitration */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">12. Governing Law and Dispute Resolution</h2>
            
            <h3 className="text-lg font-semibold mb-3">12.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-6">12.2 Mandatory Arbitration</h3>
            <p>
              <strong>PLEASE READ THIS SECTION CAREFULLY.</strong> Any dispute, claim, or controversy arising out of or relating to these Terms, 
              your use of our services, or your relationship with CoreBrief shall be resolved through binding arbitration rather than in court, 
              except as provided below.
            </p>
            <p className="mt-4">
              Arbitration shall be conducted by a single arbitrator through the American Arbitration Association (AAA) under its 
              Commercial Arbitration Rules. The arbitration shall take place in San Diego County, California, or may be conducted 
              remotely by mutual agreement. The arbitrator's decision shall be final and binding.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-6">12.3 Exceptions to Arbitration</h3>
            <p>
              Either party may seek injunctive relief in court for claims involving intellectual property infringement, 
              unauthorized access to our systems, or violations of our intellectual property rights.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-6">12.4 Class Action Waiver</h3>
            <p>
              You agree that any arbitration or legal proceeding shall be conducted on an individual basis only and not as part of a 
              class, collective, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration.
            </p>
          </section>


          {/* Force Majeure - New Section 13 */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">13. Force Majeure</h2>
            <p>
              CoreBrief shall not be liable for any failure or delay in performance due to causes beyond its reasonable control, 
              including but not limited to natural disasters, internet disruptions, governmental actions, or third-party service failures.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">14. Contact Information</h2>
            <p>For questions about these Terms, please contact us:</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Legal Questions:</strong> <a href="mailto:legal@corebrief.ai" className="text-primary hover:underline">legal@corebrief.ai</a></p>
              <p><strong>General Inquiries:</strong> <a href="mailto:info@corebrief.ai" className="text-primary hover:underline">info@corebrief.ai</a></p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Return to CoreBrief</Link> | {" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link> | {" "}
            <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>
          </p>
        </div>

      </div>
    </div>
  );
} 