'use client';

import { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface SQLOutputProps {
  sql: string;
  onSqlChange: (sql: string) => void;
}

export default function SQLOutput({ sql, onSqlChange }: SQLOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-panel border border-border rounded-xl h-full flex flex-col">
      <div className="flex justify-between items-center p-3 border-b border-border">
        <h3 className="font-semibold text-sm text-foreground">Generated SQL</h3>
        <button onClick={handleCopy} className="text-sm flex items-center text-gray-400 hover:text-orange-500 disabled:text-gray-500 font-sans" disabled={!sql || sql.startsWith('--')}>
          {copied ? <Check className="h-4 w-4 mr-1 text-green-500" /> : <Clipboard className="h-4 w-4 mr-1" />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="p-4 overflow-auto h-full bg-secondary/20 rounded-b-xl">
        <textarea
          value={sql}
          onChange={(e) => onSqlChange(e.target.value)}
          className="w-full h-full p-2 bg-transparent border-none text-sm text-gray-500 whitespace-pre-wrap font-mono focus:ring-0 resize-none"
        />
      </div>
    </div>
  );
}