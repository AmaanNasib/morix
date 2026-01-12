import { Card, CardBody, Tab, Tabs, useDisclosure } from "@heroui/react";
import { Activity, Ban, Monitor, Plus, Wifi } from "lucide-react";
import { useEffect, useState } from "react";

import { ActivityLogsTable } from "./activityLogs/activityLogsTable";
import { RoleManagementTable } from "./roleManagement/roleManagementTable";
import TeamMembersForm from "./teamMembers/teamMembersForm";
import { TeamMembersTable } from "./teamMembers/teamMembersTable";

import { Profile2user, Shield, } from "@/assets/index.js";
import Ribbon from "@/assets/ribbon.png";
import { CustomCard } from "@/components/CustomeCard";
import GradientBanner from "@/components/gradient-banner";
import DefaultLayout from "@/layouts/default";
import { CardData } from "@/components/CustomeCard";

const cardDataList: CardData[] = [
    {
        id: 5,
        type: "secondary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: "2,309",
        secondaryText: "TOTAL USERS",
        bottomTag: "Active 3 groups",
        color: "#3B5DE7",
    },
    {
        id: 6,
        type: "secondary",
        icon: <Wifi className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "ACTIVE USERS",
        bottomTag: "Online",
        trend: { value: "12.5%", direction: "down" },
        color: "#3CB371",
    },
    {
        id: 7,
        type: "secondary",
        icon: <Ban className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "ADMIN USERS",
        bottomTag: "Issue require attention",
        trend: { value: "12.5%", direction: "down" },
        color: "#F79009",
    },
    {
        id: 7,
        type: "secondary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "SECURITY EVENT",
        bottomTag: "Pending",
        trend: { value: "12.5%", direction: "down" },
        color: "#6C63FF",
    },

];



export const UsersRoles = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [activeTab, setActiveTab] = useState<string | number>('team');
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        setTotalCount(0)
    }, []);


    return (
        <DefaultLayout>
            <div className="space-y-4">
                <div className="relative ">
                    {/* Gradient Banner */}
                    <div className="">
                        <GradientBanner
                            backgroundImage={Ribbon}
                            buttons={[
                                {
                                    label: "Add Team Member",
                                    icon: <Plus size={18} />,
                                    variant: "white",
                                    onClick: onOpen,
                                },
                            ]}
                            // chips={[
                            //     { label: "3 Online", color: "#22c55e" },
                            //     { label: "1 Offline", color: "#ef4444" },
                            // ]}
                            icon={<Monitor color="#CD1E2F" size={22} />}
                            subtitle="Manage team members, roles, and permissions across your digital signage platform"
                            title="User & Roles Management"
                            totalLabel="Total: 4 screens"
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
                        onSelectionChange={(key) => setActiveTab(key)}
                    >
                        <Tab
                            key="team"
                            title={
                                <div className="flex items-center justify-center gap-2">
                                    <Profile2user className="w-4 h-4" />
                                    <span>Team Members</span>
                                    <span className="text-xs font-semibold bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
                                        {totalCount || 0}
                                    </span>
                                </div>
                            }
                        >
                            <Card>
                                <CardBody className="p-6">
                                    <TeamMembersTable />
                                </CardBody>
                            </Card>
                        </Tab>

                        <Tab
                            key="role"
                            title={
                                <div className="flex items-center justify-center gap-2">
                                    <Shield className="w-4 h-4" />
                                    <span>Role Permissions</span>
                                </div>
                            }
                        >
                            <RoleManagementTable />
                        </Tab>

                        <Tab
                            key="activity"
                            title={
                                <div className="flex items-center justify-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    <span>Activity Logs</span>
                                    <span className="text-xs font-semibold bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
                                        {totalCount || 0}
                                    </span>
                                </div>
                            }
                        >
                            <Card>
                                <CardBody className="p-6">
                                    <ActivityLogsTable />
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>


            </div>
            {isOpen && (
                <TeamMembersForm
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            )}

        </DefaultLayout>
    )
}; 