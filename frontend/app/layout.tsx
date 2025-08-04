import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const firaCode = Fira_Code({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: '--font-fira-code'
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
      <body className={`${inter.variable} ${firaCode.variable} font-sans`}>{children}</body>
    </html>
  );
}
