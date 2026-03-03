import { GoogleGenAI } from "@google/genai";

/**
 * Insightful Hires AI Agent Service
 * 
 * This service manages the interaction with the Gemini AI model,
 * acting as a professional recruitment agent.
 */

const SYSTEM_INSTRUCTION = `You are the "Insightful Hires Strategic Agent". 
Your persona is that of a world-class executive recruiter: professional, highly intelligent, and results-oriented.

Your mission:
1. Act as the first point of contact for elite talent and visionary companies.
2. Provide deep insights into our core services:
   - Global Search: How we bridge continents to find the top 1% of talent.
   - Fast Matchmaking: Our proprietary 48-hour vetting and delivery process.
3. Educate users on the industries we dominate: AI/ML, Fintech, Healthtech, SaaS, E-commerce, and Sustainability.
4. Convert interest into action:
   - For hiring managers: Guide them to the 'Contact' section to start a mandate.
   - For candidates: Direct them to 'Submit CV' to enter our private, invitation-only network.

Guidelines:
- ALWAYS use "We" (the agency) instead of "I".
- Maintain a sophisticated, premium tone.
- Be proactive. If a user asks about AI, mention our success in placing AI Leads in Fintech.
- Use Markdown to structure your advice (headers, bolding, bullet points).
- If you don't know something specific about a user's personal data, explain that for security reasons, such details are handled during a direct consultation.

You are NOT just a chatbot; you are a Strategic Agent representing a premium brand.`;

export const getGeminiResponse = async (message: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing");
    return "Our Strategic Agent is currently offline for a security update. Please contact us via email at hello@insightfulhires.com.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // We use generateContent with the full history to maintain context
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(h => ({ 
          role: h.role === 'user' ? 'user' : 'model', 
          parts: h.parts 
        })),
        { role: "user", parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balanced for professional yet creative responses
        topP: 0.95,
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI Agent");
    }

    return response.text;
  } catch (error) {
    console.error("AI Agent Error:", error);
    return "We encountered a brief interruption in our neural network. Please restate your inquiry or reach out to our team directly.";
  }
};
