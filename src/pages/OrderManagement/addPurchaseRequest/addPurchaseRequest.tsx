import { useState } from "react";
import { Button, Textarea } from "@heroui/react";
import { Send } from "lucide-react";

import { CustomModal } from "@/components/CustomModal";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import TextInput from "@/components/InputController/text-input";
import CalendarInput from "@/components/InputController/calendar-input";



interface formDataProps {
    deviceType: string;
    quantity: string;
    expDeliveryDate: string;
    distributorName: string;
    notes: string;
};

export default function AddPurchaseRequest({ isOpen, setIsOpen }: any) {
    const [formData, setFormData] = useState<formDataProps>({
        deviceType: "",
        quantity: "",
        expDeliveryDate: "",
        distributorName: "",
        notes: "",
    });
     const isDisabled = () => {
        return (!formData.deviceType || formData.deviceType === "") || !formData.quantity || !formData.expDeliveryDate || !formData.distributorName;
    }

    const handleChange = (value: string | Date | { value: string }, name?: string) => {
    setFormData({ ...formData, [name as string]: typeof value === 'object' ? (value as { value: string }).value : value, });
};

    const handleCancelClick = () => {
        setIsOpen(false)
    }

    const handleSubmit = () => {
        console.log(formData);
    }

    // Children
    const children = () => {
        return (
            <div>
                <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="deviceType">Device Type / Model *</label>
                    <ReactSelectDropdown
                        data={[
                            {
                                label: "Smartphones",
                                value: "Smartphones"
                            },
                            {
                                label: "Smartphones",
                                value: "Smartphones"
                            }
                        ]}
                        error=""
                        field={{label:"deviceType"}}
                        fieldName="deviceType"
                        handleSearchChange={() => { }}
                        handleSelectChange={handleChange}
                        value={formData.deviceType}
                    />
                    <div className="grid grid-cols-2 gap-2 mt-4">
                        <TextInput
                            error=""
                            label="Quantity *"
                            name="quantity"
                            type="number"
                            value={formData.quantity}
                            onChange={handleChange}
                        />
                        <CalendarInput
                            label="Expected Delivery Date *"
                            name="expDeliveryDate"
                            value={formData.expDeliveryDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <TextInput
                        error=""
                        label="Distributor Name *"
                        name="distributorName"
                        value={formData.distributorName}
                        onChange={handleChange}
                    />
                    </div>
                    <Textarea
                        className="mt-4"
                        label="Notes"
                        labelPlacement="outside"
                        placeholder="Add any additional notes or requirements..."
                        value={formData.notes}
                        onChange={(e) => handleChange(e.target.value, "notes")}
                    />
                </div>

            </div>
        )
    }

    // Header
    const header = () => {
        return (
            <div>
                <p className="text-base">Create Purchase Request</p>
                <p className="text-sm font-normal">Submit a new purchase request for digital signage devices</p>
            </div>
        )
    }

    // Footer
    const footer = () => {
        return (
            <div className="flex gap-2">
                <Button className="bg-transparent border-[1px] border-gray-300" onPress={() => handleCancelClick()}>Cancel</Button>
                <Button className="bg-primary text-white" isDisabled={isDisabled()} onPress={() => handleSubmit()}><Send />Submit Purchase Request</Button>
            </div>
        )
    }

    return (
        <CustomModal
            body={children()}
            footer={footer()}
            header={header()}
            isOpen={isOpen}
            scrollable={false}
            onOpenChange={setIsOpen}
        />
    );
}