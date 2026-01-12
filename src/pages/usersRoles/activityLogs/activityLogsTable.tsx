import { Button } from "@heroui/button";
import { Download, FilterIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { activityLogsColumns } from "./activityColumnConfig";

import CustomTable from "@/components/CustomTable/custom-table";
import { activityLogData } from "@/data/jsonData";
// import { activityLogsColumns } from "@/data/tableData";
import useTableControls from "@/hooks/useTableControls";


export const ActivityLogsTable = () => {
    const [userData, setUserData] = useState<any>([]);
    // Pagination
    // const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        setTotalCount(0);
    }, []);

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
    } = useTableControls(activityLogData, activityLogData.length);

    const fetchData = useCallback(
        async (searchQuery: string = '', searchPage: number) => {
            try {
                const payload: Record<string, string> = {
                    page: searchPage ? String(searchPage) : String(page),
                    limit: String(rowsPerPage),
                };
                const search = searchQuery.trim();

                if (search) payload.search = search;
                setUserData(activityLogData);
                if (search) {
                    const filteredData = activityLogData.filter((item: any) =>
                        item.user.toLowerCase().includes(search.toLowerCase())
                    );

                    console.log(filteredData);

                    setUserData(filteredData);
                } else {
                    setUserData(activityLogData);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        [page, rowsPerPage,]
    );

    useEffect(() => {
        fetchData('', page);
    }, [fetchData]);

    const downloadReport = useCallback(async () => {
        try {

            const payload: Record<string, string> = {
                page: '1',
                limit: totalCount.toString(),
            };
            
            console.log(payload);

            // const response: apiResponse = await fetchOrderList(payload);
            const response = { success: true, data: activityLogData };

            if (response?.success) {
                // CSV headers
                const headers = [
                    'ID',
                    'User',
                    'Action',
                    'Target',
                    'Type',
                    'Status',
                    'Timestamp',
                ];

                // Convert customer data to CSV format
                const csvData = activityLogData.map((c) => [
                    c.id,
                    c.user,
                    c.action,
                    c.target,
                    c.type,
                    c.status,
                    c.createdAt,
                ]);

                // Combine headers and data
                const csvContent = [headers, ...csvData]
                    .map(row => row.map(cell => `"${cell}"`).join(','))
                    .join('\n');

                // Create and download the file
                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);

                link.setAttribute('href', url);
                const datetime = new Date().toISOString().split('T');
                const formattedDatetime = `${datetime[0].replace(/-/g, '')}-${datetime[1].slice(0, 2)}:${datetime[1].slice(3, 5)}:${datetime[1].slice(11, 13)}:${datetime[1].slice(14, 16)}`;

                link.setAttribute('download', `activity_log_${formattedDatetime}.csv`);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            } else {
                console.error('Failed to download report');
            }
        } catch (error) {
            console.error(error);
        }
    }, [page, rowsPerPage]);




    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-lg font-medium">Security & Audit Logs</p >
                    <p className="text-lg text-[#132533BF]">  Track all user actions for security and compliance monitoring</p>
                </div>
                <div className="flex gap-2">
                    <Button className="font-medium" size="sm" variant="bordered" onPress={downloadReport}>
                        <Download size={16} /> Download Logs
                    </Button>
                    <Button className="font-medium" size="sm" variant="bordered">
                        <FilterIcon size={13} />  Filter</Button>
                </div>

            </div>

            {/* 👥 Table Section */}
            <div className="bg-white ">
                <CustomTable
                    columns={activityLogsColumns}
                    filterValue={filterValue}
                    isCustomFormModalOpen={isCustomFormModalOpen}
                    isSearchable={false}
                    isSelectable={false}
                    page={page}
                    pages={pages}
                    rowActions={() => { }}
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
    )
}