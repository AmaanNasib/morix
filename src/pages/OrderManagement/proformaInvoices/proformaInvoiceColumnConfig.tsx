import { Download, CircleCheckBig, Clock4 } from "lucide-react";


const renderFrom = (row: Record<string, any>, columnKey: string) => {
    return (
        <div>
            <p className="text-base font-semibold">{row[columnKey].name}</p>
            <p className="text-sm font-normal">{row[columnKey].role}</p>
        </div>
    )
}

const renderPiNumber = (row: Record<string, any>, columnKey: string ) => {
    return (
        <div>
            <p className="text-base font-semibold">{row[columnKey]}</p>
            <p className="text-sm font-normal">{row.requestedDate}</p>
        </div>
    )
}

type InvoiceStatus = "Accepted" | "Received" | "Pending";

const renderStatus = (row: Record<string, string>, columnKey: string) => {
  const baseStyle =
    "px-3 py-1 rounded-full text-xs font-semibold border transition-all flex items-center gap-1";

  const colorStyles: Record<
    InvoiceStatus,
    { color: string; icon: JSX.Element }
  > = {
    Accepted: {
      color: "text-[#12B76A] border-[#12B76A] bg-[#12B76A]/10",
      icon: <CircleCheckBig className="text-[#12B76A]" size={14} />,
    },
    Received: {
      color: "text-[#155DFC] border-[#155DFC] bg-[#155DFC]/10",
      icon: <Download className="text-[#155DFC]" size={14} />,
    },
    Pending: {
      color: "text-[#132533BF] border-[#132533BF] bg-[#132533BF]/10",
      icon: <Clock4 className="text-[#132533BF]" size={14} />,
    },
  };

  const status = row[columnKey] as InvoiceStatus;

  const style =
    colorStyles[status] ?? {
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



export const proformaInvoiceColumns = [
    {
        name: "PI Number",
        uid: "piNumber",
        sortable: true,
        renderOptions: renderPiNumber
    },
    {
        name: "Related PR",
        uid: "relatedPr",
        sortable: true
    },
    {
        name: "From",
        uid: "from",
        sortable: true,
        renderOptions: renderFrom
    },
    {
        name: "Device Type",
        uid: "deviceType",
        sortable: true
    },
    {
        name: "Amount",
        uid: "amount",
        sortable: true,
    },
    {
        name: "Valid Until",
        uid: "validUntil",
        sortable: true
    },
    {
        name: "Status",
        uid: "status",
        sortable: true,
        renderOptions: renderStatus
    },
    {
        name: "Actions",
        uid: "actions",
        sortable: false
    }
];
