import { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, addToast } from "@heroui/react";
import { Upload } from "lucide-react";

import { addMedia } from "@/services/mediaFileManagement";
import FileUpload from "@/components/InputController/file-upload";


interface UploadMediaProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}

export default function UploadMedia({ isOpen, setIsOpen }: UploadMediaProps) {
    const [mediaFile, setMediaFile] = useState<File[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>("");

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const formData = new FormData();

            formData.append("file", mediaFile[0]);
            const response = await addMedia(formData);

            if (response.success) {
                addToast({
                    color: "success",
                    title: response.message,
                    description: response.message
                });
                setLoading(false);
            } else{
                setError(response.message);
            }
            setIsOpen(false);
        }
        catch (err) {
            console.log(err);
            addToast({
                color: "danger",
                title: error,
                description: "Something went wrong"
            })
        }
    }

    return (
        <div className="p-[32px]">
            <Modal
                isOpen={isOpen}
                scrollBehavior="outside"
                onClose={() => setIsOpen(false)}
            >
                <ModalContent className="w-[703px] max-w-[703px] p-[32px]">
                    <ModalHeader className="flex flex-row gap-[16px] items-start">
                        <div className="bg-[#D120271A] rounded-[8px] my-[6px] p-2">
                            <Upload color="#D12027" size={24} />
                        </div>
                        <div className="flex flex-col items-start">
                            <h2 className="text-xl font-semibold">Upload Media Files</h2>
                            <p className="text-sm text-gray-500">
                                Upload, organize, and manage your media content
                            </p>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FileUpload
                            accept=".jpg,.png,.gif,.mp4,.avi,.mov"
                            maxSize="100MB"
                            subTitle="or browse to upload"
                            title="Drag & drop files"
                            value={mediaFile}
                            onChange={setMediaFile}
                        />
                    </ModalBody>
                    <ModalFooter className="flex justify-between">
                        <Button
                            className="w-full bg-white border-[1px] border-gray-300 h-[64px] font-medium font-[500]"
                            disabled={loading}
                            onPress={() => setIsOpen(false)}
                        >
                            Close
                        </Button>
                        <Button
                            className="w-full bg-primary text-white h-[64px] font-medium font-[500]"
                            disabled={loading}
                            onPress={() => handleSubmit()}
                        >
                            {loading ? "Uploading..." : "Upload"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>

    );
}