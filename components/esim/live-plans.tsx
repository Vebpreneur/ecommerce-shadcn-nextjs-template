"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowUpRight, AlertCircle, Database, Search, RefreshCw, SlidersHorizontal } from "lucide-react"
import { LIVE_DESTINATIONS } from "@/lib/esim-live/destinations"
import type { LivePlan } from "@/lib/esim-live/sources"
import { PROVIDERS } from "@/lib/esim"

type Payload={
 ok:boolean
 destination?:string
 items?:LivePlan[]
 sources?:{source:string;ok:boolean;error?:string;count:number}[]
 error?:string
 warning?:string
}
function localProvider(plan:LivePlan){
 return PROVIDERS.find(p=>p.slug===plan.providerSlug||
  p.name.toLocaleLowerCase("en")===plan.provider.toLocaleLowerCase("en"))
}
function formatPrice(value:number,currency:string){
 try {return new Intl.NumberFormat("sv-SE",{style:"currency",currency,maximumFractionDigits:2}).format(value)}
 catch{return `${value} ${currency}`}
}
export function LivePlansExplorer({initialCountry="TR",compact=false}:{
 initialCountry?:string
 compact?:boolean
}){
 const [country,setCountry]=useState(initialCountry)
 const [data,setData]=useState<Payload|null>(null)
 const [loading,setLoading]=useState(false)
 const [error,setError]=useState("")
 const [source,setSource]=useState<"all"|"esimadvice"|"esimdata">("all")
 const [minGb,setMinGb]=useState(0)
 const [minDays,setMinDays]=useState(0)
 const [sort,setSort]=useState<"price"|"data"|"validity">("price")
 const [refresh,setRefresh]=useState(0)

 useEffect(()=>{
  const controller=new AbortController()
  const fetchPlans=async()=>{
   setLoading(true);setError("")
   try{
    const response=await fetch(`/api/esim/live?country=${encodeURIComponent(country)}&source=${source}&limit=40`,{signal:controller.signal})
    const payload=await response.json() as Payload
    if(!response.ok && !payload.items?.length)throw new Error(payload.error||"Datakällan är tillfälligt otillgänglig.")
    if(!controller.signal.aborted)setData(payload)
   }catch(e){
    if(!controller.signal.aborted){setError(e instanceof Error?e.message:"Kunde inte hämta paket.");setData(null)}
   }finally{if(!controller.signal.aborted)setLoading(false)}
  }
  void fetchPlans()
  return ()=>controller.abort()
 },[country,source,refresh])
 const plans=useMemo(()=>{
  const filtered=(data?.items||[]).filter(p=>
    (p.unlimited||minGb===0||(p.dataGb!==null&&p.dataGb>=minGb))&&
    (minDays===0||(p.days!==null&&p.days>=minDays))
  )
  return filtered.sort((a,b)=>{
   if(sort==="data")return (b.unlimited?1e6:b.dataGb??-1)-(a.unlimited?1e6:a.dataGb??-1)
   if(sort==="validity")return (b.days??-1)-(a.days??-1)
   return a.currency===b.currency ?a.price-b.price : a.currency.localeCompare(b.currency)
  })
 },[data,minGb,minDays,sort])
 return <section className={compact?"space-y-6":"esim-section"}>
  <div className={compact?"space-y-6":"esim-container space-y-6"}>
   {!compact&&<div className="flex flex-wrap items-end justify-between gap-4">
    <div><p className="esim-eyebrow">AKTUELLA MARKNADSDATA</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Utforska eSIM-paket</h2>
      <p className="esim-text-muted mt-3 max-w-2xl text-sm leading-7">Paketinformation hämtas från två oberoende jämförelsedatabaser. De är inte leverantörernas egna direkta prisflöden och kan visa samma paket flera gånger.</p>
    </div>
   </div>}
   <div className="esim-editorial p-5 sm:p-7">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
     <label className="block"><span className="mb-2 block text-xs font-semibold">Destination</span>
      <select value={country} onChange={e=>setCountry(e.target.value)} className="esim-field h-12 w-full px-3 text-sm">
       {LIVE_DESTINATIONS.map(d=><option key={d.iso} value={d.iso}>{d.name}</option>)}
      </select></label>
     <label className="block"><span className="mb-2 block text-xs font-semibold">Datakälla</span>
      <select value={source} onChange={e=>setSource(e.target.value as typeof source)} className="esim-field h-12 w-full px-3 text-sm">
       <option value="all">Båda källorna</option><option value="esimadvice">eSIM Advice</option><option value="esimdata">esimdata.app</option>
      </select></label>
     <label className="block"><span className="mb-2 block text-xs font-semibold">Minsta datamängd</span>
      <select value={minGb} onChange={e=>setMinGb(Number(e.target.value))} className="esim-field h-12 w-full px-3 text-sm">
       <option value="0">Alla</option><option value="1">1 GB+</option><option value="3">3 GB+</option><option value="5">5 GB+</option><option value="10">10 GB+</option><option value="20">20 GB+</option>
      </select></label>
     <label className="block"><span className="mb-2 block text-xs font-semibold">Minsta giltighet</span>
      <select value={minDays} onChange={e=>setMinDays(Number(e.target.value))} className="esim-field h-12 w-full px-3 text-sm">
       <option value="0">Alla</option><option value="7">7 dagar+</option><option value="15">15 dagar+</option><option value="30">30 dagar+</option>
      </select></label>
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#e5e8e5] pt-5">
     <div className="flex items-center gap-2 text-sm">
      <Database className="size-4 text-[#6c7772]"/>
      {loading?"Hämtar erbjudanden…":`${plans.length} paket i detta urval`}
     </div>
     <div className="flex items-center gap-3">
      <label className="flex items-center gap-2 text-xs">Sortera
       <select value={sort} onChange={e=>setSort(e.target.value as typeof sort)} className="esim-field h-10 px-2 text-xs">
        <option value="price">Pris</option><option value="data">Mest data</option><option value="validity">Längst giltighet</option>
       </select></label>
      <button className="esim-button esim-button-secondary min-h-10 px-3 text-xs" onClick={()=>setRefresh(x=>x+1)} type="button"><RefreshCw className="size-4"/> Uppdatera</button>
     </div>
    </div>
   </div>
   {data?.sources&&<div className="flex flex-wrap gap-3 text-xs">
    {data.sources.map(s=><span key={s.source} className="rounded-full border border-[#e5e8e5] bg-white px-3 py-2">
      {s.source==="esimadvice"?"eSIM Advice":"esimdata.app"}: {s.ok?`${s.count} poster`:"otillgänglig"}
    </span>)}
   </div>}
   {error&&<div role="alert" className="esim-card flex items-start gap-3 p-6"><AlertCircle className="mt-1 size-5 shrink-0"/><p className="esim-text-muted text-sm">{error}. Försök igen senare. Leverantörskatalogen är fortfarande tillgänglig.</p></div>}
   {!error&&!loading&&plans.length===0&&<div className="esim-card p-9 text-center">
    <h3 className="text-xl font-semibold">Inga paket i detta urval</h3>
    <p className="esim-text-muted mt-3 text-sm">Prova att ändra land, källa eller filter. Vi visar inte några påhittade priser.</p>
   </div>}
   {loading&&<p className="esim-text-muted py-8 text-center text-sm" role="status">Hämtar paket från datakällorna…</p>}
   <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
    {!loading&&plans.map(plan=>{
     const affiliate=localProvider(plan)
     return <article key={plan.id} className="esim-card flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-3">
       <div className="min-w-0">
        <p className="esim-eyebrow">{plan.provider}</p>
        <h3 className="mt-2 text-lg font-semibold leading-6">{plan.name}</h3>
       </div>
       {affiliate&&<span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-[#e5e8e5] bg-white p-2">
        <img src={affiliate.logo||`https://www.google.com/s2/favicons?domain=${affiliate.website}&sz=128`} alt="" className="size-full object-contain"/>
       </span>}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl bg-[#f3f5f2] p-4">
       <div><p className="esim-text-muted text-xs">Datamängd</p><p className="mt-1 font-semibold">{plan.unlimited?"Obegränsad*":plan.dataGb!==null?`${plan.dataGb} GB`:"Ej angivet"}</p></div>
       <div><p className="esim-text-muted text-xs">Giltighet</p><p className="mt-1 font-semibold">{plan.days!==null?`${plan.days} dagar`:"Ej angivet"}</p></div>
       <div><p className="esim-text-muted text-xs">Hotspot</p><p className="mt-1 text-sm font-semibold">{plan.hotspot===null?"Ej angivet":plan.hotspot?"Ja":"Nej"}</p></div>
       <div><p className="esim-text-muted text-xs">5G</p><p className="mt-1 text-sm font-semibold">{plan.fiveG===null?"Ej angivet":plan.fiveG?"Anges":"Ej angivet"}</p></div>
      </div>
      <div className="mt-5 flex items-end justify-between gap-3">
       <div><p className="esim-text-muted text-xs">Pris enligt datakälla</p><p className="mt-1 text-2xl font-semibold tracking-tight">{formatPrice(plan.price,plan.currency)}</p></div>
       <span className="esim-text-muted text-[11px]">{plan.sourceLabel}</span>
      </div>
      <p className="esim-text-muted mt-3 text-xs">Kontrollerat: {plan.checkedAt?plan.checkedAt.slice(0,10):"Tidpunkt saknas"}</p>
      <div className="mt-auto space-y-3 pt-5">
       {plan.buyUrl?<a href={plan.buyUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="esim-button w-full">
         Visa hos datakällan <ArrowUpRight className="size-4"/>
        </a>:<p className="esim-text-muted text-xs">Ingen verifierad produktlänk tillgänglig.</p>}
       {affiliate&&<a href={affiliate.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="esim-button esim-button-secondary w-full text-xs">
        Se övriga erbjudanden hos {affiliate.name} <ArrowUpRight className="size-4"/>
       </a>}
      </div>
     </article>
    })}
   </div>
   <div className="esim-editorial p-5 text-xs leading-6">
    <strong>Källor och prisinformation:</strong> Data från <a className="underline" target="_blank" rel="noopener noreferrer" href="https://esimadvice.com/developers">eSIM Advice</a> och <a className="underline" target="_blank" rel="noopener noreferrer" href="https://esimdata.app/agents/">esimdata.app</a>.
    Priser och täckning kan ändras. Produktlänkar kan vara datakällornas egna spårade länkar och ger inte automatiskt provision till eSIMval. Vissa priser kan vara kupongjusterade och samma paket kan förekomma från båda källorna. Kontrollera alltid slutpris och villkor hos leverantören.
   </div>
  </div>
 </section>
}
