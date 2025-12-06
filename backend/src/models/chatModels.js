import mongoose from "mongoose";

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

export const ChatSession = mongoose.models.ChatSession || mongoose.model("ChatSession", chatSessionSchema);
export const ChatMessage = mongoose.models.ChatMessage || mongoose.model("ChatMessage", chatMessageSchema);
