'use client';

import { useState, useCallback } from 'react';
import SchemaExplorer from '../../components/SchemaExplorer';
import SQLOutput from '../../components/SQLOutput';
import Header from '../../components/Header';
import PromptInput from '../../components/PromptInput';
import LLMConnectModal from '../../components/LLMConnectModal';
import { Schema } from '../../lib/types';

const EXAMPLE_PROMPT = 'Show me all employees in the Engineering department';
const SAMPLE_SCHEMA: Schema = {
  tables: [
    { name: 'employees', columns: [{ name: 'id', type: 'INTEGER' }, { name: 'name', type: 'TEXT' }, { name: 'department_id', type: 'INTEGER' }, { name: 'salary', type: 'INTEGER' }], expanded: false },
    { name: 'departments', columns: [{ name: 'id', type: 'INTEGER' }, { name: 'name', type: 'TEXT' }], expanded: false },
    { name: 'salaries', columns: [{ name: 'id', type: 'INTEGER' }, { name: 'employee_id', type: 'INTEGER' }, { name: 'amount', type: 'INTEGER' }, { name: 'date', type: 'TEXT' }], expanded: false },
  ]
};

export default function QueryPage() {
  const [schema, setSchema] = useState<Schema | null>(SAMPLE_SCHEMA);
  const [dbName, setDbName] = useState<string | null>("sample_db");
  const [sqlQuery, setSqlQuery] = useState(`-- Connect to a database to get started, or try our sample schema!

-- Example prompt: ${EXAMPLE_PROMPT}`);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [isLLMModalOpen, setIsLLMModalOpen] = useState(false);
  const [llmError, setLlmError] = useState<string | null>(null);
  const [isConnectingLLM, setIsConnectingLLM] = useState(false);

  const handleConnect = async (details: any) => {
    setIsConnecting(true);
    setConnectionError(null);
    try {
      const response = await fetch('http://localhost:8000/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(details),
      });
      const data = await response.json();
      if (response.ok && data.schema) {
        const initializedSchema: Schema = {
          ...data.schema,
          tables: data.schema.tables.map((table: any) => ({
            ...table,
            expanded: false,
            columns: table.columns.map((col: any) => ({ ...col, checked: false }))
          }))
        };
        setSchema(initializedSchema);
        setDbName(details.database);
        setSqlQuery(`-- Schema loaded. Try this sample prompt: "${EXAMPLE_PROMPT}"`);
      } else {
        throw new Error(data.message || 'Failed to connect to the database.');
      }
    } catch (error: any) {
      setConnectionError(error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const handlePromptSubmit = async (prompt: string) => {
    if (!schema) {
      setSqlQuery('-- Please connect to a database first.');
      return;
    }

    if (prompt.toLowerCase() !== EXAMPLE_PROMPT.toLowerCase() && !localStorage.getItem('llm_api_key')) {
      setSqlQuery('-- No query generated. Try connecting to an LLM.');
      setIsLLMModalOpen(true);
      return;
    }

    setIsLoading(true);
    if (prompt.toLowerCase() === EXAMPLE_PROMPT.toLowerCase()) {
      setSqlQuery("SELECT T1.name, T1.salary FROM employees AS T1 JOIN departments AS T2 ON T1.department_id = T2.id WHERE T2.name = 'Engineering'");
      setIsLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:8000/api/generate-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, schema }),
      });
      const data = await response.json();
      if (response.ok) {
        setSqlQuery(data.sql);
      } else {
        throw new Error(data.detail || 'Failed to generate SQL.');
      }
    } catch (error: any) {
      setSqlQuery(`-- Error: ${error.message}`)
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptChange = (prompt: string) => {
    if (prompt === '') {
      setSqlQuery('');
    }
  };

  const handleSchemaUpdate = (updatedSchema: Schema) => {
    setSchema(updatedSchema);
  };
  
  const handleLLMConnect = async (apiKey: string) => {
    setIsConnectingLLM(true);
    setLlmError(null);
    if (apiKey) {
      localStorage.setItem('llm_api_key', apiKey);
      setIsLLMModalOpen(false);
    } else {
      setLlmError("API key cannot be empty.");
    }
    setIsConnectingLLM(false);
  };

  return (
    <div className="flex flex-col h-screen bg-background font-mono">
      <Header onConnect={handleConnect} connectionError={connectionError} isConnecting={isConnecting} />
      <main className="flex flex-grow gap-6 p-6 pt-20 overflow-hidden">
        <div className="w-1/4 flex flex-col gap-4 min-h-0">
          <SchemaExplorer 
            schema={schema} 
            dbName={dbName}
            onSelectionChange={handleSchemaUpdate} 
            onSchemaUpdate={handleSchemaUpdate} 
          />
        </div>
        <div className="w-3/4 flex flex-col gap-4 min-h-0">
          <PromptInput onSubmit={handlePromptSubmit} isLoading={isLoading} onPromptChange={handlePromptChange} />
          <SQLOutput sql={sqlQuery} onSqlChange={setSqlQuery} />
        </div>
      </main>
      {isLLMModalOpen &&
        <LLMConnectModal
          onClose={() => setIsLLMModalOpen(false)}
          onConnect={handleLLMConnect}
          error={llmError}
          isLoading={isConnectingLLM}
        />
      }
    </div>
  );
}