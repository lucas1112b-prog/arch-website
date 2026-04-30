import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Site Arch",
  description: "Next.js project with GSAP and Lenis",
};

import Menu from "@/components/Menu";
import PageTransition from "@/components/PageTransition";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <PageTransition>
          <SmoothScroll>
            <Menu />
            {children}
          </SmoothScroll>
        </PageTransition>
      </body>
    </html>
  );
}
