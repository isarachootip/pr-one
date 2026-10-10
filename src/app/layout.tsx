import type { Metadata } from "next";
import "./globals.css";
import { LangProvider } from "@/components/LangProvider";
import { asset, favicon } from "@/data/site";

export const metadata: Metadata = {
  title: "PR One — Event & PR Agency, Bangkok",
  description:
    "PR One plans and runs seminars, summits, launches, exhibitions and PR for brands across Thailand — trusted by the world’s leading IT and software companies since 2004.",
  icons: { icon: asset(favicon), apple: asset("apple-touch-icon.png") },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;600;700&family=Noto+Sans+Arabic:wght@400;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
