"use client";
import { motion } from "framer-motion";

const eventos = [
  {
    periodo: "Formação",
    titulo: "Bacharel em Direito",
    descricao: "Graduação em Direito pelo UniCEUB — Centro Universitário de Brasília, com registro na OAB/DF.",
    cor: "#0e7c3f",
  },
  {
    periodo: "Carreira jurídica",
    titulo: "Procurador de Justiça — TJDDF",
    descricao: "Atuou como Procurador de Justiça no Tribunal de Justiça do Distrito Federal e Territórios, com experiência em defesa e assessoria jurídica.",
    cor: "#0e7c3f",
  },
  {
    periodo: "Setor público",
    titulo: "Servidor da Câmara Federal",
    descricao: "Servidor público federal na Câmara dos Deputados, acumulando experiência institucional no Legislativo federal.",
    cor: "#0e7c3f",
  },
  {
    periodo: "Assessoria política",
    titulo: "Assessor do Senador José Reguffe",
    descricao: "Atuou como assessor do ex-senador José Reguffe, adquirindo vivência direta no funcionamento do Senado Federal e das demandas do Distrito Federal.",
    cor: "#D2540B",
  },
  {
    periodo: "Comunicação",
    titulo: "Fundação do Vicenzo News",
    descricao: "Criação do canal de jornalismo @vicenzonews, com foco em transparência, fiscalização do poder público e informação para o cidadão do DF. Mais de 108 mil seguidores.",
    cor: "#D2540B",
  },
  {
    periodo: "Candidatura 2026",
    titulo: "Candidato a Deputado Distrital — PSD nº 55.678",
    descricao: "Lança candidatura a Deputado Distrital pelo Partido Social Democrático (PSD), partido nº 55, com o número 55.678, para as eleições de 2026 no Distrito Federal.",
    cor: "#D2540B",
  },
];

export function Trajetoria() {
  return (
    <section id="trajetoria" className="py-20 sm:py-28" style={{ background: "var(--bg-surface)" }}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-3"
            style={{ color: "#D2540B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Percurso
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text)" }}
          >
            Trajetória
          </h2>
          <div className="w-16 h-1" style={{ background: "#D2540B" }} />
        </motion.div>

        <div className="relative">
          {/* Linha vertical */}
          <div
            className="absolute left-4 sm:left-8 top-0 bottom-0 w-0.5"
            style={{ background: "var(--border)" }}
          />

          <div className="space-y-10">
            {eventos.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative flex gap-6 sm:gap-10 pl-12 sm:pl-20"
              >
                {/* Marcador */}
                <div
                  className="absolute left-1 sm:left-5 w-6 h-6 rounded-full border-4 border-white flex-shrink-0"
                  style={{ background: e.cor, top: "4px", boxShadow: `0 0 0 3px ${e.cor}33` }}
                />

                <div>
                  <span
                    className="text-xs font-bold uppercase tracking-widest block mb-1"
                    style={{ color: e.cor, fontFamily: "'Barlow Condensed', sans-serif" }}
                  >
                    {e.periodo}
                  </span>
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-2"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text)" }}
                  >
                    {e.titulo}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 leading-relaxed">{e.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
