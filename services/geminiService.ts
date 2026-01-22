
import { GoogleGenAI, Type } from "@google/genai";
import { Dossier } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDossier(): Promise<Dossier> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Generate a detailed fictional cyberpunk dossier for a person based on a simulated retina scan. The setting is 2099. Be creative but keep it within the cyberpunk genre.",
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          alias: { type: Type.STRING },
          birthDate: { type: Type.STRING },
          profession: { type: Type.STRING },
          pastDeeds: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING } 
          },
          criminalRecord: { type: Type.STRING },
          lastKnownLocation: { type: Type.STRING },
          securityClearance: { type: Type.STRING },
          threatLevel: { 
            type: Type.STRING,
            description: "Low, Medium, High, Extreme, or Critical"
          },
          biometricId: { type: Type.STRING }
        },
        required: ["name", "alias", "birthDate", "profession", "pastDeeds", "criminalRecord", "lastKnownLocation", "securityClearance", "threatLevel", "biometricId"]
      }
    }
  });

  try {
    return JSON.parse(response.text) as Dossier;
  } catch (error) {
    console.error("Failed to parse dossier:", error);
    throw new Error("Dossier corruption detected.");
  }
}
