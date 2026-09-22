"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const REGIOES_DF = [
  "Águas Claras", "Arniqueira", "Brasília", "Brazlândia",
  "Candangolândia", "Ceilândia", "Cruzeiro", "Fercal", "Gama",
  "Guará", "Itapoã", "Jardim Botânico", "Lago Norte", "Lago Sul",
  "Núcleo Bandeirante", "Paranoá", "Park Way", "Planaltina",
  "Recanto das Emas", "Riacho Fundo", "Riacho Fundo II", "Samambaia",
  "Santa Maria", "São Sebastião", "SCIA (Cidade do Automóvel)", "SIA",
  "Sobradinho", "Sobradinho II", "Sol Nascente/Pôr do Sol",
  "Sudoeste/Octogonal", "Taguatinga", "Varjão", "Vicente Pires",
];

const INPUT_CLS =
  "w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-sm text-sm focus:outline-none focus:border-[#0e7c3f] transition-colors dark:text-white dark:placeholder-slate-500";

export function FormContato({ source = "SITE_FORMULARIO" }: { source?: string }) {
  const [nome, setNome] = useState("");
  const [wpp, setWpp] = useState("");
  const [regiao, setRegiao] = useState("");
  const [instagram, setInstagram] = useState("");
  const [aceite, setAceite] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!aceite) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nome,
          whatsapp: wpp,
          regiao,
          instagram: instagram || undefined,
          source,
          campaign: "organico-2026",
        }),
      });
      setStatus(res.ok ? "ok" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contato" className="py-20 sm:py-28" style={{ background: "var(--bg-alt)" }}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span
            className="text-xs font-bold tracking-widest uppercase block mb-3"
            style={{ color: "#D2540B", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Formulário
          </span>
          <h2
            className="text-4xl sm:text-5xl font-black uppercase leading-none mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", color: "var(--text)" }}
          >
            Deixe seu Contato
          </h2>
          <div className="w-16 h-1 mb-8" style={{ background: "#D2540B" }} />

          {status === "ok" ? (
            <div
              className="p-6 rounded-sm text-center"
              style={{ background: "#F0FFF4", border: "1px solid #9AE6B4", color: "#276749" }}
            >
              <div className="text-2xl mb-2">✓</div>
              <p className="font-semibold">Contato recebido com sucesso.</p>
              <p className="text-sm mt-1">A equipe do Dr. Vicenzo retornará em breve.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1" htmlFor="nome">
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input
                  id="nome"
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className={INPUT_CLS}
                  style={{ background: "var(--bg-surface)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1" htmlFor="wpp">
                  WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="wpp"
                  type="tel"
                  required
                  value={wpp}
                  onChange={(e) => setWpp(e.target.value)}
                  placeholder="(61) 9xxxx-xxxx"
                  className={INPUT_CLS}
                  style={{ background: "var(--bg-surface)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1" htmlFor="regiao">
                  Região Administrativa <span className="text-red-500">*</span>
                </label>
                <select
                  id="regiao"
                  required
                  value={regiao}
                  onChange={(e) => setRegiao(e.target.value)}
                  className={INPUT_CLS}
                  style={{ background: "var(--bg-surface)" }}
                >
                  <option value="">Selecione sua região</option>
                  {REGIOES_DF.map((ra) => (
                    <option key={ra} value={ra}>{ra}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1" htmlFor="instagram">
                  Instagram <span className="text-gray-400 font-normal">(opcional)</span>
                </label>
                <input
                  id="instagram"
                  type="text"
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="@seu_perfil"
                  className={INPUT_CLS}
                  style={{ background: "var(--bg-surface)" }}
                />
              </div>

              <div className="flex items-start gap-3 pt-1">
                <input
                  id="aceite"
                  type="checkbox"
                  checked={aceite}
                  onChange={(e) => setAceite(e.target.checked)}
                  className="mt-1 w-4 h-4 flex-shrink-0 accent-[#0e7c3f]"
                  required
                />
                <label htmlFor="aceite" className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed cursor-pointer">
                  Autorizo o uso dos meus dados pessoais pela campanha do Dr. Marco Vicenzo para envio de comunicações políticas, conforme a{" "}
                  <a
                    href="/politica-de-privacidade"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-[#0e7c3f] transition-colors"
                  >
                    Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)
                  </a>
                  . Posso revogar este consentimento a qualquer momento.
                </label>
              </div>

              {status === "error" && (
                <p className="text-sm text-red-600">Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.</p>
              )}

              <button
                type="submit"
                disabled={!aceite || status === "sending"}
                className="w-full py-4 font-bold text-white rounded-sm transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: "#0e7c3f", fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em" }}
              >
                {status === "sending" ? "ENVIANDO..." : "ENVIAR"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
