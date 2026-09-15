import { siteConfig } from "@/lib/config";

export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Dr. Marco Vicenzo",
    alternateName: "Marco Antônio de Vicente Júnior",
    jobTitle: "Candidato a Deputado Distrital",
    description: siteConfig.description,
    url: siteConfig.url,
    sameAs: [
      siteConfig.instagram,
      siteConfig.instagramNews,
      siteConfig.tiktok,
      siteConfig.facebook,
      siteConfig.linkedin,
    ],
    knowsAbout: ["Direito", "Jornalismo", "Administração Pública", "Política"],
    worksFor: {
      "@type": "Organization",
      name: "Partido Social Democrático — PSD",
      url: "https://psd.org.br",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brasília",
      addressRegion: "DF",
      addressCountry: "BR",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
