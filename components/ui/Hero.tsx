"use client";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #001A4D 0%, #003087 60%, #0a3d9e 100%)" }}
    >
      {/* Elemento diagonal decorativo */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.05) 40px,
            rgba(255,255,255,0.05) 41px
          )`,
        }}
      />

      {/* Barra decorativa verde no topo */}
      <div className="absolute top-0 left-0 right-0 h-1" style={{ background: "#4E9E39" }} />

      <div className="relative mx-auto max-w-6xl w-full px-4 sm:px-6 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Texto principal */}
        <motion.div
          className="flex-1 text-white text-center lg:text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-4 flex items-center justify-center lg:justify-start gap-3">
            <span
              className="inline-block px-3 py-1 text-xs font-bold tracking-widest"
              style={{ background: "#F5A623", color: "#001A4D", fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              PSD • CANDIDATO Nº {siteConfig.candidateNumber}
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-none tracking-tight mb-3 uppercase"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Dr. Marco<br />
            <span style={{ color: "#F5A623" }}>Vicenzo</span>
          </h1>

          <p
            className="text-xl sm:text-2xl font-semibold mb-6 tracking-wide"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#a8c4e0" }}
          >
            Candidato a Deputado Distrital — DF 2026
          </p>

          <p className="text-base sm:text-lg text-white/75 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Advogado, jornalista e servidor público. Mais de uma década atuando na defesa dos direitos dos cidadãos do Distrito Federal.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#quem-e"
              className="px-8 py-4 text-base font-bold tracking-wide rounded-sm transition-opacity hover:opacity-90"
              style={{ background: "#4E9E39", color: "#fff", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em" }}
            >
              CONHEÇA A TRAJETÓRIA
            </a>
            <a
              href={siteConfig.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-base font-bold tracking-wide rounded-sm border-2 border-white/40 text-white hover:border-white/80 transition-colors"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em" }}
            >
              FALE COM A EQUIPE
            </a>
          </div>

          {/* Redes sociais rápidas */}
          <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
            <span className="text-white/50 text-sm">Siga nas redes:</span>
            <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/60 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/60 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/></svg>
            </a>
            <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/60 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </motion.div>

        {/* Foto / badge visual */}
        <motion.div
          className="flex-shrink-0 flex flex-col items-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div
            className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden"
            style={{ border: "6px solid #F5A623", boxShadow: "0 0 0 3px #4E9E39, 0 20px 60px rgba(0,0,0,0.4)" }}
          >
            <img
              src="/vicenzo-perfil.png"
              alt="Dr. Marco Vicenzo — Candidato a Deputado Distrital DF"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div
            className="text-center px-6 py-3 rounded-sm"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <div
              className="text-4xl font-black"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#F5A623", lineHeight: 1 }}
            >
              {siteConfig.candidateNumber}
            </div>
            <div className="text-white/70 text-xs tracking-widest mt-1 uppercase">PSD • DF 2026</div>
          </div>
        </motion.div>
      </div>

      {/* Seta para baixo */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#quem-e" aria-label="Ver mais">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </a>
      </div>
    </section>
  );
}
