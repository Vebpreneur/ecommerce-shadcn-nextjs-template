# eSIMval – eSIM Advice + esimdata (REST & MCP)

## Vad är implementerat?

- `.vscode/mcp.json`: två **fjärr-MCP-servrar** för kompatibla AI-agenter i VS Code / Codespaces:
  - `https://esimadvice.com/mcp` (verktyg: search_esim_plans, list_countries, list_providers, get_price_history, get_coupon_codes)
  - `https://esimdata.app/mcp` (verktyg: search_plans, get_plan, compare_plans, country_overview, check_phone, list_providers)
- `lib/esim-live/sources.ts`: server-only REST-adaptrar som normaliserar pris, datamängd, dagar, leverantör, källa, länk och kontrolltid.
- `app/api/esim/live/route.ts`: lokal read-only endpoint med land-/källval, tak på 40 poster per källa, 6,5 s timeout, fetch cache och tydlig attribution.
- `components/esim/live-plans.tsx`: paketjämförelse med land, källa, minst GB, dagar och sortering samt källmärkt pris/länk.
- `/shop` och `/jamfor`: visar det nya sökgränssnittet.
- `app/api/esim/phone/route.ts` och `components/esim/phone-check.tsx`: read-only modellkontroll på HOME, inspirerad av Voye Globals navigationsupplägg.

Detta är **inte egen eSIM-försäljning**. Allt är affiliatelänkar eller öppna jämförelselänkar som öppnas i extern webbplats.

## Så använder du det i Codespaces

1. `git pull origin main`
2. `pnpm install --frozen-lockfile` (om inte installerat)
3. `pnpm run typecheck` och `pnpm run build`
4. `pnpm run dev`
5. Besök `/shop` och välj land + källa.
6. Besök `/jamfor` och öppna fliken **Aktuella paket**.
7. Testa `/api/esim/live?country=TR&source=all&limit=10`.
8. Testa `/api/esim/phone?model=Pixel%208` (tjänsten kan svara att modellen är okänd).

I VS Code stöds workspace-MCP i `.vscode/mcp.json`. Öppna verktygslistan för MCP i din AI-klient och starta/bekräfta servrarna om klienten frågar. Detta skiljer sig från webbplatsens REST-gränssnitt: MCP-verktyg används av AI-agenter; REST-anrop används av webbsidorna.

## Datakällornas officiella dokumentation

- https://esimadvice.com/developers
- https://esimdata.app/agents/
- https://esimdata.app/terms/
- https://voyeglobal.com/

eSIM Advice: dokumenterat kostnadsfritt API med attributeringskrav, veckovis kontroll av leverantörernas priser och `/api/countries/{slug}/plans`. De publicerar också MCP-server på `/mcp`.

esimdata: kostnadsfritt API inom rimliga gränser, med attribution och förbud mot att återförsälja eller framställa bulkdata som vår egen. `/api/v1/plans?country=JP` och `/api/v1/phones?model=...` är dokumenterade. MCP finns på `/mcp`.

## Viktiga begränsningar

- Vi **hämtar inte en hel produktdatabas** till eSIMval. En enskild sökning hämtar högst 40 poster per källa. Ingen bulk-spegel eller automatiserad massiv crawl.
- Källornas priser och produktlänkar är **inte automatiskt eSIMvals affiliatelänkar**. Källornas produkt-URL:er leder via källans domän; våra egna leverantörs-URL:er märks separat och är inte länkade till ett särskilt paketpris.
- Samma paket kan förekomma två gånger, en gång från vardera källan. Deduplikering kräver gemensam SKU/matchningsregler.
- Paket kan ha skilda valutor. Prissorteringen får bara tolkas som jämförbar inom samma valuta.
- Ingen påhittad täckning, pris, ratings eller telefonkompatibilitet.
- API-dokumentationen har inspekterats, men extern runtime-anslutning och produktionsbygge måste verifieras i Codespaces. Om en källa returnerar ett annat JSON-schema får adaptern korrigeras efter ett riktigt exempel.
- Vänta med Vercel-deploy tills användaren begär det.

## Nästa steg

1. Testa båda externa anropen i Codespaces och spara ett anonymiserat exempel-JSON för respektive källa (inga API-nycklar).
2. Bekräfta svarsfält och korrigera typad adapter vid behov.
3. Utöka länder och regioner i `lib/esim-live/destinations.ts`, helst från en tillåten officiell katalog med ISO-koder.
4. Lägg till server-side dedupe utifrån godkänd leverantörsspecifik SKU, korrekt valutahantering och datakvalitet.
5. Integrera källmärkta paketkort på provider-/destinationssidor först efter att det faktiskt går att mappa deras utbud.
6. Lägg till strukturerad testning och lätt övervakning av svarstid, upstream 503 och rate limits.
