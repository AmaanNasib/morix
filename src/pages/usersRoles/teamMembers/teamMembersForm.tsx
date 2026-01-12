import {
    Button,
    Card,
    CardBody,
    Chip,
    Select,
    SelectItem,
    Switch,
} from "@heroui/react";
import { Plus, Settings, Shield, User } from "lucide-react";
import { useState } from "react";

import { CustomModal } from "@/components/CustomModal";
import TextInput from "@/components/InputController/text-input";
import { teamAdd } from "@/services/Teams";

const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
};

const permissions = [
    { label: "Dashboard", access: "View" },
    { label: "Device Management", access: "View" },
    { label: "Real-Time Control", access: "View" },
    { label: "Groups", access: "View" },
    { label: "Library", access: "View" },
    { label: "Playlists", access: "View" },
    { label: "Users & Roles", access: "No access" },
    { label: "License Management", access: "No access" },
    { label: "Reports & Analytics", access: "View" },
    { label: "Settings", access: "No access" },
];

const roles = [
    { key: "Admin", label: "Admin", description: "Full access", color: "danger" },
    {
        key: "Editor",
        label: "Editor",
        description: "Limited editing",
        color: "warning",
    },
    {
        key: "Viewer",
        label: "Viewer",
        description: "Read-only access",
        color: "success",
    },
];

interface TeamMembersFormProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function TeamMembersForm({
    isOpen,
    onOpenChange,
}: TeamMembersFormProps) {
    const [selectedRole, setSelectedRole] = useState("Viewer");
    const [customPermissions, setCustomPermissions] = useState(false);
    const [formData, setFormData] = useState(initialFormData);

    // ✅ Handle text input change
    const handleChange = (value: string, name?: string) => {
    setFormData((prevFormData) => ({
        ...prevFormData,
        [name as string]: value,
    }));
};

    // ✅ Handle form submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form Data:", {
            ...formData,
            role: selectedRole,
            customPermissions,
        });
        const payload = { ...formData, role: selectedRole, customPermissions };

        const result = await teamAdd(payload)

        if (result.success) {
            onOpenChange(false); // close modal after submit (optional)
        } else {
            alert(result.message);
        }
    };

    // === Modal Header ===
    const header = (
        <div className="flex items-center gap-2 pb-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-md bg-red-600 text-white">
                <Plus size={16} />
            </div>
            <h2 className="text-lg font-semibold">Add New Team Member</h2>
        </div>
    );

    // === Modal Body ===
    const body = (
        <form className="space-y-4" id="teamMemberForm" onSubmit={handleSubmit}>
            <p className="text-sm text-gray-600">
                Create a new user account and configure their role and permissions.
            </p>

            {/* === Basic Information === */}
            <section className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex gap-2">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl text-white bg-[#D12027]">
                        <User className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                        <p className="text-xs font-medium uppercase text-[#13253380]">
                            Basic Information
                        </p>
                        <p className="text-sm text-[#132533BF]">
                            Profile picture, name, email, and phone
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <TextInput
                        label="Full Name"
                        name="fullName"
                        placeholder="Enter full name"
                        required={true}
                        type="text"
                        value={formData.fullName}
                        width="w-full"
                        onChange={handleChange}
                    />
                    <TextInput
                        label="Email Address"
                        name="email"
                        placeholder="Email address"
                        required={true}
                        type="email"
                        validate={(val) =>
                            !val.includes("@") ? "Invalid email address" : null
                        }
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <TextInput
                    label="Phone Number (Optional)"
                    name="phone"
                    placeholder="Enter phone number"
                    type="number"
                    value={formData.phone}
                    onChange={(value, name) => {
                        const restrictedValue = value.replace(/\D/g, "").slice(0, 10);

                        handleChange(restrictedValue, name);
                    }}
                />
            </section>

            {/* === Role & Permissions === */}
            <section className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-xs uppercase text-[#13253380]">
                            ROLE & PERMISSIONS
                        </p>
                        <p className="text-sm text-[#132533BF]">
                            Select user role and access level
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-orange-600">
                        <Shield className="w-5 h-5 text-white" />
                    </div>
                </div>

                <Select
                    className="max-w-md"
                    renderValue={(items) =>
                        items.map((item) => (
                            <div key={item.key} className="flex items-center gap-2">
                                <Chip
                                    className="font-semibold rounded-lg border-1 shadow-md"
                                    color={roles.find((r) => r.key === item.key)?.color as "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined}
                                    size="sm"
                                    variant="bordered"
                                >
                                    {item.textValue}
                                </Chip>
                                <span className="text-gray-600 text-sm">
                                    {roles.find((r) => r.key === item.key)?.description}
                                </span>
                            </div>
                        ))
                    }
                    selectedKeys={[selectedRole]}
                    onChange={(e) => setSelectedRole(e.target.value)}
                >
                    {roles.map((role) => (
                        <SelectItem key={role.key} textValue={role.label}>
                            <div className="flex items-center gap-2">
                                <Chip
                                    className="font-semibold"
                                    color={role.color as "success" | "danger" | "warning" | "default" | "primary" | "secondary" | undefined}
                                    size="sm"
                                    variant="bordered"
                                >
                                    {role.label}
                                </Chip>
                                <span className="text-gray-600 text-sm">
                                    {role.description}
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </Select>

                <Card className="rounded-md bg-gray-200">
                    <CardBody className="text-sm p-4">
                        {selectedRole === "Viewer" &&
                            "Read-only access to system information and reports"}
                        {selectedRole === "Editor" &&
                            "Can manage content but not system settings"}
                        {selectedRole === "Admin" &&
                            "Full control over all modules and configurations"}
                    </CardBody>
                </Card>
            </section>

            {/* === Custom Permissions === */}
            <section className="border border-gray-200 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl text-white bg-orange-500">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs uppercase font-semibold text-[#6B7280]">
                            Custom Permissions
                        </p>
                        <p className="text-sm text-[#374151] font-medium">
                            Override default role permissions
                        </p>
                    </div>
                </div>
                <Switch
                    checked={customPermissions}
                    classNames={{
                        wrapper: "bg-gray-300 data-[selected=true]:bg-green-500",
                    }}
                    size="sm"
                    onChange={(e) => setCustomPermissions(e.target.checked)}
                />
            </section>

            {/* === Permission Summary === */}
            <section className="border border-gray-200 rounded-lg p-4 space-y-2">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <p className="text-xs uppercase text-[#13253380]">
                            Permission Summary
                        </p>
                        <p className="text-sm text-[#132533BF]">
                            Final permissions for this user
                        </p>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl text-white bg-green-600">
                        <Shield className="w-5 h-5" color="white" />
                    </div>
                </div>

                {permissions.map((perm, idx) => (
                    <div
                        key={idx}
                        className="flex justify-between items-center py-2 text-sm border-b border-[#1325330D]"
                    >
                        <span className="text-gray-800">{perm.label}</span>
                        <span
                            className={`text-sm font-medium ${perm.access === "No access"
                                ? "text-gray-400"
                                : "text-green-600"
                                }`}
                        >
                            {perm.access}
                        </span>
                    </div>
                ))}
            </section>
        </form>
    );

    // === Modal Footer ===
    const footer = (
        <>
            <Button variant="flat" onPress={() => onOpenChange(false)}>
                Cancel
            </Button>
            <Button
                className="bg-primary text-white h-9"
                color="danger"
                form="teamMemberForm"// connect to the form inside body
                size="md"
                startContent={<Plus className="w-5 h-5" />}
                type="submit"
            >
                Add User
            </Button>
        </>
    );

    return (
        <CustomModal
            body={body}
            footer={footer}
            header={header}
            isOpen={isOpen}
            placement="center"
            size="md"
            onOpenChange={onOpenChange}
        />
    );
}
