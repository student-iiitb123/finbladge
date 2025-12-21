"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

// --- StockCandle Component ---
const StockCandle = ({ className, isPositive = true }) => {
  const color = isPositive ? "text-green-500" : "text-red-500";

  return (
    <svg
      className={`shape absolute w-16 h-28 ${className} ${color} opacity-20`}
      viewBox="0 0 20 40"
      fill="currentColor"
      stroke="currentColor"
    >
      <line
        className="candle-wick-top"
        x1="10"
        y1="0"
        x2="10"
        y2="10"
        strokeWidth="2"
        style={{ transformOrigin: "bottom center" }}
      />
      <rect
        className="candle-body"
        x="5"
        y="10"
        width="10"
        height="20"
        style={{ transformOrigin: "center center" }}
      />
      <line
        className="candle-wick-bottom"
        x1="10"
        y1="30"
        x2="10"
        y2="40"
        strokeWidth="2"
        style={{ transformOrigin: "top center" }}
      />
    </svg>
  );
};

// --- AnimatedQuote Component ---
const AnimatedQuote = ({ staticText }) => {
  return (
    <h2
      className="quote-item hero-title text-2xl text-center md:text-3xl font-bold leading-tight min-h-[3rem]"
      style={{ fontFamily: "var(--font-oxygen)" }}
    >
      <span className="hero-title-static">{staticText} </span>
      <span className="hero-animated-text opacity-0 text-yellow-400"></span>
      <span className="hero-cursor opacity-0 inline-block w-1 h-7 md:h-8 ml-1 bg-yellow-400 animate-pulse"></span>
    </h2>
  );
};

// --- Hero Component ---
const Hero = () => {
  const containerRef = useRef(null);

  const quotes = [
    {
      staticText: "The Market ",
      animatedWords: ["Decoded", "Quantified", "Explained", "Simplified"],
    },
  ];

  useGSAP(
    () => {
      const random = gsap.utils.random;
      const masterTl = gsap.timeline({ delay: 0.5 });

      masterTl.fromTo(
        ".hero-quote-grid",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );

      const quoteElements = gsap.utils.toArray(".quote-item");

      quoteElements.forEach((element, index) => {
        const animatedText = element.querySelector(".hero-animated-text");
        const cursor = element.querySelector(".hero-cursor");
        const quoteData = quotes[index];

        if (animatedText && cursor && quoteData) {
          const quoteTl = gsap.timeline({ repeat: -1 });

          quoteTl.to([animatedText, cursor], { opacity: 1 }, 0);

          quoteData.animatedWords.forEach((word) => {
            quoteTl.to(animatedText, {
              text: word,
              duration: word.length * 0.12,
              ease: "none",
            });

            quoteTl.to(
              animatedText,
              {
                text: { value: "", rtl: true },
                duration: word.length * 0.08,
                ease: "power1.in",
              },
              "+=1.5"
            );
          });

          masterTl.add(quoteTl);
        }
      });

      const candles = gsap.utils.toArray(".shape");

      candles.forEach((candle) => {
        const body = candle.querySelector(".candle-body");
        const topWick = candle.querySelector(".candle-wick-top");
        const bottomWick = candle.querySelector(".candle-wick-bottom");

        gsap
          .timeline({
            repeat: -1,
            repeatDelay: random(1, 4),
            yoyo: true,
          })
          .to(body, { scaleY: random(0.2, 1.5), duration: random(1, 3) }, 0)
          .to(topWick, { scaleY: random(0.1, 2), duration: random(1, 3) }, 0)
          .to(bottomWick, { scaleY: random(0.1, 2), duration: random(1, 3) }, 0);
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative bg-gradient-to-br from-primary via-primary to-[#000b2c] text-white py-24 md:py-40 overflow-hidden"
    >
      <div className="absolute inset-0 z-0 opacity-[0.07]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="pattern-lines"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="10" stroke="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pattern-lines)" />
        </svg>
      </div>

      <div className="absolute inset-0 z-0">
        <StockCandle className="top-[15%] left-[10%]" isPositive />
        <StockCandle className="top-[30%] left-[80%]" isPositive={false} />
        <StockCandle className="top-[70%] left-[5%]" isPositive={false} />
        <StockCandle className="top-[10%] left-[70%]" isPositive />
        <StockCandle className="top-[80%] left-[75%]" isPositive={false} />
        <StockCandle className="top-[50%] left-[40%]" isPositive />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="hero-quote-grid mx-auto opacity-0">
          {quotes.map((quote, index) => (
            <AnimatedQuote key={index} staticText={quote.staticText} />
          ))}

          <h1 className="text-center md:text-3xl mt-2 mb-1 text-2xl">
            Research That Empowers Your Investments
          </h1>

          <h2 className="text-center md:text-2xl text-gray-200 text-xl md:w-[70%] mx-auto">
            Empowering Investors with In-Depth Research, Actionable Insights, and
            Market Clarity
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Hero;
