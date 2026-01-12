import { CircleCheckBig, Eye, Clock4, CircleAlert } from "lucide-react";

const colorStyles = {
  Approved: {
    color: "text-[#12B76A] border-[#12B76A] bg-[#12B76A]/10",
    icon: <CircleCheckBig className="text-[#12B76A]" size={14} />,
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
} as const;

type Status = keyof typeof colorStyles;

const renderPRNumber = (row: Record<string, any>, columnKey: string) => {
  return (
    <div>
      <p className="text-base font-semibold">{row[columnKey]}</p>
      <p className="text-sm font-normal">{row.requestDate}</p>
    </div>
  )
}

const renderStatus = (
  row: Record<string, string>,
  columnKey: string
) => {
  const status = row[columnKey];

  if (status in colorStyles) {
    const style = colorStyles[status as Status];

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${style.color}`}>
        {style.icon}
        {status}
      </span>
    );
  }

  // fallback
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold border text-gray-600 border-gray-200 bg-gray-50">
      {status}
    </span>
  );
};




const renderSendTo = (row: Record<string, any>, columnKey: string) => {
  return (
    <div>
      <p className="text-base font-semibold">{row[columnKey]}</p>
      <p className="text-sm font-normal">{row.sentToRole}</p>
    </div>
  )
}


export const purchaseRequestColumns = [
  { name: "PR Number", uid: "prNumber", renderOptions: renderPRNumber },
  { name: "Device Type", uid: "deviceType" },
  { name: "Quantity", uid: "quantity" },
  { name: "Sent To", uid: "sentTo", renderOptions: renderSendTo },
  { name: "Sent To Role", uid: "sentToRole", hidden: true },
  { name: "Request Date", uid: "requestDate" },
  { name: "Status", uid: "status", renderOptions: renderStatus, },
  { name: "Actions", uid: "actions", },
]