"use client";

import React from "react";
import { HeroContent } from "./hero";

export default function OverviewSection() {
  return (
    <section
      id="overview"
      className="relative isolate w-full min-h-[680px] lg:min-h-[calc(100svh_-_72px)] overflow-hidden bg-white flex items-center justify-center border-b border-[#E0E6EF] scroll-mt-[72px]"
      aria-label="Overview"
    >
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover"
        style={{ filter: "blur(4px) brightness(0.76) saturate(0.86)", transform: "scale(1.05)" }}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/videos/edubot-campus-v2.mp4" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 z-10 bg-[#DCE6F0]/45" aria-hidden="true" />
      <div className="relative z-20 w-full max-w-[1000px] mx-auto px-5 sm:px-8 py-8 sm:py-10 lg:py-12">
        <HeroContent className="mx-auto" />
      </div>
    </section>
  );
}
