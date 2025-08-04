'use client';

import { useState } from 'react';
import { X, Loader2 } from 'lucide-react';

interface ConnectModalProps {
  onClose: () => void;
  onConnect: (details: any) => void;
  error: string | null;
  isLoading: boolean;
}

export default function ConnectModal({ onClose, onConnect, error, isLoading }: ConnectModalProps) {
  const [connectionDetails, setConnectionDetails] = useState({
    type: 'postgresql',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '',
    database: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConnectionDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect(connectionDetails);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center font-sans">
      <div className="bg-panel border border-border rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <X className="h-5 w-5" />
        </button>
        <div className="p-8">
          <h2 className="text-xl font-semibold text-black mb-6">Connect to Database</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-black">Database Type</label>
              <select name="type" value={connectionDetails.type} onChange={handleChange} className="mt-1 w-full p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary">
                <option value="postgresql">PostgreSQL</option>
                <option value="mysql">MySQL</option>
                <option value="sqlite">SQLite</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" name="host" placeholder="Host" value={connectionDetails.host} onChange={handleChange} className="p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
              <input type="number" name="port" placeholder="Port" value={connectionDetails.port} onChange={handleChange} className="p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
            </div>
            <input type="text" name="database" placeholder="Database Name" value={connectionDetails.database} onChange={handleChange} className="w-full p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
            <input type="text" name="user" placeholder="Username" value={connectionDetails.user} onChange={handleChange} className="w-full p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
            <input type="password" name="password" placeholder="Password" value={connectionDetails.password} onChange={handleChange} className="w-full p-2 bg-secondary border border-border rounded-md text-black focus:ring-2 focus:ring-primary" />
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={isLoading} className="w-full py-2.5 px-4 bg-orange-500 text-black font-semibold rounded-md hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Connect
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}