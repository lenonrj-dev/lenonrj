import type { Metadata } from "next";
import PrivacyContent from "../components/privacy/PrivacyContent";
import SiteChrome from "../components/layout/SiteChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.seudominio.com";

export const metadata: Metadata = {
  title: "Politica de Privacidade | Lenon Alexandre",
  description: "Entenda como os dados enviados pelo site sao usados e protegidos.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/privacidade" },
  openGraph: {
    title: "Politica de Privacidade | Lenon Alexandre",
    description: "Informacoes sobre coleta, uso e protecao de dados neste portfolio.",
    url: `${siteUrl}/privacidade`,
    siteName: "Lenon Dev",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Politica de Privacidade | Lenon Alexandre",
    description: "Como tratamos e protegemos suas informacoes.",
  },
};

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <PrivacyContent lastUpdated="2025-10-18" />
    </SiteChrome>
  );
}
