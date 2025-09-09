import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="prose prose-gray max-w-none">
        <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
        
        <p className="text-muted-foreground mb-8">
          <strong>Effective Date:</strong> September 8, 2025<br />
          <strong>Last Updated:</strong> September 8, 2025
        </p>

        <div className="space-y-8 text-sm leading-relaxed">
          
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">1. Introduction</h2>
            <p>
              CoreBrief provides AI-powered equity research and analysis services to family offices, registered investment advisors (RIAs), 
              and independent professionals. We process financial and business data to generate comprehensive research reports 
              that you purchase and own as JSON data files.
            </p>
            <p className="mt-4">
              As a provider to institutional clients handling sensitive financial information, we maintain strict data confidentiality 
              and security standards. We are committed to protecting your privacy and maintaining the confidentiality expected in 
              professional financial services relationships.
            </p>
            <p className="mt-4">
              This Privacy Policy explains how we collect, use, and protect your information in compliance with applicable privacy laws, 
              including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant 
              data protection requirements.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-primary mb-4">2. Information We Collect</h2>
            <p>
              We collect information you provide directly, information collected automatically through our platform, 
              and information from third-party sources necessary for our research services.
            </p>
            
            <h3 className="text-lg font-medium mb-3 mt-6">2.1 Information You Provide</h3>
            
            <h4 className="font-medium mb-2 mt-4">Account Registration</h4>
            <p>When you create an account, we collect:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Contact Information:</strong> Full name, email address</li>
              <li><strong>Organization Details:</strong> Organization name (optional), organization type (individual professional, financial advisor, family office, RIA, asset manager, hedge fund, or other)</li>
              <li><strong>Account Security:</strong> Password (encrypted), login credentials</li>
              <li><strong>Referral Information:</strong> How you heard about us, referral codes (optional)</li>
              <li><strong>Consent Records:</strong> Professional use confirmation, marketing consent (optional), terms and privacy policy agreement</li>
            </ul>

            <h4 className="font-medium mb-2 mt-4">Waitlist Requests</h4>
            <p>When you submit a waitlist request for early access, we additionally collect:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Access Preferences:</strong> Type of access requested (full early access, beta testing, custom demo, or pricing notifications)</li>
              <li><strong>Timeline Requirements:</strong> Urgency level for access (standard, high priority, or urgent)</li>
              <li><strong>Use Case Information:</strong> Description of how you plan to use CoreBrief, your research needs, and current workflow</li>
            </ul>

            <h4 className="font-medium mb-2 mt-4">Communications</h4>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Support Inquiries:</strong> Messages, questions, and feedback you send to us</li>
              <li><strong>Privacy Requests:</strong> Data export, deletion, or other privacy-related requests</li>
            </ul>

            <h3 className="text-lg font-medium mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <p>We automatically collect certain technical information when you access our services:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>Device and Browser Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Analytics:</strong> Pages viewed, session duration, interaction patterns, feature usage</li>
              <li><strong>Security Logs:</strong> Authentication events, access attempts, security incidents</li>
              <li><strong>Essential Cookies:</strong> Authentication tokens, session management, and security cookies required for platform functionality</li>
              <li><strong>Analytics:</strong> Basic usage analytics to improve our services (if enabled through our hosting provider)</li>
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              <em>We use minimal tracking focused on essential functionality. No third-party advertising or marketing cookies are used.</em>
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
              <li><strong>Service Delivery:</strong> Providing equity analysis, managing your account, processing report purchases</li>
              <li><strong>Communication:</strong> Sending service updates, account notifications, responding to inquiries</li>
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
              <li>Web hosting and deployment (Vercel)</li>
              <li>AI processing and analysis services (cloud infrastructure providers)</li>
              <li>Analytics and performance monitoring (Vercel Analytics)</li>
              <li>Email delivery for account notifications</li>
            </ul>
            <p className="mt-2">
              All subprocessors are contractually bound to protect your information, use it only for specified purposes, 
              and undergo regular compliance reviews. A current list of subprocessors is available upon request by 
              contacting <a href="mailto:support@corebrief.ai" className="text-primary hover:underline">support@corebrief.ai</a>.
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
              <li><strong>Infrastructure Security:</strong> Secure cloud hosting with enterprise-grade protections through our service providers</li>
              <li><strong>Database Security:</strong> Row-level security policies ensuring users can only access their own data</li>
              <li><strong>Authentication:</strong> Secure user authentication and session management through Supabase</li>
              <li><strong>Monitoring:</strong> Security monitoring and logging through our hosting infrastructure</li>
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
              <li><strong>Deleted Accounts:</strong> Personal account information deleted or anonymized within 90 days of account closure, except where longer retention is legally required. Note that purchased report data is owned by you and handled according to our Terms of Service</li>
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
            <p className="mt-2">
              <strong>Note:</strong> Rights regarding purchased report data (JSON files) that you own are governed by our Terms of Service.
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
              providers operate. Our primary service providers (Supabase, Vercel, Stripe) have established appropriate 
              safeguards for international data transfers, including:
            </p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li><strong>US-based providers:</strong> Operating under applicable US privacy frameworks</li>
              <li><strong>Enterprise-grade compliance:</strong> Our service providers maintain GDPR compliance programs</li>
              <li><strong>Contractual protections:</strong> Data processing agreements with appropriate safeguards</li>
              <li><strong>Industry standards:</strong> SOC 2, ISO certifications, and other security frameworks</li>
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
              Our services are designed exclusively for investment professionals, financial advisors, and individual 
              professionals conducting research. We do not knowingly collect personal information from 
              individuals under 18 years of age (or the applicable age of majority in their jurisdiction). If we become 
              aware that we have collected information from a minor, we will take immediate steps to delete such information.
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
              <p><strong>Privacy Questions:</strong> <a href="mailto:privacy@corebrief.ai" className="text-primary hover:underline">privacy@corebrief.ai</a></p>
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