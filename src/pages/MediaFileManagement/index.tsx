import { useEffect, useCallback } from "react";
import { Button } from "@heroui/react";
import { Monitor, RotateCcw, Plus, Folder, Image, Video, FolderOpen, Speaker, Search, Archive, Usb, Coffee } from "lucide-react";
import { useState } from "react";


import MediaGrid from "./mediaGrid/media-grid";
import UploadMedia from "./uploadMedia/upload-media";

import { ribbon, Export } from "@/assets/index.js";
import GradientBanner from "@/components/gradient-banner";
import DefaultLayout from "@/layouts/default";
import { CustomCard } from "@/components/CustomeCard";
import TextInput from "@/components/InputController/text-input";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import CalendarInput from "@/components/InputController/calendar-input";
import { ButtonConfig } from "@/components/gradient-banner";
import { CardData } from "@/components/CustomeCard";
import { getMediaList } from "@/services/mediaFileManagement";




// chips
const chips = [{ label: "3 Active", color: "#3CB371" }, { label: "1 Inactive", color: "#B52A2A" }];
// Total Label
const totalLabel = "Total: 4 Screens";

// Card Data
const cardDataList: CardData[] = [
    {
        id: 1,
        type: "primary",
        icon: <Folder className="w-5 h-5" />,
        primaryText: 85,
        secondaryText: "Total Files",
        trend: { value: "12.5%", direction: "down" },
        color: "#3B82F6",
    },
    {
        id: 2,
        type: "primary",
        icon: <Image className="w-5 h-5" />,
        primaryText: 85,
        secondaryText: "Images",
        trend: { value: "10.5%", direction: "up" },
        color: "#12B76A",
    },
    {
        id: 3,
        type: "primary",
        icon: <Video className="w-5 h-5" />,
        primaryText: 95,
        secondaryText: "Videos",
        trend: { value: "12.5%", direction: "down" },
        color: "#FF9700",
    },
    {
        id: 4,
        type: "primary",
        icon: <FolderOpen className="w-5 h-5" />,
        primaryText: 205,
        secondaryText: "Storage Available",
        trend: { value: "12.5%", direction: "up" },
        color: "#00C7BE",
    },
    {
        id: 5,
        type: "primary",
        icon: <Speaker className="w-5 h-5" />,
        primaryText: 205,
        secondaryText: "Storage Used",
        trend: { value: "12.5%", direction: "up" },
        color: "#6C63FF",
    },
];

export default function MediaFileManagement() {
    const [search, setSearch] = useState<string>("");
    const [status, setStatus] = useState("");
    const [source, setSource] = useState("");
    const [uploadDate, setUploadDate] = useState<string | Date>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [active, setActive] = useState<number>(1);


    // Folders data
    const folders = [
        { id: 1, name: "All Media", count: 6, icon: <FolderOpen className="h-5 w-5" /> },
        { id: 2, name: "Images", count: 6, icon: <Image className="h-5 w-5" /> },
        { id: 3, name: "Videos", count: 6, icon: <Video className="h-5 w-5" /> },
        { id: 4, name: "Archives", count: 6, icon: <Archive className="h-5 w-5" /> },
        { id: 5, name: "USB Media", count: 6, icon: <Usb className="h-5 w-5" /> },
        { id: 6, name: "Food & Beverages", count: 6, icon: <Coffee className="h-5 w-5" /> },
    ];

    // Buttons
    const buttons: ButtonConfig[] = [
    {
        label: "Refresh",
        variant: "transparent",
        icon: <RotateCcw size={18} />
    },
    {
        label: "Export",
        variant: "transparent",
        icon: <Export className="logo-icon-white"  />
    },
    {
        label: "Upload Media",
        variant: "white",
        icon: <Plus size={18} />,
        onClick: () => setIsModalOpen(true),
    }
];

    // Handles
    const handleSearchChangeDropdown = () => { };
    const fetchDropdownData = () => { };

    // Usecallbacks
    const fetchMedialData = useCallback(async() => {
        const response = await getMediaList();

        console.log(response);
     }, []);

    // Use Effects
    useEffect(() => {
        fetchMedialData();
    },[])

    return (
        <div>
            <DefaultLayout>

                {/* Gradient Banner */}
                <GradientBanner
                    backgroundImage={ribbon}
                    buttons={buttons}
                    chips={chips}
                    icon={<Monitor color="#CD1E2F" size={22} />}
                    subtitle="Upload, organize, and manage your media content"
                    title="Media File Management"
                    totalLabel={totalLabel}
                />

                {/* Card List */}
                {/* <div className="relative z-[2] -mt-16 px-8 mx-auto flex justify-between gap-6 overflow">
                    {cardDataList.map((card) => (
                        <div key={card.id} className="w-full lg:w-[326px] md:w-[280px] sm:w-full">
                            <CustomCard data={card} />
                        </div>
                    ))}
                </div> */}
                <div className="relative z-[2] mt-4 sm:-mt-2 md:-mt-6 lg:-mt-12 px-4 sm:px-6 md:px-8 mx-auto flex flex-wrap lg:flex-nowrap justify-center md:justify-between gap-4 md:gap-6 overflow-x-auto lg:overflow-visible">
                    {cardDataList.map((card) => (
                        <div
                            key={card.id}
                            className="w-full sm:w-[48%] lg:w-[18.5%] flex-shrink-0"
                        >
                            <CustomCard data={card} />
                        </div>
                    ))}
                </div>


                {/* Table Section */}
                <div className="mx-8">
                    <div className="mt-4 p-[24px] bg-white rounded-[16px] h-auto">
                        {/* Search & Filter */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 rounded-[16px] p-4 border border-gray-200 bg-gray-100">
                            {/* Search */}
                            <div className="col-span-1">
                                <TextInput
                                    icon={<Search className="w-5 h-5" />}
                                    label="Search"
                                    placeholder="Search by screen name, device type, or screen ID"
                                    type="search"
                                    value={search}
                                    onChange={setSearch}
                                />
                            </div>

                            {/* All Status */}
                            <div className="w-full">
                                <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="allStatus">All Status</label>
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
                                        setStatus(selectedOption.value)
                                    }
                                    id="allStatus"
                                    placeholder="All Status"
                                    value={status}
                                    onMenuOpen={() => fetchDropdownData()}
                                />
                            </div>

                            {/* All Sources */}
                            <div className="w-full">
                                <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="allSources">All Sources</label>
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
                                        setSource(selectedOption.value)
                                    }
                                    id="allSources"
                                    placeholder="All Sources"
                                    value={source}
                                    onMenuOpen={() => fetchDropdownData()}
                                />
                            </div>

                            {/* Upload Date */}
                            <div className="w-full">
                                <CalendarInput
                                    label="Upload Date"
                                    name="uploadDate"
                                    placeholder="Select Upload Date"
                                    value={uploadDate}
                                    onChange={(value) => setUploadDate(value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Folder and Media Section */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
                        {/* Left Section */}
                        <div className="w-full bg-white rounded-[16px] p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-800">
                                    <Folder className="h-6 w-6 text-red-500" />
                                    Folders
                                </h2>
                                <Button
                                    className="bg-gray-100 text-gray-800 hover:bg-gray-200"
                                    size="sm"
                                    startContent={<Plus className="h-4 w-4" />}
                                >
                                    Create Folder
                                </Button>
                            </div>

                            {/* Folder List */}
                            <div className="space-y-2">
                                {folders.map((folder) => (
                                    <button
                                        key={folder.id}
                                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all ${active === folder.id
                                            ? "bg-red-100 text-red-600"
                                            : "text-gray-600 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setActive(folder.id)}
                                    >
                                        <div className="flex items-center gap-2">
                                            {folder.icon}
                                            <span className="text-sm font-medium">{folder.name}</span>
                                        </div>
                                        <span
                                            className={`text-sm font-medium ${active === folder.id ? "text-red-500" : "text-gray-500"
                                                }`}
                                        >
                                            {folder.count}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right Section */}
                        <div className="w-full bg-white rounded-[16px] p-6">
                            {/* <p className="text-gray-800 font-medium">Content Section</p> */}
                            <MediaGrid />
                        </div>
                    </div>

                </div>

                {/* Modal */}
                {isModalOpen && <UploadMedia isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}

            </DefaultLayout>
        </div>
    );
}   