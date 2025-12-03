import type { Metadata } from "next";
import SiteChrome from "../components/layout/SiteChrome";
import ServicesContent from "../components/services/ServicesContent";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.seudominio.com";

export const metadata: Metadata = {
  title: "Servicos | Lenon Alexandre - Desenvolvimento Web",
  description:
    "Servicos profissionais em UI/UX, Frontend, Backend e SEO tecnico com Next.js, React, Tailwind e Framer Motion.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Servicos | Lenon Alexandre",
    description: "Solucoes completas em desenvolvimento web com foco em performance, acessibilidade e SEO.",
    url: `${siteUrl}/services`,
    siteName: "Lenon Dev",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Servicos | Lenon Alexandre",
    description: "UI/UX, Frontend, Backend e automacoes com Next.js e React.",
  },
};

export default function ServicesPage() {
  return (
    <SiteChrome>
      <ServicesContent />
    </SiteChrome>
  );
}
