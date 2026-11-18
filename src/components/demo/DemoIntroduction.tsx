import React from "react";
import CampusIllustration from "./CampusIllustration";

export interface DemoIntroductionProps {
  className?: string;
}

export default function DemoIntroduction({ className = "" }: DemoIntroductionProps) {
  return (
    <div className={`w-full max-w-[540px] flex flex-col justify-between ${className}`}>
      <div>
        {/* Eyebrow - Let's Connect */}
        <div className="mb-3 sm:mb-4">
          <span className="text-base sm:text-lg font-bold text-primary uppercase tracking-wider inline-block">
            LET’S CONNECT
          </span>
        </div>

        {/* Headline with exact two-line contrasting typography - 16px to description */}
        <h2 className="text-3xl sm:text-4xl md:text-[42px] lg:text-[46px] leading-[1.12] tracking-tight mb-4">
          <span className="block font-sans font-bold text-navy">
            Your next chapter
          </span>
          <span className="block font-serif italic font-normal text-primary">
            starts with Edubot.
          </span>
        </h2>

        {/* Supporting Paragraph - 32px to illustration */}
        <p className="text-sm sm:text-base md:text-[17px] text-secondary leading-relaxed max-w-[440px] mb-6 sm:mb-8">
          See how connected administration, teaching and learning can work for your institution.
        </p>
      </div>

      {/* Campus Gateway Artwork with Category Caption */}
      <div className="mt-auto pt-2">
        <CampusIllustration />
      </div>
    </div>
  );
}

