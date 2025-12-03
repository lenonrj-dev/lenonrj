"use client";
import { useState } from "react";

export default function GlowButton({ children, className = "", ...props }) {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  return (
    <button
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      className={`inline-flex items-center gap-2 font-medium px-8 py-2.5 rounded-full border transition
      border-gray-400 dark:border-white/60 bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 relative overflow-hidden ${className}`}
      style={{
        ...(typeof document !== "undefined" && document.documentElement.classList.contains("dark")
          ? {
              boxShadow: "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.8)",
              background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,1) 20%, rgba(245,245,245,0.9) 50%, rgba(230,230,230,0.7) 80%)`,
              animation: "pulseGlow 2s infinite ease-in-out",
            }
          : {}),
      }}
      {...props}
    >
      {children}
      <style jsx>{`
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 15px rgba(255,255,255,.7), 0 0 30px rgba(255,255,255,.6), 0 0 45px rgba(255,255,255,.5); }
          50% { box-shadow: 0 0 25px rgba(255,255,255,1), 0 0 50px rgba(255,255,255,.9), 0 0 70px rgba(255,255,255,.8); }
          100% { box-shadow: 0 0 15px rgba(255,255,255,.7), 0 0 30px rgba(255,255,255,.6), 0 0 45px rgba(255,255,255,.5); }
      `}</style>
    </button>
  );
}
