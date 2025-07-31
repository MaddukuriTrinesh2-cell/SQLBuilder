import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-code',
});

export const metadata: Metadata = {
  title: "PromptQL",
  description: "An intuitive, lightweight interface for your database.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" className={`${jetbrainsMono.variable} font-sans`}><body className="bg-background text-text-primary">{children}</body></html>;
}