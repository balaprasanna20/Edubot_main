import React from "react";
import Navbar from "@/components/Navbar";
import OverviewSection from "@/components/OverviewSection";
import FeaturesSection from "@/components/FeaturesSection";
import UserPortalsSection from "@/components/UserPortalsSection";
import BenefitsSection from "@/components/BenefitsSection";
import DemoSection from "@/components/DemoSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation bar in normal document flow */}
      <Navbar />

      {/* Main Content: Complete 5 sections in approved order */}
      <main className="flex-1 flex flex-col">
        <OverviewSection />
        <FeaturesSection />
        <UserPortalsSection />
        <BenefitsSection />
        <DemoSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
