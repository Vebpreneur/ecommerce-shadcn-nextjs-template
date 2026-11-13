"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Check, Plus, X } from "lucide-react"
import { PROVIDERS, DESTINATIONS, type Provider } from "@/lib/esim"
import { VERIFIED_ESIM_PLANS } from "@/lib/esim-plans"
import { ProviderLogo } from "@/components/esim/provider-logo"

type Mode = "leverantorer" | "paket"
const detailRows: { label: string; value: (p: Provider) => string }[] = [
  { label: "Webbplats", value: p => p.website },
  { label: "Leverantör", value: p => p.name },
  { label: "Beskrivning", value: p => p.description },
  { label: "Aktuella paket", value: () => "Kontrollera hos leverantören" },
  { label: "Priser & giltighet", value: () => "Ej synkroniserade ännu" },
  { label: "Köp och kundservice", value: () => "Hos leverantören" },
]

export default function EsimCompare() {
  const [selected, setSelected] = useState<string[]>(["airalo", "yesim", "saily"])
  const [destination, setDestination] = useState("")
  const [mode, setMode] = useState<Mode>("leverantorer")
  const [search, setSearch] = useState("")
  const selectedProviders = PROVIDERS.filter(p => selected.includes(p.slug))
  const availableProviders = PROVIDERS.filter(p => p.name.toLocaleLowerCase("sv").includes(search.toLocaleLowerCase("sv")))
  const verifiedPlans = useMemo(() => VERIFIED_ESIM_PLANS.filter(p =>
    !destination || p.destinationSlug === destination
  ), [destination])

  function toggle(slug: string) {
    setSelected(old => old.includes(slug) ? old.filter(s=>s!==slug) : old.length < 4 ? [...old, slug] : old)
  }

  return <main className="esim-page">
    <section className="esim-hero px-4 pb-20 pt-32 text-center">
      <div className="esim-container">
        <p className="esim-eyebrow">ESIMVAL / JÄMFÖRELSE</p>
        <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">Jämför eSIM och leverantörer.</h1>
        <p className="esim-hero-copy mx-auto mt-5 max-w-2xl text-base leading-8">Jämför flera leverantörer sida vid sida. När verifierade paketpriser finns tillgängliga kan du också jämföra datamängd, giltighetstid och pris.</p>
      </div>
    </section>
    <section className="esim-section">
      <div className="esim-container space-y-10">
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={()=>setMode("leverantorer")} className="esim-pill" data-selected={mode==="leverantorer"}>Leverantörer</button>
          <button type="button" onClick={()=>setMode("paket")} className="esim-pill" data-selected={mode==="paket"}>Verifierade paket</button>
          <span className="esim-text-muted ml-auto text-sm">{PROVIDERS.length} leverantörer i katalogen</span>
        </div>

        {mode === "leverantorer" ? <>
          <div className="esim-editorial p-6 sm:p-9">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div><h2 className="text-2xl font-semibold">Välj upp till fyra leverantörer</h2>
              <p className="esim-text-muted mt-2 text-sm leading-7">Vi visar bara verifierbar kataloginformation, inte påhittade priser, täckningskartor eller kvalitetsbetyg.</p></div>
              <label className="block"><span className="sr-only">Sök leverantör</span><input className="esim-field h-12 w-full px-4 sm:w-56" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Sök leverantör..." /></label>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">{availableProviders.map(p => {
              const active=selected.includes(p.slug)
              return <button type="button" key={p.slug} onClick={()=>toggle(p.slug)} aria-pressed={active} disabled={!active&&selected.length>=4}
                className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${active?"border-[#1a1d1f] bg-[#1a1d1f] text-white":"border-[#e5e8e5] bg-white hover:bg-[#f1f4f1]"}`}>
                <span className="flex size-7 items-center justify-center rounded-lg bg-white p-1"><img src={p.logo||`https://www.google.com/s2/favicons?domain=${p.website}&sz=128`} alt="" className="size-full object-contain"/></span>
                {p.name} {active?<Check className="size-4"/>:<Plus className="size-4"/>}
              </button>
            })}</div>
          </div>

          <div className="esim-card overflow-x-auto">
            {selectedProviders.length===0?<p className="esim-text-muted p-10 text-center">Välj minst en leverantör för att visa jämförelsen.</p>:
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead><tr><th scope="col" className="w-[160px] border-b border-[#e5e8e5] p-5 font-semibold">Jämför</th>
                {selectedProviders.map(p=><th scope="col" key={p.slug} className="min-w-[160px] border-b border-l border-[#e5e8e5] p-5 align-top">
                  <div className="flex items-center gap-3"><ProviderLogo provider={p} size="inline"/><span className="text-base">{p.name}</span></div>
                  <button type="button" onClick={()=>toggle(p.slug)} className="esim-text-muted mt-3 flex items-center gap-1 text-xs font-medium"><X className="size-3"/> Ta bort</button>
                </th>)}
              </tr></thead>
              <tbody>{detailRows.map(row=><tr key={row.label}><th scope="row" className="border-b border-[#e5e8e5] p-5 align-top font-semibold">{row.label}</th>
                {selectedProviders.map(p=><td key={p.slug} className="esim-text-muted border-b border-l border-[#e5e8e5] p-5 align-top leading-6">{row.value(p)}</td>)}
              </tr>)}
              <tr><th scope="row" className="p-5">Utforska</th>{selectedProviders.map(p=><td key={p.slug} className="border-l border-[#e5e8e5] p-4">
                <Link href={`/providers/${p.slug}`} className="esim-button esim-button-secondary w-full text-xs">Visa butik <ArrowUpRight className="size-4"/></Link>
                <a href={p.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="esim-text-muted mt-3 inline-flex items-center gap-1 text-xs underline underline-offset-4">Leverantörens webbplats <ArrowUpRight className="size-3"/></a>
              </td>)}</tr>
              </tbody>
            </table>}
          </div>
        </>:<>
          <div className="esim-editorial p-6 sm:p-9">
            <h2 className="text-2xl font-semibold">Jämför verifierade abonnemang</h2>
            <p className="esim-text-muted mt-2 text-sm leading-7">Paketpriser läggs bara till när en källa är ansluten och uppgifterna är verifierade. Sorteringen är efter pris i ursprungsvalutan; blanda inte valutor för prisjämförelse.</p>
            <label className="mt-6 block max-w-sm"><span className="mb-2 block text-sm font-semibold">Destination</span>
              <select className="esim-field h-12 w-full px-4" value={destination} onChange={e=>setDestination(e.target.value)}>
                <option value="">Alla destinationer</option>{DESTINATIONS.map(d=><option key={d.slug} value={d.slug}>{d.name}</option>)}
              </select>
            </label>
          </div>
          {verifiedPlans.length===0?<div className="esim-card p-10 text-center">
            <h3 className="text-xl font-semibold">Inga verifierade paketpriser ännu</h3>
            <p className="esim-text-muted mx-auto mt-3 max-w-lg leading-7">Vi bygger dataintegrationen innan vi publicerar jämförbara priser. Under tiden kan du välja leverantör och kontrollera paketen direkt hos dem.</p>
            <button className="esim-button mt-6" onClick={()=>setMode("leverantorer")}>Jämför leverantörer <ArrowRight className="size-4"/></button>
          </div>:<div className="grid gap-4 md:grid-cols-2">{verifiedPlans.map(plan=><article key={plan.id} className="esim-card p-6">
            <p className="esim-eyebrow">{PROVIDERS.find(p=>p.slug===plan.providerSlug)?.name}</p>
            <h3 className="mt-2 text-xl font-semibold">{plan.name}</h3>
            <p className="esim-text-muted mt-3">{'amountGb' in plan.data ? `${plan.data.amountGb} GB`:"Obegränsad data"} · {plan.validityDays} dagar · {plan.coverageCountries.join(", ")}</p>
            <p className="mt-5 text-2xl font-semibold">{new Intl.NumberFormat("sv-SE",{style:"currency",currency:plan.currency}).format(plan.price)}</p>
            <a href={plan.purchaseUrl} target="_blank" rel="sponsored noopener noreferrer" className="esim-button mt-5">Se erbjudande <ArrowUpRight className="size-4"/></a>
          </article>)}</div>}
        </>}
      </div>
    </section>
  </main>
}
