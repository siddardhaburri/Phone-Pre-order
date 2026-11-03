import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-bold text-slate-900">NEXTGEN MOBILE</span> — Flagship Showcase Catalogue
        </div>

        <div className="text-slate-400 text-center sm:text-right text-[11px]">
          Apple, Samsung, and Motorola device specifications and concepts are for display demonstration purposes.
        </div>
      </div>
    </footer>
  );
}
