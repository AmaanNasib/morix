import { Eye } from "lucide-react";
import {  useNavigate } from "react-router-dom";

import { purchaseRequestColumns } from "./purchaseRequestColumnConfig";

import CustomTable from "@/components/CustomTable/custom-table";
import useTableControls from "@/hooks/useTableControls";



const purchaseRequestData = [
  {
    "id": 1,
    "prNumber": "PR-2024-005",
    "deviceType": "Enterprise Digital Signage Display 75\"",
    "quantity": "8 units",
    "sentTo": "MetroVision Suppliers",
    "sentToRole": "Distributor",
    "requestDate": "12/23/2024",
    "status": "Approved"
  },
  {
    "id": 2,
    "prNumber": "PR-2024-006",
    "deviceType": "Standard Digital Signage Display 49\"",
    "quantity": "12 units",
    "sentTo": "CityTech Innovations",
    "sentToRole": "Sub Distributor",
    "requestDate": "12/23/2024",
    "status": "Pending"
  },
  {
    "id": 3,
    "prNumber": "PR-2024-007",
    "deviceType": "Professional Digital Signage Display 65\"",
    "quantity": "6 units",
    "sentTo": "MORIX Head Office",
    "sentToRole": "Admin",
    "requestDate": "12/24/2024",
    "status": "In Process"
  },
  {
    "id": 4,
    "prNumber": "PR-2024-008",
    "deviceType": "Outdoor Digital Display 55\"",
    "quantity": "4 units",
    "sentTo": "TechVision Distributors Inc.",
    "sentToRole": "Distributor",
    "requestDate": "12/24/2024",
    "status": "Under Review"
  },
  {
    "id": 5,
    "prNumber": "PR-2024-009",
    "deviceType": "Touchscreen Digital Display 43\"",
    "quantity": "10 units",
    "sentTo": "Local Digital Solutions",
    "sentToRole": "Sub Distributor",
    "requestDate": "12/25/2024",
    "status": "Approved"
  },
  {
    "id": 6,
    "prNumber": "PR-2024-010",
    "deviceType": "Professional Digital Signage Display 50\"",
    "quantity": "7 units",
    "sentTo": "MORIX Head Office",
    "sentToRole": "Admin",
    "requestDate": "12/25/2024",
    "status": "Pending"
  },
  {
    "id": 7,
    "prNumber": "PR-2024-011",
    "deviceType": "Enterprise Digital Signage Display 86\"",
    "quantity": "3 units",
    "sentTo": "TechVision Distributors Inc.",
    "sentToRole": "Distributor",
    "requestDate": "12/26/2024",
    "status": "In Process"
  },
  {
    "id": 8,
    "prNumber": "PR-2024-012",
    "deviceType": "Standard Digital Signage Display 32\"",
    "quantity": "18 units",
    "sentTo": "CityTech Innovations",
    "sentToRole": "Sub Distributor",
    "requestDate": "12/26/2024",
    "status": "Approved"
  },
  {
    "id": 9,
    "prNumber": "PR-2024-013",
    "deviceType": "Outdoor Digital Display 65\"",
    "quantity": "5 units",
    "sentTo": "Local Digital Solutions",
    "sentToRole": "Sub Distributor",
    "requestDate": "12/27/2024",
    "status": "Under Review"
  },
  {
    "id": 10,
    "prNumber": "PR-2024-014",
    "deviceType": "Professional Digital Signage Display 75\"",
    "quantity": "2 units",
    "sentTo": "MORIX Head Office",
    "sentToRole": "Admin",
    "requestDate": "12/27/2024",
    "status": "Pending"
  },
  {
    "id": 11,
    "prNumber": "PR-2024-015",
    "deviceType": "Enterprise Digital Signage Display 55\"",
    "quantity": "9 units",
    "sentTo": "MetroVision Suppliers",
    "sentToRole": "Distributor",
    "requestDate": "12/28/2024",
    "status": "Approved"
  },
  {
    "id": 12,
    "prNumber": "PR-2024-016",
    "deviceType": "Standard Digital Signage Display 50\"",
    "quantity": "14 units",
    "sentTo": "TechVision Distributors Inc.",
    "sentToRole": "Distributor",
    "requestDate": "12/28/2024",
    "status": "In Process"
  }
];

export default function PurchaseRequest() {
  const navigate = useNavigate();


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
  } = useTableControls(purchaseRequestData, purchaseRequestData.length);

  // Row Actions
  const getActions = (row: any) => [
    {
      label: "View Details",
      key: "view",
      icon: <Eye className="w-5 h-5" />,
      onClick: (item: any, key: string) => {
        console.log(row);
        console.log("Item:", item);
        console.log("Key:", key);
        navigate(`/orders/pr/${item.id}`, {replace: true});
      },
    },
  ];

  return (
    <div className="w-full bg-white rounded-[14px] border-[1px] border-gray-300 p-4">
      <h2 className="text-base font-medium">My Purchase Requests</h2>
      <p className="text-base font-normal">Track all your submitted purchase requests</p>

      {/* Table */}
      <div className="mt-6">
        <CustomTable
          columns={purchaseRequestColumns}
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
          tableData={purchaseRequestData}
          totalItems={totalItems}
          onRowsPerPageChange={onRowsPerPageChange}
          onSearchChange={onSearchChange}
        />
      </div>
    </div>
  );
}