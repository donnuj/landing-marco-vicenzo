import type { Metadata } from "next";
import { siteConfig, analyticsConfig } from "./config";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  const title = overrides?.title ?? siteConfig.name;
  const description = overrides?.description ?? siteConfig.description;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: "Dr. Marco Vicenzo | Deputado Distrital DF 2026",
      template: `%s | Dr. Marco Vicenzo`,
    },
    description,
    keywords: [
      "Marco Vicenzo",
      "Dr. Marco Vicenzo",
      "Marco Vicenzo DF",
      "Marco Vicenzo Deputado Distrital",
      "Marco Vicenzo 2026",
      "candidato deputado distrital DF",
      "PSD 55678",
      "vicenzodf",
    ],
    authors: [{ name: "Dr. Marco Vicenzo" }],
    creator: "Dr. Marco Vicenzo",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url: siteConfig.url,
      title: String(title),
      description: String(description),
      siteName: siteConfig.name,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Dr. Marco Vicenzo — Candidato a Deputado Distrital pelo PSD no DF 2026",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: String(title),
      description: String(description),
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: siteConfig.url,
    },
    ...overrides,
  };
}
