import Link from "next/link";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>
        
        <p className="text-muted-foreground mb-8">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}<br />
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12 text-sm leading-relaxed">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) govern your use of CoreBrief&apos;s equity analysis services and platform. 
              By accessing or using our services, you agree to be bound by these Terms and our Privacy Policy.
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
              <strong>&ldquo;User&rdquo;</strong> means any person or entity accessing or using the Services, including authorized representatives of institutional clients.
            </p>
          </section>

          {/* Service Description */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Service Description</h2>
            <p>
              CoreBrief provides institutional-quality equity analysis and research services designed for family offices, 
              registered investment advisors (RIAs), and professional investors. Our services include:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Multi-agent AI-powered equity analysis</li>
              <li>Investment research reports and summaries</li>
              <li>Historical trend analysis and forward-looking scenarios</li>
              <li>Conservative suitability assessments</li>
            </ul>
            <p className="mt-4">
              <strong>Important:</strong> Our services are for informational purposes only and do not constitute investment advice, 
              recommendations, or solicitations to buy or sell securities.
            </p>
          </section>

          {/* Disclaimers */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Investment Disclaimers</h2>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
              <h3 className="font-semibold text-yellow-800">Important Investment Disclosures</h3>
            </div>

            <ul className="space-y-4">
              <li>
                <strong className="font-bold">Not Investment Advice:</strong> CoreBrief does not provide personalized investment advice and is not 
                a registered investment advisor. All content is for informational purposes only.
              </li>
              <li>
                <strong className="font-bold">No Guarantees:</strong> Investment research signals and suitability assessments are proprietary 
                frameworks and do not constitute investment recommendations or guarantees of performance.
              </li>
              <li>
                <strong className="font-bold">All investments carry risk</strong> of loss. Past performance does not guarantee 
                future results. You should consult with qualified financial professionals before making investment decisions.
              </li>
              <li>
                <strong>AI Limitations:</strong> Our AI methodologies are continually evaluated for accuracy and limitations. 
                All research is subject to human review but may contain errors or omissions.
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

          {/* Subscription Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Subscription and Payment</h2>
            <p>Access to certain features requires a paid subscription. By subscribing, you agree to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Pay all applicable fees as described in your subscription plan</li>
              <li>Automatic renewal unless cancelled in accordance with our cancellation policy</li>
              <li>Provide accurate billing information and update it as needed</li>
            </ul>
            <p className="mt-4">
              Refunds are processed in accordance with our{" "}
              <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>, 
              available through your account settings or upon request at{" "}
              <a href="mailto:legal@corebrief.ai" className="text-primary hover:underline">legal@corebrief.ai</a>.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, COREBRIEF SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
              SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR 
              INVESTMENT LOSSES ARISING FROM YOUR USE OF OUR SERVICES.
            </p>
            <p className="mt-4">
              Our total liability for any claims arising from these Terms or your use of our services shall not exceed 
              the amount you paid for our services in the twelve months preceding the claim.
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
            <p>
              We may terminate or suspend your access to our services at any time for violation of these Terms or for 
              any other reason. You may terminate your account at any time by contacting us.
            </p>
            <p className="mt-4">
              Upon termination, your right to use our services will cease immediately, but provisions regarding 
              intellectual property, liability, and indemnification will survive.
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

          {/* Governing Law and Jurisdiction */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">12. Governing Law and Jurisdiction</h2>
            <p>
              These Terms are governed by the laws of the State of California, United States, without regard to conflict of law principles.
            </p>
            <p className="mt-4">
              Any disputes arising out of or related to these Terms shall be resolved in the state or federal courts located in San Diego County, California.
            </p>
          </section>

          {/* Arbitration Clause */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">12.1 Alternative Dispute Resolution</h2>
            <p>
              Alternatively, CoreBrief may elect to resolve disputes through binding arbitration conducted in San Diego, California, 
              under the rules of the American Arbitration Association (AAA).
            </p>
            <p className="mt-4">
              Either party may seek injunctive relief in court for claims involving intellectual property or unauthorized access.
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