import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#E0E6EF] py-5 sm:py-6">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <p className="text-secondary font-medium">
          <span className="font-bold text-navy">Edubot</span> by Codework
        </p>
        <p className="text-[#606879]">
          Built for connected institutions.
        </p>
      </div>
    </footer>
  );
}

