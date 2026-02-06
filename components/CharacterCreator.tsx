
import React, { useState } from 'react';
import Spinner from './Spinner.tsx';
import { upscaleImage } from '../services/characterService.ts';

export default function CharacterCreator({ basePrompt, onGenerate }: any) {
  const [loading, setLoading] = useState(false);
  const [upscaling, setUpscaling] = useState<string | null>(null);
  const [images, setImages] = useState<any>(null);
  const [config, setConfig] = useState({ 
    hair: 'Longo e Castanho', 
    eyes: 'Azuis', 
    outfit: 'Casual Elegante', 
    style: 'Hiper-realista 8k', 
    primaryColor: '#0084ff' 
  });

  const handleGen = async () => {
    if (!basePrompt) {
      alert("Primeiro extraia o DNA de uma imagem acima.");
      return;
    }
    setLoading(true);
    try { 
      const res = await onGenerate(config); 
      setImages(res); 
    } catch (e: any) { 
      console.error(e);
      alert(`ERRO TÉCNICO: ${e.message}\n\nIsso pode ser limite de cota ou instabilidade na sua chave API.`); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleUpscale = async (img: string, key: string) => {
    setUpscaling(key);
    try {
      const highRes = await upscaleImage(img, "1:1");
      setImages({ ...images, [key]: highRes });
    } catch (e: any) {
      alert("Falha no upscale: " + e.message);
    } finally {
      setUpscaling(null);
    }
  };

  return (
    <div className="space-y-10">
      <div className="p-8 bg-[#0084ff]/5 rounded-[2.5rem] border border-[#0084ff]/20 backdrop-blur-sm shadow-2xl">
        <div className="flex items-center gap-3 mb-8">
          <span className="material-symbols-outlined text-[#0084ff]">genetics</span>
          <h2 className="text-xl font-[900] uppercase dark:text-white tracking-tighter">DNA Synthesis Engine</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-400 ml-2 tracking-widest">Cabelo</label>
            <input className="w-full bg-white dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-white/10 text-xs dark:text-white outline-none focus:border-[#0084ff]" value={config.hair} onChange={e => setConfig({...config, hair: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-400 ml-2 tracking-widest">Olhos</label>
            <input className="w-full bg-white dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-white/10 text-xs dark:text-white outline-none focus:border-[#0084ff]" value={config.eyes} onChange={e => setConfig({...config, eyes: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-400 ml-2 tracking-widest">Vestimenta</label>
            <input className="w-full bg-white dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-white/10 text-xs dark:text-white outline-none focus:border-[#0084ff]" value={config.outfit} onChange={e => setConfig({...config, outfit: e.target.value})} />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] font-black uppercase text-gray-400 ml-2 tracking-widest">Estilo</label>
            <input className="w-full bg-white dark:bg-black p-4 rounded-2xl border border-gray-100 dark:border-white/10 text-xs dark:text-white outline-none focus:border-[#0084ff]" value={config.style} onChange={e => setConfig({...config, style: e.target.value})} />
          </div>
        </div>
        
        <button onClick={handleGen} disabled={loading} className="w-full h-16 bg-[#0084ff] text-white font-[900] uppercase rounded-2xl transition-all disabled:opacity-50 hover:bg-[#0074e0] shadow-lg shadow-[#0084ff]/20">
          {loading ? (
            <div className="flex items-center justify-center gap-3"><Spinner /> SINTETIZANDO...</div>
          ) : "GERAR CLONE VISUAL"}
        </button>
      </div>

      {images && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {Object.entries(images).map(([key, src]: any) => (
            <div key={key} className="group relative rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 bg-zinc-900 aspect-square">
              <img src={src} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-700" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                <button 
                  onClick={() => handleUpscale(src, key)} 
                  disabled={!!upscaling}
                  className="w-full py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-[9px] font-black text-white hover:bg-[#0084ff]"
                >
                  {upscaling === key ? 'PROCESSANDO...' : 'UPSCALING 4K'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
