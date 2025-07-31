'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-background text-text-primary text-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="flex flex-col items-center"
      >
        <h1 className="text-7xl font-bold text-text-primary tracking-tighter">
          PromptQL
        </h1>
        <p className="mt-4 text-lg text-text-secondary max-w-xl">
          The intuitive, lightweight interface for your database.
        </p>
        <Link
          href="/query"
          className="mt-10 inline-flex items-center justify-center px-6 py-3 font-medium text-black bg-accent rounded-lg shadow-lg hover:bg-accent-hover transition-colors"
        >
          Launch App
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </motion.div>
      <footer className="absolute bottom-8 text-sm text-border">
        Built with Next.js, FastAPI, and Tailwind CSS.
      </footer>
    </main>
  );
}