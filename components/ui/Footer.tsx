import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer style={{ background: "#040d1e" }} className="text-white">
      <div className="h-1 w-full" style={{ background: "#D2540B" }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
          {/* Identidade */}
          <div>
            <div
              className="text-xl font-black uppercase mb-1"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}
            >
              DR. MARCO VICENZO
            </div>
            <div className="text-sm text-white/60 mb-3">
              Candidato a Deputado Distrital<br />
              PSD • Nº 55.678 • DF 2026
            </div>
            <span
              className="inline-block px-3 py-1 text-xs font-bold tracking-widest"
              style={{ background: "#D2540B", color: "#063d20", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              55.678
            </span>
          </div>

          {/* Links rápidos */}
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-4 text-white/50"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Navegação
            </div>
            <nav className="flex flex-col gap-2">
              {[
                { href: "#quem-e", label: "Quem é Marco Vicenzo" },
                { href: "#trajetoria", label: "Trajetória" },
                { href: "#propostas", label: "Propostas" },
                { href: "#imprensa", label: "Imprensa" },
                { href: "#contato", label: "Contato" },
              ].map((l) => (
                <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Canais */}
          <div>
            <div
              className="text-xs font-bold uppercase tracking-widest mb-4 text-white/50"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Canais Oficiais
            </div>
            <div className="flex flex-col gap-2">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                Instagram — @vicenzodf
              </a>
              <a href={siteConfig.instagramNews} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                Instagram Notícias — @vicenzonews
              </a>
              <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                TikTok — @vicenzodf
              </a>
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                Facebook
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                LinkedIn
              </a>
              <a href={siteConfig.whatsappDirect} target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/40 text-center sm:text-left">
              &copy; 2026 Dr. Marco Vicenzo — Propaganda Eleitoral. Material de campanha.
            </p>
            <p className="text-xs text-white/40 text-center sm:text-right max-w-sm">
              Os dados do formulário são usados exclusivamente para comunicações de campanha (LGPD).
            </p>
          </div>
          <p className="text-xs text-white/30 text-center pt-1">
            ELEIÇÃO 2026 MARCO ANTONIO DE VICENTE JUNIOR DEPUTADO DISTRITAL &mdash; CNPJ 68.385.878/0001-26
          </p>
        </div>
      </div>
    </footer>
  );
}
