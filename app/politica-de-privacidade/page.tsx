import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = buildMetadata({
  title: "Política de Privacidade",
  description: `Política de privacidade e uso de dados de ${siteConfig.name} em conformidade com a LGPD.`,
  robots: { index: false, follow: false },
});

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="mb-8 text-3xl font-bold tracking-tight text-zinc-900">
        Política de Privacidade
      </h1>

      <div className="prose prose-zinc max-w-none space-y-6 text-zinc-600">
        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            1. Responsável pelo Tratamento
          </h2>
          <p>
            Responsável: Marco Antônio de Vicente Júnior (Dr. Marco Vicenzo),
            candidato a Deputado Distrital pelo PSD nas Eleições 2026 — número
            55.678. CPF: {siteConfig.cpfResponsavel}.
            Contato: <a href={`mailto:${siteConfig.contactEmail}`} className="text-zinc-900 underline">{siteConfig.contactEmail}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            2. Dados Coletados
          </h2>
          <p>
            Coletamos dados pessoais fornecidos voluntariamente (nome, telefone
            e/ou e-mail) por meio do formulário de contato. Também coletamos
            dados de navegação via cookies analíticos para medir o desempenho
            do site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            3. Finalidade
          </h2>
          <p>
            Os dados coletados são utilizados exclusivamente para comunicações
            relacionadas à campanha eleitoral de Dr. Marco Vicenzo — informações,
            atualizações e materiais da candidatura. Não utilizamos os dados para
            publicidade comercial, nem os compartilhamos com terceiros para fins
            comerciais.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            4. Cookies e Tecnologias de Análise
          </h2>
          <p>
            Utilizamos Google Tag Manager e Microsoft Clarity exclusivamente
            para análise de desempenho e navegação no site. Não utilizamos
            cookies para publicidade segmentada. Você pode recusar cookies não
            essenciais pelo banner de consentimento exibido na primeira visita.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            5. Compartilhamento
          </h2>
          <p>
            Não vendemos nem cedemos dados pessoais a terceiros. Os dados de
            navegação são processados por ferramentas analíticas (Google, Microsoft)
            exclusivamente para medição de desempenho, em conformidade com suas
            respectivas políticas de privacidade.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            6. Seus Direitos (LGPD — Lei 13.709/2018)
          </h2>
          <p>
            Você tem direito a acessar, corrigir, excluir ou portar seus dados,
            além de revogar o consentimento a qualquer momento. Para exercer
            seus direitos, entre em contato pelo e-mail{" "}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-zinc-900 underline"
            >
              {siteConfig.contactEmail}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-zinc-800">
            7. Retenção de Dados
          </h2>
          <p>
            Os dados são mantidos pelo período da campanha eleitoral e pelo
            prazo legal exigido pela legislação eleitoral e pela LGPD. Após
            esse prazo, são eliminados de forma segura.
          </p>
        </section>

        <p className="mt-8 border-t border-zinc-100 pt-6 text-sm text-zinc-400">
          Última atualização: {new Date().toLocaleDateString("pt-BR")} —{" "}
          {siteConfig.name}
        </p>
      </div>
    </main>
  );
}
