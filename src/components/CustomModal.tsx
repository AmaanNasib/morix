import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@heroui/react";
import React from "react";

interface CustomModalProps {
    /** Modal open/close state */
    isOpen: boolean;
    /** Function to toggle modal */
    onOpenChange: (open: boolean) => void;
    /** Optional Icon component */
    icon?: React.ReactNode;
    /** Header text or JSX */
    header?: React.ReactNode;
    /** Body content (forms, info, etc.) */
    body?: React.ReactNode;
    /** Footer content (buttons, actions, etc.) */
    footer?: React.ReactNode;
    /** Whether modal should be scrollable (default true) */
    scrollable?: boolean;
    /** Optional max width */
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
    /** Placement of modal */
    placement?: "auto" | "top" | "bottom" | "center" | "top-center";
}

export const CustomModal: React.FC<CustomModalProps> = ({
    isOpen,
    onOpenChange,
    header,
    body,
    footer,
    scrollable = true,
    size = "md",
    placement = "top-center",
}) => {
    return (
        <Modal
            className=""
            classNames={{
                base: "max-h-[90vh] overflow-y-auto  rounded-2xl",
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
            placement={placement}
            scrollBehavior={scrollable ? "inside" : "outside"}
            size={size}
            onOpenChange={onOpenChange}
        >
            <ModalContent>
                {() => (
                    <>
                        {/* HEADER */}
                        {header && (
                            <ModalHeader className="flex items-center justify-between">
                                {header}
                            </ModalHeader>
                        )}

                        {/* BODY */}
                        <ModalBody className="custom-scrollbar">{body}</ModalBody>

                        {/* FOOTER */}
                        {footer && (
                            <ModalFooter className="px-6 flex gap-3">{footer}</ModalFooter>
                        )}
                    </>

                )}
            </ModalContent>
        </Modal>
    );
};