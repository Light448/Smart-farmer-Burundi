import { GoogleGenAI, Type } from "@google/genai";
import { CropAnalysis } from "../types";

// Note: In production, API calls should route through a backend to protect the key.
// For this demo, we assume the environment variable is injected safely.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const CROP_MODEL = 'gemini-2.5-flash';
// Use 2.5 Flash (supports images + text); avoids 429 on free tier vs gemini-2.5-flash-image

export const analyzeCropHealth = async (
  imageBase64: string, 
  language: 'en' | 'fr'
): Promise<CropAnalysis> => {
  
  if (!apiKey) {
    throw new Error("API Key missing. Please configure process.env.API_KEY");
  }

  // Remove header if present
  const cleanBase64 = imageBase64.split(',')[1] || imageBase64;

  const prompt = `
    You are an expert agricultural AI for Smart Farmer Burundi. 
    Analyze this crop image.
    Identify:
    1. Is it healthy? (boolean)
    2. Disease name (if any, else null)
    3. Confidence level (0 to 100 integer). 
       - If image is blurry or not a plant, confidence should be low (<50).
    4. Actionable advice in ${language === 'fr' ? 'French' : 'English'}.
       - If healthy: Provide maintenance tips.
       - If diseased: Provide treatment.
       - If confidence < 50: Provide basic guidance but suggest retaking the photo.
    5. Treatment details in ${language === 'fr' ? 'French' : 'English'} (optional).

    Return purely JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: CROP_MODEL,
      contents: [
        {
          parts: [
            { inlineData: { mimeType: 'image/jpeg', data: cleanBase64 } },
            { text: prompt }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            healthy: { type: Type.BOOLEAN },
            diseaseName: { type: Type.STRING },
            confidence: { type: Type.INTEGER },
            advice: { type: Type.STRING },
            treatment: { type: Type.STRING }
          }
        }
      }
    });

    const text = response?.text;
    if (text == null || text === '') {
      throw new Error("Gemini returned no text. The image may have been blocked or the model may be unavailable.");
    }
    const result = JSON.parse(text);

    return {
      id: Date.now().toString(),
      timestamp: Date.now(),
      imageUrl: imageBase64, // Storing base64 for demo; real app would use S3/Cloud Storage url
      healthy: result.healthy,
      diseaseName: result.diseaseName,
      confidence: result.confidence,
      advice: result.advice,
      treatment: result.treatment,
      language
    };

  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Gemini API Error:", error);
    // Surface the real error so users can see key/quota/network issues
    throw new Error(
      message.includes("API") || message.includes("403") || message.includes("401") || message.includes("429") || message.includes("quota")
        ? message
        : "AI Service unavailable. Please try again. (Check browser console for details.)"
    );
  }
};

export const getSoilAdvice = async (
  soilType: string,
  crop: string,
  season: string,
  ph: string,
  language: 'en' | 'fr'
) => {
   if (!apiKey) return { recommendation: "API Config missing", fertilizer: "N/A" };

   const prompt = `
     Act as a soil expert. 
     Soil Type: ${soilType}
     Crop: ${crop}
     Season: ${season}
     pH: ${ph}
     
     Provide a recommendation and fertilizer suggestion in ${language === 'fr' ? 'French' : 'English'}.
     Return JSON: { "recommendation": "...", "fertilizer": "..." }
   `;

   try {
     const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: "application/json" }
     });
     const text = response?.text;
     if (text == null || text === '') {
       return { recommendation: "No response from AI.", fertilizer: "N/A" };
     }
     return JSON.parse(text);
   } catch (e) {
     console.error(e);
     return { recommendation: "Could not retrieve advice.", fertilizer: "Generic NPK" };
   }
};
