"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Se usar Cloudinary, lembre de liberar em next.config.mjs:
 * images: { remotePatterns: [{ protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' }] }
 */

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.08, staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const tabs = [
  { key: "all", label: "Tudo" },
  { key: "website", label: "Website" },
  { key: "ecommerce", label: "E-commerce" },
  { key: "blog", label: "Blog" },
  { key: "landing-page", label: "Landing Page" },
];

export default function PortfolioContent() {
  //  Troque pelos seus links reais (Cloudinary/URLs)
  const projects = useMemo(
    () => [
      {
        title: "Refine CRM (Website)",
        description: "Interface modular com foco em conversao e SEO tecnico.",
        image: "https://res.cloudinary.com/demo/image/upload/v1690000000/sample.jpg",
        category: "website",
        demo: "https://sua-demo-1.com",
      },
      {
        title: "StoreX (E-commerce)",
        description: "Checkout otimizado, vitrine dinamica e metricas.",
        image: "https://res.cloudinary.com/demo/image/upload/v1690000001/sample.jpg",
        category: "ecommerce",
        demo: "https://sua-demo-2.com",
      },
      {
        title: "TechNotes (Blog)",
        description: "Blog tecnico com geracao estatica e busca.",
        image: "https://res.cloudinary.com/demo/image/upload/v1690000002/sample.jpg",
        category: "blog",
      },
      {
        title: "LaunchIt (Landing Page)",
        description: "Landing de lancamento com A/B de hero e CTA.",
        image: "https://res.cloudinary.com/demo/image/upload/v1690000003/sample.jpg",
        category: "landing-page",
      },
      // adicione mais
    ],
    []
  );

  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(6);

  const filtered = useMemo(() => {
    let out = active === "all" ? projects : projects.filter((p) => p.category === active);
    if (query.trim()) {
      const q = query.toLowerCase();
      out = out.filter((p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return out;
  }, [projects, active, query]);

  useEffect(() => setVisible(6), [active, query]);
  const list = filtered.slice(0, visible);
  const canLoadMore = filtered.length > visible;
  const featured = list.slice(0, 2);
  const others = list.slice(2);

  return (
    <main id="main-content" className="w-full px-6 md:px-[12%] py-24 bg-white dark:bg-black">
      {/* JSON-LD bsico */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Portfolio - Lenon Alexandre",
            description: "Projetos Website, E-commerce, Blog e Landing Page.",
            hasPart: projects.map((p) => ({
              "@type": "CreativeWork",
              name: p.title,
              about: p.description,
              genre: p.category,
              image: p.image,
              url: p.demo || undefined,
            })),
          }),
        }}
      />

      {/* ====== CONTAINER PAI (estilo carto grande com barra de apps/tab no topo) ====== */}
      <section
        className="
          rounded-[28px] p-3 sm:p-4
          ring-1 ring-gray-200/70 dark:ring-white/10
          shadow-[0_2px_40px_-8px_rgba(0,0,0,0.15)]
          bg-gray-50/70 dark:bg-neutral-900
        "
      >
        {/* TOP BAR: aplicaes/tabs (comportamento e layout do screenshot) */}
        <div
          role="tablist"
          aria-label="Categorias de projetos"
          className="
            rounded-[20px] px-2 py-1.5
            bg-white/70 dark:bg-black/50
            ring-1 ring-gray-200 dark:ring-white/10
            flex items-center gap-1.5 overflow-x-auto
          "
        >
          {tabs.map((t) => {
            const activeTab = active === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={activeTab}
                onClick={() => setActive(t.key)}
                className={`
                  relative px-4 py-2 rounded-[14px] text-sm
                  transition
                  ${activeTab
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-white/5"}
                `}
              >
                {t.label}
              </button>
            );
          })}

          {/* search embutida na barra (como no UI de exemplo) */}
          <div className="ml-auto hidden md:flex items-center gap-2">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar"
                className="
                  w-56 pl-9 pr-3 py-2 text-sm rounded-[14px]
                  bg-white dark:bg-black text-gray-900 dark:text-white
                  ring-1 ring-gray-200 dark:ring-white/10 outline-none
                  focus:ring-2 focus:ring-blue-600/40
                "
              />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400"></span>
            </div>
          </div>
        </div>

        {/* CONTEDO INTERNO (quadro branco como no mock) */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={container}
          className="
            mt-4 sm:mt-5
            rounded-[20px] p-4 sm:p-6
            bg-white dark:bg-black
            ring-1 ring-gray-200 dark:ring-white/10
          "
        >
          {/* Header mini dentro do container */}
          <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                {active === "all" ? "Todos os projetos" : tabs.find((t) => t.key === active)?.label}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filtered.length} resultado{filtered.length !== 1 && "s"}  animacoes com Framer Motion
              </p>
            </div>

            {/* Busca (fallback mobile) */}
            <div className="md:hidden">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar"
                className="
                  w-full pl-3 pr-3 py-2 text-sm rounded-[12px]
                  bg-white dark:bg-black text-gray-900 dark:text-white
                  ring-1 ring-gray-200 dark:ring-white/10 outline-none
                  focus:ring-2 focus:ring-blue-600/40
                "
              />
            </div>
          </motion.div>

          {/* FEATURED (2 cartes horizontais 16:9) */}
          {featured.length > 0 && (
            <motion.div
              variants={container}
              className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5"
              aria-label="Destaques"
            >
              {featured.map((p, i) => (
                <motion.article
                  key={`feat-${p.title}-${i}`}
                  variants={item}
                  className="
                    relative aspect-[16/9] overflow-hidden rounded-2xl
                    ring-1 ring-gray-200 dark:ring-white/10
                    shadow-sm hover:shadow-xl transition
                    bg-white dark:bg-black
                  "
                  style={{ contentVisibility: "auto" }}
                >
                  <Image
                    src={p.image}
                    alt={`Projeto ${p.title}`}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 50vw, 100vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="flex items-end justify-between gap-3">
                      <div>
                        <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                        <p className="text-white/85 text-sm mt-1">{p.description}</p>
                        <div className="mt-2 flex gap-2 text-[11px] text-white/90">
                          <span className="px-2 py-0.5 rounded-full ring-1 ring-white/30">{p.category}</span>
                          <span className="px-2 py-0.5 rounded-full ring-1 ring-white/30">UX  Performance</span>
                        </div>
                      </div>
                      {p.demo ? (
                        <Link
                          href={p.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black hover:opacity-90 transition"
                          aria-label={`Ver demo de ${p.title}`}
                        >
                          Ver demo
                          <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* GRID dos demais (com hover info) */}
          {others.length > 0 && (
            <motion.div
              variants={container}
              className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              aria-label="Galeria"
            >
              {others.map((p, i) => (
                <motion.article
                  key={`grid-${p.title}-${i}`}
                  variants={item}
                  className="
                    group relative aspect-square overflow-hidden rounded-2xl
                    ring-1 ring-gray-200 dark:ring-white/10
                    bg-white dark:bg-black shadow-sm hover:shadow-lg transition
                  "
                  style={{ contentVisibility: "auto" }}
                >
                  <Image
                    src={p.image}
                    alt={`Projeto ${p.title}`}
                    fill
                    className="object-cover"
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute bottom-0 inset-x-0 p-4">
                      <h4 className="text-white font-semibold">{p.title}</h4>
                      <p className="text-white/85 text-xs mt-1 line-clamp-2">{p.description}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}

          {/* Footer do contedo: carregar mais + CTA */}
          <motion.div variants={item} className="mt-8 flex items-center justify-center gap-4">
            {canLoadMore && (
              <button
                onClick={() => setVisible((v) => v + 6)}
                className="
                  px-6 py-2.5 rounded-full
                  bg-white dark:bg-black text-gray-900 dark:text-white
                  ring-1 ring-gray-200 dark:ring-white/10
                  hover:bg-gray-50 dark:hover:bg-white/10 transition
                "
              >
                Carregar mais
              </button>
            )}
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
            >
              Iniciar um projeto
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Barra de logos (fora do container principal, como seo de confiana) */}
      <section className="mt-14 rounded-2xl p-6 sm:p-8 bg-gray-50/70 dark:bg-neutral-900 ring-1 ring-gray-200 dark:ring-white/10">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">Confiado por desenvolvedores e empresas</p>
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-80">
          {["oracle", "intel", "jpm", "autodesk", "ibm", "cisco"].map((l) => (
            <div key={l} className="h-10 rounded bg-gray-200 dark:bg-neutral-800" />
          ))}
        </div>
      </section>
    </main>
  );
}
