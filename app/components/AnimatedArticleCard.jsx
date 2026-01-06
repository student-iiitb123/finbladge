"use client";

import React from "react";
import LoadingLink from "../components/Loading";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";

/* ---------------- STATIC DATA ---------------- */

const STATIC_CARD = {
  title: "Global Markets Rally Amid Inflation Easing",
  description:
    "Stock markets across the globe rallied as inflation showed signs of cooling, boosting investor confidence.",
  category: "Markets",
  date: "2025-01-10",
  time: "10:30",
  image: "https://via.placeholder.com/600x400",
  slug: "global-markets-rally",
};

/* ---------------- HELPERS ---------------- */

const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  });

/* ---------------- COMPONENT ---------------- */

const AnimatedArticleCard = () => {
  const patternStyle = {
    backgroundImage:
      `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20L0 20z' fill='%23ffffff' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E"),
       linear-gradient(to bottom right, #1e3a8a, #020617)`,
    backgroundBlendMode: "overlay",
  };

  return (
    <div className="h-full">
      <LoadingLink
        href={`/news/${STATIC_CARD.slug}`}
        className="group bg-white rounded-[4px] shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden h-full flex flex-col"
      >
        {/* TOP SECTION */}
        <div
          className="relative p-4 text-white min-h-[160px] flex flex-col justify-between"
          style={patternStyle}
        >
          <div>
            <span className="inline-block bg-white/10 backdrop-blur-sm text-xs mb-3 px-3 py-1 rounded">
              {STATIC_CARD.category}
            </span>

            <h3 className="text-xl leading-tight line-clamp-3 font-bold">
              {STATIC_CARD.title}
            </h3>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-3 flex flex-col flex-grow">
          <p className="text-sm text-text-secondary line-clamp-4 flex-grow">
            {STATIC_CARD.description}
          </p>

          <div className="flex items-center justify-between text-sm opacity-80 mt-4 pt-2 border-t">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{STATIC_CARD.time}</span>
            </div>

            <div className="flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              <span>{formatDate(STATIC_CARD.date)}</span>
            </div>
          </div>
        </div>
      </LoadingLink>
    </div>
  );
};

export default AnimatedArticleCard;
