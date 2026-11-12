"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight, Globe2, Search, Smartphone, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DESTINATIONS, PROVIDERS, type Provider } from "@/lib/esim"

type CollectionProps = { provider?: Provider }

const directoryCover = "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1800&q=85"

function MovingArrow({ label }: { label: string }) {
  return (
    <span className="group relative inline-flex h-10 items-center overflow-hidden rounded-full bg-primary py-1 ps-4 pe-12 text-sm font-medium text-primary-foreground transition-all duration-500 hover:ps-12 hover:pe-4">
      <span className="relative z-10">{label}</span>
      <span className="absolute right-1 flex h-8 w-8 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-36px)] group-hover:rotate-45">
        <ArrowUpRight size={16} />
      </span>
    </span>
  )
}

function CollectionHero({ provider }: CollectionProps) {
  return (
    <>
      <section className="relative flex min-h-[310px] items-center justify-center overflow-hidden pt-20 md:h-[40vh]">
        <img
          src={provider?.cover ?? directoryCover}
          alt=""
          className="absolute inset-0 h-full w-full object-cover brightness-[.52]"
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-16 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[.2em] text-white/75">
              {provider ? "eSIM / LEVERANTÖR" : "UPPTÄCK / LEVERANTÖRER"}
            </p>
            <h1 className="text-4xl font-medium tracking-tight md:text-6xl">
              {provider ? provider.name : "Alla leverantörer"}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
              {provider ? provider.description : "Utforska våra eSIM-leverantörer. Välj en butik och hitta din nästa destination."}
            </p>
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

function StoreCard({ provider }: { provider: Provider }) {
  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl border bg-card p-0 ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <Link href={`/providers/${provider.slug}`} aria-label={`Visa ${provider.name}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <img src={provider.cover} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute bottom-4 left-4 flex size-12 items-center justify-center overflow-hidden rounded-xl border border-white/70 bg-white p-2 shadow-lg">
          <img src={`https://www.google.com/s2/favicons?domain=${provider.website}&sz=128`} alt="" loading="lazy" className="size-full object-contain" />
        </span>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">eSIM-leverantör</span>
        <h2 className="text-xl font-semibold tracking-tight"><Link href={`/providers/${provider.slug}`} className="hover:underline">{provider.name}</Link></h2>
        <p className="min-h-12 text-sm leading-6 text-muted-foreground">{provider.description}</p>
        <Link href={`/providers/${provider.slug}`} className="mt-auto block pt-3" aria-label={`Utforska ${provider.name}`}>
          <MovingArrow label="Visa leverantör" />
        </Link>
      </CardContent>
    </Card>
  )
}

function DestinationCard({ provider, destination }: { provider: Provider; destination: typeof DESTINATIONS[number] }) {
  return (
    <Card className="group flex h-full flex-col gap-0 overflow-hidden rounded-2xl border bg-card p-0 ring-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/10">
      <Link href={`/providers/${provider.slug}/${destination.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-muted" aria-label={`Visa ${destination.name} hos ${provider.name}`}>
        <img src={destination.image} alt={destination.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/95 px-3 py-1 text-xs font-medium text-black shadow-sm">{destination.kind}</span>
      </Link>
      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{provider.name}</span>
        <h2 className="text-xl font-semibold tracking-tight"><Link href={`/providers/${provider.slug}/${destination.slug}`} className="hover:underline">{destination.name}</Link></h2>
        <p className="min-h-12 text-sm leading-6 text-muted-foreground">Utforska eSIM för {destination.name} och kontrollera tillgängliga paket hos {provider.name}.</p>
        <Link href={`/providers/${provider.slug}/${destination.slug}`} className="mt-auto block pt-3" aria-label={`Utforska ${destination.name}`}>
          <MovingArrow label="Utforska eSIM" />
        </Link>
      </CardContent>
    </Card>
  )
}

function CollectionEditorial({ provider }: CollectionProps) {
  const title = provider ? "Välj eSIM inför resan." : "En plats för dina eSIM-val."
  const description = provider
    ? `Hitta en destination hos ${provider.name}. Vi visar vägen till leverantören där du kan jämföra aktuella erbjudanden, priser och villkor.`
    : "Utforska leverantörer på ett och samma ställe. Öppna en storefront, välj destination och fortsätt till leverantörens egna erbjudanden."
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-16 lg:py-28">
      <div className="grid overflow-hidden rounded-3xl bg-muted/30 lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-7 p-8 sm:p-12 lg:p-16">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-muted-foreground">ENKLARE ATT UTFORSKA</p>
          <h2 className="max-w-lg text-3xl font-medium tracking-tight md:text-5xl">{title}</h2>
          <p className="max-w-lg text-base leading-8 text-muted-foreground">{description}</p>
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
    <main className="bg-background">
      <CollectionHero provider={provider} />
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-16">
        <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.16em] text-muted-foreground">{provider ? "DESTINATIONER" : "LEVERANTÖRSKATALOG"}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{provider ? `Utforska ${provider.name}` : "Alla leverantörer"}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
              {provider ? "Destinationerna är exempel för navigering. Aktuellt utbud, täckning och priser verifieras hos leverantören." : "Välj leverantör för att besöka deras storefront och se destinationer."}
            </p>
          </div>
          <span className="shrink-0 text-sm text-muted-foreground">{total} {provider ? "destinationer" : "leverantörer"}</span>
        </div>
        <div className="mt-8 flex flex-col justify-between gap-4 border-y border-border py-5 md:flex-row md:items-center">
          <div className="flex flex-wrap gap-2" role="group" aria-label={provider ? "Filtrera destinationer" : "Sortera leverantörer"}>
            {tabs.map(tab => (
              <Button key={tab} type="button" variant={tab === filter ? "default" : "outline"} onClick={() => setFilter(tab)}
                className="h-9 rounded-lg px-5 text-sm font-medium transition-colors">{tab}</Button>
            ))}
          </div>
          <label className="flex h-10 w-full items-center gap-2 rounded-lg border border-border bg-background px-3 md:max-w-xs">
            <Search className="size-4 text-muted-foreground" aria-hidden="true" />
            <span className="sr-only">Sök {provider ? "destination" : "leverantör"}</span>
            <input value={query} onChange={event => setQuery(event.target.value)} placeholder={provider ? "Sök land eller region" : "Sök leverantör"} type="search"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground" />
          </label>
        </div>
        {total === 0 ? (
          <div className="py-20 text-center text-muted-foreground">Inga träffar. Prova en annan sökning.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 py-9 sm:grid-cols-2 lg:grid-cols-4">
            {provider
              ? visibleDestinations.map(destination => <DestinationCard key={destination.slug} provider={provider} destination={destination} />)
              : visibleProviders.map(item => <StoreCard key={item.slug} provider={item} />)}
          </div>
        )}
      </section>
      <CollectionEditorial provider={provider} />
      <section className="border-t border-border bg-muted/30 px-4 py-20 text-center">
        <p className="text-xs font-semibold uppercase tracking-[.17em] text-muted-foreground">UPPTÄCK MER</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-medium tracking-tight md:text-5xl">Din nästa destination väntar.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground">Vi hjälper dig att upptäcka leverantörer och alternativ – själva köpet gör du alltid hos leverantören.</p>
        <Link href={provider ? "/providers" : "/providers/airalo"} className="group mt-7 inline-block">
          <MovingArrow label={provider ? "Se alla leverantörer" : "Börja utforska"} />
        </Link>
      </section>
    </main>
  )
}
