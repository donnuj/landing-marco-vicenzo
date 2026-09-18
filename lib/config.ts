export const siteConfig = {
  name: "Dr. Marco Vicenzo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://marcovicenzo.com.br",
  description:
    "Dr. Marco Vicenzo, candidato a Deputado Distrital pelo PSD no Distrito Federal nas eleições de 2026. Advogado, jornalista e servidor público comprometido com a transparência e os direitos dos cidadãos do DF.",
  locale: "pt_BR",
  phone: "5561992693187",
  whatsappMessage:
    "Olá, Dr. Marco Vicenzo! Vim pelo site e gostaria de mais informações sobre sua candidatura.",
  contactEmail: "contato@marcovicenzo.com.br",
  cpfResponsavel: "000.000.000-00",
  alertContacts: (process.env.NEXT_PUBLIC_ALERT_CONTACTS ?? "").split(","),
  instagram: "https://instagram.com/vicenzodf",
  instagramNews: "https://instagram.com/vicenzonews",
  tiktok: "https://www.tiktok.com/@vicenzodf",
  facebook: "https://facebook.com/vicenzodf",
  linkedin: "https://linkedin.com/in/marco-vicenzo-62b068176",
  whatsappDirect: "https://wa.me/5561992693187",
  whatsappGroup: "https://chat.whatsapp.com/vicenzodf",
  candidateNumber: "55.678",
  party: "PSD",
  partyNumber: "55",
  cargo: "Deputado Distrital",
  uf: "Distrito Federal",
  election: "2026",
};

export const analyticsConfig = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID ?? "",
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID ?? "",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "G-EFP1VN0ZEE",
};
