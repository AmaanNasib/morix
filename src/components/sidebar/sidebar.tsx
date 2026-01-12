import clsx from "clsx";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


import logo from "../../assets/logo.png";

import {
  ChartSquare,
  Element2,
  ElementEqual,
  FolderMinus,
  Headphone,
  LanguageSquare,
  Monitor,
  Note,
  Note2,
  NotificationBing,
  Profile2user,
  Screenmirroring,
  Setting2,
  Group,
  Logout1
} from "@/assets/index.js";
import { useAuth } from "@/config/AuthContext";

// Icon color configuration - easily customizable
const SIDEBAR_ICON_COLORS = {
  active: "#FFFFFF",      // White when active
  inactive: "#132533",    // Dark gray when inactive
} as const;

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logout } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const menu = [
    {
      title: "GENERAL",
      items: [{ label: "Dashboard", icon: Element2, path: "/dashboard" }],
    },
    {
      title: "MANAGEMENT",
      items: [
        { label: "Device management", icon: Monitor, path: "/devices" },
        { label: "Real-time screen control", icon: Screenmirroring, path: "/screen-control" },
        { label: "Users & Role management", icon: Profile2user, path: "/users" },
        { label: "License management", icon: Note2, path: "/licenses" },
        { label: "Order management", icon: Note2, path: "/orders" },
        { label: "Media files management", icon: FolderMinus, path: "/media" },
      ],
    },
    {
      title: "CONTROLS",
      items: [
        { label: "Playlists", icon: ElementEqual, path: "/playlists" },
        { label: "Groups", icon: Group, path: "/groups" },
        { label: "Library", icon: Note, path: "/library" },
      ]
    },
    {
      title: "SUPPORT",
      items: [
        { label: "Reports & Analytics", icon: ChartSquare, path: "/analytics" },
        { label: "Multi-language support", icon: LanguageSquare, path: "/languages" },
        { label: "Help & Support", icon: Headphone, path: "/support" },
        { label: "Notifications", icon: NotificationBing, path: "/notifications" },
        { label: "Settings", icon: Setting2, path: "/settings" },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <aside
      className={clsx(
        "h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0 transition-all duration-300",
        isSidebarOpen ? "w-72" : "w-20"
      )}
      style={{
        "--sidebar-icon-active-color": SIDEBAR_ICON_COLORS.active,
        "--sidebar-icon-inactive-color": SIDEBAR_ICON_COLORS.inactive,
      } as React.CSSProperties}
    >
      {/* Logo + Toggle */}
      <div className="px-4 py-5 flex items-center justify-between border-b border-gray-200">
        <img
          alt="logo"
          className={clsx("transition-all w-40", !isSidebarOpen && "w-10")}
          src={logo}
        />
        <button className="cursor-pointer" onClick={toggleSidebar}>
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav
        className={clsx(
          "flex-1 overflow-y-auto py-4 space-y-6 custom-scrollbar transition-all",
          isSidebarOpen ? "px-3" : "px-1"
        )}
      >
        {menu.map((section, idx) => (
          <div key={idx}>
            {/* Section Title */}
            <p
              className={clsx(
                "text-xs font-semibold text-gray-400 mb-2 pl-2 transition-all",
                !isSidebarOpen && "hidden"
              )}
            >
              {section.title}
            </p>

            <ul className="space-y-1">
              {section.items.map((item, index) => {
                const isActive = pathname.startsWith(item.path);
                const Icon = item.icon;

                return (
                  <li key={index}>
                    <Link
                      className={clsx(
                        "flex items-center py-2.5 rounded-lg text-sm font-medium transition",
                        isActive
                          ? "bg-primary text-white hover:bg-primary-600"
                          : "text-gray-700 hover:bg-gray-100",
                        isSidebarOpen ? "px-3 gap-3" : "px-2 justify-center"
                      )}
                      to={item.path}
                    >
                      <Icon
                        aria-label={item.label}
                        className={clsx(
                          isActive ? "sidebar-icon-active" : "sidebar-icon-inactive"
                        )}
                        height={20}
                        width={20}
                      />

                      {isSidebarOpen && (
                        <span className="whitespace-nowrap">{item.label}</span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-1 border-t border-gray-200">
        <button
          className={clsx(
            "w-full flex items-center text-red-600 py-2.5 rounded-lg hover:bg-red-50 transition cursor-pointer",
            isSidebarOpen ? "px-3 gap-3 justify-between" : "px-2 justify-center"
          )}
          onClick={handleLogout}
        >
          {isSidebarOpen && <span>Logout</span>}
          <Logout1 className="h-6 w-6 logout-icon" />
        </button>
      </div>
    </aside>
  );
}
