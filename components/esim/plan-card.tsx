"use client"

import Link from "next/link"
import { ArrowUpRight, Check, ChevronDown, Clock3, Database, ExternalLink, Globe2, Info, Wifi } from "lucide-react"
import type { LivePlan } from "@/lib/esim-live/sources"
import { PROVIDERS } from "@/lib/esim"

const currencyFormat=(amount:number,currency:string)=>{
 try{return new Intl.NumberFormat("sv-SE",{style:"currency",currency,maximumFractionDigits:2}).format(amount)}
 catch{return `${amount.toLocaleString("sv-SE")} ${currency}`}
}
const matchProvider=(plan:LivePlan)=>PROVIDERS.find(p=>p.slug===plan.providerSlug||
 p.name.toLocaleLowerCase("sv")===plan.provider.toLocaleLowerCase("sv"))

type Props={plan:LivePlan;destination:string}

/**
 * A single, structured offer card shared by /shop and /jamfor.
 * The offer price comes from the named data source, not from eSIMval.
 * Never present the provider-level affiliate URL as a buy link for this exact offer.
 */
export function PlanCard({plan,destination}:Props){
 const provider=matchProvider(plan)
 const title=plan.name.trim()===plan.provider.trim()?"Rese-eSIM":plan.name
 const sourceName=plan.sourceLabel||"Extern datakälla"
 return <article className="esim-offer-card group">
   <div className="esim-offer-card-head">
     <div className="flex min-w-0 items-center gap-3">
       <span className="esim-offer-logo" aria-hidden="true">
         {provider
           ? <img src={provider.logo||`https://www.google.com/s2/favicons?domain=${provider.website}&sz=128`} alt="" className="size-8 object-contain"/>
           : <Globe2 className="size-6 text-[#63716b]"/>}
       </span>
       <div className="min-w-0">
         <p className="truncate text-sm font-semibold text-[#1a1d1f]">{plan.provider}</p>
         <p className="esim-text-muted mt-0.5 text-xs">{destination}</p>
       </div>
     </div>
     <span className="esim-offer-source">{sourceName}</span>
   </div>

   <div className="esim-offer-card-content">
     <div className="min-h-[62px]">
       <h3 className="esim-offer-title">{title}</h3>
       <p className="esim-text-muted mt-1 text-xs">Reseabonnemang · digitalt SIM-kort</p>
     </div>

     <div className="esim-offer-metrics">
       <div className="esim-offer-metric">
         <div className="esim-offer-metric-label"><Database className="size-4" aria-hidden="true"/> Surf</div>
         <p className="esim-offer-metric-value">{plan.unlimited?"Obegränsad*":plan.dataGb!==null?`${new Intl.NumberFormat("sv-SE",{maximumFractionDigits:1}).format(plan.dataGb)} GB`:"Ej angivet"}</p>
       </div>
       <div className="esim-offer-metric">
         <div className="esim-offer-metric-label"><Clock3 className="size-4" aria-hidden="true"/> Giltighet</div>
         <p className="esim-offer-metric-value">{plan.days!==null?`${plan.days} dagar`:"Ej angivet"}</p>
       </div>
     </div>

     <div className="esim-offer-price-row">
       <div>
         <span className="esim-text-muted block text-xs">Pris enligt {sourceName}</span>
         <p className="esim-offer-price">{currencyFormat(plan.price,plan.currency)}</p>
       </div>
       <span className="esim-offer-price-note">Slutpris kan ändras</span>
     </div>

     <details className="esim-offer-details">
       <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
         Mer om erbjudandet <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden="true"/>
       </summary>
       <dl className="mt-4 grid gap-3 text-xs">
         <div className="flex justify-between gap-3"><dt className="esim-text-muted">Hotspot</dt><dd>{plan.hotspot===null?"Uppgift saknas":plan.hotspot?"Anges stödjas":"Anges inte stödjas"}</dd></div>
         <div className="flex justify-between gap-3"><dt className="esim-text-muted">5G</dt><dd>{plan.fiveG===null?"Uppgift saknas":plan.fiveG?"Anges stödjas":"Ej bekräftat"}</dd></div>
         <div className="flex justify-between gap-3"><dt className="esim-text-muted">Senast kontrollerad</dt><dd>{plan.checkedAt?plan.checkedAt.slice(0,10):"Saknas"}</dd></div>
         <div className="flex justify-between gap-3"><dt className="esim-text-muted">Uppgiftskälla</dt><dd>{sourceName}</dd></div>
       </dl>
       {plan.unlimited&&<p className="esim-text-muted mt-3 text-xs leading-6">* Kontrollera alltid hastighets- och fair-use-villkor innan köp.</p>}
     </details>
   </div>

   <div className="esim-offer-card-foot">
     {plan.buyUrl
       ? <a href={plan.buyUrl} target="_blank" rel="nofollow sponsored noopener noreferrer" className="esim-button w-full">
           Se erbjudande <ArrowUpRight className="size-4" aria-hidden="true"/>
         </a>
       : provider
         ? <a href={provider.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="esim-button w-full">
             Se paket hos {provider.name} <ArrowUpRight className="size-4" aria-hidden="true"/>
           </a>
         : <div className="esim-offer-missing">
             <Info className="size-4 shrink-0" aria-hidden="true"/> Ingen direktlänk till paketet finns
           </div>}
     <div className="esim-offer-footer-links">
       {provider
         ? <Link href={`/providers/${provider.slug}`} className="inline-flex items-center gap-1 hover:underline">Om {provider.name} <ArrowUpRight className="size-3"/></Link>
         : <span>Externt erbjudande</span>}
       <span>{plan.buyUrl?"Länk via datakällan":"Leverantörslänk, ej paketspecifik"}</span>
     </div>
   </div>
 </article>
}
