import { Card } from "@/components/ui/card";

interface WaitlistStatusProps {
  profile: {
    waitlist_status?: string;
    waitlist_position?: number;
    waitlist_joined_at?: string;
    early_access_requested?: boolean;
    early_access_granted?: boolean;
    early_access_granted_at?: string;
  } | null;
  requests: Array<{
    id: string;
    request_type: string;
    status: string;
    priority_level: string;
    created_at: string;
    updated_at: string;
  }>;
}

export default function WaitlistStatus({ profile, requests }: WaitlistStatusProps) {
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, string> = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'approved': 'bg-green-100 text-green-800 border-green-200',
      'notified': 'bg-blue-100 text-blue-800 border-blue-200',
      'converted': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusLabel = (status: string) => {
    const labelMap: Record<string, string> = {
      'pending': 'On Waitlist',
      'approved': 'Approved for Early Access',
      'notified': 'Invitation Sent',
      'converted': 'Early Access Active'
    };
    return labelMap[status] || status;
  };

  const getPriorityLabel = (priority: string) => {
    const priorityMap: Record<string, { label: string; color: string }> = {
      'standard': { label: 'Standard', color: 'text-gray-600' },
      'high': { label: 'High Priority', color: 'text-blue-600' },
      'urgent': { label: 'Urgent', color: 'text-red-600' }
    };
    return priorityMap[priority] || { label: priority, color: 'text-gray-600' };
  };

  if (!profile) {
    return (
      <Card className="p-6">
        <div className="text-center text-muted-foreground">
          Unable to load waitlist status
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {/* Main Status Card */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Waitlist Status</h2>
          <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(profile.waitlist_status || 'pending')}`}>
            {getStatusLabel(profile.waitlist_status || 'pending')}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Joined</p>
            <p className="font-medium">
              {profile.waitlist_joined_at 
                ? new Date(profile.waitlist_joined_at).toLocaleDateString()
                : 'Unknown'
              }
            </p>
          </div>
          <div>
            <p className="text-muted-foreground">Early Access</p>
            <p className="font-medium">
              {profile.early_access_granted 
                ? `✅ Granted ${profile.early_access_granted_at ? new Date(profile.early_access_granted_at).toLocaleDateString() : ''}`
                : profile.early_access_requested 
                ? '⏳ Requested'
                : '❌ Not Requested'
              }
            </p>
          </div>
        </div>

        {profile.waitlist_status === 'approved' && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-sm font-medium text-green-800">
                You&apos;ve been approved for early access!
              </p>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Check your email for next steps or contact{" "}
              <a href="mailto:access@corebrief.ai" className="underline">access@corebrief.ai</a>
            </p>
          </div>
        )}

        {profile.waitlist_status === 'pending' && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>You&apos;re on the waitlist!</strong> We&apos;ll notify you as we expand access to more users based on your organization type and use case.
            </p>
          </div>
        )}
      </Card>

      {/* Request History */}
      {requests.length > 0 && (
        <Card className="p-6">
          <h3 className="font-semibold mb-4 text-primary border-b pb-2">
            Your Requests
          </h3>
          <div className="space-y-3">
            {requests.map((request) => {
              const priority = getPriorityLabel(request.priority_level);
              return (
                <div key={request.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm capitalize">
                      {request.request_type.replace('_', ' ')}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </div>
                    <p className={`text-xs mt-1 ${priority.color}`}>
                      {priority.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
} 