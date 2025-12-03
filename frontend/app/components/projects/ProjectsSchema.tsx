export default function ProjectsSchema({ siteUrl, projects }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Projetos - Lenon Alexandre",
    description: "Colecao de projetos em desenvolvimento web full stack.",
    hasPart: projects.map((project) => ({
      "@type": "CreativeWork",
      name: project.title,
      url: project.link || `${siteUrl}/projects`,
      image: project.bgImage,
      description: project.description,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
