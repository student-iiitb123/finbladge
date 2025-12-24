'use client';
import { useState } from 'react';
import { useRouter } from "next/navigation";


export default function HomePage() {

 const router = useRouter()   ;
const [name,setName] = useState("")

    const handleCollection = async () => {

        console.log(name)
        await fetch('/api/cms/collections' , {
            method :"POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name }),
        });

           setName('');
           router.push('/dashboard/cms')

    }



  return (
    <main className="min-h-screen bg-gray-100 p-6 ">
      <div className="max-w-4xl mx-auto space-y-40">

        {/* Header */}
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-gray-900">
            CMS Collections
          </h1>
          <p className="text-gray-600">
            Create and manage your content collections
          </p>
        </header>
  
        {/* Create Collection Card */}
       <section className="bg-white rounded-2xl shadow-md p-6 space-y-4
                    max-w-sm mx-auto">
  <h2 className="text-xl font-semibold text-gray-800 text-center">
    New Collection
  </h2>

  <div className="flex flex-col gap-4">
    <input
      type="text"
      placeholder="Collection name"
      value={name}
      onChange={e => setName(e.target.value)}
      className="w-full rounded-lg border border-gray-300 px-4 py-2
                 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <button
     onClick={() => {
        handleCollection()
     }}
      className="w-full rounded-lg bg-blue-600 px-4 py-2
                 text-white font-medium hover:bg-blue-700 transition"
    >
      Create Collection
    </button>
  </div>
</section>


     
       
      </div>
    </main>
  );
}
