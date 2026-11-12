"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight, ArrowDown, Globe2, Search, Smartphone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DESTINATIONS, PROVIDERS, type Provider } from "@/lib/esim"
import { EsimRippleHero } from "@/components/esim/ripple-hero"
import { ProviderLogo } from "@/components/esim/provider-logo"

type CollectionProps = { provider?: Provider }

function MovingArrow({ label }: { label: string }) {
  return (
    <span className="group relative inline-flex h-10 items-center overflow-hidden rounded-full bg-[#171717] py-1 ps-4 pe-12 text-sm font-medium text-white transition-all duration-500 hover:ps-12 hover:pe-4">
      <span className="relative z-10">{label}</span>
      <span className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#171717] transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </span>
  )
}

function CollectionHero({ provider, query, onQueryChange, onBrowse }: CollectionProps & { query: string; onQueryChange: (value: string) => void; onBrowse: () => void }) {
  return (
    <>
      <section className="relative flex min-h-[500px] items-center justify-center overflow-hidden pt-12 md:min-h-[540px]">
        <EsimRippleHero />
        <div className="relative z-10 mx-auto max-w-5xl px-4 pb-14 pt-5 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            {provider && (
              <div className="mb-5 flex justify-center">
                <ProviderLogo provider={provider} size="hero" />
              </div>
            )}
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-white/75">
              {provider ? "eSIM / LEVERANTÖR" : "UPPTÄCK / LEVERANTÖRER"}
            </p>
            <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
              {provider ? provider.name : "Alla leverantörer"}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
              {provider ? provider.description : "Utforska våra eSIM-leverantörer. Välj en butik och hitta din nästa destination."}
            </p>

            <div className="mx-auto mt-7 max-w-2xl">
              <label className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/35 bg-white px-4 py-2 text-[#171717] shadow-[0_16px_60px_rgba(0,0,0,.22)] focus-within:ring-2 focus-within:ring-white/60">
                <Search className="size-5 shrink-0 text-[#777]" aria-hidden="true" />
                <span className="sr-only">{provider ? "Sök destination" : "Sök leverantör"}</span>
                <input type="search" value={query} onChange={event => onQueryChange(event.target.value)}
                  placeholder={provider ? "Sök land eller region…" : "Sök bland leverantörer…"}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#888] sm:text-base" />
                <button type="button" onClick={onBrowse} className="shrink-0 rounded-xl bg-[#181818] px-5 py-3 text-sm font-semibold text-white hover:bg-[#393939]">Sök</button>
              </label>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {provider && (
                <a href={provider.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="group inline-flex h-12 items-center gap-3 rounded-xl bg-white px-5 text-sm font-semibold text-[#161616] transition-colors hover:bg-[#eaeaea]">
                  Besök {provider.name} <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              )}
              <button type="button" onClick={onBrowse} className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/35 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                {provider ? "Utforska destinationer" : "Utforska leverantörer"} <ArrowDown className="size-4" />
              </button>
            </div>
            {provider && <p className="mt-3 text-xs text-white/60">Extern affiliatelänk. Vi kan få provision.</p>}
          </motion.div>
        </div>
      </section>
      <section className="border-y border-border/50 bg-muted/20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-7 md:grid-cols-3">
          {[
            { Icon: Globe2, text: "Länder, regioner och globala destinationer" },
            { Icon: Smartphone, text: "Upptäck digitala eSIM-alternativ" },
            { Icon: ShieldCheck, text: "Se aktuella villkor hos leverantören" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-3">
              <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
              <p className="text-center text-sm font-medium">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}


export function StoreCard({ provider }: { provider: Provider }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e7e6e3] bg-white shadow-[0_4px_20px_rgba(20,20,20,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cbc9c5] hover:shadow-[0_20px_50px_rgba(20,20,20,.11)]">
      <Link href={`/providers/${provider.slug}`} aria-label={`Visa ${provider.name}`} className="relative block aspect-[4/3] overflow-hidden bg-[#eaeae7]">
        <img src={provider.cover} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <ProviderLogo provider={provider} className="absolute bottom-4 left-4" />
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-6 text-[#181818]">
        <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#777]">eSIM-leverantör</span>
        <h2 className="mt-2 text-xl font-semibold tracking-tight"><Link href={`/providers/${provider.slug}`} className="hover:underline">{provider.name}</Link></h2>
        <p className="mb-5 mt-3 min-h-12 text-sm leading-6 text-[#737373]">{provider.description}</p>
        <Link href={`/providers/${provider.slug}`} className="mt-auto flex items-center justify-between border-t border-[#ededed] pt-4 text-sm font-semibold" aria-label={`Utforska ${provider.name}`}>
          Visa leverantör <span className="flex size-9 items-center justify-center rounded-full border border-[#dedede] transition-all group-hover:bg-[#181818] group-hover:text-white"><ArrowUpRight className="size-4" /></span>
        </Link>
      </div>
    </article>
  )
}

export function DestinationCard({ provider, destination }: { provider: Provider; destination: typeof DESTINATIONS[number] }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e7e6e3] bg-white shadow-[0_4px_20px_rgba(20,20,20,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#cbc9c5] hover:shadow-[0_20px_50px_rgba(20,20,20,.11)]">
      <Link href={`/providers/${provider.slug}/${destination.slug}`} aria-label={`Visa ${destination.name} hos ${provider.name}`} className="relative block aspect-[4/3] overflow-hidden bg-[#eaeae7]">
        <img src={destination.image} alt={destination.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#222] shadow-sm">{destination.kind}</span>
        <ProviderLogo provider={provider} className="absolute bottom-4 left-4" />
      </Link>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-6 text-[#181818]">
        <span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#777]">{provider.name}</span>
        <h2 className="mt-2 text-xl font-semibold tracking-tight"><Link href={`/providers/${provider.slug}/${destination.slug}`} className="hover:underline">{destination.name}</Link></h2>
        <p className="mb-5 mt-3 min-h-12 text-sm leading-6 text-[#737373]">Utforska eSIM för {destination.name} och kontrollera aktuella alternativ hos {provider.name}.</p>
        <Link href={`/providers/${provider.slug}/${destination.slug}`} className="mt-auto flex items-center justify-between border-t border-[#ededed] pt-4 text-sm font-semibold" aria-label={`Utforska ${destination.name}`}>
          Utforska eSIM <span className="flex size-9 items-center justify-center rounded-full border border-[#dedede] transition-all group-hover:bg-[#181818] group-hover:text-white"><ArrowUpRight className="size-4" /></span>
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
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-16 lg:py-28">
      <div className="grid overflow-hidden rounded-3xl border border-[#e8e6e2] bg-[#eeede9] text-[#191919] lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-7 p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">ENKLARE ATT UTFORSKA</p>
          <h2 className="max-w-lg text-3xl font-medium tracking-tight md:text-5xl">{title}</h2>
          <p className="max-w-lg text-base leading-8 text-[#626262]">{description}</p>
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
    <main className="bg-[#f8f7f4]">
      <CollectionHero provider={provider} query={query} onQueryChange={setQuery} onBrowse={onBrowse} />
      <section id="esim-results" ref={resultsRef} className="mx-auto max-w-7xl scroll-mt-24 px-4 pt-16 text-[#171717] sm:px-6 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-[#777]">{provider ? "DESTINATIONER" : "LEVERANTÖRSKATALOG"}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{provider ? `Utforska ${provider.name}` : "Alla leverantörer"}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#717171]">
              {provider ? "Destinationerna är exempel för navigering. Aktuellt utbud, täckning och priser verifieras hos leverantören." : "Välj leverantör för att besöka deras storefront och se destinationer."}
            </p>
          </div>
          <span className="shrink-0 text-sm text-[#777]">{total} {provider ? "destinationer" : "leverantörer"}</span>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-y border-[#e4e2de] py-5 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2" role="group" aria-label={provider ? "Filtrera destinationer" : "Sortera leverantörer"}>
            {tabs.map(tab => (
              <Button key={tab} type="button" variant="outline" onClick={() => setFilter(tab)}
                className={`h-9 rounded-lg border px-5 text-sm font-medium transition-colors ${tab === filter ? "border-[#181818] bg-[#181818] text-white hover:bg-[#383838] hover:text-white" : "border-[#dededb] bg-white text-[#333] hover:bg-[#f0efec] hover:text-[#181818]"}`}>{tab}</Button>
            ))}
          </div>
          <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-[#dededb] bg-white px-3 md:max-w-xs">
            <Search className="size-4 text-[#777]" aria-hidden="true" />
            <span className="sr-only">Sök {provider ? "destination" : "leverantör"}</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder={provider ? "Sök land eller region" : "Sök leverantör"} type="search"
              className="w-full bg-transparent text-sm text-[#222] outline-none placeholder:text-[#888]" />
          </label>
        </div>
        {total === 0 ? (
          <div className="py-20 text-center text-[#777]">Inga träffar. Prova en annan sökning.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 py-9 sm:grid-cols-2 lg:grid-cols-4">
            {provider
              ? visibleDestinations.map(destination => <DestinationCard key={destination.slug} provider={provider} destination={destination} />)
              : visibleProviders.map(item => <StoreCard key={item.slug} provider={item} />)}
          </div>
        )}
      </section>
      <CollectionEditorial provider={provider} />
      <section className="border-t border-[#262626] bg-[#111214] px-4 py-20 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[.17em] text-white/60">UPPTÄCK MER</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight md:text-5xl">Din nästa destination väntar.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/65">Vi hjälper dig att upptäcka leverantörer och alternativ – själva köpet gör du alltid hos leverantören.</p>
        <Link href={provider ? "/providers" : "/providers/airalo"} className="group mt-7 inline-block">
          <MovingArrow label={provider ? "Se alla leverantörer" : "Börja utforska"} />
        </Link>
      </section>
    </main>
  )
}
