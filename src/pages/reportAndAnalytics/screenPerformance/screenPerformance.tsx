import { useState } from "react";
import { Button, Chip, Progress, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Download, Eye, FileText, RefreshCw, Wifi, WifiOff, X } from "lucide-react";

interface ScreenPerformanceData {
  id: string;
  screenName: string;
  screenId: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  uptime: number;
  totalPlays: number;
  errors: number;
  signal: number;
}

const screenPerformanceData: ScreenPerformanceData[] = [
  {
    id: "1",
    screenName: "Mall Entrance Display",
    screenId: "SCR-001",
    location: "Shopping Mall - Main Entrance",
    status: "online",
    uptime: 98.5,
    totalPlays: 2456,
    errors: 2,
    signal: 95,
  },
  {
    id: "2",
    screenName: "Restaurant Menu Board",
    screenId: "SCR-002",
    location: "Downtown Restaurant",
    status: "online",
    uptime: 95.2,
    totalPlays: 1823,
    errors: 5,
    signal: 78,
  },
  {
    id: "3",
    screenName: "Office Lobby Screen",
    screenId: "SCR-003",
    location: "Corporate Office - Lobby",
    status: "online",
    uptime: 99.8,
    totalPlays: 3201,
    errors: 0,
    signal: 88,
  },
  {
    id: "4",
    screenName: "Retail Store Display",
    screenId: "SCR-004",
    location: "Electronics Store",
    status: "maintenance",
    uptime: 87.3,
    totalPlays: 1654,
    errors: 12,
    signal: 45,
  },
  {
    id: "5",
    screenName: "Transit Station Board",
    screenId: "SCR-005",
    location: "City Transit Hub",
    status: "offline",
    uptime: 0.0,
    totalPlays: 0,
    errors: 23,
    signal: 0,
  },
];

const renderStatusChip = (status: string) => {
  const statusConfig: Record<string, { color: string; bgColor: string; borderColor: string }> = {
    online: {
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-300",
    },
    offline: {
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
    },
    maintenance: {
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-300",
    },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.online;

  return (
    <Chip
      className={`${config.color} ${config.bgColor} ${config.borderColor} border`}
      size="sm"
      variant="flat"
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Chip>
  );
};

const renderUptime = (uptime: number) => {
  const color = uptime >= 95 ? "#D12027" : uptime >= 80 ? "#F79009" : "#EF4444";
  
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <Progress
        aria-label="Uptime"
        className="flex-1"
        color="danger"
        size="sm"
        value={uptime}
      />
      <span className="text-sm font-medium text-gray-700 min-w-[50px]">{uptime}%</span>
    </div>
  );
};

const renderSignal = (signal: number) => {
  if (signal === 0) {
    return (
      <div className="flex items-center gap-2">
        <X className="w-5 h-5 text-red-500" />
        <span className="text-sm text-gray-600">0%</span>
      </div>
    );
  }

  const getSignalColor = (signal: number) => {
    if (signal >= 75) return "text-green-500";
    if (signal >= 50) return "text-orange-500";
    return "text-red-500";
  };

  const getSignalBars = (signal: number) => {
    if (signal >= 75) return 4;
    if (signal >= 50) return 3;
    if (signal >= 25) return 2;
    return 1;
  };

  const bars = getSignalBars(signal);
  const color = getSignalColor(signal);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-end gap-0.5">
        {[1, 2, 3, 4].map((bar) => (
          <div
            key={bar}
            className={`w-1 ${bar <= bars ? color : "bg-gray-300"} rounded-t`}
            style={{ height: `${bar * 4}px` }}
          />
        ))}
      </div>
      <span className="text-sm text-gray-600">{signal}%</span>
    </div>
  );
};

export default function ScreenPerformancePage() {
  const [data, setData] = useState<ScreenPerformanceData[]>(screenPerformanceData);

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log("Export clicked");
  };

  const handleRefresh = () => {
    // TODO: Implement refresh functionality
    console.log("Refresh clicked");
  };

  const handleDetails = (screen: ScreenPerformanceData) => {
    // TODO: Implement details view
    console.log("Details for:", screen.screenName);
  };

  const handleReport = (screen: ScreenPerformanceData) => {
    // TODO: Implement report generation
    console.log("Report for:", screen.screenName);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Screen Performance Analysis</h2>
          <p className="text-sm text-gray-600 mt-1">
            Detailed uptime, downtime, and activity metrics for individual screens.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="border border-gray-300 bg-white"
            size="sm"
            startContent={<Download size={16} />}
            onPress={handleExport}
          >
            Export
          </Button>
          <Button
            className="bg-[#D12027] text-white"
            size="sm"
            startContent={<RefreshCw size={16} />}
            onPress={handleRefresh}
          >
            Refresh
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table
          aria-label="Screen Performance Table"
          classNames={{
            wrapper: "bg-white rounded-xl border border-gray-200 shadow-sm",
            th: "bg-gray-50 text-gray-900 font-semibold text-sm py-4 px-4 border-b border-gray-200",
            td: "py-4 px-4 text-gray-700 text-sm border-b border-gray-100",
            tr: "hover:bg-gray-50",
          }}
          removeWrapper
        >
          <TableHeader>
            <TableColumn>SCREEN</TableColumn>
            <TableColumn>STATUS</TableColumn>
            <TableColumn>UPTIME</TableColumn>
            <TableColumn>TOTAL PLAYS</TableColumn>
            <TableColumn>ERRORS</TableColumn>
            <TableColumn>SIGNAL</TableColumn>
            <TableColumn>ACTIONS</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((screen) => (
              <TableRow key={screen.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-gray-900">{screen.screenName}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {screen.screenId} • {screen.location}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{renderStatusChip(screen.status)}</TableCell>
                <TableCell>{renderUptime(screen.uptime)}</TableCell>
                <TableCell>
                  <span className="text-gray-700 font-medium">{screen.totalPlays.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-orange-600 font-medium">{screen.errors}</span>
                </TableCell>
                <TableCell>{renderSignal(screen.signal)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      className="border border-gray-300 bg-white"
                      size="sm"
                      startContent={<Eye size={14} />}
                      onPress={() => handleDetails(screen)}
                    >
                      Details
                    </Button>
                    <Button
                      className="bg-[#D12027] text-white"
                      size="sm"
                      startContent={<FileText size={14} />}
                      onPress={() => handleReport(screen)}
                    >
                      Report
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
