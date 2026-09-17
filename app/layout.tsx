import type { Metadata } from "next";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { GTMScript, GTMNoScript } from "@/components/analytics/GTM";
import { ClarityScript } from "@/components/analytics/Clarity";
import { CookieConsent } from "@/components/analytics/CookieConsent";
import { WhatsAppButton } from "@/components/whatsapp/WhatsAppButton";

export const metadata: Metadata = buildMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <GTMNoScript />
        <GTMScript />
        <ClarityScript />
        {children}
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
