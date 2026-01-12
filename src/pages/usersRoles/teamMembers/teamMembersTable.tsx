import { useCallback, useEffect, useRef, useState } from "react";


import { userColumns } from "./teamMembersColumnConfig";

import { SearchNormal1 } from "@/assets/index.js";
import CustomTable from "@/components/CustomTable/custom-table";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import TextInput from "@/components/InputController/text-input";
import { rolesData, statusData, userDummyData } from "@/data/jsonData";
import useTableControls from "@/hooks/useTableControls";


interface teamMembersTableProps { }

export const toSelectOptions = <T extends { label: string; value: number }>(
  data: T[]
) =>
  data.map(({ label, value }) => ({
    label,
    value: String(value),
  }));



export const TeamMembersTable = ({ }: teamMembersTableProps) => {
    const debounceDelay = 500;
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [userData, setUserData] = useState<any>([]);
    const [filterData, setFilterData] = useState({
        search: "",
        roles: "",
        status: "",
    });
    const [dropdownData, setDropdownData] = useState<{ [key: string]: any }>({
        roles: toSelectOptions(rolesData),
        status: toSelectOptions(statusData)
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
    } = useTableControls(userDummyData, userDummyData.length);

    const fetchData = useCallback(
        async (searchQuery: string = '', searchPage: number) => {
            try {
                const payload: Record<string, string> = {
                    page: searchPage ? String(searchPage) : String(page),
                    limit: String(rowsPerPage),
                };
                const search = searchQuery.trim();

                if (search) payload.search = search;
                setUserData(userDummyData);
                if (search) {
                    const filteredData = userDummyData.filter((item: any) =>
                        item.firstName.toLowerCase().includes(search.toLowerCase())
                    );

                    console.log(filteredData);

                    setUserData(filteredData);
                } else {
                    setUserData(userDummyData);
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
            fetchData(value, 1);
        }, debounceDelay);
    }

    const fetchDropdownData = async (
        type: string,
        value: string | number,
        searchValue = "",
        pageValue = "1",
    ) => {
        let typeValue = type;

        try {
            // if (dropdownData[type]?.length) return; // Prevent refetch

            let result = null;
            const limit = "50"; // you can customize
            const page = pageValue;
            const search = searchValue;

            console.log(limit, page, search);

            switch (type) {
                case "traders":
                case "supplierId":
                    // result = await traderList({ page, limit, search });
                    result = { data: [], totalPages: 1 };
                    typeValue = "traders";
                    break;
                default:
                    result = { data: [], totalPages: 1 };
            }

            if (result && result.data && Array.isArray(result.data)) {
                const dropdownValuesCustom = result.data.map((item: {id: number; value: string | number; name: string; lastName: string; email: string; level: number | string; label: string;}) => ({
                    value: item.id !== undefined ? item.id : item.value,
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


    return (
        <div className="space-y-6">
            {/* 🔍 Filter Section */}
            <div className="bg-[#F3F3F4] shadow-sm border border-[#13253326] rounded-xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* === Search === */}
                    <div className="w-full">
                        {/* <label className="text-sm font-medium text-gray-700 mb-1 block">
                            Search
                        </label> */}
                        <TextInput
                            icon={<SearchNormal1 className="w-4 h-4" />}
                            label="Search"
                            name="search"
                            placeholder="Search by screen name, ID..."
                            type="search"
                            value={filterData.search}
                            width="w-full"
                            onChange={handleFilterChange}
                        />
                    </div>

                    {/* === Roles === */}
                    <div className="w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="asdf">
                            All Roles
                        </label>
                        <ReactSelectDropdown
                            data={dropdownData.roles}
                            error=""
                            field={{ name: "roles" }}
                            fieldName="roles"
                            handleSearchChange={handleSearchChangeDropdown}
                            handleSelectChange={(selectedOption: { value: string }, field) =>
                                setFilterData({ ...filterData, [field.name]: selectedOption.value })
                            }
                            placeholder="All Screens"
                            value={filterData.roles}
                            onMenuOpen={() => fetchDropdownData("roles", "")}
                        />
                    </div>

                    {/* === Status === */}
                    <div className="w-full">
                        <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="allStatus">
                            All Status
                        </label>
                        <ReactSelectDropdown
                            data={dropdownData.status}
                            error=""
                            field={{ name: "status" }}
                            fieldName="status"
                            handleSearchChange={handleSearchChangeDropdown}
                            handleSelectChange={(selectedOption: { value: string }, field) =>
                                setFilterData({ ...filterData, [field.name]: selectedOption.value })
                            }
                            id="allStatus"
                            placeholder="Select Status"
                            value={filterData.status}
                            onMenuOpen={() => fetchDropdownData("status", "")}
                        />
                    </div>
                </div>
            </div>


            <div className="h-0.5 bg-[#F3F3F3] " />

            {/* 👥 Table Section */}
            <div className="bg-white shadow-sm border border-[#13253326] rounded-xl p-4">
                <CustomTable
                    columns={userColumns}
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
                    tableData={userData}
                    totalItems={totalItems}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onSearchChange={onSearchChange}
                />
            </div>
        </div>
    );

}