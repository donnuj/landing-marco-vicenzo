"use client";
import { motion } from "framer-motion";

const veiculos = [
  {
    nome: "Metrópoles",
    descricao: "Reportagem sobre a atuação do advogado Marco Vicenzo e sua atividade jornalística no DF.",
    url: "https://www.metropoles.com/colunas/grande-angular/terror-do-detran-advogado-administra-grupo-para-da-balao-em-blitz",
    cor: "#E53E3E",
  },
  {
    nome: "PlatôBR",
    descricao: "Cobertura da pré-candidatura e da atuação de Marco Vicenzo no cenário político do DF.",
    url: "https://platobr.com.br/em-brasilia-pre-candidatos-rivais-nas-redes-marcam-duelo-no-ringue",
    cor: "#2B6CB0",
  },
  {
    nome: "Jurídico Certo",
    descricao: "Perfil profissional do Dr. Marco Vicenzo, Bacharel em Direito e Correspondente Jurídico em Brasília.",
    url: "https://juridicocerto.com/p/drmarcovicenzo",
    cor: "#276749",
  },
  {
    nome: "Jusbrasil",
    descricao: "Perfil jurídico e publicações do Dr. Marco Vicenzo na plataforma de direito mais acessada do Brasil.",
    url: "https://drmarcovicenzo.jusbrasil.com.br/",
    cor: "#0e7c3f",
  },
  {
    nome: "LinkedIn",
    descricao: "Perfil profissional de Marco Vicenzo — trajetória, experiência e formação.",
    url: "https://linkedin.com/in/marco-vicenzo-62b068176",
    cor: "#0077B5",
  },
  {
    nome: "Jornal de Brasília",
    descricao: "Cobertura jornalística com informações sobre a atuação pública de Marco Vicenzo no DF.",
    url: "https://jornaldebrasilia.com.br/brasilia/advogado-do-df-e-investigado-por-administrar-um-grupo-para-burlar-blitz/",
    cor: "#744210",
  },
];

export function Imprensa() {
  return (
    <section id="imprensa" className="py-20 sm:py-28" style={{ background: "var(--bg-surface)" }}>
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
            Cobertura e referências
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text)" }}
          >
            Imprensa e Fontes
          </h2>
          <div className="w-16 h-1 mb-4" style={{ background: "#D2540B" }} />
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-lg leading-relaxed">
            Fontes externas com informações públicas sobre Dr. Marco Vicenzo. Cada link direciona para a fonte original.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {veiculos.map((v, i) => (
            <motion.a
              key={v.nome}
              href={v.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group flex flex-col gap-3 rounded-sm p-5 border border-gray-100 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/25 hover:shadow-md transition-all"
              style={{ background: "var(--bg-surface)" }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-base font-bold uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: v.cor, letterSpacing: "0.05em" }}
                >
                  {v.nome}
                </span>
                <svg
                  className="text-gray-300 group-hover:text-gray-600 transition-colors"
                  width="16" height="16" fill="none" viewBox="0 0 24 24"
                >
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{v.descricao}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
