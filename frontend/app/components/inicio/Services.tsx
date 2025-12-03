"use client";

import { serviceData } from "@/assets/assets";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.25 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type ServicesProps = {
  isDarkMode?: boolean;
};

export default function Services(_props: ServicesProps = {}) {
  return (
    <motion.section
      id="services"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
      className="w-full px-6 md:px-[12%] py-20 scroll-mt-20"
      aria-label="Serviços profissionais"
    >
      {/* Subtítulo */}
      <motion.h4
        variants={cardVariants}
        className="text-center mb-3 text-lg font-semibold text-blue-600 dark:text-white/90"
      >
        O que eu posso fazer por você
      </motion.h4>

      <motion.h2
        variants={cardVariants}
        className="text-center text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white"
      >
        Serviços Profissionais de Desenvolvimento
      </motion.h2>

      {/* Descrição SEO */}
      <motion.p
        variants={cardVariants}
        className="text-center max-w-3xl mx-auto mt-6 mb-12 text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed"
      >
        Como <strong className="text-gray-900 dark:text-white">Desenvolvedor Full Stack</strong>, entrego soluções de{" "}
        <span className="font-medium text-blue-600 dark:text-white">UI/UX</span>,{" "}
        <span className="font-medium text-blue-600 dark:text-white">Frontend</span>,{" "}
        <span className="font-medium text-blue-600 dark:text-white">Backend</span> e{" "}
        <span className="font-medium text-blue-600 dark:text-white">SEO técnico</span> com Next.js, React e Tailwind.
        Foco em performance, acessibilidade e escalabilidade.
      </motion.p>

      {/* Grid de Serviços */}
      <motion.ul
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        role="list"
      >
        {serviceData.map(({ icon, title, description, link }, index) => (
          <motion.li key={index} variants={cardVariants} role="listitem">
            <article
              className="group h-full border border-gray-200 dark:border-gray-700 rounded-2xl p-8
                         bg-white dark:bg-black shadow-sm hover:shadow-xl transition focus-within:shadow-xl"
              style={{ contentVisibility: "auto" }}
            >
              {/* Icone */}
              <div className="mb-4">
                <Image
                  src={icon}
                  alt=""
                  aria-hidden="true"
                  className="w-12 h-12"
                />
              </div>

              {/* Título + descrição */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
              </p>

              {/* Badges de valor (UX/SEO/Perf) */}
              <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
                {["UX acessível", "SEO técnico", "Alta performance"].map((b) => (
                  <span
                    key={b}
                    className="px-2 py-0.5 rounded-full border border-gray-300 dark:border-gray-700
                               text-gray-700 dark:text-gray-300"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 flex items-center gap-3">
                {link ? (
                  <Link
                    href={link}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 rounded-full"
                    aria-label={`Saiba mais sobre ${title}`}
                  >
                    Saiba mais
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                ) : (
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-white hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/50 rounded-full"
                    aria-label={`Solicitar ${title}`}
                  >
                    Solicitar proposta
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </article>
          </motion.li>
        ))}
      </motion.ul>

      {/* Processo em 3 etapas */}
      <motion.section
        variants={containerVariants}
        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        aria-label="Processo de trabalho"
      >
        {[
          { t: "1. Descoberta", d: "Briefing, objetivos, público, conteúdo e requisitos técnicos." },
          { t: "2. Design & Dev", d: "Fluxos, UI/UX, implementação, integrações e testes." },
          { t: "3. Go Live & SEO", d: "Deploy, métricas (CWV), monitoramento e melhorias contínuas." },
        ].map((s, i) => (
          <motion.div
            key={i}
            variants={cardVariants}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-black shadow-sm"
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{s.t}</h4>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{s.d}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* CTA final */}
      <motion.div variants={cardVariants} className="mt-12 text-center">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-900 bg-black text-white
                     hover:opacity-90 dark:border-white/20 dark:bg-white dark:text-black transition"
          aria-label="Falar sobre seu projeto"
        >
          Falar sobre seu projeto
        </Link>
      </motion.div>
    </motion.section>
  );
}
