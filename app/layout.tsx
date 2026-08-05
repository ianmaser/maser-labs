import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Maser Labs | Custom Software, AI Automation & Web Services",
  description:
    "Custom software, AI automation, and web services, engineered for the modern era. Built by a senior engineer from Citibank & Verizon.",
  openGraph: {
    title: "Maser Labs | Build for what's next.",
    description:
      "Custom software, AI automation, and web services engineered for the modern era.",
    url: "https://maserlabs.ai",
    siteName: "Maser Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maser Labs | Build for what's next.",
    description:
      "Custom software, AI automation, and web services engineered for the modern era.",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
