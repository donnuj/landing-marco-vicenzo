"use client";
import { motion } from "framer-motion";

const compromissos = [
  {
    numero: "01",
    titulo: "Saúde — a fila tem que andar",
    descricao:
      "Defender uma fila da saúde 100% auditável, com transparência no Centro de Regulação para que o cidadão possa acompanhar o andamento e os critérios de atendimento.",
  },
  {
    numero: "02",
    titulo: "Menos Detran, mais DF",
    descricao:
      "Combater a indústria da multa e defender a readequação da atuação dos agentes de trânsito, priorizando educação, prevenção e segurança no trânsito em vez de uma política focada em penalizações.",
  },
  {
    numero: "03",
    titulo: "Polícia Penal — prioridade 01",
    descricao:
      "Colocar a Polícia Penal no centro da atuação do mandato na área de segurança pública, defendendo valorização da categoria, melhores condições de trabalho e a nomeação dos aprovados.",
  },
  {
    numero: "04",
    titulo: "Educação digital",
    descricao:
      "Implantar o Contraturno Digital na rede pública, ampliando o contato dos estudantes com inteligência artificial, tecnologia, programação e conhecimentos ligados às novas profissões e ao mercado de trabalho.",
  },
  {
    numero: "05",
    titulo: "Liberdade para trabalhar",
    descricao:
      "Defender a revogação da Portaria nº 01/2025 e revisar regras que dificultem injustificadamente o funcionamento de distribuidoras de bebidas e a atividade de quem trabalha e empreende no DF.",
  },
  {
    numero: "06",
    titulo: "Grau no Autódromo",
    descricao:
      "Fortalecer a prática do grau de forma organizada e segura, com reconhecimento da modalidade esportiva e defesa da utilização do Autódromo de Brasília como espaço adequado para sua prática.",
  },
  {
    numero: "07",
    titulo: "Transporte, cidades e regularização",
    descricao:
      "Ampliar a fiscalização das empresas de ônibus, dos subsídios públicos e da qualidade do serviço prestado, além de cobrar soluções para problemas de infraestrutura e regularização das cidades.",
  },
  {
    numero: "08",
    titulo: "Dinheiro público 100% auditável",
    descricao:
      "Criar o programa "Siga o Dinheiro", ampliando a transparência sobre contratos, empresas contratadas, pagamentos e destinação dos recursos públicos do Distrito Federal.",
  },
  {
    numero: "09",
    titulo: "Feira do Guará",
    descricao:
      "Defender a revogação do atual comitê gestor, questionado por sua legalidade, e o reconhecimento da ASCOFEG, fortalecendo a participação dos próprios feirantes nas decisões sobre a Feira do Guará.",
  },
  {
    numero: "10",
    titulo: "O poder emana do povo",
    descricao:
      "Criar uma plataforma permanente de participação popular para que o cidadão possa enviar propostas, sugerir pautas e apresentar denúncias diretamente ao mandato, aproximando a Câmara Legislativa da população.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.23, 1, 0.32, 1] } },
};

export function Propostas() {
  return (
    <section id="propostas" className="py-20 sm:py-28" style={{ background: "var(--bg-alt)" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="mb-12"
        >
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-3"
            style={{ color: "#D2540B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Top 10 compromissos
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text)" }}
          >
            Com o povo do DF
          </h2>
          <div className="w-16 h-1" style={{ background: "#D2540B" }} />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {compromissos.map((c) => (
            <motion.div
              key={c.numero}
              variants={item}
              className="rounded-sm p-5 border-l-4 flex gap-4"
              style={{
                background: "var(--bg-surface)",
                borderColor: "#D2540B",
                boxShadow: "0 1px 8px rgba(0,0,0,0.08)",
              }}
            >
              <span
                className="shrink-0 text-3xl font-black leading-none mt-0.5 select-none"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "#D2540B", opacity: 0.35 }}
              >
                {c.numero}
              </span>
              <div>
                <h3
                  className="font-bold uppercase mb-1.5 leading-tight"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text)", fontSize: "1.1rem" }}
                >
                  {c.titulo}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted, #6b7280)" }}>
                  {c.descricao}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
