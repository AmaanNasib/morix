import { useState } from "react";
// @ts-ignore
import { Tabs, Tab } from "@heroui/react";

import OverviewPage from "./overview/overview";
import KnowledgeBasePage from "./knowledgeBase/knowledgeBase";
import VideoTutorialsPage from "./videoTutorials/videoTutorials";
import SupportTicketsPage from "./supportTickets/supportTickets";
import ContactPage from "./contact/contact";
import SystemStatusPage from "./systemStatus/systemStatus";

import { NotificationBing, Book, Video, MessageCircle } from "@/assets/index.js";
import { CustomCard } from "@/components/CustomeCard";
import DefaultLayout from "@/layouts/default";

// Feature Cards Data
const featureCards = [
  {
    id: 1,
    type: "primary" as const,
    icon: <Book className="w-5 h-5 logo-icon-white" />,
    primaryText: "3",
    secondaryText: "articles",
    color: "#D12027",
  },
  {
    id: 2,
    type: "primary" as const,
    icon: <Video className="w-5 h-5 logo-icon-white" />,
    primaryText: "2",
    secondaryText: "videos",
    color: "#3B82F6",
  },
  {
    id: 3,
    type: "primary" as const,
    icon: <Video className="w-5 h-5 logo-icon-white" />,
    primaryText: "2",
    secondaryText: "active tickets",
    color: "#F79009",
  },
  {
    id: 4,
    type: "primary" as const,
    icon: <MessageCircle className="w-5 h-5 logo-icon-white" />,
    primaryText: "Get instant",
    secondaryText: "help",
    color: "#12B76A",
  },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div>
      <DefaultLayout>
        {/* Header */}
        <div className="flex w-full flex-col sm:flex-row px-4 sm:px-6 md:px-8 my-4 sm:my-6 items-start sm:items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-[40px] sm:h-[40px] bg-[#D12027] rounded-[10px] flex items-center justify-center text-white flex-shrink-0">
            <NotificationBing className="w-4 h-4 sm:w-[18px] sm:h-[18px] logo-icon-white" style={{ stroke: "currentColor" }} />
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-semibold">Help & Support</h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Find answers, tutorials, and get in touch with our support team
            </p>
          </div>
        </div>

        {/* Card List */}
        <div className="relative z-[2] mt-4 px-4 sm:px-6 md:px-8 mx-auto flex flex-wrap lg:flex-nowrap justify-center md:justify-between gap-4 md:gap-6 overflow-x-auto lg:overflow-visible">
          {featureCards.map((card) => (
            <div
              key={card.id}
              className="w-full sm:w-[48%] lg:w-[23%] flex-shrink-0"
            >
              <CustomCard data={card} />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white mx-4 sm:mx-6 md:mx-8 rounded-[14px] shadow-xs p-4 sm:p-6 md:p-8 mt-4 sm:mt-6">
          <Tabs
            aria-label="Help & Support Tabs"
            classNames={{
              base: "w-full",
              tabList:
                "bg-default-100 w-full flex rounded-full p-1 shadow-sm h-9 sm:h-10 overflow-x-auto gap-1 sm:justify-between",
              tab: "flex-shrink-0 sm:flex-1 rounded-full h-7 sm:h-8 data-[hover=true]:bg-white/70 data-[selected=true]:bg-white font-semibold text-gray-800 transition-all text-[10px] xs:text-xs sm:text-sm px-2 sm:px-3 md:px-4 whitespace-nowrap",
              cursor: "hidden",
            }}
            radius="lg"
            selectedKey={activeTab}
            variant="light"
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tab key="overview" title="Overview">
              <OverviewPage />
            </Tab>
            <Tab key="knowledgeBase" title="Knowledge Base">
              <KnowledgeBasePage />
            </Tab>
            <Tab key="videoTutorials" title="Video Tutorials">
              <VideoTutorialsPage />
            </Tab>
            <Tab key="supportTickets" title="Support Tickets">
              <SupportTicketsPage />
            </Tab>
            <Tab key="contact" title="Contact">
              <ContactPage />
            </Tab>
            <Tab key="systemStatus" title="System Status">
              <SystemStatusPage />
            </Tab>
          </Tabs>
        </div>
      </DefaultLayout>
    </div>
  );
}
