import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    primaryCtaLabel: String,
    primaryCtaUrl: String,
    secondaryCtaLabel: String,
    secondaryCtaUrl: String,
    heroImagePath: String,
  },
  { _id: false }
);

const serviceItemSchema = new mongoose.Schema(
  {
    titulo: String,
    descricao: String,
    icone: String,
    destaque: { type: Boolean, default: false },
  },
  { _id: false }
);

const produtoItemSchema = new mongoose.Schema(
  {
    nome: String,
    descricaoCurta: String,
    preco: String,
    imagemPath: String,
    ctaLabel: String,
    ctaUrl: String,
    ativo: { type: Boolean, default: true },
  },
  { _id: false }
);

const contatoSchema = new mongoose.Schema(
  {
    whatsapp: String,
    email: String,
    telefone: String,
    endereco: String,
    instagramUrl: String,
    facebookUrl: String,
    tiktokUrl: String,
    linkedinUrl: String,
  },
  { _id: false }
);

const ctasGeraisSchema = new mongoose.Schema(
  {
    botaoPrincipalHeaderLabel: String,
    botaoPrincipalHeaderUrl: String,
    botaoPrincipalFooterLabel: String,
    botaoPrincipalFooterUrl: String,
  },
  { _id: false }
);

const siteContentSchema = new mongoose.Schema(
  {
    hero: heroSchema,
    servicos: [serviceItemSchema],
    produtosDestaque: [produtoItemSchema],
    contato: contatoSchema,
    ctasGerais: ctasGeraisSchema,
    sobre: {
      titulo: String,
      descricao: String,
      imagemPath: String,
    },
  },
  { timestamps: true }
);

export const SiteContent =
  mongoose.models.SiteContent || mongoose.model("SiteContent", siteContentSchema);
