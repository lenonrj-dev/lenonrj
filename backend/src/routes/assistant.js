import express from "express";
import { ChatMessage, ChatSession } from "../models/chatModels.js";
import { connectToDatabase, getMongoStatus } from "../config/db.js";
import { OPENAI_KEY, OPENAI_MODEL, openaiClient } from "../services/openaiClient.js";

const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    await connectToDatabase();

    const { sessionId, message, pagePath } = req.body || {};

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ error: "sessionId inválido" });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Campo 'message' é obrigatório." });
    }

    const mongoState = getMongoStatus();
    if (mongoState !== 1) {
      console.error("[Assistant API] MongoDB indisponível. Estado:", mongoState);
      return res.status(503).json({ error: "Serviço temporariamente indisponível. Tente novamente em instantes." });
    }

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

    await ChatMessage.create({
      sessionId,
      role: "user",
      content: message,
      pagePath,
    });

    if (!openaiClient || !OPENAI_KEY) {
      console.error("[Assistant API] OPENAI_API_KEY não configurada.");
      return res
        .status(500)
        .json({ error: "Configuração de OpenAI ausente. Contate o responsável pelo backend." });
    }

    let replyText = "Desculpe, não consegui responder agora. Tente novamente em instantes, por favor.";

    try {
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
        "Traga respostas estruturadas em parágrafos curtos, com bom espaçamento e leitura fluida, sem caracteres especiais, sem negrito e sem emojis. " +
        "Inclua detalhes de serviços, etapas de projeto (descoberta, design, desenvolvimento, testes, go-live), tecnologias usadas (Next.js, React, TailwindCSS, Framer Motion) e preocupações com performance, acessibilidade e SEO técnico. " +
        "Se a pergunta não estiver relacionada aos serviços ou projetos do portfólio, informe de forma educada que só responde sobre esses temas.";

      const completion = await openaiClient.chat.completions.create({
        model: OPENAI_MODEL,
        messages: [{ role: "system", content: systemPrompt }, ...history, { role: "user", content: message }],
        temperature: 0.6,
        max_tokens: 450,
      });

      const reply = completion.choices?.[0]?.message?.content?.trim();
      if (!reply) {
        console.error("[Assistant API] Resposta vazia da OpenAI.");
        return res.status(502).json({ error: "Não foi possível obter resposta da IA no momento." });
      }
      replyText = reply;
    } catch (err) {
      console.error("[Assistant API] Erro ao consultar OpenAI:", {
        name: err?.name,
        message: err?.message,
        code: err?.code,
        status: err?.status,
      });
      const status = err?.status && Number.isInteger(err.status) ? err.status : 500;
      return res
        .status(status === 401 || status === 403 ? 502 : status >= 400 && status < 600 ? status : 500)
        .json({ error: "Erro ao consultar modelo de IA. Tente novamente mais tarde." });
    }

    await ChatMessage.create({
      sessionId,
      role: "assistant",
      content: replyText,
      pagePath,
    });

    return res.status(200).json({ reply: replyText });
  } catch (err) {
    console.error("[Assistant API] Erro inesperado:", err?.message || err);
    return res.status(500).json({ error: "Erro ao processar a conversa" });
  }
});

export default router;
