"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DESTINATIONS, PROVIDERS, type Provider } from "@/lib/esim"
import { EsimRippleHero } from "@/components/esim/ripple-hero"
import { ProviderLogo } from "@/components/esim/provider-logo"
import { LargeHeroSearch, PrintifyPrimaryLink } from "@/components/esim/printify-controls"
import { ProviderMarquee } from "@/components/esim/provider-marquee"

type CollectionProps = { provider?: Provider }

function MovingArrow({ label, inverse = false }: { label: string; inverse?: boolean }) {
  return (
    <span className={`group relative inline-flex h-10 items-center overflow-hidden rounded-full py-1 ps-4 pe-12 text-sm font-medium transition-all duration-500 hover:ps-12 hover:pe-4 ${inverse ? "bg-white text-[#181818]" : "bg-[#171717] text-white"}`}>
      <span className="relative z-10">{label}</span>
      <span className={`absolute right-1 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45 ${inverse ? "bg-[#181818] text-white" : "bg-white text-[#171717]"}`}>
        <ArrowUpRight size={16} />
      </span>
    </span>
  )
}

function CollectionHero({ provider, query, onQueryChange, onBrowse }: CollectionProps & { query: string; onQueryChange: (value: string) => void; onBrowse: () => void }) {
  return (
    <>
      <section className="esim-hero relative flex min-h-[510px] items-center justify-center overflow-hidden pt-10 md:min-h-[560px]">
        <EsimRippleHero />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-14 pt-6 text-center text-[#1a1d1f]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            {provider && (
              <div className="mb-5 flex justify-center">
                <ProviderLogo provider={provider} size="hero" />
              </div>
            )}
            <p className="esim-eyebrow mb-4">
              {provider ? "eSIM / LEVERANTÖR" : "UPPTÄCK / LEVERANTÖRER"}
            </p>
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {provider ? provider.name : "Alla leverantörer"}
            </h1>
            <p className="esim-hero-copy mx-auto mt-4 max-w-xl text-sm leading-7 md:text-base">
              {provider ? provider.description : "Utforska våra eSIM-leverantörer. Välj en butik och hitta din nästa destination."}
            </p>

            <div className="mx-auto mt-9 w-full max-w-[1050px]">
              <LargeHeroSearch value={query} onChange={onQueryChange} onSearch={onBrowse}
                label={provider ? "Sök leverantörens destinationer" : "Sök leverantörer"}
                placeholder={provider ? "Sök bland länder och regioner…" : "Sök bland alla leverantörer…"} />
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {provider && <PrintifyPrimaryLink href={provider.affiliateUrl} external>Besök officiell webbplats</PrintifyPrimaryLink>}

            </div>
            {provider && <p className="mt-3 text-xs text-[#71797b]">Extern affiliatelänk. Vi kan få provision.</p>}
          </motion.div>
        </div>
      </section>
      <ProviderMarquee />
    </>
  )
}


export function StoreCard({ provider }: { provider: Provider }) {
  return (
    <article className="esim-card group flex h-full flex-col">
      <Link href={`/providers/${provider.slug}`} aria-label={`Visa ${provider.name}`} className="esim-card-image relative block">
        <img src={provider.cover} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <ProviderLogo provider={provider} className="absolute bottom-4 left-4" />
      </Link>
      <div className="esim-card-body">
        <span className="esim-eyebrow">eSIM-leverantör</span>
        <h2 className="esim-card-title mt-2"><Link href={`/providers/${provider.slug}`} className="hover:underline">{provider.name}</Link></h2>
        <p className="esim-card-copy mb-6 mt-3 min-h-[48px]">{provider.description}</p>
        <Link href={`/providers/${provider.slug}`} className="esim-card-link" aria-label={`Utforska ${provider.name}`}>
          Visa leverantör <span className="esim-card-link-icon"><ArrowUpRight className="size-4" /></span>
        </Link>
      </div>
    </article>
  )
}

export function DestinationCard({ provider, destination }: { provider: Provider; destination: typeof DESTINATIONS[number] }) {
  return (
    <article className="esim-card group flex h-full flex-col">
      <Link href={`/providers/${provider.slug}/${destination.slug}`} aria-label={`Visa ${destination.name} hos ${provider.name}`} className="esim-card-image relative block">
        <img src={destination.image} alt={destination.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#222] shadow-sm">{destination.kind}</span>
        <ProviderLogo provider={provider} className="absolute bottom-4 left-4" />
      </Link>
      <div className="esim-card-body">
        <span className="esim-eyebrow">{provider.name}</span>
        <h2 className="esim-card-title mt-2"><Link href={`/providers/${provider.slug}/${destination.slug}`} className="hover:underline">{destination.name}</Link></h2>
        <p className="esim-card-copy mb-6 mt-3 min-h-[48px]">Utforska eSIM för {destination.name} och kontrollera aktuella alternativ hos {provider.name}.</p>
        <Link href={`/providers/${provider.slug}/${destination.slug}`} className="esim-card-link" aria-label={`Utforska ${destination.name}`}>
          Utforska eSIM <span className="esim-card-link-icon"><ArrowUpRight className="size-4" /></span>
        </Link>
      </div>
    </article>
  )
}

function CollectionEditorial({ provider }: CollectionProps) {
  const title = provider ? "Välj eSIM inför resan." : "En plats för dina eSIM-val."
  const description = provider
    ? `Hitta en destination hos ${provider.name}. Vi visar vägen till leverantören där du kan jämföra aktuella erbjudanden, priser och villkor.`
    : "Utforska leverantörer på ett och samma ställe. Öppna en storefront, välj destination och fortsätt till leverantörens egna erbjudanden."
  return (
    <section className="esim-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
      <div className="esim-editorial grid lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-7 p-8 sm:p-12 lg:p-16">
          <p className="esim-eyebrow">ENKLARE ATT UTFORSKA</p>
          <h2 className="max-w-lg text-3xl font-medium tracking-tight md:text-5xl">{title}</h2>
          <p className="esim-text-muted max-w-lg text-base leading-8">{description}</p>
          <div>
            <Link href={provider ? "/providers" : "/providers/airalo"} className="group inline-block">
              <MovingArrow label={provider ? "Alla leverantörer" : "Upptäck Airalo"} />
            </Link>
          </div>
        </div>
        <div className="min-h-[330px] overflow-hidden lg:min-h-[450px]">
          <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1300&q=85" alt="Resväg genom ett landskap" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  )
}

/** Layout derived from the existing /shop Collection page; source components remain unchanged. */
export default function EsimCollection({ provider }: CollectionProps) {
  const [filter, setFilter] = useState("Alla")
  const [query, setQuery] = useState("")
  const resultsRef = useRef<HTMLElement>(null)
  const onBrowse = () => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  const tabs = provider ? ["Alla", "Länder", "Regioner", "Globalt"] : ["Alla", "A–Ö"]
  const visibleProviders = useMemo(() => {
    const filtered = PROVIDERS.filter(p => p.name.toLocaleLowerCase("sv").includes(query.trim().toLocaleLowerCase("sv")))
    return filter === "A–Ö" ? [...filtered].sort((a, b) => a.name.localeCompare(b.name, "sv")) : filtered
  }, [filter, query])
  const visibleDestinations = useMemo(() =>
    DESTINATIONS.filter(d => (filter === "Alla" || d.kind === filter) && d.name.toLocaleLowerCase("sv").includes(query.trim().toLocaleLowerCase("sv"))),
    [filter, query]
  )
  const total = provider ? visibleDestinations.length : visibleProviders.length
  return (
    <main className="esim-page">
      <CollectionHero provider={provider} query={query} onQueryChange={setQuery} onBrowse={onBrowse} />
      <section id="esim-results" ref={resultsRef} className="esim-section mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="esim-eyebrow">{provider ? "DESTINATIONER" : "LEVERANTÖRSKATALOG"}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{provider ? `Utforska ${provider.name}` : "Alla leverantörer"}</h2>
            <p className="esim-text-muted mt-3 max-w-xl text-sm leading-7">
              {provider ? "Destinationerna är exempel för navigering. Aktuellt utbud, täckning och priser verifieras hos leverantören." : "Välj leverantör för att besöka deras storefront och se destinationer."}
            </p>
          </div>
          <span className="esim-text-muted shrink-0 text-sm">{total} {provider ? "destinationer" : "leverantörer"}</span>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-y border-[#e5e8e5] py-5 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2" role="group" aria-label={provider ? "Filtrera destinationer" : "Sortera leverantörer"}>
            {tabs.map(tab => (
              <Button key={tab} type="button" variant="outline" onClick={() => setFilter(tab)}
                data-selected={tab === filter} className="esim-pill">{tab}</Button>
            ))}
          </div>
          <label className="esim-field flex h-10 w-full items-center gap-2 px-3 md:max-w-xs">
            <Search className="size-4 text-[#777]" aria-hidden="true" />
            <span className="sr-only">Sök {provider ? "destination" : "leverantör"}</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder={provider ? "Sök land eller region" : "Sök leverantör"} type="search"
              className="w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#888]" />
          </label>
        </div>
        {total === 0 ? (
          <div className="py-20 text-center text-[#777]">Inga träffar. Prova en annan sökning.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 py-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {provider
              ? visibleDestinations.map(destination => <DestinationCard key={destination.slug} provider={provider} destination={destination} />)
              : visibleProviders.map(item => <StoreCard key={item.slug} provider={item} />)}
          </div>
        )}
      </section>
      <CollectionEditorial provider={provider} />
      <section className="esim-dark-end px-4 py-20 text-center">
        <p className="esim-eyebrow">UPPTÄCK MER</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">Din nästa destination väntar.</h2>
        <p className="esim-text-muted mx-auto mt-4 max-w-xl text-sm leading-7">Vi hjälper dig att upptäcka leverantörer och alternativ – själva köpet gör du alltid hos leverantören.</p>
        <Link href={provider ? "/providers" : "/providers/airalo"} className="group mt-7 inline-block">
          <MovingArrow inverse label={provider ? "Alla leverantörer" : "Se Airalo"} />
        </Link>
      </section>
    </main>
  )
}
