import React from "react";
import Image from "next/image";

export interface CampusIllustrationProps {
  className?: string;
}

export default function CampusIllustration({ className = "" }: CampusIllustrationProps) {
  return (
    <figure className={`w-full max-w-[520px] flex flex-col items-center mx-auto lg:-translate-x-4 ${className}`}>
      {/* Real Campus Illustration with Circular Blue 'e' Emblem */}
      <div className="relative w-full aspect-[448/259] select-none">
        <Image
          src="/images/edubot-campus-animation.gif"
          alt="Animated Edubot campus illustration with the central Edubot mark, campus buildings and students"
          fill
          unoptimized
          loading="lazy"
          quality={90}
          sizes="(max-width: 768px) 100vw, 460px"
          priority={false}
          className="object-contain object-center pointer-events-none mix-blend-multiply"
          style={{ filter: "brightness(1.08) contrast(1.08)" }}
        />
      </div>

      {/* Institution Category Caption */}
      <figcaption className="text-center text-xs sm:text-sm font-medium text-secondary mt-3 select-none">
        Schools · Colleges · Universities
      </figcaption>
    </figure>
  );
}

