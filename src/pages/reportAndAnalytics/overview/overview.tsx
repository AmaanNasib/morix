import { Monitor, CirclePlay, TriangleAlert } from "lucide-react";
import { ReactNode } from "react";
import { Chip } from "@heroui/react";

interface OverviewCardItem {
  title: string;
  description: string;
  status: string;
  updated: string;
  icon: ReactNode;
  iconBg: string;
}

const overviewCard = (item: OverviewCardItem) => {
  return (
    <div className="rounded-xl p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 bg-[#0F172A0D]">
      <div className="flex flex-row items-center gap-2 sm:gap-3">
        <div className={`w-8 h-8 sm:w-[32px] sm:h-[32px] ${item.iconBg} rounded-[10px] flex items-center justify-center text-white flex-shrink-0`}>
          {item.icon}
        </div>
        <h3 className="text-sm sm:text-base font-medium truncate">{item.title}</h3>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{item.description}</p>
      <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm gap-1 sm:gap-2">
        <Chip className="text-green-500 w-fit text-xs">{item.status}</Chip>
        <span className="text-gray-500">Updated {item.updated}</span>
      </div>
    </div>
  );
};

export default function OverviewPage() {

  const overviewData = [
    {
      title: "Quick Reports",
      description: "Overview reports and analytics coming soon.",
      status: "Ready",
      updated: "2h ago",
      icon: <Monitor size={18} />,
      iconBg: "bg-[#D12027]",
    },
     {
      title: "Quick Reports",
      description: "Overview reports and analytics coming soon.",
      status: "Ready",
      updated: "2h ago",
      icon: <CirclePlay size={18} />,
      iconBg: "bg-[#12B76A]",
    },
     {
      title: "Quick Reports",
      description: "Overview reports and analytics coming soon.",
      status: "Ready",
      updated: "2h ago",
      icon: <TriangleAlert size={18} />,
      iconBg: "bg-[#F79009]",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
      <h2 className="text-sm sm:text-base font-medium mb-1 sm:mb-2">Quick Reports</h2>
      <p className="text-xs sm:text-sm md:text-base font-normal text-gray-600 mb-4 sm:mb-0">Overview reports and analytics coming soon.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4">
        {overviewData.map((item, index) => (
          <div key={index}>
            {overviewCard(item)}
          </div>
        ))}
      </div>
    </div>
  );
}

