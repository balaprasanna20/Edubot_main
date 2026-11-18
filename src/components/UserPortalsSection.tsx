"use client";

import React, { useState } from "react";
import Image from "next/image";
import { scrollToSection } from "@/lib/scroll";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Shield, Settings, GraduationCap, User, ArrowUpRight, ArrowRight } from "lucide-react";

interface PortalCardData {
  number: string;
  role: string;
  subtitle: string;
  icon: React.ElementType;
  features: string[];
  roleParam: string;
}

const portals: PortalCardData[] = [
  {
    number: "01",
    role: "Super Admin",
    subtitle: "Oversee every institution.",
    icon: Shield,
    features: ["Institution setup", "Feature access", "Module control"],
    roleParam: "Super Admin",
  },
  {
    number: "02",
    role: "Administrator",
    subtitle: "Keep the campus organised.",
    icon: Settings,
    features: ["Users & batches", "Courses & attendance", "Leave approvals"],
    roleParam: "Administrator",
  },
  {
    number: "03",
    role: "Mentor",
    subtitle: "Make every lesson count.",
    icon: GraduationCap,
    features: ["Lesson planning", "Tasks & submissions", "Study materials"],
    roleParam: "Mentor",
  },
  {
    number: "04",
    role: "Student",
    subtitle: "Stay on top of learning.",
    icon: User,
    features: ["Lessons & schedule", "Tasks & grades", "Attendance & leave"],
    roleParam: "Student",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function UserPortalsSection() {
  const reduceMotion = useReducedMotion();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  const handleRoleClick = (roleParam: string) => {
    if (typeof window !== "undefined") {
      window.sessionStorage.setItem("edubot-preselect-role", roleParam);
      window.dispatchEvent(
        new CustomEvent("edubot-preselect-role", { detail: { role: roleParam } })
      );
      scrollToSection("request-demo");
    }
  };

  const handleScrollToBenefits = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("benefits");
  };

  return (
    <section
      id="user-portals"
      className="relative w-full bg-white py-16 md:py-20 lg:py-24 border-y border-[#E0E6EF] scroll-mt-[72px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Top Header: Centered in the middle of the page with inline Edubot 'e' logo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          {/* Eyebrow - 12px to heading */}
          <span className="text-xs sm:text-[13px] font-bold text-primary tracking-wider uppercase mb-3 block">
            FOUR PORTALS. ONE EDUBOT.
          </span>

          {/* Heading - 16px to description */}
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-navy tracking-tight leading-[1.14] mb-4">
            <span className="sr-only">Different roles. One connected campus.</span>
            <motion.span
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "block" }}
            >
              Different roles.
              <br />
              One{" "}
              <span className="text-primary inline-flex items-baseline">
                conn
                <span className="relative inline-block w-[0.82em] h-[0.82em] align-middle mx-[0.5px] -mt-[0.08em] flex-shrink-0">
                  <Image
                    src="/images/edubot-icon.png"
                    alt=""
                    width={40}
                    height={40}
                    priority
                    className="w-full h-full object-contain"
                  />
                </span>
                cted
              </span>{" "}
              campus.
            </motion.span>
          </h2>

          {/* Supporting text */}
          <p className="text-base sm:text-lg text-secondary max-w-xl mx-auto leading-relaxed">
            A dedicated workspace for everyone who runs, teaches and learns.
          </p>
        </motion.div>

        {/* Four-Column Card Grid with Dynamic Solid Blue Hover & Touch States */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-stretch"
        >
          {portals.map((portal, idx) => {
            const Icon = portal.icon;
            // Card is active if hovered, or selected via touch
            const isActive = hoveredCard === idx || (hoveredCard === null && selectedCard === idx);

            return (
              <motion.div
                key={portal.number}
                variants={cardVariants}
                animate={{
                  y: isActive ? -2 : 0,
                }}
                whileHover={{
                  y: -2,
                  transition: { duration: 0.18, ease: "easeOut" },
                }}
                whileTap={{ scale: 0.99 }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  setSelectedCard(idx);
                  handleRoleClick(portal.roleParam);
                }}
                className={`rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-between transition-colors duration-250 min-h-[330px] sm:min-h-[350px] cursor-pointer select-none border ${
                  isActive
                    ? "bg-primary border-primary shadow-[0_20px_40px_-10px_rgba(6,75,255,0.35)]"
                    : "bg-[#F8FAFC] border-[#E2E8F0] shadow-[0_1px_3px_rgba(8,13,38,0.02)] hover:border-primary/40"
                }`}
              >
                <div>
                  {/* Top Row: Upper numbers removed; Clean Icon on Top Right */}
                  <div className="flex items-center justify-end mb-5">
                    <Icon
                      className={`w-5 h-5 stroke-[1.8] transition-colors duration-200 ${
                        isActive ? "text-white" : "text-navy"
                      }`}
                    />
                  </div>

                  {/* Role Title & Subtitle */}
                  <h3
                    className={`text-xl sm:text-[22px] font-bold tracking-tight mb-1 transition-colors duration-200 ${
                      isActive ? "text-white" : "text-navy"
                    }`}
                  >
                    {portal.role}
                  </h3>
                  <p
                    className={`text-xs sm:text-[13px] font-medium mb-5 transition-colors duration-200 ${
                      isActive ? "text-white/80" : "text-secondary"
                    }`}
                  >
                    {portal.subtitle}
                  </p>

                  {/* Three Feature Rows with Thin Horizontal Dividers */}
                  <div className="w-full">
                    <div
                      className={`h-[1px] w-full transition-colors duration-200 ${
                        isActive ? "bg-white/20" : "bg-[#E0E6EF]"
                      }`}
                    />
                    {portal.features.map((feat, fIdx) => (
                      <div key={fIdx}>
                        <div className="py-2.5 sm:py-3">
                          <p
                            className={`text-sm font-medium transition-colors duration-200 ${
                              isActive ? "text-white" : "text-navy"
                            }`}
                          >
                            {feat}
                          </p>
                        </div>
                        <div
                          className={`h-[1px] w-full transition-colors duration-200 ${
                            isActive ? "bg-white/20" : "bg-[#E0E6EF]"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Row: Large Outlined Number on Left, Small Circular Arrow on Right */}
                <div className="flex items-end justify-between pt-5 mt-3">
                  {/* Large outlined number: Turns deep black (#000000) at the exact same time when card is touched/active */}
                  <div className="select-none flex items-baseline">
                    <svg
                      className="h-12 w-20 overflow-visible"
                      viewBox="0 0 60 40"
                      fill="none"
                    >
                      <text
                        x="0"
                        y="34"
                        fill="none"
                        stroke={isActive ? "#000000" : "#CBD5E1"}
                        strokeWidth="2"
                        className="font-bold text-4xl sm:text-[40px] tracking-tight transition-colors duration-200"
                        style={{ fontFamily: "inherit" }}
                      >
                        {portal.number}
                      </text>
                    </svg>
                  </div>

                  {/* Small Circular Arrow Button: Rotates 45deg on active/hover */}
                  <motion.button
                    type="button"
                    animate={{ rotate: isActive ? 45 : 0 }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCard(idx);
                      handleRoleClick(portal.roleParam);
                    }}
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "border-white text-white bg-white/10"
                        : "border-[#080D26]/30 text-navy hover:border-primary hover:text-primary"
                    }`}
                    title={`Select ${portal.role} and request demo`}
                    aria-label={`Select ${portal.role} and request demo`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Row: Left Text, Right Link */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8 pt-4 text-sm"
        >
          <p className="text-secondary font-medium text-center sm:text-left">
            Built around people. Connected by Edubot.
          </p>

          <a
            href="#benefits"
            onClick={handleScrollToBenefits}
            className="inline-flex items-center text-primary font-semibold hover:text-primary-hover group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded cursor-pointer"
          >
            <span>Explore the benefits</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
