
import { GoogleGenAI } from "@google/genai";
import type { CharacterConfig, CharacterImages } from '../types.ts';

/**
 * Generates character images sequentially to avoid rate limits.
 */
export const generateCharacterImages = async (
  basePrompt: string,
  config: CharacterConfig
): Promise<CharacterImages> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const generateShot = async (camera: string): Promise<string> => {
    const prompt = `Professional photography portrait: ${basePrompt}. Physical features: ${config.hair} hair, ${config.eyes} eyes. Outfit: ${config.outfit}. Style: ${config.style}. Cinematic, 8k, ultra-realistic, camera: ${camera}`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { parts: [{ text: prompt }] },
        config: {
          imageConfig: { aspectRatio: "1:1" }
        }
      });
      
      const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
      if (!part?.inlineData) throw new Error("A IA não gerou os dados da imagem.");
      return `data:image/png;base64,${part.inlineData.data}`;
    } catch (err: any) {
      console.error(`Erro na captura ${camera}:`, err);
      throw err;
    }
  };

  try {
    // Gerando sequencialmente para evitar erro 429 (Too Many Requests)
    const face = await generateShot("Extreme close-up");
    const halfBody = await generateShot("Medium shot, waist up");
    const fullBody = await generateShot("Full body shot");

    return { face, halfBody, fullBody };
  } catch (error: any) {
    const errorMsg = error.message || "Erro desconhecido na API do Google";
    throw new Error(errorMsg);
  }
};

/**
 * Upscales an existing image to 4K resolution.
 */
export const upscaleImage = async (
  originalImageBase64: string,
  aspectRatio: "1:1" | "9:16"
): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const cleanBase64 = originalImageBase64.split(',')[1] || originalImageBase64;
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [
        { inlineData: { data: cleanBase64, mimeType: 'image/png' } },
        { text: "Professional AI upscale: enhance image quality to 4k resolution." }
      ]
    },
    config: { 
      imageConfig: { 
        aspectRatio: aspectRatio,
        imageSize: "4K"
      } 
    }
  });
  
  const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
  if (!part?.inlineData) throw new Error("Upscale falhou");
  return `data:image/png;base64,${part.inlineData.data}`;
};
