import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-primary mb-8">Refund Policy</h1>
        
        <p className="text-muted-foreground mb-8">
          <strong>Effective Date:</strong> September 8, 2025<br />
          <strong>Last Updated:</strong> September 8, 2025
        </p>

        <div className="space-y-12 text-sm leading-relaxed">
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Policy Overview</h2>
            <p>
              CoreBrief is committed to providing high-quality equity research and analysis to our clients. 
              Our refund policy is designed to be fair while protecting the integrity of our proprietary research content.
            </p>
            <p className="mt-4">
              This policy applies to all report purchases made through our platform.
            </p>
          </section>

          {/* On-Demand Reports */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Individual Report Purchases</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6">
              <h3 className="font-semibold text-blue-800">Digital Content Policy</h3>
              <p className="text-blue-700 text-sm mt-2">
                Due to the immediate delivery of proprietary research content, special refund terms apply.
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-3">2.1 Refund Eligibility</h3>
            <p>Refunds for individual report purchases may be requested under the following circumstances:</p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li><strong>Technical Issues:</strong> Report fails to download or contains corrupted/unreadable data due to platform errors</li>
              <li><strong>Major System Failures:</strong> Report is substantially incomplete due to processing system failure (missing entire sections, garbled text throughout)</li>
              <li><strong>Wrong Report:</strong> You received a different report than the one ordered due to system error</li>
              <li><strong>Duplicate Purchase:</strong> Accidental duplicate purchase of the same report within 24 hours</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">2.2 Refund Limitations</h3>
            <p>Refunds will <strong>not</strong> be provided for:</p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Change of mind after accessing the report content</li>
              <li>Disagreement with investment conclusions or ratings</li>
              <li>Performance of the company differing from analysis expectations</li>
              <li>Minor errors, omissions, or inconsistencies inherent in AI-generated content</li>
              <li>Incomplete coverage of specific topics or metrics you expected</li>
              <li>Reports accessed more than 48 hours after purchase</li>
              <li>Reports shared with third parties in violation of terms</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">2.3 Request Timeline</h3>
            <p>
              Refund requests for individual reports must be submitted within <strong>48 hours</strong> of purchase 
              and within <strong>24 hours</strong> of first accessing the report content.
            </p>
          </section>


          {/* Discretionary Refunds */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Discretionary Refunds</h2>
            <p>
              CoreBrief may, at its sole discretion, issue refunds outside the standard policy terms based on 
              individual circumstances. Such decisions are not precedential and do not create any obligation 
              for future similar situations.
            </p>
          </section>

          {/* Processing Details */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Refund Processing</h2>

            <h3 className="text-lg font-semibold mb-3">4.1 How to Request</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:billing@corebrief.ai" className="text-primary hover:underline">billing@corebrief.ai</a></p>
              <p><strong>Subject Line:</strong> &ldquo;Refund Request - [Order Number]&rdquo;</p>
              <p><strong>Include:</strong> Order details, reason for request, supporting documentation</p>
            </div>

            <h3 className="text-lg font-semibold mb-3 mt-6">4.2 Processing Timeline</h3>
            <p>
              We will review refund requests promptly and notify you of our decision via email. 
              Approved refunds will be processed to your original payment method as soon as reasonably possible, 
              typically within 5-10 business days depending on your payment provider.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-6">4.3 Refund Methods</h3>
            <p>
              Refunds are processed to the original payment method used for purchase. 
              Alternative refund methods may be arranged for exceptional circumstances.
            </p>
          </section>

          {/* Institutional Clients */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Institutional Client Considerations</h2>
            <p>
              For family offices, RIAs, and other institutional clients with custom agreements:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Custom refund terms may be negotiated as part of enterprise agreements</li>
              <li>Bulk report purchase refunds are evaluated on a case-by-case basis</li>
              <li>Service level agreements may include specific remedies for platform failures</li>
              <li>Contact your account manager or <a href="mailto:institutional@corebrief.ai" className="text-primary hover:underline">institutional@corebrief.ai</a> for custom arrangements</li>
            </ul>
          </section>

          {/* Disputes */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Dispute Resolution</h2>
            <p>
              If you disagree with a refund decision, you may:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Request escalation by contacting <a href="mailto:billing@corebrief.ai" className="text-primary hover:underline">billing@corebrief.ai</a> with "Escalation Request" in the subject line</li>
              <li>Provide additional documentation supporting your request</li>
              <li>Pursue resolution through the dispute mechanisms outlined in our Terms of Service</li>
            </ul>
            <p className="mt-4">
              We are committed to fair and transparent refund decisions that protect both client interests and research integrity.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Policy Updates</h2>
            <p>
              This refund policy may be updated periodically. Material changes will be communicated via email 
              and posted on our website. Continued use of our services constitutes acceptance of updated terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Contact Information</h2>
            <p>For refund requests or policy questions:</p>
            <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
              <p><strong>Billing & Refunds:</strong> <a href="mailto:billing@corebrief.ai" className="text-primary hover:underline">billing@corebrief.ai</a></p>
              <p><strong>Institutional Clients:</strong> <a href="mailto:institutional@corebrief.ai" className="text-primary hover:underline">institutional@corebrief.ai</a></p>
              <p><strong>Legal Questions:</strong> <a href="mailto:legal@corebrief.ai" className="text-primary hover:underline">legal@corebrief.ai</a></p>
              <p><strong>General Support:</strong> <a href="mailto:support@corebrief.ai" className="text-primary hover:underline">support@corebrief.ai</a></p>
            </div>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Return to CoreBrief</Link> | {" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> | {" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </p>
        </div>

      </div>
    </div>
  );
} 