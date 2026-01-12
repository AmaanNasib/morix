import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@heroui/react";
import { Bell } from "lucide-react";


interface NotificationProps {
    count: number;
    notifications: {
        id: number;
        title: string;
        message: string;
        time: string;
        icon: React.ReactNode;
    }[];
}
export default function NotificationDropdown({ count, notifications }: NotificationProps) {

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <button className="relative flex items-center justify-center w-10 h-10 rounded-full border-2 border-[#D9D9D9] bg-white hover:shadow-sm transition">
                    <Bell className="w-6 h-6 text-[#666666]" />
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            {count}
                        </span>
                    )}
                </button>
            </DropdownTrigger>

            {/* ✅ Use items prop instead of direct children mapping */}
            <DropdownMenu
                aria-label="Notifications"
                className="max-h-[350px] overflow-y-auto p-0"
                items={[
                    {
                        key: "header",
                        isReadOnly: true,
                        content: (
                            <div className="text-sm font-semibold text-gray-700 bg-gray-100 cursor-default p-2">
                                Notifications ({count})
                            </div>
                        ),
                    },
                    ...notifications.map((note) => ({
                        key: `note-${note.id}`,
                        isReadOnly: true,
                        content: (
                            <div className="flex items-start gap-3 py-3">
                                <div className="flex-shrink-0">{note.icon}</div>
                                <div className="flex flex-col gap-0.5 text-left">
                                    <p className="text-sm font-medium text-gray-800">{note.title}</p>
                                    <p className="text-xs text-gray-500">{note.message}</p>
                                    <span className="text-[10px] text-gray-400">{note.time}</span>
                                </div>
                            </div>
                        ),
                    })),
                    {
                        key: "view-all",
                        isReadOnly: true,
                        content: (
                            <div className="text-center text-sm font-medium text-primary hover:bg-gray-100 py-2">
                                View All Notifications
                            </div>
                        ),
                    },
                ]}
                variant="flat"
            >
                {(item) => (
                    <DropdownItem
                        key={item.key}
                        className={item.key === "header" ? "bg-gray-100 cursor-default" : ""}
                        isReadOnly={item.isReadOnly}
                    >
                        {item.content}
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
}
