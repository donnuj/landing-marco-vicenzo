import type { Metadata } from "next";
import "./globals.css";
import { buildMetadata } from "@/lib/metadata";
import { GTMScript, GTMNoScript } from "@/components/analytics/GTM";
import { ClarityScript } from "@/components/analytics/Clarity";
import { GA4Script } from "@/components/analytics/GA4";
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
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init','1719784732447764');
fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1719784732447764&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased" style={{ background: "var(--bg)", color: "var(--text)" }}>
        <GTMNoScript />
        <GTMScript />
        <GA4Script />
        <ClarityScript />
        {children}
        <WhatsAppButton />
        <CookieConsent />
      </body>
    </html>
  );
}
