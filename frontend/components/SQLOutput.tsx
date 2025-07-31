'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SQLOutputProps {
  sql: string;
}

export default function SQLOutput({ sql }: SQLOutputProps) {
  return (
    <div className="bg-panel border border-border rounded-xl h-full p-4 flex flex-col">
      <h2 className="text-base font-semibold mb-4 text-text-primary">Generated SQL</h2>
      <div className="flex-grow rounded-lg overflow-hidden">
        <SyntaxHighlighter language="sql" style={atomDark} customStyle={{ background: '#1A1A1A', height: '100%', margin: 0, padding: '1rem' }}>
          {sql}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}