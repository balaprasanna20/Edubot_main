import React from "react";
import Image from "next/image";

export interface EdubotLogoProps {
  className?: string;
  iconOnly?: boolean;
  inverted?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function EdubotLogo({
  className = "",
  iconOnly = false,
  inverted = false,
  size = "md",
}: EdubotLogoProps) {
  // Height sizing
  const heightClasses = {
    sm: "h-7 sm:h-8",
    md: "h-8 sm:h-9",
    lg: "h-10 sm:h-11",
  }[size];

  if (iconOnly) {
    return (
      <div className={`relative inline-flex items-center justify-center select-none flex-shrink-0 ${heightClasses} aspect-square ${className}`}>
        <Image
          src="/images/edubot-icon.png"
          alt="Edubot Icon"
          width={148}
          height={148}
          priority
          className={`w-full h-full object-contain ${inverted ? "brightness-0 invert" : ""}`}
        />
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center select-none ${heightClasses} ${className}`}>
      <Image
        src="/images/edubot-logo.png"
        alt="Edubot"
        width={610}
        height={148}
        priority
        className={`h-full w-auto object-contain ${inverted ? "brightness-0 invert" : ""}`}
      />
      {inverted && (
        <Image
          src="/images/edubot-icon.png"
          alt=""
          aria-hidden="true"
          width={148}
          height={148}
          priority
          className="absolute left-0 top-0 h-full w-auto aspect-square object-contain"
        />
      )}
    </div>
  );
}
