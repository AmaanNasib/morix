import { Button } from "@heroui/button";
import { Eye, History, Monitor, Send, TvMinimal } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { licenseColumns } from "./overviewManagementColumnConfig";

import { SearchNormal1 } from "@/assets/index.js";
import CustomTable from "@/components/CustomTable/custom-table";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import TextInput from "@/components/InputController/text-input";
import { licenseDummyData } from "@/data/jsonData";
import useTableControls from "@/hooks/useTableControls";


interface OverviewManagementTableProps { }


export const OverviewManagementTable = ({ }: OverviewManagementTableProps) => {
    const debounceDelay = 500;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [licenseData, setLicenseData] = useState<any>([]);

    const [filterData, setFilterData] = useState({
        search: "",
        location: "",
        status: "",
        date: "",
        cost: "",
    });
    const [dropdownData, setDropdownData] = useState<{ [key: string]: any }>({
        location: [
            { value: "Reception", label: "Reception" },
            { value: "Admin", label: "Admin" },
            { value: "Viewer", label: "Viewer" },
        ],
        status: [
            { value: "Offline", label: "Offline" },
            { value: "Online", label: "Online" },
            { value: "Unpaired", label: "Unpaired" },
        ],
        date: [
            { value: "2_Hours", label: "2 Hours" },
            { value: "4_Hours", label: "4 Hours" },
            { value: "6_Hours", label: "6 Hours" },
        ],
        cost: [
            { value: "200", label: "$200" },
            { value: "400", label: "$400" },
            { value: "600", label: "$600" },
        ]

    });
    // Pagination
    // const [totalPages, setTotalPages] = useState(1);
    // const [totalCount, setTotalCount] = useState(0);

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
    } = useTableControls(licenseDummyData, licenseDummyData.length);

    const fetchData = useCallback(
        async (searchQuery: string = '', searchPage: number) => {
            try {
                const payload: Record<string, string> = {
                    page: searchPage ? String(searchPage) : String(page),
                    limit: String(rowsPerPage),
                    location: filterData.location,
                    status: filterData.status,
                    date: filterData.date,
                    cost: filterData.cost
                };

                console.log("payload", payload)

                const search = searchQuery.trim();

                if (search) payload.search = search;
                setLicenseData(licenseDummyData);
                if (search) {
                    const filteredData = licenseDummyData.filter((item: any) =>
                        item.name.toLowerCase().includes(search.toLowerCase() ||
                            item.location.toLowerCase().includes(search.toLowerCase()) ||
                            item.status.toLowerCase().includes(search.toLowerCase()) ||
                            item.date.toLowerCase().includes(search.toLowerCase()) ||
                            item.cost.toLowerCase().includes(search.toLowerCase()))
                    );

                    setLicenseData(filteredData);
                } else {
                    setLicenseData(licenseDummyData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        [JSON.stringify(filterData), rowsPerPage, page]
    );

    useEffect(() => {
        fetchData('', page);
    }, [fetchData]);

    const handleFilterChange = (value: any, name: any) => {
        setFilterData({
            ...filterData,
            [name]: value,
        });
        timeoutRef.current && clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            setPage(1);
            fetchData(value, page);
        }, debounceDelay);
    }

    const fetchDropdownData = async (
        type: string,
        value: string | number,
        searchValue = "",
        pageValue = "1",
    ) => {
        let typeValue = type;

        console.log("type", type, "value", value, "searchValue", searchValue, "pageValue", pageValue);

        try {
            // if (dropdownData[type]?.length) return; // Prevent refetch

            let result = null;
            // const limit = "50"; // you can customize
            // const page = pageValue;
            // const search = searchValue;

            switch (type) {
                case "location":
                    // result = await traderList({ page, limit, search });
                    result = { data: [], totalPages: 1 };
                    typeValue = "location";
                    break;
                default:
                    result = { data: [], totalPages: 1 };
            }


            if (result && result.data && Array.isArray(result.data)) {

                const dropdownValuesCustom = result.data.map((item: { id?: number, value: string, name?: string, lastName?: string, email?: string, label?: string, level?: string }) => ({
                    value: item?.id !== undefined ? item.id : item.value,
                    label:
                        item.name && item.lastName
                            ? `${item.name} ${item.lastName} - ${item.email}`
                            : item.name || item.level || item.label,
                    data: item,
                }));

                // Combine and deduplicate by `value`
                setDropdownData((prev) => {
                    const existing = prev[typeValue] || [];
                    const combined = [...existing, ...dropdownValuesCustom];

                    const unique = Array.from(
                        new Map(combined.map((item) => [item.value, item])).values(),
                    );

                    return {
                        ...prev,
                        [typeValue]: unique,
                    };
                });
            }

            return result;
        } catch (error) {
            console.error(`Failed to fetch ${typeValue} options:`, error);
        } finally {
        }
    };

    const handleSearchChangeDropdown = (searchValue: string, type: string) => {
        if (typeof searchValue !== "string" || !searchValue) {
            console.error("Search value is not a string:", searchValue);

            return;
        }
        // Await the fetchDropdownData call inside useEffect
        fetchDropdownData(type, "", searchValue);
    };



    // Action generator (row = current row item)
    const getActions = (row: any) => [
        {
            label: "View Details",
            key: "view",
            icon: <Eye className="w-5 h-5" />,
            onClick: (item: any, key: string) => {
                console.log(row);
                console.log("Item:", item);
                console.log("Key:", key);
            },
        },
        {
            label: "License History",
            key: "history",
            icon: <History className="w-5 h-5" />,
            onClick: (item: any, key: string) => {
                console.log("Item:", item);
                console.log("Key:", key);
            },
        },
        {
            label: "Device Management",
            key: "device",
            icon: <TvMinimal className="w-5 h-5" />,
            onClick: (item: any, key: string) => {
                console.log("Item:", item);
                console.log("Key:", key);
            },
        },
    ];

    return (
        <div className="space-y-6">

            <div className="flex item-center justify-between">
                <div className="flex justify-between items-center gap-2.5">
                    <Monitor className="w-5 h-5 text-danger" />
                    <p className="text-sm font-semibold text-[#333333]">Search, filter, and manage all Licenses</p>
                </div>
                <Button
                    className="bg-primary text-white h-9"
                    color="danger"
                    size="md"
                    startContent={<Send className="w-5 h-5" />}
                    onPress={() => { console.log("Request Renewals") }}
                >
                    Request Renewals
                </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 rounded-[16px] p-4 border border-gray-200 bg-gray-100">
                <div className="col-span-1">
                    <TextInput
                        icon={<SearchNormal1 className="w-4 h-4" />}
                        label="Search"
                        name="search"
                        placeholder="Search by screen name,ID,..."
                        type="search"
                        value={filterData.search}
                        onChange={handleFilterChange}
                    />
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-800" htmlFor="allLocations">All Locations</label>
                    <ReactSelectDropdown
                        data={dropdownData.location || []}
                        error=""
                        field={{ label: "location" }}
                        fieldName="location"
                        handleSearchChange={handleSearchChangeDropdown}
                        handleSelectChange={(selectedOption: { value: string }, field) =>
                            setFilterData({ ...filterData, [field.label]: selectedOption.value })
                        }
                        id="allLocations"
                        placeholder="All Locations"
                        value={filterData.location}
                        onMenuOpen={() => fetchDropdownData("location", "")}
                    />
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-800" htmlFor="allStatus">All Status</label>
                    <ReactSelectDropdown
                        data={dropdownData.status || []}
                        error=""
                        field={{ label: "status" }}
                        fieldName="status"
                        handleSearchChange={handleSearchChangeDropdown}
                        handleSelectChange={(selectedOption: { value: string }, field) =>
                            setFilterData({ ...filterData, [field.label]: selectedOption.value })
                        }
                        id="allStatus"
                        placeholder="All Status"
                        value={filterData.status}
                        onMenuOpen={() => fetchDropdownData("status", "")}
                    />
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-800" htmlFor="allDate">All Date</label>
                    <ReactSelectDropdown
                        data={dropdownData.date || []}
                        error=""
                        field={{ label: "date" }}
                        fieldName="date"
                        handleSearchChange={handleSearchChangeDropdown}
                        handleSelectChange={(selectedOption: { value: string }, field) =>
                            setFilterData({ ...filterData, [field.label]: selectedOption.value })
                        }
                        placeholder="All Date"
                        value={filterData.date}
                        onMenuOpen={() => fetchDropdownData("date", "")}
                    />
                </div>

                <div className="w-full">
                    <label className="text-sm font-medium text-gray-800" htmlFor="allCost">All Cost</label>
                    <ReactSelectDropdown
                        data={dropdownData.cost || []}
                        error=""
                        field={{ label: "cost" }}
                        fieldName="cost"
                        handleSearchChange={handleSearchChangeDropdown}
                        handleSelectChange={(selectedOption: { value: string }, field) =>
                            setFilterData({ ...filterData, [field.label]: selectedOption.value })
                        }
                        id="allCost"
                        placeholder="All Cost"
                        value={filterData.cost}
                        onMenuOpen={() => fetchDropdownData("cost", "")}
                    />
                </div>
            </div>

            {/* 👥 Table Section */}
            <div className="bg-white shadow-sm border border-[#13253326] rounded-xl p-4">
                <CustomTable
                    columns={licenseColumns}
                    filterValue={filterValue}
                    isCustomFormModalOpen={isCustomFormModalOpen}
                    isSearchable={false}
                    isSelectable={true}
                    page={page}
                    pages={pages}
                    rowActions={getActions}
                    rowsPerPage={rowsPerPage}
                    selectedRowItem={selectedRowItem}
                    setIsConfirmModalOpen={setIsConfirmModalOpen}
                    setPage={setPage}
                    tableData={licenseData}
                    totalItems={totalItems}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onSearchChange={onSearchChange}
                />
            </div>
        </div>
    );

}