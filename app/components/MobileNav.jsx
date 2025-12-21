"use client";

import React, { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import MobileMenuItem from "./MobileMenuItem";

const MobileNav = ({ menus, account, onClose }) => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const containerRef = useRef(null);

  // Slide-in + fade-in on mount
  useGSAP(
    () => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".mobile-overlay",
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      tl.fromTo(
        ".mobile-panel",
        { x: "100%" },
        { x: "0%", duration: 0.4, ease: "power3.out" },
        "-=0.2"
      );
    },
    { scope: containerRef }
  );

  // Close animation
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(".mobile-panel", {
      x: "100%",
      duration: 0.4,
      ease: "power3.in",
    });
    tl.to(
      ".mobile-overlay",
      { opacity: 0, duration: 0.3 },
      "-=0.2"
    );
  };

  const toggleAccordion = (name) => {
    setOpenAccordion((prev) => (prev === name ? null : name));
  };

  return (
    <div ref={containerRef} className="fixed inset-0 z-40 md:hidden">
      {/* Overlay */}
      <div
        className="mobile-overlay fixed inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />

      {/* Sliding Panel */}
      <div className="mobile-panel fixed top-0 right-0 h-full w-[75%] sm:w-[60%] bg-white shadow-xl p-6">
        <div className="flex flex-col gap-y-6 text-lg">
          {menus.map((menu) => (
            <MobileMenuItem
              key={menu.name}
              menu={menu}
              isOpen={openAccordion === menu.name}
              onClick={() =>
                menu.subMenus && toggleAccordion(menu.name)
              }
            />
          ))}

          <a
            href={account.path}
            className="text-gray-800 font-medium hover:text-blue-600"
          >
            {account.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
