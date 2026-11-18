"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { Layers, BarChart3, Users, ArrowRight } from "lucide-react";
import { scrollToSection } from "@/lib/scroll";

const cardContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function BenefitsSection() {
  const reduceMotion = useReducedMotion();

  const handleScrollToOverview = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("overview");
  };

  return (
    <section
      id="benefits"
      className="relative w-full bg-[#F8FAFD] py-16 md:py-20 lg:py-24 border-b border-[#E0E6EF] scroll-mt-[72px]"
      aria-label="Why Edubot — Benefits"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header: Centered in the middle of the page with inline Edubot 'e' logo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          {/* Eyebrow - 12px to heading */}
          <span className="text-xs sm:text-[13px] font-bold text-primary tracking-wider uppercase mb-3 block">
            04 / WHY EDUBOT
          </span>

          {/* Heading with inline 'e' logo - 12px to divider rule */}
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] xl:text-[50px] font-bold text-navy tracking-tight leading-[1.1] mb-3">
            <span className="sr-only">One institution. Working better, together.</span>
            <motion.span
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.25 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: "block" }}
            >
              One institution.
              <br />
              Working b
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
              tter,{" "}
              <span className="text-primary inline-flex items-baseline">
                tog
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
                ther.
              </span>
            </motion.span>
          </h2>

          {/* Short Blue Horizontal Rule */}
          <div
            className="w-12 sm:w-14 h-[3px] bg-primary rounded-full mx-auto my-3 sm:my-3.5"
            aria-hidden="true"
          />

          {/* Supporting Paragraph - 16px to link */}
          <p className="text-base sm:text-lg text-[#424B68] leading-relaxed max-w-xl mx-auto mb-4">
            Bring campus operations, teaching and learning into one connected system.
          </p>

          {/* Explore Edubot Link with animated arrow */}
          <motion.a
            href="#overview"
            onClick={handleScrollToOverview}
            whileHover={{ x: 3 }}
            className="inline-flex items-center text-primary font-semibold text-base sm:text-[17px] hover:text-[#0039DE] group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded cursor-pointer"
          >
            <span>Explore Edubot</span>
            <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
          </motion.a>
        </motion.div>

        {/* Centered Campus Illustration Panel - 32px to cards */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="max-w-[720px] mx-auto mb-8"
        >
          <div className="relative w-full aspect-[550/328] rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#EAF1FF] border border-[#B7CAFF]/40 shadow-xs">
            <Image
              src="/images/benefits-campus-illustration.webp"
              alt="Edubot connected campus architectural drawing featuring university courtyard, library, central Edubot sign, and connected workflows: Records, Teaching, Attendance, and Learning."
              fill
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 720px"
              className="object-contain object-center select-none"
            />
          </div>
        </motion.div>

        {/* Bottom Cards Row: Three Distinct High-Impact Benefit Cards */}
        <motion.div
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 items-stretch"
        >
          {/* Card 1: Solid Vivid Blue */}
          <motion.div
            variants={cardItemVariants}
            className="bg-[#064BFF] rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between text-white shadow-sm min-h-[190px] sm:min-h-[200px]"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="text-base sm:text-lg font-bold text-white">
                01
              </span>
              <Layers className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] text-white" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-xl sm:text-[22px] font-bold text-white tracking-tight mb-2 leading-snug">
                Less administrative effort
              </h3>
              <p className="text-sm sm:text-[15px] text-white/90 leading-relaxed">
                Connected records and workflows
                <br className="hidden sm:inline" /> reduce manual follow-ups.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Pale Blue Surface */}
          <motion.div
            variants={cardItemVariants}
            className="bg-[#EAF1FF] rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between shadow-xs min-h-[190px] sm:min-h-[200px] border border-[#D6E4FF]/60"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="text-base sm:text-lg font-bold text-primary">
                02
              </span>
              <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] text-primary" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-xl sm:text-[22px] font-bold text-navy tracking-tight mb-2 leading-snug">
                Better institutional visibility
              </h3>
              <p className="text-sm sm:text-[15px] text-[#424B68] leading-relaxed">
                See attendance, tasks and learning
                <br className="hidden sm:inline" /> progress in one place.
              </p>
            </div>
          </motion.div>

          {/* Card 3: White Surface with Thin Pale-Blue Border */}
          <motion.div
            variants={cardItemVariants}
            className="bg-white rounded-[22px] sm:rounded-[24px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between border border-[#B7CAFF] shadow-xs min-h-[190px] sm:min-h-[200px]"
          >
            <div className="flex items-center justify-between mb-4 sm:mb-5">
              <span className="text-base sm:text-lg font-bold text-primary">
                03
              </span>
              <Users className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8] text-primary" aria-hidden="true" />
            </div>

            <div>
              <h3 className="text-xl sm:text-[22px] font-bold text-navy tracking-tight mb-2 leading-snug">
                More consistent coordination
              </h3>
              <p className="text-sm sm:text-[15px] text-[#424B68] leading-relaxed">
                Keep campus teams aligned through
                <br className="hidden sm:inline" /> shared information and notices.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
