'use client';

import { Mail } from "lucide-react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const footerLinks = [
  { name: "Instagram", href: "https://www.instagram.com/lenonrj.dev/", target: "_blank" },
  { name: "GitHub", href: "https://github.com/lenonrj-dev", target: "_blank" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/lenonalexandre", target: "_blank" },
];

type FooterProps = { isDarkMode: boolean };

const Footer = ({ isDarkMode }: FooterProps) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="mt-20 px-6 md:px-[10%] 
                bg-white
                dark:bg-black"
    >
      {/* Logo + contato */}
      <div className="text-center py-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={isDarkMode ? assets.logo_dark : assets.logo}
            alt="Logo Lenon Dev - Desenvolvimento Web e UX/UI"
            className="w-40 mx-auto mb-4"
          />
        </motion.div>

        <motion.a
          href="mailto:lenon.contato.dev.co@gmail.com"
          whileHover={{ scale: 1.05 }}
          className="w-max flex items-center gap-3 mx-auto text-gray-700 dark:text-gray-300 font-medium hover:text-blue-600 transition"
          aria-label="Envie um e-mail para Lenon"
        >
          <Mail className="h-6 w-6" aria-hidden="true" />
          lenon.contato.dev.co@gmail.com
        </motion.a>
      </div>

      {/* Navegao */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="border-t border-gray-300 dark:border-gray-600 pt-10 pb-6 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        {/* Direitos */}
        <p className="text-gray-600 dark:text-gray-400 text-sm text-center sm:text-left">
           {new Date().getFullYear()} Todos os Direitos Reservados | Desenvolvido por{" "}
          <span className="font-semibold text-blue-600">Lenon Alexandre da Cunha</span>
        </p>

        {/* Links */}
        <nav aria-label="Redes sociais">
          <ul className="flex items-center gap-8">
            {footerLinks.map((link, idx) => (
              <motion.li
                key={idx}
                whileHover={{ scale: 1.1, y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <a
                  href={link.href}
                  target={link.target}
                  rel="noopener noreferrer"
                  className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition"
                >
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
