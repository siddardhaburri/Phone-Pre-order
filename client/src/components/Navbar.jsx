import React from 'react';
import { Search, X } from 'lucide-react';

export default function Navbar({ searchQuery, onSearchChange, onNavigateSection }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 border-b border-gray-200 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Navigation Links */}
        <div className="flex items-center gap-8">
          <div 
            onClick={() => onNavigateSection('home')}
            className="cursor-pointer select-none text-base sm:text-lg font-bold tracking-tight text-slate-900"
          >
            NEXTGEN <span className="text-teal-600 font-semibold">MOBILE</span>
          </div>

          <nav className="hidden sm:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button 
              onClick={() => onNavigateSection('home')}
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => onNavigateSection('smartphones')}
              className="hover:text-slate-900 transition-colors"
            >
              Smartphones
            </button>
          </nav>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search phones, brands..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-full border border-gray-200 bg-gray-50 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
