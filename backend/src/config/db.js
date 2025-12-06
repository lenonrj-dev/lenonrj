import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB || "assistant-db";

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
