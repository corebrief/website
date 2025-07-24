import Link from "next/link";

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-primary mb-8">Refund Policy</h1>
        
        <p className="text-muted-foreground mb-8">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}<br />
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-12 text-sm leading-relaxed">
          
          {/* Overview */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Policy Overview</h2>
            <p>
              CoreBrief is committed to providing high-quality equity research and analysis to institutional clients. 
              Our refund policy is designed to be fair while protecting the integrity of our proprietary research content.
            </p>
            <p className="mt-4">
              This policy applies to all purchases made through our platform, including individual reports and subscription services.
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
              <li><strong>Technical Issues:</strong> Report fails to download or contains corrupted data due to platform errors</li>
              <li><strong>Content Errors:</strong> Report contains significant factual errors or missing core analysis sections</li>
              <li><strong>Wrong Report:</strong> You received a different report than the one ordered due to system error</li>
              <li><strong>Duplicate Purchase:</strong> Accidental duplicate purchase of the same report within 24 hours</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">2.2 Refund Limitations</h3>
            <p>Refunds will <strong>not</strong> be provided for:</p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Change of mind after accessing the report content</li>
              <li>Disagreement with investment conclusions or ratings</li>
              <li>Market performance differing from analysis expectations</li>
              <li>Reports accessed more than 48 hours after purchase</li>
              <li>Reports shared with third parties in violation of terms</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">2.3 Request Timeline</h3>
            <p>
              Refund requests for individual reports must be submitted within <strong>48 hours</strong> of purchase 
              and before the report has been downloaded or accessed.
            </p>
          </section>

          {/* Subscription Services */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">3. Subscription Services</h2>

            <h3 className="text-lg font-semibold mb-3">3.1 Trial Period</h3>
            <p>
              New subscribers receive a <strong>14-day trial period</strong> to evaluate our services. 
              You may cancel during this period for a full refund of subscription fees.
            </p>

            <h3 className="text-lg font-semibold mb-3 mt-6">3.2 Monthly Subscriptions</h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li><strong>Cancellation:</strong> Cancel anytime through your account settings</li>
              <li><strong>Prorated Refunds:</strong> No partial refunds for unused portions of the current billing cycle</li>
              <li><strong>Access:</strong> Service continues until the end of the paid billing period</li>
              <li><strong>Exception:</strong> Technical service failures exceeding 72 hours may qualify for prorated credits</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">3.3 Annual Subscriptions</h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li><strong>30-Day Window:</strong> Full refund available if cancelled within 30 days of initial purchase</li>
              <li><strong>After 30 Days:</strong> Prorated refunds may be considered for exceptional circumstances</li>
              <li><strong>Service Issues:</strong> Extended outages may qualify for service credits or partial refunds</li>
            </ul>
          </section>

          {/* Exceptional Circumstances */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Exceptional Circumstances</h2>
            <p>
              CoreBrief may consider refunds outside standard policy terms for:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Extended platform outages affecting service access</li>
              <li>Significant changes to service features or content quality</li>
              <li>Billing errors or unauthorized charges</li>
              <li>Documented regulatory restrictions preventing service use</li>
            </ul>
            <p className="mt-4">
              Each request will be evaluated individually based on specific circumstances and account history.
            </p>
          </section>

          {/* Processing Details */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Refund Processing</h2>

            <h3 className="text-lg font-semibold mb-3">5.1 How to Request</h3>
            <div className="bg-muted p-4 rounded-lg">
              <p><strong>Email:</strong> <a href="mailto:billing@corebrief.ai" className="text-primary hover:underline">billing@corebrief.ai</a></p>
              <p><strong>Subject Line:</strong> &ldquo;Refund Request - [Order Number]&rdquo;</p>
              <p><strong>Include:</strong> Order details, reason for request, supporting documentation</p>
            </div>

            <h3 className="text-lg font-semibold mb-3 mt-6">5.2 Processing Timeline</h3>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li><strong>Review Period:</strong> 3-5 business days for initial review</li>
              <li><strong>Approval Notification:</strong> Email confirmation within 2 business days</li>
              <li><strong>Refund Processing:</strong> 5-10 business days to original payment method</li>
              <li><strong>Complex Cases:</strong> Up to 15 business days for exceptional circumstances</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3 mt-6">5.3 Refund Methods</h3>
            <p>
              Refunds are processed to the original payment method used for purchase. 
              Alternative refund methods may be arranged for exceptional circumstances.
            </p>
          </section>

          {/* Institutional Clients */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Institutional Client Considerations</h2>
            <p>
              For family offices, RIAs, and other institutional clients with custom agreements:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Custom refund terms may be negotiated as part of enterprise agreements</li>
              <li>Bulk purchase refunds are evaluated on a case-by-case basis</li>
              <li>Service level agreements may include specific remedies for service failures</li>
              <li>Contact your account manager or <a href="mailto:institutional@corebrief.ai" className="text-primary hover:underline">institutional@corebrief.ai</a> for custom arrangements</li>
            </ul>
          </section>

          {/* Disputes */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Dispute Resolution</h2>
            <p>
              If you disagree with a refund decision, you may:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-2">
              <li>Request escalation to our legal team at <a href="mailto:legal@corebrief.ai" className="text-primary hover:underline">legal@corebrief.ai</a></li>
              <li>Provide additional documentation supporting your request</li>
              <li>Pursue resolution through the dispute mechanisms outlined in our Terms of Service</li>
            </ul>
            <p className="mt-4">
              We are committed to fair and transparent refund decisions that protect both client interests and research integrity.
            </p>
          </section>

          {/* Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">8. Policy Updates</h2>
            <p>
              This refund policy may be updated periodically. Material changes will be communicated via email 
              and posted on our website. Continued use of our services constitutes acceptance of updated terms.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Contact Information</h2>
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