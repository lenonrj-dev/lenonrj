import type { Metadata } from "next";
import { Suspense } from "react";
import ContactContent from "../components/contact/ContactContent";
import SiteChrome from "../components/layout/SiteChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.seudominio.com";

export const metadata: Metadata = {
  title: "Contato | Lenon Alexandre - Fale comigo",
  description: "Entre em contato para projetos, orcamentos e parcerias.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contato | Lenon Alexandre",
    description: "Fale comigo sobre desenvolvimento web e produtos digitais.",
    url: `${siteUrl}/contact`,
    siteName: "Lenon Dev",
    images: [{ url: "/work-4.png", width: 1200, height: 630, alt: "Contato" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contato | Lenon Alexandre",
    description: "Projetos, orcamentos e parcerias.",
    images: ["/work-4.png"],
  },
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <Suspense fallback={<div className="py-16 text-center text-gray-600 dark:text-gray-300">Carregando contato...</div>}>
        <ContactContent />
      </Suspense>
    </SiteChrome>
  );
}
