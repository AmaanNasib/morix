const renderStatus = (row: Record<string, string>) => {
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

    const style = colorStyles[row.status] || "text-gray-600 border-gray-200 bg-gray-50";

    return (
      <span className={`${baseStyle} ${style}`}>
        {row.status}
      </span>
    );
  };


export const activityLogsColumns = [
  { name: "User", uid: "user" },
  { name: "Action", uid: "action" },
  { name: "Target", uid: "target" },
  { name: "Type", uid: "type" },
  { name: "Status", uid: "status", renderOptions: renderStatus },
  { name: "Timestamp", uid: "createdAt" },
];