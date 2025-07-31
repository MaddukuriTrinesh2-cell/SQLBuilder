export interface Column {
  name: string;
  type: string;
  checked?: boolean;
}

export interface Table {
  name: string;
  columns: Column[];
  checked?: boolean;
  expanded?: boolean;
}

export interface Schema {
  tables: Table[];
  error?: string; // Optional error from backend
}