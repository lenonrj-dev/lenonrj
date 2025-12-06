 "use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { HeroConfig, ServiceConfig, ProdutoConfig, ContatoConfig, CtasGeraisConfig, SiteContent, SobreConfig } from "./types";

const API_URL =
  process.env.NEXT_PUBLIC_CONTENT_API || "http://localhost:4000/api/site-content";
const ADMIN_TOKEN = process.env.NEXT_PUBLIC_ADMIN_TOKEN || "@lenonrj.dev";

type TabKey = "hero" | "servicos" | "produtos" | "contato" | "sobre" | "ctas";

const skeletonCard =
  "rounded-2xl border border-gray-200/70 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-sm p-5";

export default function DashboardContent() {
  const [data, setData] = useState<SiteContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState<TabKey>("hero");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchContent = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Falha ao carregar conteúdo");
      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err?.message || "Erro ao carregar conteúdo");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (partial: Partial<SiteContent>) => {
    if (!ADMIN_TOKEN) {
      setError("Defina NEXT_PUBLIC_ADMIN_TOKEN no admin para salvar.");
      return;
    }
    try {
      setSaving(true);
      setError("");
      setSuccess("");
      const payload = { ...data, ...partial };
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-token": ADMIN_TOKEN,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || "Falha ao salvar");
      }
      const saved = await res.json();
      setData(saved);
      setSuccess("Alterações salvas com sucesso.");
    } catch (err: any) {
      setError(err?.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  const updateHero = (field: keyof HeroConfig, value: string) =>
    data && setData({ ...data, hero: { ...data.hero, [field]: value } });

  const updateContato = (field: keyof ContatoConfig, value: string) =>
    data && setData({ ...data, contato: { ...data.contato, [field]: value } });

  const updateSobre = (field: keyof SobreConfig, value: string) =>
    data && setData({ ...data, sobre: { ...data.sobre, [field]: value } });

  const updateCtas = (field: keyof CtasGeraisConfig, value: string) =>
    data && setData({ ...data, ctasGerais: { ...data.ctasGerais, [field]: value } });

  const tabs = useMemo(
    () => [
      { key: "hero" as TabKey, label: "Hero & CTAs" },
      { key: "servicos" as TabKey, label: "Serviços" },
      { key: "produtos" as TabKey, label: "Produtos Destaque" },
      { key: "contato" as TabKey, label: "Contato & Redes" },
      { key: "sobre" as TabKey, label: "Sobre" },
      { key: "ctas" as TabKey, label: "CTAs Gerais" },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-900 dark:from-black dark:to-neutral-900 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-6 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Admin</p>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard de Conteúdo</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Atualize hero, serviços, produtos, contato e CTAs. Para salvar, defina o token admin na variável
            NEXT_PUBLIC_ADMIN_TOKEN.
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  tab === t.key
                    ? "bg-blue-600 text-white border-blue-600 shadow"
                    : "border-slate-300/70 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/5"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </header>

        {loading && <div className="p-4 rounded-xl bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10">Carregando...</div>}
        {error && <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-700 dark:border-red-500/40 dark:bg-red-900/30">Erro: {error}</div>}
        {success && <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-900/30">{success}</div>}

        {!data ? null : (
          <div className="space-y-6">
            {tab === "hero" && (
              <section className={skeletonCard}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Hero & CTA Principal</h2>
                  <button
                    onClick={() => handleSave({ hero: data.hero })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <label className="text-sm space-y-1">
                    <span>Título</span>
                    <input
                      value={data.hero?.title || ""}
                      onChange={(e) => updateHero("title", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1">
                    <span>Subtítulo</span>
                    <input
                      value={data.hero?.subtitle || ""}
                      onChange={(e) => updateHero("subtitle", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1">
                    <span>CTA primário (label)</span>
                    <input
                      value={data.hero?.primaryCtaLabel || ""}
                      onChange={(e) => updateHero("primaryCtaLabel", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1">
                    <span>CTA primário (URL)</span>
                    <input
                      value={data.hero?.primaryCtaUrl || ""}
                      onChange={(e) => updateHero("primaryCtaUrl", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1">
                    <span>CTA secundário (label)</span>
                    <input
                      value={data.hero?.secondaryCtaLabel || ""}
                      onChange={(e) => updateHero("secondaryCtaLabel", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1">
                    <span>CTA secundário (URL)</span>
                    <input
                      value={data.hero?.secondaryCtaUrl || ""}
                      onChange={(e) => updateHero("secondaryCtaUrl", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1 md:col-span-2">
                    <span>Imagem (URL Cloudinary)</span>
                    <input
                      value={data.hero?.heroImagePath || ""}
                      onChange={(e) => updateHero("heroImagePath", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                </div>
                {data.hero?.heroImagePath ? (
                  <div className="mt-4 flex gap-3 items-center">
                    <div className="relative h-28 w-48 overflow-hidden rounded-xl border border-slate-200 dark:border-white/10">
                      <Image src={data.hero.heroImagePath} alt="Preview hero" fill className="object-cover" />
                    </div>
                    <p className="text-xs text-slate-500">Pré-visualização (lazy)</p>
                  </div>
                ) : null}
              </section>
            )}

            {tab === "servicos" && (
              <section className={skeletonCard}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Serviços</h2>
                  <button
                    onClick={() => handleSave({ servicos: data.servicos })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {data.servicos?.map((srv, idx) => (
                    <div
                      key={`srv-${idx}`}
                      className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 grid gap-3 md:grid-cols-2"
                    >
                      <label className="text-sm space-y-1">
                        <span>Título</span>
                        <input
                          value={srv.titulo}
                          onChange={(e) => {
                            const clone = [...data.servicos];
                            clone[idx] = { ...srv, titulo: e.target.value };
                            setData({ ...data, servicos: clone });
                          }}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm space-y-1">
                        <span>Ícone (nome ou URL)</span>
                        <input
                          value={srv.icone}
                          onChange={(e) => {
                            const clone = [...data.servicos];
                            clone[idx] = { ...srv, icone: e.target.value };
                            setData({ ...data, servicos: clone });
                          }}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm space-y-1 md:col-span-2">
                        <span>Descrição</span>
                        <textarea
                          value={srv.descricao}
                          onChange={(e) => {
                            const clone = [...data.servicos];
                            clone[idx] = { ...srv, descricao: e.target.value };
                            setData({ ...data, servicos: clone });
                          }}
                          rows={2}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={srv.destaque}
                          onChange={(e) => {
                            const clone = [...data.servicos];
                            clone[idx] = { ...srv, destaque: e.target.checked };
                            setData({ ...data, servicos: clone });
                          }}
                        />
                        Destaque
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tab === "produtos" && (
              <section className={skeletonCard}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Produtos em Destaque</h2>
                  <button
                    onClick={() => handleSave({ produtosDestaque: data.produtosDestaque })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
                <div className="mt-4 space-y-4">
                  {data.produtosDestaque?.map((prod, idx) => (
                    <div
                      key={`prod-${idx}`}
                      className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 p-4 grid gap-3 md:grid-cols-2"
                    >
                      <label className="text-sm space-y-1">
                        <span>Nome</span>
                        <input
                          value={prod.nome}
                          onChange={(e) => {
                            const clone = [...data.produtosDestaque];
                            clone[idx] = { ...prod, nome: e.target.value };
                            setData({ ...data, produtosDestaque: clone });
                          }}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm space-y-1">
                        <span>Preço (texto)</span>
                        <input
                          value={prod.preco}
                          onChange={(e) => {
                            const clone = [...data.produtosDestaque];
                            clone[idx] = { ...prod, preco: e.target.value };
                            setData({ ...data, produtosDestaque: clone });
                          }}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm space-y-1 md:col-span-2">
                        <span>Descrição curta</span>
                        <textarea
                          value={prod.descricaoCurta}
                          onChange={(e) => {
                            const clone = [...data.produtosDestaque];
                            clone[idx] = { ...prod, descricaoCurta: e.target.value };
                            setData({ ...data, produtosDestaque: clone });
                          }}
                          rows={2}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm space-y-1">
                        <span>CTA label</span>
                        <input
                          value={prod.ctaLabel}
                          onChange={(e) => {
                            const clone = [...data.produtosDestaque];
                            clone[idx] = { ...prod, ctaLabel: e.target.value };
                            setData({ ...data, produtosDestaque: clone });
                          }}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm space-y-1">
                        <span>CTA URL</span>
                        <input
                          value={prod.ctaUrl}
                          onChange={(e) => {
                            const clone = [...data.produtosDestaque];
                            clone[idx] = { ...prod, ctaUrl: e.target.value };
                            setData({ ...data, produtosDestaque: clone });
                          }}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm space-y-1">
                        <span>Imagem (URL Cloudinary)</span>
                        <input
                          value={prod.imagemPath}
                          onChange={(e) => {
                            const clone = [...data.produtosDestaque];
                            clone[idx] = { ...prod, imagemPath: e.target.value };
                            setData({ ...data, produtosDestaque: clone });
                          }}
                          className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/5 px-3 py-2"
                        />
                      </label>
                      <label className="text-sm flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={prod.ativo}
                          onChange={(e) => {
                            const clone = [...data.produtosDestaque];
                            clone[idx] = { ...prod, ativo: e.target.checked };
                            setData({ ...data, produtosDestaque: clone });
                          }}
                        />
                        Ativo
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {tab === "contato" && (
              <section className={skeletonCard}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Contato & Redes</h2>
                  <button
                    onClick={() => handleSave({ contato: data.contato })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  {(
                    [
                      ["whatsapp", "WhatsApp (link ou número)"],
                      ["email", "Email"],
                      ["telefone", "Telefone"],
                      ["endereco", "Endereço"],
                      ["instagramUrl", "Instagram"],
                      ["facebookUrl", "Facebook"],
                      ["tiktokUrl", "TikTok"],
                      ["linkedinUrl", "LinkedIn"],
                    ] as [keyof ContatoConfig, string][]
                  ).map(([key, label]) => (
                    <label key={key} className="text-sm space-y-1">
                      <span>{label}</span>
                      <input
                        value={data.contato?.[key] || ""}
                        onChange={(e) => updateContato(key, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                      />
                    </label>
                  ))}
                </div>
              </section>
            )}

            {tab === "sobre" && (
              <section className={skeletonCard}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">Sobre</h2>
                  <button
                    onClick={() => handleSave({ sobre: data.sobre })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  <label className="text-sm space-y-1">
                    <span>Título</span>
                    <input
                      value={data.sobre?.titulo || ""}
                      onChange={(e) => updateSobre("titulo", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1 md:col-span-2">
                    <span>Descrição</span>
                    <textarea
                      value={data.sobre?.descricao || ""}
                      onChange={(e) => updateSobre("descricao", e.target.value)}
                      rows={3}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                  <label className="text-sm space-y-1 md:col-span-2">
                    <span>Imagem (URL Cloudinary)</span>
                    <input
                      value={data.sobre?.imagemPath || ""}
                      onChange={(e) => updateSobre("imagemPath", e.target.value)}
                      className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                    />
                  </label>
                </div>
              </section>
            )}

            {tab === "ctas" && (
              <section className={skeletonCard}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-semibold">CTAs Gerais</h2>
                  <button
                    onClick={() => handleSave({ ctasGerais: data.ctasGerais })}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white text-sm hover:opacity-90 disabled:opacity-50"
                    disabled={saving}
                  >
                    {saving ? "Salvando..." : "Salvar"}
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2 mt-4">
                  {(
                    [
                      ["botaoPrincipalHeaderLabel", "CTA header (label)"],
                      ["botaoPrincipalHeaderUrl", "CTA header (URL)"],
                      ["botaoPrincipalFooterLabel", "CTA footer (label)"],
                      ["botaoPrincipalFooterUrl", "CTA footer (URL)"],
                    ] as [keyof CtasGeraisConfig, string][]
                  ).map(([key, label]) => (
                    <label key={key} className="text-sm space-y-1">
                      <span>{label}</span>
                      <input
                        value={data.ctasGerais?.[key] || ""}
                        onChange={(e) => updateCtas(key, e.target.value)}
                        className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-white/70 dark:bg-white/5 px-3 py-2"
                      />
                    </label>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
