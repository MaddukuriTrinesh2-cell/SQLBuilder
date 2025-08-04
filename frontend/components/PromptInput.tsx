'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export default function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onSubmit(prompt);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative font-sans">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a natural language query... e.g., 'Show me all customers from London with more than 3 orders.'"
        className="w-full h-28 p-4 pr-16 bg-panel border border-border rounded-xl text-foreground placeholder-gray-500 focus:ring-2 focus:ring-primary resize-none"
        disabled={isLoading}
      />
      <button 
        type="submit" 
        disabled={isLoading || !prompt.trim()}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-2 bg-primary rounded-full text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
      </button>
    </form>
  );
}