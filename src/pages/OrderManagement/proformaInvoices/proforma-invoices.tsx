import { Eye, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { proformaInvoiceColumns } from "./proformaInvoiceColumnConfig";

import CustomTable from "@/components/CustomTable/custom-table";
import useTableControls from "@/hooks/useTableControls";



const proformaInvoiceData = [
    {
        id: 1,
        piNumber: "PI-2024-001",
        relatedPr: "PR-2024-001",
        requestedDate: "2024-12-10",
        quantity: 10,
        from: {
            name: "TechVision Distributors Inc.",
            role: "Distributor",
            icon: "red"
        },
        deviceType: "Professional Digital Signage Display 55\" (10 units)",
        amount: "$16,675",
        validUntil: "2025-01-21",
        status: "Received"
    },
    {
        id: 2,
        piNumber: "PI-2024-002",
        relatedPr: "PR-2024-002",
        requestedDate: "2024-12-12",
        quantity: 5,
        from: {
            name: "Local Digital Solutions",
            role: "Sub Distributor",
            icon: "orange"
        },
        deviceType: "Enterprise Digital Signage Display 65\" (5 units)",
        amount: "$10,637.5",
        validUntil: "2025-01-22",
        status: "Accepted"
    },
    {
        id: 3,
        piNumber: "PI-2024-003",
        relatedPr: "PR-2024-010",
        requestedDate: "2024-12-15",
        quantity: 8,
        from: {
            name: "BrightSign Tech",
            role: "Distributor",
            icon: "purple"
        },
        deviceType: "Digital Menu Board 43\" (8 units)",
        amount: "$8,240",
        validUntil: "2025-02-02",
        status: "Pending"
    },
    {
        id: 4,
        piNumber: "PI-2024-004",
        relatedPr: "PR-2024-011",
        requestedDate: "2024-12-17",
        quantity: 3,
        from: {
            name: "MediaHub Supplies",
            role: "Distributor",
            icon: "green"
        },
        deviceType: "Outdoor Display 75\" (3 units)",
        amount: "$22,560",
        validUntil: "2025-02-05",
        status: "Received"
    },
    {   
        id: 5,
        piNumber: "PI-2024-005",
        relatedPr: "PR-2024-015",
        requestedDate: "2024-12-20",
        quantity: 6,
        from: {
            name: "PixelPro Vendor",
            role: "Sub Distributor",
            icon: "cyan"
        },
        deviceType: "Touch Display 50\" (6 units)",
        amount: "$12,900",
        validUntil: "2025-02-10",
        status: "Pending"
    }
];

export default function ProformaInvoices() {
    const navigate = useNavigate();

    const getActions = (row: any) => [
        {
            label: "View Details",
            key: "view",
            icon: <Eye className="w-5 h-5" />,
            onClick: (item: any, key: string) => {
                console.log(row);
                console.log("Item:", item);
                console.log("Key:", key);
                navigate(`/orders/pi/${item.id}`, { replace: true });
            },
        },
        {
            label: "Download",
            key: "download",
            icon: <Download className="w-5 h-5" />,
            onClick: (item: any, key: string) => {
                console.log("Item:", item);
                console.log("Key:", key);
                navigate(`/orders/${item.id}`, { replace: true });
            },
        }
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
    } = useTableControls(proformaInvoiceData, proformaInvoiceData.length);

    return (
        <div className="w-full bg-white rounded-[14px] border-[1px] border-gray-300 p-4">
            <h2 className="text-base font-medium">My Proforma Invoices</h2>
            <p className="text-base font-normal">Track all your submitted purchase requests</p>
            <div className="mt-6">
                <CustomTable
                    columns={proformaInvoiceColumns}
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
                    tableData={proformaInvoiceData}
                    totalItems={totalItems}
                    onRowsPerPageChange={onRowsPerPageChange}
                    onSearchChange={onSearchChange}
                />
            </div>
        </div>
    );
}