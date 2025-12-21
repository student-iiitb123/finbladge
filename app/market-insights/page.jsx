import React from "react";
import Pagination from "../components/Pagination";
import AnimatedArticleCard from "../components/AnimatedArticleCard";
import ListHero from "../components/ListHero";

/* ✅ STATIC DATA (Mock Articles) */
const MARKET_INSIGHTS = [
  {
    id: "1",
    title: "Global Markets Show Mixed Signals",
    description: "Asian and European markets react to inflation data.",
    image: "/images/market1.jpg",
  },
  {
    id: "2",
    title: "Tech Stocks Rally",
    description: "Technology stocks rebound after recent losses.",
    image: "/images/market2.jpg",
  },
  {
    id: "3",
    title: "Oil Prices Rise",
    description: "Crude oil prices surge amid supply concerns.",
    image: "/images/market3.jpg",
  },
  {
    id: "4",
    title: "Central Banks Remain Cautious",
    description: "Interest rates expected to stay high.",
    image: "/images/market4.jpg",
  },
  {
    id: "5",
    title: "Emerging Markets Gain Attention",
    description: "Investors turn towards emerging economies.",
    image: "/images/market5.jpg",
  },
];

/* Pagination config */
const ITEMS_PER_PAGE = 4;

export default function MarketInsightsPage({ searchParams }) {
  const page = Number(searchParams?.page) || 0;

  /* ✅ PAGINATION LOGIC */
  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const articles = MARKET_INSIGHTS.slice(startIndex, endIndex);
  const hasNextPage = endIndex < MARKET_INSIGHTS.length;

  return (
    <>
      <ListHero
        title="Market Insights"
        subtitle="In-depth analysis and reports on current market trends and economic indicators."
      />

      <div className="bg-gray-50">
        <main className="container mx-auto px-4 py-16">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <AnimatedArticleCard
                  key={article.id}
                  item={article}
                  basePath="/market-insights"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No insights found.
              </p>
            </div>
          )}

          <Pagination
            currentPage={page}
            hasNextPage={hasNextPage}
            basePath="/market-insights"
          />
        </main>
      </div>
    </>
  );
}
