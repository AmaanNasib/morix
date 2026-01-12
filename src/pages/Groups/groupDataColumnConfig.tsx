import { Monitor } from "lucide-react";
const renderGroupName = (row: Record<string, string>, columnKey: string) => {
    console.log(row[columnKey]);

    return (
        <div>
            <p className="text-base font-semibold">{row[columnKey]}</p>
            <p className="text-sm font-normal">{row.description}</p>
        </div>
    )
}

const renderCategory = (row: Record<string, string>, columnKey: string) => {
    return (
        <div className="border-[1px] border-red-500 rounded-[7px] p-[6px_20px] flex justify-center items-center text-red-500"><span>{row[columnKey]}</span></div>
    )
}

const renderScreens = (row: Record<string, string>, columnKey: string) => {
    return (
        <div className="flex flex-row flex-wrap justify-between items-center gap-1"><Monitor color="red" />{row[columnKey]}<span className="w-[8px] max-w-[8px] h-[8px] max-h-[8px] rounded-full bg-[#FF9700]" /></div>
    )
}

export const renderStatus = (row: Record<string, string>, columnKey: string) => {
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
    statusColors[row[columnKey]] ?? {
      dot: "bg-gray-400",
      style: "text-gray-600 border-gray-200 bg-gray-50",
    };

  return (
    <span className={`${baseStyle} ${selected.style}`}>
      <span className={`w-2 h-2 rounded-full ${selected.dot}`} />
      {row[columnKey]}
    </span>
  );
};


export const groupDataColumnConfig = [
    {
        name: "Sr.",
        uid: "sr",
    },
    {
        name: "Groups Name",
        uid: "groupsName",
        renderOptions: renderGroupName,
    },
    {
        name: "Category",
        uid: "category",
        renderOptions: renderCategory,
    },
    {
        name: "Screens",
        uid: "screens",
        renderOptions: renderScreens,
    },
    {
        name: "Status",
        uid: "status",
        renderOptions: renderStatus,
    },
    {
        name: "Playlist",
        uid: "playlist",
    },
    {
        name: "Updated",
        uid: "updated",
    },
    {
        name: "Actions",
        uid: "actions",
    }
];