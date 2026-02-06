
import React from 'react';
import Logo from './Logo.tsx';

export default function Header({ onConfigClick }: { onConfigClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-gray-100 dark:border-white/5 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8"><Logo /></div>
          <h1 className="text-xl font-black dark:text-white">R3CF<span className="text-[#0084ff]">.ai</span></h1>
        </div>
        <button 
          onClick={onConfigClick} 
          className="p-3 bg-gray-100 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10 flex items-center gap-2 hover:bg-[#0084ff]/10 transition-colors"
        >
          <span className="material-symbols-outlined text-sm dark:text-white">settings</span>
        </button>
      </div>
    </header>
  );
}
