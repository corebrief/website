"use client";

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Spinner } from '@/components/ui/spinner';
import { 
  parseReport, 
  getClassificationDisplayName, 
  getClassificationColor,
  type BaseReportData,
  type ParsedReport
} from '@/utils/report-parsers';
import GeneralEquityReport from '@/components/general-equity-report';
import { Search, Filter, Eye, ShoppingCart, Clock } from 'lucide-react';

interface ReportsDashboardProps {
  hasFullAccess: boolean;
}

interface ReportsResponse {
  reports: BaseReportData[];
  total: number;
}

export default function ReportsDashboard({ hasFullAccess }: ReportsDashboardProps) {
  const [reports, setReports] = useState<BaseReportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTicker, setSearchTicker] = useState('');
  const [reportTypeFilter, setReportTypeFilter] = useState<string>('all');
  const [accessFilter, setAccessFilter] = useState<string>(hasFullAccess ? 'all' : 'free');
  const [selectedReport, setSelectedReport] = useState<ParsedReport | null>(null);

  // Fetch reports
  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        ...(searchTicker && { ticker: searchTicker }),
        type: reportTypeFilter,
        access: accessFilter,
      });

      const response = await fetch(`/api/reports?${params}`);
      const data: ReportsResponse = await response.json();

      if (response.ok) {
        setReports(data.reports || []);
      } else {
        console.error('Failed to fetch reports:', data.error);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  }, [searchTicker, reportTypeFilter, accessFilter]);

  // Fetch reports on component mount and when filters change
  useEffect(() => {
    fetchReports();
  }, [searchTicker, reportTypeFilter, accessFilter, fetchReports]);

  // Handle report selection
  const handleSelectReport = (report: BaseReportData) => {
    const parsedReport = parseReport(report);
    setSelectedReport(parsedReport);
  };

  // Format date for display
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString();
  };

  // Render report card
  const renderReportCard = (report: BaseReportData) => (
    <Card 
      key={`${report.ticker}-${report.years_range}`} 
      className={`h-full flex flex-col transition-all duration-200 ${
        report.has_access 
          ? 'hover:shadow-lg hover:scale-[1.02] cursor-pointer' 
          : hasFullAccess 
            ? 'hover:shadow-md cursor-pointer opacity-75' 
            : 'opacity-60 cursor-not-allowed'
      }`}
      onClick={() => {
        if (report.has_access) {
          handleSelectReport(report);
        } else if (hasFullAccess) {
          // Handle purchase logic here in the future
          console.log('Purchase report:', report.ticker);
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CardTitle className="text-lg font-bold">{report.ticker}</CardTitle>
              <Badge className={getClassificationColor(report.classification)}>
                {getClassificationDisplayName(report.classification)}
              </Badge>
              {report.is_free && (
                <Badge variant="outline" className="text-green-600 border-green-300">
                  FREE
                </Badge>
              )}
            </div>
          </div>
          <div className="flex-shrink-0 flex items-center gap-1 text-sm text-muted-foreground">
            {report.has_access ? (
              <>
                <Eye className="h-4 w-4" />
                <span>View</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Purchase</span>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-1">
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>Period: {report.years_range}</span>
          </div>
          <div>Generated: {formatDate(report.generated_at)}</div>
          {report.analysis_years && (
            <div>Analysis Years: {report.analysis_years}</div>
          )}
        </div>
      </CardContent>
      
      {/* Visual indicator for clickable cards */}
      {report.has_access && (
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-primary text-primary-foreground rounded-full p-1">
            <Eye className="h-3 w-3" />
          </div>
        </div>
      )}
    </Card>
  );

  // Render selected report details
  const renderReportDetails = () => {
    if (!selectedReport) return null;

    return (
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">{selectedReport.ticker}</h2>
            <Badge className={getClassificationColor(selectedReport.classification)}>
              {getClassificationDisplayName(selectedReport.classification)}
            </Badge>
            <span className="text-muted-foreground">({selectedReport.years_range})</span>
          </div>
          <Button variant="outline" onClick={() => setSelectedReport(null)}>
            Back to Reports
          </Button>
        </div>

        {/* Render appropriate report component based on classification */}
        {selectedReport.classification === 'general' ? (
          <GeneralEquityReport report={selectedReport} />
        ) : (
          <div className="grid gap-6">
            {Object.entries(selectedReport.sections).map(([key, section]) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none">
                    <div className="whitespace-pre-wrap">{section.content}</div>
                    {section.subsections && section.subsections.length > 0 && (
                      <div className="mt-4 space-y-3">
                        {section.subsections.map((subsection, index) => (
                          <div key={index} className="border-l-2 border-gray-200 pl-4">
                            <h4 className="font-semibold">{subsection.title}</h4>
                            <div className="whitespace-pre-wrap text-sm">{subsection.content}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (selectedReport) {
    return renderReportDetails();
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by ticker (e.g., AAPL)"
                  value={searchTicker}
                  onChange={(e) => setSearchTicker(e.target.value.toUpperCase())}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={reportTypeFilter} onValueChange={setReportTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="reit">REITs</SelectItem>
                <SelectItem value="mlp">MLPs</SelectItem>
              </SelectContent>
            </Select>
            <Select value={accessFilter} onValueChange={setAccessFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reports</SelectItem>
                <SelectItem value="free">Free Only</SelectItem>
                <SelectItem value="purchased">Purchased Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Spinner isLoading={true} />
          <span className="ml-2">Loading reports...</span>
        </div>
      ) : reports.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <h3 className="text-lg font-semibold mb-2">No reports found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search criteria.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {reports.map(renderReportCard)}
        </div>
      )}

      {/* Summary */}
      {!loading && reports.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {reports.length} report{reports.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
}
