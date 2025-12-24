"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function FieldsPage() {
  const params = useParams();
  const collectionId = params.id;

  const [name, setName] = useState("");
  const [type, setType] = useState("text");
  const [fields, setFields] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch fields
  useEffect(() => {
    if (!collectionId) return;

    fetch(`/api/cms/fields?collectionId=${collectionId}`)
      .then((res) => res.json())
      .then(setFields);
  }, [collectionId]);

  // Add new field
  async function addField(e) {
    e.preventDefault();

    await fetch("/api/cms/fields", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        collectionId,
        name,
        type,
      }),
    });

    setName("");
    setShowForm(false);

    const res = await fetch(
      `/api/cms/fields?collectionId=${collectionId}`
    );
    setFields(await res.json());
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* Header */}
        <header className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Manage Fields
          </h2>
          <p className="text-gray-600 mt-1">
            Define the fields for your collection
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowForm(true)}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white font-medium
                       hover:bg-blue-700 transition"
          >
            + Add Field
          </button>

          <Link href={`/dashboard/cms/collection/${collectionId}/form`}>
            <button
              className="rounded-lg border border-blue-600 px-5 py-2
                         text-blue-600 font-medium hover:bg-blue-50 transition"
            >
              Open Form
            </button>
          </Link>

          <Link href={`/dashboard/cms/collection/${collectionId}/entry`}>
  <button className="rounded-lg bg-gray-800 px-5 py-2 text-white">
    View Entries
  </button>
</Link>

        </div>

        {/* Add Field Form */}
        {showForm && (
          <section className="bg-white rounded-xl shadow p-6 space-y-4 relative">

            {/* Close Button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold text-gray-800">
              New Field
            </h3>

            <form
              onSubmit={addField}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                placeholder="Field name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="date">Date</option>
                <option value="email">Email</option>
                <option value="password">Password</option>
                <option value="url">URL</option>
                <option value="tel">Telephone</option>
                <option value="color">Color</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
                <option value="file">File</option>
                <option value="time">Time</option>
                <option value="datetime-local">Date & Time</option>
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="range">Range</option>
                <option value="textarea">Textarea</option>
              </select>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2 text-white font-medium
                           hover:bg-blue-700 transition"
              >
                Add
              </button>
            </form>
          </section>
        )}

        {/* Fields List */}
        <section className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Existing Fields
          </h3>

          {fields.length === 0 ? (
            <p className="text-gray-500">No fields added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                      Field Name
                    </th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                      Type
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {fields.map((f) => (
                    <tr
                      key={f._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {f.name}
                      </td>
                      <td className="px-4 py-3 text-gray-500 capitalize">
                        {f.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
