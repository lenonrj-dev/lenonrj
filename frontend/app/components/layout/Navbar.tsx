'use client';

import { assets } from "@/assets/assets";
import Image from "next/image";
import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, Moon, Sun, X } from "lucide-react";

const navLinks = [
  { name: "Inicio", href: "/" },
  { name: "Sobre Mim", href: "/about" },
  { name: "Servicos", href: "/services" },
  { name: "Contato", href: "/contact" },
];

type NavbarProps = {
  isDarkMode: boolean;
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
};

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps) => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Atualiza posio do glow conforme cursor
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x, y });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        role="navigation"
        aria-label="Navegacao principal"
        className={`w-full fixed ml-5 px-6 lg:px-12 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-colors duration-500 ${
          isScroll
            ? "bg-white/70 backdrop-blur-lg shadow-sm dark:bg-darkTheme/80 dark:shadow-white/20"
            : ""
        }`}
      >
        {/* Logo */}
        <a href="#top" aria-label="Ir para o topo">
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="Logo Lenon Dev"
            className="w-28 cursor-pointer mr-14"
            priority
          />
        </a>

        {/* Links Desktop */}
        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-10 rounded-full px-10 py-3 transition ${
            isScroll
              ? ""
              : "bg-white/60 shadow-sm dark:border dark:border-white/30 dark:bg-black"
          }`}
        >
          {navLinks.map((link, i) => (
            <motion.li key={i} whileHover={{ scale: 1.1, y: -2 }}>
              <a
                href={link.href}
                className="font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 transition"
                aria-label={`Ir para secao ${link.name}`}
              >
                {link.name}
              </a>
            </motion.li>
          ))}
        </ul>

        {/* Aes */}
        <div className="flex items-center gap-4">
          {/* Toggle Dark Mode */}
          <button
            onClick={() => setIsDarkMode((prev) => !prev)}
            aria-label="Alternar modo escuro/claro"
            className="text-gray-800 dark:text-gray-100"
          >
            {isDarkMode ? <Sun className="h-6 w-6" aria-hidden="true" /> : <Moon className="h-6 w-6" aria-hidden="true" />}
          </button>

          {/* Botao CTA Desktop */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/contact"
            onMouseMove={handleMouseMove}
            className={`hidden lg:flex items-center gap-2 font-medium px-8 py-2.5 rounded-full ml-4 relative overflow-hidden border transition ${
              isScroll
                ? "border-gray-400 bg-white text-gray-900 dark:border-white/30 dark:bg-black dark:text-white"
                : isDarkMode
                  ? "border-white/60 bg-white text-black"
                  : "border-gray-400 hover:bg-blue-600 hover:text-white"
            }`}
            style={
              isDarkMode
                ? {
                    boxShadow: `0 0 20px rgba(255,255,255,0.9),
                                0 0 40px rgba(255,255,255,0.8),
                                0 0 60px rgba(255,255,255,0.7)`,
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(255,255,255,1) 15%, rgba(255, 255, 255, 0.92) 40%, rgba(247, 243, 243, 0.8) 70%)`,
                  }
                : {}
            }
            aria-label="Entrar em contato"
          >
            Contato
            <ArrowRight className="h-4 w-4 relative z-10" aria-hidden="true" />
          </motion.a>

          {/* Botao Menu Mobile */}
          <button
            className="block md:hidden ml-3 text-gray-900 dark:text-white"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menu mobile"
          >
            <Menu className="h-7 w-7" aria-hidden="true" />
          </button>
        </div>
      </motion.nav>

      {/* Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-64 h-screen bg-white shadow-lg dark:bg-black/80 dark:text-white z-50 flex flex-col p-10"
          >
            {/* Fechar */}
            <button
              className="absolute right-6 top-6"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fechar menu mobile"
            >
              <X className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Links */}
            <ul className="flex flex-col text-center gap-6 mt-16">
              {navLinks.map((link, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, x: 5 }}
                  transition={{ type: "spring", stiffness: 250 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-center hover:text-blue-600 transition"
                    aria-label={`Ir para secao ${link.name}`}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
