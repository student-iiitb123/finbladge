// src/components/detail/ArticleDetailHeroStatic.jsx
import React from "react";
import Image from "next/image";
import {
  Calendar,
  Clock,
  Share2,
  Sparkles,
  FileText,
  Bookmark,
  Minimize2,
  Maximize2,
  Linkedin,
  Twitter,
  Facebook,
  MessageCircle,
} from "lucide-react";
import { Button } from "../components/Button";

export const ArticleDetailHero = () => {
  // Hardcoded article data
  const title = "Static Article Title";
  const category = "Tech";
  const date = "2026-01-05";
  const time = "10:00 AM";
  const imageUrl = "https://d1rwhvwstyk9gu.cloudfront.net/2023/08/News-Based-Trading.png";

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  // Hardcoded share platforms
  const currentUrl = encodeURIComponent("https://example.com/article");
  const encodedTitle = encodeURIComponent(title);

  const sharePlatforms = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${currentUrl}&text=${encodedTitle}`,
      color: "hover:text-sky-500",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}&title=${encodedTitle}`,
      color: "hover:text-blue-700",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://api.whatsapp.com/send?text=${encodedTitle}%20${currentUrl}`,
      color: "hover:text-green-500",
    },
  ];

  return (
    <>
      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.07]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="pattern-lines-dark"
                x="0"
                y="0"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="10" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-lines-dark)"></rect>
          </svg>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative min-h-[420px] md:flex md:items-center">
            {/* Left text */}
            <div className="pt-28 pb-12 md:pt-32 md:pb-16 md:w-3/5 lg:w-3/5 max-w-4xl">
              <div className="max-w-xl">
                <span
                  className="inline-block bg-white/10 backdrop-blur-sm text-white text-xs font-semibold mb-4 px-3 py-1 rounded"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  {category}
                </span>
                <h1
                  className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-oxygen)", fontWeight: 700 }}
                >
                  {title}
                </h1>

                <div className="flex flex-col md:flex-row items-start md:items-center text-gray-300 text-sm mt-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2 opacity-80" />
                    <span>{formatDate(date)}</span>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0 md:ml-4">
                    <Clock className="w-4 h-4 mr-2 opacity-80" />
                    <span>{time}</span>
                  </div>
                </div>

                {/* Action Icons */}
                <div className="mt-6 flex items-center space-x-3">
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                    <Sparkles size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                    <FileText size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                    <Bookmark size={18} />
                  </button>
                  <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="absolute top-[128px] md:right-0 md:h-[60%] w-full md:w-2/5 lg:w-[45%] h-64 sm:h-80 md:pl-8">
              <div className="relative w-full h-full shadow-lg shadow-black/50 md:h-[calc(100%+8rem)] md:min-h-[300px] rounded-[12px] overflow-hidden -mb-24 md:mb-0 md:top-0">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Sticky header (static) --- */}
      {/* <div className="fixed w-full md:px-8 px-1 top-0 left-0 right-0 z-40 h-18 bg-gradient-to-br from-primary to-[#000b2c] text-white shadow-lg">
        <div className="h-full flex items-center justify-between">
          <div className="text-2xl relative z-20 font-bold w-full flex items-center">
            <Image src={"/images/logo.png"} alt="Logo" height={90} width={140} className="absolute -left-10" />
            <a href="/" className="absolute left-[64px]">Finblage</a>
          </div>
          <div className="flex-shrink-0 flex items-center space-x-3">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
              <Sparkles size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
              <FileText size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
              <Bookmark size={18} />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors text-gray-300 hover:text-white">
              <Share2 size={18} />
            </button>
          </div>
        </div>
      </div> */}
    </>
  );
};
