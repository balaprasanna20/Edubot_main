import React from "react";
import Navbar from "@/components/Navbar";
import UserPortalsSection from "@/components/UserPortalsSection";
import Footer from "@/components/Footer";

export const metadata = {
  title: "User Portals — Edubot Education Management System",
  description:
    "Different roles. One connected campus. A dedicated workspace for everyone who runs, teaches and learns.",
};

export default function UserPortalsPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Shared navbar with User Portals active and solid blue Request a Demo button */}
      <Navbar forcedActive="user-portals" forcedButtonStyle="solid" />

      {/* Main User Portals Content */}
      <main className="flex-1 flex flex-col justify-center">
        <UserPortalsSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
