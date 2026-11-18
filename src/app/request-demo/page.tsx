import React from "react";
import Navbar from "@/components/Navbar";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Request a Demo | Edubot",
  description:
    "Request your personalised demo of Edubot — Education Management System for Schools, Colleges and Universities.",
};

export default function RequestDemoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation bar with solid blue Request a Demo button and clean white background */}
      <Navbar forcedActive="none" forcedButtonStyle="solid" />

      {/* Main Request a Demo Content */}
      <main className="flex-1 flex flex-col justify-center">
        <DemoSection />
      </main>

      {/* Footer matching approved visual direction */}
      <Footer />
    </div>
  );
}

