import type { Metadata } from "next";
import PortfolioContent from "../components/portfolio/PortfolioContent";
import SiteChrome from "../components/layout/SiteChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.seudominio.com";

export const metadata: Metadata = {
  title: "Portfolio | Lenon Alexandre - Projetos Recentes",
  description: "Projetos de Frontend e Backend com Next.js, React e Tailwind.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio | Lenon Alexandre",
    description: "Selecao de cases com foco em usabilidade, performance e SEO.",
    url: `${siteUrl}/portfolio`,
    siteName: "Lenon Dev",
    images: [{ url: "/work-2.png", width: 1200, height: 630, alt: "Portfolio" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Lenon Alexandre",
    description: "Frontend e Backend com Next.js e React.",
    images: ["/work-2.png"],
  },
};

export default function PortfolioPage() {
  return (
    <SiteChrome>
      <PortfolioContent />
    </SiteChrome>
  );
}
