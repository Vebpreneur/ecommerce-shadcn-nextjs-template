"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Smartphone, ArrowUpRight, Info } from "lucide-react"

const str=(v:unknown)=>typeof v==="string"?v:""
const rec=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==="object"&&!Array.isArray(v)
/**
 * Device compatibility assistant backed by esimdata's public phone API.
 * Never infer eSIM support from marketing copy or a partial model match.
 */
export function PhoneCheck(){
 const [model,setModel]=useState("")
 const [loading,setLoading]=useState(false)
 const [result,setResult]=useState<unknown>(null)
 const [error,setError]=useState("")
 const [searched,setSearched]=useState("")
 async function search(){
  if(model.trim().length<3)return
  setLoading(true);setError("");setResult(null);setSearched(model.trim())
  try{
   const response=await fetch(`/api/esim/phone?model=${encodeURIComponent(model.trim())}`)
   const body=await response.json() as {ok?:boolean;error?:string;result?:unknown}
   if(!response.ok||!body.ok)throw Error(body.error||"Sökningen misslyckades")
   setResult(body.result)
  }catch(e){setError(e instanceof Error?e.message:"Kunde inte kontrollera telefonen")}
  finally{setLoading(false)}
 }
 const data=rec(result)?result:null
 const records=data?(Array.isArray(data.results)?data.results:Array.isArray(data.items)?data.items:Array.isArray(data.phones)?data.phones:null):null
 const first=records&&records.length&&rec(records[0])?records[0]:data
 const status=first&&["supported","esim_supported","is_esim_compatible","compatible"].map(k=>first[k]).find(v=>typeof v==="boolean")
 const statusText=status===true?"eSIM-stöd anges i källan":status===false?"Källan anger inte eSIM-stöd":"Resultat från kompatibilitetstjänsten"
 const modelName=first?str(first.model)||str(first.name)||str(first.device)||searched:searched
 const manufacturer=first?str(first.manufacturer)||str(first.brand):""
 return <section className="esim-section alt">
  <div className="esim-container grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]">
   <div><p className="esim-eyebrow">FUNGERAR ESIM PÅ DIN TELEFON?</p>
    <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Kontrollera innan du reser.</h2>
    <p className="esim-text-muted mt-5 max-w-lg leading-8">Sök på en mobilmodell för att kontrollera information om eSIM-kompatibilitet. Stöd kan variera beroende på region och operatörslåsning.</p>
    <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Läs installationsguiden <ArrowUpRight className="size-4"/></Link>
   </div>
   <div className="esim-editorial p-6 sm:p-9">
    <div className="flex items-center gap-3">
      <span className="flex size-12 items-center justify-center rounded-xl bg-white"><Smartphone className="size-6"/></span>
      <div><h3 className="text-lg font-semibold">Sök telefonmodell</h3><p className="esim-text-muted text-xs">Datakälla: esimdata.app</p></div>
    </div>
    <form onSubmit={e=>{e.preventDefault();void search()}} className="mt-6 flex flex-wrap gap-2">
     <label className="esim-field flex h-14 min-w-0 flex-1 items-center gap-3 px-4">
      <Search className="size-5 shrink-0 text-[#747e79]"/><span className="sr-only">Telefonmodell</span>
      <input className="w-full min-w-0 bg-transparent text-sm outline-none" value={model} maxLength={80} onChange={e=>setModel(e.target.value)} placeholder="Exempel: iPhone 15, Pixel 8…" />
     </label>
     <button type="submit" disabled={loading||model.trim().length<3} className="esim-button disabled:opacity-50">{loading?"Söker…":"Kontrollera"}</button>
    </form>
    {error&&<p role="alert" className="mt-5 text-sm text-[#a03e3e]">{error}</p>}
    {result!==null&&<div className="mt-6 rounded-xl border border-[#e2e6e1] bg-white p-5">
      <p className="esim-eyebrow">SÖKRESULTAT</p>
      <h4 className="mt-2 text-lg font-semibold">{manufacturer?manufacturer+" ":""}{modelName}</h4>
      <p className="mt-2 text-sm font-semibold">{statusText}</p>
      <p className="esim-text-muted mt-2 text-xs leading-6">Verifiera alltid exakt modell, region och operatör innan köp. En träff här är ingen garanti för kompatibilitet.</p>
      <a className="mt-3 inline-flex items-center gap-2 text-sm font-semibold underline" href="https://esimdata.app/phones/" target="_blank" rel="noopener noreferrer">Se kompatibilitetskällan <ArrowUpRight className="size-4"/></a>
    </div>}
    <div className="esim-text-muted mt-5 flex items-start gap-2 text-xs leading-6"><Info className="mt-0.5 size-4 shrink-0"/> Telefonmodeller som saknas eller har regionala undantag måste kontrolleras hos tillverkaren.</div>
   </div>
  </div>
 </section>
}
