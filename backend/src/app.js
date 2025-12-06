import express from "express";
import dotenv from "dotenv";
import { corsMiddleware } from "./config/cors.js";
import { connectToDatabase, getMongoStatus } from "./config/db.js";
import assistantRouter from "./routes/assistant.js";
import contactRouter from "./routes/contact.js";
import siteContentRouter from "./routes/siteContent.js";
import { getCloudinarySignature } from "./services/cloudinary.js";
import { OPENAI_KEY } from "./services/openaiClient.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(corsMiddleware);
app.options("*", corsMiddleware);
app.use(express.json({ limit: "1mb" }));

app.use("/api/assistant", assistantRouter);
app.use("/api/contact", contactRouter);
app.use("/api/site-content", siteContentRouter);

app.post("/api/cloudinary/signature", (req, res) => {
  const data = getCloudinarySignature(req.body?.folder);
  if (!data.signature) {
    return res.status(500).json({ error: "Cloudinary não configurado." });
  }
  return res.json(data);
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

export default app;
