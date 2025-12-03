import type { Metadata } from "next";
import { workData } from "@/assets/assets";
import ProjectsContent from "../components/projects/ProjectsContent";
import ProjectsSchema from "../components/projects/ProjectsSchema";
import SiteChrome from "../components/layout/SiteChrome";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.seudominio.com";

export const metadata: Metadata = {
  title: "Projetos | Lenon Alexandre - Desenvolvedor Full Stack",
  description:
    "Projetos recentes em Frontend e Backend com Next.js, React, Tailwind e Framer Motion. Foco em performance, UX e escalabilidade.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projetos | Lenon Alexandre",
    description: "Cases de desenvolvimento web full stack com performance, UX e SEO.",
    url: `${siteUrl}/projects`,
    siteName: "Lenon Dev",
    images: [{ url: "/work-1.png", width: 1200, height: 630, alt: "Projeto" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projetos | Lenon Alexandre",
    description: "Frontend e Backend com Next.js, Tailwind e Framer Motion.",
    images: ["/work-1.png"],
  },
};

export default function ProjectsPage() {
  return (
    <SiteChrome>
      <ProjectsSchema siteUrl={siteUrl} projects={workData} />
      <ProjectsContent projects={workData} />
    </SiteChrome>
  );
}
