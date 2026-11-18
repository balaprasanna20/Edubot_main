"use client";

import React from "react";
import Image from "next/image";
import { scrollToSection } from "@/lib/scroll";
import { motion, type Variants } from "framer-motion";
import {
  Users,
  MapPin,
  CalendarCheck,
  ListChecks,
  FileText,
  BarChart3,
  ArrowRight,
} from "lucide-react";

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

const featureList: FeatureCardProps[] = [
  {
    icon: Users,
    title: "Centralised records",
    description: "Manage students, mentors, courses and batches in one place.",
  },
  {
    icon: MapPin,
    title: "GPS-verified attendance",
    description: "Validate campus check-ins within your institution’s geofence.",
  },
  {
    icon: CalendarCheck,
    title: "Leave management",
    description: "Apply for leave and track approvals online.",
  },
  {
    icon: ListChecks,
    title: "Teaching & tasks",
    description: "Plan lessons, assign tasks and review submissions.",
  },
  {
    icon: FileText,
    title: "Study materials",
    description: "Share learning resources with optional download restrictions.",
  },
  {
    icon: BarChart3,
    title: "Student progress",
    description: "View tasks, grades and learning progress together.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function FeaturesSection() {
  const handleScrollToPortals = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection("user-portals");
  };

  return (
    <section id="features" className="relative w-full bg-[#F8FAFD] py-16 md:py-20 lg:py-24 scroll-mt-[72px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header: Centered in the middle with inline Edubot 'e' logo */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          {/* Eyebrow - 12px to heading */}
          <span className="text-xs sm:text-[13px] font-bold text-primary tracking-wider uppercase mb-3 block">
            FEATURES
          </span>

          {/* Heading - 16px to description */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-navy tracking-tight leading-tight mb-4">
            <span className="sr-only">Campus essentials. All in one place.</span>
            <span aria-hidden="true">
              Campus{" "}
              <span className="inline-flex items-baseline">
                <span className="relative inline-block w-[0.82em] h-[0.82em] align-middle mx-[1px] -mt-[0.08em] flex-shrink-0">
                  <Image
                    src="/images/edubot-icon.png"
                    alt=""
                    width={40}
                    height={40}
                    priority
                    className="w-full h-full object-contain"
                  />
                </span>
                ssentials.
              </span>{" "}
              All in one place.
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-secondary">
            Simple tools for administration, teaching and learning.
          </p>
        </motion.div>

        {/* 6 Feature Cards Grid with Staggered Entrance and Micro-Lift Physics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6"
        >
          {featureList.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -2,
                  borderColor: "#CBD5E1",
                  boxShadow:
                    "0 8px 20px -6px rgba(6, 75, 255, 0.06), 0 4px 8px -4px rgba(8, 13, 38, 0.02)",
                  transition: { duration: 0.18, ease: "easeOut" },
                }}
                className="group bg-white border border-[#E0E6EF] rounded-2xl p-5 sm:p-6 lg:p-7 flex flex-col justify-start transition-colors shadow-[0_1px_3px_rgba(8,13,38,0.02)]"
              >
                {/* Light Blue Rounded Icon Badge */}
                <div
                  className="w-11 h-11 rounded-xl bg-[#EFF5FF] text-primary flex items-center justify-center mb-4 flex-shrink-0 transition-colors group-hover:bg-[#E0ECFF]"
                >
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>

                {/* Card Title */}
                <h3 className="text-lg sm:text-[19px] font-bold text-navy mb-2 tracking-tight group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                {/* Card Description */}
                <p className="text-sm sm:text-[15px] text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Link: Explore user portals -> with Interactive Arrow Spring */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mt-6 sm:mt-8"
        >
          <a
            href="#user-portals"
            onClick={handleScrollToPortals}
            className="inline-flex items-center text-primary font-semibold text-sm sm:text-base group transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded cursor-pointer"
          >
            <span>Explore user portals</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
