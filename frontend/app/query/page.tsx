'use client';

import { useState, useCallback } from 'react';
import SchemaExplorer from '../../components/SchemaExplorer';
import SQLOutput from '../../components/SQLOutput';
import Header from '../../components/Header';
import { Schema } from '../../lib/types';

function generateSqlFromSchema(schema: Schema | null): string {
  if (!schema) {
    return '-- Select tables and columns to generate SQL.';
  }

  const selectedColumns: string[] = [];
  const selectedTables = new Set<string>();

  schema.tables.forEach(table => {
    table.columns.forEach(column => {
      if (column.checked) {
        selectedColumns.push(`${table.name}.${column.name}`);
        selectedTables.add(table.name);
      }
    });
  });

  if (selectedColumns.length === 0) {
    return '-- Select columns to generate SQL.';
  }

  const fromClause = Array.from(selectedTables).join(', ');
  const selectClause = selectedColumns.join(',\n  ');

  return `SELECT\n  ${selectClause}\nFROM\n  ${fromClause};`;
}

export default function QueryPage() {
  const [sqlQuery, setSqlQuery] = useState('-- Select columns from the schema to begin.');

  const handleSelectionChange = useCallback((schema: Schema | null) => {
    const newSql = generateSqlFromSchema(schema);
    setSqlQuery(newSql);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex flex-grow gap-6 p-6 overflow-hidden">
        {/* Left Column */}
        <div className="w-1/3 flex flex-col gap-4 min-h-0">
          <SchemaExplorer onSelectionChange={handleSelectionChange} />
        </div>
        {/* Right Column */}
        <div className="w-2/3 flex flex-col gap-4 min-h-0">
          <SQLOutput sql={sqlQuery} />
        </div>
      </main>
    </div>
  );
}
