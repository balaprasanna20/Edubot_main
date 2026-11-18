"use client";

import React from "react";
import { ArrowRight, Play } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

export interface HeroActionsProps {
  className?: string;
}

export default function HeroActions({ className = "" }: HeroActionsProps) {
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    scrollToSection(targetId);
  };

  return (
    <div className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ${className}`}>
      <a
        href="#request-demo"
        onClick={(e) => handleScrollTo(e, "request-demo")}
        className="inline-flex items-center justify-center w-full sm:w-auto min-w-[190px] h-[50px] px-5 bg-[#064BFF] hover:bg-[#0039DE] text-white font-semibold text-sm lg:text-[15px] rounded-[10px] shadow-[0_8px_20px_-8px_rgba(6,75,255,0.65)] transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
        aria-label="Request a personalised demo"
      >
        <span>Request a Demo</span>
        <ArrowRight className="w-4 h-4 ml-2 stroke-[2.2]" aria-hidden="true" />
      </a>

      <a
        href="#user-portals"
        onClick={(e) => handleScrollTo(e, "user-portals")}
        className="inline-flex items-center gap-2 text-[#080D28] hover:text-[#0747FF] font-semibold text-sm lg:text-[15px] transition-colors duration-150 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none"
        aria-label="See how Edubot works for every role"
      >
        <span className="h-8 w-8 rounded-full border border-[#D8DFEA] flex items-center justify-center">
          <Play className="w-3 h-3 fill-current" aria-hidden="true" />
        </span>
        <span>See how it works</span>
      </a>
    </div>
  );
}
