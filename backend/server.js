import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI || "mongodb://localhost:27017/assistant";
const frontendOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const openaiKey = process.env.OPENAI_API_KEY;

if (!openaiKey) {
  console.warn("⚠️  OPENAI_API_KEY não definida. Defina no .env para habilitar respostas da IA.");
}

app.use(
  cors({
    origin: frontendOrigin,
    credentials: false,
  })
);
app.use(express.json({ limit: "1mb" }));

// Conexão MongoDB
mongoose
  .connect(mongoUri, { dbName: process.env.MONGODB_DB || "assistant" })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar no MongoDB", err));

const chatSessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    userAgent: String,
    ip: String,
    pageStartPath: String,
  },
  { timestamps: true }
);

const chatMessageSchema = new mongoose.Schema(
  {
    sessionId: { type: String, required: true, index: true },
    role: { type: String, enum: ["user", "assistant", "system"], required: true },
    content: { type: String, required: true },
    pagePath: String,
  },
  { timestamps: true }
);

const ChatSession = mongoose.models.ChatSession || mongoose.model("ChatSession", chatSessionSchema);
const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", chatMessageSchema);

app.post("/api/assistant/chat", async (req, res) => {
  try {
    const { sessionId, message, pagePath } = req.body || {};
    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ error: "sessionId inválido" });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Mensagem obrigatória" });
    }

    // cria sessão se não existir
    const existingSession = await ChatSession.findOne({ sessionId });
    if (!existingSession) {
      await ChatSession.create({
        sessionId,
        userAgent: req.headers["user-agent"],
        ip: req.ip,
        pageStartPath: pagePath,
      });
    } else {
      existingSession.updatedAt = new Date();
      await existingSession.save();
    }

    // registra mensagem do usuário
    await ChatMessage.create({
      sessionId,
      role: "user",
      content: message,
      pagePath,
    });

    let replyText =
      "Desculpe, não consegui responder agora. Tente novamente em instantes, por favor.";

    if (openaiKey) {
      const recentMessages = await ChatMessage.find({ sessionId })
        .sort({ createdAt: -1 })
        .limit(8)
        .lean();

      const history = recentMessages
        .reverse()
        .map((m) => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }));

      const systemPrompt =
        "Você é a assistente virtual de Lenon Alexandre da Cunha, desenvolvedor full stack. " +
        "Seu único foco é responder dúvidas sobre o portfólio, serviços e processos apresentados no site: desenvolvimento de sites institucionais, e-commerces, SaaS B2B, dashboards, landing pages e blogs. " +
        "Sempre responda em português do Brasil, com tom profissional, claro e objetivo. " +
        "Traga respostas estruturadas em parágrafos curtos, com boa espaçamento e leitura fluida, sem caracteres especiais, sem negrito e sem emojis. " +
        "Inclua detalhes de serviços, etapas de projeto (descoberta, design, desenvolvimento, testes, go-live), tecnologias usadas (Next.js, React, TailwindCSS, Framer Motion) e preocupações com performance, acessibilidade e SEO técnico. " +
        "Se a pergunta não estiver relacionada aos serviços ou projetos do portfólio, informe de forma educada que só responde sobre esses temas.";

      const payload = {
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        messages: [{ role: "system", content: systemPrompt }, ...history, { role: "user", content: message }],
        temperature: 0.6,
        max_tokens: 450,
      };

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("OpenAI error:", errText);
        throw new Error("Falha ao obter resposta da IA");
      }

      const data = await response.json();
      replyText = data.choices?.[0]?.message?.content?.trim() || replyText;
    }

    // salva resposta da IA
    await ChatMessage.create({
      sessionId,
      role: "assistant",
      content: replyText,
      pagePath,
    });

    return res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao processar a conversa" });
  }
});

app.get("/health", (_req, res) => res.json({ ok: true }));

app.listen(port, () => {
  console.log(`🚀 Assistente backend rodando na porta ${port}`);
});
