import { Nav } from "@/components/ui/Nav";
import { FormContato } from "@/components/ui/FormContato";
import { Footer } from "@/components/ui/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deixe seu Contato — Dr. Marco Vicenzo",
  description: "Preencha o formulário e entre em contato com a equipe do Dr. Marco Vicenzo, candidato a Deputado Distrital pelo PSD-DF.",
  robots: { index: false, follow: false },
};

export default function FormularioPage() {
  return (
    <>
      <Nav />
      <main>
        <FormContato source="GOOGLE_ADS" />
      </main>
      <Footer />
    </>
  );
}
