import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/ui/Hero";
import { QuemE } from "@/components/ui/QuemE";
import { Trajetoria } from "@/components/ui/Trajetoria";
import { Atuacao } from "@/components/ui/Atuacao";
import { Propostas } from "@/components/ui/Propostas";
import { Imprensa } from "@/components/ui/Imprensa";
import { Canais } from "@/components/ui/Canais";
import { ContatoWhatsApp } from "@/components/ui/ContatoWhatsApp";
import { FormContato } from "@/components/ui/FormContato";
import { Footer } from "@/components/ui/Footer";
import { PersonSchema } from "@/components/seo/StructuredData";

export default function Home() {
  return (
    <>
      <PersonSchema />
      <Nav />
      <main>
        <Hero />
        <QuemE />
        <Trajetoria />
        <Atuacao />
        <Propostas />
        <Imprensa />
        <Canais />
        <ContatoWhatsApp />
        <FormContato />
      </main>
      <Footer />
    </>
  );
}
