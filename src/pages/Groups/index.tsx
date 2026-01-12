import { useEffect, useMemo, useState } from "react";
import { Monitor, Plus, FolderOpen, FolderOpenDot, Search, LayoutGrid, List, Edit, Eye } from "lucide-react";
import { Button } from "@heroui/button";
import { useNavigate } from "react-router-dom";

import { groupDataColumnConfig } from "./groupDataColumnConfig";
import CreateGroup from "./createGroup/createGroup";

import GradientBanner from "@/components/gradient-banner";
import DefaultLayout from "@/layouts/default";
import { ribbon, Export } from "@/assets/index.js";
import { CustomCard } from "@/components/CustomeCard";
import TextInput from "@/components/InputController/text-input";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown.js";
import useTableControls from "@/hooks/useTableControls.js";
import CustomTable from "@/components/CustomTable/custom-table.js";
import { ButtonConfig } from "@/components/gradient-banner";
import { CardData } from "@/components/CustomeCard";

// Group data
const groupData = [
    {
        "id": 101,
        "sr": "01",
        "groupsName": "Mall Screens",
        "description": "All screens located in ...",
        "category": "Location",
        "screens": "14/15",
        "status": "Active",
        "playlist": "Holiday Camp",
        "updated": "2 hours ago"
    },
    {
        "id": 102,
        "sr": "02",
        "groupsName": "Mall Screens",
        "description": "All screens located in ...",
        "category": "Type",
        "screens": "6/8",
        "status": "Active",
        "playlist": "Holiday Camp",
        "updated": "1 hour ago"
    },
    {
        "id": 103,
        "sr": "03",
        "groupsName": "Mall Screens",
        "description": "All screens located in ...",
        "category": "Type",
        "screens": "12/12",
        "status": "Active",
        "playlist": "Holiday Camp",
        "updated": "30 minutes ago"
    },
    {
        "id": 104,
        "sr": "04",
        "groupsName": "Mall Screens",
        "description": "All screens located in ...",
        "category": "Location",
        "screens": "4/6",
        "status": "Active",
        "playlist": "Holiday Camp",
        "updated": "20 minutes ago"
    },
    {
        "id": 105,
        "sr": "05",
        "groupsName": "Mall Screens",
        "description": "All screens located in ...",
        "category": "Location",
        "screens": "14/15",
        "status": "Maintenance",
        "playlist": "Holiday Camp",
        "updated": "1 hour ago"
    }
];


const statusColorMap: Record<string, string> = {
    Active: "text-green-600 bg-green-100",
    Maintenance: "text-orange-600 bg-orange-100",
    Inactive: "text-gray-600 bg-gray-100",
};

export default function Groups() {
    const navigate = useNavigate();
    const [view, setView] = useState<"list" | "grid">("list");

    const [status, setStatus] = useState<string | number>("");
    const [assignment, setAssignment] = useState<string | number>("");
    const [search, setSearch] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Buttons
    const buttons: ButtonConfig[] = [
        {
            label: "Export",
            variant: "transparent",
            icon: <Export className="logo-icon-white" />
        },
        {
            label: "Read Docs",
            variant: "transparent"
        },
        {
            label: "Create Group",
            variant: "white",
            icon: <Plus className="w-5 h-5 text-red" stroke="currentColor" />,
            onClick: () => setIsModalOpen(true),
        }
    ];

    // Chips data
    const chipsData = [
        { label: "3 Active Groups", color: "#3CB371" },
        { label: "41 Total Screens", color: "#B52A2A" },
    ];

    // Total Labels
    const totalLabel = "2 unassigned Screens";

    // Card list data
    const cardDataList: CardData[] = [
        {
            id: 1,
            type: "primary",
            icon: <FolderOpen className="w-5 h-5" />,
            primaryText: 835,
            secondaryText: "Total Groups",
            trend: { value: "12.5%", direction: "down" },
            color: "#3B82F6",
        },
        {
            id: 2,
            type: "primary",
            icon: <Monitor className="w-5 h-5" />,
            primaryText: 85,
            secondaryText: "Active Screens",
            trend: { value: "10.5%", direction: "up" },
            color: "#12B76A",
        },
        {
            id: 3,
            type: "primary",
            icon: <Monitor className="w-5 h-5" />,
            primaryText: 85,
            secondaryText: "Offline Screens",
            trend: { value: "12.5%", direction: "down" },
            color: "#FF9700",
        },
        {
            id: 4,
            type: "primary",
            icon: <FolderOpenDot className="w-5 h-5" />,
            primaryText: 85,
            secondaryText: "Unassigned",
            trend: { value: "12.5%", direction: "up" },
            color: "#00C7BE",
        },
    ];

    // Derived collection
    const filteredGroups = useMemo(() => {
        return groupData.filter((item) => {
            const matchesSearch =
                !search ||
                item.groupsName.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase());

            const matchesStatus = status ? item.status === status : true;
            const matchesAssignment = assignment ? item.category === assignment : true;

            return matchesSearch && matchesStatus && matchesAssignment;
        });
    }, [assignment, search, status]);

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
    } = useTableControls(filteredGroups, filteredGroups.length);

    // Ensure pagination resets when filters change or results shrink
    useEffect(() => {
        setPage(1);
    }, [assignment, search, status, setPage]);

    useEffect(() => {
        if (page > pages) {
            setPage(1);
        }
    }, [page, pages, setPage]);

    // Handlers for dropdowns
    const handleSearchChangeDropdown = () => { };

    // Row Actions
    const getActions = (row: any) => [
        {
            label: "View",
            key: "view",
            onClick: () => {
                navigate(`/groups/view/${row.id}`, {replace: true});
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

    return (
        <div>
            <DefaultLayout>
                <GradientBanner
                    backgroundImage={ribbon}
                    buttons={buttons}
                    chips={chipsData}
                    icon={<Monitor color="#CD1E2F" size={22} />}
                    subtitle="Organize and manage screen groups for easier content distribution"
                    title="Groups Management"
                    totalLabel={totalLabel}
                />

                {/* Card List */}
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
                <div className="mx-4 sm:mx-8 mt-4 p-4 sm:p-6 bg-white rounded-[16px] shadow-sm h-auto">
                    <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center">
                        <div className="flex items-start sm:items-center gap-3 flex-1">
                            <div>
                                <Monitor color="#CD1E2F" size={22} />
                            </div>
                            <div >
                                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold leading-tight">
                                    All Groups
                                </h1>
                                <p className="text-sm sm:text-base font-medium opacity-90 leading-snug">
                                    Manage your screen groups and assignments
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-1 rounded-[6px] bg-[#F3F3F4] p-[4px] w-full md:w-auto">
                            {/* Grid Button */}
                            <Button
                                isIconOnly
                                className={`w-full md:w-12 h-10 rounded-[6px] transition ${
                                    view === "grid" ? "bg-red-600 text-white" : "bg-[#F3F3F4] text-gray-700"
                                    }`}
                                variant="flat"
                                onPress={() => setView("grid")}
                            >
                                <LayoutGrid size={20} />
                            </Button>

                            {/* List Button */}
                            <Button
                                isIconOnly
                                className={`w-full md:w-12 h-10 rounded-[6px] transition ${
                                    view === "list" ? "bg-red-600 text-white" : "bg-[#F3F3F4] text-gray-700"
                                    }`}
                                variant="flat"
                                onPress={() => setView("list")}
                            >
                                <List size={20} />
                            </Button>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 rounded-[16px] p-4 border border-gray-200 bg-gray-100">
                        <div className="col-span-1">
                            <TextInput
                                icon={<Search className="w-5 h-5" />}
                                label="Search"
                                name="search"
                                placeholder="Search groups, description, or location"
                                type="search"
                                value={search}
                                onChange={setSearch}
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-800" htmlFor="allStatus">All Status</label>
                            <ReactSelectDropdown
                                data={[
                                    { value: "Active", label: "Active" },
                                    { value: "Inactive", label: "Inactive" },
                                    { value: "Maintenance", label: "Maintenance" },
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
                                onMenuOpen={() => { }}
                            />
                        </div>

                        <div className="w-full">
                            <label className="text-sm font-medium text-gray-800" htmlFor="allAssignment">All Assignment</label>
                            <ReactSelectDropdown
                                data={[
                                    { value: "Location", label: "Location based" },
                                    { value: "Type", label: "Device type" },
                                ]}
                                error=""
                                field={{ label: "filled" }}
                                fieldName="label"
                                handleSearchChange={handleSearchChangeDropdown}
                                handleSelectChange={(selectedOption: { value: string }) =>
                                    setAssignment(selectedOption.value)
                                }
                                id="allAssignment"
                                placeholder="All Assignment"
                                value={assignment}
                                onMenuOpen={() => { }}
                            />
                        </div>

                    </div>

                    <div className="mt-6">
                        {view === "grid" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                {filteredGroups.map((group) => (
                                    <article
                                        key={group.id}
                                        className="rounded-2xl border border-gray-200 p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition"
                                    >
                                        <header className="flex justify-between items-start gap-3">
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-gray-500">
                                                    {group.category}
                                                </p>
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    {group.groupsName}
                                                </h3>
                                                <p className="text-sm text-gray-500">{group.description}</p>
                                            </div>
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full capitalize ${
                                                    statusColorMap[group.status] || "bg-gray-100 text-gray-600"
                                                }`}
                                            >
                                                {group.status}
                                            </span>
                                        </header>

                                        <dl className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <dt className="text-gray-500">Playlist</dt>
                                                <dd className="font-semibold text-gray-900">{group.playlist}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-gray-500">Screens</dt>
                                                <dd className="font-semibold text-gray-900">{group.screens}</dd>
                                            </div>
                                            <div className="col-span-2">
                                                <dt className="text-gray-500">Updated</dt>
                                                <dd className="font-medium text-gray-800">{group.updated}</dd>
                                            </div>
                                        </dl>

                                        <div className="flex flex-wrap gap-2">
                                            <Button
                                                className="flex-1 min-w-[120px]"
                                                size="sm"
                                                startContent={<Eye size={16} />}
                                                variant="flat"
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                className="flex-1 min-w-[120px]"
                                                color="primary"
                                                size="sm"
                                                startContent={<Edit size={16} />}
                                            >
                                                Edit Group
                                            </Button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <div className="border border-gray-200 rounded-[12px] p-0 sm:p-[25px] overflow-x-auto">
                                <CustomTable
                                    columns={groupDataColumnConfig}
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
                                    tableData={filteredGroups}
                                    totalItems={totalItems}
                                    onRowsPerPageChange={onRowsPerPageChange}
                                    onSearchChange={onSearchChange}
                                />
                            </div>
                        )}
                    </div>

                    {/* Modal */}
                    {isModalOpen && <CreateGroup isOpen={isModalOpen} setIsOpen={setIsModalOpen} />}
                </div>
            </DefaultLayout>
        </div>
    );
}