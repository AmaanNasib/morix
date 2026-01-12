import { useMemo, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  Chip,
} from "@heroui/react";
import { CalendarDays, Dot, Monitor } from "lucide-react";

interface AddScreensProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  existingScreenIds?: number[]; // IDs of screens already in the group
}

interface Screen {
  id: number;
  name: string;
  screenId: string;
  location: string;
  deviceType: string;
  status: string;
}

// Mock data for all available screens
const ALL_AVAILABLE_SCREENS: Screen[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `Screen Display ${index + 1}`,
  screenId: `DS-${String(index + 1).padStart(6, "0")}`,
  location: index % 4 === 0 ? "Main Entrance" : index % 4 === 1 ? "Food Court" : index % 4 === 2 ? "Parking Area" : "Retail Store",
  deviceType: index % 3 === 0 ? "LED Display" : index % 3 === 1 ? "LCD Screen" : "Projector",
  status: index % 5 === 0 ? "Inactive" : "Active",
}));

export default function AddScreens({ isOpen, onOpenChange, existingScreenIds = [] }: AddScreensProps) {
  const [selectedScreenIds, setSelectedScreenIds] = useState<Set<number>>(new Set());

  // Filter out screens that are already in the group
  const availableScreens = useMemo(() => {
    return ALL_AVAILABLE_SCREENS.filter(
      (screen) => !existingScreenIds.includes(screen.id)
    );
  }, [existingScreenIds]);

  const handleToggleScreen = (screenId: number) => {
    setSelectedScreenIds((prev) => {
      const newSet = new Set(prev);

      if (newSet.has(screenId)) {
        newSet.delete(screenId);
      } else {
        newSet.add(screenId);
      }

      return newSet;
    });
  };

  const handleSubmit = () => {
    const selectedScreens = availableScreens.filter((screen) =>
      selectedScreenIds.has(screen.id)
    );

    console.log("Selected screens:", selectedScreens);
    // TODO: Add API call to add screens to group
    alert(`${selectedScreens.length} screen(s) added successfully!`);
    handleClose();
  };

  const handleClose = () => {
    setSelectedScreenIds(new Set());
    onOpenChange(false);
  };

  return (
    <Modal
      classNames={{
        base: "max-h-[90vh] overflow-y-auto rounded-2xl",
        backdrop: "bg-zinc-900/50 backdrop-opacity-40",
      }}
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      placement="center"
      scrollBehavior="outside"
      size="2xl"
      onClose={handleClose}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-row gap-4 items-start pt-6 px-6">
              <div className="bg-[#D120271A] rounded-[8px] p-2 flex-shrink-0">
                <CalendarDays color="#D12027" size={24} />
              </div>
              <div className="flex flex-col items-start flex-1">
                <h2 className="text-xl font-semibold">Add Screens to Group</h2>
              </div>
            </ModalHeader>

            <ModalBody className="px-6 py-4">
              <div className="space-y-4">
                {/* Screens List */}
                <div className="max-h-[400px] overflow-y-auto space-y-2 custom-scrollbar">
                  {availableScreens.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 px-4">
                      <div className="bg-gray-100 rounded-full p-4 mb-4">
                        <Monitor className="text-gray-400" size={48} />
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2">
                        No Available Screens
                      </h3>
                      <p className="text-sm text-gray-500 text-center max-w-sm">
                        All screens have been added to this group. There are no additional screens available to add.
                      </p>
                    </div>
                  ) : (
                    availableScreens.map((screen) => (
                      <div
                        key={screen.id}
                        className={`flex items-center justify-between gap-4 p-3 sm:p-4 rounded-2xl border transition-colors ${
                          selectedScreenIds.has(screen.id)
                            ? "bg-[#D1202710] border-[#D12027]"
                            : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {/* Left Side: Checkbox, Monitor Icon, Title, Location */}
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <Checkbox
                            classNames={{
                              base: "flex-shrink-0",
                              icon: "text-white",
                            }}
                            isSelected={selectedScreenIds.has(screen.id)}
                            onValueChange={() => handleToggleScreen(screen.id)}
                          />
                          <div className="p-2 sm:p-[8px] rounded-[8px] bg-[#D120271A] flex-shrink-0">
                            <Monitor className="w-4 h-4 sm:w-5 sm:h-5" color="#D12027" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base font-semibold text-gray-900">
                              {screen.name}
                            </h4>
                            <p className="text-xs font-medium text-gray-600 mt-1">
                              {screen.location}
                            </p>
                          </div>
                        </div>

                        {/* Right Side: Status Chip with Dot */}
                        <div className="flex-shrink-0">
                          <Chip
                            className={
                              screen.status === "Active"
                                ? "bg-[#12B76A26] text-[#12B76A]"
                                : "bg-gray-100 text-gray-700"
                            }
                            startContent={<Dot size={12} strokeWidth={6} />}
                          >
                            {screen.status}
                          </Chip>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </ModalBody>

            <ModalFooter className="px-6 pb-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:ml-auto">
                <Button
                  className="w-full sm:w-auto border rounded-full border-gray-300"
                  variant="flat"
                  onPress={onClose}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-[#D12027] text-white w-full rounded-full sm:w-auto"
                  isDisabled={selectedScreenIds.size === 0}
                  onPress={handleSubmit}
                >
                  Add Selected Screen
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

