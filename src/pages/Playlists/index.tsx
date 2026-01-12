import { Card, CardBody, useDisclosure } from "@heroui/react";
import { FileVideoCamera, FolderDown, FolderOpen, Monitor, Plus, Settings, SquarePlay } from "lucide-react";
// import { useState } from "react";


import PlayListManagementForm from "./playListManagementForm";
import { PlaylistManagementTable } from "./playListManagementTable";

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
        icon: <FolderOpen className="w-5 h-5" />,
        primaryText: "835",
        secondaryText: "TOTAL PLAYLISTS",
        bottomTag: "Active 3 groups",
        trend: { value: "12.5%", direction: "down" },
        color: "#3B5DE7",
    },
    {
        id: 6,
        type: "primary",
        icon: <SquarePlay className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "ACTIVE PLAYLISTS",
        bottomTag: "Online",
        trend: { value: "12.5%", direction: "down" },
        color: "#3CB371",
    },
    {
        id: 7,
        type: "primary",
        icon: <FileVideoCamera className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "CONTENT ITEMS",
        bottomTag: "Issue require attention",
        trend: { value: "12.5%", direction: "down" },
        color: "#F79009",
    },
    {
        id: 7,
        type: "primary",
        icon: <FolderDown className="w-5 h-5" />,
        primaryText: "22",
        secondaryText: "ASSIGNED",
        bottomTag: "Pending",
        trend: { value: "12.5%", direction: "down" },
        color: "#00C7BE",
    },
];

const chipsData = [
    { label: "3 Active Licenses", color: "#3CB371" },
    { label: "41 Expiring Licenses", color: "#CD1E2F" },
];




export default function Playlists() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    // const [activeTab, setActiveTab] = useState('team');
    // const [totalCount, setTotalCount] = useState(0);

    // Button data
    const buttons: ButtonConfig[] = [
        {
            label: "Settings",
            variant: "transparent",
            icon: <Settings className="w-5 h-5" stroke="currentColor" />,
        },
        {
            label: "Create Playlist",
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
                            icon={<Monitor color="#CD1E2F" size={22} />}
                            subtitle="Create and manage content playlists for your digital displays"
                            title="Playlists"
                            totalLabel="Total: 4 screens "
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
                    <Card>
                        <CardBody className="p-6">
                            {/* <TeamMembersTable /> */}
                            <PlaylistManagementTable />
                        </CardBody>
                    </Card>
                </div>


            </div>
            {isOpen && (
                <PlayListManagementForm
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                />
            )}

        </DefaultLayout>
    )
}; 