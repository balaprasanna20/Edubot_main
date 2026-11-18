"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { DemoIntroduction, DemoRequestForm } from "./demo";

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function DemoSection() {
  return (
    <section
      id="request-demo"
      className="relative w-full bg-[#E5F1FD] lg:bg-[linear-gradient(to_right,white_46.4%,#E5F1FD_46.4%)] scroll-mt-[72px] overflow-hidden"
      aria-label="Request a Demo"
    >
      {/* 46.4% Left (White) / 53.6% Right (Pale Blue) Composition matching reference */}
      <div className="w-full">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row items-stretch">
            {/* Left Introduction Column (46.4% width on desktop) */}
            <motion.div
              variants={fadeInUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              className="w-full lg:w-[46.4%] bg-white lg:bg-transparent flex flex-col justify-between py-12 md:py-16 lg:py-20 lg:pr-8 z-10"
            >
              <DemoIntroduction />
            </motion.div>

            {/* Right Form Column (53.6% width on desktop with Pale Blue background) */}
            <div className="w-full lg:w-[53.6%] bg-[#E5F1FD] lg:bg-transparent flex items-center justify-center lg:justify-end py-10 md:py-14 lg:py-16 lg:pl-8">
              <motion.div
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                className="w-full max-w-[560px] bg-white rounded-[26px] sm:rounded-[30px] border border-[#DCE8F8] shadow-[0_12px_40px_rgba(8,13,38,0.06)] p-6 sm:p-7 lg:p-8"
              >
                <DemoRequestForm />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
