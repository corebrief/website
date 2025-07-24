"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { requestAccountDeletion } from "@/app/privacy-actions";

export default function AccountDeletionSection() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleDeleteRequest = async () => {
    setIsDeleting(true);
    setMessage(null);
    
    try {
      const result = await requestAccountDeletion(reason);
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Account deletion request submitted successfully. We will review and process your request within 72 hours.' 
        });
        setShowConfirm(false);
        setReason("");
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to submit deletion request. Please try again.' });
    } finally {
      setIsDeleting(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
          <h3 className="font-medium text-destructive mb-2">⚠️ Confirm Account Deletion</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This action will permanently delete your account and all associated data. This cannot be undone.
          </p>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground">
                Reason for deletion (optional):
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Help us improve by sharing why you're leaving..."
                className="w-full mt-1 p-2 text-sm border rounded-md resize-none"
                rows={3}
                maxLength={500}
              />
              <p className="text-xs text-muted-foreground mt-1">
                {reason.length}/500 characters
              </p>
            </div>
            
            {message && (
              <div className={`p-3 rounded-md text-sm ${ 
                message.type === 'success' 
                  ? 'bg-green-50 text-green-700 border border-green-200' 
                  : 'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowConfirm(false);
                  setReason("");
                  setMessage(null);
                }}
                disabled={isDeleting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleDeleteRequest}
                disabled={isDeleting}
                className="flex-1"
              >
                {isDeleting ? "Processing..." : "Confirm Deletion"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={() => setShowConfirm(true)}
      >
        Request Account Deletion
      </Button>
      <p className="text-xs text-muted-foreground">
        Your deletion request will be reviewed and processed within 72 hours.
      </p>
    </div>
  );
} 