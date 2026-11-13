"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { EsimRippleHero } from "@/components/esim/ripple-hero"
import { LargeHeroSearch } from "@/components/esim/printify-controls"
import { ProviderMarquee } from "@/components/esim/provider-marquee"
import { HomeCategories, HomeEditorial, HomeKnowledge, HomeFAQ } from "@/components/esim/home-sections"
import { StoreCard, DestinationCard } from "@/components/esim/collection"
import { PROVIDERS, DESTINATIONS } from "@/lib/esim"

export default function EsimHome() {
  const [query, setQuery] = useState("")
  const contentRef = useRef<HTMLElement>(null)
  const q = query.trim().toLocaleLowerCase("sv")
  const providers = useMemo(() =>
    PROVIDERS.filter(item => item.name.toLocaleLowerCase("sv").includes(q)),
    [q]
  )
  const destinations = useMemo(() =>
    DESTINATIONS.filter(item => item.name.toLocaleLowerCase("sv").includes(q) || item.kind.toLocaleLowerCase("sv").includes(q)),
    [q]
  )
  const airalo = PROVIDERS[0]
  const scrollToResults = () =>
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <main className="esim-page">
      <section className="esim-hero relative flex min-h-[505px] items-center justify-center overflow-hidden pt-12 md:min-h-[590px]">
        <EsimRippleHero />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-16 text-center text-[#1a1d1f]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <p className="esim-eyebrow">ESIMVAL / RESEUPPKOPPLING</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-[-.045em] sm:text-6xl md:text-7xl">
              eSIM för hela världen.
            </h1>
            <p className="esim-hero-copy mx-auto mt-6 max-w-2xl text-sm leading-7 sm:text-base">
              Utforska leverantörer och destinationer på ett och samma ställe.
              Jämför aktuella erbjudanden direkt hos leverantören.
            </p>
            <div className="mx-auto mt-10 w-full max-w-[1050px]">
              <LargeHeroSearch value={query} onChange={setQuery} onSearch={scrollToResults}
                label="Sök bland alla leverantörer och destinationer"
                placeholder="Sök land, region eller leverantör…" />
              <p className="mt-4 text-xs text-[#6e7777]">Exempel: Turkiet, Europa, Airalo eller Saily</p>
            </div>
          </motion.div>
        </div>
      </section>

      <ProviderMarquee />


      <section ref={contentRef} id="home-results" className="esim-section mx-auto max-w-7xl scroll-mt-24 px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="esim-eyebrow">{q ? "SÖKRESULTAT" : "UPPTÄCK MARKNADSPLATSEN"}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{q ? `Resultat för ”${query.trim()}”` : "Upptäck leverantörerna"}</h2>
            <p className="esim-text-muted mt-3 max-w-xl text-sm leading-7">Utforska varje leverantörs egen storefront och hitta destinationer som passar dig.</p>
          </div>
          <Link href="/providers" className="esim-button esim-button-secondary self-start">Se alla leverantörer <ArrowUpRight className="size-4" /></Link>
        </div>
        {providers.length > 0 && (
          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(q ? providers : providers.slice(0,4)).map(provider => <StoreCard key={provider.slug} provider={provider} />)}
          </div>
        )}
        {q && destinations.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-semibold tracking-tight">Matchande destinationer</h3>
            <p className="mt-2 text-sm text-[#777]">Destinationslänkarna är för närvarande exempel från Airalo, inte en komplett inventering av varje leverantörs paket.</p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.map(destination => <DestinationCard key={destination.slug} destination={destination} provider={airalo} />)}
            </div>
          </div>
        )}
        {providers.length === 0 && (!q || destinations.length === 0) && (
          <p className="mt-9 rounded-2xl border border-[#e5e3de] bg-white px-6 py-12 text-center text-[#757575]">Inga träffar. Prova ett annat land, en region eller en leverantör.</p>
        )}
      </section>

      <HomeCategories />
      <HomeEditorial />


      <HomeKnowledge />
      <HomeFAQ />


      <section className="esim-dark-end px-4 py-24 text-center">
        <p className="esim-eyebrow">ESIMVAL</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Din nästa destination väntar.</h2>
        <p className="esim-text-muted mx-auto mt-5 max-w-xl text-sm leading-7">Hitta leverantörer och resmål. Aktuella priser och erbjudanden hittar du direkt hos leverantören.</p>
        <Link href="/providers" className="esim-button esim-button-secondary group mt-7">Utforska leverantörer <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
      </section>
    </main>
  )
}
