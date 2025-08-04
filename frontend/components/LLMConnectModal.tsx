'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface LLMConnectModalProps {
  onClose: () => void;
  onConnect: (details: { apiKey: string; model: string; apiBaseUrl: string }) => void;
  error: string | null;
  isLoading: boolean;
}

export default function LLMConnectModal({ onClose, onConnect, error, isLoading }: LLMConnectModalProps) {
  const [details, setDetails] = useState({ apiKey: '', model: '', apiBaseUrl: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(details);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center font-sans">
      <div className="bg-panel border border-border rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <div className="p-8">
          <h2 className="text-xl font-semibold text-black mb-6">Connect to LLM</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="password" name="apiKey" placeholder="Enter your API Key" value={details.apiKey} onChange={handleChange} className="w-full p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
            <input type="text" name="model" placeholder="Model (e.g., gpt-4)" value={details.model} onChange={handleChange} className="w-full p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
            <input type="text" name="apiBaseUrl" placeholder="API Base URL (optional)" value={details.apiBaseUrl} onChange={handleChange} className="w-full p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
            {error && <p className="text-sm text-red-400">Error: {error}</p>}
            <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Key
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}