import { Card, CardBody } from "@heroui/react";
import { Crown, Edit, Eye, Shield } from "lucide-react";
import { useState } from "react";

type Role = "admin" | "editor" | "viewer";

type Permission = {
  feature: string;
  admin: string;
  editor: string;
  viewer: string;
};


// import { Edit } from "@/assets/index.js";

export const RoleManagementTable = () => {
    const initialPermissions = [
        { feature: "User Management", admin: "Full Access", editor: "No Access", viewer: "No Access" },
        { feature: "Role & Permission Control", admin: "Yes", editor: "No", viewer: "No" },
        { feature: "System Settings", admin: "Yes", editor: "No", viewer: "No" },
        { feature: "Device Management", admin: "Yes", editor: "No", viewer: "View Only" },
        { feature: "Content Upload", admin: "Yes", editor: "Yes", viewer: "No" },
        { feature: "Content Organization", admin: "Yes", editor: "Yes", viewer: "No" },
        { feature: "Playlist Creation", admin: "Yes", editor: "Yes", viewer: "No" },
        { feature: "Content Scheduling", admin: "Yes", editor: "Yes", viewer: "View Only" },
        { feature: "Reports & Analytics", admin: "Full Access", editor: "Content-related", viewer: "View Only" },
        { feature: "Audit Logs", admin: "Full Access", editor: "Limited View", viewer: "View Only" },
    ];

    const [permissions, setPermissions] = useState<Permission[]>(initialPermissions);
    const [isEditorEnabled, setIsEditorEnabled] = useState(true);
    const [isViewerEnabled, setIsViewerEnabled] = useState(true);

    // ✅ Toggle individual cell
    const togglePermission = (feature: string, role: Role, value: string) => {
        setPermissions((prev) =>
            prev.map((item) =>
                item.feature === feature
                    ? { ...item, [role]: item[role] === value ? "No" : value }
                    : item
            )
        );
    };

    // ✅ Enable / Disable All Editor
    const toggleAllEditor = () => {
        setPermissions((prev) =>
            prev.map((item) => ({
                ...item,
                editor: isEditorEnabled ? "Yes" : "No",
            }))
        );
        setIsEditorEnabled(!isEditorEnabled);
    };

    // ✅ Enable / Disable All Viewer
    const toggleAllViewer = () => {
        setPermissions((prev) =>
            prev.map((item) => ({
                ...item,
                viewer: isViewerEnabled ? "View Only" : "No",
            }))
        );
        setIsViewerEnabled(!isViewerEnabled);
    };


    return (
        <div className="w-full space-y-6">
            <Card>
                {/* Header */}
                <CardBody className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">
                                Role–Permission Matrix
                            </h2>
                            <p className="text-sm text-gray-500">
                                Click checkboxes to modify access levels and permissions for each role type
                            </p>
                        </div>

                        <div className="flex gap-2">
                            <button
                                className={`border px-3 py-1.5 rounded-md text-sm font-medium transition ${isEditorEnabled
                                    ? "text-orange-600 border-orange-200 bg-orange-50 hover:bg-orange-100"
                                    : "text-gray-600 border-gray-200 bg-gray-50 hover:bg-gray-100"
                                    }`}
                                onClick={toggleAllEditor}
                            >
                                {isEditorEnabled ? "Enable All Editor" : "Disable All Editor"}
                            </button>

                            <button
                                className={`border px-3 py-1.5 rounded-md text-sm font-medium transition ${isViewerEnabled
                                    ? "text-green-600 border-green-200 bg-green-50 hover:bg-green-100"
                                    : "text-gray-600 border-gray-200 bg-gray-50 hover:bg-gray-100"
                                    }`}
                                onClick={toggleAllViewer}
                            >
                                {isViewerEnabled ? "Enable All Viewer" : "Disable All Viewer"}
                            </button>
                        </div>
                    </div>

                    {/* Table */}
                    <table className="w-full text-sm border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-gray-700 text-left border-b border-gray-100">
                                <th className="pb-3 font-medium w-1/3">Feature / Access</th>
                                <th className="pb-3 font-medium">
                                    <div className="flex items-center gap-2 text-red-500">
                                        <Crown size={16} /> Admin
                                    </div>
                                </th>
                                <th className="pb-3 font-medium">
                                    <div className="flex items-center gap-2 text-orange-500">
                                        <Edit size={16} /> Editor
                                    </div>
                                </th>
                                <th className="pb-3 font-medium">
                                    <div className="flex items-center gap-2 text-green-600">
                                        <Eye size={16} /> Viewer
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {permissions.map((item, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    <td className="py-3 font-medium text-gray-800">
                                        {item.feature}
                                    </td>

                                    {/* Admin */}
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={item.admin !== "No"}
                                                className="accent-red-500 w-4 h-4 rounded"
                                                type="checkbox"
                                                onChange={() =>
                                                    togglePermission(item.feature, "admin", "Full Access")
                                                }
                                            />
                                            <span className="text-sm text-gray-700">{item.admin}</span>
                                        </div>
                                    </td>

                                    {/* Editor */}
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={item.editor !== "No" && item.editor !== "No Access"}
                                                className="accent-orange-500 w-4 h-4 rounded"
                                                type="checkbox"
                                                onChange={() =>
                                                    togglePermission(item.feature, "editor", "Yes")
                                                }
                                            />
                                            <span className="text-sm text-gray-700">{item.editor}</span>
                                        </div>
                                    </td>

                                    {/* Viewer */}
                                    <td className="py-3">
                                        <div className="flex items-center gap-2">
                                            <input
                                                checked={item.viewer !== "No" && item.viewer !== "No Access"}
                                                className="accent-green-500 w-4 h-4 rounded"
                                                type="checkbox"
                                                onChange={() =>
                                                    togglePermission(item.feature, "viewer", "View Only")
                                                }
                                            />
                                            <span className="text-sm text-gray-700">{item.viewer}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardBody>
            </Card>

            <Card className="bg-white border border-gray-100 shadow-sm rounded-xl p-6 mt-6 space-y-6">

                {/* === Permission Legend === */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                        Permission Guidelines
                    </h2>

                    <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-md text-sm font-medium">
                            <Shield size={16} /> Full Access
                            <span className="ml-1 text-gray-500 font-normal">
                                Complete permissions
                            </span>
                        </div>

                        <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 text-yellow-700 px-3 py-1.5 rounded-md text-sm font-medium">
                            <Shield size={16} /> Limited Access
                            <span className="ml-1 text-gray-500 font-normal">
                                Restricted permissions
                            </span>
                        </div>

                        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-3 py-1.5 rounded-md text-sm font-medium">
                            <Shield size={16} /> No Access
                            <span className="ml-1 text-gray-500 font-normal">
                                Feature disabled
                            </span>
                        </div>

                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1.5 rounded-md text-sm font-medium">
                            <Shield size={16} /> Protected
                            <span className="ml-1 text-gray-500 font-normal">
                                Cannot be changed
                            </span>
                        </div>
                    </div>

                    {/* Note */}
                    <div className="bg-gray-50 border border-gray-100 rounded-md mt-4 px-3 py-2 text-sm text-gray-600">
                        <span className="font-medium">Note:</span> Some permissions like{" "}
                        <span className="font-semibold">User Management</span> and{" "}
                        <span className="font-semibold">Role Control</span> are protected and
                        cannot be modified for Editor and Viewer roles to maintain system
                        security.
                    </div>
                </div>


            </Card>

            {/* === Roles Section === */}
            <div className="grid md:grid-cols-3 gap-4">
                {/* Admin Role */}
                <Card className="border border-gray-100 rounded-lg p-5 hover:shadow-sm transition">
                    <div className="flex items-center gap-2 mb-3 text-red-600 font-semibold text-base">
                        <Crown size={18} /> Admin Role
                    </div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">
                        Key Responsibilities:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Create and manage user accounts</li>
                        <li>Assign and update roles & permissions</li>
                        <li>Configure system settings</li>
                        <li>Monitor device health</li>
                        <li>Access all reports and analytics</li>
                    </ul>
                </Card>

                {/* Editor Role */}
                <Card className="border border-gray-100 rounded-lg p-5 hover:shadow-sm transition">
                    <div className="flex items-center gap-2 mb-3 text-orange-500 font-semibold text-base">
                        <Edit size={18} /> Editor Role
                    </div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">
                        Key Responsibilities:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>Upload and organize media files</li>
                        <li>Create and manage playlists</li>
                        <li>Assign content to screens/groups</li>
                        <li>Edit media metadata</li>
                        <li>Schedule content delivery</li>
                    </ul>
                </Card>

                {/* Viewer Role */}
                <Card className="border border-gray-100 rounded-lg p-5 hover:shadow-sm transition">
                    <div className="flex items-center gap-2 mb-3 text-green-600 font-semibold text-base">
                        <Eye size={18} /> Viewer Role
                    </div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-700">
                        Key Responsibilities:
                    </h4>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        <li>View dashboards & analytics</li>
                        <li>Monitor device statuses</li>
                        <li>Access media usage statistics</li>
                        <li>Review system logs & reports</li>
                        <li>No modification privileges</li>
                    </ul>
                </Card>
            </div>
        </div >
    );
};
