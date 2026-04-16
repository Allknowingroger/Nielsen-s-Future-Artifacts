import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const geminiModel = "gemini-3-flash-preview";

export async function generateHyperEntity(prompt: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `You are a visionary designer inspired by Michael Nielsen. 
    Based on the user's seed idea: "${prompt}", imagine a "Hyper-entity" - a radical future artifact or system that fundamentally reshapes human capabilities.
    
    Provide the following in JSON format:
    {
      "name": "Name of the Hyper-entity",
      "description": "A profound description of what it is and how it works.",
      "transformation": "How it changes the 'verbs' of human activity.",
      "risks": ["Risk 1", "Risk 2"],
      "benefits": ["Benefit 1", "Benefit 2"],
      "visualDescription": "A detailed visual description for an artist."
    }
    `,
    config: {
      responseMimeType: "application/json"
    }
  });
  
  return JSON.parse(response.text || "{}");
}

export async function getWisePerspective(entityName: string, entityDescription: string) {
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `You are a "Wise Optimist" guide inspired by Michael Nielsen. 
    Analyze the following Hyper-entity:
    Name: ${entityName}
    Description: ${entityDescription}
    
    Provide a balanced, proactive perspective in JSON format:
    {
      "promise": "A deep exploration of the positive potential.",
      "peril": "A clear-eyed look at the existential or societal risks.",
      "steeringStrategy": "A concrete strategy for humanity to maintain agency.",
      "milestones": [
        { "stage": "Early Development", "action": "Specific action to take now" },
        { "stage": "Scaling", "action": "Action for when it becomes widespread" },
        { "stage": "Maturity", "action": "Long-term governance or cultural shift" }
      ]
    }
    `,
    config: {
      responseMimeType: "application/json"
    }
  });
  
  return JSON.parse(response.text || "{}");
}

export async function synthesizeLenses(problem: string, lenses: { name: string, description: string }[]) {
  const lensDescriptions = lenses.map(l => `${l.name}: ${l.description}`).join("\n");
  const response = await ai.models.generateContent({
    model: geminiModel,
    contents: `You are a cognitive architect. 
    Synthesize the following problem through multiple cognitive lenses:
    Problem: "${problem}"
    
    Lenses:
    ${lensDescriptions}
    
    Provide a synthesized "Refraction" in JSON format:
    {
      "synthesis": "A cohesive integration of all lenses into a new way of seeing the problem.",
      "emergentInsight": "A surprising insight that only appears when these lenses are combined.",
      "nextQuestion": "The most important recursive question to ask next."
    }
    `,
    config: {
      responseMimeType: "application/json"
    }
  });
  
  return JSON.parse(response.text || "{}");
}
