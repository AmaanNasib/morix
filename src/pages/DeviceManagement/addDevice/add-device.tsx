import { useState } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from "@heroui/react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { Pencil } from "lucide-react"

import { ArrowLeft } from "@/assets/index.js";
import TextInput from "@/components/InputController/text-input";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown.js";


// Define step labels
const steps = [
    "Basic Information",
    "Network & Device Configuration",
    "Initial Playlist Assignment",
    "Review & Confirm",
];

const stepLabels = [
    "Follow the wizard to add a new screen to your network",
    "Configure device type and network settings",
    "Optionally assign a playlist to start playing content immediately",
    "Review and confirm details before adding the screen to your network",
]

interface AddDeviceProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

interface FormState {
    screenName: string;
    screenId: string;
    location: string;
    orientation: string;
    plan: string;
    deviceType: string;
    internetConnectivity: string;
    deviceGroup: string;
}

export default function AddDevice({ isOpen, setIsOpen }: AddDeviceProps) {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [form, setForm] = useState<FormState>({
        screenName: "",
        screenId: "DS-ZHWWYO",
        location: "",
        orientation: "",
        plan: "",
        deviceType: "",
        internetConnectivity: "",
        deviceGroup: "",
    });

    // Dropdown states
    const handleSearchChangeDropdown = () => { };
    const fetchDropdownData = () => { };

    const handleChange = (value: string | { value: string }, name?: string) => {
        if (typeof name === 'string') {
            setForm({
                ...form,
                [name]: typeof value === 'object' ? value?.value : value,
            });
        }
    };

    const handleNext = () =>
        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));

    const handleBack = () =>
        setActiveStep((prev) => Math.max(prev - 1, 0));

    const handleSubmit = () => {
        alert("Form submitted!");
        setIsOpen(false);
        setActiveStep(0);
    };

    return (
        <Modal
            isOpen={isOpen}
            scrollBehavior="outside"
            size="3xl"
            onClose={() => setIsOpen(false)}
        >
            <ModalContent>
                {/* Modal Header */}
                <ModalHeader className="flex flex-row gap-[16px] items-start">
                    <div className="bg-[#D120271A] rounded-[8px] my-[6px] p-2">
                        <Pencil color="#D12027" size={24} />
                    </div>
                    <div className="flex flex-col items-start">
                        <h2 className="text-xl font-semibold">Add New Device</h2>
                        <p className="text-sm text-gray-500">
                            Step {activeStep + 1} of {steps.length} — {stepLabels[activeStep]}
                        </p>
                    </div>
                </ModalHeader>

                {/* Modal Body */}
                <ModalBody>
                    {/* Stepper */}
                    <Stepper alternativeLabel activeStep={activeStep}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            fontSize: '0.75rem',
                                        },
                                    }}
                                >
                                    {label}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>


                    {/* Step 1 - Basic Info */}
                    {activeStep === 0 && (
                        <div className="mt-4">
                            <div className="grid grid-cols-2 gap-4">
                                <TextInput
                                    label="Screen Name*"
                                    name="screenName"
                                    placeholder="Enter screen name"
                                    value={form.screenName}
                                    onChange={handleChange}
                                />

                                <TextInput
                                    label="Screen ID"
                                    name="screenId"
                                    placeholder="Enter screen ID"
                                    value={form.screenId}
                                    onChange={handleChange}
                                />

                                {/* Location Dropdown */}
                                <div className="w-full">
                                    <label className="text-sm font-medium text-gray-800" htmlFor="location">
                                        Location*
                                    </label>
                                    <ReactSelectDropdown
                                        data={[
                                            { value: "Active", label: "Active" },
                                            { value: "Inactive", label: "Inactive" },
                                            { value: "Unpaired", label: "Unpaired" },
                                        ]}
                                        error=""
                                        field={{label: "location"}}
                                        fieldName="location"
                                        handleSearchChange={handleSearchChangeDropdown}
                                        handleSelectChange={handleChange}
                                        id="location"
                                        placeholder="Select Location"
                                        value={form.location}
                                        onMenuOpen={() => fetchDropdownData()}
                                    />
                                </div>

                                {/* Orientation Dropdown */}
                                <div className="w-full">
                                    <label className="text-sm font-medium text-gray-800" htmlFor="orientation">
                                        Orientation*
                                    </label>
                                    <ReactSelectDropdown
                                        data={[
                                            { value: "Active", label: "Active" },
                                            { value: "Inactive", label: "Inactive" },
                                            { value: "Unpaired", label: "Unpaired" },
                                        ]}
                                        error=""
                                        field={{label: "orientation"}}
                                        fieldName="label"
                                        handleSearchChange={handleSearchChangeDropdown}
                                        handleSelectChange={handleChange}
                                        id="orientation"
                                        placeholder="Select Orientation"
                                        value={form.orientation}
                                        onMenuOpen={() => fetchDropdownData()}
                                    />
                                </div>
                            </div>

                            {/* Plan Dropdown */}
                            <div className="mt-4">
                                <div className="w-full">
                                    <label className="text-sm font-medium text-gray-800" htmlFor="plan">
                                        Select Plan
                                    </label>
                                    <ReactSelectDropdown
                                        data={[
                                            { value: "Active", label: "Active" },
                                            { value: "Inactive", label: "Inactive" },
                                            { value: "Unpaired", label: "Unpaired" },
                                        ]}
                                        error=""
                                        field={{label: "plan"}}
                                        fieldName="label"
                                        handleSearchChange={handleSearchChangeDropdown}
                                        handleSelectChange={handleChange}
                                        id="plan"
                                        placeholder="Select Plan"
                                        value={form.plan}
                                        onMenuOpen={() => fetchDropdownData()}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2 - Plan */}
                    {activeStep === 1 && (
                        <div className="mt-4 space-y-6">
                            {/* Device Type */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                    Device Type
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Smart TV", "LED Panel", "Kiosk", "Tablet", "Smartphone", "Other"].map(
                                        (type) => (
                                            <Button
                                                key={type}
                                                className={`rounded-xl border px-5 py-2 text-sm font-medium ${form.deviceType === type
                                                    ? "bg-red-600 text-white border-red-600"
                                                    : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100"
                                                    }`}
                                                onPress={() => handleChange(type, "deviceType")}
                                            >
                                                {type}
                                            </Button>
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Internet Connectivity */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                    Internet Connectivity
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {["Wi-Fi", "Ethernet/LAN", "Cellular", "Other"].map((net) => (
                                        <Button
                                            key={net}
                                            className={`rounded-xl border px-5 py-2 text-sm font-medium ${form.internetConnectivity === net
                                                ? "bg-red-600 text-white border-red-600"
                                                : "bg-transparent text-gray-700 border-gray-300 hover:bg-gray-100"
                                                }`}
                                            onPress={() => handleChange(net, "internetConnectivity")}
                                        >
                                            {net}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            {/* Device Group Dropdown */}
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 mb-3">
                                    Device Group (Optional)
                                </h3>
                                <ReactSelectDropdown
                                    data={[
                                        { value: "Group A", label: "Group A" },
                                        { value: "Group B", label: "Group B" },
                                        { value: "Group C", label: "Group C" },
                                    ]}
                                    error=""
                                    field={{label: "deviceGroup"}}
                                    fieldName="label"
                                    handleSearchChange={handleSearchChangeDropdown}
                                    handleSelectChange={handleChange}
                                    placeholder="Select Group"
                                    value={form.deviceGroup}
                                    onMenuOpen={() => fetchDropdownData()}
                                />
                            </div>
                        </div>
                    )}

                </ModalBody>

                <ModalFooter className="flex justify-between">
                    <Button
                        className="rounded-3xl py-2 px-6 flex items-center gap-2 border bg-transparent"
                        isDisabled={activeStep === 0}
                        onPress={handleBack}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Previous
                    </Button>

                    <div className="flex gap-3">
                        <Button
                            className="rounded-3xl py-2 px-6 flex items-center gap-2 border bg-transparent"
                            onPress={() => setIsOpen(false)}
                        >
                            Cancel
                        </Button>

                        {activeStep < steps.length - 1 ? (
                            <Button
                                className="rounded-3xl py-2 px-6 flex items-center gap-2 border bg-primary text-white"
                                onPress={handleNext}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                className="rounded-3xl py-2 px-6 flex items-center gap-2"
                                color="primary"
                                onPress={handleSubmit}
                            >
                                Finish
                            </Button>
                        )}
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
