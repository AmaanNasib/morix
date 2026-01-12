import { Card, CardBody, Tab, Tabs, useDisclosure } from "@heroui/react";
import { Ban, Monitor, OctagonAlert, Plus, Wallet, Wifi } from "lucide-react";
import { useState } from "react";

import { OverviewManagementTable } from "./overviewManagement/overviewManagementTable";
import { RenewalRequestTable } from "./renewalRequestManagement/renewalRequestTable";

import { Shield } from "@/assets/index.js";
import Ribbon from "@/assets/ribbon.png";
import { CustomCard } from "@/components/CustomeCard";
import GradientBanner from "@/components/gradient-banner";
import DefaultLayout from "@/layouts/default";
import { ButtonConfig } from "@/components/gradient-banner";
import { CardData } from "@/components/CustomeCard";

const cardDataList: CardData[] = [
    {
        id: 5,
        type: "primary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: "835",
        secondaryText: "TOTAL SCREENS",
        bottomTag: "Active 3 groups",
        trend: { value: "12.5%", direction: "down" },
        color: "#3B5DE7",
    },
    {
        id: 6,
        type: "primary",
        icon: <Wifi className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "ACTIVE LICENSES",
        bottomTag: "Online",
        trend: { value: "12.5%", direction: "down" },
        color: "#3CB371",
    },
    {
        id: 7,
        type: "primary",
        icon: <Ban className="w-5 h-5" />,
        primaryText: "85",
        secondaryText: "PENDING REQUESTS",
        bottomTag: "Issue require attention",
        trend: { value: "12.5%", direction: "down" },
        color: "#F79009",
    },
    {
        id: 7,
        type: "primary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "EXPIRING LICENSES",
        bottomTag: "Pending",
        trend: { value: "7.5%", direction: "up" },
        color: "#F04438",
    },

];

const chipsData = [
    { label: "3 Active Licenses", color: "#3CB371" },
    { label: "41 Expiring Licenses", color: "#CD1E2F" },
];



export default function LicenseManagementPage() {
    const {  onOpen } = useDisclosure();

    const [activeTab, setActiveTab] = useState<string>('overview');
    // const [totalCount, setTotalCount] = useState(0);

    // Button data
    const buttons: ButtonConfig[] = [
        {
            label: "Alerts",
            variant: "transparent",
            icon: <OctagonAlert className="w-5 h-5" stroke="currentColor" />,
        },
        {
            label: "Other Licenses",
            variant: "white",
            icon: <Plus className="w-5 h-5 text-red" stroke="currentColor" />,
            onClick: onOpen,
        }
    ];


    return (
        <DefaultLayout>
            <div className="space-y-4">
                <div className="relative ">
                    {/* Gradient Banner */}
                    <div className="">
                        <GradientBanner
                            backgroundImage={Ribbon}
                            buttons={buttons}
                            chips={chipsData}
                            icon={<Wallet color="#CD1E2F" size={22} />}
                            subtitle="Smart Control for Every License."
                            title="License Management"
                            totalLabel="10 Unassigned Licenses"
                        />
                    </div>

                    {/* Card Section */}
                    <div className="relative z-[2] mt-4 sm:-mt-2 md:-mt-6 lg:-mt-12 px-4 sm:px-6 md:px-8 mx-auto flex flex-wrap justify-center md:justify-between gap-4 md:gap-6">
                        {cardDataList.map((card) => (
                            <div
                                key={card.id}
                                className="w-full sm:w-[48%] lg:w-[23%] flex-shrink-0"
                            >
                                <CustomCard data={card} />
                            </div>
                        ))}
                    </div>

                </div>

                <div className="flex w-full flex-col px-8">
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
                        onSelectionChange={(key) => setActiveTab(key as string)}
                    >
                        <Tab
                            key="overview"
                            title={
                                <div className="flex items-center justify-center gap-2">
                                    <Monitor className="w-4 h-4" />
                                    <span>Overview</span>
                                </div>
                            }
                        >
                            <Card>
                                <CardBody className="p-6">
                                    <OverviewManagementTable />
                                </CardBody>
                            </Card>
                        </Tab>

                        <Tab
                            key="renewalRequest"
                            title={
                                <div className="flex items-center justify-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    <span>Renewal Request</span>
                                </div>
                            }
                        >
                            <Card>
                                <CardBody className="p-6">
                                    <RenewalRequestTable />
                                </CardBody>
                            </Card>
                        </Tab>

                    </Tabs>
                </div>


            </div>
            {/* {isOpen && (
                <TeamMembersForm
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onOpenChange={onOpenChange}
                />
            )} */}

        </DefaultLayout>
    )
}; 