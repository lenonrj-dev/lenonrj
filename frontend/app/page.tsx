'use client';

import LinkBioMenu from "./components/link-bio/LinkBioMenu";
import { useTheme } from "./lib/useTheme";
import { PageLoader } from "./components/layout/PageLoader";

export default function Home() {
  const { isDarkMode } = useTheme();

  return (
    <PageLoader>
      <main id="main-content" className="min-h-[100svh]">
        <LinkBioMenu isDarkMode={isDarkMode} />
      </main>
    </PageLoader>
  );
}
