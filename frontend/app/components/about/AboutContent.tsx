"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { assets, infoList, toolsData } from "@/assets/assets";
import { ArrowRight } from "lucide-react";

// Variants consistentes
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function AboutContent() {
  return (
    <main id="main-content" className="w-full px-6 md:px-[12%] py-24">
      {/* JSON-LD Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Lenon Alexandre",
            jobTitle: "Desenvolvedor Full Stack",
            url: "https://www.seudominio.com/about",
            image: "/profile-img.png",
            address: { "@type": "PostalAddress", addressCountry: "BR", addressLocality: "Rio de Janeiro" },
            knowsAbout: ["Next.js", "React", "TailwindCSS", "Framer Motion", "SEO", "UX/UI", "Web Performance"],
            sameAs: [
              "https://www.seudominio.com",
              "https://www.linkedin.com/in/lenonalexandre"
            ],
          }),
        }}
      />

      {/* HERO */}
      <section aria-label="Apresentacao" className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
          <div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Ola, eu sou o <span className="text-blue-600 dark:text-white">Lenon Alexandre</span>
            </h1>
            <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
              Desenvolvedor <strong className="text-gray-900 dark:text-white">Full Stack</strong> no Brasil, especializado em
              <span className="font-medium"> Next.js, React, TailwindCSS</span> e animacoes com <span className="font-medium">Framer Motion</span>.
              Construo interfaces acessiveis, performaticas e preparadas para <strong>SEO tecnico</strong>, com foco em
              usabilidade e escalabilidade para negocios reais.
            </p>

            {/* Badges rapidas */}
            <ul className="mt-6 flex flex-wrap gap-3 text-sm">
              {["UX  Performance  SEO", "Next.js  React", "Tailwind  Motion"].map((b, i) => (
                <li
                  key={i}
                  className="px-3 py-1 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-gray-800 dark:text-gray-200"
                >
                  {b}
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/services"
                aria-label="Ver Portfolio"
                className="inline-flex items-center gap-2 font-medium px-6 py-2.5 rounded-full border transition
                border-gray-400 dark:border-white/60 bg-white dark:bg-black text-gray-900 dark:text-white
                hover:bg-gray-50 dark:hover:bg-white/10"
              >
                Ver Portfolio
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/contact"
                aria-label="Falar comigo"
                className="inline-flex items-center gap-2 font-medium px-6 py-2.5 rounded-full border transition
                border-gray-900 bg-black text-white hover:opacity-90 dark:border-white/20 dark:bg-white dark:text-black"
              >
                Falar comigo
              </Link>
            </div>
          </div>

          {/* Foto */}
          <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <Image src={assets.profile_img} alt="Foto de perfil de Lenon Alexandre" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* RESUMO / METRICAS */}
      <motion.section
        id="resumo"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16"
        aria-label="Resumo profissional"
      >
        {infoList.map((box, i) => (
          <motion.div
            key={i}
            variants={item}
            className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-white dark:bg-black shadow-sm"
          >
            <div className="flex items-center gap-3">
              <Image src={box.icon} alt="" className="w-8 dark:hidden" />
              <Image src={box.iconDark} alt="" className="w-8 hidden dark:block" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{box.title}</h3>
            </div>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{box.description}</p>

            {/* micro-copy SEO amigavel */}
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Projetos focados em Core Web Vitals, boas praticas de acessibilidade e descoberta organica.
            </p>
          </motion.div>
        ))}
      </motion.section>

      {/* HISTORICO / TIMELINE (ficticia) */}
      <motion.section
        id="trajetoria"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="mb-16"
        aria-label="Trajetoria profissional"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Trajetoria</h2>
        <div className="relative pl-6">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
          {[
            {
              title: "Freelancer - Produtos digitais",
              period: "2023 - atual",
              desc: "Criacao de landing pages, dashboards e e-commerces com Next.js, integracoes e SEO tecnico.",
            },
            {
              title: "Estudos avancados - React & Performance",
              period: "2022 - 2023",
              desc: "Foco em SSR/SSG, otimizacao de imagens, roteamento App Router, UX e animacoes profissionais.",
            },
            {
              title: "Primeiros projetos - UI/UX & Frontend",
              period: "2021 - 2022",
              desc: "Interfaces responsivas, design system inicial e acessibilidade como base.",
            },
          ].map((row, i) => (
            <motion.div key={i} variants={item} className="mb-6">
              <div className="absolute -left-1.5 mt-1 w-3 h-3 rounded-full bg-blue-600 dark:bg-white"></div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{row.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{row.period}</p>
              <p className="mt-1 text-gray-700 dark:text-gray-300">{row.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* STACK / FERRAMENTAS */}
      <motion.section
        id="ferramentas"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        aria-label="Ferramentas e stack"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-5">Ferramentas & Stack</h2>
        <p className="max-w-3xl text-gray-600 dark:text-gray-400 mb-6">
          Trabalho com uma base moderna para agilizar entregas e manter a qualidade do codigo. Abaixo, parte das
          ferramentas que utilizo no dia a dia para criar experiencias rapidas, acessiveis e escalaveis.
        </p>

        <div className="flex flex-wrap gap-6 content-visibility-auto">
          {toolsData.map((tool, i) => (
            <motion.div
              key={i}
              variants={item}
              className="w-16 h-16 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-sm p-3 flex items-center justify-center"
            >
              <Image src={tool} alt={`Ferramenta ${i + 1}`} width={44} height={44} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA FINAL */}
      <section className="mt-16">
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-medium px-6 py-2.5 rounded-full border transition
            border-gray-400 dark:border-white/60 bg-white dark:bg-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10"
            aria-label="Ver servicos"
          >
            Ver servicos
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 font-medium px-6 py-2.5 rounded-full border transition
            border-gray-900 bg-black text-white hover:opacity-90 dark:border-white/20 dark:bg-white dark:text-black"
            aria-label="Iniciar contato"
          >
            Iniciar contato
          </Link>
        </div>
      </section>
    </main>
  );
}
