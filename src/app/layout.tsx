import type { Metadata } from "next";

import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Menu from "@/components/Menu";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "Site Arch",
  description: "Next.js project with GSAP and Lenis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/kvb0uhi.css" />
      </head>
      <body>
        <PageTransition>
          <SmoothScroll>
            <Menu />
            <CustomCursor />
            {children}
          </SmoothScroll>
        </PageTransition>
        <div className="siteNoise" aria-hidden="true" />
      </body>
    </html>
  );
}
