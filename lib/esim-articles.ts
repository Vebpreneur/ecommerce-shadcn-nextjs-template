export type ArticleSection = {
  heading: string
  paragraphs: string[]
  image?: { src: string; alt: string; caption?: string }
}
export type Article = {
  slug: string
  category: string
  title: string
  description: string
  cover: string
  imageAlt: string
  readingMinutes: number
  sections: ArticleSection[]
}
const photo = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1500&q=85`

/** Reusable editorial content model. No invented tariffs, ratings or offers. */
export const ARTICLES: Article[] = [
  {
    slug: "vad-ar-esim",
    category: "eSIM-guiden",
    title: "Vad är eSIM och hur fungerar det?",
    description: "En introduktion till digitala SIM-kort, kompatibilitet och vad du behöver kontrollera innan resan.",
    cover: photo("photo-1451187580459-43490279c0fa"),
    imageAlt: "Jorden sedd från rymden",
    readingMinutes: 4,
    sections: [
      { heading: "Ett digitalt SIM-kort", paragraphs: [
        "eSIM är en digital SIM-teknik som är inbyggd i kompatibla telefoner och andra enheter. I stället för att sätta in ett fysiskt SIM-kort kan du installera en mobilprofil digitalt.",
        "För resenärer innebär det att det kan gå att lägga till ett särskilt abonnemang för resan utan att byta ut det vanliga SIM-kortet."
      ] },
      { heading: "Kontrollera din enhet först", paragraphs: [
        "Inte alla telefoner stöder eSIM. Stöd kan också variera mellan olika regionala modeller och operatörslåsta enheter.",
        "Kontrollera därför den exakta mobilmodellen samt leverantörens kompatibilitetskrav innan du köper ett paket."
      ], image: { src: photo("photo-1512941937669-90a1b58e7e9"), alt: "Mobiltelefon använd av resenär", caption: "Kontrollera enhetens stöd för eSIM före köp." } },
      { heading: "Täckning, data och giltighet", paragraphs: [
        "Det finns lokala, regionala och globala erbjudanden. Vilka länder som ingår, hur mycket data du får och när giltighetstiden börjar styrs av det specifika paketet.",
        "Jämför alltid villkoren direkt hos leverantören. Ett eSIM-paket kan också vara enbart för mobildata och sakna traditionella samtal eller SMS."
      ] },
    ],
  },
  {
    slug: "esim-infor-resan",
    category: "Reseguider",
    title: "Checklista: eSIM innan du reser",
    description: "Vad du ska kontrollera före avresa, från datamängd och giltighetstid till aktivering.",
    cover: photo("photo-1488085061387-422e29b40080"),
    imageAlt: "Flygplansvinge vid solnedgång",
    readingMinutes: 3,
    sections: [
      { heading: "Innan du väljer paket", paragraphs: [
        "Kontrollera destinationerna du ska besöka, om din telefon stöder eSIM och om den är upplåst för den leverantör du tänker använda.",
        "Fundera på hur mycket data du behöver för kartor, meddelanden, streaming och andra appar. Kontrollera även eventuell hastighetsbegränsning och rimlig användning."
      ] },
      { heading: "När ska du installera?", paragraphs: [
        "Installations- och aktiveringsvillkor varierar. En del profiler kan installeras i förväg, medan paketets giltighet kan börja vid installation eller första anslutning.",
        "Läs leverantörens instruktioner före avresan och säkerställ att du har en stabil internetanslutning när du installerar profilen."
      ] },
      { heading: "När du är framme", paragraphs: [
        "Välj rätt eSIM-profil för mobildata och kontrollera vilka roaminginställningar paketet kräver. Inaktivera dataroaming på ditt vanliga abonnemang om du vill undvika oväntade kostnader.",
        "Spara leverantörens supportinstruktioner och kontaktvägar så att du har dem nära till hands."
      ] },
    ],
  },
]

export const getArticle = (slug: string) => ARTICLES.find(article => article.slug === slug)
