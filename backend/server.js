import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "assistant-db";
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:3000";
const OPENAI_KEY = process.env.OPENAI_API_KEY;
const IS_VERCEL = Boolean(process.env.VERCEL);

if (!OPENAI_KEY) {
  console.warn("[OpenAI] OPENAI_API_KEY não definida. Configure no .env para habilitar respostas da IA.");
}

mongoose.set("strictQuery", false);

mongoose.connection.on("connected", () => {
  console.log("[MongoDB] Estado: connected");
});

mongoose.connection.on("error", (err) => {
  console.error("[MongoDB] Estado: error", err?.message || err);
});

mongoose.connection.on("disconnected", () => {
  console.warn("[MongoDB] Estado: disconnected");
});

export const getMongoStatus = () => mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting

export async function connectToDatabase() {
  if (!MONGODB_URI) {
    console.error("[MongoDB] Variável de ambiente MONGODB_URI não definida. Abortando conexão.");
    return;
  }

  const state = mongoose.connection.readyState;
  if (state === 1 || state === 2) {
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI, { dbName: MONGODB_DB });
    console.log("[MongoDB] Conectado com sucesso.");
  } catch (err) {
    console.error("[MongoDB] Erro ao conectar:", err?.message || err);
  }
}

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: false,
  })
);
app.use(express.json({ limit: "1mb" }));

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
    await connectToDatabase();

    const { sessionId, message, pagePath } = req.body || {};
    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ error: "sessionId inválido" });
    }
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Mensagem obrigatória" });
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

    let replyText = "Desculpe, não consegui responder agora. Tente novamente em instantes, por favor.";

    if (OPENAI_KEY) {
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
          Authorization: `Bearer ${OPENAI_KEY}`,
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

app.get("/health", async (_req, res) => {
  await connectToDatabase();
  return res.json({ ok: true, mongo: getMongoStatus() });
});

app.get("/", async (_req, res) => {
  await connectToDatabase();

  const now = new Date();
  const mongoState = getMongoStatus();
  const mongoOk = mongoState === 1;
  const mongoLabel =
    mongoState === 1
      ? "Conectado"
      : mongoState === 2
      ? "Conectando"
      : mongoState === 3
      ? "Desconectando"
      : "Desconectado";

  const openaiConfigured = Boolean(OPENAI_KEY);
  const allGood = mongoOk;

  const statusColor = allGood ? "#22c55e" : "#ef4444";
  const statusText = allGood ? "ONLINE" : "ATENÇÃO";

  const html = `<!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Assistant Backend - Status</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
      <style>
        :root { color-scheme: dark; }
        * { box-sizing: border-box; }
        body {
          margin: 0;
          font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          background: radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.08), transparent 25%),
                      radial-gradient(circle at 80% 0%, rgba(124, 58, 237, 0.1), transparent 25%),
                      #050816;
          color: #e5e7eb;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 32px;
        }
        .card {
          width: 100%;
          max-width: 980px;
          background: rgba(17, 24, 39, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
          padding: 28px 28px 24px;
          backdrop-filter: blur(10px);
        }
        .header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          flex-wrap: wrap;
        }
        h1 {
          margin: 0;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .subtitle {
          margin: 2px 0 0;
          color: #9ca3af;
          font-size: 14px;
        }
        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 18px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          font-weight: 600;
          color: #f3f4f6;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: ${statusColor};
          box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.06);
        }
        .section { margin-top: 22px; }
        .section h2 {
          margin: 0 0 10px;
          font-size: 16px;
          letter-spacing: -0.01em;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 12px;
        }
        .tile {
          padding: 14px 16px;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }
        .tile .label {
          color: #9ca3af;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-bottom: 4px;
          display: block;
        }
        .tile .value {
          font-size: 15px;
          font-weight: 600;
          color: #f3f4f6;
          word-break: break-word;
        }
        .tile.ok { border-color: rgba(34, 197, 94, 0.35); }
        .tile.warn { border-color: rgba(239, 68, 68, 0.45); }
        .log {
          margin-top: 12px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(0, 0, 0, 0.35);
          border: 1px dashed rgba(255, 255, 255, 0.12);
          color: #cbd5e1;
          font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
          font-size: 13px;
          line-height: 1.4;
          white-space: pre-wrap;
        }
        .summary {
          margin-top: 18px;
          padding: 16px 18px;
          border-radius: 14px;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 10px;
          background: ${allGood ? "rgba(34, 197, 94, 0.12)" : "rgba(239, 68, 68, 0.12)"};
          color: ${allGood ? "#34d399" : "#fca5a5"};
          border: 1px solid ${allGood ? "rgba(34, 197, 94, 0.4)" : "rgba(239, 68, 68, 0.4)"};
        }
        @media (max-width: 640px) {
          body { padding: 16px; }
          .card { padding: 20px 18px; }
          h1 { font-size: 22px; }
        }
      </style>
    </head>
    <body>
      <div class="card">
        <div class="header">
          <div>
            <h1>Assistant Backend - Status</h1>
            <p class="subtitle">API de assistente virtual em execução</p>
          </div>
          <span class="status-badge">
            <span class="dot"></span>
            STATUS: ${statusText}
          </span>
        </div>

        <div class="section">
          <h2>Ambiente</h2>
          <div class="grid">
            <div class="tile">
              <span class="label">Porta</span>
              <span class="value">${PORT}</span>
            </div>
            <div class="tile">
              <span class="label">NODE_ENV</span>
              <span class="value">${process.env.NODE_ENV || "development"}</span>
            </div>
            <div class="tile">
              <span class="label">Data/Hora</span>
              <span class="value">${now.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</span>
            </div>
            <div class="tile">
              <span class="label">Node</span>
              <span class="value">${process.version}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Serviços & Integrações</h2>
          <div class="grid">
            <div class="tile ${mongoOk ? "ok" : "warn"}">
              <span class="label">MongoDB</span>
              <span class="value">${mongoLabel}${mongoOk ? " ✅" : mongoState === 2 ? " ⏳" : " ❌"}</span>
            </div>
            <div class="tile ${openaiConfigured ? "ok" : "warn"}">
              <span class="label">OpenAI API</span>
              <span class="value">${openaiConfigured ? "Configurada" : "Não configurada"}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>Resumo rápido</h2>
          <div class="log">
Servidor iniciado com sucesso.
Aguardando requisições na porta ${PORT}.
${mongoOk ? "MongoDB conectado." : `MongoDB ${mongoLabel.toLowerCase()}.`}
${openaiConfigured ? "OpenAI pronta para uso." : "OpenAI não configurada."}
          </div>
        </div>

        <div class="summary">
          ${allGood ? "Tudo certo! Backend em operação normal." : "Há problemas detectados na configuração do backend. Verifique os itens em vermelho acima."}
        </div>
      </div>
    </body>
  </html>`;

  return res.send(html);
});

if (!IS_VERCEL) {
  async function startServer() {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`[Server] Rodando na porta ${PORT}`);
    });
  }

  startServer().catch((err) => {
    console.error("[Server] Erro ao iniciar:", err?.message || err);
  });
}

export default app;
