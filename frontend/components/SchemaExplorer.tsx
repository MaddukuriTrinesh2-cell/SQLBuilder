'use client';

import { useEffect, useState } from 'react';
import { Database, Table, Columns, ChevronRight, ChevronDown } from 'lucide-react';
import { Schema } from '../lib/types';

interface SchemaExplorerProps {
  onSelectionChange: (schema: Schema | null) => void;
}

export default function SchemaExplorer({ onSelectionChange }: SchemaExplorerProps) {
  const [schema, setSchema] = useState<Schema | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        if (!apiBaseUrl) throw new Error("API base URL is not configured.");

        const apiUrl = `${apiBaseUrl}/api/schema`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error('Failed to fetch schema from the backend.');
        }
        const data: Schema = await res.json();
        if (data.error) {
          throw new Error(`Backend error: ${data.error}`);
        }
        // Initialize UI state properties
        const initializedSchema: Schema = {
          ...data,
          tables: data.tables.map(table => ({
            ...table,
            expanded: false,
            columns: table.columns.map(col => ({ ...col, checked: false }))
          }))
        };
        setSchema(initializedSchema);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    };
    fetchSchema();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleTableToggle = (tableName: string) => {
    if (!schema) return;
    const newSchema = {
      ...schema,
      tables: schema.tables.map(t =>
        t.name === tableName ? { ...t, expanded: !t.expanded } : t
      ),
    };
    setSchema(newSchema);
  };

  const handleColumnCheck = (tableName: string, columnName: string) => {
    if (!schema) return;
    const newSchema = {
      ...schema,
      tables: schema.tables.map(t =>
        t.name === tableName
          ? { ...t, columns: t.columns.map(c => c.name === columnName ? { ...c, checked: !c.checked } : c) }
          : t
      ),
    };
    setSchema(newSchema);
    onSelectionChange(newSchema); // Notify parent component of the change
  };

  return (
    <div className="bg-panel border border-border rounded-xl h-full overflow-y-auto p-4">
      <h2 className="text-base font-semibold mb-4 flex items-center text-text-primary"><Database className="mr-2 h-4 w-4" /> Database Schema</h2>
      {error && <p className="text-red-400">{error}</p>}
      {!schema && !error && <p>Loading schema...</p>}
      {schema && (
        <ul className="space-y-1">
          {schema.tables.map((table) => (
            <li key={table.name}>
              <div className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors" onClick={() => handleTableToggle(table.name)}>
                <ChevronRight className={`w-4 h-4 mr-2 text-text-secondary transition-transform ${table.expanded ? 'rotate-90' : ''}`} />
                <Table className="w-4 h-4 mr-2 text-accent" />
                <span className="font-medium text-sm text-text-primary">{table.name}</span>
              </div>
              {table.expanded && (
                <ul className="ml-5 mt-1 border-l-2 border-border pl-4 space-y-1 py-1">
                  {table.columns.map((column) => (
                    <li key={column.name} className="text-sm flex items-center p-1">
                      <input
                        type="checkbox"
                        checked={!!column.checked}
                        onChange={() => handleColumnCheck(table.name, column.name)}
                        className="mr-3 h-4 w-4 bg-panel border-border rounded-md text-accent focus:ring-accent focus:ring-offset-panel"
                      />
                      <Columns className="w-4 h-4 mr-2 text-text-secondary" />
                      <span className="text-text-secondary">{column.name}</span>
                      <span className="text-text-secondary/50 ml-auto text-xs">({column.type})</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}