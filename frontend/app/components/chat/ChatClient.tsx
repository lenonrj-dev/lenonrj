"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";

const FloatingAiAssistant = dynamic(
  () => import("./FloatingAiAssistant").then((mod) => mod.FloatingAiAssistant),
  { ssr: false }
);

export default function ChatClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(<FloatingAiAssistant />, document.body);
}
