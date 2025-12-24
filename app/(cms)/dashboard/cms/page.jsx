'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CMSCollectionsPage() {
  const [data, setData] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const res = await fetch("/api/cms/collections");
    const json = await res.json();
    setData(json);
  };

  fetchData();
}, []); 

console.log(data);



  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">CMS</h1>
          <p className="text-gray-600">
            Store and manage content to display anywhere on your site.
          </p>
        </header>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          <input
            type="text"
            placeholder="Search collections"
            // value={search}
            // onChange={e => setSearch(e.target.value)}
            className="w-full sm:w-80 rounded-lg border border-gray-300 px-4 py-2
                       focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

         <Link href="/dashboard/cms/collection">
  <button
    className="inline-flex items-center gap-2 rounded-lg bg-blue-600
               px-5 py-2 text-white font-medium hover:bg-blue-700"
  >
    + Create Collection
  </button>
</Link>
        </div>

        {/* Info */}
        <p className="text-sm text-gray-500">
          {/* Your Collections <span className="font-medium">{collections.length}</span> */}
        </p>

        {/* Collections Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {data.map(collection => (
    <Link
      key={collection._id}
      href={`/dashboard/cms/collection/${collection._id}/field`}
      className="block"
    >
      <div
        className="rounded-xl bg-white p-5 shadow
                   hover:shadow-md transition cursor-pointer"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            {collection.name}
          </h3>

          <button
            onClick={(e) => e.preventDefault()} // prevent card navigation
            className="text-gray-400 hover:text-gray-600"
          >
            •••
          </button>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          {collection.items ?? 0} items
        </p>
      </div>
    </Link>
  ))}

  {data.length === 0 && (
    <p className="text-gray-500 col-span-full">
      No collections found.
    </p>
  )}
</section>

      </div>
    </main>
  );
}
