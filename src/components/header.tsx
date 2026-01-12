import { Avatar, AvatarIcon } from "@heroui/react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { AlertTriangle, CheckCircle2, Dot, MessageCircle, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import TextInput from "./InputController/text-input";
import NotificationDropdown from "./NotificationDropdown";

import { useAuth } from "@/config/AuthContext";

const count = 5;

const notificationsData = [
  {
    id: 1,
    title: "License Renewal Approved",
    message: "Your license LIC-001 has been renewed successfully.",
    time: "2 mins ago",
    icon: <CheckCircle2 className="text-green-500 w-4 h-4" />,
  },
  {
    id: 2,
    title: "New Device Linked",
    message: "Reception Display has been added to your account.",
    time: "10 mins ago",
    icon: <MessageCircle className="text-blue-500 w-4 h-4" />,
  },
  {
    id: 3,
    title: "License Expiring Soon",
    message: "Main Entrance Display license expires in 2 days.",
    time: "1 hour ago",
    icon: <AlertTriangle className="text-yellow-500 w-4 h-4" />,
  },
];


export default function Header() {
  const [search, setSearch] = useState("");
  const { user, logout }: { user: any | null, logout: () => void } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="h-20 w-full flex items-center justify-between px-6 bg-white border-b border-gray-200 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex items-center w-1/3 relative">
        <TextInput
          icon={<Search size={18} />}
          placeholder="What are you looking for?"
          type="search"
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* Right Side: Date + Notifications + User */}
      <div className="flex items-center gap-6">
        {/* Last Updated Date */}
        <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg">
          <Dot size={18} />
          <span>
            Last Login:{" "}
            {new Date(user?.lastLogin).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>

        {/* Notifications */}
        <NotificationDropdown count={count} notifications={notificationsData} />

        {/* User Menu */}
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <div className="flex items-center gap-2 cursor-pointer">
              <Avatar
                classNames={{
                  base: "bg-linear-to-br from-[#FFB457] to-[#FF705B]",
                  icon: "text-white/80 w-8 h-8",
                }}
                icon={<AvatarIcon />}
              />
              <div className="hidden md:flex flex-col leading-tight">
                <span className="font-medium text-gray-900">{user?.firstName + " " + user?.lastName}</span>
                <span className="text-xs text-gray-500">{user?.role?.name}</span>
              </div>
            </div>
          </DropdownTrigger>

          <DropdownMenu aria-label="User Menu">
            <DropdownItem key="profile">My Profile</DropdownItem>
            <DropdownItem key="logout" className="text-danger" color="danger" onClick={handleLogout}>
              Logout
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
    </header>
  );
}
