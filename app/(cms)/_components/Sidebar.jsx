"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  PlusSquare,
  Settings,
  LogOut,
  User
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setOpen(true)}
        className="
          fixed top-4 left-4 z-50 md:hidden
          rounded-xl border border-gray-200
          bg-gradient-to-br from-white to-gray-100
          p-2
          shadow-[0_6px_20px_rgba(0,0,0,0.15)]
        "
      >
        ☰
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen
          w-[75%] sm:w-[60%] md:w-64
          bg-gradient-to-br from-white via-gray-50 to-gray-100
          p-5
          transition-transform duration-300
          md:static md:z-auto md:translate-x-0
          border-r border-gray-200
          shadow-[8px_0_25px_rgba(0,0,0,0.15)]
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 tracking-wide">
            Admin Panel
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Profile Card */}
        <div
          className="
            flex items-center gap-3
            rounded-2xl
            bg-gradient-to-br from-white to-gray-100
            p-3
            border border-gray-200
            shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_25px_rgba(0,0,0,0.15)]
          "
        >
          {/* <Image
            src=""
            alt="User"
            width={42}
            height={42}
            className="
              rounded-full
              border border-gray-300
              ring-2 ring-gray-200
              shadow-[0_4px_12px_rgba(0,0,0,0.2)]
            "
          /> */}
          <div>
            <p className="text-sm font-semibold text-gray-800">
              USER name
            </p>
            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
            >
              <User size={14} /> View Profile
            </Link>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-200" />

        {/* Navigation */}
        <nav className="flex flex-col gap-2 text-sm">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              rounded-xl px-3 py-2
              text-gray-700
              bg-gradient-to-br from-white to-gray-100
              border border-gray-200
              shadow-[0_6px_16px_rgba(0,0,0,0.12)]
              hover:translate-y-[1px]
              hover:text-black
              transition-all
            "
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/dashboard/cms"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              rounded-xl px-3 py-2
              text-gray-700
              bg-gradient-to-br from-white to-gray-100
              border border-gray-200
              shadow-[0_6px_16px_rgba(0,0,0,0.12)]
              hover:translate-y-[1px]
              hover:text-black
              transition-all
            "
          >
            <PlusSquare size={18} />
            CMS
          </Link>

          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className="
              flex items-center gap-3
              rounded-xl px-3 py-2
              text-gray-700
              bg-gradient-to-br from-white to-gray-100
              border border-gray-200
              shadow-[0_6px_16px_rgba(0,0,0,0.12)]
              hover:translate-y-[1px]
              hover:text-black
              transition-all
            "
          >
            <Settings size={18} />
            Settings
          </Link>

          <hr className="my-3 border-gray-200" />

          <button
            onClick={() => {
              setOpen(false);
              console.log("Logout");
            }}
            className="
              flex items-center gap-3
              rounded-xl px-3 py-2 text-left
              text-red-500
              bg-gradient-to-br from-white to-gray-100
              border border-gray-200
              shadow-[0_6px_16px_rgba(0,0,0,0.12)]
              hover:text-red-600
              hover:translate-y-[1px]
              transition-all
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  );
}