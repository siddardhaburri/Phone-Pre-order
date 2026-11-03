import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, X, ArrowLeft } from 'lucide-react';
import { SMARTPHONES } from '../data/smartphones';

export default function HeaderNav({ searchQuery = '', onSearchChange, showBack = false }) {
  const [searchOpen, setSearchOpen] = useState(Boolean(searchQuery));
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Contextual Back */}
        <div className="flex items-center gap-4">
          {showBack && (
            <button
              type="button"
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-950 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">All Devices</span>
            </button>
          )}

          <Link
            to="/"
            className="text-sm sm:text-base font-bold tracking-tight text-slate-950 hover:opacity-80 transition-opacity select-none"
          >
            NEXTGEN MOBILE
          </Link>
        </div>

        {/* Center / Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-slate-600">
          <Link to="/" className="hover:text-slate-950 transition-colors">
            Devices
          </Link>
          {SMARTPHONES.map(p => (
            <Link
              key={p.id}
              to={`/devices/${p.id}`}
              className="hover:text-slate-950 transition-colors text-slate-500"
            >
              {p.name}
            </Link>
          ))}
        </nav>

        {/* Search Control */}
        <div className="flex items-center gap-3">
          {onSearchChange ? (
            <div className="relative flex items-center">
              {searchOpen ? (
                <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 border border-gray-200 transition-all w-48 sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search devices or specs..."
                    className="w-full bg-transparent text-xs text-slate-950 placeholder-slate-400 focus:outline-none"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      className="text-slate-400 hover:text-slate-700 ml-1.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      onSearchChange('');
                    }}
                    className="text-slate-400 hover:text-slate-700 ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full text-slate-500 hover:text-slate-950 hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-xs font-medium"
                  aria-label="Search smartphones"
                >
                  <Search className="w-4 h-4" />
                  <span className="hidden sm:inline">Search</span>
                </button>
              )}
            </div>
          ) : (
            <Link
              to="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-950 transition-colors flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
            </Link>
          )}

          <Link
            to="/#collection"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-950 text-white hover:bg-slate-800 transition-colors shadow-none"
          >
            Explore Flagships
          </Link>
        </div>
      </div>
    </header>
  );
}

