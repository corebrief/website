interface PrivacyRequest {
  id: string;
  request_type: string;
  status: string;
  created_at: string;
  completed_at?: string;
  notes?: string;
}

interface PrivacyRequestHistoryProps {
  requests: PrivacyRequest[];
}

export default function PrivacyRequestHistory({ requests }: PrivacyRequestHistoryProps) {
  const formatRequestType = (type: string) => {
    const typeMap: Record<string, string> = {
      'data_export': 'Data Export',
      'data_deletion': 'Data Deletion',
      'consent_withdrawal': 'Consent Withdrawal',
      'data_correction': 'Data Correction'
    };
    return typeMap[type] || type;
  };

  const formatStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      'pending': { label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
      'processing': { label: 'Processing', color: 'bg-blue-100 text-blue-800' },
      'completed': { label: 'Completed', color: 'bg-green-100 text-green-800' },
      'rejected': { label: 'Rejected', color: 'bg-red-100 text-red-800' }
    };
    return statusMap[status] || { label: status, color: 'bg-gray-100 text-gray-800' };
  };

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No privacy requests found.</p>
        <p className="text-xs mt-2">Your privacy requests will appear here when you make them.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => {
        const status = formatStatus(request.status);
        return (
          <div key={request.id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">{formatRequestType(request.request_type)}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                {status.label}
              </span>
            </div>
            
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Requested: {new Date(request.created_at).toLocaleDateString()}</p>
              {request.completed_at && (
                <p>Completed: {new Date(request.completed_at).toLocaleDateString()}</p>
              )}
              {request.notes && (
                <p className="mt-2 p-2 bg-muted/50 rounded text-xs">{request.notes}</p>
              )}
            </div>
          </div>
        );
      })}
      
      {requests.length >= 10 && (
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            Showing the 10 most recent requests. Contact privacy@corebrief.ai for full history.
          </p>
        </div>
      )}
    </div>
  );
} 