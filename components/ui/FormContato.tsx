"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function FormContato() {
  const [nome, setNome] = useState("");
  const [contato, setContato] = useState("");
  const [mensagem, setMensagem] = useState("");
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
          phone: contato,
          message: mensagem,
          source: "SITE_FORMULARIO",
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

          {/* Aviso de transparência */}
          <div
            className="mb-8 p-4 rounded-sm border text-sm leading-relaxed"
            style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", color: "var(--text2)" }}
          >
            <strong>Por que pedimos seu contato?</strong><br />
            Ao preencher este formulário, você está autorizando voluntariamente o recebimento de comunicações diretas relacionadas à campanha do Dr. Marco Vicenzo, incluindo informações, atualizações, notícias e materiais relacionados à candidatura. Você pode solicitar a remoção do seu contato a qualquer momento entrando em contato diretamente.
          </div>

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
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-sm text-sm focus:outline-none focus:border-[#0e7c3f] transition-colors dark:text-white dark:placeholder-slate-500"
                  style={{ background: "var(--bg-surface)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1" htmlFor="contato">
                  WhatsApp ou e-mail <span className="text-red-500">*</span>
                </label>
                <input
                  id="contato"
                  type="text"
                  required
                  value={contato}
                  onChange={(e) => setContato(e.target.value)}
                  placeholder="(61) 9xxxx-xxxx ou seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-sm text-sm focus:outline-none focus:border-[#0e7c3f] transition-colors dark:text-white dark:placeholder-slate-500"
                  style={{ background: "var(--bg-surface)" }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1" htmlFor="mensagem">
                  Mensagem (opcional)
                </label>
                <textarea
                  id="mensagem"
                  rows={4}
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Escreva sua mensagem, dúvida ou sugestão..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-white/20 rounded-sm text-sm focus:outline-none focus:border-[#0e7c3f] transition-colors resize-none dark:text-white dark:placeholder-slate-500"
                  style={{ background: "var(--bg-surface)" }}
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="aceite"
                  type="checkbox"
                  checked={aceite}
                  onChange={(e) => setAceite(e.target.checked)}
                  className="mt-1 w-4 h-4 flex-shrink-0 accent-[#0e7c3f]"
                  required
                />
                <label htmlFor="aceite" className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed cursor-pointer">
                  Compreendo que ao enviar este formulário estou autorizando o recebimento de comunicações da campanha do Dr. Marco Vicenzo, podendo cancelar a qualquer momento.
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
