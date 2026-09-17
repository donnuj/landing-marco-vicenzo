"use client";
import { motion } from "framer-motion";

const posicionamentos = [
  {
    categoria: "Transparência Pública",
    cor: "#0e7c3f",
    itens: [
      {
        titulo: "Fiscalização do poder público",
        descricao: "Marco Vicenzo tem atuado publicamente na cobertura e divulgação de ações da administração pública do DF, utilizando sua plataforma jornalística para dar transparência a questões de interesse da população.",
        fonte: "Posicionamento público documentado — canal @vicenzonews",
      },
    ],
  },
  {
    categoria: "Direitos do Cidadão",
    cor: "#D2540B",
    itens: [
      {
        titulo: "Defesa dos direitos dos moradores do DF",
        descricao: "Com formação jurídica e experiência como advogado, o candidato posiciona sua candidatura em torno da defesa dos direitos dos cidadãos do Distrito Federal, especialmente em relação à atuação dos órgãos públicos.",
        fonte: "Bio oficial e posicionamento público declarado pelo candidato",
      },
      {
        titulo: "Acesso à informação e prestação de contas",
        descricao: "Através do canal de jornalismo @vicenzonews, o candidato promove a cobertura de questões de interesse público, buscando ampliar o acesso da população às informações sobre a gestão do DF.",
        fonte: "Atividade jornalística documentada — @vicenzonews (108 mil seguidores)",
      },
    ],
  },
  {
    categoria: "Comunicação e Mobilização",
    cor: "#D2540B",
    itens: [
      {
        titulo: "Canal direto com o cidadão",
        descricao: "O candidato investe em comunicação direta com a população por meio das redes sociais, construindo um canal acessível para que o cidadão possa acompanhar e participar das discussões sobre o DF.",
        fonte: "Atuação documentada nas redes sociais — @vicenzodf (146 mil seguidores)",
      },
    ],
  },
];

export function Propostas() {
  return (
    <section id="propostas" className="py-20 sm:py-28" style={{ background: "var(--bg-alt)" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-3"
            style={{ color: "#D2540B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Posicionamentos e ideias
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text)" }}
          >
            Propostas
          </h2>
          <div className="w-16 h-1 mb-6" style={{ background: "#D2540B" }} />
          <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xl leading-relaxed italic">
            Os posicionamentos abaixo são baseados em atuação pública documentada e declarações oficiais do candidato. As propostas legislativas formais serão apresentadas durante a campanha.
          </p>
        </motion.div>

        <div className="mt-10 space-y-8">
          {posicionamentos.map((bloco, bi) => (
            <motion.div
              key={bloco.categoria}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: bi * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-sm" style={{ background: bloco.cor }} />
                <h3
                  className="text-base font-bold uppercase tracking-widest"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: bloco.cor, fontSize: "0.85rem" }}
                >
                  {bloco.categoria}
                </h3>
              </div>

              <div className="space-y-3">
                {bloco.itens.map((item) => (
                  <div
                    key={item.titulo}
                    className="rounded-sm p-5 border-l-4"
                    style={{ background: "var(--bg-surface)", borderColor: bloco.cor, boxShadow: "0 1px 8px rgba(0,0,0,0.08)" }}
                  >
                    <h4
                      className="text-lg font-bold mb-2"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#063d20", fontSize: "1.15rem" }}
                    >
                      {item.titulo}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-3">{item.descricao}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500 italic">{item.fonte}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
