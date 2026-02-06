
import { GoogleGenAI, Type } from "@google/genai";
import type { ImagePrompts, GenerationConfig } from '../types.ts';

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    portuguese: { type: Type.STRING, description: 'Análise detalhada em português.' },
    english: { type: Type.STRING, description: 'Prompt técnico em inglês.' },
    json: { type: Type.STRING, description: 'Parâmetros técnicos da imagem.' },
  },
  required: ['portuguese', 'english', 'json'],
};

export const generatePromptsFromImage = async (
  base64Image: string, 
  mimeType: string, 
  genConfig: GenerationConfig
): Promise<ImagePrompts> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { 
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } }, 
          { text: "Atue como um Engenheiro de Prompt Sênior. Realize a engenharia reversa total desta imagem. Identifique iluminação, câmera, vestimentas e estilo. Retorne rigorosamente em JSON." }
        ] 
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: genConfig.temperature,
      },
    });

    const text = response.text;
    if (!text) throw new Error("A IA não retornou conteúdo.");
    
    const parsedJson = JSON.parse(text);
    return {
      portuguese: parsedJson.portuguese || '',
      english: parsedJson.english || '',
      json: typeof parsedJson.json === 'string' ? parsedJson.json : JSON.stringify(parsedJson.json, null, 2)
    };
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
