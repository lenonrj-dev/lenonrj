"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { assets } from "@/assets/assets";

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const contactHref = ({ service, budget = "", source = "services" }) =>
  `/contact?service=${encodeURIComponent(service)}&budget=${encodeURIComponent(budget)}&source=${encodeURIComponent(
    source
  )}`;

export default function ServicesContent() {
  const services = [
    {
      icon: assets.web_icon,
      title: "Saas B2B",
      pitch:
        "Produtos SaaS com autenticacao, billing, onboarding guiado e dashboards claros. Prontos para escalar com o time comercial.",
      bullets: ["Auth + Billing", "Onboarding/Trial", "Dashboards em tempo real"],
      badge: "Full-stack SaaS",
      budget: "+15000",
    },
    {
      icon: assets.mobile_icon,
      title: "Ecommerce",
      pitch:
        "Lojas online performaticas com checkout otimizado, SEO tecnico e integracoes com meios de pagamento e ERP.",
      bullets: ["Checkout otimizado", "Integracoes gateway/ERP", "Catalogo headless"],
      badge: "Conversao",
      budget: "7000-15000",
    },
    {
      icon: assets.ui_icon,
      title: "Web Sites",
      pitch:
        "Sites institucionais leves e acessiveis, pensados para SEO e marca. Estruturacao clara e responsiva.",
      bullets: ["SEO tecnico", "Acessibilidade", "Core Web Vitals"],
      badge: "Institucional",
      budget: "3000-7000",
    },
    {
      icon: assets.graphics_icon,
      title: "Landing Pages",
      pitch:
        "Landing pages de conversao com copy direta, testes A/B e integracoes de leads. Focadas em performance.",
      bullets: ["Copy orientada a acao", "Testes A/B", "Integracoes de leads"],
      badge: "Growth",
      budget: "3000-7000",
    },
    {
      icon: assets.mobile_icon,
      title: "Dashboards",
      pitch:
        "Paineis e CRMs com KPIs em tempo real, filtros e permissoes. Dados confiaveis para times de operacoes.",
      bullets: ["KPIs em tempo real", "Perfis/ACL", "Exportacoes e alertas"],
      badge: "Business Data",
      budget: "7000-15000",
    },
    {
      icon: assets.ui_icon,
      title: "Blog App",
      pitch:
        "Blogs headless com editor amigavel, SEO tecnico e carregamento rapido. Ideal para conteudo e aquisicao.",
      bullets: ["Editor simplificado", "SEO tecnico", "CDN + imagens otimizadas"],
      badge: "Conteudo",
      budget: "3000-7000",
    },
  ];

  const demos = [
    {
      name: "Saas B2B ApplicationX",
      desktopImg: "https://res.cloudinary.com/dlwclcbsj/image/upload/v1764844364/Automa%C3%A7%C3%A3o_vhl6pq.png",
      demo: "https://ai-ateliux.vercel.app/",
      tags: ["Dashboard", "APIs", "Clusters Analytics", "SEO Saas Design", "Checkout"],
    },
    {
      name: "Blog ApplicationX",
      desktopImg: "https://res.cloudinary.com/dlwclcbsj/image/upload/v1765026484/Screenshot_19_j49bol.png",
      demo: "https://www.ateliux.blog/",
      tags: ["Dashboard", "APIs", "Clusters Analytics", "SEO Blog Design"],
    },
    {
      name: "WebSite AteliuX",
      desktopImg: "https://res.cloudinary.com/dlwclcbsj/image/upload/v1764844365/Institucional_fcqvev.png",
      demo: "https://ateliux-app.vercel.app/",
      tags: ["Site Institucional", "Checkout", "SEO"],
    },
    {
      name: "DevOps Analytics",
      desktopImg: "https://res.cloudinary.com/dlwclcbsj/image/upload/v1764844363/DevOps_gci7qe.png",
      demo: "https://ateliux-devops.vercel.app/dashboard/overview",
      tags: ["Dashboard", "APIs", "Clusters Analytics"],
    },
    {
      name: "Landing Page StoreX",
      desktopImg: "https://res.cloudinary.com/dlwclcbsj/image/upload/v1764844365/Landing_Page_ddogk5.png",
      demo: "https://marima-athleisure.vercel.app/",
      tags: ["Landing Page", "Checkout", "SEO"],
    },
    {
      name: "CRM Analytics",
      desktopImg: "https://res.cloudinary.com/dlwclcbsj/image/upload/v1764844365/ecommerce_pqbmpj.png",
      demo: "https://ateliux-manager-ecommerce.vercel.app/dashboard",
      tags: ["Dashboard", "KPIs", "Filtros"],
    },
    {
      name: "Loja StoreX",
      desktopImg: "https://res.cloudinary.com/dlwclcbsj/image/upload/v1764877248/Screenshot_8_qvffjj.png",
      demo: "https://www.usemarima.com/",
      tags: ["E-commerce", "Checkout", "SEO"],
    },
  ];

  return (
    <main id="main-content" className="w-full px-6 md:px-[12%] py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Servicos de Desenvolvimento Web",
            provider: { "@type": "Person", name: "Lenon Alexandre" },
            areaServed: "Brasil",
            serviceType: ["Saas B2B", "Ecommerce", "Web Sites", "Landing Pages", "Dashboards", "Blog App"],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Como iniciamos o projeto",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Comecamos com triagem de lead (objetivos, prazo e orcamento), alinhamos o escopo, prototipamos e seguimos para implementacao, QA e publicacao.",
                },
              },
              {
                "@type": "Question",
                name: "Voce faz SEO e performance",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Sim. Metadata, JSON-LD, Core Web Vitals, otimizacao de imagens, cache, acessibilidade e monitoramento continuo.",
                },
              },
              {
                "@type": "Question",
                name: "Quais integracoes sao comuns",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Pagamentos, CRM, email marketing, ERPs, analytics, autenticacao e APIs REST/GraphQL.",
                },
              },
            ],
          }),
        }}
      />

      <header className="text-center mb-12">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight">Servicos</h1>
        <p className="max-w-3xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
          Solucoes modernas com Next.js, React, Tailwind e Framer Motion: SaaS B2B, Ecommerce, Sites, Landing Pages,
          Dashboards e Blog App - do design ao deploy, com foco em performance, UX e SEO.
        </p>
      </header>

      {/* Cards de Servico */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        aria-label="Lista de servicos"
      >
        {services.map((s, i) => (
          <motion.article
            key={`${s.title}-${i}`}
            variants={item}
            className="
              group relative rounded-2xl p-7
              bg-white dark:bg-black
              ring-1 ring-gray-200 dark:ring-white/10
              shadow-sm hover:shadow-xl transition
              hover:-translate-y-0.5
            "
          >
            <div className="flex items-center gap-3">
              <Image src={s.icon} alt="" className="w-10 h-10" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{s.title}</h2>
                <div className="mt-1 inline-flex items-center gap-2 text-[11px]">
                  <span className="px-2 py-0.5 rounded-full ring-1 ring-gray-300 dark:ring-gray-700 text-gray-600 dark:text-gray-300">
                    {s.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-full ring-1 ring-gray-300 dark:ring-gray-700 text-gray-600 dark:text-gray-300">
                    {s.budget === "+15000" ? "Enterprise" : "Projeto"}
                  </span>
                </div>
              </div>
            </div>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{s.pitch}</p>

            <ul className="mt-4 grid grid-cols-1 gap-2 text-sm text-gray-700 dark:text-gray-200">
              {s.bullets.map((b, bi) => (
                <li key={bi} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-gray-900 dark:bg-white" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              <Link
                href={contactHref({ service: s.title, budget: s.budget })}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                           bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
                aria-label={`Solicitar ${s.title}`}
              >
                Solicitar proposta
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>

              <Link
                href={contactHref({ service: s.title, budget: s.budget, source: "services-quick" })}
                className="text-sm underline text-gray-700 dark:text-gray-300"
              >
                Falar sobre {s.title}
              </Link>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-3">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">A+</div>
                <div className="text-[11px] text-gray-500">Acessibilidade</div>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-3">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">90+</div>
                <div className="text-[11px] text-gray-500">Lighthouse</div>
              </div>
              <div className="rounded-xl bg-gray-50 dark:bg-neutral-900 p-3">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">SEO</div>
                <div className="text-[11px] text-gray-500">Pronto p/ indexar</div>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.section>

      {/* Processo & Qualificacao */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mt-16 rounded-2xl p-6 sm:p-8 bg-white dark:bg-black ring-1 ring-gray-200 dark:ring-white/10"
      >
        <motion.h2 variants={item} className="text-2xl font-bold text-gray-900 dark:text-white">
          Processo e qualificacao de projeto
        </motion.h2>
        <motion.p variants={item} className="mt-2 text-gray-600 dark:text-gray-400">
          Triagem rapida para entender objetivos, prazos e orcamento e propor a melhor arquitetura.
        </motion.p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-5">
          {[
            { t: "1) Briefing", d: "Contexto, metas, publico, integracoes e riscos." },
            { t: "2) Arquitetura", d: "Definicao de pilares: dados, auth, pipelines, deploy." },
            { t: "3) Prototipo", d: "Fluxos UX e telas chave com animacoes." },
            { t: "4) Execucao", d: "Entrega por sprints, QA, monitoramento e Go Live." },
          ].map((et, i) => (
            <motion.div key={i} variants={item} className="rounded-xl p-5 bg-gray-50 dark:bg-neutral-900">
              <h3 className="font-semibold text-gray-900 dark:text-white">{et.t}</h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{et.d}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/contact?intent=lead-qualification"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          >
            Qualificar meu projeto
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <span className="text-sm text-gray-600 dark:text-gray-400">Tempo medio de resposta: 24 a 48h uteis.</span>
        </div>
      </motion.section>

      {/* Apps & Demos */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mt-16"
      >
        <motion.h2 variants={item} className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Apps & Demos
        </motion.h2>
        <motion.p variants={item} className="text-gray-600 dark:text-gray-400 mb-6">
          Visualizacao realista para desktop - clique para abrir a demo.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {demos.map((d, i) => (
            <motion.article key={i} variants={item} className="space-y-4">
              <div className="rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 bg-white dark:bg-black overflow-hidden">
                <div className="flex items-center gap-1 px-4 h-9 bg-gray-100 dark:bg-neutral-900">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  <div className="ml-3 text-xs text-gray-500 dark:text-gray-400 truncate">{d.name} Desktop</div>
                </div>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={d.desktopImg}
                    alt={`${d.name} desktop`}
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4"
                  >
                    <Link
                      href={d.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 text-black hover:opacity-90 transition"
                    >
                      Ver demo
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={container}
        className="mt-16"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Perguntas frequentes</h2>
        <div className="divide-y divide-gray-200 dark:divide-gray-800 rounded-2xl ring-1 ring-gray-200 dark:ring-white/10 bg-white dark:bg-black">
          {[
            {
              q: "Quais metricas voces acompanham apos o Go Live",
              a: "Core Web Vitals, erros (Sentry), logs e vazao, analytics e conversao. Ajustes continuos para manter a qualidade.",
            },
            {
              q: "Voces entregam handoff organizado",
              a: "Sim. Documentacao, Design System (tokens) e scripts de setup. Processo pronto para evoluir.",
            },
            {
              q: "Qual a diferenca entre landing e site institucional",
              a: "Landing e focada em uma conversao ou acao. O institucional aborda mais paginas, conteudos e navegacao completa.",
            },
          ].map((f, i) => (
            <motion.details key={i} variants={item} className="p-5">
              <summary className="cursor-pointer text-gray-900 dark:text-white font-medium">{f.q}</summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* CTA final */}
      <section className="mt-16 text-center">
        <Link
          href="/contact?intent=quote"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full
                     bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
          aria-label="Solicitar oramento"
        >
          Solicitar orcamento
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </section>
    </main>
  );
}
