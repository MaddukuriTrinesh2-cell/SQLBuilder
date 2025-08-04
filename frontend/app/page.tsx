'use client';

import Link from 'next/link';
import { ArrowRight, Database, Zap, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../components/Header';

export default function Home() {
  const featureVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const featureItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col min-h-screen text-foreground">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <motion.section
          className="text-center py-12 md:py-16 bg-gradient-to-br from-orange-500/10 via-background to-background"
          initial={{ backgroundSize: '200% 200%' }}
          animate={{ backgroundSize: '100% 100%' }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600 leading-tight py-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Build SQL Queries, Faster.
            </motion.h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-sans">
              Connect to your database, explore the schema, and generate complex SQL queries using natural language. The future of database interaction is here.
            </p>
            <div className="mt-10 flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/query"
                  className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-transform transform hover:scale-105 shadow-lg"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Why You'll Love It</h2>
              <p className="text-gray-600 mt-4 font-sans">A better workflow for you and your team.</p>
            </div>
            <motion.div
              className="grid md:grid-cols-3 gap-12 text-center"
              variants={featureVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={featureItemVariants} whileHover={{ y: -5 }} className="p-8 border border-white/20 rounded-xl bg-background/80 backdrop-blur-lg shadow-lg">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/10 mx-auto mb-6">
                  <Database className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-semibold">Visual Schema Explorer</h3>
                <p className="text-gray-600 mt-4 font-sans">
                  Navigate your database schema with an intuitive and interactive interface. Understand table relationships at a glance.
                </p>
              </motion.div>
              <motion.div variants={featureItemVariants} whileHover={{ y: -5 }} className="p-8 border border-white/20 rounded-xl bg-background/80 backdrop-blur-lg shadow-lg">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/10 mx-auto mb-6">
                  <Zap className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-semibold">AI-Powered Query Generation</h3>
                <p className="text-gray-600 mt-4 font-sans">
                  Just describe the data you need in plain English. Our AI will translate it into a precise SQL query in seconds.
                </p>
              </motion.div>
              <motion.div variants={featureItemVariants} whileHover={{ y: -5 }} className="p-8 border border-white/20 rounded-xl bg-background/80 backdrop-blur-lg shadow-lg">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-500/10 mx-auto mb-6">
                  <Code className="h-8 w-8 text-orange-500" />
                </div>
                <h3 className="text-2xl font-semibold">Developer-Friendly</h3>
                <p className="text-gray-600 mt-4 font-sans">
                  Export queries, connect to multiple database types, and enjoy a workflow designed for modern development teams.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Security Section */}
        <section className="py-8 md:py-12 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Security First</h2>
              <p className="text-gray-600 mt-4 font-sans">Your data privacy is our top priority.</p>
            </div>
            <div className="max-w-3xl mx-auto text-left border border-white/20 rounded-xl bg-background/80 backdrop-blur-lg p-8 shadow-lg">
              <h3 className="text-2xl font-semibold">How we protect your data</h3>
              <p className="text-gray-600 mt-4 font-sans">
                We understand that connecting your database to an LLM raises security concerns. Here's how we address them:
              </p>
              <ul className="list-disc list-inside text-gray-600 mt-4 font-sans space-y-2">
                <li>
                  <span className="font-semibold">We only send schema, not data:</span> When you connect your database, we only send the table and column names (the schema) to the LLM. We never send your actual data.
                </li>
                <li>
                  <span className="font-semibold">You have full control:</span> You can choose which tables and columns are exposed to the LLM. This allows you to hide sensitive information.
                </li>
                <li>
                  <span className="font-semibold">Your credentials are safe:</span> We never store your database credentials. They are only used to connect to your database and are discarded immediately after.
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 text-center text-sm text-gray-500 border-t border-border font-sans">
        VIbe Coding @cognizant
      </footer>
    </div>
  );
}
