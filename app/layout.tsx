import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CommonCollegeData",
  description: "Search and view college Common Data Set information",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} style={{ backgroundColor: "hsl(var(--background-central))" }}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
