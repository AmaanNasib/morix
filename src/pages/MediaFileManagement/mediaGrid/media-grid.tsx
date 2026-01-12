import { MoreVertical, Image as ImageIcon } from "lucide-react";
import { Chip } from "@heroui/react";

interface MediaItem {
  id: number;
  title: string;
  size: string;
  resolution: string;
  uses: number;
  status: "active" | "inactive";
  tags: string[];
  thumbnail: string;
}

const mediaList: MediaItem[] = [
  {
    id: 1,
    title: "Business Presentation Slides",
    size: "2.4 MB",
    resolution: "1920x1080",
    uses: 15,
    status: "active",
    tags: ["presentation", "business", "advertisement", "signage", "marketing", "branding"],
    thumbnail: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
  },
  {
    id: 2,
    title: "Business Presentation Slides",
    size: "2.4 MB",
    resolution: "1920x1080",
    uses: 15,
    status: "inactive",
    tags: ["presentation", "business", "advertisement"],
    thumbnail: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
  },
  {
    id: 3,
    title: "Business Presentation Slides",
    size: "2.4 MB",
    resolution: "1920x1080",
    uses: 15,
    status: "inactive",
    tags: ["presentation", "business", "advertisement"],
    thumbnail: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
  },
  {
    id: 4,
    title: "Business Presentation Slides",
    size: "2.4 MB",
    resolution: "1920x1080",
    uses: 15,
    status: "active",
    tags: ["presentation", "business", "advertisement"],
    thumbnail: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
  },
  {
    id: 5,
    title: "Business Presentation Slides",
    size: "2.4 MB",
    resolution: "1920x1080",
    uses: 15,
    status: "active",
    tags: ["signage", "marketing", "branding"],
    thumbnail: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
  },
  {
    id: 6,
    title: "Business Presentation Slides",
    size: "2.4 MB",
    resolution: "1920x1080",
    uses: 15,
    status: "active",
    tags: ["presentation", "business", "advertisement"],
    thumbnail: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600",
  },
];

export default function MediaGrid() {
  return (
    <div className="w-full bg-white rounded-[16px] p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-lg font-semibold text-gray-800">All Media</h2>
        <Chip className="bg-gray-100 text-gray-700" color="default" size="sm" variant="flat">
          Folders
        </Chip>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {mediaList.map((item) => (
          <div
            key={item.id}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white"
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                alt={item.title}
                className="w-full h-36 object-cover"
                src={item.thumbnail}
              />

              {/* Status Badge */}
              {item.status === "active" ? (
                <div className="absolute top-2 left-2 bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-600 rounded-full" />
                  3 Active
                </div>
              ) : (
                <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs font-medium px-2 py-1 rounded-full flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-600 rounded-full"/>
                  1 Inactive
                </div>
              )}

              {/* More Menu Icon */}
              <button className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm hover:bg-gray-50">
                <MoreVertical className="h-4 w-4 text-gray-700" />
              </button>

              {/* Image Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs flex items-center justify-between px-3 py-1">
                <div className="flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  {item.size}
                </div>
                <div>{item.resolution}</div>
              </div>
            </div>

            {/* Details */}
            <div className="p-3">
              <p className="text-sm font-semibold text-gray-800">{item.title}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {item.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
