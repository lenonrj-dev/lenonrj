"use client";

import Link from "next/link";
import React, { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: "easeOut" },
  }),
};

type HeaderProps = { isDarkMode: boolean };

const Header = ({ isDarkMode }: HeaderProps) => {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <motion.header
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      aria-labelledby="hero-heading"
      className="w-11/12 max-w-5xl text-center mx-auto min-h-[80vh] md:min-h-screen flex flex-col items-center justify-center gap-6 px-4"
    >
      <motion.p
        variants={textVariants}
        custom={0.15}
        className="flex items-center justify-center gap-2 text-base md:text-lg font-medium text-gray-700 dark:text-gray-300"
      >
        Oi! Eu sou{" "}
        <span className="font-bold text-blue-600 dark:text-white">Lenon Alexandre da Cunha</span>
      </motion.p>

      <motion.h1
        id="hero-heading"
        variants={textVariants}
        custom={0.35}
        className="text-3xl sm:text-5xl lg:text-[64px] font-extrabold leading-tight text-gray-900 dark:text-white"
      >
        Desenvolvedor Full Stack no Brasil{" "}
        <span className="text-blue-600 dark:text-white">| Frontend & Backend</span>
      </motion.h1>

      <motion.p
        variants={textVariants}
        custom={0.55}
        className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed"
      >
        Do Rio de Janeiro, com{" "}
        <strong className="text-gray-900 dark:text-white">2+ anos de experiência</strong> em
        projetos de alta performance. Eu uno{" "}
        <span className="text-blue-600 dark:text-white font-medium">UX/UI, Frontend e Backend</span>{" "}
        para criar soluções modernas, acessíveis e escaláveis com Next.js, React e TailwindCSS.
      </motion.p>

      <motion.ul
        variants={textVariants}
        custom={0.7}
        className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs"
        role="list"
      >
        {["Core Web Vitals", "Acessibilidade AA", "SEO técnico + JSON-LD", "Framer Motion"].map((b) => (
          <li
            key={b}
            className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-700 dark:text-gray-300"
          >
            {b}
          </li>
        ))}
      </motion.ul>

      <motion.div
        variants={textVariants}
        custom={0.85}
        className="flex flex-col sm:flex-row items-center gap-4 mt-6"
      >
        <Link
          href="/contact"
          onMouseMove={handleMouseMove}
          className={`hidden lg:flex items-center gap-2 font-medium px-8 py-2.5 rounded-full ml-4 relative overflow-hidden border transition
            ${isDarkMode ? "border-white/60 bg-white text-black" : "border-gray-400 hover:bg-white/80 hover:text-blue-600 bg-white text-black"}`}
          style={
            isDarkMode
              ? {
                  boxShadow:
                    "0 0 20px rgba(255,255,255,1), 0 0 40px rgba(255,255,255,0.9), 0 0 60px rgba(255,255,255,0.8)",
                  background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,1) 20%, rgba(245,245,245,0.9) 50%, rgba(230,230,230,0.7) 80%)`,
                  animation: "pulseGlow 2s infinite ease-in-out",
                }
              : {}
          }
          aria-label="Ir para a página de contato"
        >
          Falar sobre seu projeto
          <ArrowRight className="h-4 w-4 relative z-10" aria-hidden="true" />
        </Link>

        <Link
          href="/services"
          className="inline-flex items-center gap-2 font-medium px-8 py-2.5 rounded-full border transition
                     border-gray-900 bg-black text-white hover:opacity-90 dark:border-white/20 dark:bg-white dark:text-black"
          aria-label="Ver portfólio"
        >
          Ver portfólio
        </Link>
      </motion.div>

      <motion.nav
        variants={textVariants}
        custom={1.0}
        className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm"
        aria-label="Atalhos do herói"
      >
        <a href="#services" className="underline-offset-2 hover:underline text-gray-700 dark:text-gray-300">
          Serviços
        </a>
        <span className="text-gray-400"></span>
        <a href="#work" className="underline-offset-2 hover:underline text-gray-700 dark:text-gray-300">
          Projetos
        </a>
        <span className="text-gray-400"></span>
        <a href="#about" className="underline-offset-2 hover:underline text-gray-700 dark:text-gray-300">
          Sobre
        </a>
      </motion.nav>

      <style jsx>{`
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.9),
                        0 0 40px rgba(255, 255, 255, 0.7),
                        0 0 60px rgba(255, 255, 255, 0.6);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 255, 255, 1),
                        0 0 60px rgba(255, 255, 255, 0.9),
                        0 0 90px rgba(255, 255, 255, 0.8);
          }
          100% {
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.9),
                        0 0 40px rgba(255, 255, 255, 0.7),
                        0 0 60px rgba(255, 255, 255, 0.6);
          }
        }
      `}</style>
    </motion.header>
  );
};

export default Header;
