"use client";

import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useTheme } from "../../lib/useTheme";
import { PageLoader } from "./PageLoader";

type Props = {
  children: ReactNode;
};

export default function SiteChrome({ children }: Props) {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <PageLoader>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      {/* espaco para o conteudo especifico da rota */}
      {children}
      <Footer isDarkMode={isDarkMode} />
    </PageLoader>
  );
}
