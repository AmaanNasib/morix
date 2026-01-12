export const renderStatusChip = (row: { status: string }) => {
  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-2";

  const statusColors: Record<string, { dot: string; style: string }> = {
    Online: {
      dot: "bg-green-500",
      style: "text-green-600 border-green-300 bg-green-50",
    },
    Unpaired: {
      dot: "bg-green-500",
      style: "text-green-600 border-green-300 bg-green-50",
    },
    Active: {
      dot: "bg-green-500",
      style: "text-green-600 border-green-300 bg-green-50",
    },
    Approved: {
      dot: "bg-green-500",
      style: "text-green-600 border-green-300 bg-green-50",
    },

    Offline: {
      dot: "bg-red-500",
      style: "text-red-600 border-red-300 bg-red-50",
    },
    Expired: {
      dot: "bg-red-500",
      style: "text-red-600 border-red-300 bg-red-50",
    },
    Cancelled: {
      dot: "bg-red-500",
      style: "text-red-600 border-red-300 bg-red-50",
    },

    Inactive: {
      dot: "bg-gray-500",
      style: "text-gray-600 border-gray-300 bg-gray-50",
    },
    "Not Activated": {
      dot: "bg-gray-500",
      style: "text-gray-600 border-gray-300 bg-gray-50",
    },

    Warning: {
      dot: "bg-yellow-500",
      style: "text-yellow-600 border-yellow-300 bg-yellow-50",
    },
    Maintenance: {
      dot: "bg-yellow-500",
      style: "text-yellow-600 border-yellow-300 bg-yellow-50",
    },
    Pending: {
      dot: "bg-yellow-500",
      style: "text-yellow-600 border-yellow-300 bg-yellow-50",
    },
  };

  const selected =
    statusColors[row.status] ?? {
      dot: "bg-gray-400",
      style: "text-gray-600 border-gray-200 bg-gray-50",
    };

  return (
    <span className={`${baseStyle} ${selected.style}`}>
      <span className={`w-2 h-2 rounded-full ${selected.dot}`} />
      {row.status}
    </span>
  );
};

const renderLicenseChip = (row: { license: string }) => {
  
  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-semibold border transition-all";

  const colorStyles: Record<string, string> = {
    Online: "text-green-600 border-green-300 bg-green-50",
    Unpaired: "text-green-600 border-green-300 bg-green-50",
    Active: "text-green-600 border-green-300 bg-green-50",
    Approved: "text-green-600 border-green-300 bg-green-50",
    Offline: "text-red-600 border-red-300 bg-red-50",
    Expired: "text-red-600 border-red-300 bg-red-50",
    Cancelled: "text-red-600 border-red-300 bg-red-50",
    Inactive: "text-gray-600 border-gray-300 bg-gray-50",
    "Not Activated": "text-gray-600 border-gray-300 bg-gray-50",
    Warning: "text-yellow-600 border-yellow-300 bg-yellow-50",
    Maintenance: "text-yellow-600 border-yellow-300 bg-yellow-50",
    Pending: "text-yellow-600 border-yellow-300 bg-yellow-50",
  };

  const style = colorStyles[row.license] || "text-gray-600 border-gray-200 bg-gray-50";

  return <span className={`${baseStyle} ${style}`}>{row.license}</span>;

}



export const screenColumns = [
  {
    name: "Screen Name",
    uid: "screenName",
    sortable: true,
  },
  { name: "Device Type", uid: "deviceType", sortable: true },
  { name: "Screen ID", uid: "screenId", sortable: true },
  {
    name: "Status",
    uid: "status",
    sortable: true,
    renderOptions: renderStatusChip,
  },
  { name: "Location", uid: "location", sortable: true },
  { name: "License", uid: "license", sortable: true, renderOptions: renderLicenseChip },
  { name: "Playlist", uid: "playlist", sortable: true },
  { name: "Last Seen", uid: "lastSeen", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];
