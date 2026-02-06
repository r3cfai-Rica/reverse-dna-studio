
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import ImageUploader from './components/ImageUploader.tsx';
import PromptOutput from './components/PromptOutput.tsx';
import CharacterCreator from './components/CharacterCreator.tsx';
import SettingsModal from './components/SettingsModal.tsx';
import { generatePromptsFromImage } from './services/geminiService.ts';
import { generateCharacterImages } from './services/characterService.ts';
import { fileToBase64 } from './utils/fileUtils.ts';

export default function App() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prompts, setPrompts] = useState({ portuguese: '', english: '', json: '' });
  const [loading, setLoading] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => { 
    if(isDarkMode) document.documentElement.classList.add('dark'); 
    else document.documentElement.classList.remove('dark'); 
  }, [isDarkMode]);

  const handleGen = async () => {
    if (!imageFile) return;
    setLoading(true);
    try {
      const { base64, mimeType } = await fileToBase64(imageFile);
      const res = await generatePromptsFromImage(base64, mimeType, { temperature: 0.4, maxOutputTokens: 2048 });
      setPrompts(res);
    } catch (e: any) { 
      console.error(e);
      alert("Erro na análise. Verifique sua API_KEY na Vercel.");
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcfb] dark:bg-[#050505] transition-colors duration-700 font-['Space_Grotesk'] text-gray-900 dark:text-white">
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#0084ff] blur-[150px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600 blur-[120px] rounded-full"></div>
      </div>

      <Header onConfigClick={() => setIsSettingsOpen(true)} />
      
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="relative z-10 container mx-auto px-6 py-12 max-w-6xl">
        <div className="text-center mb-16 space-y-6">
          <h2 className="text-6xl md:text-9xl font-[900] tracking-tighter uppercase leading-none select-none">
            REVERSE <span className="text-[#0084ff] italic">DNA</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-[10px] font-black uppercase tracking-[0.6em] max-w-md mx-auto">
            Decodificação de Prompts Profissionais
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-10 lg:sticky lg:top-32">
            <ImageUploader onImageChange={(f) => { setImageFile(f); setImageUrl(URL.createObjectURL(f)); }} imageUrl={imageUrl} />
            
            <button 
              onClick={handleGen} 
              className={`w-full h-24 bg-[#0084ff] text-white font-black uppercase rounded-3xl shadow-2xl transition-all active:scale-95 disabled:opacity-20 ${loading ? '' : 'hover:shadow-[#0084ff]/50'}`}
              disabled={loading || !imageFile}
            >
              <div className="flex items-center justify-center gap-4 tracking-[0.3em] text-xl">
                {loading ? (
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white animate-spin rounded-full"></div>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-3xl">biotech</span>
                    Extrair DNA
                  </>
                )}
              </div>
            </button>
          </div>
          
          <div className="space-y-12">
            <PromptOutput title="Sequenciamento (PT)" value={prompts.portuguese} isLoading={loading} icon="psychology" />
            <PromptOutput title="Prompt Original (EN)" value={prompts.english} isLoading={loading} icon="terminal" isCode />
          </div>
        </div>

        {prompts.english && !loading && (
          <div className="mt-32 pt-24 border-t border-gray-200 dark:border-white/5">
            <div className="text-center mb-16">
              <h3 className="text-xs font-black uppercase text-[#0084ff] tracking-[0.8em] mb-2">Replicação Molecular</h3>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Gere clones baseados no DNA extraído</p>
            </div>
            <CharacterCreator 
              basePrompt={prompts.english} 
              onGenerate={(cfg: any) => generateCharacterImages(prompts.english, cfg)} 
            />
          </div>
        )}
      </main>

      <footer className="py-24 text-center border-t border-gray-100 dark:border-white/5 mt-20 opacity-50">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">R3CF Studio • DNA v3.2</p>
      </footer>
    </div>
  );
}
