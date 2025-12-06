import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Body invalido" }, { status: 400 });
  const { sessionId, message, pagePath } = body;
  if (!sessionId || !message) {
    return NextResponse.json({ error: "Dados obrigatorios ausentes" }, { status: 400 });
  }

  const endpoint = process.env.ASSISTANT_BACKEND_URL || "http://localhost:4000/api/assistant/chat";
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, message, pagePath }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Assistant backend error:", err);
      return NextResponse.json({ error: "Falha ao consultar assistente" }, { status: 500 });
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Assistant proxy error:", error);
    return NextResponse.json({ error: "Erro ao acessar assistente" }, { status: 500 });
  }
}
