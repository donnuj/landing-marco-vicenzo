import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section
      className="min-h-[100dvh] relative overflow-hidden pt-16"
      style={{ background: "var(--bg)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 top-16 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 75% 50%, rgba(14,124,63,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 min-h-[calc(100dvh-4rem)] flex items-center">
        <div className="w-full flex flex-col md:flex-row items-center gap-10 md:gap-16 py-10">

          {/* ── Foto de rosto (mobile: topo; desktop: coluna direita) ──────── */}
          <div className="flex-shrink-0 order-first md:order-last animate-fade-right">
            {/* Mobile: foto centralizada, retrato compacto */}
            <div className="md:hidden mx-auto w-52 overflow-hidden rounded-2xl shadow-xl"
              style={{
                aspectRatio: "3/4",
                border: "2px solid rgba(14,124,63,0.25)",
              }}
            >
              <img
                src="/fotos/hero.webp"
                alt="Dr. Marco Vicenzo"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
                fetchPriority="high"
                loading="eager"
                width={208}
                height={277}
              />
            </div>

            {/* Desktop: foto mais alta à direita */}
            <div
              className="hidden md:block relative overflow-hidden rounded-2xl shadow-2xl"
              style={{
                width: "360px",
                aspectRatio: "3/4",
                border: "2px solid rgba(14,124,63,0.2)",
              }}
            >
              <img
                src="/fotos/hero.webp"
                alt="Dr. Marco Vicenzo"
                className="w-full h-full object-cover"
                style={{ objectPosition: "center top" }}
                fetchPriority="high"
                loading="eager"
                width={360}
                height={480}
              />
              {/* Badge no rodapé da foto */}
              <div
                className="absolute bottom-0 inset-x-0 py-4 px-5"
                style={{
                  background: "linear-gradient(to top, rgba(4,13,30,0.85) 0%, transparent 100%)",
                }}
              >
                <p
                  className="font-black text-2xl tracking-tighter"
                  style={{ color: "#5ab843" }}
                >
                  55.678
                </p>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-0.5">
                  Deputado Distrital · DF
                </p>
              </div>
            </div>
          </div>

          {/* ── Texto ─────────────────────────────────────────────────────── */}
          <div className="flex-1 max-w-[500px] text-center md:text-left animate-fade-up">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-[11px] font-bold uppercase"
              style={{
                background: "rgba(14,124,63,0.07)",
                color: "#0e7c3f",
                border: "1px solid rgba(14,124,63,0.14)",
                letterSpacing: "0.18em",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full inline-block"
                style={{ background: "#5ab843" }}
              />
              PSD · Deputado Distrital · DF 2026
            </div>

            <p
              className="font-black leading-none tracking-tighter"
              style={{ fontSize: "clamp(80px,11vw,128px)", color: "#0e7c3f" }}
            >
              55<span style={{ color: "#D2540B" }}>.</span>678
            </p>

            <h1
              className="font-black tracking-tight mt-4 leading-tight"
              style={{ fontSize: "clamp(26px,3.5vw,42px)", color: "var(--text)" }}
            >
              Dr. Marco Vicenzo
            </h1>

            <p className="text-zinc-500 font-medium mt-2" style={{ fontSize: "15px" }}>
              Advogado · Jornalista · Servidor Público
            </p>

            <p
              className="text-zinc-400 mt-4 leading-relaxed mx-auto md:mx-0 max-w-[380px]"
              style={{ fontSize: "13px" }}
            >
              Mais de uma década atuando na defesa dos direitos dos cidadãos do Distrito Federal.
            </p>

            <div className="flex flex-wrap gap-3 mt-9 justify-center md:justify-start">
              <a
                href="#quem-e"
                className="font-bold rounded text-white transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ fontSize: "13px", padding: "14px 28px", background: "#0e7c3f" }}
              >
                CONHEÇA A TRAJETÓRIA
              </a>
              <a
                href={siteConfig.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold rounded transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ fontSize: "13px", padding: "14px 28px", background: "#D2540B", color: "#fff" }}
              >
                FALAR COM A EQUIPE
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-4 justify-center md:justify-start">
              <span className="text-zinc-400 text-xs font-medium">Siga:</span>
              {[
                {
                  href: siteConfig.instagram,
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  href: siteConfig.tiktok,
                  label: "TikTok",
                  path: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z",
                },
                {
                  href: siteConfig.facebook,
                  label: "Facebook",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-zinc-400 hover:text-zinc-700 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
