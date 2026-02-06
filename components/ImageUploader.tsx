
import React, { useRef } from 'react';

export default function ImageUploader({ onImageChange, imageUrl }: { onImageChange: (f: File) => void, imageUrl: string | null }) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  return (
    <div 
      onClick={() => inputRef.current?.click()}
      className="relative w-full aspect-square md:aspect-[4/3] rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-white/10 flex items-center justify-center cursor-pointer hover:border-[#0084ff] transition-all duration-700 overflow-hidden bg-white dark:bg-[#080808] group shadow-2xl"
    >
      <input type="file" ref={inputRef} className="hidden" accept="image/*" onChange={e => e.target.files?.[0] && onImageChange(e.target.files[0])} />
      
      {imageUrl ? (
        <div className="relative w-full h-full p-6">
          <img src={imageUrl} className="w-full h-full object-contain rounded-[2rem]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-12">
            <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">Substituir Referência</p>
          </div>
          <div className="absolute top-0 left-0 w-full h-1 bg-[#0084ff] opacity-50 shadow-[0_0_20px_#0084ff] animate-[scan_4s_linear_infinite]"></div>
        </div>
      ) : (
        <div className="text-center p-16 group-hover:scale-110 transition-transform duration-700">
          <span className="material-symbols-outlined text-6xl text-[#0084ff] mb-6 block">cloud_upload</span>
          <p className="font-black uppercase text-sm tracking-[0.3em]">Carregar Amostra</p>
          <p className="text-gray-400 font-bold uppercase text-[9px] mt-4 tracking-widest">Aguardando sequenciamento...</p>
        </div>
      )}

      <style>{`
        @keyframes scan {
          0% { top: 0%; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
}
