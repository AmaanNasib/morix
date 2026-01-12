import { CircleAlert, CircleCheckBig, Clock4, Eye, Monitor, Network } from "lucide-react";
const renderPlaylistName = (row: Record<string, any>, columnKey: string) => {
    return (
        <div>
            <p className="text-base font-semibold">{row[columnKey]}</p>
            <p className="text-sm font-normal">{row.description}</p>
        </div>
    )
}

type playlistStatusTypes = "Active" | "InActive" | "Under Review" | "In Process" | "Pending";

const renderStatus = (row: Record<string, string>, columnKey: string) => {
    const baseStyle =
        "px-3 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-1";

    const colorStyles: Record<playlistStatusTypes, { color: string; icon: JSX.Element }> = {
        Active: {
            color: "text-[#12B76A] border-[#12B76A] bg-[#12B76A]/10",
            icon: <CircleCheckBig className="text-[#12B76A]" size={14} />,
        },
        InActive: {
            color: "text-[#FF0000] border-[#FF0000] bg-[#FF0000]/10",
            icon: <CircleAlert className="text-[#FF0000]" size={14} />,
        },
        "Under Review": {
            color: "text-[#155DFC] border-[#155DFC] bg-[#155DFC]/10",
            icon: <Eye className="text-[#155DFC]" size={14} />,
        },
        "In Process": {
            color: "text-[#FF9700] border-[#FF9700] bg-[#FF9700]/10",
            icon: <Clock4 className="text-[#FF9700]" size={14} />,
        },
        Pending: {
            color: "text-[#132533BF] border-[#132533BF] bg-[#132533BF]/10",
            icon: <CircleAlert className="text-[#132533BF]" size={14} />,
        },
    };

    const status = row[columnKey] as playlistStatusTypes;
    const style =
        colorStyles[status] || {
            color: "text-gray-600 border-gray-200 bg-gray-50",
            icon: null,
        };

    return (
        <span className={`${baseStyle} ${style.color}`}>
            {style.icon}
            {row[columnKey]}
        </span>
    );
};



const renderAssignedTo = (row: Record<string, string>, columnKey: string) => {
    console.log(columnKey);

    return (
        <div>
            <p className="flex gap-2 items-center text-base font-semibold "><Monitor color="red" size={18} />{row.screensCount} Screens</p>
            <p className="flex gap-2 items-center text-base font-semibold"><Network color="red" size={18} /> {row.groupsCount} Groups</p>
        </div>
    )
}
const renderModified = (row: Record<string, string>, columnKey: string) => {
    console.log(columnKey);
    
    return (
        <div>
            <p className="text-base font-semibold"> {row.modifiedAt}</p>
            <p className="text-sm font-normal">{row.modifiedBy}</p>
        </div>
    )
}

export const playListColumns = [
    { name: "Name", uid: "name", hidden: false, sortable: true, renderOptions: renderPlaylistName },
    { name: "Status", uid: "status", renderOptions: renderStatus },
    { name: "Duration", uid: "duration" },
    { name: "Assigned To", uid: "assignedTo", sortable: true, renderOptions: renderAssignedTo },
    { name: "Scheduled", uid: "scheduled" },
    { name: "Modified", uid: "modified", sortable: true, renderOptions: renderModified },
    { name: "Actions", uid: "actions" },
];