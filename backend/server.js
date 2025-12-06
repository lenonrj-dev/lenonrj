import dotenv from "dotenv";
dotenv.config();

import app from "./src/app.js";
import { connectToDatabase } from "./src/config/db.js";

const PORT = process.env.PORT || 4000;
const IS_VERCEL = Boolean(process.env.VERCEL);

if (!IS_VERCEL) {
  async function start() {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`[Server] Rodando na porta ${PORT}`);
    });
  }

  start().catch((err) => {
    console.error("[Server] Erro ao iniciar:", err?.message || err);
  });
}

export default app;
