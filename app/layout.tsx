import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthLinkListener } from "@/components/auth/AuthLinkListener";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// metadataBase anchors every relative OG/canonical URL declared by a page
// (see app/w/[share_id]/page.tsx) to the stable production origin, so they
// never resolve against a Vercel deployment/preview host - see lib/site.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Coach Zone",
  description:
    "Twórz treningi z biblioteki ćwiczeń, eksportuj je do PDF i udostępniaj swojej drużynie w kilka minut.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthLinkListener />
        {children}
      </body>
    </html>
  );
}
