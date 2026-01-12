import { Monitor, Plus } from "lucide-react";
import { useEffect, useState } from "react";


import AddDevice from "./addDevice/add-device.tsx";
import { screenColumns } from "./tableColumnConfig.tsx";

import { Export, Folder2, SearchNormal1 } from "@/assets/index.js";
import { ribbon } from "@/assets/index.js";
import { CustomCard } from "@/components/CustomeCard";
import CustomTable from "@/components/CustomTable/custom-table.js";
import GradientBanner from "@/components/gradient-banner";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown.js";
import TextInput from "@/components/InputController/text-input";
import useTableControls from "@/hooks/useTableControls.js";
import DefaultLayout from "@/layouts/default";
import { ButtonConfig } from "@/components/gradient-banner";
import { CardData } from "@/components/CustomeCard";
import { getDevicesService } from "@/services/deviceManagement/index.ts";




const screenData = [
    {
        id: 1,
        screenName: "Reception Display",
        deviceType: "Android TV",
        screenId: "DS-001234",
        status: "Offline",
        location: "Reception",
        license: "Expired",
        playlist: "Hotel Lobby Playlist",
        lastSeen: "2 hours ago",
    },
    {
        id: 2,
        screenName: "Cafeteria Menu Board",
        deviceType: "Mobile",
        screenId: "DS-002468",
        status: "Online",
        location: "Cafeteria",
        license: "Active",
        playlist: "Restaurant Menu Loop",
        lastSeen: "1 hour ago",
    },
    {
        id: 3,
        screenName: "Conference Room Display",
        deviceType: "Smart Display",
        screenId: "DS-003691",
        status: "Online",
        location: "Conference Room",
        license: "Active",
        playlist: "Hotel Lobby Playlist",
        lastSeen: "30 minutes ago",
    },
    {
        id: 4,
        screenName: "Auditorium Screen",
        deviceType: "Android TV",
        screenId: "DS-002467",
        status: "Unpaired",
        location: "Office",
        license: "Expiring",
        playlist: "Restaurant Menu Loop",
        lastSeen: "20 minutes ago",
    },
    {
        id: 5,
        screenName: "Auditorium Screen",
        deviceType: "Android TV",
        screenId: "DS-002467",
        status: "Unpaired",
        location: "Office",
        license: "Expiring",
        playlist: "Restaurant Menu Loop",
        lastSeen: "20 minutes ago",
    },
];


const chipsData = [
    { label: "3 Active Groups", color: "#CD1E2F" },
    { label: "31 Total Devices", color: "#CD1E2F" },
];

const totalLabel = "2 unassigned Devices";

const cardDataList: CardData[] = [
    {
        id: 1,
        type: "primary",
        icon: <Folder2 className="w-5 h-5" />,
        primaryText: 835,
        secondaryText: "Total Devices",
        trend: { value: "12.5%", direction: "down" },
        color: "#3B82F6",
    },
    {
        id: 2,
        type: "primary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: 85,
        secondaryText: "Online Devices",
        trend: { value: "10.5%", direction: "up" },
        color: "#12B76A",
    },
    {
        id: 3,
        type: "primary",
        icon: <Monitor className="w-5 h-5" />,
        primaryText: 95,
        secondaryText: "Offline Devices",
        trend: { value: "12.5%", direction: "down" },
        color: "#FF9700",
    },
    {
        id: 4,
        type: "primary",
        icon: <Folder2 className="w-5 h-5" />,
        primaryText: 205,
        secondaryText: "Expiring Devices",
        trend: { value: "12.5%", direction: "up" },
        color: "#00C7BE",
    },
]



export default function DeviceManagement() {
    const [allScreen, setAllScreen] = useState("");
    const [status, setStatus] = useState("");
    const [orientation, setOrientation] = useState("");
    const [license, setLicense] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Button data
    const buttons: ButtonConfig[] = [
        {
            label: "Settings",
            variant: "transparent",
        },
        {
            label: "Export",
            variant: "transparent",
            icon: <Export className="logo-icon-white" />
        },
        {
            label: "Add Device",
            variant: "white",
            icon: <Plus className="w-5 h-5 text-red" stroke="currentColor" />,
            onClick: () => setIsModalOpen(true),
        }
    ];

    const getActions = (row: any) => [
        {
            label: "View",
            key: "view",
            onClick: () => {
                console.log(row);
            },
        },
        {
            label: "Edit",
            key: "edit",
            onClick: () => {
                console.log(row);
            },
        },
    ];

    const {
        page,
        pages,
        setPage,
        rowsPerPage,
        onRowsPerPageChange,
        totalItems,
        onSearchChange,
        selectedRowItem,
        isCustomFormModalOpen,
        setIsConfirmModalOpen,
        filterValue,
    } = useTableControls(screenData, screenData.length);

    const fetchDropdownData = () => { };

    const handleSearchChangeDropdown = (searchValue: string) => {
        if (typeof searchValue !== "string" || !searchValue) {
            console.error("Search value is not a string:", searchValue);

            return;
        }
        // Await the fetchDropdownData call inside useEffect
        fetchDropdownData();
    };

    // Use Effect to fetch devices on component mount
    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await getDevicesService();
                
                console.log(response);
            } catch (error) {
                console.error("Error fetching devices:", error);
            }
        };

        fetchDevices();
    }, []);

    return (
        <div>
            <DefaultLayout>

                {/* Gradient Banner */}
                <GradientBanner
                    backgroundImage={ribbon}
                    buttons={buttons}
                    chips={chipsData}
                    icon={<Monitor color="#CD1E2F" size={22} />}
                    subtitle="Monitor, configure, and manage all connected digital signage screens"
                    title="Device Management"
                    totalLabel={totalLabel}
                />

                {/* Card List */}
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


                {/* Table Section */}
                <div className="mx-8 mt-4 p-[24px] bg-white rounded-[16px] h-auto">
                    {/* Search & Filter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 rounded-[16px] p-4 border border-gray-200 bg-gray-100">
                        <div className="col-span-1">
                            <TextInput
                                icon={<SearchNormal1 className="w-5 h-5" />}
                                label="Search"
                                placeholder="Search by screen name, device type, or screen ID"
                                type="search"
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-800" htmlFor="allScreen">All Screens</label>
                            <ReactSelectDropdown
                                data={[
                                    { value: "Active", label: "Active" },
                                    { value: "Inactive", label: "Inactive" },
                                    { value: "Unpaired", label: "Unpaired" },
                                ]}
                                error=""
                                field={{ label: "filled" }}
                                fieldName="label"
                                handleSearchChange={handleSearchChangeDropdown}
                                handleSelectChange={(selectedOption: { value: string }) =>
                                    setAllScreen(selectedOption.value)
                                }
                                id="allScreen"
                                placeholder="All Screens"
                                value={allScreen}
                                onMenuOpen={() => fetchDropdownData()}
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-800" htmlFor="status">All Status</label>
                            <ReactSelectDropdown
                                data={[
                                    { value: "Offline", label: "Offline" },
                                    { value: "Online", label: "Online" },
                                    { value: "Unpaired", label: "Unpaired" },
                                ]}
                                error=""
                                field={{ label: "filled" }}
                                fieldName="label"
                                handleSearchChange={handleSearchChangeDropdown}
                                handleSelectChange={(selectedOption: { value: string }) =>
                                    setStatus(selectedOption.value)
                                }
                                id="status"
                                placeholder="All Status"
                                value={status}
                                onMenuOpen={() => fetchDropdownData()}
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-800" htmlFor="orientation">All Orientation</label>
                            <ReactSelectDropdown
                                data={[
                                    { value: "Landscape", label: "Landscape" },
                                    { value: "Portrait", label: "Portrait" },
                                    { value: "Flipped", label: "Flipped" },
                                ]}
                                error=""
                                field={{ label: "filled" }}
                                fieldName="label"
                                handleSearchChange={handleSearchChangeDropdown}
                                handleSelectChange={(selectedOption: { value: string }) =>
                                    setOrientation(selectedOption.value)
                                }
                                id="orientation"
                                placeholder="All Orientation"
                                value={orientation}
                                onMenuOpen={() => fetchDropdownData()}
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-800" htmlFor="license">All Licenses</label>
                            <ReactSelectDropdown
                                data={[
                                    { value: "Active", label: "Active" },
                                    { value: "Expiring", label: "Expiring" },
                                    { value: "Expired", label: "Expired" },
                                ]}
                                error=""
                                field={{ label: "filled" }}
                                fieldName="label"
                                handleSearchChange={handleSearchChangeDropdown}
                                handleSelectChange={(selectedOption: { value: string }) =>
                                    setLicense(selectedOption.value)
                                }
                                id="license"
                                placeholder="All Licenses"
                                value={license}
                                onMenuOpen={() => fetchDropdownData()}
                            />
                        </div>
                    </div>


                    {/* Table */}
                    <div className="mt-[10px] border-[1px] border-gray-200 rounded-[16px] p-[16px]">
                        <CustomTable
                            columns={screenColumns}
                            filterValue={filterValue}
                            isCustomFormModalOpen={isCustomFormModalOpen}
                            isSelectable={true}
                            page={page}
                            pages={pages}
                            rowActions={getActions}
                            rowsPerPage={rowsPerPage}
                            selectedRowItem={selectedRowItem}
                            setIsConfirmModalOpen={setIsConfirmModalOpen}
                            setPage={setPage}
                            tableData={screenData}
                            totalItems={totalItems}
                            onRowsPerPageChange={onRowsPerPageChange}
                            onSearchChange={onSearchChange}
                        />
                    </div>
                </div>

                {/* Modal */}
                <AddDevice isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            </DefaultLayout>
        </div>
    );
}