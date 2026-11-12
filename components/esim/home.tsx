"use client"

import { useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { ArrowDown, ArrowRight, ArrowUpRight, Globe2, Search, ShieldCheck, Smartphone } from "lucide-react"
import { EsimRippleHero } from "@/components/esim/ripple-hero"
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
    <main className="bg-[#f8f7f4]">
      <section className="relative flex min-h-[540px] items-center justify-center overflow-hidden pt-12 md:min-h-[640px]">
        <EsimRippleHero />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-16 text-center text-white">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
            <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/65">ESIMVAL / RESEUPPKOPPLING</p>
            <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-semibold leading-[1.09] tracking-[-.055em] sm:text-6xl md:text-7xl">
              Hitta rätt eSIM för din nästa resa.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
              Utforska leverantörer och destinationer på ett och samma ställe.
              Jämför aktuella erbjudanden direkt hos leverantören.
            </p>
            <div className="mx-auto mt-9 max-w-2xl">
              <label className="flex min-h-16 items-center gap-3 rounded-2xl border border-white/35 bg-white px-4 py-2 text-[#181818] shadow-[0_20px_65px_rgba(0,0,0,.22)] focus-within:ring-2 focus-within:ring-white/60">
                <Search className="size-5 shrink-0 text-[#777]" aria-hidden="true" />
                <span className="sr-only">Sök på eSIMval</span>
                <input type="search" value={query} onChange={event => setQuery(event.target.value)}
                  onKeyDown={event => { if (event.key === "Enter") scrollToResults() }}
                  placeholder="Sök land, region eller leverantör…"
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#858585] sm:text-base" />
                <button onClick={scrollToResults} type="button" className="shrink-0 rounded-xl bg-[#181818] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#393939]">Sök</button>
              </label>
              <p className="mt-3 text-xs text-white/55">Exempel: Turkiet, Europa, Airalo eller Saily</p>
            </div>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link href="/providers" className="group inline-flex h-12 items-center gap-3 rounded-xl bg-white px-5 text-sm font-semibold text-[#181818] transition-colors hover:bg-[#e9e9e9]">
                Alla leverantörer <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <button onClick={scrollToResults} type="button" className="inline-flex h-12 items-center gap-3 rounded-xl border border-white/35 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">
                Utforska destinationer <ArrowDown className="size-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[#252629] bg-[#111214] text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 text-sm sm:px-6 md:grid-cols-3 lg:px-16">
          {[
            { Icon: Globe2, text: "Destinationer världen över" },
            { Icon: Smartphone, text: "Flera eSIM-leverantörer" },
            { Icon: ShieldCheck, text: "Köp direkt hos leverantören" },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center justify-center gap-3">
              <Icon className="size-5 shrink-0 text-white/75" aria-hidden="true" />
              <span className="font-medium text-white/80">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section ref={contentRef} id="home-results" className="mx-auto max-w-7xl scroll-mt-24 px-4 pb-8 pt-20 text-[#181818] sm:px-6 lg:px-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">UPPTÄCK MARKNADSPLATSEN</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Våra leverantörer</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#777]">Utforska varje leverantörs egen storefront och hitta destinationer som passar dig.</p>
          </div>
          <Link href="/providers" className="inline-flex items-center gap-2 self-start rounded-xl border border-[#d7d5d1] bg-white px-4 py-3 text-sm font-semibold transition-colors hover:bg-[#eeedea]">Se alla leverantörer <ArrowUpRight className="size-4" /></Link>
        </div>
        {providers.length ? (
          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {providers.map(provider => <StoreCard key={provider.slug} provider={provider} />)}
          </div>
        ) : (
          <p className="mt-9 rounded-2xl border border-[#e5e3de] bg-white px-6 py-12 text-center text-[#757575]">Inga leverantörer matchar din sökning.</p>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 pt-16 text-[#181818] sm:px-6 lg:px-16">
        <div className="flex flex-wrap items-end justify-between gap-5 border-t border-[#e5e3de] pt-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">DESTINATIONER</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Vart går nästa resa?</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-[#777]">Utforska exempel på destinationer hos Airalo. Utbud, priser och täckning bekräftas hos leverantören.</p>
          </div>
          <Link href="/providers/airalo" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">Alla Airalo-destinationer <ArrowRight className="size-4" /></Link>
        </div>
        {destinations.length ? (
          <div className="mt-9 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {destinations.map(destination => <DestinationCard key={destination.slug} destination={destination} provider={airalo} />)}
          </div>
        ) : (
          <p className="mt-9 rounded-2xl border border-[#e5e3de] bg-white px-6 py-12 text-center text-[#757575]">Inga destinationer matchar din sökning.</p>
        )}
      </section>

      <section className="border-t border-[#e5e3de] bg-white px-4 py-20 text-[#181818] sm:px-6">
        <div className="mx-auto max-w-7xl lg:px-16">
          <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">ENKELT ATT KOMMA IGÅNG</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Så fungerar eSIMval</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["01", "Hitta en destination", "Sök efter ett land eller en region som du planerar att besöka."],
              ["02", "Utforska leverantörer", "Besök leverantörernas storefronts och läs om tillgängliga alternativ."],
              ["03", "Fortsätt till leverantören", "Se aktuella priser och villkor och genomför eventuellt köp där."],
            ].map(([number, title, text]) => (
              <div key={number} className="rounded-2xl border border-[#e7e5e0] bg-[#f9f8f5] p-7">
                <span className="text-xs font-semibold tracking-widest text-[#888]">{number}</span>
                <h3 className="mt-9 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[#737373]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#111214] px-4 py-24 text-center text-white">
        <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/55">ESIMVAL</p>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Din nästa destination väntar.</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/65">Hitta leverantörer och resmål. Aktuella priser och erbjudanden hittar du direkt hos leverantören.</p>
        <Link href="/providers" className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#181818] hover:bg-[#eaeaea]">Utforska leverantörer <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
      </section>
    </main>
  )
}
