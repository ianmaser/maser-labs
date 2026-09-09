import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import PostHogProvider from "@/components/PostHogProvider";
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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://maserlabs.ai",
  ),
  title: "Maser Labs | Custom Software, AI Automation & Web Services",
  description:
    "Custom software, AI automation, and web services, engineered for the modern era. Built by a senior engineer from Citibank & Verizon.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maser Labs | Build for what's next.",
    description:
      "Custom software, AI automation, and web services engineered for the modern era.",
    url: "/",
    siteName: "Maser Labs",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Maser Labs — Custom Software, AI Automation & Web Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Maser Labs | Build for what's next.",
    description:
      "Custom software, AI automation, and web services engineered for the modern era.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
      <body>
        <PostHogProvider>{children}</PostHogProvider>
      </body>
    </html>
  );
}
