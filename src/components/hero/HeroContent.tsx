"use client";

import React from "react";
import HeroActions from "./HeroActions";

export interface HeroContentProps {
  className?: string;
}

export default function HeroContent({ className = "" }: HeroContentProps) {
  return (
    <div className={`w-full max-w-[500px] flex flex-col items-center text-center ${className}`}>
      <h1 className="font-serif font-bold text-[#080D28] text-[36px] sm:text-[42px] lg:text-[48px] leading-[1.04] tracking-[-0.045em] mb-4">
        <span className="block text-[#080D28]" aria-hidden="true">Your campus.</span>
        <span className="block text-[#064BFF]" aria-hidden="true">Connected.</span>
        <span className="sr-only">Your campus. Connected.</span>
      </h1>

      <p className="max-w-[440px] text-sm sm:text-[15px] lg:text-base font-bold text-black leading-relaxed mb-3">
        Bring administration, teaching and learning together in one simple platform, so your team can spend more time helping students succeed.
      </p>

      <p className="text-xs sm:text-sm font-bold text-black mb-5">
        For schools, colleges and universities
      </p>

      <HeroActions />
    </div>
  );
}
