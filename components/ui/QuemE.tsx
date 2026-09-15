"use client";
import { motion } from "framer-motion";

const highlights = [
  { icon: "⚖️", label: "Advogado", sub: "OAB/DF — Bacharel em Direito pela UniCEUB" },
  { icon: "📰", label: "Jornalista", sub: "Fundador do canal @vicenzonews (108 mil seguidores)" },
  { icon: "🏛️", label: "Ex-Procurador de Justiça", sub: "Tribunal de Justiça do DF e Territórios (TJDDF)" },
  { icon: "🇧🇷", label: "Servidor da Câmara Federal", sub: "Servidor público federal em exercício" },
];

export function QuemE() {
  return (
    <section id="quem-e" className="py-20 sm:py-28" style={{ background: "#F5F7FA" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-3"
            style={{ color: "#4E9E39", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            O candidato
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase leading-none mb-6"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#001A4D" }}
          >
            Quem é Marco Vicenzo
          </h2>
          <div className="w-16 h-1 mb-8" style={{ background: "#F5A623" }} />

          <div className="max-w-2xl">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
              Marco Antônio de Vicente Júnior, conhecido como Dr. Vicenzo, é advogado, jornalista e servidor público do Distrito Federal. Com formação em Direito pela UniCEUB e registro na OAB/DF, construiu carreira atuando na defesa dos direitos dos cidadãos e na fiscalização do poder público.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-4">
              Sua atuação jornalística ganhou projeção regional através do canal @vicenzonews, onde acompanha e divulga ações relacionadas ao governo e à administração pública do DF, somando mais de 108 mil seguidores. Pessoalmente, mantém o perfil @vicenzodf com mais de 146 mil seguidores no Instagram.
            </p>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Ex-assessor do senador José Reguffe, acumulou experiência no campo político-institucional antes de decidir concorrer a Deputado Distrital pelo PSD (partido nº 55) nas eleições de 2026, com o número <strong style={{ color: "#003087" }}>55.678</strong>.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-sm p-6 border-l-4"
              style={{ borderColor: "#003087", boxShadow: "0 2px 12px rgba(0,48,135,0.08)" }}
            >
              <div className="text-3xl mb-3">{h.icon}</div>
              <div
                className="font-bold text-base mb-1 uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#001A4D", fontSize: "1.05rem", letterSpacing: "0.03em" }}
              >
                {h.label}
              </div>
              <div className="text-sm text-gray-500 leading-snug">{h.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
