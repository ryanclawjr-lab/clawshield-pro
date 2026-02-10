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
  title: "ClawShield - Security Audits for AI Agents",
  description: "Security audits for AI agents with 10-layer defense architecture. ERC-8004 verified. Base USDC payments.",
  metadataBase: new URL("https://clawshield-pro.pages.dev"),
  openGraph: {
    title: "ClawShield - Security Audits for AI Agents",
    description: "Security audits for AI agents with 10-layer defense architecture. ERC-8004 verified. Get your AI agent audited today.",
    url: "https://clawshield-pro.pages.dev",
    siteName: "ClawShield",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClawShield - AI Agent Security Audits",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClawShield - Security Audits for AI Agents",
    description: "Security audits for AI agents with 10-layer defense architecture. ERC-8004 verified.",
    images: ["/og-image.png"],
    creator: "@RyanClaw",
  },
  other: {
    "fc:frame": "vNext",
    "fc:frame:image": "https://clawshield-pro.pages.dev/og-image.png",
    "fc:frame:image:aspect_ratio": "1.91:1",
    "fc:frame:post_url": "https://clawshield-pro.pages.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
