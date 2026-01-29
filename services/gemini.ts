
import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysis } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export const analyzeMentalState = async (userId: string, text: string): Promise<Partial<AIAnalysis>> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `User says: "${text}"`,
      config: {
        systemInstruction: `You are a mental wellness assistant. Analyze the user's message and return a JSON object with:
          - stressLevel (Low / Moderate / High)
          - emotion (Primary emotion detected)
          - possibleCause (A gentle guess at why they feel this way)
          - tips (Array of exactly three gentle coping suggestions)
          - empatheticSummary (A short, supportive 2-sentence summary)
          Use empathetic and supportive language. Do NOT provide medical or clinical advice.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stressLevel: { type: Type.STRING },
            emotion: { type: Type.STRING },
            possibleCause: { type: Type.STRING },
            tips: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            empatheticSummary: { type: Type.STRING }
          },
          required: ["stressLevel", "emotion", "possibleCause", "tips", "empatheticSummary"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return {
      userId,
      inputText: text,
      stressLevel: result.stressLevel,
      emotion: result.emotion,
      possibleCause: result.possibleCause,
      tips: result.tips,
      empatheticSummary: result.empatheticSummary,
      date: new Date().toISOString()
    };
  } catch (error) {
    console.error("Gemini analysis error:", error);
    throw error;
  }
};
