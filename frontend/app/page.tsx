'use client';
import Navbar from "./components/layout/Navbar";
import Header from "./components/inicio/Header";
import About from "./components/inicio/About";
import Services from "./components/inicio/Services";
import Work from "./components/inicio/Work";
import Contact from "./components/inicio/Contact";
import Footer from "./components/layout/Footer";
import { useTheme } from "./lib/useTheme";
import { PageLoader } from "./components/layout/PageLoader";

export default function Home() {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <PageLoader>
      <main id="main-content">
        <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Header isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
        <Work isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
        <Footer isDarkMode={isDarkMode} />
      </main>
    </PageLoader>
  );
}
