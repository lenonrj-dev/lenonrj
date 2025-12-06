import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

export const OPENAI_KEY = process.env.OPENAI_API_KEY;
export const OPENAI_MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

export const openaiClient = OPENAI_KEY ? new OpenAI({ apiKey: OPENAI_KEY }) : null;

if (!OPENAI_KEY) {
  console.warn("[OpenAI] OPENAI_API_KEY não definida. Configure no .env para habilitar respostas da IA.");
}
