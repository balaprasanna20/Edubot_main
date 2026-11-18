import type { Metadata } from "next";
import { Anton, Inter, Lora } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Edubot | Education Management for Connected Campuses",
  description:
    "Bring campus administration, teaching and student learning together with Edubot, the education management platform for schools, colleges and universities.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/images/edubot-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${anton.variable}`}>
      <body className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-primary selection:text-white">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
