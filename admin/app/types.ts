export type HeroConfig = {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaUrl: string;
  heroImagePath: string;
};

export type ServiceConfig = {
  titulo: string;
  descricao: string;
  icone: string;
  destaque: boolean;
};

export type ProdutoConfig = {
  nome: string;
  descricaoCurta: string;
  preco: string;
  imagemPath: string;
  ctaLabel: string;
  ctaUrl: string;
  ativo: boolean;
};

export type ContatoConfig = {
  whatsapp: string;
  email: string;
  telefone: string;
  endereco: string;
  instagramUrl: string;
  facebookUrl: string;
  tiktokUrl: string;
  linkedinUrl: string;
};

export type CtasGeraisConfig = {
  botaoPrincipalHeaderLabel: string;
  botaoPrincipalHeaderUrl: string;
  botaoPrincipalFooterLabel: string;
  botaoPrincipalFooterUrl: string;
};

export type SobreConfig = {
  titulo: string;
  descricao: string;
  imagemPath: string;
};

export type SiteContent = {
  hero: HeroConfig;
  servicos: ServiceConfig[];
  produtosDestaque: ProdutoConfig[];
  contato: ContatoConfig;
  ctasGerais: CtasGeraisConfig;
  sobre: SobreConfig;
};
