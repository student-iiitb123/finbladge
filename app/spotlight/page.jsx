import React from "react";
import Pagination from "../components/Pagination";
import AnimatedArticleCard from "../components/AnimatedArticleCard";
import ListHero from "../components/ListHero";

// Static spotlight articles
const STATIC_ARTICLES = [
  {
    id: "1",
    title: "CEO Insights on Market Trends",
    summary: "Exclusive interview with top CEOs about upcoming market trends.",
    imageUrl: "https://picsum.photos/400/250?random=1",
    category: "Spotlight",
    date: "2025-01-10",
    slug: "ceo-insights-market-trends",
  },
  {
    id: "2",
    title: "Innovative Startups to Watch",
    summary: "A deep dive into emerging startups that are changing the industry.",
    imageUrl: "https://picsum.photos/400/250?random=2",
    category: "Spotlight",
    date: "2025-01-11",
    slug: "innovative-startups-to-watch",
  },
  {
    id: "3",
    title: "Leadership Lessons from Industry Leaders",
    summary: "Learn how top leaders navigate challenges and drive success.",
    imageUrl: "https://picsum.photos/400/250?random=3",
    category: "Spotlight",
    date: "2025-01-12",
    slug: "leadership-lessons-industry-leaders",
  },
  {
    id: "4",
    title: "Exclusive Report: Tech Disruptions",
    summary: "Spotlight on technologies disrupting traditional markets worldwide.",
    imageUrl: "https://picsum.photos/400/250?random=4",
    category: "Spotlight",
    date: "2025-01-13",
    slug: "exclusive-report-tech-disruptions",
  },
];

export default function SpotlightPage({ searchParams }) {
  // Static page number
  const page = Number(searchParams?.page) || 0;

  // Simulated pagination
  const perPage = 4; // articles per page
  const total = STATIC_ARTICLES.length;
  const totalPages = Math.ceil(total / perPage);
  const hasNextPage = page < totalPages - 1;

  // Slice articles for current page
  const articles = STATIC_ARTICLES.slice(
    page * perPage,
    (page + 1) * perPage
  );

  return (
    <>
      <ListHero
        title="Spotlight"
        subtitle="Featured stories, deep-dive reports, and exclusive interviews with industry leaders."
      />

      <div className="bg-gray-50">
        <main className="container mx-auto px-4 py-16">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <AnimatedArticleCard
                  key={article.id}
                  item={article}
                  basePath="/spotlight"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No spotlight articles found.
              </p>
            </div>
          )}

          <Pagination
            currentPage={page}
            hasNextPage={hasNextPage}
            basePath="/spotlight"
          />
        </main>
      </div>
    </>
  );
}
