import { useState } from "react";
// @ts-ignore
import { 
  CheckCircle2, 
  CircleAlert, 
  OctagonAlert, 
  Clock4,
  RefreshCw,
  Info,
  TrendingUp,
  TrendingDown
} from "@/assets/index.js";
import { Chip } from "@heroui/react";

interface SystemComponent {
  id: string;
  name: string;
  status: "operational" | "degraded" | "down" | "maintenance";
  description: string;
  lastChecked: string;
}

interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "minor" | "major" | "critical";
  affectedComponents: string[];
  startedAt: string;
  resolvedAt?: string;
  description: string;
}

const systemComponents: SystemComponent[] = [
  {
    id: "1",
    name: "API Services",
    status: "operational",
    description: "All API endpoints are functioning normally",
    lastChecked: "2 minutes ago",
  },
  {
    id: "2",
    name: "Database",
    status: "operational",
    description: "Database connections stable",
    lastChecked: "1 minute ago",
  },
  {
    id: "3",
    name: "Content Delivery",
    status: "operational",
    description: "CDN and media delivery working as expected",
    lastChecked: "3 minutes ago",
  },
  {
    id: "4",
    name: "Authentication",
    status: "operational",
    description: "Login and user authentication services normal",
    lastChecked: "1 minute ago",
  },
  {
    id: "5",
    name: "Device Management",
    status: "degraded",
    description: "Some devices experiencing slower response times",
    lastChecked: "5 minutes ago",
  },
  {
    id: "6",
    name: "Email Services",
    status: "operational",
    description: "Email delivery functioning normally",
    lastChecked: "2 minutes ago",
  },
];

const incidents: Incident[] = [
  {
    id: "1",
    title: "Database connection timeout",
    status: "resolved",
    severity: "major",
    affectedComponents: ["Database", "API Services"],
    startedAt: "2024-12-20T10:30:00Z",
    resolvedAt: "2024-12-20T11:15:00Z",
    description: "Some users experienced intermittent database connection timeouts. The issue has been resolved.",
  },
  {
    id: "2",
    title: "Increased latency in device management",
    status: "monitoring",
    severity: "minor",
    affectedComponents: ["Device Management"],
    startedAt: "2024-12-21T08:00:00Z",
    description: "We're monitoring increased response times in device management operations.",
  },
  {
    id: "3",
    title: "Scheduled maintenance window",
    status: "resolved",
    severity: "minor",
    affectedComponents: ["API Services", "Content Delivery"],
    startedAt: "2024-12-18T02:00:00Z",
    resolvedAt: "2024-12-18T04:00:00Z",
    description: "Routine maintenance completed successfully.",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "operational":
      return { bg: "bg-green-100", text: "text-green-700", icon: CheckCircle2 };
    case "degraded":
      return { bg: "bg-yellow-100", text: "text-yellow-700", icon: CircleAlert };
    case "down":
      return { bg: "bg-red-100", text: "text-red-700", icon: OctagonAlert };
    case "maintenance":
      return { bg: "bg-blue-100", text: "text-blue-700", icon: Info };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700", icon: Info };
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "critical":
      return { bg: "bg-red-100", text: "text-red-700" };
    case "major":
      return { bg: "bg-orange-100", text: "text-orange-700" };
    case "minor":
      return { bg: "bg-yellow-100", text: "text-yellow-700" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700" };
  }
};

const getStatusIcon = (status: string) => {
  const statusInfo = getStatusColor(status);
  const Icon = statusInfo.icon;
  return <Icon className="w-5 h-5" style={{ stroke: "currentColor" }} />;
};

export default function SystemStatusPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const operationalCount = systemComponents.filter((c) => c.status === "operational").length;
  const totalComponents = systemComponents.length;
  const uptimePercentage = ((operationalCount / totalComponents) * 100).toFixed(1);

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">System Status</h2>
          <p className="text-sm text-gray-600 mt-1">Real-time status of all system components</p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
            style={{ stroke: "currentColor" }}
          />
          <span className="text-sm font-medium text-gray-700">Refresh</span>
        </button>
      </div>

      {/* Status Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" style={{ stroke: "currentColor" }} />
            </div>
            <div>
              <p className="text-sm font-medium text-green-700">System Uptime</p>
              <p className="text-2xl sm:text-3xl font-bold text-green-900">{uptimePercentage}%</p>
            </div>
          </div>
          <p className="text-xs text-green-600">
            {operationalCount} of {totalComponents} components operational
          </p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" style={{ stroke: "currentColor" }} />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-700">All Systems</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-900">
                {systemComponents.filter((c) => c.status === "operational").length}
              </p>
            </div>
          </div>
          <p className="text-xs text-blue-600">Components running normally</p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <CircleAlert className="w-6 h-6 text-yellow-600" style={{ stroke: "currentColor" }} />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-700">Issues</p>
              <p className="text-2xl sm:text-3xl font-bold text-yellow-900">
                {incidents.filter((i) => i.status !== "resolved").length}
              </p>
            </div>
          </div>
          <p className="text-xs text-yellow-600">Active incidents being monitored</p>
        </div>
      </div>

      {/* System Components */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">System Components</h3>
        <div className="space-y-3">
          {systemComponents.map((component) => {
            const statusInfo = getStatusColor(component.status);
            const StatusIcon = statusInfo.icon;

            return (
              <div
                key={component.id}
                className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`flex-shrink-0 w-10 h-10 ${statusInfo.bg} rounded-lg flex items-center justify-center`}>
                  <StatusIcon className={`w-5 h-5 ${statusInfo.text}`} style={{ stroke: "currentColor" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-1">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-900">{component.name}</h4>
                    <Chip
                      className={`${statusInfo.bg} ${statusInfo.text} border-0 capitalize`}
                      size="sm"
                      variant="flat"
                    >
                      {component.status.replace("-", " ")}
                    </Chip>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">{component.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock4 className="w-3 h-3" style={{ stroke: "currentColor" }} />
                    <span>Last checked: {component.lastChecked}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Incident History */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Incident History</h3>
        <div className="space-y-4">
          {incidents.map((incident) => {
            const severityColor = getSeverityColor(incident.severity);
            const statusColor = getStatusColor(incident.status);

            return (
              <div
                key={incident.id}
                className="border border-gray-200 rounded-lg p-4 sm:p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h4 className="text-sm sm:text-base font-semibold text-gray-900">{incident.title}</h4>
                      <Chip
                        className={`${severityColor.bg} ${severityColor.text} border-0 capitalize`}
                        size="sm"
                        variant="flat"
                      >
                        {incident.severity}
                      </Chip>
                      <Chip
                        className={`${statusColor.bg} ${statusColor.text} border-0 capitalize`}
                        size="sm"
                        variant="flat"
                      >
                        {incident.status}
                      </Chip>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">{incident.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock4 className="w-3 h-3" style={{ stroke: "currentColor" }} />
                        <span>Started: {new Date(incident.startedAt).toLocaleString()}</span>
                      </div>
                      {incident.resolvedAt && (
                        <div className="flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" style={{ stroke: "currentColor" }} />
                          <span>Resolved: {new Date(incident.resolvedAt).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs font-medium text-gray-700 mb-2">Affected Components:</p>
                  <div className="flex flex-wrap gap-2">
                    {incident.affectedComponents.map((component, index) => (
                      <Chip
                        key={index}
                        className="bg-gray-100 text-gray-700 border-0"
                        size="sm"
                        variant="flat"
                      >
                        {component}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {incidents.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" style={{ stroke: "currentColor" }} />
            <p className="text-gray-600">No incidents reported. All systems operational.</p>
          </div>
        )}
      </div>

      {/* Status Legend */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Status Legend</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600" style={{ stroke: "currentColor" }} />
            <div>
              <p className="text-sm font-medium text-gray-900">Operational</p>
              <p className="text-xs text-gray-600">All systems normal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <CircleAlert className="w-5 h-5 text-yellow-600" style={{ stroke: "currentColor" }} />
            <div>
              <p className="text-sm font-medium text-gray-900">Degraded</p>
              <p className="text-xs text-gray-600">Performance issues</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <OctagonAlert className="w-5 h-5 text-red-600" style={{ stroke: "currentColor" }} />
            <div>
              <p className="text-sm font-medium text-gray-900">Down</p>
              <p className="text-xs text-gray-600">Service unavailable</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-blue-600" style={{ stroke: "currentColor" }} />
            <div>
              <p className="text-sm font-medium text-gray-900">Maintenance</p>
              <p className="text-xs text-gray-600">Scheduled maintenance</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
