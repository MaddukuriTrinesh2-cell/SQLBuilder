'use client';

import { Database, Table, Columns, ChevronRight } from 'lucide-react';
import { Schema } from '../lib/types';

interface SchemaExplorerProps {
  schema: Schema | null;
  dbName: string | null;
  onSelectionChange: (schema: Schema | null) => void;
  onSchemaUpdate: (schema: Schema) => void;
}

export default function SchemaExplorer({ schema, dbName, onSelectionChange, onSchemaUpdate }: SchemaExplorerProps) {

  const handleTableToggle = (tableName: string) => {
    if (!schema) return;
    const newSchema = {
      ...schema,
      tables: schema.tables.map(t =>
        t.name === tableName ? { ...t, expanded: !t.expanded } : t
      ),
    };
    onSchemaUpdate(newSchema);
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
    onSchemaUpdate(newSchema);
    onSelectionChange(newSchema);
  };

  return (
    <div className="bg-panel border border-border rounded-xl h-full overflow-y-auto p-4">
      <h2 className="text-base font-semibold mb-4 flex items-center text-foreground">
        <Database className="mr-2 h-4 w-4 text-primary" /> 
        {dbName || 'Database Schema'}
      </h2>
      {!schema && <p className="text-sm text-gray-500 font-sans">Not connected. Please connect to a database.</p>}
      {schema && (
        <ul className="space-y-1">
          {schema.tables.map((table) => (
            <li key={table.name}>
              <div className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-secondary transition-colors" onClick={() => handleTableToggle(table.name)}>
                <ChevronRight className={`w-4 h-4 mr-2 text-gray-400 transition-transform ${table.expanded ? 'rotate-90' : ''}`} />
                <Table className="w-4 h-4 mr-2 text-accent" />
                <span className="font-medium text-sm text-foreground">{table.name}</span>
              </div>
              {table.expanded && (
                <ul className="ml-5 mt-1 border-l-2 border-border pl-4 space-y-1 py-1 font-sans">
                  {table.columns.map((column) => (
                    <li key={column.name} className="text-sm flex items-center p-1">
                      <input
                        type="checkbox"
                        checked={!!column.checked}
                        onChange={() => handleColumnCheck(table.name, column.name)}
                        className="mr-3 h-4 w-4 bg-secondary border-border rounded-md text-primary focus:ring-primary focus:ring-offset-panel"
                      />
                      <Columns className="w-4 h-4 mr-2 text-gray-400" />
                      <span className="text-gray-300">{column.name}</span>
                      <span className="text-gray-500 ml-auto text-xs">({column.type})</span>
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
