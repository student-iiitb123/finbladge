import React from "react";
import RichTextRenderer from "../components/RichTextRendered";

export const ArticleMainContent = ({ item }) => {
  const isNews = "richtext" in item.data;
  const data = item.data;

  // FIX: Check for glimpse first, then fall back to glimpses
  const abstract = isNews ? data.abstract : data.glimpse ?? data.glimpses;
  const body = isNews ? data.subHeadline : data.body;

  return (
    <main className="lg:w-2/3">
      <article>
        {/* Abstract/Intro */}
        {abstract && (
          <p
            className="text-lg text-gray-700 mb-8 border-l-4 border-primary pl-4"
            style={{ fontFamily: "var(--font-oxygen)", fontWeight: 400 }}
          >
            {abstract}
          </p>
        )}

        {/* Main Content */}
        <div className="prose prose-lg max-w-none text-gray-800">
   {isNews ? (
  typeof body === "string" && body.length > 0 ? (
    body.split("\n\n").map(
      (paragraph, index) =>
        paragraph.trim() && (
          <p
            key={index}
            style={{
              fontFamily: "var(--font-oxygen)",
              fontWeight: 400,
            }}
          >
            {paragraph}
          </p>
        )
    )
  ) : null
) : (
  body && <RichTextRenderer content={body} />
)}

        </div>
      </article>
    </main>
  );
};
