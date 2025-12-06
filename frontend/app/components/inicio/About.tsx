"use client";

import React from "react";
import { infoList, toolsData } from "@/assets/assets";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type AboutProps = { isDarkMode: boolean };

const About = ({ isDarkMode }: AboutProps) => {
  return (
    <motion.section
      id="about"
      aria-label="Sobre mim"
      className="w-full px-6 sm:px-10 lg:px-[12%] py-20 scroll-mt-20 bg-white dark:bg-black"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <motion.h2
        variants={item}
        className="text-center mb-2 text-2xl sm:text-3xl font-semibold font-Ovo tracking-tight text-gray-900 dark:text-white"
      >
        Desenvolvimento Web & UX Estrategico
      </motion.h2>

      <motion.h3
        variants={item}
        className="text-center text-4xl sm:text-5xl lg:text-6xl font-Ovo font-bold leading-tight text-gray-900 dark:text-white"
      >
        Sobre Mim
      </motion.h3>

      <motion.p
        variants={item}
        className="mt-8 max-w-3xl mx-auto text-center text-lg leading-relaxed font-Ovo text-gray-700 dark:text-white/80"
      >
        Desenvolvo <strong>sites tecnologicos, performaticos e responsivos</strong>, de{" "}
        <strong>e-commerces</strong> e <strong>sites institucionais</strong> a{" "}
        <strong>aplicativos mobile</strong>, com foco em <strong>UX/UI</strong>, acessibilidade e{" "}
        <em>Core Web Vitals</em>, usando <strong>React, Next.js e TailwindCSS</strong> com animacoes profissionais em Framer Motion.
      </motion.p>

      <motion.ul
        variants={container}
        role="list"
        className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto"
      >
        {[
          { n: "20+", l: "Projetos concluidos" },
          { n: "2+ anos", l: "Experiencia pratica" },
          { n: "100%", l: "Foco em acessibilidade" },
        ].map(({ n, l }, i) => (
          <motion.li
            variants={item}
            key={i}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-6 py-5 text-center shadow-sm"
            style={{ contentVisibility: "auto" }}
          >
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{n}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{l}</div>
          </motion.li>
        ))}
      </motion.ul>

      <motion.div
        variants={item}
        className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start"
      >
        <motion.ul variants={container} role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {infoList.map(({ icon, iconDark, title, description }, index) => (
            <motion.li key={index} variants={item}>
              <article
                className="h-full rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-6 shadow-sm hover:shadow-lg transition"
                style={{ contentVisibility: "auto" }}
              >
                <div className="flex items-center gap-3">
                  <Image
                    src={isDarkMode ? iconDark : icon}
                    alt=""
                    aria-hidden="true"
                    className="w-8 h-8"
                  />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h4>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{description}</p>
                <div className="mt-3 inline-flex flex-wrap gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                  <span className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-700">
                    Qualidade de codigo
                  </span>
                  <span className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-700">
                    Performance
                  </span>
                </div>
              </article>
            </motion.li>
          ))}
        </motion.ul>

        <motion.aside
          variants={container}
          className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black shadow-sm"
        >
          <div className="p-7">
            <motion.h4 variants={item} className="text-xl font-semibold text-gray-900 dark:text-white">
              Principais Ferramentas & Tecnologias
            </motion.h4>
            <motion.p variants={item} className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Stack moderna para entregar rapido, com qualidade e escalabilidade.
            </motion.p>

            <motion.ul variants={container} role="list" className="mt-6 grid grid-cols-4 sm:grid-cols-5 gap-4">
              {toolsData.map((tool, index) => (
                <motion.li
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.06 }}
                  className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-3 shadow-sm transition"
                  style={{ contentVisibility: "auto" }}
                >
                  <Image
                    src={tool}
                    alt=""
                    aria-hidden="true"
                    width={40}
                    height={40}
                    className="w-8 h-8 object-contain"
                  />
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={item} className="mt-6 flex flex-wrap gap-2 text-[11px]">
              {["Next.js", "React", "TailwindCSS", "Framer Motion", "App Router", "Core Web Vitals"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                >
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </motion.aside>
      </motion.div>

      <motion.div variants={item} className="mt-12 text-center">
        <a
          href="/services"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-900 bg-black text-white
                     hover:opacity-90 dark:border-white/20 dark:bg-white dark:text-black transition"
          aria-label="Ver portfolio"
        >
          Ver portfolio
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </motion.div>
    </motion.section>
  );
};

export default About;
