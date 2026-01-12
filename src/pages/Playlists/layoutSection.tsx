// import {
//   Button,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger,
// } from "@heroui/react";
// import {
//   Maximize,
//   RefreshCw,
//   RotateCcw,
//   RotateCw,
//   ZoomIn,
//   ZoomOut,
// } from "lucide-react";
// import { useState } from "react";

// import { SwitchInput } from "@/components/InputController/Switch-Input";
// import FabricCanvas from "./fabricCanvas";

// interface LayoutSectionProps {
//   activeTab: string;
//   setActiveTab: (tab: string) => void;
// }

// export default function LayoutSection({
//   activeTab,
//   setActiveTab,
// }: LayoutSectionProps) {
//   const [gridEnabled, setGridEnabled] = useState(true);
//   const [resolution, setResolution] = useState("1920 × 1080");
//   const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
//     null
//   );

//   const resolutions = ["1920 × 1080", "1366 × 768", "1280 × 720"];

//   const sampleImages = [
//     "https://picsum.photos/id/786/600/600",
//     "https://picsum.photos/id/520/600/600",
//     "https://picsum.photos/id/77/600/600",
//   ];

//   // maintain per-image zoom and rotation states
//   const [imageStates, setImageStates] = useState(
//     sampleImages.map(() => ({ zoom: 100, rotation: 0 }))
//   );

//   const handleRefresh = () => {
//     setActiveTab("horizontal");
//     setGridEnabled(true);
//     setResolution("1920 × 1080");
//     setSelectedImageIndex(null);
//     setImageStates(sampleImages.map(() => ({ zoom: 100, rotation: 0 })));
//     if (document.fullscreenElement) document.exitFullscreen();
//   };

//   const handleRotate = (direction: "left" | "right") => {
//     if (selectedImageIndex === null) return;
//     setImageStates((prev) =>
//       prev.map((state, i) =>
//         i === selectedImageIndex
//           ? {
//               ...state,
//               rotation:
//                 direction === "left"
//                   ? state.rotation - 90
//                   : state.rotation + 90,
//             }
//           : state
//       )
//     );
//   };

//   const handleZoomChange = (zoomDirection: "in" | "out") => {
//     if (selectedImageIndex === null) return;
//     setImageStates((prev) =>
//       prev.map((state, i) =>
//         i === selectedImageIndex
//           ? {
//               ...state,
//               zoom:
//                 zoomDirection === "in"
//                   ? state.zoom + 10
//                   : Math.max(20, state.zoom - 10),
//             }
//           : state
//       )
//     );
//   };

//   const handleFullScreen = () => {
//     const section = document.getElementById("layoutSection");

//     if (document.fullscreenElement) document.exitFullscreen();
//     else section?.requestFullscreen();
//   };

//   const handleSelectedImage = (index: number) => {
//     setSelectedImageIndex(index);
//   };

//   const gridStyles = gridEnabled
//     ? "bg-[linear-gradient(0deg,transparent_24%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_76%,transparent_77%),linear-gradient(90deg,transparent_24%,rgba(0,0,0,0.05)_25%,rgba(0,0,0,0.05)_26%,transparent_27%,transparent_74%,rgba(0,0,0,0.05)_75%,rgba(0,0,0,0.05)_76%,transparent_77%)] bg-[length:20px_20px]"
//     : "";

//   return (
//     <div className="flex flex-col w-full h-auto gap-4">
//       {/* === Tabs === */}
//       <div className="flex flex-wrap justify-center gap-3">
//         {["horizontal", "vertical", "custom"].map((tab) => (
//           <Button
//             key={tab}
//             className={`flex-1 max-w-[200px] rounded-md border text-sm font-semibold py-2 transition-all
//               ${
//                 activeTab === tab
//                   ? "bg-[#CD1E2F] text-white border-[#CD1E2F]"
//                   : "bg-white text-gray-700 border-[#4A5863] hover:bg-gray-50"
//               }`}
//             onPress={() => setActiveTab(tab)}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)}
//           </Button>
//         ))}
//       </div>

//       {/* === Toolbar === */}
//       <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between bg-white border-t border-gray-300 p-3 gap-3">
//         {/* === Left Controls (Zoom, Rotate, Fullscreen) === */}
//         <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
//           <Button
//             isIconOnly
//             aria-label="Full Screen"
//             size="sm"
//             variant="bordered"
//             onPress={handleFullScreen}
//           >
//             <Maximize className="w-4 h-4" />
//           </Button>

//           <Button
//             isIconOnly
//             aria-label="Rotate Left"
//             disabled={selectedImageIndex === null}
//             size="sm"
//             variant="bordered"
//             onPress={() => handleRotate("left")}
//           >
//             <RotateCcw className="w-4 h-4" />
//           </Button>

//           <Button
//             isIconOnly
//             aria-label="Rotate Right"
//             disabled={selectedImageIndex === null}
//             size="sm"
//             variant="bordered"
//             onPress={() => handleRotate("right")}
//           >
//             <RotateCw className="w-4 h-4" />
//           </Button>

//           <div className="flex items-center gap-2 sm:gap-3">
//             <Button
//               isIconOnly
//               aria-label="Zoom Out"
//               disabled={selectedImageIndex === null}
//               size="sm"
//               variant="bordered"
//               onPress={() => handleZoomChange("out")}
//             >
//               <ZoomOut className="w-4 h-4" />
//             </Button>

//             <span className="text-sm font-medium w-10 text-center">
//               {selectedImageIndex !== null
//                 ? imageStates[selectedImageIndex].zoom
//                 : 100}
//               %
//             </span>

//             <Button
//               isIconOnly
//               aria-label="Zoom In"
//               disabled={selectedImageIndex === null}
//               size="sm"
//               variant="bordered"
//               onPress={() => handleZoomChange("in")}
//             >
//               <ZoomIn className="w-4 h-4" />
//             </Button>
//           </div>
//         </div>

//         {/* === Right Controls (Grid, Resolution, Refresh) === */}
//         <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto">
//           <div className="flex items-center gap-2">
//             <p className="text-sm text-gray-600 font-medium">Grid</p>
//             <SwitchInput
//               value={gridEnabled}
//               onChange={() => setGridEnabled(!gridEnabled)}
//             />
//           </div>

//           <Dropdown>
//             <DropdownTrigger>
//               <Button
//                 className="text-gray-600 min-w-[120px]"
//                 size="sm"
//                 variant="bordered"
//               >
//                 {resolution}
//               </Button>
//             </DropdownTrigger>
//             <DropdownMenu
//               aria-label="Select Resolution"
//               onAction={(key) => setResolution(key as string)}
//             >
//               {resolutions.map((res) => (
//                 <DropdownItem key={res}>{res}</DropdownItem>
//               ))}
//             </DropdownMenu>
//           </Dropdown>

//           <Button
//             isIconOnly
//             aria-label="Refresh"
//             size="sm"
//             variant="bordered"
//             onPress={handleRefresh}
//           >
//             <RefreshCw className="w-4 h-4" />
//           </Button>
//         </div>
//       </div>

//       <FabricCanvas width={950} height={600} showGrid />

//       {/* <div
//                 className={`border-2 border-dashed border-gray-300 rounded-2xl p-2 bg-gray-50 flex-1 transition-all duration-300 ${gridStyles}`}
//                 id="layoutSection"
//             >
//                 <div
//                     className={`grid gap-2 w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-auto
//             ${activeTab === "horizontal"
//                             ? "grid-rows-3"
//                             : activeTab === "vertical"
//                                 ? "grid-cols-3"
//                                 : "grid-cols-2 grid-rows-2"
//                         }`}
//                 >
//                     {sampleImages.map((src, index) => {
//                         const { zoom, rotation } = imageStates[index];

//                         return (
//                             <div
//                                 key={index}
//                                 className={`relative overflow-hidden rounded-md cursor-pointer transition-all duration-300
//     ${selectedImageIndex === index
//                                         ? "border-4 border-[#CD1E2F] shadow-md"
//                                         : "border border-transparent"
//                                     }`}
//                                 role="button"
//                                 tabIndex={0}
//                                 onClick={() => handleSelectedImage(index)}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter" || e.key === " ") {
//                                         handleSelectedImage(index);
//                                     }
//                                 }}
//                             >
//                                 <img
//                                     alt={`Preview ${index + 1}`}
//                                     className="w-full h-full object-cover"
//                                     src={src}
//                                     style={{
//                                         transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
//                                         transformOrigin: "center center",
//                                         transition: "transform 300ms ease",
//                                     }}
//                                 />
//                             </div>

//                         );
//                     })}
//                 </div>
//             </div> */}

//       {/* === Footer Button === */}
//       <div className="flex justify-center pt-2">
//         <Button
//           className="text-[#CD1E2F] border-[#CD1E2F] hover:bg-[#CD1E2F] hover:text-white px-8 py-2 rounded-full"
//           variant="bordered"
//         >
//           New Layout
//         </Button>
//       </div>
//     </div>
//   );
// }





"use client";

import { useRef, useState, useEffect } from "react";

import FabricCanvas, { FabricCanvasRef, CanvasObject } from "./fabricCanvas";

import { SwitchInput } from "@/components/InputController/Switch-Input";

interface Layout {
  id: number;
  name: string;
  objects: CanvasObject[];
}

const PRESET_SIZES = [
  { label: "Small (500×400)", width: 500, height: 400 },
  { label: "Medium (800×600)", width: 800, height: 600 },
  { label: "Large (1024×768)", width: 1024, height: 768 },
  { label: "HD (1280×720)", width: 1280, height: 720 },
  { label: "Full HD (1920×1080)", width: 1920, height: 1080 },
  { label: "Square (500×500)", width: 500, height: 500 },
  { label: "Portrait (600×800)", width: 600, height: 800 },
  { label: "Landscape (800×600)", width: 800, height: 600 },
];

interface LayoutSectionProps {
  // tab control from parent
  activeTab: string;
  setActiveTab: (tab: string) => void;

  // selection + objects sync with parent
  selectedObjectId: string | number | null;
  setSelectedObjectId: (id: string | number | null) => void;
  onObjectsChange?: (objects: CanvasObject[]) => void;

  // (optional) for preview
  onPreviewReady?: (
    objects: CanvasObject[],
    size: { width: number; height: number }
  ) => void;
}

export default function LayoutSection({
  activeTab,
  setActiveTab,
  selectedObjectId,
  setSelectedObjectId,
  onObjectsChange,
  onPreviewReady,
}: LayoutSectionProps) {
  const canvasRef = useRef<FabricCanvasRef | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 500 });
  const [gridEnabled, setGridEnabled] = useState(true);
  const [customOpen, setCustomOpen] = useState(false);
  const [customWidth, setCustomWidth] = useState(400);
  const [customHeight, setCustomHeight] = useState(500);
  const [sizeDropdownOpen, setSizeDropdownOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const [layouts, setLayouts] = useState<Layout[]>([
    { id: 1, name: "Slide 1", objects: [] },
  ]);
  const [activeLayoutId, setActiveLayoutId] = useState(1);
  const [dropdownPos, setDropdownPos] = useState({ top: "0px", left: "0px" });

  const currentLayout = layouts.find((l) => l.id === activeLayoutId)!;

  const updateLayout = (objects: CanvasObject[]) => {
    console.log("Updated layout objects:", objects);
    setLayouts((prev) =>
      prev.map((l) => (l.id === activeLayoutId ? { ...l, objects } : l))
    );
    if (onObjectsChange) onObjectsChange(objects);
    if (onPreviewReady) onPreviewReady(objects, canvasSize);
  };

  const calculateZoom = (width: number, height: number) => {
    if (!containerRef.current) return 1;

    const containerWidth = containerRef.current.clientWidth - 40;
    const containerHeight = containerRef.current.clientHeight - 40;

    const scaleX = containerWidth / width;
    const scaleY = containerHeight / height;

    const scale = Math.min(scaleX, scaleY, 1);

    return Math.max(scale, 0.1);
  };

  const applySize = (w: number, h: number) => {
    setCanvasSize({ width: w, height: h });
    const newZoom = calculateZoom(w, h);

    setZoom(newZoom);
    canvasRef.current?.setResolution(w, h);
    console.log(`Canvas: ${w}×${h}, Zoom: ${(newZoom * 100).toFixed(0)}%`);
    if (onPreviewReady) onPreviewReady(currentLayout.objects, { width: w, height: h });
  };

  const handleOrientationChange = (type: string) => {
    setActiveTab(type);
    if (type === "vertical") applySize(400, 500);
    else if (type === "horizontal") applySize(500, 400);
    else if (type === "custom") {
      setCustomWidth(canvasSize.width);
      setCustomHeight(canvasSize.height);
      setCustomOpen(true);
    }
  };

  const handlePresetSize = (width: number, height: number) => {
    applySize(width, height);
    setSizeDropdownOpen(false);
  };

  const handleSelectionChange = (objId: string | number | null) => {
    console.log("Selection changed to:", objId);
    setSelectedObjectId(objId);
  };

  const handleWheel = (e: WheelEvent) => {
    if (!e.ctrlKey && !e.metaKey) return;

    e.preventDefault();

    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoom = Math.min(Math.max(zoom + delta, 0.1), 2);

    setZoom(newZoom);
    console.log(`Zoom: ${(newZoom * 100).toFixed(0)}%`);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPanning(true);
        if (containerRef.current) {
          containerRef.current.style.cursor = "grab";
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsPanning(false);
        if (containerRef.current) {
          containerRef.current.style.cursor = "auto";
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanStart({ x: e.clientX, y: e.clientY });
      if (containerRef.current) {
        containerRef.current.style.cursor = "grabbing";
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && containerRef.current) {
      const dx = e.clientX - panStart.x;
      const dy = e.clientY - panStart.y;

      containerRef.current.scrollLeft -= dx;
      containerRef.current.scrollTop -= dy;

      setPanStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    if (isPanning && containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }
  };

  const rotateLeftSelected = () => {
    if (selectedObjectId === null) {
      alert("Please select an element first");

      return;
    }

    const updated = currentLayout.objects.map((obj) => {
      if (obj.id === selectedObjectId) {
        return { ...obj, rotation: ((obj.rotation || 0) - 90) % 360 };
      }

      return obj;
    });

    updateLayout(updated);
  };

  const rotateRightSelected = () => {
    if (selectedObjectId === null) {
      alert("Please select an element first");

      return;
    }

    const updated = currentLayout.objects.map((obj) => {
      if (obj.id === selectedObjectId) {
        return { ...obj, rotation: ((obj.rotation || 0) + 90) % 360 };
      }

      return obj;
    });

    updateLayout(updated);
  };

  const scaleDownSelected = () => {
    if (selectedObjectId === null) {
      alert("Please select an element first");

      return;
    }

    const updated = currentLayout.objects.map((obj) => {
      if (obj.id === selectedObjectId) {
        return {
          ...obj,
          width: Math.max(40, (obj.width || 100) - 20),
          height: Math.max(40, (obj.height || 100) - 20),
        };
      }

      return obj;
    });

    updateLayout(updated);
  };

  const scaleUpSelected = () => {
    if (selectedObjectId === null) {
      alert("Please select an element first");

      return;
    }

    const updated = currentLayout.objects.map((obj) => {
      if (obj.id === selectedObjectId) {
        return {
          ...obj,
          width: (obj.width || 100) + 20,
          height: (obj.height || 100) + 20,
        };
      }

      return obj;
    });

    updateLayout(updated);
  };

  const deleteSelected = () => {
    if (selectedObjectId === null) {
      alert("Please select an element first");

      return;
    }

    const updated = currentLayout.objects.filter(
      (obj) => obj.id !== selectedObjectId
    );

    updateLayout(updated);
    setSelectedObjectId(null);
  };

  const resetAll = () => {
    if (window.confirm("Are you sure you want to delete all elements?")) {
      updateLayout([]);
      setSelectedObjectId(null);
    }
  };

  const zoomIn = () => {
    const newZoom = Math.min(zoom + 0.1, 2);

    setZoom(newZoom);
  };

  const zoomOut = () => {
    const newZoom = Math.max(zoom - 0.1, 0.1);

    setZoom(newZoom);
  };

  const zoomFit = () => {
    const newZoom = calculateZoom(canvasSize.width, canvasSize.height);

    setZoom(newZoom);
  };

  const handleDropdownOpen = () => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();

      setDropdownPos({
        top: `${rect.bottom + 8}px`,
        left: `${rect.left}px`,
      });
    }
    setSizeDropdownOpen(!sizeDropdownOpen);
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f5f5",
        overflow: "hidden",
      }}
    >
      {/* HEADER - ORIENTATION BUTTONS */}
      <div
        style={{
          background: "white",
          padding: "12px 16px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          flexShrink: 0,
          overflowX: "auto",
          overflowY: "hidden",
          minHeight: "48px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", gap: "8px", width: "100%", maxWidth: "350px" }}>
          {["vertical", "horizontal", "custom"].map((type) => (
            <button
              key={type}
              style={{
                padding: "7px 14px",
                border:
                  activeTab === type ? "1px solid #CD1E2F" : "1px solid #d1d5db",
                borderRadius: "5px",
                fontSize: "12px",
                fontWeight: "500",
                cursor: "pointer",
                flex: 1,
                background: activeTab === type ? "#CD1E2F" : "#ffffff",
                color: activeTab === type ? "#ffffff" : "#374151",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap",
              }}
              onClick={() => handleOrientationChange(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* TOOLBAR - TOOL BUTTONS */}
      <div
        style={{
          background: "white",
          padding: "10px 12px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          gap: "6px",
          alignItems: "center",
          flexWrap: "wrap",
          flexShrink: 0,
          overflowX: "auto",
          overflowY: "hidden",
          minHeight: "48px",
          maxHeight: "96px",
          position: "relative",
          zIndex: 50,
        }}
      >
        {/* STATUS BADGE */}
        <div
          style={{
            fontSize: "10px",
            color: selectedObjectId ? "#22c55e" : "#ef4444",
            fontWeight: "600",
            padding: "3px 6px",
            background: selectedObjectId ? "#dcfce7" : "#fee2e2",
            borderRadius: "3px",
            minWidth: "100px",
            textAlign: "center",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {selectedObjectId ? `✓ Selected: ${selectedObjectId}` : "⚠ No Selection"}
        </div>

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "20px", background: "#e5e7eb", flexShrink: 0 }} />

        {/* ROTATE BUTTONS */}
        <button
          disabled={!selectedObjectId}
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: selectedObjectId ? "#ffffff" : "#f3f4f6",
            cursor: selectedObjectId ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: selectedObjectId ? "#374151" : "#9ca3af",
            transition: "all 0.2s ease",
            opacity: selectedObjectId ? 1 : 0.5,
            flexShrink: 0,
          }}
          title="Rotate Left"
          onClick={rotateLeftSelected}
        >
          ↺
        </button>

        <button
          disabled={!selectedObjectId}
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: selectedObjectId ? "#ffffff" : "#f3f4f6",
            cursor: selectedObjectId ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: selectedObjectId ? "#374151" : "#9ca3af",
            transition: "all 0.2s ease",
            opacity: selectedObjectId ? 1 : 0.5,
            flexShrink: 0,
          }}
          title="Rotate Right"
          onClick={rotateRightSelected}
        >
          ↻
        </button>

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "20px", background: "#e5e7eb", flexShrink: 0 }} />

        {/* SCALE BUTTONS */}
        <button
          disabled={!selectedObjectId}
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: selectedObjectId ? "#ffffff" : "#f3f4f6",
            cursor: selectedObjectId ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: selectedObjectId ? "#374151" : "#9ca3af",
            transition: "all 0.2s ease",
            opacity: selectedObjectId ? 1 : 0.5,
            flexShrink: 0,
          }}
          title="Scale Down"
          onClick={scaleDownSelected}
        >
          −
        </button>

        <button
          disabled={!selectedObjectId}
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: selectedObjectId ? "#ffffff" : "#f3f4f6",
            cursor: selectedObjectId ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            color: selectedObjectId ? "#374151" : "#9ca3af",
            transition: "all 0.2s ease",
            opacity: selectedObjectId ? 1 : 0.5,
            flexShrink: 0,
          }}
          title="Scale Up"
          onClick={scaleUpSelected}
        >
          +
        </button>

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "20px", background: "#e5e7eb", flexShrink: 0 }} />

        {/* GRID TOGGLE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "11px",
            color: "#6b7280",
            fontWeight: "500",
            flexShrink: 0,
          }}
        >
          <span>Grid</span>
          <SwitchInput
            value={gridEnabled}
            onChange={() => setGridEnabled(!gridEnabled)}
          />
        </div>

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "20px", background: "#e5e7eb", flexShrink: 0 }} />

        {/* ZOOM CONTROLS */}
        <button
          style={{
            width: "28px",
            height: "28px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: "#ffffff",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
            color: "#374151",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          title="Zoom Out"
          onClick={zoomOut}
        >
          −
        </button>

        <div
          style={{
            fontSize: "10px",
            fontWeight: "600",
            color: "#374151",
            minWidth: "38px",
            textAlign: "center",
            background: "#f3f4f6",
            padding: "3px 6px",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {(zoom * 100).toFixed(0)}%
        </div>

        <button
          style={{
            width: "28px",
            height: "28px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: "#ffffff",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
            color: "#374151",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          title="Zoom In"
          onClick={zoomIn}
        >
          +
        </button>

        <button
          style={{
            padding: "4px 8px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: "#ffffff",
            cursor: "pointer",
            fontSize: "10px",
            fontWeight: "500",
            color: "#374151",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
          title="Fit to Screen"
          onClick={zoomFit}
        >
          Fit
        </button>

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "20px", background: "#e5e7eb", flexShrink: 0 }} />

        {/* CANVAS SIZE DROPDOWN */}
        <div ref={dropdownRef} style={{ position: "relative", flexShrink: 0 }}>
          <div
            style={{
              fontSize: "10px",
              fontWeight: "600",
              color: "#374151",
              padding: "4px 8px",
              background: "#f3f4f6",
              borderRadius: "4px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "3px",
              whiteSpace: "nowrap",
              border: "1px solid transparent",
              transition: "all 0.2s",
            }}
            onClick={handleDropdownOpen}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "#d1d5db";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "transparent";
            }}
          >
            {canvasSize.width} × {canvasSize.height} ▼
          </div>

          {sizeDropdownOpen && (
            <div
              style={{
                position: "fixed",
                top: dropdownPos.top,
                left: dropdownPos.left,
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                zIndex: 9999,
                minWidth: "170px",
                maxHeight: "280px",
                overflowY: "auto",
              }}
            >
              {PRESET_SIZES.map((size, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "8px 10px",
                    cursor: "pointer",
                    fontSize: "10px",
                    color: "#374151",
                    transition: "all 0.2s ease",
                    background:
                      canvasSize.width === size.width &&
                      canvasSize.height === size.height
                        ? "#fef2f2"
                        : "white",
                    borderBottom: idx < PRESET_SIZES.length - 1 ? "1px solid #f3f4f6" : "none",
                  }}
                  onClick={() => handlePresetSize(size.width, size.height)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.background = "#fef2f2";
                    (e.currentTarget as HTMLDivElement).style.color = "#CD1E2F";
                  }}
                  onMouseLeave={(e) => {
                    const isSelected =
                      canvasSize.width === size.width &&
                      canvasSize.height === size.height;

                    (e.currentTarget as HTMLDivElement).style.background = isSelected
                      ? "#fef2f2"
                      : "white";
                    (e.currentTarget as HTMLDivElement).style.color = "#374151";
                  }}
                >
                  {size.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DIVIDER */}
        <div style={{ width: "1px", height: "20px", background: "#e5e7eb", flexShrink: 0 }} />

        {/* DELETE BUTTON */}
        <button
          disabled={!selectedObjectId}
          style={{
            width: "30px",
            height: "30px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: selectedObjectId ? "#ffffff" : "#f3f4f6",
            cursor: selectedObjectId ? "pointer" : "not-allowed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "12px",
            color: selectedObjectId ? "#374151" : "#9ca3af",
            opacity: selectedObjectId ? 1 : 0.5,
            flexShrink: 0,
          }}
          title="Delete Selected"
          onClick={deleteSelected}
        >
          🗑
        </button>

        {/* RESET BUTTON */}
        <button
          style={{
            padding: "5px 10px",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            background: "#ffffff",
            cursor: "pointer",
            fontSize: "10px",
            color: "#374151",
            fontWeight: "500",
            transition: "all 0.2s ease",
            flexShrink: 0,
            whiteSpace: "nowrap",
          }}
          title="Reset All Elements"
          onClick={resetAll}
        >
          Reset All
        </button>

        {/* SPACER */}
        <div style={{ flex: 1, minWidth: "8px" }} />

        {/* KEYBOARD HINT */}
        <div style={{ fontSize: "9px", color: "#9ca3af", fontWeight: "500", flexShrink: 0, whiteSpace: "nowrap" }}>
          ⌘+Scroll • Space+Drag
        </div>
      </div>

      {/* MAIN CANVAS AREA */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: "flex",
          overflow: "auto",
          background: "#f5f5f5",
          userSelect: isPanning ? "none" : "auto",
          position: "relative",
          zIndex: 1,
        }}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onWheel={handleWheel as any}
      >
        {/* CANVAS SECTION */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#f5f5f5",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            minWidth: "100%",
            minHeight: "fit-content",
          }}
        >
          {/* CANVAS WRAPPER - WITH ZOOM SCALING */}
          <div
            style={{
              background: "white",
              borderRadius: "6px",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
              padding: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transform: `scale(${zoom})`,
              transformOrigin: "center top",
              transition: "transform 0.1s ease-out",
              marginTop: "20px",
            }}
          >
            <FabricCanvas
              ref={canvasRef}
              height={canvasSize.height}
              objects={currentLayout.objects}
              showGrid={gridEnabled}
              width={canvasSize.width}
              onObjectsChange={updateLayout}
              onSelectionChange={handleSelectionChange}
            />
          </div>

          {/* NEW LAYOUT BUTTON */}
          <button
            style={{
              minWidth: "110px",
              cursor: "pointer",
              borderRadius: "50px",
              border: "1px solid #CD1E2F",
              padding: "8px 20px",
              background: "#ffffff",
              marginTop: "16px",
              color: "#CD1E2F",
              fontWeight: "500",
              fontSize: "12px",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onClick={() => {
              const newId = Math.max(...layouts.map((l) => l.id), 0) + 1;

              setLayouts([
                ...layouts,
                { id: newId, name: `Slide ${newId}`, objects: [] },
              ]);
              setActiveLayoutId(newId);
              setSelectedObjectId(null);
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#CD1E2F";
              (e.currentTarget as HTMLButtonElement).style.color = "white";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#ffffff";
              (e.currentTarget as HTMLButtonElement).style.color = "#CD1E2F";
            }}
          >
            + New Layout
          </button>

          {/* LAYOUT CARDS */}
          <div
            style={{
              width: "100%",
              marginTop: "16px",
              display: "flex",
              gap: "10px",
              overflowX: "auto",
              paddingBottom: "4px",
              paddingRight: "20px",
              flexShrink: 0,
            }}
          >
            {layouts.map((layout) => (
              <div
                key={layout.id}
                style={{
                  minWidth: "100px",
                  cursor: "pointer",
                  borderRadius: "6px",
                  overflow: "hidden",
                  border:
                    activeLayoutId === layout.id
                      ? "2px solid #CD1E2F"
                      : "1px solid #e5e7eb",
                  background: "white",
                  transition: "all 0.2s ease",
                  boxShadow:
                    activeLayoutId === layout.id
                      ? "0 2px 8px rgba(205, 30, 47, 0.15)"
                      : "0 1px 3px rgba(0, 0, 0, 0.05)",
                  flexShrink: 0,
                }}
                onClick={() => {
                  setActiveLayoutId(layout.id);
                  setSelectedObjectId(null);
                }}
                onMouseEnter={(e) => {
                  if (activeLayoutId !== layout.id) {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 2px 6px rgba(0, 0, 0, 0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeLayoutId !== layout.id) {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      "0 1px 3px rgba(0, 0, 0, 0.05)";
                  }
                }}
              >
                {/* THUMBNAIL */}
                <div
                  style={{
                    width: "100%",
                    height: "56px",
                    background: "#f3f4f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#9ca3af",
                    fontSize: "11px",
                    fontWeight: "500",
                    textAlign: "center",
                    padding: "6px",
                  }}
                >
                  {layout.objects.length > 0 ? (
                    <div>
                      <div style={{ fontSize: "16px", marginBottom: "2px" }}>📐</div>
                      <div style={{ fontSize: "9px" }}>
                        {layout.objects.length} element{layout.objects.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: "18px", marginBottom: "2px" }}>+</div>
                      <div style={{ fontSize: "9px" }}>Empty</div>
                    </div>
                  )}
                </div>

                {/* LAYOUT INFO */}
                <div style={{ padding: "8px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: activeLayoutId === layout.id ? "#CD1E2F" : "#1f2937",
                      marginBottom: "2px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {layout.name}
                  </div>
                  <div style={{ fontSize: "9px", color: "#9ca3af", whiteSpace: "nowrap" }}>
                    {canvasSize.width} × {canvasSize.height}px
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CUSTOM SIZE MODAL */}
      {customOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9998,
          }}
          onClick={() => setCustomOpen(false)}
        >
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "20px",
              maxWidth: "450px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                fontSize: "15px",
                fontWeight: "600",
                color: "#1f2937",
                marginBottom: "16px",
              }}
            >
              Custom Canvas Size
            </h3>

            <div style={{ marginBottom: "16px" }}>
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "#374151",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Width (px)
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  fontSize: "13px",
                  marginBottom: "10px",
                  boxSizing: "border-box",
                }}
                type="number"
                value={customWidth}
                onChange={(e) => setCustomWidth(+e.target.value)}
              />

              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "#374151",
                  display: "block",
                  marginBottom: "4px",
                }}
              >
                Height (px)
              </label>
              <input
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
                type="number"
                value={customHeight}
                onChange={(e) => setCustomHeight(+e.target.value)}
              />
            </div>

            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
              <button
                style={{
                  padding: "8px 16px",
                  background: "#f3f4f6",
                  border: "1px solid #d1d5db",
                  borderRadius: "5px",
                  fontSize: "11px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setCustomOpen(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: "8px 16px",
                  background: "#CD1E2F",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "11px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onClick={() => {
                  applySize(customWidth, customHeight);
                  setCustomOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
