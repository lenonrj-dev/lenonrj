'use client';

import { workData, type WorkItem } from "@/assets/assets";
import Image from "next/image";
import Link from "next/link";
import React, { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type WorkProps = {
  isDarkMode: boolean;
};

const Work = ({ isDarkMode }: WorkProps) => {
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <motion.section
      id="work"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full px-6 md:px-[12%] py-20 scroll-mt-20"
      aria-label="Projetos recentes"
    >
      <motion.h4
        variants={cardVariants}
        className="text-center mb-3 text-lg font-semibold text-blue-600 dark:text-white"
      >
        Meu Portfolio
      </motion.h4>

      <motion.h2
        variants={cardVariants}
        className="text-center text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white"
      >
        Projetos Recentes & Trabalhos Digitais
      </motion.h2>

      <motion.p
        variants={cardVariants}
        className="text-center max-w-3xl mx-auto mt-6 mb-14 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed"
      >
        Especialista em{" "}
        <strong className="text-gray-900 dark:text-white">desenvolvimento web full stack</strong>, crio experiencias que unem{" "}
        <span className="text-blue-600 dark:text-white font-medium">design moderno</span> e{" "}
        <span className="text-blue-600 dark:text-white font-medium">tecnologia avancada</span>. Foco em{" "}
        <strong>usabilidade, performance e escalabilidade</strong>.
      </motion.p>

      {/* Grid de Projetos */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
      >
        {workData.map((project: WorkItem, index) => (
          <motion.article
            key={`${project.title}-${index}`}
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            tabIndex={0}
            className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-sm hover:shadow-xl focus-within:shadow-xl transition"
            style={{ contentVisibility: "auto" }}
            aria-label={`Projeto: ${project.title}`}
          >
            {/* Imagem (Next/Image) */}
            <Image
              src={project.bgImage}
              alt={`Thumb do projeto ${project.title}`}
              fill
              className="object-cover"
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              priority={index < 2} // melhora LCP das primeiras
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition duration-500 flex items-end p-6">
              <div className="bg-white dark:bg-gray-900 w-full rounded-lg p-4 flex justify-between items-center shadow-lg">
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {project.description}
                  </p>
                  {/* Badges leves para SEO on-page */}
                  <div className="mt-2 flex gap-2 text-[11px]">
                    <span className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      UX & Performance
                    </span>
                    <span className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      Next.js & React
                    </span>
                  </div>
                </div>

                <Link
                  href={project.link || "#"}
                  aria-label={`Ver detalhes do projeto ${project.title}`}
                  className="border rounded-full border-gray-800 dark:border-gray-200 w-10 h-10 flex items-center justify-center hover:bg-white/60 hover:border-white/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* CTA pagina de contato */}
      <motion.div
        variants={cardVariants}
        className="mt-12 flex items-center justify-center"
      >
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
          aria-label="Ir para a pagina de contato"
        >
          Entre em contato
          <ArrowRight className="h-4 w-4 relative z-10" aria-hidden="true" />
        </Link>
      </motion.div>

      {/* Keyframes no Tailwind-in-JSX */}
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

export default Work;
