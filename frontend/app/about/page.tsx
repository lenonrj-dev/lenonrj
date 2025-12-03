import type { Metadata } from "next";
import AboutContent from "../components/about/AboutContent";
import SiteChrome from "../components/layout/SiteChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.seudominio.com";

export const metadata: Metadata = {
  title: "Sobre | Lenon Alexandre - Desenvolvedor Full Stack",
  description: "Trajetoria, competencias e ferramentas com foco em UX, performance e escalabilidade.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Sobre | Lenon Alexandre",
    description: "Trajetoria, habilidades e stack full stack.",
    url: `${siteUrl}/about`,
    siteName: "Lenon Dev",
    images: [{ url: "/work-1.png", width: 1200, height: 630, alt: "Sobre" }],
    locale: "pt_BR",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre | Lenon Alexandre",
    description: "Full Stack focado em UX, performance e escalabilidade.",
    images: ["/work-1.png"],
  },
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <AboutContent />
    </SiteChrome>
  );
}
