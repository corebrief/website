"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitWaitlistRequest } from "@/app/waitlist-actions";

interface WaitlistFormProps {
  userId: string;
}

export default function WaitlistForm({ userId }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(null);
    
    try {
      const result = await submitWaitlistRequest(formData);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Your early access request has been submitted! We\'ll review your application and get back to you soon.' 
        });
        // Reset form
        const form = document.getElementById('waitlist-form') as HTMLFormElement;
        form?.reset();
      }
    } catch {
      // Ignore error details, just show generic message
      setMessage({ type: 'error', text: 'Failed to submit request. Please try again.' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <form id="waitlist-form" action={handleSubmit} className="space-y-6">
      <input type="hidden" name="user_id" value={userId} />
      
      {/* Request Type */}
      <div>
        <Label htmlFor="request_type">What type of access are you interested in? *</Label>
        <select
          name="request_type"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-2"
        >
          <option value="">Select access type</option>
          <option value="early_access">Full Early Access</option>
          <option value="beta_access">Beta Testing Program</option>
          <option value="custom_demo">Custom Demo/Pilot</option>
          <option value="pricing_notification">Pricing Notification Only</option>
        </select>
      </div>

      {/* Priority Level */}
      <div>
        <Label htmlFor="priority_level">Timeline Urgency *</Label>
        <select
          name="priority_level"
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-2"
        >
          <option value="">Select urgency</option>
          <option value="standard">Standard (3-6 months)</option>
          <option value="high">High Priority (1-3 months)</option>
          <option value="urgent">Urgent (Within 1 month)</option>
        </select>
      </div>

      {/* Use Case Description */}
      <div>
        <Label htmlFor="use_case_description">How do you plan to use CoreBrief? *</Label>
        <textarea
          name="use_case_description"
          required
          rows={4}
          placeholder="Describe your investment research needs, current workflow, and how CoreBrief would fit into your process..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-2"
        />
      </div>

      {/* Features of Interest */}
      <div>
        <Label htmlFor="requested_features">Which features are most important to you?</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {[
            'AI-powered analysis',
            'Risk assessment',
            'Portfolio screening',
            'Compliance reporting',
            'API integration',
            'Custom dashboards',
            'ESG screening',
            'Backtesting tools'
          ].map((feature) => (
            <label key={feature} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name="requested_features"
                value={feature}
                className="rounded border-gray-300"
              />
              <span>{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Team Size */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="team_size">Investment Team Size</Label>
          <select
            name="team_size"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-2"
          >
            <option value="">Select team size</option>
            <option value="1">Solo practitioner</option>
            <option value="2-5">2-5 people</option>
            <option value="6-15">6-15 people</option>
            <option value="16-50">16-50 people</option>
            <option value="50+">50+ people</option>
          </select>
        </div>

        <div>
          <Label htmlFor="budget_range">Approximate Budget Range</Label>
          <select
            name="budget_range"
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-2"
          >
            <option value="">Select budget range</option>
            <option value="under_1k">Under $1,000/month</option>
            <option value="1k_5k">$1,000 - $5,000/month</option>
            <option value="5k_15k">$5,000 - $15,000/month</option>
            <option value="15k_50k">$15,000 - $50,000/month</option>
            <option value="over_50k">$50,000+/month</option>
            <option value="enterprise">Enterprise pricing</option>
          </select>
        </div>
      </div>

      {/* Current Tools */}
      <div>
        <Label htmlFor="current_tools">Current Research Tools & Platforms</Label>
        <Input
          name="current_tools"
          placeholder="e.g., Bloomberg Terminal, FactSet, Morningstar Direct, Internal Tools"
          className="mt-2"
        />
      </div>

      {/* Timeline */}
      <div>
        <Label htmlFor="timeline_urgency">Why is this timeline important to you?</Label>
        <textarea
          name="timeline_urgency"
          rows={3}
          placeholder="e.g., Expanding client base, replacing current tool, specific project deadline..."
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mt-2"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Submitting Request...' : 'Request Early Access'}
        </Button>
        
        {message && (
          <div className={`mt-4 p-4 rounded-md text-sm ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {message.text}
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground pt-2 border-t">
        <p>
          <strong>Privacy Note:</strong> Your information will be used solely for early access evaluation 
          and will not be shared with third parties. You can update or withdraw your request at any time 
          by contacting{" "}
          <a href="mailto:waitlist@corebrief.ai" className="text-primary hover:underline">
            waitlist@corebrief.ai
          </a>.
        </p>
      </div>
    </form>
  );
} 