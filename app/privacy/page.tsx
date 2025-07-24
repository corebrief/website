import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
        
        <p className="text-muted-foreground mb-8">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}<br />
          <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-8 text-sm leading-relaxed">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Information We Collect</h2>
            <p>
              We collect information you provide directly, information collected automatically, and information from third parties.
            </p>
            <p className="mt-4">
              We are committed to protecting your privacy and maintaining the confidentiality expected in professional 
              financial services relationships. This policy reflects our compliance with applicable privacy laws, including 
              the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant 
              data protection requirements.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Information We Collect</h2>
            
            <h3 className="text-lg font-medium mb-3">2.1 Information You Provide</h3>
            <p>When you register for alpha access or use our services, we collect:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Contact Information:</strong> Full name, email address, phone number</li>
              <li><strong>Organization Details:</strong> Organization name, organization type (including single-family office, multi-family office, RIA, asset manager, or individual investor), your role/title</li>
              <li><strong>Business Information:</strong> Assets under management range, investment focus, current research providers</li>
              <li><strong>Referral Information:</strong> How you heard about us, referral codes from partners</li>
              <li><strong>Account Information:</strong> Login credentials, subscription preferences, service configurations</li>
              <li><strong>Communications:</strong> Messages, inquiries, and feedback you send to us</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p>We automatically collect certain technical information when you access our services:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Device and Browser Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Analytics:</strong> Pages viewed, session duration, interaction patterns, feature usage</li>
              <li><strong>Security Logs:</strong> Authentication events, access attempts, security incidents</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies, web beacons, and similar tracking technologies to enhance user experience, analyze usage patterns, and maintain security. You can manage cookie preferences through your browser settings or by contacting us for assistance.</li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              <em>Note: A detailed cookie policy is available upon request and may be linked separately.</em>
            </p>
          </section>

          {/* How We Use Information */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">3. How We Use Your Information</h2>
            <p>We process your personal information based on the following legal grounds and for the purposes outlined below:</p>
            
            <h3 className="text-lg font-medium mb-3 mt-4">3.1 Legal Basis for Processing</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Performance of a Contract:</strong> Processing necessary to provide our services, manage your account, and fulfill our contractual obligations</li>
              <li><strong>Legitimate Interests:</strong> Business operations, service improvement, security monitoring, and fraud prevention</li>
              <li><strong>Legal Obligations:</strong> Compliance with applicable laws, regulations, and legal processes</li>
              <li><strong>Consent:</strong> Marketing communications and optional features where consent is obtained</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-4">3.2 Specific Uses</h3>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Service Delivery:</strong> Providing equity analysis, managing your account, processing subscriptions</li>
              <li><strong>Communication:</strong> Sending service updates, research reports, responding to inquiries</li>
              <li><strong>Business Operations:</strong> User authentication, billing, customer support, technical maintenance</li>
              <li><strong>Service Improvement:</strong> Understanding user needs, developing new features, quality assurance</li>
              <li><strong>Compliance and Security:</strong> Meeting legal obligations, preventing fraud, ensuring system security</li>
              <li><strong>Marketing:</strong> With your consent, sending relevant product updates and industry insights</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">4. Information Sharing and Disclosure</h2>
            <p>We do not sell, rent, or trade your personal information. We may share information only in these limited circumstances:</p>
            
            <h3 className="text-lg font-medium mb-3 mt-4">4.1 Service Providers and Subprocessors</h3>
            <p>We work with carefully selected third-party providers who assist with:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Cloud hosting and database services (Supabase)</li>
              <li>Payment processing (Stripe)</li>
              <li>Email communications and customer support</li>
              <li>Analytics and performance monitoring</li>
              <li>Security monitoring and threat detection</li>
            </ul>
            <p className="mt-2">
              All subprocessors are contractually bound to protect your information, use it only for specified purposes, 
              and undergo regular compliance reviews. A current list of subprocessors is available upon request by 
              contacting <a href="mailto:privacy@corebrief.ai" className="text-primary hover:underline">privacy@corebrief.ai</a>.
            </p>

            <h3 className="text-lg font-medium mb-3 mt-4">4.2 Legal Requirements</h3>
            <p>We may disclose information when required by law, court order, or regulatory authority, or to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Comply with legal obligations and regulatory requirements</li>
              <li>Protect against fraud, unauthorized access, and security threats</li>
              <li>Enforce our terms of service or other agreements</li>
              <li>With your consent for specific purposes</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-4">4.3 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of 
              the business transaction, subject to confidentiality obligations and applicable privacy laws.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">5. Data Security</h2>
            <p>We implement comprehensive security measures appropriate for institutional financial services:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Encryption:</strong> Data encrypted in transit using TLS and at rest using industry-standard encryption</li>
              <li><strong>Access Controls:</strong> Role-based access with multi-factor authentication and principle of least privilege</li>
              <li><strong>Infrastructure Security:</strong> Secure cloud hosting with enterprise-grade protections and regular security audits</li>
              <li><strong>Monitoring:</strong> Continuous security monitoring, threat detection, and incident response procedures</li>
              <li><strong>Database Security:</strong> Row-level security policies ensuring users can only access their own data</li>
              <li><strong>Employee Training:</strong> Regular security awareness training and confidentiality agreements</li>
            </ul>
            <p className="mt-4">
              While we implement reasonable security measures, no system is completely secure. We encourage you to use 
              strong, unique passwords and keep your login credentials confidential. Please report any suspected security 
              incidents to <a href="mailto:security@corebrief.ai" className="text-primary hover:underline">security@corebrief.ai</a>.
            </p>
          </section>

          {/* Data Retention and Records */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">6. Data Retention</h2>
            <p>We retain your information based on the following criteria:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Active Accounts:</strong> For the duration of your account and service relationship</li>
              <li><strong>Legal Requirements:</strong> As required by applicable laws, regulations, or legal proceedings</li>
              <li><strong>Business Purposes:</strong> For legitimate business needs including dispute resolution and contract enforcement</li>
              <li><strong>Deleted Accounts:</strong> Personal information deleted or anonymized within 90 days of account closure, except where longer retention is legally required</li>
            </ul>
            
            <h3 className="text-lg font-medium mb-3 mt-4">6.1 Record of Processing Activities</h3>
            <p>
              CoreBrief maintains comprehensive records of processing activities in accordance with applicable privacy laws, 
              including details of processing purposes, categories of data, retention periods, and security measures.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">7. Your Rights</h2>
            <p>
              Subject to applicable laws and depending on your jurisdiction, you may have the following rights regarding 
              your personal information. Please note that these rights may vary by location and are subject to legal 
              limitations and exceptions.
            </p>
            
            <h3 className="text-lg font-medium mb-3 mt-4">7.1 Access and Portability</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>View and update your profile information through your account dashboard</li>
              <li>Request a copy of your personal data in a portable, machine-readable format</li>
              <li>Obtain information about how your data is processed</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-4">7.2 Correction and Updates</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Correct inaccurate or incomplete personal information</li>
              <li>Update your profile information through account settings</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-4">7.3 Deletion and Restriction</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Request deletion of your account and associated personal data</li>
              <li>Request restriction of processing in certain circumstances</li>
              <li>Object to processing based on legitimate interests</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-4">7.4 Marketing and Consent</h3>
            <ul className="list-disc ml-6 space-y-1">
              <li>Withdraw consent for marketing communications at any time</li>
              <li>Opt out using unsubscribe links in emails</li>
              <li>Update communication preferences in your account settings</li>
            </ul>

            <p className="mt-4">
              To exercise these rights, please contact us at <a href="mailto:privacy@corebrief.ai" className="text-primary hover:underline">privacy@corebrief.ai</a>. 
              We will respond within the timeframe required by applicable law (typically 30 days). Some requests may require 
              identity verification for security purposes.
            </p>

            <p className="mt-2 text-xs text-muted-foreground">
              <em>Note: Certain rights may be limited by applicable laws, legitimate business interests, or technical constraints.</em>
            </p>
          </section>

          {/* International Transfers */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">8. International Data Transfers</h2>
            <p>
              Your information may be processed and stored in the United States or other countries where our service 
              providers operate. When we transfer personal data outside the European Economic Area (EEA) or United Kingdom, 
              we ensure appropriate safeguards are in place, including:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Standard Contractual Clauses:</strong> EU-approved contractual protections for data transfers</li>
              <li><strong>Adequacy Decisions:</strong> Transfers to countries deemed adequate by relevant authorities</li>
              <li><strong>Binding Corporate Rules:</strong> Where applicable for group companies</li>
              <li><strong>Other Legal Mechanisms:</strong> As recognized under applicable privacy laws</li>
            </ul>
            <p className="mt-4">
              For more information about our international transfer safeguards, please contact 
              <a href="mailto:privacy@corebrief.ai" className="text-primary hover:underline">privacy@corebrief.ai</a>.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">9. Children&apos;s Privacy</h2>
            <p>
              Our services are designed exclusively for professional investors and financial advisors. We do not knowingly 
              collect personal information from individuals under 18 years of age (or the applicable age of majority in 
              their jurisdiction). If we become aware that we have collected information from a minor, we will take 
              immediate steps to delete such information.
            </p>
          </section>

          {/* Changes to Privacy Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices, technology, legal 
              requirements, or business operations. For material changes that affect how we use your personal data, 
              we may seek your consent where legally required.
            </p>
            <p className="mt-4">We will notify you of updates through:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Posting the updated policy on our website with a new effective date</li>
              <li>Email notification to registered users for material changes</li>
              <li>In-service notifications for significant modifications</li>
            </ul>
            <p className="mt-4">
              Your continued use of our services after changes become effective constitutes acceptance of the revised 
              Privacy Policy, unless additional consent is required by law.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">11. Contact Us</h2>
            <p>
              For questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact 
              our Privacy Team:
            </p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Privacy Officer:</strong> <a href="mailto:privacy@corebrief.ai" className="text-primary hover:underline">privacy@corebrief.ai</a></p>
              <p><strong>General Inquiries:</strong> <a href="mailto:info@corebrief.ai" className="text-primary hover:underline">info@corebrief.ai</a></p>
              <p><strong>Security Issues:</strong> <a href="mailto:security@corebrief.ai" className="text-primary hover:underline">security@corebrief.ai</a></p>
              <p className="mt-2 text-sm text-muted-foreground">
                We respond to privacy inquiries within 30 days (or shorter timeframes where required by law). 
                For urgent matters, please indicate &ldquo;URGENT&rdquo; in your subject line.
              </p>
            </div>
            
            <p className="mt-4 text-xs text-muted-foreground">
              <em>
                If you are not satisfied with our response, you may have the right to lodge a complaint with your 
                local data protection authority.
              </em>
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t">
          <p className="text-center text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">Return to CoreBrief</Link> | {" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> | {" "}
            <Link href="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>
          </p>
        </div>

      </div>
    </div>
  );
} 