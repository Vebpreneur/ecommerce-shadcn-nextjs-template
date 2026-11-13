# eSIMval – marknadsplats, produktdata, SEO och monetisering

**Projekt:** Vebpreneur/ecommerce-shadcn-nextjs-template  
**Arbetsgren:** main (inga nya grenar)  
**Utveckling:** VS Code + GitHub Codespaces  
**Drift:** Ingen manuell Vercel-publicering utan uttryckligt uppdrag  
**Grundprincip:** Utöka mallens befintliga komponenter; behåll originalet och tidigare historik.

## Beslut 2026-11-13: affiliate-only och Simzy

- **Ingen egen försäljning eller kassa tills vidare.** Yesims återförsäljar-API ska inte användas för beställning, betalning, provisionering eller aktivering. En read-only produktfeed kan vara aktuell endast om avtalet uttryckligen medger affiliatepublicering.
- **Simzy** är tillagd i katalogen, med användarens affiliate-URL `https://simzy.sjv.io/MKLqeJ`, slug `simzy`, sajt `simzy.com`. Logotyp hämtas tillfälligt via favikon tills användaren tillhandahåller varumärkesfil.
- Inte alla leverantörer måste ha fullständiga paketlistor. För varje leverantör räcker en korrekt profil och en giltig utgående affiliate-URL. Paketjämförelser ska endast visa faktiskt verifierade datapaket.
- Varje paketkälla har **egen rätt att återpublicera** och länkpolicy. Att en MCP-server eller API tekniskt visar konkurrerande leverantörers erbjudanden innebär inte att dess data får återpubliceras obegränsat eller att deras köplänkar tjänar provision till eSIMval.

### Prioriterade dataflöden och deras begränsningar

| Källa | Affärsnytta | Viktig begränsning |
|---|---|---|
| Airalo via Travelpayouts | Officiell feed med paketpris, datamängd, giltighet, bilder m.m. för affiliatemarknadsplatser | Anslutet Travelpayouts-projekt krävs; produktlänkar i feed är **inte spårade** innan de konverterats till affiliate-URL:er |
| eSIM Advice REST/MCP | Bred multi-provider-jämförelse, prisindex, många destinationer | Gratis för kommersiell användning enligt publicerade villkor **med tydlig attribution** till eSIM Advice; prisuppdatering veckovis; köplänkar kan vara tredjepartslänkar som inte tillhör eSIMvals affilates |
| esimdata.app REST/MCP | Multi-provider-sökning, prisjämförelse, telefonkompatibilitet | Gratis inom fair-use; villkoren förbjuder återförsäljning av bulkdata som ens egen och kräver attribuering vid visning |
| ConnectMeGuru | Offentlig read-only feed för deras **egna** eSIM-produkter med pris, paketdata och länk | Inte ett multi-provider-API; använd deras korrekta referral-code för provision |
| esimoa Public API + MCP | Söka esimoas egna eSIM-paket och få köplänkar med partnerkod | Kräver esimoa-konto/API-nyckel för affiliatetracking; inte en övergripande datakälla för alla leverantörer |
| Simzy | Officiell affiliate-URL; lämplig som katalogpost | Ingen verifierad fri partnerfeed ännu; uppge inte aktuella paketpriser utan dataåtkomst |

Verifieringskällor:
- https://support.travelpayouts.com/hc/en-us/articles/17131439719826-Data-from-Airalo
- https://esimadvice.com/developers
- https://esimdata.app/agents/
- https://esimdata.app/terms/
- https://www.connectmeguru.com/pages/api-documentation
- https://esimoa.com/en/developers/docs
- https://simzy.com/

**Praktisk integrationsordning:** 1) Airalos officiella Travelpayouts-feed med korrekta spårade länkar, 2) en tillåten multi-provider-källa för bred jämförelse, 3) partnerfeeds där de är godkända, 4) manuella leverantörskort och affiliate-länkar för resten. Bygg adapter + cache + källmärkning + `verifiedAt` + fail-closed vid saknade priser. Visa aldrig ett annat företags affiliate-länk som om den tillhörde eSIMval.

## Vision

Bygg en ledande svensk resurs för rese-eSIM: en trovärdig, snabb och omfattande katalog där besökaren kan hitta leverantörer, förstå eSIM, jämföra faktiska paket på lika villkor och gå vidare till respektive leverantör. Möjlig egen försäljning via återförsäljar-API är **en senare separat affärsgren**, inte något som ska aktiveras utan att hela köpupplevelsen och avtalen är klara.

### Uppdelning av verksamheten

1. **Discovery & affiliate:** Katalog och SEO-innehåll. Besökaren köper hos leverantören via spårbar länk.
2. **Comparison:** Normaliserade paketdata från flera källor; verifierad pris-, data- och giltighetsjämförelse med tidsstämplar. Ingen prisrankning på uppskattningar.
3. **Resale (framtida):** Egen kassa och eSIM-leverans via Yesim eller annat godkänt partner-API. Behandlas som separat handelsflöde med tydliga roller och kundansvar.
4. **Relevant travel monetization:** Travelpayouts hotellsökning, flyg, aktiviteter eller transfertjänster på reseguider där det löser besökarens faktiska problem. Ej allmän sajtövergripande reklam.

## Genomfört i repositoryt

- Ljust, enhetligt eSIMval-designsystem med komponenter för kort, sök, knappar, guider och artiklar.
- `/` HOME med resmål, leverantörer, information och artiklar.
- `/providers` och `/providers/[slug]` provider directory och storefronts.
- `/providers/[slug]/[destination]` destinationssidor, med paketdata-modell och ej-verifierade paket dolt för SEO.
- `/shop` eSIM-katalog i ny design; gamla NOVA-butikssidan bevarad separat i `components/legacy/original-shop-page.tsx`. Demoproduktdetaljer är dolda för besökare som standard.
- `/jamfor` interaktiv leverantörsjämförelse med upp till fyra leverantörer, samt verifierad paketflik (tom tills riktiga priser finns).
- `/artiklar`, `/artiklar/[slug]` artikelkatalog, återanvändbar artikelmall, relaterade artiklar, källor, innehållsförteckning, affiliatekort och möjlighet till reklam till höger/vänster eller inline.
- Sex längre kunskaps-/reseguider i `lib/esim-articles.ts`.
- `app/sitemap.ts`, `app/robots.ts`, kanoniska artikel-URL:er och Article-strukturerad data.
- `lib/esim-plans.ts`: schema för verifierade erbjudanden. **Ingen aktiv feed** ännu.
- `lib/esim-monetization.ts`: kontrollerad annons-/travel-widgetkonfiguration. **Inga externa widgetscript aktiva** ännu.

## Det vi måste göra för en verklig eSIM-jämförelsetjänst

### 1. Produktkällor och data

En enda normaliserad datamodell för alla provider-API:er eller godkända dataflöden, exempelvis:

- `providerId`, `providerProductId`, `destinationCodes` (ISO-koder)
- `dataGb` eller väl definierad `unlimited` + fair use-regler
- `validityDays`, `activationPolicy`, `coverageCountries`, `networks`
- `callsSms`, `hotspotAllowed`, `speedLimit`, `topUpSupported`
- `price`, `currency`, `taxIncluded` om källan anger detta
- `trackingUrl`, `source`, `verifiedAt`, `expiresAt`

Dessa fält får **inte fyllas med gissningar**. Skilj alltid på fakta från leverantören och eSIMvals redaktionella innehåll.

**Tekniskt flöde:** provider API → server-side adapter → validering → normalisering → databas/cache → index → filtersökning och produktsidor → regelbunden uppdatering med stale marking och felhantering.

Förslag: Next.js serverfunktioner, PostgreSQL/Supabase när källorna börjar bli många, cachning och schemalagd synk. Bevara API-nycklar endast i säkra servermiljövariabler, aldrig i klientkod eller i repositoryt. Lägg till rate-limit, retries med backoff, loggning och kontroll av API-avtal.

### 2. Riktig jämförelse

Jämför bara erbjudanden med samma destination och likvärdiga villkor. Visa datamängd, antal dagar, täckning, operatör/nät, hotspot, aktivering, hastighetsbegränsning och pris. Sortera först när källvaluta och valutakonvertering hanteras korrekt. Avvikande unlimited-/fair-use-villkor ska redovisas i klartext.

Bra filter: destination, GB, giltighet (dagar), eSIM-typ, leverantör, lägsta verifierade pris, lokal/regional/global, hotspot, refill.

Visa när erbjudandet senast kontrollerades. Om inget färskt pris finns: visa `Se aktuella priser hos leverantören`, inte en gammal prisuppgift.

### 3. Yesim återförsäljning (beslut senare)

Yesim beskriver officiellt ett Partner API för eSIM-återförsäljning, priskonfiguration och white-label-integration:
https://yesim.app/yesim-partner-api/

Innan kassa aktiveras:
- Verifiera faktiskt tilldelade API-rättigheter, endpoints, sandbox och begränsningar.
- Kartlägg produktlista, lager/tillgänglighet, pris, beställning, profil/QR-leverans, aktivering, refunderingsregler och fel.
- Välj betallösning, utför betalningsavstämning och gör fullständig order-/refund-hantering.
- Utred vem som är säljare gentemot konsumenten, vem som ansvarar för moms, kundsupport, ångerrätt, integritet och datasäkerhet.
- Bygg testsituationer för misslyckade betalningar, dubbelköp, redan använd QR-kod och pågående aktiveringsproblem.
- Kör inte riktiga betalningar i utvecklingsmiljön.

Den sparade NOVA-checkout-koden är ett **design- och implementationsunderlag**, inte en färdig eSIM-kassa.

### 4. SEO och redaktionellt innehåll

Använd svensk sökintent och bygg ämneskluster:

- **Pillar:** Vad är eSIM, hur installeras eSIM, eSIM för iPhone/Android, kompatibilitet, roaming.
- **Destination:** eSIM Turkiet, USA, Thailand, Japan, Storbritannien och övriga prioriterade länder. Varje guide ska innehålla verklig destination-specifik information.
- **Comparison:** Skillnaden mellan datamängder, giltighet, täckning, kostnad och leverantörer. Undvik ogrundade "bäst 2026"-påståenden.
- **Problemfrågor:** eSIM aktiveras inte, QR-kod fungerar inte, dubbla SIM, hotspot, roaming.
- **Köpnära sidor:** Verifierade paketlistor med datum, korrekta villkor och transparenta affiliatelänkar.

Ett bra artikelupplägg: sökintention → relevant introduktion → H2/H3-sektioner → originalvisualer/QR-illustrationer → faktagranskning och primärkällor → leverantörswidget → jämförelse → FAQ → internlänkar.

Markera sponsrade länkar med `rel="sponsored"` och gör reklam tydlig för läsaren. Säkerställ unikt innehåll, begriplig författar-/redaktionsinformation, relevanta källor och uppdateringsrutiner. Skapa inte massvis med tunna automatiska landningssidor.

### 5. Artiklar, sponsring och Travelpayouts

`components/esim/article-widgets.tsx` innehåller:
- `ArticleProviderWidget`: mini-leverantörskort, varumärkesikon och spårad utgångslänk.
- `ArticleSidebar`: innehållsförteckning, relaterad guide, leverantörer och valfri annons.
- `EditorialAd`: stöd för verifierad extern banner med märkningen ANNONS.
- `ArticleSourceLinks`: länkar till officiella källor.

`lib/esim-monetization.ts` har per-artikel-annonskonfiguration och en Travelpayouts-widgetregistry. En annons visas först när **riktig lokal kreativ bild, sponsor och giltig https-URL** är angivna.

**Travelpayouts val:** Börja med kontextuell hotellsökning på destinationsartiklar. Därefter eventuellt flyg och utflykter. Använd inte främmande resewidgets i leverantörernas produktgrid, och låt eSIM vara den primära konverteringen. Anpassa widgetens språk, valuta och layout om programmet tillåter det.

Travelpayouts officiella källor:
- https://support.travelpayouts.com/hc/en-us/articles/360031977872-Getting-started-with-widgets
- https://support.travelpayouts.com/hc/en-us/articles/203955763-About-programs-on-the-Travelpayouts-platform
- https://support.travelpayouts.com/hc/en-us/articles/203955753-What-is-White-Label-Web-by-Travelpayouts

**Kräver från partnerkontot:** det riktiga widget-scriptet, aktiva program och kampanj-/partner-ID. Kopiera aldrig exempel-ID från dokumentation till produktion. Bädda in bara betrodda script på de sidor där widgeten används, med villkorsstyrd laddning och kontroll av integritet/samtycke där det krävs.

### 6. Kvalitet och lansering

Före produktionspublicering:
- Kör `pnpm install --frozen-lockfile`, `pnpm run build` och kontrollera konsolfel i Codespaces.
- Responsiva brytpunkter, tangentbordsnavigering, mobil sökning, bilder, rubrikstruktur och fokustillstånd.
- Testa alla interna länkar och externa affiliate länkar; verifiera tracking i respektive program.
- Sätt `NEXT_PUBLIC_SITE_URL=https://esimval.se` för denna variant. Kloner ska sätta **sin egen domän**.
- Kontrollera Search Console, canonical, robots och sitemap. Platshållarproduktsidor ska vara noindex tills verifierade paket finns.
- Kontrollera säkerhet för tredjepartsscript, API-hemligheter och ev. samtyckeskrav för annonser och analys.
- Skapa publiceringspolicy: uppdateringsansvar, uppgifter om partnerskap, integritet, kontakt, rättelser.
- Publicera inte till Vercel förrän ägaren uttryckligen ber om det.

## Prioriterad arbetsordning

1. **Verifiera Yesim Partner API-åtkomst och tillåtna dataanvändningar.** Få autentiserad offertfeed för en destination, inte omedelbar kassa.
2. Normalisera och lagra **riktiga** planer från Yesim. Lägg till Airalo/övriga först via deras godkända API:er eller dataflöden.
3. Fyll jämförelseverktyget med verifierade paket, filtrering och jämförbara kostnadsmått. Lägg till historik/freshness.
4. Förfina provider-kataloger med **riktiga varumärkeslogotyper**, unik information och relevanta paket.
5. Bygg 20–30 **högkvalitativa** destination-/köpguider innan storskalig expansion; mät synlighet och konvertering.
6. Aktivera en enda relevant Travelpayouts-widget på en lämplig reseguide; mät klick och intäkter innan fler placeringar.
7. Utvärdera egen försäljning som separat affärsbeslut när API-data, avtal, betalning och support är redo.

## Status och gränser

**Klart:** design, navigering, jämförelse-UI, SHOP eSIM-UI, återanvändbar SEO-artikelmall, sex guider, artikelwidgets, konfigurerbara annonser och sitemap.

**Inte klart:** inlästa faktiska eSIM-priser, paketdata från Yesim API, automatiska produktuppdateringar, live jämförelser av verkliga priser, Travelpayouts-script, aktiv annonskampanj, eSIM-kassa och visuell regressionstestning.

Fokusera nästa iteration på **riktiga och tillåtna produktdata** snarare än att skapa ytterligare prototypytor.
