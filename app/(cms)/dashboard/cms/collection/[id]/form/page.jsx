'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function FormPage() {
  const params = useParams();
  const collectionId = params.id;

  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!collectionId) return;

    fetch(`/api/cms/fields?collectionId=${collectionId}`)
      .then(res => res.json())
      .then(setFields);
  }, [collectionId]);

  function handleChange(name, value) {
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function submitForm() {
    if (!collectionId) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/cms/entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          collectionId,
          data: formData,
        }),
      });

      if (!res.ok) throw new Error('Failed');

      setFormData({});     // ✅ clear form
      setSuccess(true);    // ✅ show success
    } catch (err) {
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto space-y-6">

        <header className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Dynamic Form
          </h2>
          <p className="text-gray-600 mt-1">
            Fill in the fields below and submit
          </p>
        </header>

        <section className="bg-white rounded-xl shadow p-6 space-y-4">

          {success && (
            <div className="rounded-lg bg-green-50 border border-green-200
                            px-4 py-2 text-green-700 text-sm">
              ✅ Data saved successfully
            </div>
          )}

          {fields.length === 0 ? (
            <p className="text-gray-500">
              No fields found for this collection.
            </p>
          ) : (
            <form
              onSubmit={e => {
                e.preventDefault();
                submitForm();
              }}
              className="space-y-4"
            >
              {fields.map(field => (
                <div key={field._id} className="flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">
                    {field.name}
                  </label>

                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={e =>
                      handleChange(field.name, e.target.value)
                    }
                    className="rounded-lg border border-gray-300 px-4 py-2
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-lg font-medium transition
                  ${loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'}
                `}
              >
                {loading ? 'Saving...' : 'Submit'}
              </button>
            </form>
          )}
        </section>
      </div>
    </main>
  );
}
