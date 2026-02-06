
import React, { useState } from 'react';

export default function PromptOutput({ title, value, isLoading, isCode, icon }: any) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => { 
    if (!value) return;
    navigator.clipboard.writeText(value); 
    setCopied(true); 
    setTimeout(() => setCopied(false), 2000); 
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end px-2">
        <h3 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.4em] flex items-center gap-3">
          <span className="material-symbols-outlined text-lg text-[#0084ff]">{icon}</span> {title}
        </h3>
        {value && !isLoading && (
          <button onClick={handleCopy} className="text-[#0084ff] text-[9px] font-black uppercase tracking-widest hover:underline">
            {copied ? 'DNA COPIADO' : 'COPIAR'}
          </button>
        )}
      </div>
      <div className="relative rounded-[2rem] border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0a0a0a] p-8 min-h-[250px] shadow-sm overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-[2rem] z-10 gap-4">
            <div className="w-10 h-10 border-2 border-[#0084ff] border-t-transparent animate-spin rounded-full"></div>
            <span className="text-[9px] font-black text-[#0084ff] uppercase tracking-[0.5em]">Sequenciando...</span>
          </div>
        )}
        <textarea 
          className={`w-full h-full min-h-[200px] bg-transparent resize-none text-[14px] leading-relaxed outline-none dark:text-gray-300 ${isCode ? 'font-mono text-[#0084ff]' : 'font-medium'}`} 
          value={value} 
          placeholder="Aguardando dados de entrada..."
          readOnly 
        />
      </div>
    </div>
  );
}
