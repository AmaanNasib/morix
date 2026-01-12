import { useState } from "react";
// @ts-ignore
import { Chip } from "@heroui/react";

import { BookOpen, ChevronDown, Play, Star } from "@/assets/index.js";


// Popular Articles Data
interface Article {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  views: number;
}

const popularArticles: Article[] = [
  {
    id: "1",
    title: "Getting Started with Digital Signage Management",
    difficulty: "beginner",
    views: 1245,
  },
  {
    id: "2",
    title: "Troubleshooting Device Connection Issues",
    difficulty: "intermediate",
    views: 892,
  },
  {
    id: "3",
    title: "License Management Best Practices",
    difficulty: "intermediate",
    views: 678,
  },
];

// Video Tutorials Data
interface VideoTutorial {
  id: string;
  title: string;
  duration: string;
  rating: number;
  thumbnail?: string;
}

const videoTutorials: VideoTutorial[] = [
  {
    id: "1",
    title: "Platform Overview - 10 Minute Tour",
    duration: "10:32",
    rating: 4.8,
  },
  {
    id: "2",
    title: "Device Setup and Registration",
    duration: "15:45",
    rating: 4.7,
  },
];

// FAQ Data
const faqQuestions = [
  "How do I add a new screen to my network?",
  "What file formats are supported for content?",
  "How can I schedule content to play at specific times?",
  "What happens when my license expires?",
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return { bg: "bg-green-100", text: "text-green-700" };
    case "intermediate":
      return { bg: "bg-orange-100", text: "text-orange-700" };
    case "advanced":
      return { bg: "bg-red-100", text: "text-red-700" };
    default:
      return { bg: "bg-gray-100", text: "text-gray-700" };
  }
};

export default function OverviewPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Popular Articles and Recent Video Tutorials in Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Popular Articles */}
        <div className="bg-white p-3 sm:p-4 md:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Popular Articles</h2>
          <div className="space-y-3 sm:space-y-4">
            {popularArticles.map((article) => {
              const difficultyColor = getDifficultyColor(article.difficulty);

              return (
                <div
                  key={article.id}
                  className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="bg-[#D12027] p-1.5 sm:p-2 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="text-white w-4 h-4 sm:w-[18px] sm:h-[18px] logo-icon-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2">{article.title}</h3>
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      <Chip
                        className={`${difficultyColor.bg} ${difficultyColor.text} capitalize border-0`}
                        size="sm"
                        variant="flat"
                      >
                        {article.difficulty}
                      </Chip>
                      <span className="text-[10px] sm:text-xs text-gray-500">{article.views.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Video Tutorials */}
        <div className="bg-white p-3 sm:p-4 md:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Recent Video Tutorials</h2>
          <div className="space-y-3 sm:space-y-4">
            {videoTutorials.map((video) => (
              <div
                key={video.id}
                className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="relative bg-gray-100 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {video.thumbnail ? (
                    <img alt={video.title} className="w-full h-full object-cover" src={video.thumbnail} />
                  ) : (
                    <Play className="text-gray-400 w-6 h-6 sm:w-8 sm:h-8 logo-icon-white" />
                  )}
                  <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 bg-black/70 text-white text-[8px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium text-gray-900 mb-1.5 sm:mb-2">{video.title}</h3>
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap text-[10px] sm:text-xs text-gray-500">
                    <span>{video.duration}</span>
                    <span>•</span>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Star className="text-yellow-400 fill-yellow-400 w-3 h-3 sm:w-3 sm:h-3 logo-icon-white" />
                      <span>{video.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white p-3 sm:p-4 md:p-6">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Frequently Asked Questions</h2>
        <div className="space-y-2 sm:space-y-3">
          {faqQuestions.map((question, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between p-2.5 sm:p-3 text-left hover:bg-gray-50 transition-colors"
                onClick={() => toggleFaq(index)}
              >
                <span className="text-xs sm:text-sm font-medium text-gray-900 flex-1 pr-2">{question}</span>
                <ChevronDown
                  className={`text-gray-500 transition-transform flex-shrink-0 w-4 h-4 sm:w-[18px] sm:h-[18px] ${expandedFaq === index ? "rotate-180" : ""}`}
                  style={{ stroke: "currentColor" }}
                />
              </button>
              {expandedFaq === index && (
                <div className="p-2.5 sm:p-3 pt-0 text-xs sm:text-sm text-gray-600 border-t border-gray-100">
                  <p>Answer content for this question will be displayed here.</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

