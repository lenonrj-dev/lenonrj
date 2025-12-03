"use client";

import dynamic from "next/dynamic";

const FloatingAiAssistant = dynamic(
  () => import("./FloatingAiAssistant").then((mod) => mod.FloatingAiAssistant),
  { ssr: false }
);

export function ChatMount() {
  return <FloatingAiAssistant />;
}
