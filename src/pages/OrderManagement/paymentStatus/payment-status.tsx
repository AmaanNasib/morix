import { useState } from "react";
import { CircleCheckBig, Clock4, CreditCard, Eye, Download } from "lucide-react";

import { paymentColumns } from "./paymentStatusColumnConfig";

import TextInput from "@/components/InputController/text-input";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import CustomTable from "@/components/CustomTable/custom-table";
import useTableControls from "@/hooks/useTableControls";


const paymentData = [
    {
        id: "1",
        piNumber: "PI-2024-001",
        client: "Tech Solutions Inc.",
        amount: "$46,250",
        dueDate: "Dec 15, 2024",
        paymentDate: "Dec 12, 2024",
        method: "Bank Transfer",
        status: "Paid",
    },
    {
        id: "2",
        piNumber: "PI-2024-002",
        client: "Global Display Networks",
        amount: "$32,750",
        dueDate: "Jan 10, 2025",
        paymentDate: "-",
        method: "-",
        status: "Pending",
    },
    {
        id: "3",
        piNumber: "PI-2024-003",
        client: "Premium Systems Ltd.",
        amount: "$23,200",
        dueDate: "Dec 28, 2024",
        paymentDate: "-",
        method: "-",
        status: "Pending",
    },
    {
        id: "4",
        piNumber: "PI-2024-004",
        client: "Digital Vision Corp.",
        amount: "$56,500",
        dueDate: "Dec 20, 2024",
        paymentDate: "Dec 18, 2024",
        method: "-",
        status: "Paid",
    },
    {
        id: "5",
        piNumber: "PI-2024-005",
        client: "Smart Display Solutions",
        amount: "$44,000",
        dueDate: "Jan 5, 2025",
        paymentDate: "-",
        method: "-",
        status: "Pending",
    },
    {
        id: "6",
        piNumber: "PI-2024-006",
        client: "Enterprise Display Group",
        amount: "$44,000",
        dueDate: "Dec 10, 2024",
        paymentDate: "Dec 9, 2024",
        method: "Bank Transfer",
        status: "Paid",
    },
    {
        id: "7",
        piNumber: "PI-2024-007",
        client: "Metro Signage Systems",
        amount: "$13,750",
        dueDate: "Jan 8, 2025",
        paymentDate: "-",
        method: "-",
        status: "Pending",
    },
    {
        id: "8",
        piNumber: "PI-2024-008",
        client: "Apex Display Technologies",
        amount: "$12,450",
        dueDate: "Dec 25, 2024",
        paymentDate: "-",
        method: "-",
        status: "Pending",
    },
];


export default function PaymentStatus() {
    const [search, setSearch] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [time, setTime] = useState<string>("");

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
    } = useTableControls(paymentData, paymentData.length);


    const getActions = (row: any) => {
        if (row.status === "Paid") {
            return [
                {
                    label: "View",
                    key: "view",
                    icon: <Eye className="w-5 h-5" />,
                    onClick: () => {
                        console.log(row);
                    },
                },
                {
                    label: "Download",
                    key: "download",
                    icon: <Download className="w-5 h-5" />,
                    onClick: () => {
                        console.log(row);
                    },
                },
            ]
        }
        else {
            return [{
                    label: "Make Payment",
                    key: "makePayment",
                    icon: <CreditCard className="w-5 h-5" />,
                    onClick: () => {
                        console.log(row);
                    },
                }]
        }
    };


    // All methods
    const handleSearchChangeDropdown = () => { };

    return (
        <div className="w-full bg-white rounded-[14px] border-[1px] border-gray-300 p-4">
            <h2 className="text-base font-medium">My Payment Status</h2>
            <p className="text-base font-normal">Track payment status for accepted proforma invoices</p>

            {/* === Empty Screen === */}
            {paymentData?.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-4 h-[280px]">
                    <div className="h-[64px] w-[64px] rounded-full bg-[#D120270D] flex items-center justify-center"><CreditCard /></div>
                    <p className="text-base font-medium mt-4">Payment Tracking</p>
                    <div className="w-auto md:w-[445px] items-center">
                        <p className="text-center">Once you accept a proforma invoice, payment tracking will be available here.</p>
                    </div>
                </div>
            )}

            {/* === Payment Summary === */}
            {paymentData?.length > 0 && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div className="flex flex-row bg-[#12B76A0D] justify-between border-[1px] border-gray-300 rounded-[10px] p-[17px]">
                            <div>
                                <p className="text-base font-normal">Total Paid</p>
                                <p className="text-base font-medium">$145,750</p>
                                <p className="text-base font-normal">3 invoices</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center justify-center bg-[#12B76A26] w-[40px] h-[40px] sm:w-12 sm:h-12 rounded-lg flex-shrink-0">
                                    <CircleCheckBig className="w-5 h-5" color="#12B76A" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row bg-[#F790090D] justify-between border-[1px] border-gray-300 rounded-[10px] p-[17px]">
                            <div>
                                <p className="text-base font-normal">Pending Payment</p>
                                <p className="text-base font-medium">$126,150</p>
                                <p className="text-base font-normal">5 invoices</p>
                            </div>
                            <div className="flex items-center">
                                <div className="flex items-center justify-center bg-[#F7900926] w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex-shrink-0">
                                    <Clock4 className="w-5 h-5" color="#F79009" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr_1fr] gap-3 my-6">
                        <TextInput placeholder="Search by PI number, client name..." type="search" value={search} onChange={setSearch} />
                        <ReactSelectDropdown
                            data={[
                                { value: "Offline", label: "Offline" },
                                { value: "Online", label: "Online" },
                                { value: "Unpaired", label: "Unpaired" },
                            ]}
                            field={{ name: "status" }}
                            fieldName="status"
                            handleSearchChange={handleSearchChangeDropdown}
                            handleSelectChange={(selectedOption: { value: string }) =>
                                setStatus(selectedOption.value)
                            }
                            placeholder="Select Status"
                            value={status}
                        />
                        <ReactSelectDropdown
                            data={[
                                { value: "Offline", label: "Offline" },
                                { value: "Online", label: "Online" },
                                { value: "Unpaired", label: "Unpaired" },
                            ]}
                            field={{ name: "time" }}
                            fieldName="time"
                            handleSearchChange={handleSearchChangeDropdown}
                            handleSelectChange={(selectedOption: { value: string }) =>
                                setTime(selectedOption.value)
                            }
                            placeholder="Select Time"
                            value={time}
                        />
                    </div>

                    {/* Table */}
                    <div className="mt-[10px] border-[1px] border-gray-200 rounded-[16px] p-[16px]">
                        <CustomTable
                            columns={paymentColumns}
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
                            tableData={paymentData}
                            totalItems={totalItems}
                            onRowsPerPageChange={onRowsPerPageChange}
                            onSearchChange={onSearchChange}
                        />
                    </div>
                </>
            )}
        </div>
    );
}