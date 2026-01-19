"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, Facebook, Github, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  projectType: string;
  budget: string;
  consent: boolean;
  company: string;
  _service: string;
  _source: string;
  _intent: string;
};

type ErrorsState = Partial<Record<keyof FormState | "submit", string>>;

// mapeia nomes vindos dos cards de servios -> valores do <select> projectType
const mapServiceToProjectType = (s = ""): FormState["projectType"] => {
  const n = s.toLowerCase();
  if (n.includes("e-commerce") || n.includes("ecommerce")) return "ecommerce";
  if (n.includes("dashboard") || n.includes("crm") || n.includes("saas")) return "dashboard";
  if (n.includes("mobile")) return "mobile";
  if (n.includes("site") || n.includes("landing")) return "website";
  if (n.includes("autom")) return "outro"; // automaes/integraes
  return "website";
};

const contactEndpoint =
  process.env.NEXT_PUBLIC_CONTACT_API ||
  (typeof window !== "undefined" && window.location.hostname === "localhost"
    ? "http://localhost:4000/api/contact"
    : "https://lenonrj-backend.vercel.app/api/contact");

export default function ContactContent() {
  const params = useSearchParams();
  const prefill = useMemo(
    () => ({
      service: params.get("service") || "",
      budget: params.get("budget") || "",
      source: params.get("source") || "",
      intent: params.get("intent") || "",
    }),
    [params]
  );

  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    projectType: "website",
    budget: "",
    consent: false,
    company: "", // honeypot
    // ocultos (no renderizados para o usurio)
    _service: "",
    _source: "",
    _intent: "",
  });

  // aplica mscara simples
  const phoneMask = useMemo<(v: string) => string>(
    () => (v: string) =>
      v
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{4})$/, "$1-$2")
        .slice(0, 15),
    []
  );

  // Y" Pr-preenche a partir da querystring (chamado ao abrir /contactuservice=...)
  useEffect(() => {
    const hasService = Boolean(prefill.service);
    const hasBudget = Boolean(prefill.budget);
    if (!hasService && !hasBudget && !prefill.intent && !prefill.source) return;

    setForm((f) => ({
      ...f,
      subject: hasService ? `Solicitacao: ${prefill.service}` : f.subject,
      projectType: hasService ? mapServiceToProjectType(prefill.service) : f.projectType,
      budget: hasBudget ? prefill.budget : f.budget,
      message:
        f.message ||
        (hasService
          ? `Ola! Tenho interesse em ${prefill.service}. Podemos conversar sobre prazos, escopo e referencias?`
          : f.message),
      _service: prefill.service,
      _source: prefill.source,
      _intent: prefill.intent,
    }));
  }, [prefill]);

  const validate = () => {
    const e: ErrorsState = {};
    if (!form.name.trim()) e.name = "Informe seu nome.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalido.";
    if (form.phone && form.phone.replace(/\D/g, "").length < 10) e.phone = "Telefone/WhatsApp incompleto.";
    if (!form.subject.trim()) e.subject = "Digite um assunto.";
    if (form.message.trim().length < 12) e.message = "Conte mais detalhes (minimo de 12 caracteres).";
    if (!form.budget) e.budget = "Selecione uma faixa de orcamento.";
    if (!form.consent) e.consent = "Aceite o aviso de privacidade.";
    if (form.company.trim().length > 0) e.company = "Spam detectado.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    if (form.company.trim().length > 0) return; // honeypot
    try {
      setLoading(true);
      const res = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          message: [
            form.message,
            form.projectType ? `\nTipo de projeto: ${form.projectType}` : "",
            form.budget ? `\nOrcamento: ${form.budget}` : "",
            form._service ? `\nServico: ${form._service}` : "",
            form._source ? `\nOrigem: ${form._source}` : "",
            form._intent ? `\nIntencao: ${form._intent}` : "",
          ]
            .filter(Boolean)
            .join(""),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Falha ao enviar.");
      }
      setSent(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        projectType: "website",
        budget: "",
        consent: false,
        company: "",
        _service: "",
        _source: "",
        _intent: "",
      });
      setErrors({});
      setTimeout(() => setSent(false), 4000);
    } catch (err: any) {
      setErrors({ submit: err?.message || "Falha ao enviar. Tente novamente em instantes." });
    } finally {
      setLoading(false);
    }
  };

  const clearPrefill = () =>
    setForm((f) => ({ ...f, _service: "", _source: "", _intent: "", budget: "", subject: "", message: "" }));

  return (
    <main id="main-content" className="w-full px-6 md:px-[12%] py-24 bg-white dark:bg-black">
      {/* JSON-LD ContactPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contato - Lenon Alexandre",
            url: "https://www.seudominio.com/contact",
            mainEntity: { "@type": "Person", name: "Lenon Alexandre", email: "mailto:lenon.contato.dev.co@gmail.com" },
          }),
        }}
      />
      {/* JSON-LD Organization + ContactPoint */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Lenon Dev",
            url: "https://www.seudominio.com",
            contactPoint: [
              {
                "@type": "ContactPoint",
                contactType: "customer support",
                email: "lenon.contato.dev.co@gmail.com",
                areaServed: "BR",
                availableLanguage: ["Portuguese", "English"],
              },
            ],
            sameAs: [
              "https://www.linkedin.com/in/lenonalexandre",
              "https://github.com/lenonrj-dev",
              "https://www.instagram.com/lenonrj.dev/",
              "https://www.facebook.com/profile.php?id=61584248518802",
            ],
          }),
        }}
      />

      {/* HERO */}
      <header className="text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">Contato</h1>
        <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
          Vamos conversar sobre seu projeto. Atuo do planejamento ao deploy, com foco em performance, acessibilidade e SEO tecnico.
          Respondo com objetividade e prazos claros.
        </p>
      </header>

      {/* Banner de pr-seleo (se veio de um card de servio) */}
      {(form._service || form._intent || form._source) && (
        <div className="mt-6 mx-auto max-w-4xl rounded-2xl p-4 bg-gray-50 dark:bg-neutral-900 ring-1 ring-gray-200 dark:ring-white/10 flex items-start justify-between gap-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <div><strong>Servico:</strong> {form._service || "-"}</div>
            <div><strong>Orcamento:</strong> {form.budget || "-"}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {form._source ? `Origem: ${form._source}` : ""} {form._intent ? `Intencao: ${form._intent}` : ""}
            </div>
          </div>
          <button
            onClick={clearPrefill}
            className="text-sm underline text-gray-700 dark:text-gray-300 shrink-0"
            aria-label="Limpar pre-selecao"
          >
            limpar
          </button>
        </div>
      )}

      {/* ACOES RAPIDAS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5"
        aria-label="Acoes rapidas"
      >
        {[
          {
            title: "Email",
            desc: "Prefere detalhar por escrito? Respondo em horario comercial.",
            href: "mailto:lenon.contato.dev.co@gmail.com",
            cta: "Enviar email",
            icon: <Mail className="h-5 w-5" aria-hidden="true" />,
          },
          {
            title: "WhatsApp",
            desc: "Mensagens rapidas, audio e anexos. Ideal para alinhamentos.",
            href: "https://wa.me/5524998482188",
            cta: "Abrir WhatsApp",
            icon: <MessageCircle className="h-5 w-5" aria-hidden="true" />,
          },
          {
            title: "Servicos",
            desc: "Veja projetos, processos e resultados antes de falarmos.",
            href: "/services",
            cta: "Ver servicos",
            icon: <ArrowUpRight className="h-4 w-4" aria-hidden="true" />,
          },
        ].map((card, i) => (
          <motion.article
            key={i}
            variants={item}
            className="rounded-2xl shadow-sm hover:shadow-lg transition bg-white dark:bg-black p-6"
          >
            <div className="flex items-center gap-2 text-gray-900 dark:text-white">
              {card.icon}
              <h2 className="text-lg font-semibold">{card.title}</h2>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{card.desc}</p>
            <Link
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel={card.href.startsWith("http") ? "noreferrer" : undefined}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium underline-offset-2 hover:underline"
              aria-label={card.cta}
            >
              {card.cta}
            </Link>
          </motion.article>
        ))}
      </motion.section>

      {/* REDES SOCIAIS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="mt-14"
        aria-label="Redes sociais"
      >
        <motion.h2 variants={item} className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          Conecte-se comigo
        </motion.h2>
        <motion.p variants={item} className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Acompanhe novidades tecnicas, estudos de caso e insights sobre desenvolvimento web.
        </motion.p>

        <motion.ul variants={container} role="list" className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              name: "LinkedIn",
              href: "https://www.linkedin.com/in/lenonalexandre",
              handle: "@lenonalexandre",
              desc: "Updates de carreira, bastidores e networking.",
              icon: <Linkedin className="h-6 w-6" aria-hidden="true" />,
            },
            {
              name: "GitHub",
              href: "https://github.com/lenonrj-dev",
              handle: "github.com/lenonrj-dev",
              desc: "Repositorios publicos, provas de conceito e libs.",
              icon: <Github className="h-6 w-6" aria-hidden="true" />,
            },
            {
              name: "Instagram",
              href: "https://www.instagram.com/lenonrj.dev/",
              handle: "@lenonrj.dev",
              desc: "Designs, animacoes e trechos de projetos.",
              icon: <Instagram className="h-6 w-6" aria-hidden="true" />,
            },
            {
              name: "Facebook",
              href: "https://www.facebook.com/profile.php?id=61584248518802",
              handle: "/lenonrj.dev",
              desc: "Publicacoes e contato direto pela pagina.",
              icon: <Facebook className="h-6 w-6" aria-hidden="true" />,
            },
          ].map((s) => (
            <motion.li key={s.name} variants={item}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-3 rounded-2xl p-5 shadow-sm hover:shadow-lg transition bg-white dark:bg-black"
                aria-label={`Abrir ${s.name}`}
              >
                <div className="text-gray-900 dark:text-white">{s.icon}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{s.handle}</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{s.desc}</p>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.section>

      {/* FORM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="mt-16"
        aria-label="Formulrio de contato"
      >
        <motion.h2 variants={item} className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          Envie uma mensagem
        </motion.h2>
        <motion.p variants={item} className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
          Compartilhe objetivo, prazo e referencias. Retorno com estimativa e proximos passos.
        </motion.p>

        <motion.form
          onSubmit={onSubmit}
          noValidate
          variants={item}
          className="mt-8 rounded-2xl p-8 shadow-sm hover:shadow-lg transition bg-white dark:bg-black"
        >
          <div className="sr-only" role="status" aria-live="polite">
            {loading ? "Enviando..." : sent ? "Mensagem enviada com sucesso." : ""}
          </div>

          {/* honeypot */}
          <input
            type="text"
            name="company"
            autoComplete="off"
            tabIndex={-1}
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="hidden"
          />
          {/* ocultos para manter contexto do clique do usurio */}
          <input type="hidden" name="_service" value={form._service} />
          <input type="hidden" name="_source" value={form._source} />
          <input type="hidden" name="_intent" value={form._intent} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="flex flex-col text-sm">
              <span className="text-gray-700 dark:text-gray-300 mb-1">Nome</span>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "err-name" : undefined}
                required
                className="px-4 py-2 rounded-xl bg-white dark:bg-black text-gray-900 dark:text-white outline-none ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-600/40"
                placeholder="Seu nome"
              />
              {errors.name && <span id="err-name" role="alert" className="mt-1 text-red-600 text-xs">{errors.name}</span>}
            </label>

            <label className="flex flex-col text-sm">
              <span className="text-gray-700 dark:text-gray-300 mb-1">Email</span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "err-email" : undefined}
                required
                className="px-4 py-2 rounded-xl bg-white dark:bg-black text-gray-900 dark:text-white outline-none ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-600/40"
                placeholder="voce@email.com"
              />
              {errors.email && <span id="err-email" role="alert" className="mt-1 text-red-600 text-xs">{errors.email}</span>}
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <label className="flex flex-col text-sm">
              <span className="text-gray-700 dark:text-gray-300 mb-1">WhatsApp/Telefone (opcional)</span>
              <input
                id="phone"
                name="phone"
                inputMode="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: phoneMask(e.target.value) })}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "err-phone" : undefined}
                className="px-4 py-2 rounded-xl bg-white dark:bg-black text-gray-900 dark:text-white outline-none ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-600/40"
                placeholder="(21) 99999-9999"
              />
              {errors.phone && <span id="err-phone" role="alert" className="mt-1 text-red-600 text-xs">{errors.phone}</span>}
            </label>

            <label className="flex flex-col text-sm">
              <span className="text-gray-700 dark:text-gray-300 mb-1">Assunto</span>
              <input
                id="subject"
                name="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? "err-subject" : undefined}
                required
                className="px-4 py-2 rounded-xl bg-white dark:bg-black text-gray-900 dark:text-white outline-none ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-600/40"
                placeholder="Ex.: Desenvolvimento de landing page"
              />
              {errors.subject && <span id="err-subject" role="alert" className="mt-1 text-red-600 text-xs">{errors.subject}</span>}
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <label className="flex flex-col text-sm">
              <span className="text-gray-700 dark:text-gray-300 mb-1">Tipo de projeto</span>
              <select
                id="projectType"
                name="projectType"
                value={form.projectType}
                onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                className="px-4 py-2 rounded-xl bg-white dark:bg-black text-gray-900 dark:text-white outline-none ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-600/40"
              >
                <option value="website">Website / Landing</option>
                <option value="ecommerce">E-commerce</option>
                <option value="dashboard">Dashboard / SaaS</option>
                <option value="mobile">App Mobile</option>
                <option value="outro">Outro</option>
              </select>
            </label>

            <label className="flex flex-col text-sm">
              <span className="text-gray-700 dark:text-gray-300 mb-1">Orçamento estimado</span>
              <select
                id="budget"
                name="budget"
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "err-budget" : undefined}
                required
                className="px-4 py-2 rounded-xl bg-white dark:bg-black text-gray-900 dark:text-white outline-none ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-600/40"
              >
                <option value="">Selecione</option>
                <option value="1000-3000">R$1.000 - R$3.000</option>
                <option value="3000-7000">R$3.000 - R$7.000</option>
                <option value="7000-15000">R$7.000 - R$15.000</option>
                <option value="+15000">Acima de R$15.000</option>
              </select>
              {errors.budget && <span id="err-budget" role="alert" className="mt-1 text-red-600 text-xs">{errors.budget}</span>}
            </label>
          </div>

          <label className="flex flex-col text-sm mt-4">
            <span className="text-gray-700 dark:text-gray-300 mb-1">Mensagem</span>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "err-message" : undefined}
              className="px-4 py-3 rounded-xl bg-white dark:bg-black text-gray-900 dark:text-white outline-none ring-1 ring-gray-300 dark:ring-gray-700 focus:ring-2 focus:ring-blue-600/40"
              placeholder="Conte brevemente sobre o objetivo, prazo e referencias"
            />
            {errors.message && <span id="err-message" role="alert" className="mt-1 text-red-600 text-xs">{errors.message}</span>}
          </label>

          <label className="mt-4 flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              id="consent"
              name="consent"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? "err-consent" : undefined}
              className="mt-1 h-4 w-4 rounded border-gray-300 dark:border-gray-700"
            />
            <span className="text-gray-700 dark:text-gray-300">
              Concordo em compartilhar meus dados para retorno deste contato, conforme a{" "}
              <Link href="/privacidade" className="underline">Politica de Privacidade</Link>.
            </span>
          </label>
          {errors.consent && <span id="err-consent" role="alert" className="mt-1 text-red-600 text-xs">{errors.consent}</span>}

          {errors.submit && <p role="alert" className="mt-4 text-sm text-red-600">{errors.submit}</p>}
          {sent && <p className="mt-4 text-sm text-green-600 dark:text-green-400">Mensagem enviada! Obrigado - retornarei em breve.</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex items-center gap-2 font-medium px-8 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition disabled:opacity-60"
            aria-busy={loading}
          >
            {loading ? "Enviando..." : "Enviar"}
            {!loading && <ArrowRight className="h-4 w-4" aria-hidden="true" />}
          </button>
        </motion.form>
      </motion.section>

      {/* FAQ */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="mt-16"
        aria-label="Perguntas frequentes"
      >
        <motion.h2 variants={item} className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          Perguntas Frequentes
        </motion.h2>
        <div className="mt-6">
          {[
            {
              q: "Qual o prazo medio de um website?",
              a: "Landing pages costumam levar de 1 a 2 semanas. Projetos maiores (e-commerce, SaaS) variam conforme integracoes, conteudo e aprovacoes.",
            },
            {
              q: "Trabalha com SEO tecnico?",
              a: "Sim. Metadata, JSON-LD, Core Web Vitals, performance (imagens, bundle, cache), arquitetura e acessibilidade fazem parte do processo.",
            },
            {
              q: "Quais tecnologias voce usa?",
              a: "Next.js, React, TailwindCSS, Framer Motion, integracoes com APIs REST/GraphQL, autenticacao e provedores de pagamento.",
            },
          ].map((f, i) => (
            <motion.details key={i} variants={item} className="group rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition bg-white dark:bg-black mt-2">
              <summary className="cursor-pointer font-medium text-gray-900 dark:text-white">{f.q}</summary>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{f.a}</p>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* Disponibilidade */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="mt-16"
        aria-label="Disponibilidade e localizacao"
      >
        <motion.h2 variants={item} className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
          Disponibilidade & Localizacao
        </motion.h2>
        <motion.p variants={item} className="max-w-3xl mx-auto mt-3 text-center text-sm text-gray-600 dark:text-gray-400">
          Baseado no Rio de Janeiro - Brasil (BRT). Atendo remotamente clientes no Brasil e exterior.
          Reunioes por Google Meet, Zoom ou WhatsApp, com agenda flexivel para fusos diferentes.
        </motion.p>
        <motion.div variants={item} className="mt-6 rounded-2xl p-6 shadow-sm bg-white dark:bg-black text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong className="text-gray-900 dark:text-white">Janela de atendimento:</strong> seg-sex, 9h as 18h (BRT).<br />
            <strong className="text-gray-900 dark:text-white">Idiomas:</strong> Portugues e Ingles.
          </p>
        </motion.div>
      </motion.section>

      {/* CTA FINAL */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        className="mt-16 text-center"
      >
        <motion.h2 variants={item} className="text-2xl font-semibold text-gray-900 dark:text-white">
          Pronto para comecar?
        </motion.h2>
        <motion.div variants={item} className="mt-4 flex items-center justify-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition"
            aria-label="Ver servicos"
          >
            Ver servicos
          </Link>
          <a
            href="mailto:lenon.contato.dev.co@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-black text-gray-900 dark:text-white ring-1 ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-white/10 transition"
            aria-label="Enviar email"
          >
            Enviar email
            <Mail className="h-4 w-4" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.section>
    </main>
  );
}
