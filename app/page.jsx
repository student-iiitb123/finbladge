import React, { Suspense } from "react";
import Hero from "./components/Hero";
import AnimatedArticleCard from "./components/AnimatedArticleCard";
import LoadingLink from "./components/Loading";
import { ArrowRight } from "lucide-react";
import HomepageContentSkeleton from "./components/HomepageContentSkeleton";

/* ---------------- STATIC DATA ---------------- */

const staticNews = [
  {
    id: "news-1",
    data: {
      richtext: "Global Markets Rally Amid Inflation Easing",
      abstract: "Stock markets across the globe rallied as inflation showed signs of cooling.",
      category: "Markets",
      date: "2025-01-10",
      time: "10:30",
      "link-news-richtext-2": "/news/global-markets-rally"
    }
  },
  {
    id: "news-2",
    data: {
      richtext: "RBI Keeps Interest Rates Unchanged",
      abstract: "The Reserve Bank of India decided to keep interest rates unchanged.",
      category: "Economy",
      date: "2025-01-09",
      time: "09:15",
      "link-news-richtext-2": "/news/rbi-interest-rates"
    }
  },
  {
    id: "news-3",
    data: {
      richtext: "IT Stocks Lead Nifty Gains",
      abstract: "IT sector stocks led gains in today's trading session.",
      category: "Stocks",
      date: "2025-01-08",
      time: "11:00",
      "link-news-richtext-2": "/news/it-stocks-gain"
    }
  },
  {
    id: "news-4",
    data: {
      richtext: "Oil Prices Rise on Supply Concerns",
      abstract: "Crude oil prices rose due to geopolitical supply concerns.",
      category: "Commodities",
      date: "2025-01-07",
      time: "08:45",
      "link-news-richtext-2": "/news/oil-prices-rise"
    }
  }
];

const staticFeatured = [
  {
    id: "insight-1",
    data: {
      title: "2025 Market Outlook: What Investors Should Know",
      glimpse: "A comprehensive outlook on global and Indian markets for 2025.",
      date: "2025-01-05",
      image: "https://via.placeholder.com/600x400",
      "link-market-insights-title": "/market-insights/2025-outlook"
    },
    basePath: "/market-insights"
  },
  {
    id: "outlook-1",
    data: {
      title: "Indian Economy Growth Forecast",
      glimpse: "GDP growth expectations and sector-wise performance analysis.",
      date: "2025-01-04",
      image: "https://via.placeholder.com/600x400",
      "link-market-outlook-title": "/market-outlook/india-growth"
    },
    basePath: "/market-outlook"
  },
  {
    id: "merger-1",
    data: {
      title: "Top M&A Deals to Watch in 2025",
      glimpse: "Key mergers and acquisitions shaping the business landscape.",
      date: "2025-01-03",
      image: "https://via.placeholder.com/600x400",
      "link-merger-acquisition-title": "/merger-acquisition/top-deals"
    },
    basePath: "/merger-acquisition"
  },
  {
    id: "spotlight-1",
    data: {
      title: "Startup Spotlight: FinTech Disruptors",
      glimpse: "Emerging fintech startups transforming digital payments.",
      date: "2025-01-02",
      image: "https://via.placeholder.com/600x400",
      "link-spotlight-title": "/spotlight/fintech-startups"
    },
    basePath: "/spotlight"
  }
];

/* ---------------- CONTENT ---------------- */

function HomepageContent() {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">

        {/* LATEST NEWS */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Latest Market News
            </h2>

            <LoadingLink
              href="/news"
              className="group text-primary font-semibold flex items-center gap-2 text-sm md:text-base"
            >
              Show More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </LoadingLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticNews.map(item => (
              <AnimatedArticleCard
                key={item.id}
                item={item}
                basePath="/news"
              />
            ))}
          </div>
        </section>

        {/* FEATURED INSIGHTS */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">
              Featured Insights
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {staticFeatured.map(({ id, data, basePath }) => (
              <AnimatedArticleCard
                key={id}
                item={{ id, data }}
                basePath={basePath}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}

/* ---------------- PAGE ---------------- */

export default function Home() {
  return (
    <main>
      <Hero />

      <Suspense fallback={<HomepageContentSkeleton />}>
        <HomepageContent />
      </Suspense>
    </main>
  );
}
