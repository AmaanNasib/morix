import { Monitor } from "lucide-react";

const renderStatus = (row: Record<string, any>, columnKey: string) => {
  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-semibold border transition-all";

  const colorStyles: Record<string, string> = {
    Success: "text-green-600 border-green-300 bg-green-50",
    Paid: "text-green-600 border-green-300 bg-green-50",
    Active: "text-green-600 border-green-300 bg-green-50",
    Approved: "text-green-600 border-green-300 bg-green-50",
    Failed: "text-red-600 border-red-300 bg-red-50",
    Expired: "text-red-600 border-red-300 bg-red-50",
    Cancelled: "text-red-600 border-red-300 bg-red-50",
    Inactive: "text-gray-600 border-gray-300 bg-gray-50",
    "Not Activated": "text-gray-600 border-gray-300 bg-gray-50",
    Warning: "text-yellow-600 border-yellow-300 bg-yellow-50",
    Maintenance: "text-yellow-600 border-yellow-300 bg-yellow-50",
    Pending: "text-yellow-600 border-yellow-300 bg-yellow-50",
  };

  const style = colorStyles[row[columnKey]] || "text-gray-600 border-gray-200 bg-gray-50";

  return (
    <span className={`${baseStyle} ${style}`}>
      {row[columnKey]}
    </span>
  );
};

const renderScreenName = (row: Record<string, any>, columnKey: string) => {
  console.log("Rendering Screen Name for row:", columnKey, row);

  return (
    <div className="flex items-center space-x-2">
      <div className="p-2 border-1 border-gray-200 bg-[#D120270D] rounded-md">
        <Monitor color="red" size={18} />
      </div>
      <div>
        <p className="flex gap-2 items-center text-base font-semibold ">{row.name}</p>
        <p className="text-sm font-normal">{row.deviceType}</p>
      </div>
    </div>
  )
}

export const licenseColumns = [
  { name: "Screen Name", uid: "name", renderOptions: renderScreenName },
  { name: "License ID", uid: "licenseId" },
  { name: "Location", uid: "location" },
  { name: "License Status", uid: "licenseStatus", renderOptions: renderStatus },
  { name: "Issue Date", uid: "createdAt" },
  { name: "Expiry Date", uid: "expiryDate" },
  { name: "Cost", uid: "cost" },
  { name: "Actions", uid: "actions" },
];