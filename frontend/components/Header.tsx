'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Database, Bot } from 'lucide-react';
import ConnectModal from './ConnectModal';
import LLMConnectModal from './LLMConnectModal';

interface HeaderProps {
  onConnect?: (details: any) => void;
  connectionError?: string | null;
  isConnecting?: boolean;
}

export default function Header({ onConnect, connectionError, isConnecting }: HeaderProps) {
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [isLLMModalOpen, setIsLLMModalOpen] = useState(false);
  const [llmError, setLlmError] = useState<string | null>(null);
  const [isConnectingLLM, setIsConnectingLLM] = useState(false);

  const handleLLMConnect = async (apiKey: string) => {
    setIsConnectingLLM(true);
    setLlmError(null);
    if (apiKey) {
      // In a real app, you'd send this to your backend to be stored securely
      console.log("LLM API Key saved.");
      localStorage.setItem('llm_api_key', apiKey);
      setIsLLMModalOpen(false);
    } else {
      setLlmError("API key cannot be empty.");
    }
    setIsConnectingLLM(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex items-center justify-between h-16 px-6">
          <Link href="/" className="flex items-center space-x-2">
            <Database className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold tracking-tighter text-foreground">PromptQL</span>
          </Link>
          <div className="flex items-center space-x-4">
            {onConnect ? (
              <>
                <button onClick={() => setIsLLMModalOpen(true)} className="flex items-center text-sm font-medium text-black hover:text-orange-600 transition-colors">
                  <Bot className="mr-2 h-4 w-4"/>
                  Connect LLM
                </button>
                <button onClick={() => setIsConnectModalOpen(true)} className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-orange-500 rounded-md hover:bg-orange-600 transition-colors">
                  Connect Database
                </button>
              </>
            ) : (
              <>
                <Link href="/faq" className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-black bg-orange-500 rounded-md hover:bg-orange-600 transition-colors">
                  Frequently Asked Questions?
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      {isConnectModalOpen && onConnect &&
        <ConnectModal 
          onClose={() => setIsConnectModalOpen(false)} 
          onConnect={onConnect} 
          error={connectionError || null}
          isLoading={isConnecting || false}
        />
      }
      {isLLMModalOpen &&
        <LLMConnectModal
          onClose={() => setIsLLMModalOpen(false)}
          onConnect={handleLLMConnect}
          error={llmError}
          isLoading={isConnectingLLM}
        />
      }
    </>
  );
}
