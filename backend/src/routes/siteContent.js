import express from "express";
import { SiteContent } from "../models/siteContent.js";
import { requireAdmin } from "../middleware/authAdmin.js";

const router = express.Router();

const DEFAULT_CONTENT = {
  hero: {
    title: "Construo experiências digitais",
    subtitle: "Sites, e-commerces, SaaS e dashboards com performance e SEO técnico.",
    primaryCtaLabel: "Falar comigo",
    primaryCtaUrl: "/contact",
    secondaryCtaLabel: "Ver serviços",
    secondaryCtaUrl: "/services",
    heroImagePath: "",
  },
  servicos: [
    { titulo: "SaaS B2B", descricao: "Auth, billing, dashboards e integrações.", icone: "saas", destaque: true },
    { titulo: "E-commerce", descricao: "Checkout otimizado, SEO e integrações.", icone: "ecommerce", destaque: true },
  ],
  produtosDestaque: [],
  contato: {
    whatsapp: "",
    email: "lenon.contato.dev.co@gmail.com",
    telefone: "",
    endereco: "",
    instagramUrl: "https://www.instagram.com/lenonrj.dev/",
    facebookUrl: "https://www.facebook.com/profile.php?id=61584248518802",
    tiktokUrl: "",
    linkedinUrl: "https://www.linkedin.com/in/lenonalexandre",
  },
  ctasGerais: {
    botaoPrincipalHeaderLabel: "Contato",
    botaoPrincipalHeaderUrl: "/contact",
    botaoPrincipalFooterLabel: "Enviar mensagem",
    botaoPrincipalFooterUrl: "/contact",
  },
  sobre: {
    titulo: "Sobre mim",
    descricao: "Sou Lenon, desenvolvedor full stack focado em performance, acessibilidade e SEO técnico.",
    imagemPath: "",
  },
};

router.get("/", async (_req, res) => {
  await import("../config/db.js").then((m) => m.connectToDatabase());
  const doc = await SiteContent.findOne();
  if (!doc) {
    return res.json(DEFAULT_CONTENT);
  }
  return res.json(doc);
});

router.put("/", requireAdmin, async (req, res) => {
  try {
    await import("../config/db.js").then((m) => m.connectToDatabase());
    const payload = req.body || {};
    const doc = await SiteContent.findOneAndUpdate({}, payload, { upsert: true, new: true });
    return res.status(200).json(doc);
  } catch (err) {
    console.error("[SiteContent] Erro ao atualizar:", err?.message || err);
    return res.status(500).json({ error: "Erro ao salvar configurações." });
  }
});

export default router;
