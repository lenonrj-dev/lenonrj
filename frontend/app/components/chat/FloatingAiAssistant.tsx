"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X, Bot } from "lucide-react";

type ChatMessage = {
  role: "assistant" | "user";
  content: string;
  createdAt: number;
};

const ASSISTANT_NAME = "Assistente Lenon";

const initialBotMessage: ChatMessage = {
  role: "assistant",
  content:
    "Ola. Sou a assistente virtual do Lenon. Posso ajudar com duvidas sobre sites, e-commerces, SaaS, dashboards ou landing pages que ele desenvolve. Como posso ajudar hoje?",
  createdAt: Date.now(),
};

export function FloatingAiAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId] = useState(() => `${Date.now()}-${Math.random().toString(16).slice(2)}`);
  const listRef = useRef<HTMLDivElement | null>(null);

  const endpoint = useMemo(() => {
    if (process.env.NEXT_PUBLIC_ASSISTANT_API) {
      return process.env.NEXT_PUBLIC_ASSISTANT_API;
    }
    const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
    return isLocal
      ? "http://localhost:4000/api/assistant/chat"
      : "https://lenonrj-backend.vercel.app/api/assistant/chat";
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setError(null);
    const userMsg: ChatMessage = { role: "user", content: text, createdAt: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          message: text,
          pagePath: typeof window !== "undefined" ? window.location.pathname : undefined,
        }),
      });
      if (!res.ok) {
        throw new Error("Erro na API");
      }
      const data = await res.json();
      const reply = data.reply || "Tive um problema tecnico para responder agora. Tente novamente em instantes.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply, createdAt: Date.now() }]);
    } catch {
      setError("Tive um problema tecnico para responder agora. Tente novamente em instantes.");
      setMessages((prev) => [...prev, { role: "assistant", content: "Nao consegui responder agora. Tente novamente.", createdAt: Date.now() }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] h-14 w-14 rounded-full bg-black text-white shadow-lg shadow-black/30 hover:scale-105 transition flex items-center justify-center"
        aria-label="Abrir assistente virtual"
      >
        <MessageCircle className="h-7 w-7" aria-hidden="true" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[9998] flex items-end justify-end px-4 pb-28 md:pb-32 pointer-events-none">
          <div className="pointer-events-auto w-full max-w-[360px] rounded-3xl border border-gray-200 bg-white text-gray-900 shadow-2xl overflow-hidden">
            <header className="flex items-center gap-3 px-5 py-4 border-b border-gray-200">
              <div className="h-11 w-11 rounded-full bg-black text-white flex items-center justify-center">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="flex-1 leading-tight">
                <p className="text-base font-semibold">{ASSISTANT_NAME}</p>
                <span className="text-xs text-gray-500">Online</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar chat"
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </header>

            <div
              className="h-[55vh] md:h-[58vh] overflow-y-auto px-5 py-4 space-y-4 bg-white"
              ref={listRef}
            >
              {messages.map((msg, idx) => {
                const isUser = msg.role === "user";
                return (
                  <div key={idx} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-5 py-3 text-sm leading-relaxed shadow-[0_4px_10px_rgba(0,0,0,0.08)] ${
                        isUser
                          ? "bg-black text-white"
                          : "bg-white text-gray-900 border border-gray-200"
                      }`}
                      style={{ wordBreak: "break-word" }}
                    >
                      {msg.content}
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span className="inline-flex h-2 w-2 rounded-full bg-gray-500 animate-pulse"></span>
                  <span className="inline-flex h-2 w-2 rounded-full bg-gray-500 animate-pulse delay-100"></span>
                  <span className="inline-flex h-2 w-2 rounded-full bg-gray-500 animate-pulse delay-200"></span>
                  <span className="ml-2">Assistente esta pensando...</span>
                </div>
              )}
              {error && <div className="text-xs text-red-500">{error}</div>}
            </div>

            <footer className="border-t border-gray-200 bg-white px-4 py-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 resize-none bg-transparent text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none"
                  rows={1}
                  disabled={isLoading}
                />
                <button
                  onClick={() => void handleSend()}
                  disabled={isLoading}
                  className="h-10 px-4 rounded-full bg-black text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? "Enviando..." : "Enviar"}
                  <Send className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
