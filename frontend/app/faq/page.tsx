'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: "What is PromptQL?",
    answer: "PromptQL is a tool that allows you to build SQL queries using natural language."
  },
  {
    question: "How do I connect to my database?",
    answer: "You can connect to your database by clicking the 'Connect Database' button in the header and providing your database credentials."
  },
  {
    question: "What databases are supported?",
    answer: "PromptQL supports a wide range of databases, including PostgreSQL, MySQL, and SQLite."
  },
  {
    question: "Is my data secure?",
    answer: "Yes, your data is secure. PromptQL does not store your database credentials."
  },
  {
    question: "How do I use the AI-powered query generation?",
    answer: "Simply type your query in plain English in the prompt input and our AI will translate it into a precise SQL query in seconds."
  },
  {
    question: "How does PromptQL handle sensitive data?",
    answer: "We prioritize your data's security. PromptQL only sends your database schema (table and column names) to the LLM, never your actual data. You have full control over which tables and columns are exposed, allowing you to hide sensitive information. Your database credentials are never stored."
  }
];

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h1>
        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border py-6">
              <button
                className="w-full flex justify-between items-center text-left text-xl font-semibold"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown className={`transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="mt-4 text-gray-600">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FAQPage;
