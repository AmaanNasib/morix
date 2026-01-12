
const renderStatus = (row: Record<string, string>, columnKey: string) => {
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

export const userColumns = [
  { name: "Full Name", uid: "firstName", hidden: false, sortable: true },
  { name: "Phone", uid: "phone" },
  { name: "Email", uid: "email" },
  { name: "DOB", uid: "dob" },
  { name: "Login By", uid: "loggingBy" },
  { name: "Registered On", uid: "createdAt" },
  { name: "Status", uid: "status", sortable: true, renderOptions: renderStatus },
  { name: "Actions", uid: "actions" },
];