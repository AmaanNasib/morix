import { useState, useEffect } from "react";
import { Button, Chip, Progress, Spinner } from "@heroui/react";
import { BarChart3 } from "lucide-react";

export interface MediaUsageData {
  id: string;
  title: string;
  type: "video" | "playlist" | "image";
  mediaId: string;
  totalPlays: number;
  duration: string;
  completionRate: number;
  avgPlayTime: string;
  screenCount: number;
  lastPlayed: string;
}

// Default/Mock data - Replace with API call
const defaultMediaUsageData: MediaUsageData[] = [
  {
    id: "1",
    title: "Holiday Promotion Video",
    type: "video",
    mediaId: "MED-001",
    totalPlays: 5648,
    duration: "12h 35m",
    completionRate: 87.5,
    avgPlayTime: "2:15",
    screenCount: 12,
    lastPlayed: "12/23/2024",
  },
  {
    id: "2",
    title: "Product Showcase Playlist",
    type: "playlist",
    mediaId: "MED-002",
    totalPlays: 3245,
    duration: "27h 30m",
    completionRate: 92.1,
    avgPlayTime: "5:30",
    screenCount: 8,
    lastPlayed: "12/23/2024",
  },
  {
    id: "3",
    title: "Safety Instructions Image",
    type: "image",
    mediaId: "MED-003",
    totalPlays: 8765,
    duration: "4h 22m",
    completionRate: 95.2,
    avgPlayTime: "0:30",
    screenCount: 15,
    lastPlayed: "12/23/2024",
  },
];

// API Functions - Replace these with actual API calls
const fetchMediaUsage = async (): Promise<MediaUsageData[]> => {
  // TODO: Replace with actual API call
  // Example: const response = await fetch('/api/media-usage');
  // return await response.json();
  
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(defaultMediaUsageData), 500);
  });
};

const getTypeColor = (type: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    video: {
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    playlist: {
      bg: "bg-orange-100",
      text: "text-orange-700",
    },
    image: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
  };

  return colors[type.toLowerCase()] || colors.video;
};

const MediaCard = ({ media }: { media: MediaUsageData }) => {
  const typeColor = getTypeColor(media.type);

  const handleAnalytics = () => {
    // TODO: Implement analytics view
    console.log("Analytics for:", media.title);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 sm:p-4 lg:p-6 flex flex-col gap-3 sm:gap-4 h-full">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-1 line-clamp-2">
            {media.title}
          </h3>
          <Chip
            className={`${typeColor.bg} ${typeColor.text} border-0 w-fit`}
            size="sm"
            variant="flat"
          >
            {media.type.charAt(0).toUpperCase() + media.type.slice(1)}
          </Chip>
        </div>
      </div>

      {/* ID */}
      <div className="text-xs sm:text-sm text-gray-500 font-medium">{media.mediaId}</div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
        <div>
          <div className="text-xs text-gray-500 mb-1">Total Plays</div>
          <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
            {media.totalPlays.toLocaleString()}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Duration</div>
          <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
            {media.duration}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Avg Play Time</div>
          <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
            {media.avgPlayTime}
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-500 mb-1">Screen Count</div>
          <div className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate">
            {media.screenCount}
          </div>
        </div>
      </div>

      {/* Completion Rate */}
      <div>
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-xs text-gray-500">Completion Rate</span>
          <span className="text-xs sm:text-sm font-semibold text-gray-900">{media.completionRate}%</span>
        </div>
        <Progress
          aria-label="Completion Rate"
          className="w-full"
          color="danger"
          size="sm"
          value={media.completionRate}
        />
      </div>

      {/* Last Played */}
      <div className="text-xs text-gray-500">
        Last played: {media.lastPlayed}
      </div>

      {/* Analytics Button */}
      <Button
        className="bg-[#D12027] text-white w-full mt-auto"
        size="sm"
        startContent={<BarChart3 className="sm:w-4 sm:h-4" size={14} />}
        onPress={handleAnalytics}
      >
        <span className="text-xs sm:text-sm">Analytics</span>
      </Button>
    </div>
  );
};

export default function MediaUsagePage() {
  const [mediaData, setMediaData] = useState<MediaUsageData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load media usage data on mount
  useEffect(() => {
    const loadMediaUsage = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchMediaUsage();

        setMediaData(data);
      } catch (err) {
        console.error("Failed to load media usage:", err);
        setError("Failed to load media usage data. Please try again later.");
        // Keep default data on error
        setMediaData(defaultMediaUsageData);
      } finally {
        setIsLoading(false);
      }
    };

    loadMediaUsage();
  }, []);

  // Refresh handler
  const handleRefresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMediaUsage();

      setMediaData(data);
    } catch (err) {
      console.error("Failed to refresh media usage:", err);
      setError("Failed to refresh data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && mediaData.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <Spinner color="danger" size="lg" />
            <p className="text-sm text-gray-600">Loading media usage data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
              Media Performance Analytics
            </h2>
            <p className="text-sm text-gray-600">
              Track content engagement, playback statistics, and performance metrics.
            </p>
          </div>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Cards Grid */}
      {mediaData.length === 0 ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-2">No media usage data available</p>
            <p className="text-gray-400 text-sm">Media performance data will appear here once available.</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {mediaData.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>
      )}
    </div>
  );
}
