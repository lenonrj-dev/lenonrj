'use client';
import Link from "next/link";
import React, { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Mail, MessageCircle } from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  }),
};

type ContactProps = { isDarkMode: boolean };

const Contact = ({ isDarkMode }: ContactProps) => {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      id="contact"
      className="w-full px-6 md:px-[12%] py-16 scroll-mt-20 bg-white dark:bg-black/80"
      aria-label="Chamada para contato"
    >
      <motion.h1
        variants={fadeInUp}
        custom={0.2}
        className="text-center text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
      >
        Vamos construir algo incrível
      </motion.h1>

      <motion.h2
        variants={fadeInUp}
        custom={0.35}
        className="text-center text-lg md:text-xl font-medium text-gray-600 mt-3 dark:text-gray-300"
      >
        Produtos digitais com performance, acessibilidade e SEO técnico
      </motion.h2>

      <motion.p
        variants={fadeInUp}
        custom={0.5}
        className="text-center max-w-3xl mx-auto mt-6 text-gray-700 dark:text-gray-400 leading-relaxed"
      >
        Sou desenvolvedor <strong className="text-gray-900 dark:text-white">Full Stack</strong> focado em{" "}
        <span className="font-medium">Next.js, React, TailwindCSS</span> e{" "}
        <span className="font-medium">Framer Motion</span>. Do conceito ao deploy, entrego interfaces modernas,
        escaláveis e fáceis de manter, com atenção aos <em>Core Web Vitals</em>, acessibilidade e melhores práticas de SEO.
      </motion.p>

      <motion.ul
        variants={fadeInUp}
        custom={0.65}
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
      >
        {[
          "UX sólida e acessível (AA)",
          "SEO técnico + JSON-LD",
          "Animações profissionais",
          "Performance e escalabilidade",
        ].map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-4 shadow-sm"
          >
            <CheckCircle className="h-5 w-5 text-blue-600" aria-hidden="true" />
            <span className="text-sm text-gray-800 dark:text-gray-200">{item}</span>
          </li>
        ))}
      </motion.ul>

      {/* Mini badges (tech stack) */}
      <motion.div
        variants={fadeInUp}
        custom={0.8}
        className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs"
      >
        {["Next.js", "React", "TailwindCSS", "Framer Motion", "Core Web Vitals", "App Router"].map((b) => (
          <span
            key={b}
            className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-700 dark:text-gray-300"
          >
            {b}
          </span>
        ))}
      </motion.div>

      {/* CTAs */}
      <motion.div
        variants={fadeInUp}
        custom={0.95}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        {/* Boto Glow  /contact */}
        <Link
          href="/contact"
          onMouseMove={handleMouseMove}
          className="flex items-center gap-2 font-medium px-8 py-3 rounded-full relative overflow-hidden border transition w-fit"
          style={
            isDarkMode
              ? {
                  border: "1px solid rgba(255,255,255,0.6)",
                  color: "black",
                  background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,1) 20%, rgba(245,245,245,0.9) 50%, rgba(230,230,230,0.7) 80%)`,
                  boxShadow:
                    "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.8)",
                  animation: "pulseGlow 2s infinite ease-in-out",
                }
            : {}
          }
          aria-label="Abrir página de contato"
        >
          Falar sobre o seu projeto
          <ArrowRight className="h-4 w-4 relative z-10" aria-hidden="true" />
        </Link>

        {/* CTA secundrias */}
        <a
          href="mailto:lenon.contato.dev.co@gmail.com"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-400 dark:border-white/60 bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition"
          aria-label="Enviar email"
        >
          Email
          <Mail className="h-4 w-4" aria-hidden="true" />
        </a>

        <a
          href="https://wa.me/5524998482188"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-900 bg-black text-white hover:opacity-90 dark:border-white/20 dark:bg-white dark:text-black transition"
          aria-label="Abrir WhatsApp"
        >
          WhatsApp
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
        </a>
      </motion.div>

      {/* Keyframes para o glow (s usado no dark) */}
      <style jsx>{`
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.7),
              0 0 30px rgba(255, 255, 255, 0.6),
              0 0 45px rgba(255, 255, 255, 0.5);
          }
          50% {
            box-shadow: 0 0 25px rgba(255, 255, 255, 1),
              0 0 50px rgba(255, 255, 255, 0.9),
              0 0 70px rgba(255, 255, 255, 0.8);
          }
          100% {
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.7),
              0 0 30px rgba(255, 255, 255, 0.6),
              0 0 45px rgba(255, 255, 255, 0.5);
          }
        }
      `}</style>
    </motion.section>
  );
};

export default Contact;
