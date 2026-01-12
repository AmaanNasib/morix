import { useState } from "react";
// @ts-ignore
import { Eye, SearchNormal, Like } from "@/assets/index.js";
import { Chip } from "@heroui/react";

import TextInput from "@/components/InputController/text-input";
import { ReactSelectDropdown } from "@/components/InputController/ReactSelectDropdown";

interface KnowledgeBaseArticle {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  views: number;
  likes: number;
  updatedDate: string;
  tags: string[];
}

const articles: KnowledgeBaseArticle[] = [
  {
    id: "1",
    title: "Getting Started with Digital Signage Management",
    description: "Complete guide to setting up your first digital signage network...",
    difficulty: "beginner",
    views: 1245,
    likes: 89,
    updatedDate: "2024-12-20",
    tags: ["setup", "beginner"],
  },
  {
    id: "2",
    title: "Troubleshooting Device Connection Issues",
    description: "Step-by-step guide to resolve common connectivity problems...",
    difficulty: "intermediate",
    views: 892,
    likes: 76,
    updatedDate: "2024-12-18",
    tags: ["connectivity", "network"],
  },
  {
    id: "3",
    title: "License Management Best Practices",
    description: "Optimize your license usage and manage renewals effectively...",
    difficulty: "intermediate",
    views: 678,
    likes: 58,
    updatedDate: "2024-12-12",
    tags: ["licensing", "management"],
  },
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

export default function KnowledgeBasePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  return (
    <div className="bg-white p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_1fr] gap-4 sm:gap-6">
        <TextInput
          icon={<SearchNormal className="w-4 h-4 text-gray-400" style={{ stroke: "currentColor" }} />}
          name="search"
          placeholder="Search articles, guides, and documentation..."
          type="search"
          value={search}
          onChange={setSearch}
        />
        <ReactSelectDropdown
          data={[
            { value: "all", label: "All Categories" },
            { value: "getting-started", label: "Getting Started" },
            { value: "account-management", label: "Account Management" },
            { value: "billing", label: "Billing" },
            { value: "technical-issues", label: "Technical Issues" },
          ]}
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

      {/* Article Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {articles.map((article) => {
          const difficultyColor = getDifficultyColor(article.difficulty);

          return (
            <div
              key={article.id}
              className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-md transition-shadow cursor-pointer flex flex-col"
            >
              {/* Top Section: Badge and Views */}
              <div className="flex items-start justify-between mb-3">
                <Chip
                  className={`${difficultyColor.bg} ${difficultyColor.text} capitalize border-0`}
                  size="sm"
                  variant="flat"
                >
                  {article.difficulty}
                </Chip>
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                  <Eye className="w-3 h-3 sm:w-4 sm:h-4" style={{ stroke: "currentColor" }} />
                  <span>{article.views.toLocaleString()}</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                {article.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                {article.description}
              </p>

              {/* Bottom Section: Likes and Updated Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-600">
                  <Like className="w-3 h-3 sm:w-4 sm:h-4" style={{ stroke: "currentColor" }} />
                  <span>{article.likes}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Updated {article.updatedDate}
                </span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 border-t border-gray-100">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-[10px] sm:text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
