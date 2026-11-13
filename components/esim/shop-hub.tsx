"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowUpRight, Search, SlidersHorizontal } from "lucide-react"
import { DESTINATIONS, PROVIDERS } from "@/lib/esim"
import { DestinationCard } from "@/components/esim/collection"
import { ProviderMarquee } from "@/components/esim/provider-marquee"

export default function ShopHub() {
  const [query,setQuery] = useState("")
  const [category,setCategory] = useState("Alla")
  const destinations = useMemo(()=> DESTINATIONS.filter(d=>
    (category==="Alla" || d.kind===category)&&
    d.name.toLocaleLowerCase("sv").includes(query.trim().toLocaleLowerCase("sv"))
  ),[category,query])
  return <main className="esim-page">
    <section className="esim-hero px-4 pb-20 pt-32">
      <div className="esim-container grid items-center gap-10 md:grid-cols-[1.2fr_.8fr]">
        <div>
          <p className="esim-eyebrow">ESIMVAL / UTBUD</p>
          <h1 className="mt-5 text-5xl font-semibold leading-tight tracking-tight md:text-6xl">Hitta eSIM för ditt resmål.</h1>
          <p className="esim-hero-copy mt-5 max-w-xl text-base leading-8">Här samlar vi destinationer och vägen till leverantörernas erbjudanden. Jämför innan du bestämmer dig – själva köpet görs hos leverantören.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/jamfor" className="esim-button">Jämför leverantörer <ArrowUpRight className="size-4"/></Link>
            <Link href="/providers" className="esim-button esim-button-secondary">Alla leverantörer <ArrowRight className="size-4"/></Link>
          </div>
        </div>
        <div className="esim-editorial relative hidden min-h-80 overflow-hidden md:block">
          <img src={DESTINATIONS[0].image} alt="Istanbul i Turkiet" className="absolute inset-0 size-full object-cover"/>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-7 text-white">
            <p className="text-xs uppercase tracking-[.15em]">VÄLJ DESTINATION</p>
            <p className="mt-1 text-2xl font-semibold text-white">Länder, regioner och globalt</p>
          </div>
        </div>
      </div>
    </section>
    <ProviderMarquee/>
    <section className="esim-section">
      <div className="esim-container">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="esim-eyebrow">DESTINATIONER</p><h2 className="mt-3 text-3xl font-semibold">Utforska tillgängliga kategorier</h2>
            <p className="esim-text-muted mt-3 max-w-xl text-sm leading-7">Detta är vår nuvarande destinationskatalog, inte en komplett lista över aktiva produktpaket. Vi fyller på efter verifiering.</p>
          </div>
          <Link href="/jamfor" className="esim-button esim-button-secondary">Jämför erbjudanden <ArrowUpRight className="size-4"/></Link>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-[#e5e8e5] py-5">
          <div className="flex flex-wrap gap-2">{["Alla","Länder","Regioner","Globalt"].map(t=><button type="button" key={t} onClick={()=>setCategory(t)} className="esim-pill" data-selected={t===category}>{t}</button>)}</div>
          <label className="esim-field flex h-12 w-full items-center gap-2 px-4 md:max-w-xs"><Search className="size-4 text-[#7b8180]"/><span className="sr-only">Sök destination</span>
            <input type="search" className="w-full bg-transparent text-sm outline-none" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Sök destination..."/></label>
        </div>
        {destinations.length ? <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {destinations.map(d=><DestinationCard key={d.slug} destination={d} provider={PROVIDERS[0]}/>)}
        </div> : <p className="esim-text-muted py-14 text-center">Inga destinationer matchar din sökning.</p>}
      </div>
    </section>
    <section className="esim-section alt">
      <div className="esim-container grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]">
        <div><p className="esim-eyebrow">MARKNADSPLATSEN VÄXER</p><h2 className="mt-4 text-4xl font-semibold">Fler leverantörer. Bättre jämförelser.</h2>
          <p className="esim-text-muted mt-5 max-w-xl leading-8">eSIMval byggs som en oberoende jämförelseplattform. När produktintegrationerna är verifierade kan vi visa faktiska paketpriser, GB, giltighet och villkor från flera leverantörer.</p>
          <Link href="/jamfor" className="esim-button mt-7">Till jämförelseverktyget <ArrowUpRight className="size-4"/></Link>
        </div>
        <div className="esim-editorial p-8 sm:p-10">
          <p className="esim-eyebrow">ATT JÄMFÖRA</p>
          {["Datamängd och eventuella hastighetsgränser","Giltighetstid och aktiveringsregler","Länder, nätverk och täckning","Pris och eventuella villkor"].map((x,i)=><div key={x} className="flex items-center gap-4 border-b border-[#dce2dc] py-5"><span className="text-sm font-semibold text-[#83918b]">0{i+1}</span><span className="font-semibold">{x}</span></div>)}
        </div>
      </div>
    </section>
  </main>
}
