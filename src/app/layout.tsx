import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 title: {
    default: "PennyPilot — Smart Personal Finance & Budgeting",
    template: "%s | PennyPilot", 
  },
  description: "Take control of your monthly spending limits, analyze expenses with dynamic charts, and optimize your savings with your personal AI Spending Coach.",

  icons: {
    icon: [
      {
        url: "/light-logo/light-logo-2.svg", 
        type: "image/svg+xml",
      }
    ],
    apple: [
      {
        url: "/light-logo/light-logo-2.svg",
      }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-background">
        <Navbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
