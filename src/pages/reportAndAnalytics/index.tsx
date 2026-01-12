import { useState } from "react";
import { Monitor, FileText, Plus, TrendingUp } from "lucide-react";
import { Tabs, Tab } from "@heroui/react";


import OverviewPage from "./overview/overview";
import ScreenPerformancePage from "./screenPerformance/screenPerformance";
import MediaUsagePage from "./mediaUsage/mediaUsage";
import SystemEventsPage from "./systemEvents/systemEvents";
import GenerateReport from "./generateReport/generateReport";

import DefaultLayout from "@/layouts/default";
import { CustomCard } from "@/components/CustomeCard";
import GradientBanner from "@/components/gradient-banner";
import { ribbon } from "@/assets/index.js";

const totalLabel = "5 scheduled reports";

const cardDataList = [
  {
    id: 1,
    type: "primary" as const,
    icon: <FileText className="w-5 h-5" />,
    primaryText: "835",
    secondaryText: "Total Screens",
    trend: { value: "15.2%", direction: "up" as const },
    color: "#3B82F6",
  },
  {
    id: 2,
    type: "primary" as const,
    icon: <Monitor className="w-5 h-5" />,
    primaryText: "85",
    secondaryText: "Average Uptime",
    trend: { value: "8.5%", direction: "up" as const },
    color: "#12B76A",
  },
  {
    id: 3,
    type: "primary" as const,
    icon: <TrendingUp className="w-5 h-5" />,
    primaryText: "89",
    secondaryText: "Total Plays",
    trend: { value: "12.3%", direction: "down" as const },
    color: "#FF9700",
  },
  {
    id: 4,
    type: "primary" as const,
    icon: <FileText className="w-5 h-5" />,
    primaryText: "17",
    secondaryText: "Total Errors",
    trend: { value: "5.1%", direction: "up" as const },
    color: "#00C7BE",
  },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<string | number>("overview");
  const [isGenerateReportOpen, setIsGenerateReportOpen] = useState(false);

  const buttons = [
    {
      label: "Generate Report",
      icon: <Plus size={18} />,
      variant: "white" as const,
      onClick: () => {
        setIsGenerateReportOpen(true);
      },
    },
  ];

  return (
    <div>
      <DefaultLayout>
        {/* Gradient Banner */}
        <GradientBanner
          backgroundImage={ribbon}
          buttons={buttons}
          icon={<Monitor color="#CD1E2F" size={22} />}
          subtitle="Generate comprehensive reports and analytics for your digital signage network"
          title="Reports & Analytics"
          totalLabel={totalLabel}
        />

        {/* Card List */}
        <div className="relative z-[2] mt-4 sm:-mt-2 md:-mt-6 lg:-mt-12 px-4 sm:px-6 md:px-8 mx-auto flex flex-wrap lg:flex-nowrap justify-center md:justify-between gap-4 md:gap-6 overflow-x-auto lg:overflow-visible">
          {cardDataList.map((card) => (
            <div
              key={card.id}
              className="w-full sm:w-[48%] lg:w-[23%] flex-shrink-0"
            >
              <CustomCard data={card} />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex w-full flex-col px-8 my-6">
          <Tabs
            aria-label="Options"
            classNames={{
              tabList:
                "bg-default-100 w-full flex justify-between rounded-full p-1 shadow-sm h-9",
              tab: "flex-1 rounded-full h-8 data-[hover=true]:bg-white/70 data-[selected=true]:bg-white font-semibold text-gray-800 transition-all",
              cursor: "hidden",
            }}
            radius="lg"
            selectedKey={activeTab}
            variant="light"
            onSelectionChange={setActiveTab}
          >
            <Tab key="overview" title="Overview">
              <OverviewPage />
            </Tab>
            <Tab key="screenPerformance" title="Screen Performance">
              <ScreenPerformancePage />
            </Tab>
            <Tab key="mediaUsage" title="Media Usage">
              <MediaUsagePage />
            </Tab>
            <Tab key="systemEvents" title="System Events">
              <SystemEventsPage />
            </Tab>
          </Tabs>
        </div>
      </DefaultLayout>

      {/* Generate Report Modal */}
      <GenerateReport
        isOpen={isGenerateReportOpen}
        onOpenChange={setIsGenerateReportOpen}
      />
    </div>
  );
}

