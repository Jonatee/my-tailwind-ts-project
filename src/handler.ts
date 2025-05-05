
import { GoogleGenAI } from "@google/genai";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(
    request: Request,
    env: { GOOGLE_GENAI_API_KEY: string }
  ): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (
      request.method === "POST" &&
      new URL(request.url).pathname === "/generate-quote"
    ) {
      return handleGenerateQuote(request, env);
    }

    return new Response("404! Page not found", {
      status: 404,
      headers: CORS_HEADERS,
    });
  },
};

async function handleGenerateQuote(
  request: Request,
  env: { GOOGLE_GENAI_API_KEY: string }
): Promise<Response> {
  try {
    const ai = new GoogleGenAI({ apiKey: env.GOOGLE_GENAI_API_KEY });

    let mood: string | null = null;
    try {
      const body = await request.json();
      mood = body.mood || null;
      if (mood === "") mood = null;
    } catch {
      /* ignore JSON parse errors */
    }

    const prompt = mood
      ? `Mood input: "${mood}".  
Step 1: Analyze sentiment. Is it POSITIVE, NEGATIVE, or NEUTRAL?  
Step 2: Generate a 100–150-word message:  
  - If POSITIVE: Use one of the following opener categories:  
    - Celebratory Energy (e.g., "Hell yeah!", "Crushing it!", "On fire!")  
    - Elation (e.g., "You’re glowing!", "This is gold!", "Savor this!")  
    - Empowerment (e.g., "Unstoppable!", "You’re built for this!", "Own this!")  
  - If NEGATIVE: Use one of the following opener categories:  
    - Gritty Acknowledgment (e.g., "Still standing?", "This isn’t nothing", "Yo.")  
    - Raw Empathy (e.g., "I see you.", "You’re surviving.", "That’s heavy.")  
  - If NEUTRAL: Use "Hey", "You’re here", or "Keep moving"  
Step 3: Use mood-aligned metaphors (no mismatches like "lead weights" for positivity).  
Step 4: End with a line that makes them FEEL IT physically (e.g., "Breathe it in").  
Step 5: IF THE MOOD INPUT IS INVALID, NONSENSICAL, OR CANNOT BE CATEGORIZED:  
  - Ignore Steps 1–4  
  - Generate a random motivational message using urgency openers ("You’re still here", "Keep going")  
  - Use concrete actions and a gut-punch closing line  
Step 6: RETURN ONLY THE FINAL MESSAGE — no markdown, JSON, or labels.`
      : `Generate a 100–150-word motivational push. Open with urgency ("You’re still here", "Keep going", "One more step"). Use concrete actions (not abstract hope) and close with a gut-punch sentence that makes them sit up. Skip explanations—just deliver it. No AI disclaimers.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const result = response.text || "No response";

    return new Response(result, {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error generating quote:", error);
    return new Response("Failed to generate quote", {
      status: 500,
      headers: { ...CORS_HEADERS, "Content-Type": "text/plain" },
    });
  }
}
