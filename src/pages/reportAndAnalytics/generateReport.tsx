import { useState } from "react";
import { Button, Checkbox, Select, SelectItem } from "@heroui/react";
import { X, Download, CirclePlay, Monitor, TrendingUp, AlertTriangle } from "lucide-react";

import { CustomModal } from "@/components/CustomModal";

interface GenerateReportProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ReportType {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const reportTypes: ReportType[] = [
  {
    id: "mediaUsage",
    label: "Media Usage",
    description: "Content playback and engagement",
    icon: <CirclePlay className="text-white" size={20} />,
    color: "bg-green-500",
  },
  {
    id: "screenPerformance",
    label: "Screen Performance",
    description: "Uptime and performance metrics",
    icon: <Monitor className="text-white" size={20} />,
    color: "bg-blue-500",
  },
  {
    id: "systemEvents",
    label: "System Events",
    description: "Activity logs and events",
    icon: <AlertTriangle className="text-white" size={20} />,
    color: "bg-orange-500",
  },
  {
    id: "analytics",
    label: "Analytics",
    description: "Comprehensive analytics overview",
    icon: <TrendingUp className="text-white" size={20} />,
    color: "bg-purple-500",
  },
];

const dateRangeOptions = [
  { key: "last7Days", label: "Last 7 Days" },
  { key: "last30Days", label: "Last 30 Days" },
  { key: "last90Days", label: "Last 90 Days" },
  { key: "last6Months", label: "Last 6 Months" },
  { key: "lastYear", label: "Last Year" },
  { key: "customRange", label: "Custom Range" },
];


const exportFormatOptions = [
  { key: "pdfReport", label: "PDF Report" },
  { key: "excelSpreadsheet", label: "Excel Spreadsheet" },
  { key: "csvFile", label: "CSV File" },
  { key: "jsonData", label: "JSON Data" },
];


const screenOptions = [
  "All Screens",
  "Mall Entrance Display",
  "Restaurant Menu Board",
  "Office Lobby Screen",
  "Retail Store Display",
  "Conference Room Screen",
  "Auditorium Projector",
];

const groupOptions = [
  "All Groups",
  "Retail Group A",
  "Retail Group B",
  "Food & Beverage",
  "Corporate Displays",
  "Outdoor Displays",
  "Indoor Displays",
];

export default function GenerateReport({ isOpen, onOpenChange }: GenerateReportProps) {
  const [selectedReportType, setSelectedReportType] = useState<string>("mediaUsage");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("Last 30 Days");
  const [selectedExportFormat, setSelectedExportFormat] = useState<string>("PDF Report");
  const [selectedScreens, setSelectedScreens] = useState<Set<string>>(new Set(["Mall Entrance Display"]));
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());

  const handleScreenToggle = (screen: string) => {
    const newSet = new Set(selectedScreens);

    if (newSet.has(screen)) {
      newSet.delete(screen);
    } else {
      newSet.add(screen);
    }
    setSelectedScreens(newSet);
  };

  const handleGroupToggle = (group: string) => {
    const newSet = new Set(selectedGroups);

    if (newSet.has(group)) {
      newSet.delete(group);
    } else {
      newSet.add(group);
    }
    setSelectedGroups(newSet);
  };

  const handleSelectAllScreens = () => {
    if (selectedScreens.has("All Screens") || selectedScreens.size === screenOptions.length - 1) {
      setSelectedScreens(new Set());
    } else {
      setSelectedScreens(new Set(screenOptions));
    }
  };

  const handleSelectAllGroups = () => {
    if (selectedGroups.has("All Groups") || selectedGroups.size === groupOptions.length - 1) {
      setSelectedGroups(new Set());
    } else {
      setSelectedGroups(new Set(groupOptions));
    }
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleGenerate = () => {
    // TODO: Implement report generation logic
    console.log("Generating report with:", {
      reportType: selectedReportType,
      dateRange: selectedDateRange,
      exportFormat: selectedExportFormat,
      screens: Array.from(selectedScreens),
      groups: Array.from(selectedGroups),
    });
    onOpenChange(false);
  };

  const selectedReportTypeData = reportTypes.find((type) => type.id === selectedReportType);

  // Header
  const header = () => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">Generate Custom Report</h2>
          <p className="text-sm text-gray-600 mt-1">
            Select criteria and filters to generate detailed analytics reports.
          </p>
        </div>
        <Button
          isIconOnly
          className="bg-transparent hover:bg-gray-100 min-w-0 w-8 h-8"
          onPress={() => onOpenChange(false)}
        >
          <X className="text-gray-500" size={18} />
        </Button>
      </div>
    );
  };

  // Body
  const body = () => {
    return (
      <div className="space-y-6">
        {/* Report Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block" htmlFor="reportType">Report Type</label>
          <Select
            classNames={{
              trigger: "bg-white border border-gray-300",
            }}
            id="reportType"
            selectedKeys={[selectedReportType]}
            startContent={
              selectedReportTypeData && (
                <div className={`${selectedReportTypeData.color} p-1.5 rounded-full flex items-center justify-center`}>
                  {selectedReportTypeData.icon}
                </div>
              )
            }
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;

              setSelectedReportType(selected);
            }}
          >
            {reportTypes.map((type) => (
              <SelectItem
                key={type.id}
                startContent={
                  <div className={`${type.color} p-1.5 rounded-full flex items-center justify-center`}>
                    {type.icon}
                  </div>
                }
                textValue={type.label}
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{type.label}</span>
                  <span className="text-xs text-gray-500">{type.description}</span>
                </div>
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Date Range */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block" htmlFor="dateRange">Date Range</label>
          <Select
            classNames={{
              trigger: "bg-white border border-gray-300",
            }}
            id="dateRange"
            selectedKeys={[selectedDateRange]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;

              setSelectedDateRange(selected);
            }}
          >
            {dateRangeOptions.map((option) => (
              <SelectItem key={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Export Format */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block" htmlFor="exportFormat">Export Format</label>
          <Select
            classNames={{
              trigger: "bg-white border border-gray-300",
            }}
            id="exportFormat"
            selectedKeys={[selectedExportFormat]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;

              setSelectedExportFormat(selected);
            }}
          >
            {exportFormatOptions.map((option) => (
              <SelectItem key={option.key}>
                {option.label}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* Select Screens */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block" htmlFor="screenSelection">Select Screens</label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto" id="screenSelection">
            <Checkbox
              classNames={{
                label: "text-sm text-gray-700",
              }}
              isSelected={selectedScreens.has("All Screens") || selectedScreens.size === screenOptions.length - 1}
              onValueChange={handleSelectAllScreens}
            >
              All Screens
            </Checkbox>
            {screenOptions.slice(1).map((screen) => (
              <Checkbox
                key={screen}
                classNames={{
                  label: "text-sm text-gray-700",
                }}
                isSelected={selectedScreens.has(screen)}
                onValueChange={() => handleScreenToggle(screen)}
              >
                {screen}
              </Checkbox>
            ))}
          </div>
        </div>

        {/* Select Groups */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block" htmlFor="groupSelection">Select Groups</label>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3 max-h-48 overflow-y-auto" id="groupSelection">
            <Checkbox
              classNames={{
                label: "text-sm text-gray-700",
              }}
              isSelected={selectedGroups.has("All Groups") || selectedGroups.size === groupOptions.length - 1}
              onValueChange={handleSelectAllGroups}
            >
              All Groups
            </Checkbox>
            {groupOptions.slice(1).map((group) => (
              <Checkbox
                key={group}
                classNames={{
                  label: "text-sm text-gray-700",
                }}
                isSelected={selectedGroups.has(group)}
                onValueChange={() => handleGroupToggle(group)}
              >
                {group}
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Footer
  const footer = () => {
    return (
      <div className="flex gap-3 justify-end">
        <Button
          className="border-[1px] border-gray-300 bg-white text-gray-700"
          onPress={handleCancel}
        >
          Cancel
        </Button>
        <Button
          className="bg-[#D12027] text-white"
          startContent={<Download size={18} />}
          onPress={handleGenerate}
        >
          Generate Report
        </Button>
      </div>
    );
  };

  return (
    <CustomModal
      body={body()}
      footer={footer()}
      header={header()}
      isOpen={isOpen}
      scrollable={true}
      size="lg"
      onOpenChange={onOpenChange}
    />
  );
}

