"use client";
import { motion } from "framer-motion";

const areas = [
  {
    icon: "⚖️",
    titulo: "Direito e Advocacia",
    descricao: "Atuação como advogado com registro na OAB/DF, especializado em Direito Civil, do Consumidor, Criminal, Eleitoral e Tributário, entre outras áreas.",
  },
  {
    icon: "📡",
    titulo: "Jornalismo de Fiscalização",
    descricao: "Produção e publicação de conteúdo jornalístico de interesse público através do canal @vicenzonews, com foco em transparência e prestação de contas do poder público.",
  },
  {
    icon: "🏛️",
    titulo: "Setor Público e Legislativo",
    descricao: "Experiência como Procurador de Justiça no TJDDF, como servidor da Câmara Federal e como assessor parlamentar no Senado Federal.",
  },
  {
    icon: "📣",
    titulo: "Comunicação com o Cidadão",
    descricao: "Mais de 146 mil seguidores no Instagram pessoal (@vicenzodf) e 108 mil no canal de notícias (@vicenzonews), construindo um canal direto de comunicação com a população.",
  },
  {
    icon: "👥",
    titulo: "Mobilização Popular",
    descricao: "Atuação na organização de comunidades e grupos de interesse público, aproximando o cidadão comum das discussões sobre seus direitos e sobre a gestão pública do DF.",
  },
  {
    icon: "🤝",
    titulo: "Assessoria e Gestão",
    descricao: "Experiência direta em assessoria política e parlamentar, com trânsito nas instituições do Poder Legislativo nos níveis federal e distrital.",
  },
];

export function Atuacao() {
  return (
    <section id="atuacao" className="py-20 sm:py-28" style={{ background: "#063d20" }}>
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
            style={{ color: "#D2540B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Campos de atuação
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase leading-none mb-4 text-white"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Atuação
          </h2>
          <div className="w-16 h-1" style={{ background: "#D2540B" }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map((a, i) => (
            <motion.div
              key={a.titulo}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-sm p-6"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="text-3xl mb-4">{a.icon}</div>
              <h3
                className="text-xl font-bold mb-3 text-white uppercase"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.03em" }}
              >
                {a.titulo}
              </h3>
              <p className="text-sm text-white/65 leading-relaxed">{a.descricao}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
