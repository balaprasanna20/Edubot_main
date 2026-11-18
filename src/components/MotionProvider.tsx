"use client";

import React from "react";
import { MotionConfig } from "framer-motion";

export interface MotionProviderProps {
  children: React.ReactNode;
}

/**
 * MotionProvider wraps the application in Framer Motion's MotionConfig
 * with reducedMotion="user" so that all motion components automatically respect
 * the user's OS prefers-reduced-motion setting.
 * When reduced motion is preferred, transitions are instant (0 duration)
 * and elements immediately display at their final visible state (never stuck at opacity: 0).
 */
export default function MotionProvider({ children }: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}

