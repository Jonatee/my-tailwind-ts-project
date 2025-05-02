import express from "express";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!apiKey) {
  throw new Error("API key not found in environment variables");
}

const ai = new GoogleGenAI({ apiKey });

app.post("/generate-quote", async (req, res) => {
  const mood = req.body;
  try {
    if ((mood === "") | !mood) {
      mood = null;
    }
   const prompt = mood
     ? `A user wrote: "${mood}". Interpret this literally and emotionally. If it reflects struggle (e.g., grief, loss, failure), acknowledge it directly—no minimizing. Write a 50–120-word message that’s emotionally intelligent, specific, and raw. Open with a gritty phrase like "Yo", "Still standing?", or "This isn’t nothing". Use vivid imagery (e.g., "bones tired", "walls closing in"), not clichés. End with a line that makes them feel like they can breathe again. No AI references.`
     : `Write a 50–120-word motivational message. Skip explanations—just deliver it. Open with a visceral opener like "Hey", "You’re still here", or "Don’t stop now". Be concrete, urgent, and human. Close with a sentence that makes them sit up straight. No AI disclaimers.`;
      
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    res.json({ response: response.text });
  } catch (error) {
    console.error("Error generating quote:", error);
    res.status(500).json({ error: "Failed to generate quote" });
  }
});

app.all("*", (req, res) => {
  res.status(404).send("404! Page not found");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
