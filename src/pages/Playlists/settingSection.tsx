import { Button } from "@heroui/button";
import { Switch } from "@heroui/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  ArrowDown,
  ArrowUp,
  Expand,
  Minus,
  Plus,
  RotateCcw,
  Settings,
  SquareStack,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { CanvasObject } from "./fabricCanvas";

interface LayoutMeta {
  id: number;
  name: string;
  duration?: number;
  width?: number;
  height?: number;
}

interface SettingSectionProps {
  // layout vs element selection
  selectedObjectId?: string | number | null;
  currentObject?: CanvasObject | null;
  currentLayout?: LayoutMeta | null;

  // callbacks to parent
  onObjectUpdate?: (id: string | number, updates: Partial<CanvasObject>) => void;
  onLayoutDurationUpdate?: (duration: number) => void;
}

export default function SettingSection({
  selectedObjectId,
  currentObject,
  currentLayout,
  onObjectUpdate,
  onLayoutDurationUpdate,
}: SettingSectionProps) {
  const isElementSelected = !!selectedObjectId && !!currentObject;
  const objectType = currentObject?.type || null;

  // layout duration local state, sync from props
  const [layoutDuration, setLayoutDuration] = useState<number>(
    currentLayout?.duration ?? 10
  );

  useEffect(() => {
    if (typeof currentLayout?.duration === "number") {
      setLayoutDuration(currentLayout.duration);
    }
  }, [currentLayout?.duration]);

  // generic object update helper
  const updateObject = (updates: Partial<CanvasObject>) => {
    if (!selectedObjectId) return;
    onObjectUpdate?.(selectedObjectId, updates);
  };

  // layout duration handler
  const handleDurationChange = (val: number) => {
    setLayoutDuration(val);
    onLayoutDurationUpdate?.(val);
  };

  return (
    <div className="flex flex-col gap-5 text-gray-800 w-full">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          {isElementSelected ? "Element Settings" : "Layout Settings"}
        </h2>
        <div className="rounded-md p-2 bg-gray-100">
          <Settings className="w-4 h-4 text-gray-600" />
        </div>
      </div>

      {/* ===================== LAYOUT SELECTED ===================== */}
      {!isElementSelected && (
        <>
          {/* Layout info like your reference screenshot */}
          <section>
            <h3 className="text-sm font-semibold mb-2">Layout Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">Number of Zones:</span>
                <span className="font-semibold">
                  {currentLayout ? 1 : 0}
                </span>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">
                  Layout Name
                </label>
                <input
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs outline-none focus:border-[#CD1E2F]"
                  defaultValue={currentLayout?.name ?? "New Layout"}
                  readOnly
                />
              </div>

              {/* Duration (like “Duration (Default 10.0 sec)” in ref) */}
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1">
                  Duration (Default 10.0 sec)
                </label>
                <input
                  className="w-full border border-gray-200 rounded-md px-3 py-2 text-xs outline-none focus:border-[#CD1E2F]"
                  min={0}
                  type="number"
                  value={layoutDuration}
                  onChange={(e) => handleDurationChange(Number(e.target.value))}
                />
              </div>

              {/* Canvas dimensions info */}
              <div className="mt-2 border border-gray-200 rounded-md p-3 bg-gray-50 space-y-1">
                <p className="text-xs font-semibold text-gray-700 flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#CD1E2F]" />
                  Canvas Dimensions
                </p>
                <p className="text-[11px] text-gray-500">
                  Width: {currentLayout?.width ?? 1920} px
                </p>
                <p className="text-[11px] text-gray-500">
                  Height: {currentLayout?.height ?? 1080} px
                </p>
              </div>
            </div>
          </section>

          <hr />

          {/* Minimal schedule placeholder, matching reference layout sidebar */}
          <section>
            <h3 className="text-sm font-semibold mb-2">Schedule</h3>
            <p className="text-xs text-gray-400 mb-1">N/A</p>
            <div className="flex items-center gap-2 mb-3">
              <input id="routineDaily" type="checkbox" className="h-3 w-3" />
              <label
                htmlFor="routineDaily"
                className="text-xs text-gray-600 cursor-pointer"
              >
                Routine Daily
              </label>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">
                  Select Date (From - To)
                </label>
                <input
                  className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[11px] text-gray-600"
                  placeholder="dd-mm-yyyy"
                  type="text"
                />
              </div>
              <div className="mt-5">
                <input
                  className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[11px] text-gray-600"
                  placeholder="dd-mm-yyyy"
                  type="text"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[11px] text-gray-500 mb-1 block">
                  Select Time (From - To)
                </label>
                <input
                  className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[11px] text-gray-600"
                  placeholder="--:--"
                  type="text"
                />
              </div>
              <div className="mt-5">
                <input
                  className="w-full border border-gray-200 rounded-md px-2 py-1.5 text-[11px] text-gray-600"
                  placeholder="--:--"
                  type="text"
                />
              </div>
            </div>
          </section>
        </>
      )}

      {/* ===================== ELEMENT SELECTED ===================== */}
      {isElementSelected && (
        <>
          {/* TYPE BADGE */}
          <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-xs flex justify-between items-center">
            <span className="font-semibold text-gray-700">
              {objectType?.toUpperCase()} Selected
            </span>
            <span className="text-[11px] text-gray-500">
              ID: {String(selectedObjectId)}
            </span>
          </div>

          {/* === Common controls for all elements (position, size) === */}
          <section>
            <h3 className="text-sm font-semibold mb-2">Size & Position</h3>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-gray-500">
                W: {currentObject?.width ?? 0}px
              </span>
              <span className="text-gray-500">
                H: {currentObject?.height ?? 0}px
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Scale</span>
              <Button
                isIconOnly
                className="rounded-full"
                disabled={(currentObject?.width ?? 0) <= 40}
                startContent={<Minus className="text-gray-600" size={18} />}
                variant="bordered"
                onPress={() =>
                  updateObject({
                    width: Math.max(40, (currentObject?.width || 100) - 20),
                    height: Math.max(40, (currentObject?.height || 100) - 20),
                  })
                }
              />
              <Button
                isIconOnly
                className="rounded-full"
                disabled={(currentObject?.width ?? 0) >= 1000}
                startContent={<Plus className="text-gray-600" size={18} />}
                variant="bordered"
                onPress={() =>
                  updateObject({
                    width: (currentObject?.width || 100) + 20,
                    height: (currentObject?.height || 100) + 20,
                  })
                }
              />
            </div>
          </section>

          <hr />

          {/* === Alignment (for visual parity with your UI) === */}
          <section>
            <h3 className="text-sm font-semibold mb-2">Alignments</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: "left", icon: <AlignLeft /> },
                { key: "center", icon: <AlignCenter /> },
                { key: "right", icon: <AlignRight /> },
                { key: "justify", icon: <AlignJustify /> },
              ].map(({ key, icon }) => (
                <Button
                  key={key}
                  className="h-9 text-gray-600"
                  variant="bordered"
                >
                  {icon}
                </Button>
              ))}
            </div>
          </section>

          <hr />

          {/* === Type‑specific panels === */}
          {objectType === "image" && (
            <section>
              <h3 className="text-sm font-semibold mb-2">Image Settings</h3>
              <div className="mb-3">
                <label className="text-xs font-medium text-gray-600">
                  Opacity
                </label>
                <input
                  className="w-full accent-[#CD1E2F] mt-1"
                  max={100}
                  min={0}
                  type="range"
                  value={currentObject?.opacity ?? 100}
                  onChange={(e) =>
                    updateObject({ opacity: Number(e.target.value) })
                  }
                />
                <p className="text-xs mt-1 text-gray-500">
                  {currentObject?.opacity ?? 100}%
                </p>
              </div>
            </section>
          )}

          {objectType === "video" && (
            <section>
              <h3 className="text-sm font-semibold mb-2">Video Playback</h3>
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Auto-play</span>
                  <Switch
                    isSelected={!!currentObject?.autoplay}
                    size="sm"
                    onValueChange={(v) => updateObject({ autoplay: v })}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Loop</span>
                  <Switch
                    isSelected={!!currentObject?.loop}
                    color="danger"
                    size="sm"
                    onValueChange={(v) => updateObject({ loop: v })}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Muted</span>
                  <Switch
                    isSelected={currentObject?.muted ?? true}
                    size="sm"
                    onValueChange={(v) => updateObject({ muted: v })}
                  />
                </div>
              </div>
            </section>
          )}

          {objectType === "audio" && (
            <section>
              <h3 className="text-sm font-semibold mb-2">Audio Settings</h3>
              <div className="mb-3">
                <label className="text-xs font-medium text-gray-600">
                  Volume
                </label>
                <div className="flex items-center gap-2 mt-1">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                  <input
                    className="flex-1 accent-[#CD1E2F]"
                    max={100}
                    min={0}
                    type="range"
                    value={currentObject?.volume ?? 100}
                    onChange={(e) =>
                      updateObject({ volume: Number(e.target.value) })
                    }
                  />
                </div>
                <p className="text-xs mt-1 text-gray-500">
                  {currentObject?.volume ?? 100}%
                </p>
              </div>
            </section>
          )}

          {/* Transform & layers row just to mirror your design */}
          <hr />
          <section>
            <h3 className="text-sm font-semibold mb-2">Transform & Layers</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                className="text-[#CD1E2F] hover:bg-[#CD1E2F] hover:text-white"
                variant="bordered"
                onPress={() =>
                  updateObject({
                    rotation: ((currentObject?.rotation || 0) + 90) % 360,
                  })
                }
              >
                <RotateCcw className="w-4 h-4 mr-2" /> Rotate
              </Button>
              <Button
                className="text-[#CD1E2F] hover:bg-[#CD1E2F] hover:text-white"
                variant="bordered"
              >
                <SquareStack className="w-4 h-4 mr-2" /> Duplicate
              </Button>
              <Button
                className="text-[#CD1E2F] hover:bg-[#CD1E2F] hover:text-white"
                variant="bordered"
              >
                <ArrowUp className="w-4 h-4 mr-2" /> To Front
              </Button>
              <Button
                className="text-[#CD1E2F] hover:bg-[#CD1E2F] hover:text-white"
                variant="bordered"
              >
                <ArrowDown className="w-4 h-4 mr-2" /> To Back
              </Button>
            </div>

            <div className="mt-3">
              <Button
                className="w-full text-[#CD1E2F] hover:bg-[#CD1E2F] hover:text-white"
                variant="bordered"
              >
                <Expand className="w-4 h-4 mr-2" /> Full Screen
              </Button>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
