"use client";

import { assets } from "@/assets/assets";
import { motion } from "framer-motion";
import Image from "next/image";
import { Send } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const card = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

function ProjectsHero() {
  return (
    <header className="text-center mb-12">
      <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 dark:text-white">Projetos</h1>
      <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-400">
        Selecao de cases com foco em usabilidade, performance e SEO.
      </p>
    </header>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      variants={card}
      className="group relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-black shadow-sm hover:shadow-xl transition"
    >
      <Image
        src={project.bgImage}
        alt={`Thumbnail do projeto ${project.title}`}
        fill
        className="object-cover"
        sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        priority={index < 2}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition duration-500 flex items-end p-5">
        <div className="bg-white dark:bg-gray-900 w-full rounded-lg p-4 flex justify-between items-center shadow-lg">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{project.description}</p>
          </div>
          <a
            href={project.link || "#"}
            aria-label={`Abrir projeto ${project.title}`}
            className="border rounded-full border-gray-800 dark:border-gray-200 w-10 h-10 flex items-center justify-center hover:bg-white/60 hover:border-white/80 transition"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsContent({ projects }) {
  return (
    <main id="main-content" className="w-full px-6 md:px-[12%] py-24">
      <ProjectsHero />

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={container}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        aria-label="Galeria de projetos"
      >
        {projects.map((project, index) => (
          <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
        ))}
      </motion.section>
    </main>
  );
}
