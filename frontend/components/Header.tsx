import Link from 'next/link';
import { Database } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full p-4 bg-background/80 backdrop-blur-sm border-b border-border flex items-center justify-between flex-shrink-0 sticky top-0 z-20">
      <Link href="/" className="flex items-center space-x-2">
        <Database className="h-6 w-6 text-accent" />
        <h1 className="text-xl font-semibold text-text-primary">PromptQL</h1>
      </Link>
      <nav className="space-x-6">
        {/* Placeholder for future links like Sign In/Sign Up */}
        <a href="#" className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors">Sign In</a>
      </nav>
    </header>
  );
}