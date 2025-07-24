"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { updatePrivacyPreferences } from "@/app/privacy-actions";

interface PrivacyPreferencesProps {
  profile: {
    marketing_consent?: boolean;
    communication_preferences?: {
      email_updates?: boolean;
      research_reports?: boolean;
      marketing?: boolean;
    };
  } | null;
}

export default function PrivacyPreferences({ profile }: PrivacyPreferencesProps) {
  const [preferences, setPreferences] = useState({
    email_updates: profile?.communication_preferences?.email_updates ?? true,
    research_reports: profile?.communication_preferences?.research_reports ?? true,
    marketing: profile?.marketing_consent ?? false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      const result = await updatePrivacyPreferences(preferences);
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ type: 'success', text: 'Preferences updated successfully' });
      }
    } catch {
      // Ignore error details, just show generic message
      setMessage({ type: 'error', text: 'Failed to update preferences' });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Communication Preferences */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Service Updates</h3>
            <p className="text-sm text-muted-foreground">
              Important updates about your account and our services
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.email_updates}
              onChange={(e) => handlePreferenceChange('email_updates', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Research Reports</h3>
            <p className="text-sm text-muted-foreground">
              New equity analysis reports and research insights
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.research_reports}
              onChange={(e) => handlePreferenceChange('research_reports', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium">Marketing Communications</h3>
            <p className="text-sm text-muted-foreground">
              Product updates, industry insights, and promotional content
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={preferences.marketing}
              onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-4 border-t">
        <Button 
          onClick={handleSubmit} 
          disabled={isLoading}
          className="w-full md:w-auto"
        >
          {isLoading ? 'Updating...' : 'Save Preferences'}
        </Button>
        
        {message && (
          <div className={`mt-3 p-3 rounded-md text-sm ${
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
          Note: You can withdraw marketing consent at any time. Service updates and research reports 
          are essential for account management and may continue unless you close your account.
        </p>
      </div>
    </div>
  );
} 