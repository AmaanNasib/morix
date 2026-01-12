'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Pencil,
  Trash2,
  Rss,
  CloudSun,
  Clock,
  Youtube,
  FileText,
  QrCode,
  Globe,
  Video,
  LayoutDashboard,
  FileSpreadsheet,
  Wind,
  FileBarChart,
  Type,
} from 'lucide-react';

import TickerModal from './widgetPopups/tickerModal';


const RED = 'rgb(205, 30, 47)';

/* ================= TYPES ================= */

interface WidgetType {
  id: string;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

interface WidgetItem {
  id: string;
  name: string;
  type: string;
}

/* ================= DATA ================= */

const WIDGET_TYPES: WidgetType[] = [
  { id: 'ticker', name: 'News Ticker', subtitle: 'Ticker', icon: <Rss size={18} /> },
  { id: 'web', name: 'Web page', subtitle: 'Web', icon: <Globe size={18} /> },
  { id: 'live', name: 'Live stream', subtitle: 'Stream', icon: <Video size={18} /> },
  { id: 'text', name: 'Text', subtitle: 'Text', icon: <Type size={18} /> },
  { id: 'youtube', name: 'YouTube', subtitle: 'Video', icon: <Youtube size={18} /> },
  { id: 'slides', name: 'Google Slides', subtitle: 'Slides', icon: <LayoutDashboard size={18} /> },
  { id: 'weather', name: 'Weather Widget', subtitle: 'Weather', icon: <CloudSun size={18} /> },
  { id: 'clock', name: 'Clock Widget', subtitle: 'Clock', icon: <Clock size={18} /> },
  { id: 'qr', name: 'QR Generator', subtitle: 'QR', icon: <QrCode size={18} /> },
  { id: 'aqi', name: 'Air Quality Index', subtitle: 'AQI', icon: <Wind size={18} /> },
  { id: 'sheets', name: 'Google Sheets', subtitle: 'Sheets', icon: <FileSpreadsheet size={18} /> },
  { id: 'rss', name: 'RSS Feed', subtitle: 'RSS', icon: <Rss size={18} /> },
  { id: 'pdf', name: 'PDF', subtitle: 'Document', icon: <FileText size={18} /> },
  { id: 'powerbi', name: 'Power BI', subtitle: 'BI', icon: <FileBarChart size={18} /> },
];

const DUMMY_WIDGETS: WidgetItem[] = [
  { id: '1', name: 'Ice Cream Ticker', type: 'ticker' },
  { id: '2', name: 'Mini Office Ticker', type: 'ticker' },
  { id: '3', name: 'Office Weather', type: 'weather' },
  { id: '4', name: 'Lobby Clock', type: 'clock' },
];

/* ================= COMPONENT ================= */

const Widgets = () => {
  const [view, setView] = useState<'types' | 'elements'>('types');
  const [selectedType, setSelectedType] = useState<WidgetType | null>(null);
  const [search, setSearch] = useState('');
  const [openModal, setOpenModal] = useState<null | string>(null);

  const elements = DUMMY_WIDGETS.filter(
    (w) =>
      w.type === selectedType?.id &&
      w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 bg-gray-50 h-full relative">
      {/* ================= TYPE LIST ================= */}
      {view === 'types' && (
        <div className="space-y-3">
          {WIDGET_TYPES.map((type) => (
            <button
              key={type.id}
              onClick={() => {
                setSelectedType(type);
                setView('elements');
              }}
              className="w-full bg-white rounded-xl p-4 flex items-center gap-4 hover:bg-gray-50 transition text-left"
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: RED }}
              >
                {type.icon}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800">
                  {type.name}
                </span>
                <span className="text-xs text-gray-400">
                  {type.subtitle}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* ================= ELEMENT LIST ================= */}
      {view === 'elements' && selectedType && (
        <>
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => {
                setView('types');
                setSearch('');
              }}
              className="p-2 rounded-full text-white"
              style={{ backgroundColor: RED }}
            >
              <ArrowLeft size={18} />
            </button>

            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border border-gray-200 text-sm outline-none"
            />

            <button
              onClick={() => setOpenModal(selectedType.id)}
              className="px-4 py-2 rounded-full text-white text-sm font-semibold"
              style={{ backgroundColor: RED }}
            >
              + New
            </button>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-2 gap-4">
            {elements.map((item) => (
              <div
                key={item.id}
                draggable
                className="bg-white rounded-2xl shadow cursor-grab overflow-hidden"
              >
                <div
                  className="h-28 flex items-center justify-center text-xs font-semibold"
                  style={{ backgroundColor: '#111', color: '#fbbf24' }}
                >
                  &lt;&lt; {selectedType.name.toUpperCase()} &gt;&gt;
                </div>

                <div className="p-3">
                  <div className="text-sm font-medium text-gray-800 mb-2">
                    {item.name}
                  </div>

                  <div className="flex gap-2">
                    <button
                      className="p-2 rounded-full text-white"
                      style={{ backgroundColor: RED }}
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      className="p-2 rounded-full text-white"
                      style={{ backgroundColor: RED }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {elements.length === 0 && (
              <div className="col-span-2 text-center text-sm text-gray-400 mt-10">
                No widgets created yet
              </div>
            )}
          </div>
        </>
      )}

      {/* ================= MODALS ================= */}
      {openModal === 'ticker' && (
        <TickerModal
          open
          onClose={() => setOpenModal(null)}
          onSave={(data: any) => {
            console.log('Ticker Saved:', data);
            setOpenModal(null);
          }}
        />
      )}
    </div>
  );
};

export default Widgets;
