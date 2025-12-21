import React from "react";
import Pagination from "../components/Pagination";
import AnimatedArticleCard from "../components/AnimatedArticleCard";
import ListHero from "../components/ListHero";

/* ---------------- FAKE STATIC DATA ---------------- */

const STATIC_ARTICLES = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  title: `M&A Deal ${i + 1}`,
  summary: `Summary of merger and acquisition deal number ${i + 1}.`,
  category: "Mergers & Acquisitions",
  date: "2025-01-10",
  time: "10:30",
  imageUrl: `https://picsum.photos/400/250?random=${i + 1}`,
  slug: `ma-deal-${i + 1}`,
}));

const PER_PAGE = 12;

/* ---------------- PAGE ---------------- */

export default function MergerAcquisitionPage({ searchParams }) {
  const page = Number(searchParams?.page) || 0;

  // Calculate slice range
  const start = page * PER_PAGE;
  const end = start + PER_PAGE;

  // Get current page articles
  const articles = STATIC_ARTICLES.slice(start, end);

  // Pagination logic
  const hasNextPage = end < STATIC_ARTICLES.length;

  return (
    <>
      <ListHero
        title="Mergers & Acquisitions"
        subtitle="Comprehensive coverage of the latest deals, corporate restructuring, and market consolidation."
      />

      <div className="bg-gray-50">
        <main className="container mx-auto px-4 py-16">
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article) => (
                <AnimatedArticleCard
                  key={article.id}
                  item={article}
                  basePath="/merger-acquisition"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No M&A news found.
              </p>
            </div>
          )}

          <Pagination
            currentPage={page}
            hasNextPage={hasNextPage}
            basePath="/merger-acquisition"
          />
        </main>
      </div>
    </>
  );
}
