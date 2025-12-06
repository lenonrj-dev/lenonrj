import cors from "cors";

const allowedOrigins = [
  "https://lenonrj.dev",
  "https://www.lenonrj.dev",
  "http://localhost:3000",
  "http://localhost:3001", // admin local
  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
].map((o) => o.replace(/\/$/, ""));

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // mesma origem / server-to-server
    const clean = origin.replace(/\/$/, "");
    if (allowedOrigins.includes(clean)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

export const corsMiddleware = cors(corsOptions);
