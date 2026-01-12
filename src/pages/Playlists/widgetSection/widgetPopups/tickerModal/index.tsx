'use client';

import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

const RED = 'rgb(205, 30, 47)';

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
}

/* ================= CONFIG ================= */

const TEXT_COLORS = [
  '#ffffff',
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#000000',
];

const BG_COLORS = [
  'transparent',
  '#8b5cf6',
  '#06b6d4',
  '#a855f7',
  '#fb7185',
  '#22c55e',
  '#f97316',
  '#000000',
];

const FONT_FAMILIES = [
  'Arial',
  'Roboto',
  'Roboto Sans Medium',
  'Inter',
  'Poppins',
  'Montserrat',
  'Helvetica',
];

/* ================= COMPONENT ================= */

const TickerModal = ({ open, onClose, onSave }: Props) => {
  const [widgetName, setWidgetName] = useState('');
  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState('Roboto Sans Medium');
  const [bold, setBold] = useState(true);
  const [italic, setItalic] = useState(false);
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#8b5cf6');
  const [speed, setSpeed] = useState(23);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>(
    'portrait'
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[1200px] h-[90vh] flex flex-col overflow-hidden">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="text-lg font-semibold">Ticker</h2>

          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Portrait</span>
            <button
              className="w-12 h-6 rounded-full relative"
              style={{ backgroundColor: RED }}
              onClick={() =>
                setOrientation(
                  orientation === 'portrait' ? 'landscape' : 'portrait'
                )
              }
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition ${
                  orientation === 'portrait' ? 'left-1' : 'left-6'
                }`}
              />
            </button>
            <span className="text-sm text-gray-500">Landscape</span>

            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        {/* BODY */}
        <div className="flex flex-1 bg-[#f7fbff] overflow-hidden">

          {/* LEFT PANEL */}
          <div className="w-[360px] min-w-[360px] max-w-[360px] p-6 overflow-y-auto space-y-5">
            <div className="bg-yellow-400/90 text-xs p-3 rounded-xl">
              Use custom params key in the text part in <b>%key%</b> to display
            </div>

            {/* Widget name */}
            <div>
              <p className="text-xs font-semibold">
                Widget Name <span className="text-red-500">*</span>
              </p>
              <input
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white shadow-sm outline-none"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
              />
            </div>

            {/* Text */}
            <div>
              <p className="text-xs font-semibold">
                Your Ticker Text <span className="text-red-500">*</span>
              </p>
              <textarea
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white shadow-sm outline-none resize-none"
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

           
            <div>
              <p className="text-xs font-semibold">Font Family</p>
              <select
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white shadow-sm outline-none"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              >
                {FONT_FAMILIES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Font style */}
            <div className="flex gap-6">
              <p className="flex items-center gap-2 text-sm">
                <input
                  checked={bold}
                  type="checkbox"
                  onChange={(e) => setBold(e.target.checked)}
                />
                Bold
              </p>

              <label className="flex items-center gap-2 text-sm">
                <input
                  checked={italic}
                  type="checkbox"
                  onChange={(e) => setItalic(e.target.checked)}
                />
                Italic
              </label>
            </div>

            {/* Text color */}
            <ColorPicker
              colors={TEXT_COLORS}
              label="Text Color"
              value={textColor}
              onChange={setTextColor}
            />

            {/* Background */}
            <ColorPicker
              colors={BG_COLORS}
              label="Background"
              value={bgColor}
              onChange={setBgColor}
            />

            {/* Speed */}
            <div>
              <p className="text-xs font-semibold">Ticker Speed</p>
              <input
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white shadow-sm outline-none"
                type="number"
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
              />
            </div>

            {/* Direction */}
            <div>
              <p className="text-xs font-semibold">Direction</p>
              <select
                className="w-full mt-1 px-4 py-2 rounded-xl bg-white shadow-sm outline-none"
                value={direction}
                onChange={(e) =>
                  setDirection(e.target.value as 'left' | 'right')
                }
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div
              className={`relative bg-white rounded-xl shadow-lg overflow-hidden ${
                orientation === 'portrait'
                  ? 'w-[360px] h-[560px]'
                  : 'w-[760px] h-[300px]'
              }`}
            >
              <div
                className="absolute bottom-0 w-full py-3"
                style={{ background: bgColor }}
              >
                <div
                  className={`whitespace-nowrap ${
                    direction === 'left'
                      ? 'animate-ticker-left'
                      : 'animate-ticker-right'
                  }`}
                  style={{
                    color: textColor,
                    fontFamily,
                    fontWeight: bold ? '700' : '400',
                    fontStyle: italic ? 'italic' : 'normal',
                    animationDuration: `${Math.max(5, 40 - speed)}s`,
                  }}
                >
                  {text || 'Ticker Preview'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 px-6 py-4">
          <button
            className="px-6 py-2 rounded-full text-white"
            style={{ backgroundColor: RED }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-full bg-blue-600 text-white"
            onClick={() =>
              onSave({
                widgetName,
                text,
                fontFamily,
                bold,
                italic,
                textColor,
                bgColor,
                speed,
                direction,
                orientation,
              })
            }
          >
            Save
          </button>
        </div>

        {/* Animations */}
        <style>{`
          @keyframes ticker-left {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(-100%);
            }
          }
          @keyframes ticker-right {
            from {
              transform: translateX(-100%);
            }
            to {
              transform: translateX(100%);
            }
          }
          .animate-ticker-left {
            animation: ticker-left linear infinite;
          }
          .animate-ticker-right {
            animation: ticker-right linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

/* ================= COLOR PICKER ================= */

const ColorPicker = ({ label, colors, value, onChange }: any) => (
  <div>
    <label className="text-xs font-semibold mb-2 block">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {colors.map((c: string) => (
        <button
          key={c}
          className={`w-8 h-8 rounded-full flex items-center justify-center ${
            value === c ? 'ring-2 ring-offset-2 ring-blue-500' : ''
          }`}
          style={{
            background:
              c === 'transparent'
                ? 'repeating-conic-gradient(#ccc 0% 25%, transparent 0% 50%)'
                : c,
          }}
          onClick={() => onChange(c)}
        >
          {value === c && <Check size={14} />}
        </button>
      ))}
    </div>
  </div>
);

export default TickerModal;
