'use client';

import { useState } from 'react';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export default function PromptInput({ onSubmit, isLoading }: PromptInputProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-panel p-4 rounded-lg">
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full h-24 p-2 bg-dark-bg border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g., Show me all employees in the Engineering department" />
      <button type="submit" disabled={isLoading} className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-500">
        {isLoading ? 'Generating...' : 'Generate SQL'}
      </button>
    </form>
  );
}