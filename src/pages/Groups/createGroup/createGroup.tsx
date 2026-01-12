// import { CustomModal } from "@/components/CustomModal";
// import { Pencil } from "lucide-react";
// import { Button } from "@heroui/button";

// export default function CreateGroup({ isOpen, setIsOpen }: any) {


//     const handleCancelClick = () => {
//         setIsOpen(false)
//     }

//     const handleSubmit = () => {
//         console.log("Submit Create Group");
//     }

//     const isDisabled = () => {
//         return false;
//     }

//     // Modal Header
//     const header = () => {
//         return (
//             <div className="flex items-center justify-between gap-2">
//                 <div className="w-[40px] min-w-[40px] h-[40px] min-h-[40px] bg-[#D120271A] rounded-[8px] flex justify-center items-center"><Pencil color="red"/></div>
//                 <div>
//                     <h2 className="text-lg font-semibold text-gray-800">Create New Group</h2>
//                     <p className="text-sm text-gray-500">Create a new group to organize your digital signage screens for easier content management.</p>
//                 </div>
//             </div>
//         );
//     }

//     // Modal Body
//     const body = () => {
//         return (
//             <div>
//                     body
//             </div>
//         )
//     }

//     // Modal Footer
//     const footer = () => {
//         return (
//             <div className="flex gap-2">
//                 <Button className="bg-transparent border-[1px] rounded-full border-gray-300" onPress={() => handleCancelClick()}>Cancel</Button>
//                 <Button className="bg-primary rounded-full text-white" isDisabled={isDisabled()} onPress={() => handleSubmit()}>Create Group</Button>
//             </div>
//         )
//     }


//     return (
//         <CustomModal
//             isOpen={isOpen}
//             onOpenChange={setIsOpen}
//             header={header()}
//             body={body()}
//             footer={footer()}
//             size="lg"
//         />
//     );
// }



import { useState } from "react";
import { Button, Textarea } from "@heroui/react";
import { Pencil } from "lucide-react";

import { CustomModal } from "@/components/CustomModal";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";
import TextInput from "@/components/InputController/text-input";

interface FormDataProps {
    groupName: string;
    category: string;
    description: string;
    location: string;
    tags: string[];
    screen: string;
}

export default function CreateGroup({ isOpen, setIsOpen }: any) {
    const [formData, setFormData] = useState<FormDataProps>({
        groupName: "",
        category: "",
        description: "",
        location: "",
        tags: [],
        screen: "",
    });

    const TAG_OPTIONS = [
        "Mall", "Outdoor", "Indoor", "Digital", "Retail",
        "Corporate", "Billboard"
    ];

    const handleChange = (value: string | { value: string }, name?: string) => {
        setFormData({
            ...formData,
            [name as string]: typeof value === "object"
                ? value?.value ?? value
                : value,
        });
    };

    const toggleTag = (tag: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter(t => t !== tag)
                : [...prev.tags, tag]
        }));
    };

    const isDisabled = () => {
        return !formData.groupName || !formData.category;
    };

    const handleCancelClick = () => setIsOpen(false);

    const handleSubmit = () => {
        console.log("Create Group Data:", formData);
    };

    // Body
    const children = () => {
        return (
            <div>
                {/* Group Name + Category */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <TextInput
                        label="Group Name *"
                        name="groupName"
                        placeholder="Enter group name"
                        value={formData.groupName}
                        onChange={handleChange}
                    />

                    <div>
                        <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="category">Category</label>
                        <ReactSelectDropdown
                        data={[
                            { label: "Mall", value: "Mall" },
                            { label: "Corporate", value: "Corporate" },
                            { label: "Outdoor", value: "Outdoor" },
                        ]}
                        error=""
                        field={{label:"category"}}
                        fieldName="category"
                        handleSearchChange={() => { }}
                        handleSelectChange={handleChange}
                        placeholder="Select category"
                        value={formData.category}
                    />
                    </div>
                </div>

                {/* Description */}
                <Textarea
                    className="mt-2"
                    label="Description"
                    labelPlacement="outside"
                    placeholder="Enter a short description..."
                    value={formData.description}
                    onChange={(e) => handleChange(e.target.value, "description")}
                    
                />
                <p className="text-xs font-normal text-gray-500">Enter a short description to identify the purpose of this group</p>

                {/* Location */}
                <div className="mt-4">
                    <TextInput
                        label="Location"
                        name="location"
                        placeholder="Enter location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>

                {/* Tags */}
                <p className="text-sm font-medium text-gray-700 mt-4">Tags</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {TAG_OPTIONS.map((tag) => (
                        <button
                            key={tag}
                            className={`px-3 py-1 rounded-full border ${
                                formData.tags.includes(tag)
                                    ? "bg-red-600 text-white"
                                    : "bg-gray-100 text-gray-600"
                            }`}
                            type="button"
                            onClick={() => toggleTag(tag)}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Screens */}
                <div className="mt-4">
                    <label className="text-sm font-medium text-gray-700 mb-1 block" htmlFor="screen">Select Screens</label>
                    <ReactSelectDropdown
                        data={[
                            { label: "Screen 1", value: "screen1" },
                            { label: "Screen 2", value: "screen2" },
                        ]}
                        error=""
                        field={{label:"screen"}}
                        fieldName="screen"
                        handleSearchChange={() => { }}
                        handleSelectChange={handleChange}
                        placeholder="Select screen"
                        value={formData.screen}
                    />
                </div>
            </div>
        );
    };

    // Header
    const header = () => {
        return (
            <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] min-w-[40px] min-h-[40px] bg-[#D120271A] rounded-md flex justify-center items-center">
                    <Pencil color="red" />
                </div>
                <div>
                    <p className="text-base font-semibold">Create New Group</p>
                    <p className="text-sm text-gray-500">
                        Create a new group to organize your digital signage screens.
                    </p>
                </div>
            </div>
        );
    };

    // Footer
    const footer = () => {
        return (
            <div className="flex gap-2">
                <Button className="bg-transparent border-[1px] rounded-full border-gray-300" onPress={handleCancelClick}>
                    Cancel
                </Button>

                <Button
                    className="bg-primary text-white rounded-full"
                    isDisabled={isDisabled()}
                    onPress={handleSubmit}
                >
                    Create Group
                </Button>
            </div>
        );
    };

    return (
        <CustomModal
            body={children()}
            footer={footer()}
            header={header()}
            isOpen={isOpen}
            scrollable={true}
            onOpenChange={setIsOpen}
        />
    );
}
