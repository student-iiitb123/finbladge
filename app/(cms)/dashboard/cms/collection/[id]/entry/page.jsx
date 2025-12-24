'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function EntriesPage() {
  const params = useParams();
  const collectionId = params.id;

  const [entries, setEntries] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!collectionId) return;

    async function fetchData() {
      const fieldsRes = await fetch(
        `/api/cms/fields?collectionId=${collectionId}`
      );
      const fieldsData = await fieldsRes.json();

      const entryRes = await fetch(
        `/api/cms/entry?collectionId=${collectionId}`
      );
      const entryData = await entryRes.json();

      setFields(fieldsData);
      setEntries(entryData);
      setLoading(false);
    }

    fetchData();
  }, [collectionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Header */}
        <header>
          <h2 className="text-3xl font-bold text-gray-900">
            Collection Entries
          </h2>
          <p className="text-gray-600 mt-1">
            View all submitted records
          </p>
        </header>

        {/* Table */}
        <section className="bg-white rounded-xl shadow overflow-x-auto">
          {entries.length === 0 ? (
            <p className="p-6 text-gray-500">No entries found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {fields.map(field => (
                    <th
                      key={field._id}
                      className="px-4 py-3 text-left text-sm font-medium text-gray-600"
                    >
                      {field.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y">
                {entries.map(entry => (
                  <tr key={entry._id} className="hover:bg-gray-50">
                    {fields.map(field => (
                      <td
                        key={field._id}
                        className="px-4 py-3 text-gray-800"
                      >
                        {entry.data?.[field.name] || '—'}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

      </div>
    </main>
  );
}
