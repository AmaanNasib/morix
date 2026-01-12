import { Button, Chip, Pagination } from "@heroui/react";
import { ArrowLeft, Dot, EllipsisVertical, Pencil, Monitor, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import AddScreens from "./addScreens";

import DefaultLayout from "@/layouts/default";

const ITEMS_PER_PAGE = 4;
const TOTAL_SCREENS = 30;

// Generate screens data
const allScreens = Array.from({ length: TOTAL_SCREENS }, (_, index) => ({
  id: index + 1,
  title: `Mall Entrance Display ${index + 1}`,
  location: index % 3 === 0 ? "Main Entrance" : index % 3 === 1 ? "Food Court" : "Parking Area",
  current: "Welcome Campaign",
  uptime: "99.8%",
  status: "Active",
}));

export default function ViewGroup() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [isAddScreenModalOpen, setIsAddScreenModalOpen] = useState(false);

  // Calculate pagination
  const totalPages = useMemo(() => Math.ceil(allScreens.length / ITEMS_PER_PAGE), []);

  // Get current page screens
  const currentScreens = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    return allScreens.slice(startIndex, endIndex);
  }, [page]);

  // Calculate results range
  const startResult = useMemo(() => (page - 1) * ITEMS_PER_PAGE + 1, [page]);
  const endResult = useMemo(
    () => Math.min(page * ITEMS_PER_PAGE, allScreens.length),
    [page]
  );

  return (
    <DefaultLayout>
      <div className="p-4 sm:p-6 md:p-8">

        {/* Back Button */}
        <Button 
          className="bg-white h-[48px] w-full sm:w-auto sm:max-w-[184.67px] p-[12px_20px] border-[1px] border-gray-500 rounded-full shadow-xs"
          onClick={() => navigate("/groups")}
        >
          <ArrowLeft size={18} />
          <span className="ml-2">Back to Groups</span>
        </Button>

        {/* Mall Screen */}
        <div className="bg-white mt-4 sm:mt-6 p-4 sm:p-6 rounded-[16px] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div className="flex gap-3 sm:gap-4 items-start sm:items-center">
              <div className="p-2 sm:p-[8px] rounded-[8px] bg-[#D120271A] flex-shrink-0">
                <Pencil className="sm:w-5 sm:h-5" color="red" size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-sm sm:text-base font-semibold">Mall Screens</h1>
                <p className="text-xs font-medium text-gray-600 mt-1">All screens located in shopping malls</p>
                <div className="flex flex-row gap-1 mt-2 flex-wrap">
                  <Chip className="bg-[#12B76A26] text-[#12B76A] text-xs" startContent={<Dot size={12} strokeWidth={6} />}>
                    Active
                  </Chip>
                  <Chip className="bg-[#12B76A26] text-[#12B76A] text-xs" startContent={<Dot size={12} strokeWidth={6} />}>
                    Active
                  </Chip>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 sm:flex-shrink-0">
              <Button className="bg-white h-[48px] w-full sm:w-auto sm:max-w-[184.67px] p-[12px_20px] border-[1px] border-gray-500 rounded-full">
                <ArrowLeft size={18} />
                <span className="ml-2 hidden sm:inline">Edit Group</span>
                <span className="ml-2 sm:hidden">Edit</span>
              </Button>
              <div className="bg-white h-[48px] w-[48px] border-[1px] border-gray-500 rounded-full flex items-center justify-center p-0 cursor-pointer flex-shrink-0">
                <EllipsisVertical size={20} />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-2 sm:mt-6">
            <div>
              <h3 className="font-semibold text-sm sm:text-[15px]">Total Screens</h3>
              <p className="text-xs font-medium text-gray-600 mt-1">15</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-[15px]">Active Screens</h3>
              <p className="text-xs font-medium text-gray-600 mt-1">14</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-[15px]">Location</h3>
              <p className="text-xs font-medium text-gray-600 mt-1">Multiple Malls</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-[15px]">Last Updated</h3>
              <p className="text-xs font-medium text-gray-600 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>

        {/* Group Screen */}
        <div className="bg-white mt-4 sm:mt-6 p-4 sm:p-6 rounded-[16px] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold">Group Screens</h2>
              <p className="text-gray-500 text-xs sm:text-sm mt-1">
                Manage screens assigned to this group
              </p>
            </div>

            <Button
              className="text-white rounded-full bg-[#D12027] w-full sm:w-auto"
              startContent={<Plus size={18} />}
              onPress={() => setIsAddScreenModalOpen(true)}
            >
              <span className="hidden sm:inline">Add Screen</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {currentScreens.map((screen) => (
              <div
                key={screen.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 border-[1px] border-gray-300 rounded-2xl p-3 sm:p-4"
              >
                <div className="flex gap-3 sm:gap-4 items-start sm:items-center flex-1 min-w-0">
                  <div className="p-2 sm:p-[8px] rounded-[8px] bg-[#D120271A] flex-shrink-0">
                    <Monitor className="sm:w-5 sm:h-5" color="red" size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h1 className="text-sm sm:text-base font-semibold">{screen.title}</h1>
                    <p className="text-xs font-medium text-gray-600 mt-1">{screen.location}</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-5 mt-2">
                      <p className="text-xs font-medium text-gray-600">Current: {screen.current}</p>
                      <p className="text-xs font-medium text-gray-600">Uptime: {screen.uptime}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-between sm:justify-end gap-3 sm:gap-4 sm:flex-shrink-0">
                  <Chip className="bg-[#12B76A26] text-[#12B76A] text-xs" startContent={<Dot size={12} strokeWidth={6} />}>
                    Active
                  </Chip>
                  <div className="bg-white h-[32px] w-[32px] sm:h-[40px] sm:w-[40px] border-[1px] border-gray-300 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0">
                    <EllipsisVertical className="sm:w-5 sm:h-5" size={18} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              {startResult} - {endResult} of {allScreens.length} results
            </p>
            <div className="flex justify-center sm:justify-end">
              <Pagination
                isCompact
                showControls
                color="primary"
                page={page}
                total={totalPages}
                onChange={setPage}
              />
            </div>
          </div>
        </div>

        {/* Footer Screen */}
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-4 sm:mt-6">
          <div className="rounded-2xl bg-white w-full p-3 sm:p-4 lg:p-[16px] shadow-xs">
            <h3 className="text-sm sm:text-base font-semibold">Current Playlist</h3>
            <div className="border-[1px] border-gray-300 rounded-2xl mt-3 sm:mt-4 p-[16px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-medium">Holiday Campaign</h4>
                <p className="text-xs text-gray-600 mt-1">Playing since 9:00 AM</p>
              </div>
              <Chip className="bg-[#12B76A26] text-[#12B76A] text-xs w-fit" startContent={<Dot size={12} strokeWidth={6} />}>
                Active
              </Chip>
            </div>
            <Button className="bg-transparent rounded-full border-[1px] border-gray-300 text-gray-600 text-xs sm:text-sm font-medium w-full mt-3 sm:mt-4 h-[48px]">
              Change Playlist
            </Button>
          </div>
          <div className="rounded-2xl bg-white w-full p-3 sm:p-4 lg:p-[16px] shadow-xs">
            <h3 className="text-sm sm:text-base font-semibold">Scheduled Content</h3>
            <div className="border-[1px] border-gray-300 rounded-2xl mt-3 sm:mt-4 p-[16px] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-medium">Holiday Sale Campaign</h4>
                <p className="text-xs text-gray-600 mt-1">Today 6:00 PM - 10:00 PM</p>
              </div>
              <Chip className="bg-[#12B76A26] text-[#12B76A] text-xs w-fit" startContent={<Dot size={12} strokeWidth={6} />}>
                Scheduled
              </Chip>
            </div>
            <Button className="bg-transparent rounded-full border-[1px] border-gray-300 text-gray-600 text-xs sm:text-sm font-medium w-full mt-3 sm:mt-4 h-[48px]">
              Schedule New Content
            </Button>
          </div>
        </div>
      </div>

      {/* Add Screen Modal */}
      <AddScreens
        existingScreenIds={allScreens.map((screen) => screen.id)}
        isOpen={isAddScreenModalOpen}
        onOpenChange={setIsAddScreenModalOpen}
      />
    </DefaultLayout>
  )
}