import React from "react";
import Pagination from "../components/Pagination";
import AnimatedArticleCard from "../components/AnimatedArticleCard";
import ListHero from "../components/ListHero";

// Static articles for mock data
const STATIC_ARTICLES = [
  {
    id: "1",
    title: "Global Market Rally Predicted",
    summary:
      "Experts predict strong growth in global markets due to economic recovery.",
    imageUrl: "https://picsum.photos/400/250?random=1",
    category: "Market Outlook",
    date: "2025-01-10",
    slug: "global-market-rally-predicted",
  },
  {
    id: "2",
    title: "Tech Stocks Set to Surge",
    summary:
      "Technology sector expected to outperform in the upcoming quarter.",
    imageUrl: "https://picsum.photos/400/250?random=2",
    category: "Market Outlook",
    date: "2025-01-11",
    slug: "tech-stocks-set-to-surge",
  },
  {
    id: "3",
    title: "Inflation Concerns Easing",
    summary:
      "Inflation rates show signs of stabilizing, boosting investor confidence.",
    imageUrl: "https://picsum.photos/400/250?random=3",
    category: "Market Outlook",
    date: "2025-01-12",
    slug: "inflation-concerns-easing",
  },
  {
    id: "4",
    title: "Energy Sector Outlook 2025",
    summary:
      "Energy markets expected to grow steadily amid global demand recovery.",
    imageUrl: "https://picsum.photos/400/250?random=4",
    category: "Market Outlook",
    date: "2025-01-13",
    slug: "energy-sector-outlook-2025",
  },
];

export default function MarketOutlookPage({ searchParams }) {
  // Static page number
  const page = Number(searchParams?.page) || 0;

  // Simulated paging
  const perPage = 4; // number of articles per page
  const total = STATIC_ARTICLES.length;
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page < totalPages - 1;

  // Slice articles for current page
  const articles = STATIC_ARTICLES.slice(page * perPage, (page + 1) * perPage);

  return (
    <>
      <ListHero
        title="Market Outlook"
        subtitle="Forward-looking analysis and predictions on market movements and economic forecasts."
      />

      <div className="bg-gray-50">
        <main className="container mx-auto px-4 py-16">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <AnimatedArticleCard
                  key={article.id}
                  item={article}
                  basePath="/market-outlook"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No outlook reports found.</p>
            </div>
          )}

          <Pagination
            currentPage={page}
            hasNextPage={hasNextPage}
            basePath="/market-outlook"
          />
        </main>
      </div>
    </>
  );
}
