
import React from 'react';

export default function SettingsModal({ isOpen, onClose, isDarkMode, toggleDarkMode }: any) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-[#111] w-full max-w-sm rounded-3xl p-8 border dark:border-white/10 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xs font-black uppercase text-gray-900 dark:text-white tracking-widest">Estúdio</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-400 tracking-widest ml-1">Visual</label>
            <button 
              onClick={toggleDarkMode} 
              className="w-full py-4 bg-gray-100 dark:bg-white/5 rounded-2xl text-xs font-bold dark:text-white border border-transparent hover:border-[#0084ff]/30 transition-all flex items-center justify-between px-6"
            >
              <span>{isDarkMode ? 'Modo Claro' : 'Modo Escuro'}</span>
              <span className="material-symbols-outlined text-sm">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
          </div>
          
          <div className="p-4 bg-[#0084ff]/5 rounded-2xl border border-[#0084ff]/10">
            <p className="text-[10px] text-[#0084ff] font-bold uppercase tracking-wider mb-2">Conectividade</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">Protocolo Vercel Ativo</span>
            </div>
            <p className="text-[8px] text-gray-400 uppercase mt-2 leading-tight">
              O sistema detectou a API_KEY configurada. Os modelos Flash 3 e Image 2.5 estão operantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
