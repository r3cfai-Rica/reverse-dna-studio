
import { GoogleGenAI } from "@google/genai";
import type { CharacterConfig, CharacterImages } from '../types.ts';

export const generateCharacterImages = async (
  basePrompt: string,
  config: CharacterConfig
): Promise<CharacterImages> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const generateShot = async (camera: string): Promise<string> => {
    const prompt = `Professional photography portrait: ${basePrompt}. Physical features: ${config.hair} hair, ${config.eyes} eyes. Outfit: ${config.outfit}. Style: ${config.style}. Cinematic, 8k, ultra-realistic, camera: ${camera}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] },
      config: {
        imageConfig: { aspectRatio: "1:1" }
      }
    });
    
    const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
    if (!part?.inlineData) throw new Error("Geração de imagem falhou.");
    return `data:image/png;base64,${part.inlineData.data}`;
  };

  try {
    const [face, half, full] = await Promise.all([
      generateShot("Extreme close-up"),
      generateShot("Medium shot, waist up"),
      generateShot("Full body shot")
    ]);
    return { face, halfBody: half, fullBody: full };
  } catch (error) {
    console.error("Gen Error:", error);
    throw error;
  }
};

export const upscaleImage = async (
  originalImageBase64: string,
  aspectRatio: "1:1" | "9:16"
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const cleanBase64 = originalImageBase64.split(',')[1] || originalImageBase64;
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { inlineData: { data: cleanBase64, mimeType: 'image/png' } },
        { text: "Professional AI upscale: enhance image quality to 4k resolution." }
      ]
    },
    config: { imageConfig: { aspectRatio } }
  });
  
  const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (!part?.inlineData) throw new Error("Upscale falhou");
  return `data:image/png;base64,${part.inlineData.data}`;
};
