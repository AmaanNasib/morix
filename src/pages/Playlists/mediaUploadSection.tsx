import { Card, CardBody, Tab, Tabs } from "@heroui/react";

import MediaSection from "./mediaSection";
import Widgets from "./widgetSection";

interface MediaUploadSectionProps {
  activeTab: string | number;
  setActiveTab: (tab: string | number) => void;
}

export default function MediaUploadSection({
  activeTab,
  setActiveTab,
}: MediaUploadSectionProps) {
  return (
    <>
      <Tabs
        classNames={{
          tabList:
            "bg-default-100 w-full flex justify-between rounded-md p-1 shadow-sm h-9 ",
          tab: "flex-1 rounded-md h-8 data-[hover=true]:bg-white/70 data-[selected=true]:bg-white font-semibold text-red-500 transition-al px-0",
          cursor: "hidden",
          tabContent: "group-data-[selected=true]:text-red-500",
          panel: "px-0",
        }}
        radius="lg"
        selectedKey={activeTab}
        variant="light"
        onSelectionChange={(key) => setActiveTab(key)}
      >
        <Tab key="mediaSection" title="Media">
          <MediaSection />
        </Tab>
        <Tab key="widgetSection" title="Widgets">
          <Widgets />
          {/* <Card>
                        <CardBody className="p-6">
                            WIDGET
                        </CardBody>
                    </Card> */}
        </Tab>
        <Tab key="sequanceSection" title="Sequance">
          <Card>
            <CardBody className="p-6">SEQUANCE</CardBody>
          </Card>
        </Tab>
      </Tabs>
    </>
  );
}
