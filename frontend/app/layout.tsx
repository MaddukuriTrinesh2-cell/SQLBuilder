import type { Metadata } from "next";
import { Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const shareTechMono = Share_Tech_Mono({ 
  subsets: ["latin"], 
  weight: ["400"],
  variable: '--font-share-tech-mono'
});

export const metadata: Metadata = {
  title: "SQLBuilder - The Modern Database Interface",
  description: "Connect to your database, get the schema, and start generating SQL queries with natural language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${shareTechMono.variable} font-mono`}>{children}</body>
    </html>
  );
}
