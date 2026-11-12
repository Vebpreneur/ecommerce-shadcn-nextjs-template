"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { EsimRippleHero } from "@/components/esim/ripple-hero"
import { LargeHeroSearch } from "@/components/esim/printify-controls"
import { ProviderMarquee } from "@/components/esim/provider-marquee"
import { HomeCategories, HomeEditorial, HomeKnowledge, HomeFAQ } from "@/components/esim/home-sections"
import { StoreCard } from "@/components/esim/collection"
import { PROVIDERS } from "@/lib/esim"

export default function EsimHome() {
  const [query, setQuery] = useState("")
  const contentRef = useRef<HTMLElement>(null)
  const q = query.trim().toLocaleLowerCase("sv")
  const providers = useMemo(() =>
    PROVIDERS.filter(item => item.name.toLocaleLowerCase("sv").includes(q)),
    [q]
  )
  const scrollToResults = () =>
    contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <main className="bg-[#f8f7f4]">
      <section className="relative flex min-h-[590px] items-center justify-center overflow-hidden pt-10 md:min-h-[690px]">
        <EsimRippleHero />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-14 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/65">ESIMVAL / RESEUPPKOPPLING</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.09] tracking-[-.055em] sm:text-6xl md:text-7xl">
              eSIM för hela världen.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Utforska leverantörer och destinationer på ett och samma ställe.
              Jämför aktuella erbjudanden direkt hos leverantören.
            </p>
            <div className="mx-auto mt-10 w-full max-w-[1050px]">
              <LargeHeroSearch value={query} onChange={setQuery} onSearch={scrollToResults}
                label="Sök bland alla leverantörer och destinationer"
                placeholder="Sök land, region eller leverantör…" />
              <p className="mt-4 text-xs text-white/60">Exempel: Turkiet, Europa, Airalo eller Saily</p>
            </div>
          </motion.div>
        </div>
      </section>

      <ProviderMarquee />


      <section ref={contentRef} id="home-results" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-8 pt-20 text-[#181818] sm:px-6 lg:px-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">UPPTÄCK MARKNADSPLATSEN</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Upptäck leverantörerna</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#777]">Utforska varje leverantörs egen storefront och hitta destinationer som passar dig.</p>
          </div>
          <Link href="/providers" className="inline-flex items-center gap-2 self-start rounded-xl border border-[#d7d5d1] bg-white px-4 py-3 text-sm font-semibold transition-colors hover:bg-[#eeedea]">Se alla leverantörer <ArrowUpRight className="size-4" /></Link>
        </div>
        {providers.length ? (
          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {(q ? providers : providers.slice(0, 4)).map(provider => <StoreCard key={provider.slug} provider={provider} />)}
          </div>
        ) : (
          <p className="mt-9 rounded-2xl border border-[#e5e3de] bg-white px-6 py-12 text-center text-[#757575]">Inga leverantörer matchar din sökning.</p>
        )}
      </section>

      <HomeCategories />
      <HomeEditorial />


      <HomeKnowledge />
      <HomeFAQ />


      <section className="bg-[#111214] px-4 py-24 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/55">ESIMVAL</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Din nästa destination väntar.</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65">Hitta leverantörer och resmål. Aktuella priser och erbjudanden hittar du direkt hos leverantören.</p>
        <Link href="/providers" className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#181818] hover:bg-[#eaeaea]">Utforska leverantörer <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
      </section>
    </main>
  )
}
