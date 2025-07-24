"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { exportUserData } from "@/app/privacy-actions";

export default function DataExportSection() {
  const [isExporting, setIsExporting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleExport = async () => {
    setIsExporting(true);
    setMessage(null);
    
    try {
      const result = await exportUserData();
      
      if (result.error) {
        setMessage({ type: 'error', text: result.error });
      } else if (result.data) {
        // Create and download the JSON file
        const blob = new Blob([JSON.stringify(result.data, null, 2)], {
          type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `corebrief-data-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        setMessage({ type: 'success', text: 'Data exported successfully' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to export data' });
    }
    
    setIsExporting(false);
  };

  return (
    <div className="space-y-4">
      <Button 
        onClick={handleExport} 
        disabled={isExporting}
        className="w-full"
        variant="outline"
      >
        {isExporting ? 'Preparing Export...' : 'Download My Data'}
      </Button>
      
      {message && (
        <div className={`p-3 rounded-md text-sm ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}
      
      <div className="text-xs text-muted-foreground">
        <p>
          The export includes your profile information, communication preferences, and account history. 
          It does not include research reports or other proprietary content.
        </p>
      </div>
    </div>
  );
} 