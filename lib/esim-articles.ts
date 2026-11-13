export type ArticleSection = {
  heading: string
  paragraphs: string[]
  image?: { src: string; alt: string; caption?: string }
  widget?: "providers" | "comparison"
}
export type Article = {
  slug: string
  category: string
  title: string
  description: string
  cover: string
  imageAlt: string
  readingMinutes: number
  providers?: string[]
  destinationSlug?: string
  sidebarSide?: "left" | "right"
  sources?: { label: string; url: string }[]
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
    readingMinutes: 7,
    providers: ["airalo", "yesim", "saily"],
    sources: [
      {label:"Apple Support – Set up eSIM on iPhone", url:"https://support.apple.com/en-us/118669"},
      {label:"Google Pixel Help – Set up a new eSIM", url:"https://support.google.com/pixelphone/answer/16115470"}
    ],
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
      { heading:"Så installerar du en eSIM-profil", paragraphs:[
        "Installationen börjar vanligtvis med att du beställer ett paket från en leverantör och får instruktioner för att lägga till den digitala profilen. En leverantör kan använda QR-kod, aktiveringslänk, app eller manuell installation.",
        "På iPhone kan eSIM läggas till via mobildatainställningarna. Android-telefoner har olika menyer beroende på tillverkare, men på Pixel beskriver Google flödet via nätverksinställningar och SIM-hantering.",
        "Kontrollera alltid om giltigheten startar vid köp, installation, aktivering eller första anslutning. Om perioden börjar för tidigt kan en del av resans datadagar gå förlorade."
      ] },
      { heading:"eSIM jämfört med ett vanligt SIM-kort", paragraphs:[
        "Ett vanligt SIM-kort sätts i telefonen som ett fysiskt kort. eSIM är i stället en digital profil som lagras i en kompatibel enhet. Skillnaden ligger alltså främst i hur abonnemanget levereras och hanteras, inte i att eSIM automatiskt ger bättre nät eller högre hastighet.",
        "Vissa telefoner kan hantera flera profiler och använda två linjer samtidigt. Hur detta fungerar beror på enheten och operatören. Ett rese-eSIM kan därför vara smidigt för mobildata medan ditt vanliga SIM finns kvar för samtal och SMS.",
        "För den som ofta reser kan en digital profil minska behovet av att byta fysiskt SIM. Men kompatibilitet, lokal täckning och leverantörens regler är fortfarande avgörande."
      ], widget:"providers" },
      { heading:"Vad kostar eSIM och hur jämför man?", paragraphs:[
        "Priset på ett eSIM-paket beror bland annat på destination, datamängd, giltighetstid, nätverk och leverantör. Jämför därför inte bara den lägsta siffran på en produktsida.",
        "Ett rättvist jämförelsemått kan vara pris per GB, men bara när båda paketen har jämförbar täckning och giltighet. Om ett paket är obegränsat behöver du också kontrollera hastighetsbegränsningar och fair-use-villkor.",
        "Innan eSIMval publicerar faktiska prisjämförelser kommer varje pris att behöva kopplas till en verifierad paketkälla och tidpunkt. Under tiden kan du använda vår leverantörsjämförelse för att hitta relevanta officiella erbjudanden."
      ], widget:"comparison" },
    ],
  },
  {
    slug: "esim-infor-resan",
    category: "Reseguider",
    title: "Checklista: eSIM innan du reser",
    description: "Vad du ska kontrollera före avresa, från datamängd och giltighetstid till aktivering.",
    cover: photo("photo-1488085061387-422e29b40080"),
    imageAlt: "Flygplansvinge vid solnedgång",
    readingMinutes: 7,
    providers: ["airalo", "yesim", "saily"],
    sources: [
      {label:"Apple Support – eSIM while traveling internationally", url:"https://support.apple.com/en-us/118227"}
    ],
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
      { heading:"Så väljer du rätt data och antal dagar", paragraphs:[
        "Utgå från hur du normalt använder telefonen. En resa där du använder kartor, mejl och meddelanden skiljer sig från en semester med mycket videostreaming eller arbete via internetdelning.",
        "Kontrollera också när paketets giltighet börjar. Om du anländer sent på kvällen eller ska byta land under resan kan start- och slutvillkor spela stor roll.",
        "Läs om eventuell påfyllning och begränsningar för hotspot. Ett stort datapaket med kort giltighet kan vara mindre användbart än ett mindre paket som räcker hela resan."
      ] },
      { heading:"Jämför pris och paketvillkor", paragraphs:[
        "Jämför alltid samma destinationer, antal dagar och uppskattat databehov. Täckningslistor kan skilja sig mellan ett lokalt paket, ett regionalt paket och ett globalt erbjudande.",
        "Se om paketet bara gäller data eller om samtal och SMS ingår. Kontrollera också om det finns en policy för rimlig användning eller hastighetsgränser efter en viss surfmängd.",
        "Använd jämförelseverktyget för att gå vidare till leverantörerna. eSIMval visar inte obekräftade paketpriser som om de vore aktuella erbjudanden."
      ],widget:"comparison" },
      { heading:"Sju saker att kontrollera före avresa", paragraphs:[
        "Börja med att säkerställa eSIM-stöd, rätt destination och kompatibilitet med din telefon. Kontrollera därefter datapott, giltighetstid, täckning och villkor för aktivering.",
        "Spara orderinformation och installationsinstruktioner så att du kan nå dem utan mobildata. Se också till att veta hur leverantörens kundsupport kontaktas.",
        "När du har gjort dessa kontroller är det betydligt lättare att använda telefonen direkt vid ankomst och att undvika onödiga roamingavgifter."
      ],widget:"providers" },
    ],
  },
{
  "slug": "esim-turkiet-guide",
  "category": "Destinationer",
  "title": "eSIM i Turkiet: komplett guide inför resan",
  "description": "Så väljer du rese-eSIM till Turkiet, planerar datamängden och undviker vanliga misstag med kompatibilitet och aktivering.",
  "cover": "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1500&q=85",
  "imageAlt": "Moské i Istanbul i Turkiet",
  "readingMinutes": 7,
  "destinationSlug": "turkiet",
  "providers": [
    "airalo",
    "yesim",
    "saily",
    "drimsim"
  ],
  "sources": [
    {
      "label": "Apple Support – eSIM på internationella resor",
      "url": "https://support.apple.com/en-us/118227"
    },
    {
      "label": "Google Pixel Help – Set up a new eSIM",
      "url": "https://support.google.com/pixelphone/answer/16115470"
    }
  ],
  "sections": [
    {
      "heading": "Behöver du eSIM när du reser till Turkiet?",
      "paragraphs": [
        "Ett rese-eSIM är ett sätt att skaffa mobildata på resmålet utan att köpa och sätta i ett fysiskt SIM-kort. För den som reser från Sverige kan det vara särskilt relevant att jämföra separat reseuppkoppling med det vanliga mobilabonnemangets utlandspriser.",
        "Turkiet ingår inte automatiskt i den EU-roaming som många svenska abonnemang erbjuder inom EU och EES. Vilka priser som gäller för just dig beror på ditt abonnemang, operatör och eventuella utlandstillägg. Kontrollera ditt befintliga avtal innan du köper ett extra datapaket.",
        "Ska du bara använda Wi-Fi på hotellet kan behovet vara begränsat. Behöver du kartor, bokningsbekräftelser, taxi-appar och meddelanden under hela resan är ett mobildatapaket ofta mer praktiskt."
      ]
    },
    {
      "heading": "Jämför leverantörer för Turkiet",
      "paragraphs": [
        "Börja med att kontrollera vilka leverantörer som faktiskt erbjuder Turkiet som destination. Gå sedan vidare till deras officiella paketlistor för att jämföra datapott, giltighetstid, pris och eventuella användningsbegränsningar.",
        "Vissa erbjudanden kan vara för ett enda land medan andra täcker en region. Betala inte extra för regional täckning om du bara ska vistas i Turkiet, men välj inte ett lokalt paket om du även behöver täckning i exempelvis ett transitland.",
        "eSIMval samlar länkar och jämförelsefunktioner, men paketpriser och lagersaldo hämtas ännu inte automatiskt från alla leverantörer. Uppgifter som inte är verifierade visas därför inte som faktiska erbjudanden."
      ],
      "widget": "providers"
    },
    {
      "heading": "Hur mycket surf behöver du i Turkiet?",
      "paragraphs": [
        "För en kortare stadsresa kan databehovet vara relativt litet om du i huvudsak använder meddelanden, kartor och sporadisk surf. Videoströmning, stora bilduppladdningar och internetdelning kan däremot öka förbrukningen snabbt.",
        "Se över telefonens statistik för tidigare dataanvändning och uppskatta hur många dagar du behöver vara uppkopplad. Välj hellre utifrån ditt faktiska användningsmönster än en generell rekommendation om ett visst antal GB.",
        "Kontrollera även om paketet har en daglig gräns, begränsad hastighet efter en viss mängd data eller möjlighet till påfyllning. Ordet obegränsad behöver inte betyda obegränsad fullhastighetssurf."
      ]
    },
    {
      "heading": "Installera hemma eller efter ankomst?",
      "paragraphs": [
        "Många rese-eSIM kan installeras medan du fortfarande har en stabil internetuppkoppling hemma. Men installationsdatum och aktiveringsdatum är inte alltid samma sak, och hos vissa leverantörer kan giltigheten börja redan vid installation.",
        "Läs därför aktiveringsvillkoren före avresan. Spara också leverantörens QR-kod eller instruktioner på ett säkert sätt och se till att du kan komma åt dem även när den vanliga uppkopplingen inte fungerar.",
        "När du landar väljer du vilken SIM-profil som ska användas för mobildata och följer leverantörens anvisningar om dataroaming. Kontrollera ditt vanliga abonnemangs roaminginställningar för att undvika oväntade avgifter."
      ]
    },
    {
      "heading": "Checklista innan du beställer",
      "paragraphs": [
        "Kontrollera först eSIM-stöd och eventuell operatörslåsning på din mobil. Därefter behöver du bekräfta täckning i landet, datapott, giltighetstid, aktiveringsvillkor och om samtal eller SMS ingår.",
        "Läs leverantörens återbetalnings- och supportvillkor. Se även om det finns särskilda krav för internetdelning eller användning i flera nätverk. Det är dessa skillnader som i praktiken avgör om två paket är jämförbara.",
        "När du har gjort jämförelsen kan du gå vidare via leverantörskorten och kontrollera det slutliga priset på leverantörens webbplats."
      ],
      "widget": "comparison"
    }
  ]
},
{
  "slug": "esim-usa-guide",
  "category": "Destinationer",
  "title": "eSIM i USA: guide till surf, täckning och giltighet",
  "description": "Planera mobildata i USA: vilka villkor du ska kontrollera, hur länge paketet ska gälla och hur du installerar eSIM.",
  "cover": "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=1500&q=85",
  "imageAlt": "Frihetsgudinnan och New Yorks skyline",
  "readingMinutes": 7,
  "destinationSlug": "usa",
  "providers": [
    "airalo",
    "yesim",
    "saily",
    "bytesim"
  ],
  "sources": [
    {
      "label": "Apple Support – eSIM på internationella resor",
      "url": "https://support.apple.com/en-us/118227"
    },
    {
      "label": "Google Pixel Help – Set up a new eSIM",
      "url": "https://support.google.com/pixelphone/answer/16115470"
    }
  ],
  "sections": [
    {
      "heading": "Varför jämföra eSIM inför en USA-resa?",
      "paragraphs": [
        "I USA kan mobiluppkoppling vara viktig för navigation, transportappar, hotellbokningar och kontakt med resesällskap. Ett digitalt rese-SIM kan vara ett alternativ till att använda det svenska abonnemangets ordinarie roaming.",
        "Svenska abonnemangs villkor i USA varierar, och paket för internationell roaming kan prissättas på olika sätt. Kontrollera vad du redan har innan du beställer något nytt.",
        "eSIM kräver stöd i den exakta telefonmodellen. Att två telefoner har samma modellnamn innebär inte alltid att de har identiska regionala specifikationer."
      ]
    },
    {
      "heading": "Täckning är viktigare än enbart lägsta pris",
      "paragraphs": [
        "USA är stort och uppkopplingsbehoven kan se olika ut på en stadsresa och en bilresa genom glesbygd. Jämför därför inte bara antalet GB eller priset, utan även vilka mobilnät som används och vilken täckning leverantören anger.",
        "En leverantör kan använda olika samarbetspartner i olika områden. Kontrollera nätverksinformation och villkor på den officiella produktsidan för just det paket du funderar på.",
        "Om du ska röra dig mellan flera delstater är giltighetstid och verklig nätverksåtkomst särskilt viktiga att granska. Undvik att förväxla ett stort antal destinationer på leverantörens webbplats med verifierad täckning för ett enskilt paket."
      ],
      "widget": "providers"
    },
    {
      "heading": "Välj datamängd efter vad du faktiskt använder",
      "paragraphs": [
        "Streaming och videosamtal kan kräva betydligt mer mobildata än kartor, e-post och meddelanden. Ta reda på hur mycket data du har använt på tidigare resor och anpassa valet efter resans längd.",
        "Läs om eventuell begränsning för hotspot, maximal hastighet, dagliga datatak eller så kallad fair use. Om du arbetar på distans kan pålitlighet och förutsägbara begränsningar vara viktigare än en lägre startkostnad.",
        "Om resan blir längre än planerat kan det vara värdefullt att kontrollera om paketet går att fylla på. Alla erbjudanden har inte samma möjlighet till top-up."
      ]
    },
    {
      "heading": "Installera och använda ditt eSIM",
      "paragraphs": [
        "Följ installationsinstruktionerna från leverantören. På kompatibla enheter kan installation ske via QR-kod, app, operatörslänk eller manuell aktiveringsinformation.",
        "Se till att vara ansluten till ett tillförlitligt Wi-Fi när profilen laddas ned. Kontrollera när giltighetstiden börjar och aktivera inte för tidigt om villkoren gör att dagar annars går förlorade.",
        "På plats väljer du reseprofilen för mobildata och följer anvisningar om eventuell roaming. Kontrollera att det svenska SIM-kortet inte använder dyr dataroaming av misstag."
      ]
    },
    {
      "heading": "Så väljer du mellan flera erbjudanden",
      "paragraphs": [
        "Jämför erbjudanden på samma grund: land, datapott, antal dagar, eventuella begränsningar och valuta. Ett paket med mer data är inte automatiskt mer prisvärt om giltigheten är för kort eller täckningen inte passar resan.",
        "Ta också hänsyn till support, återbetalning och hur enkelt det är att installera profilen. Läs villkor på leverantörens webbplats och gör köpet först när du har bekräftat innehållet.",
        "Du kan använda eSIMvals jämförelsevy för att välja mellan leverantörer. Prisjämförelse mellan specifika paket visas först när vi har verifierat jämförbara uppgifter."
      ],
      "widget": "comparison"
    }
  ]
},
{
  "slug": "esim-europa-guide",
  "category": "Destinationer",
  "title": "eSIM i Europa: när behövs ett extra datapaket?",
  "description": "Så skiljer du EU-roaming från rese-eSIM och jämför lokala, regionala och internationella datapaket.",
  "cover": "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1500&q=85",
  "imageAlt": "Storstad och resevy i Europa",
  "readingMinutes": 7,
  "destinationSlug": "europa",
  "providers": [
    "airalo",
    "yesim",
    "saily",
    "voye-global"
  ],
  "sources": [
    {
      "label": "Apple Support – eSIM på internationella resor",
      "url": "https://support.apple.com/en-us/118227"
    }
  ],
  "sections": [
    {
      "heading": "Behöver du verkligen köpa eSIM inom Europa?",
      "paragraphs": [
        "För många svenska mobilabonnemang gäller regler om roaming till inhemska villkor i EU och EES, men det finns undantag, begränsningar och fair-use-villkor. Därför ska du alltid börja med att kontrollera det abonnemang du redan har.",
        "Europa och EU/EES är inte samma geografiska område. Länder som kan ingå i ett kommersiellt Europa-paket behöver inte omfattas av samma roamingvillkor som EU-medlemsländer.",
        "Det kan finnas goda skäl att välja ett rese-eSIM ändå: extra datamängd, längre resor, arbete med internetdelning eller en resa som omfattar flera länder utanför den vanliga roamingzonen."
      ]
    },
    {
      "heading": "Lokalt, regionalt eller globalt?",
      "paragraphs": [
        "Ett lokalt paket riktar sig normalt till ett land, medan ett regionalt paket kan omfatta flera länder. Globalt betyder inte nödvändigtvis att alla länder på jorden ingår, utan att leverantören erbjuder en mer omfattande destinationstäckning.",
        "Kontrollera alltid den faktiska landslistan. Det är särskilt viktigt på tågresor eller bilresor med flera gränspassager där mobilen kan växla mellan mobilnät.",
        "Jämför om giltigheten fortsätter räknas under hela resan, och om paketet kan aktiveras igen eller fyllas på."
      ]
    },
    {
      "heading": "Jämför på lika villkor",
      "paragraphs": [
        "Utgå från vilka länder du ska besöka, hur många dagar du behöver uppkoppling och hur mycket data du använder. Jämför sedan tillgängliga paket som faktiskt täcker samma destinationer.",
        "Se efter om abonnemanget har hastighetsbegränsningar, dagliga datatak eller undantag för hotspot. Ett obegränsat paket kan fortfarande ha användningsvillkor.",
        "Kontrollera det slutliga priset och valutan hos leverantören. eSIMval visar inte någon automatisk prisrankning förrän verifierade priser har importerats."
      ],
      "widget": "providers"
    },
    {
      "heading": "Installera och aktivera på rätt sätt",
      "paragraphs": [
        "Det går ofta att installera eSIM i förväg via QR-kod eller app. Men om paketets giltighet börjar vid installation kan det vara smartare att vänta. Följ alltid leverantörens instruktioner.",
        "Kontrollera att telefonen kan använda den nya profilen och att du vet vilket SIM som är inställt för mobildata. Tänk på att samtal och SMS ofta hanteras av ditt vanliga abonnemang om rese-eSIM bara ger data.",
        "Spara installationsuppgifter och supportkontakt innan avresan. Om telefonen förlorar kontakt med nätet är dessa uppgifter användbara offline."
      ]
    },
    {
      "heading": "Vanliga misstag att undvika",
      "paragraphs": [
        "Ett vanligt misstag är att köpa ett Europa-paket utan att kontrollera den exakta landslistan. Ett annat är att köpa mer surf än man behöver, eller att glömma att giltighetstiden börjar enligt leverantörens villkor.",
        "Undvik också att förväxla ett eSIM som bara erbjuder data med ett abonnemang med telefonnummer. Kontakta leverantören om du är osäker på vad som ingår.",
        "Jämför leverantörer och läs deras paketvillkor innan du går vidare till betalning."
      ],
      "widget": "comparison"
    }
  ]
},
{
  "slug": "installera-esim-iphone-android",
  "category": "Installation",
  "title": "Installera eSIM på iPhone och Android – steg för steg",
  "description": "En praktisk guide till QR-kod, manuell installation, kompatibilitet, aktivering och vanliga felsituationer.",
  "cover": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9?auto=format&fit=crop&w=1500&q=85",
  "imageAlt": "Mobiltelefon och digital installation",
  "readingMinutes": 8,
  "providers": [
    "airalo",
    "yesim",
    "saily"
  ],
  "sources": [
    {
      "label": "Apple Support – Set up eSIM on iPhone",
      "url": "https://support.apple.com/en-us/118669"
    },
    {
      "label": "Google Pixel Help – Set up a new eSIM",
      "url": "https://support.google.com/pixelphone/answer/16115470"
    }
  ],
  "sections": [
    {
      "heading": "Förbered telefonen innan installation",
      "paragraphs": [
        "Kontrollera att din telefon har eSIM-stöd och att den inte är låst till en annan operatör på ett sätt som hindrar installation. Stöd för eSIM beror på exakt modell, region och ibland operatör.",
        "Förbered ett stabilt Wi-Fi och se till att du har tillgång till leverantörens installationsuppgifter. Det kan vara en QR-kod, ett aktiveringsmeddelande, en länk eller manuella uppgifter.",
        "Läs villkoren för när paketets giltighetstid startar. Du vill inte starta en tidsbegränsad period i onödan före avresan."
      ]
    },
    {
      "heading": "Installera eSIM på iPhone",
      "paragraphs": [
        "Apple beskriver flera installationssätt: operatörsaktivering, QR-kod, app, operatörslänk och manuell inmatning. Exakt vilka alternativ som finns beror på iOS-version, enhet och leverantör.",
        "När du fått en QR-kod kan du normalt gå till Inställningar och lägga till eSIM via mobildatainställningarna. Skanna QR-koden och följ instruktionerna. På vissa aktuella iOS-versioner kan en QR-kod i e-post eller webbläsare öppnas direkt för installation.",
        "När profilen finns i telefonen kan du välja den för mobildata. Läs leverantörens råd om roaming, standardlinje och samtal. Apple rekommenderar att du kontaktar operatören om aktiveringen inte fungerar."
      ],
      "widget": "providers"
    },
    {
      "heading": "Installera eSIM på Android",
      "paragraphs": [
        "Menynamnen skiljer sig mellan olika Android-tillverkare. På Google Pixel beskriver Google hur du går via Inställningar, Nätverk och internet, SIM-kort och Lägg till SIM eller Konfigurera eSIM.",
        "Följ anvisningarna i telefonen och instruktionerna från din specifika eSIM-leverantör. En QR-kod kan vara en del av processen, men det är inte den enda möjliga metoden.",
        "Kontrollera att profilen är installerad och att mobildata är kopplad till rätt SIM innan du börjar felsöka nätverket."
      ]
    },
    {
      "heading": "Vad betyder aktivering, installation och giltighet?",
      "paragraphs": [
        "Installation handlar om att hämta och lägga till profilen i telefonen. Aktivering innebär att tjänsten blir klar för användning enligt leverantörens process. Giltighet är den tid då det köpta paketet kan användas.",
        "Dessa tidpunkter behöver inte sammanfalla. Hos olika leverantörer kan giltigheten börja vid köp, installation, aktivering eller första användning. Läs det specifika paketets villkor, inte bara en allmän guide.",
        "När du reser är det klokt att ha installationsinstruktioner och orderbekräftelse sparade så att du kan komma åt dem även vid tillfällig nätverksstörning."
      ]
    },
    {
      "heading": "Om eSIM inte fungerar",
      "paragraphs": [
        "Börja med att kontrollera om profilen är installerad och vald för mobildata. Se över inställningar för roaming, flygplansläge och val av mobilnät utifrån leverantörens instruktioner.",
        "Om eSIM ännu inte installerats, säkerställ internetanslutningen och att QR-koden eller aktiveringsuppgifterna fortfarande är giltiga. Vissa aktiveringskoder kan bara användas enligt särskilda villkor.",
        "Kontakta leverantörens support innan du tar bort en profil som inte fungerar. Om du raderar den kan återinstallation kräva nya aktiveringsuppgifter."
      ]
    },
    {
      "heading": "Slutkontroll inför avresan",
      "paragraphs": [
        "Bekräfta att du har valt rätt destination, giltighetstid och datapott. Kontrollera att din telefon stöder eSIM, att profilen kan aktiveras enligt villkoren och att du vet hur supporten nås.",
        "Välj gärna ett paket med tydliga nätverksvillkor och en dokumenterad installationsprocess. Den billigaste lösningen är inte alltid den som passar resan bäst.",
        "Du kan börja med att jämföra leverantörer på eSIMval och därefter granska deras faktiska paket på respektive officiell webbplats."
      ],
      "widget": "comparison"
    }
  ]
}
]

export const getArticle = (slug: string) => ARTICLES.find(article => article.slug === slug)
