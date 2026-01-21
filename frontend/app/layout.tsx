import type { Metadata } from "next";
import "./globals.css";
import { Outfit, Ovo } from "next/font/google";
import ChatClient from "./components/chat/ChatClient";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.seudominio.com";

export const metadata: Metadata = {
  title: "Lenon Alexandre - Desenvolvedor Full Stack",
  description:
    "Portfolio, servicos e contato. Next.js, React, Tailwind e Framer Motion.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const themeScript = `
    try {
      const ls = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const isDark = ls ? ls === 'dark' : prefersDark;
      if (isDark) document.documentElement.classList.add('dark');
    } catch (_) {}
  `;

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta
          name="p:domain_verify"
          content="1b657cd232673332dc530931aa4f7da4"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="bg-white text-gray-900 dark:bg-black dark:text-white antialiased">
        <a href="#main-content" className="skip-link">
          Pular para conteudo principal
        </a>
        {children}
        <ChatClient />
      </body>
    </html>
  );
}
