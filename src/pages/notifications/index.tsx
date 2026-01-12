import { BellRing } from "lucide-react";
import {Tabs, Tab, Button} from "@heroui/react";
import { useState } from "react";

import AllNotification from "./all/allNotification";
import Critical from "./critical/critical";
import Device from "./device/device";
import License from "./license/license";
import Starred from "./starred/starred";
import Security from "./security/security";
import Unread from "./unread/unread";

import DefaultLayout from "@/layouts/default";
import { Notification, InfoCircle, Layer, Star, RecordCircle, TickCircle } from "@/assets/index.js";
import { CardData, CustomCard } from "@/components/CustomeCard";
import TextInput from "@/components/InputController/text-input";




const cardDataList: CardData[] = [
    {
        id: 1,
        type: "primary",
        icon: <Notification className="w-5 h-5 logo-icon-white" />,
        primaryText: 7,
        secondaryText: "Total Notifications",
        color: "#D12027",
    },
    {
        id: 2,
        type: "primary",
        icon: <BellRing className="w-5 h-5" />,
        primaryText: 3,
        secondaryText: "Unread",
        color: "#F79009",
    },
    {
        id: 3,
        type: "primary",
        icon: <InfoCircle className="w-5 h-5 logo-icon-white" />,
        primaryText: 2,
        secondaryText: "Critical Alerts",
        color: "#F04438",
    },
    {
        id: 4,
        type: "primary",
        icon: <Star className="w-5 h-5 logo-icon-white" />,
        primaryText: 1,
        secondaryText: "Starred",
        color: "#2B7FFF",
    },
    {
        id: 5,
        type: "primary",
        icon: <RecordCircle className="w-5 h-5 logo-icon-white" />,
        primaryText: 3,
        secondaryText: "Action Required",
        color: "#12B76A",
    }
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState<string | number>("all");

  return (
    <DefaultLayout>
      <div className="p-[32px]">

        {/* Setting top */}
        <div className="flex gap-[12px]">
          <div className="h-[40px] min-w-[40px] rounded-[10px] bg-primary flex items-center justify-center">
            <Notification className="logo-icon-white" />
          </div>
          <div>
            <h1 className="text-base font-medium">Advanced Notifications & Alerts</h1>
            <p className="text-base font-regular text-gray-600">Comprehensive notification management with real-time monitoring and advanced controls</p>
          </div>
        </div>

        {/* Setting Cards */}
        <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
          {cardDataList.map((cardData) => (
            <CustomCard key={cardData.id} data={cardData} />
          ))}
        </div>

        {/* Setting Body */}
        <div className="bg-white mt-6 rounded-[14px] p-4 border-[1px] border-gray-300 shadow-xs">
          <div className="flex justify-between items-center">
             <Tabs
            aria-label="Help & Support Tabs"
            classNames={{
              base: "min-w-[531.11px]",
              tabList:
                "bg-default-100 flex rounded-full p-1 shadow-sm h-9 sm:h-10 overflow-x-auto gap-1 sm:justify-between",
              tab: "flex-shrink-0 sm:flex-1 rounded-full h-7 sm:h-8 data-[hover=true]:bg-white/70 data-[selected=true]:bg-white font-semibold text-gray-800 transition-all text-[10px] xs:text-xs sm:text-sm px-2 sm:px-3 md:px-4 whitespace-nowrap",
              cursor: "hidden",
            }}
            radius="lg"
            selectedKey={activeTab}
            variant="light"
            onSelectionChange={(key) => setActiveTab(key as string)}
          >
            <Tab key="all" title="All"/>
            <Tab key="unread" title="Unread"/>
            <Tab key="critical" title="Critical" />
            <Tab key="starred" title="Starred"/>
            <Tab key="license" title="License"/>
            <Tab key="device" title="Device"/>
            <Tab key="security" title="Security"/>
          </Tabs>
          <div className="flex gap-2">
            <Button className="rounded-[8px] bg-transparent border-[1px] border-gray-300"><Layer />Bulk Actions</Button>
            <Button className="rounded-[8px] bg-transparent border-[1px] border-gray-300"><TickCircle />Mark All Read</Button>
          </div>
          </div>
          <div>
            <TextInput
            name="search"
            
            />
          </div>
          <div>
            {activeTab === "all" && <AllNotification />}
            {activeTab === "unread" && <Unread />}
            {activeTab === "critical" && <Critical />}
            {activeTab === "starred" && <Starred />}
            {activeTab === "license" && <License />}
            {activeTab === "device" && <Device />}
            {activeTab === "security" && <Security />}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

