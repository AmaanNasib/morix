import {
  Button,
  Card,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import {
  Check,
  ChevronRight,
  Clipboard,
  Eye,
  MoveLeft,
  X,
  Maximize2,
} from "lucide-react";
import { useState } from "react";

import LayoutSection from "./layoutSection";
import MediaUploadSection from "./mediaUploadSection";
import SettingSection from "./settingSection";
import { CanvasObject } from "./fabricCanvas";
import PreviewCanvas from "./previewCanvas";

interface TeamMembersFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PlayListManagementForm({
  isOpen,
  onOpenChange,
}: TeamMembersFormProps) {
  const [activeMediaSectionTab, setActiveMediaSectionTab] = useState<
    string | number
  >("mediaSection");
  const [layoutActiveSectionTab, setLayoutActiveSectionTab] =
    useState("horizontal");

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewObjects, setPreviewObjects] = useState<CanvasObject[]>([]);
  const [previewSize, setPreviewSize] = useState({ width: 400, height: 500 });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [selectedObjectId, setSelectedObjectId] = useState<
    string | number | null
  >(null);

  const handlePreviewClick = () => {
    setPreviewOpen(true);
  };

  const header = (
    <div className="flex items-center justify-between w-full lg:flex-row-reverse lg:h-10 overflow-x-auto scrollbar-hide space-x-16">
      <div className="flex items-center gap-3 lg:order-2">
        <Button
          className="text-black text-sm font-semibold items-center border-1 px-6 lg:w-fit-content"
          radius="lg"
          size="sm"
          startContent={<MoveLeft size={18} />}
          variant="bordered"
          onPress={() => onOpenChange(false)}
        >
          Exit
        </Button>
      </div>
      <div className="flex items-center gap-3 lg:order-1">
        <Button
          className="text-black text-sm font-semibold items-center border-1 px-6 lg:w-fit-content"
          radius="lg"
          size="sm"
          startContent={<Clipboard size={18} />}
          variant="bordered"
          onPress={() => onOpenChange(false)}
        >
          Read Docs
        </Button>
        <Button
          className="text-danger text-sm font-semibold border-danger border-1 px-6 lg:w-fit-content"
          radius="lg"
          size="sm"
          startContent={<Eye size={18} />}
          variant="bordered"
          onPress={handlePreviewClick}
        >
          Preview
        </Button>
        <Button
          className="text-white text-sm font-semibold px-6 lg:w-fit-content"
          color="success"
          radius="lg"
          size="sm"
          startContent={<Check size={18} />}
          onPress={() => onOpenChange(false)}
        >
          Save
        </Button>
        <Button
          className="text-white text-sm font-semibold px-6 lg:w-fit-content"
          color="danger"
          radius="lg"
          size="sm"
          startContent={<ChevronRight size={18} />}
          onPress={() => onOpenChange(false)}
        >
          Next
        </Button>
      </div>
    </div>
  );

  const body = (
    <div className="flex flex-col lg:flex-row w-full h-auto lg:h-full gap-4 px-4 py-3 overflow-y-auto custom-scrollbar">
      {/* Left: Media */}
      <Card className="p-4 w-full lg:w-[390px] flex-shrink-0 overflow-y-auto space-y-5">
        <MediaUploadSection
          activeTab={activeMediaSectionTab}
          setActiveTab={(key) => setActiveMediaSectionTab(key)}
        />
      </Card>

      {/* Middle: Layout / Canvas */}
      <Card className="p-4 flex-1 min-w-0 overflow-y-auto min-h-full custom-scrollbar">
        <LayoutSection
          activeTab={layoutActiveSectionTab}
          setActiveTab={setLayoutActiveSectionTab}
          selectedObjectId={selectedObjectId}
          setSelectedObjectId={setSelectedObjectId}
          onObjectsChange={(objects) => {
            setPreviewObjects(objects);
          }}
          onPreviewReady={(objects, size) => {
            setPreviewObjects(objects);
            setPreviewSize(size);
          }}
        />
      </Card>

      {/* Right: Settings */}
      <Card className="p-4 w-full lg:w-[390px] flex-shrink-0 overflow-y-auto custom-scrollbar">
        <SettingSection
          selectedObjectId={selectedObjectId}
          currentObject={
            previewObjects.find((o) => o.id === selectedObjectId) || null
          }
          currentLayout={{
            id: 1,
            name: "New Layout",
            duration: 10,
            width: previewSize.width,
            height: previewSize.height,
          }}
          onObjectUpdate={(id, updates) => {
            setPreviewObjects((prev) =>
              prev.map((obj) => (obj.id === id ? { ...obj, ...updates } : obj))
            );
          }}
          onLayoutDurationUpdate={(duration) => {
            console.log("Layout duration updated:", duration);
          }}
        />
      </Card>
    </div>
  );

  return (
    <>
      {/* Main Modal */}
      <Modal
        classNames={{
          base: "max-h-[90vh] overflow-y-auto rounded-2xl",
          backdrop: "bg-zinc-900/50 backdrop-opacity-40",
        }}
        hideCloseButton={true}
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
        placement="center"
        scrollBehavior="inside"
        size="full"
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              {header && (
                <ModalHeader className="flex items-center justify-between border-b-1 border-gray-200 shadow-md">
                  {header}
                </ModalHeader>
              )}
              <ModalBody className="custom-scrollbar">{body}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Preview Modal */}
      <Modal
        classNames={{
          base: isFullscreen ? "max-w-full h-screen rounded-2xl" : "max-w-4xl",
          backdrop: "bg-zinc-900/80 backdrop-opacity-60",
        }}
        hideCloseButton={true}
        isOpen={previewOpen}
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
        placement="center"
        scrollBehavior="inside"
        size={isFullscreen ? "full" : "4xl"}
        onOpenChange={setPreviewOpen}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex items-center justify-between border-b-1 border-gray-200 bg-white">
                <h2 className="text-lg font-bold text-gray-800">Canvas Preview</h2>
                <div className="flex items-center gap-2">
                  <Button
                    isIconOnly
                    className="text-gray-600 hover:bg-gray-100"
                    radius="lg"
                    size="sm"
                    startContent={<Maximize2 size={18} />}
                    title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    variant="light"
                    onPress={() => setIsFullscreen(!isFullscreen)}
                  />
                  <Button
                    isIconOnly
                    className="text-gray-600 hover:bg-gray-100"
                    radius="lg"
                    size="sm"
                    startContent={<X size={18} />}
                    variant="light"
                    onPress={() => setPreviewOpen(false)}
                  />
                </div>
              </ModalHeader>

              <ModalBody className="bg-gray-100 flex items-center justify-center p-8 min-h-[500px]">
                <PreviewCanvas
                  height={previewSize.height}
                  objects={previewObjects}
                  width={previewSize.width}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
