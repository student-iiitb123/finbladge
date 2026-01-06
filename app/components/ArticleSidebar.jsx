"use client";

import React from "react";
import LoadingLink from "../components/Loading";
import { Calendar, Clock } from "lucide-react";
import { TrendingCarousel } from "./TrendingCarousel";

// Helper to extract slug from item (static, no context)
const extractSlugFromItem = (item) => {
  const data = item.data || {};
  const possibleSlugKeys = [
    "link-news-richtext-2",
    "link-items-title",
    "link-items2-title",
    "link-merger-aquisition-title",
    "link-courses-title",
  ];

  const slugKey = possibleSlugKeys.find(
    (key) => typeof data[key] === "string" && data[key].trim() !== ""
  );

  if (slugKey) {
    try {
      const parts = data[slugKey].split("/");
      const potentialSlug = parts.pop()?.trim();
      if (potentialSlug && potentialSlug.length > 0) return potentialSlug;
    } catch (e) {
      console.error(`Error extracting slug from field ${slugKey} for ID: ${item.id}`, e);
    }
  }

  // fallback
  if (!("richtext" in data)) {
    return item.id;
  }

  return undefined;
};

// --- Sidebar Item ---
const SidebarItem = ({ item, basePath }) => {
  const slug = extractSlugFromItem(item);
  if (!slug) return null;

  const isNews = "richtext" in item.data;
  const data = item.data;

  const title = isNews ? data.richtext : data.title;
  const date = data.date || data.coursePrice;
  const time = isNews ? data.time : null;

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

  return (
    <LoadingLink
      href={`${basePath}/${slug}`}
      className="block group mb-4 pb-4 border-b border-gray-200 last:border-b-0"
    >
      <h4
        className="text-sm font-semibold text-gray-800 group-hover:text-accent transition-colors leading-snug mb-1 line-clamp-2"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {title}
      </h4>
      <div className="flex items-center text-xs text-gray-500">
        <Calendar size={12} className="mr-1.5" />
        <span>{formatDate(date)}</span>
        {time && (
          <>
            <span className="mx-1.5">|</span>
            <Clock size={12} className="mr-1.5" />
            <span>{time.slice(0, 5)}</span>
          </>
        )}
      </div>
    </LoadingLink>
  );
};

// --- Main Sidebar (context-free, fully prop-driven) ---
export const ArticleSidebar = ({
  title,
  basePath,
  items = [], // Array of items to render
  allItemsForTrending = [],
  currentItemId = null,
}) => {
  return (
    <aside className="lg:w-1/3 lg:sticky lg:top-[88px] lg:self-start">
      {/* Trending Carousel */}
      <TrendingCarousel
        title="Trending"
        items={allItemsForTrending}
        basePath={basePath}
        currentItemId={currentItemId}
      />

      {/* More Items */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mt-6">
        <h3
          className="text-xl font-bold text-primary mb-5"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {title}
        </h3>
        <div>
          {items.length > 0 ? (
            items.map((item) => (
              <SidebarItem key={item.id} item={item} basePath={basePath} />
            ))
          ) : (
            <p className="text-sm text-gray-500">No other articles found.</p>
          )}
        </div>
      </div>
    </aside>
  );
};
