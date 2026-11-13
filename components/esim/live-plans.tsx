"use client"

import { useEffect, useMemo, useState } from "react"
import { AlertCircle, Database, RefreshCw, SlidersHorizontal } from "lucide-react"
import { LIVE_DESTINATIONS } from "@/lib/esim-live/destinations"
import type { LivePlan } from "@/lib/esim-live/sources"
import { PlanCard } from "@/components/esim/plan-card"

type Payload={
 ok:boolean
 destination?:string
 items?:LivePlan[]
 sources?:{source:string;ok:boolean;error?:string;count:number}[]
 error?:string
 warning?:string
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
   <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
     {!loading&&plans.map(plan=><PlanCard key={plan.id} plan={plan} destination={data?.destination||country}/>)}
   </div>
   <div className="esim-editorial p-5 text-xs leading-6">
    <strong>Källor och prisinformation:</strong> Data från <a className="underline" target="_blank" rel="noopener noreferrer" href="https://esimadvice.com/developers">eSIM Advice</a> och <a className="underline" target="_blank" rel="noopener noreferrer" href="https://esimdata.app/agents/">esimdata.app</a>.
    Priser och täckning kan ändras. Produktlänkar kan vara datakällornas egna spårade länkar och ger inte automatiskt provision till eSIMval. Vissa priser kan vara kupongjusterade och samma paket kan förekomma från båda källorna. Kontrollera alltid slutpris och villkor hos leverantören.
   </div>
  </div>
 </section>
}
