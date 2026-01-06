"use client";

import React, { useEffect, useState } from "react";
import { Minimize2, Maximize2 } from "lucide-react";

import { ArticleMainContent } from "../../components/ArticleMainContent";
import { ArticleSidebar } from "../../components/ArticleSidebar";
import { ArticleDetailHero } from "../../components/ArticleDetailHero";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "../../components/Dialog";

import NoteEditor from "../../components/NoteEditor";
import { Button } from "../../components/Button";

// --- Loading Skeleton (without header) ---
const NewsDetailSkeleton = () => (
  <div className="animate-pulse bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <main className="lg:w-2/3">
          <div className="h-6 w-full bg-gray-200 rounded mb-4"></div>
          <div className="h-6 w-5/6 bg-gray-200 rounded mb-8"></div>
          <div className="space-y-4">
            <div className="h-5 w-full bg-gray-200 rounded"></div>
            <div className="h-5 w-full bg-gray-200 rounded"></div>
          </div>
        </main>
        <aside className="lg:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="h-8 w-1/2 bg-gray-200 rounded mb-5"></div>
          </div>
        </aside>
      </div>
    </div>
  </div>
);

// --- STATIC DATA ---
const STATIC_NEWS_ITEM = {
  id: "static-1",
  data: {
    richtext: "Market Update: Global Stocks Rally",
    category: "Market",
    date: "2026-01-05",
    time: "10:30",
    content: `
      Global equity markets rallied today as investors reacted positively
      to easing inflation data and strong earnings from tech giants.
    `,
  },
};

const STATIC_OTHER_NEWS = [
  { id: "static-2", data: { richtext: "RBI Policy Outlook", category: "Economy" } },
  { id: "static-3", data: { richtext: "M&A Activity Picks Up", category: "Corporate" } },
  { id: "static-4", data: { richtext: "Tech IPOs Surge", category: "Technology" } },
  { id: "static-5", data: { richtext: "Oil Prices Decline", category: "Energy" } },
  { id: "static-6", data: { richtext: "Global Bond Yields Fall", category: "Finance" } },
];

export default function NewsDetailPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNoteMinimized, setIsNoteMinimized] = useState(false);
  const [note, setNote] = useState("");

  const article = STATIC_NEWS_ITEM.data;

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <NewsDetailSkeleton />;

  return (
    <>
      {/* HERO */}
      <ArticleDetailHero
        title={article.richtext}
        category={article.category}
        date={article.date}
        time={article.time}
        itemId={STATIC_NEWS_ITEM.id}
      />

      {/* MAIN CONTENT */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <ArticleMainContent item={STATIC_NEWS_ITEM} />

            <ArticleSidebar
              currentItemId={STATIC_NEWS_ITEM.id}
              allItemsForTrending={STATIC_OTHER_NEWS}
              title="More News"
              items={STATIC_OTHER_NEWS}
              basePath="/news"
            />
          </div>
        </div>
      </div>

      {/* NOTES MODAL */}
      <Dialog
        open={isNoteModalOpen}
        onOpenChange={(open) => {
          if (!open) setIsNoteMinimized(false);
          setIsNoteModalOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>Create Note</DialogTitle>
            <DialogDescription>
              Add your personal notes for: "{article.richtext}"
            </DialogDescription>
          </DialogHeader>

          <div className="flex-grow overflow-y-auto pt-2 -mx-6 px-6">
            <NoteEditor content={note} onUpdate={(html) => setNote(html)} />
          </div>

          <DialogFooter className="pt-4 border-t mt-2 sm:justify-between">
            <Button
              variant="ghost"
              onClick={() => {
                setIsNoteModalOpen(false);
                setIsNoteMinimized(true);
              }}
            >
              <Minimize2 className="w-4 h-4 mr-2" />
              Minimize
            </Button>

            <DialogClose asChild>
              <Button>Done</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MINIMIZED NOTE BUTTON */}
      {isNoteMinimized && (
        <Button
          className="fixed bottom-6 left-6 z-[60] rounded-full shadow-lg h-14 w-14 p-0"
          onClick={() => {
            setIsNoteMinimized(false);
            setIsNoteModalOpen(true);
          }}
        >
          <Maximize2 size={24} />
        </Button>
      )}
    </>
  );
}
