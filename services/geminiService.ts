import { GoogleGenAI } from "@google/genai";

export const refineMessageWithAI = async (currentMessage: string): Promise<string> => {
  if (!process.env.API_KEY) {
    console.warn("Gemini API Key missing");
    return currentMessage;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Reword the following inquiry for a luxury real estate developer. 
      Make it sound professional, sophisticated, and genuinely interested. 
      Keep it concise (under 50 words). 
      Original message: "${currentMessage}"`,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error refining message:", error);
    return currentMessage;
  }
};