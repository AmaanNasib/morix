import { useState } from "react";
// @ts-ignore
import { Chip } from "@heroui/react";

import { Play, CirclePlay, SearchNormal, Star, Clock4, Eye, Like } from "@/assets/index.js";
import TextInput from "@/components/InputController/text-input";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";

interface VideoTutorial {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: string;
  rating: number;
  views: number;
  likes: number;
  thumbnail?: string;
  publishedDate: string;
}

const videoTutorials: VideoTutorial[] = [
  {
    id: "1",
    title: "Platform Overview - 10 Minute Tour",
    description: "Get a comprehensive overview of all platform features and capabilities in this quick tour.",
    duration: "10:32",
    category: "Getting Started",
    rating: 4.8,
    views: 2450,
    likes: 189,
    publishedDate: "2024-12-15",
  },
  {
    id: "2",
    title: "Device Setup and Registration",
    description: "Learn how to set up and register your digital signage devices step by step.",
    duration: "15:45",
    category: "Device Management",
    rating: 4.7,
    views: 1890,
    likes: 156,
    publishedDate: "2024-12-10",
  },
  {
    id: "3",
    title: "Creating and Managing Playlists",
    description: "Master the art of creating engaging playlists and scheduling content effectively.",
    duration: "12:20",
    category: "Content Management",
    rating: 4.9,
    views: 3200,
    likes: 245,
    publishedDate: "2024-12-05",
  },
  {
    id: "4",
    title: "Advanced Analytics and Reporting",
    description: "Discover how to leverage analytics to optimize your digital signage performance.",
    duration: "18:15",
    category: "Analytics",
    rating: 4.6,
    views: 1450,
    likes: 98,
    publishedDate: "2024-11-28",
  },
  {
    id: "5",
    title: "Troubleshooting Common Issues",
    description: "Quick solutions to the most common problems you might encounter.",
    duration: "8:45",
    category: "Troubleshooting",
    rating: 4.5,
    views: 2100,
    likes: 167,
    publishedDate: "2024-11-20",
  },
  {
    id: "6",
    title: "License Management Best Practices",
    description: "Learn how to efficiently manage licenses and understand renewal processes.",
    duration: "11:30",
    category: "License Management",
    rating: 4.7,
    views: 1780,
    likes: 134,
    publishedDate: "2024-11-15",
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "Getting Started", label: "Getting Started" },
  { value: "Device Management", label: "Device Management" },
  { value: "Content Management", label: "Content Management" },
  { value: "Analytics", label: "Analytics" },
  { value: "Troubleshooting", label: "Troubleshooting" },
  { value: "License Management", label: "License Management" },
];

export default function VideoTutorialsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredVideos = videoTutorials.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(search.toLowerCase()) ||
      video.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || video.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 sm:gap-6">
        <TextInput
          icon={<SearchNormal className="w-4 h-4 text-gray-400" style={{ stroke: "currentColor" }} />}
          name="search"
          placeholder="Search video tutorials..."
          type="search"
          value={search}
          onChange={setSearch}
        />
        <ReactSelectDropdown
          data={categories}
          error=""
          fetchDropdownData={async () => ({ data: [], totalPages: 0 })}
          field={{ name: "category" }}
          fieldName="category"
          handleSearchChange={() => {}}
          handleSelectChange={(selectedOption: any) => {
            if (selectedOption && selectedOption.value) {
              setCategory(selectedOption.value);
            }
          }}
          placeholder="All Categories"
          value={category}
        />
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredVideos.length} video{filteredVideos.length !== 1 ? "s" : ""} found
        </p>
        <div className="flex gap-2">
          <button
            className={`p-2 rounded-lg transition ${
              viewMode === "grid"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setViewMode("grid")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>
          <button
            className={`p-2 rounded-lg transition ${
              viewMode === "list"
                ? "bg-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setViewMode("list")}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
            </svg>
          </button>
        </div>
      </div>

      {/* Video Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative bg-gray-100 w-full aspect-video flex items-center justify-center overflow-hidden">
                {video.thumbnail ? (
                  <img alt={video.title} className="w-full h-full object-cover" src={video.thumbnail} />
                ) : (
                  <CirclePlay className="w-16 h-16 text-gray-400" style={{ stroke: "currentColor" }} />
                )}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 rounded-full p-3">
                    <Play className="w-8 h-8 text-primary" style={{ stroke: "currentColor" }} />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between mb-2">
                  <Chip
                    className="bg-blue-100 text-blue-700 border-0"
                    size="sm"
                    variant="flat"
                  >
                    {video.category}
                  </Chip>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" style={{ stroke: "currentColor" }} />
                    <span>{video.rating}</span>
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                  {video.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2">
                  {video.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" style={{ stroke: "currentColor" }} />
                      <span>{video.views.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Like className="w-3 h-3" style={{ stroke: "currentColor" }} />
                      <span>{video.likes}</span>
                    </div>
                  </div>
                  <span>{video.publishedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer flex gap-4"
            >
              {/* Thumbnail */}
              <div className="relative bg-gray-100 w-32 sm:w-40 h-24 sm:h-28 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                {video.thumbnail ? (
                  <img alt={video.title} className="w-full h-full object-cover" src={video.thumbnail} />
                ) : (
                  <CirclePlay className="w-10 h-10 text-gray-400" style={{ stroke: "currentColor" }} />
                )}
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <Chip
                    className="bg-blue-100 text-blue-700 border-0"
                    size="sm"
                    variant="flat"
                  >
                    {video.category}
                  </Chip>
                  <div className="flex items-center gap-1 text-xs text-gray-600">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" style={{ stroke: "currentColor" }} />
                    <span>{video.rating}</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                  {video.title}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  {video.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock4 className="w-3 h-3" style={{ stroke: "currentColor" }} />
                    <span>{video.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3" style={{ stroke: "currentColor" }} />
                    <span>{video.views.toLocaleString()} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Like className="w-3 h-3" style={{ stroke: "currentColor" }} />
                    <span>{video.likes} likes</span>
                  </div>
                  <span>•</span>
                  <span>{video.publishedDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredVideos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No video tutorials found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
