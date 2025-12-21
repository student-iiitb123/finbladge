import React from 'react';
import Pagination from '../components/Pagination';
import AnimatedArticleCard from '../components/AnimatedArticleCard';
import ListHero from '../components/ListHero';

// Helper to generate fake news articles
const generateFakeNews = (count = 12) => {
  const categories = ['Corporate', 'Market', 'Economy', 'Geopolitical', 'Sector'];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Sample Article ${i + 1}`,
    summary: `This is a summary of article ${i + 1}. It contains some example text to show the layout.`,
    imageUrl: `https://picsum.photos/400/250?random=${i + 1}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }));
};

// Fake paging meta
const generateFakePaging = (page, perPage, total = 50) => {
  const totalPages = Math.ceil(total / perPage);
  return {
    hasNext: page < totalPages - 1,
    totalPages,
  };
};

export default function NewsPage({ searchParams }) {
  const apiPage = Number(searchParams?.page || '0'); // 0-based
  const perPage = 12;

  const newsData = generateFakeNews(perPage);
  const pagingMetadata = generateFakePaging(apiPage, perPage);

  return (
    <>
      <ListHero
        title="Financial News"
        subtitle="Stay updated with the latest financial news and market insights."
        showFilters={true}
      />

      <div className="bg-gray-50">
        <main className="container mx-auto px-4 pb-16 pt-8">
          {newsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newsData.map((item) => (
                <AnimatedArticleCard key={item.id} item={item} basePath="/news" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No news articles found.</p>
            </div>
          )}

          <Pagination
            currentPage={apiPage}
            hasNextPage={pagingMetadata.hasNext}
            basePath="/news"
          />
        </main>
      </div>
    </>
  );
}
