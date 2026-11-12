"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Info, Smartphone, CalendarDays, Database } from "lucide-react"
import type { Provider } from "@/lib/esim"
import { getVerifiedPlans } from "@/lib/esim-plans"

const DATA_NEEDS = ["1 GB", "3 GB", "5 GB", "10 GB", "20 GB", "Obegränsat (om tillgängligt)"]
const DURATION_NEEDS = ["7 dagar", "15 dagar", "30 dagar", "Mer än 30 dagar"]

/**
 * A preference guide, not fabricated package SKUs.
 * Later replace with actual provider-specific verified plans.
 */
export function EsimPlanFinder({ provider, destinationSlug }: { provider: Provider; destinationSlug: string }) {
  const [dataNeed, setDataNeed] = useState("")
  const [duration, setDuration] = useState("")
  const plans = getVerifiedPlans(provider.slug, destinationSlug)
  if (plans.length) return (
    <section className="overflow-hidden rounded-[24px] border border-[#e6e4df] bg-white shadow-sm">
      <div className="border-b border-[#eceae6] p-6 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#777]">VERIFIERADE PAKET</p>
        <h2 className="mt-3 text-2xl font-semibold">Välj eSIM-paket</h2>
        <p className="mt-2 text-sm leading-7 text-[#777]">Se datapott, giltighetstid och paketvillkor. Kontrollera alltid slutpris och tillgänglighet hos leverantören.</p>
      </div>
      <div className="space-y-3 p-5 sm:p-7">{plans.map(plan => (
        <details key={plan.id} className="group rounded-xl border border-[#e6e4df] bg-[#faf9f6] p-5">
          <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3">
            <span><strong className="block text-base">{plan.name}</strong>
              <span className="mt-1 block text-sm text-[#777]">
                {"amountGb" in plan.data ? `${plan.data.amountGb} GB` : "Obegränsad data"} · {plan.validityDays} dagar
              </span></span>
            <strong className="text-lg">{new Intl.NumberFormat("sv-SE", {style:"currency",currency:plan.currency}).format(plan.price)}</strong>
          </summary>
          <div className="mt-5 space-y-2 border-t border-[#e6e4df] pt-4 text-sm leading-7 text-[#6e6e6e]">
            <p><strong>Täckning:</strong> {plan.coverageCountries.join(", ")}</p>
            {plan.activationConditions && <p><strong>Aktivering:</strong> {plan.activationConditions}</p>}
            {plan.speedLimitNotes && <p><strong>Hastighet:</strong> {plan.speedLimitNotes}</p>}
            {plan.networkNotes && <p><strong>Nätverk:</strong> {plan.networkNotes}</p>}
            <p className="text-xs">Senast verifierad: {plan.verifiedAt}</p>
            <a href={plan.purchaseUrl} target="_blank" rel="sponsored noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#171717] px-5 py-3 font-semibold text-white">
              Se paket hos {provider.name} <ArrowUpRight className="size-4"/>
            </a>
          </div>
        </details>
      ))}</div>
    </section>
  )
  return <section className="overflow-hidden rounded-[24px] border border-[#e6e4df] bg-white shadow-sm">
    <div className="border-b border-[#eceae6] p-6 sm:p-8">
      <div className="flex items-start justify-between gap-5">
        <div><span className="text-[10px] font-semibold uppercase tracking-[.16em] text-[#777]">VÄLJ DINA BEHOV</span>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Hitta ett passande eSIM</h2></div>
        <Info className="size-5 text-[#777]" />
      </div>
      <p className="mt-3 text-sm leading-7 text-[#777]">Ange hur du planerar att använda mobildata. Vi har ännu ingen verifierad paketlista från {provider.name}; valen här är en vägledning, inte faktiska erbjudanden.</p>
    </div>
    <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-8">
      <div>
        <label htmlFor="data-need" className="mb-3 flex items-center gap-2 text-sm font-semibold"><Database className="size-4"/> Önskad datamängd</label>
        <select id="data-need" value={dataNeed} onChange={e=>setDataNeed(e.target.value)} className="h-12 w-full rounded-xl border border-[#dedcd7] bg-[#f9f8f5] px-4 text-sm outline-none focus:border-[#666]">
          <option value="">Välj önskad datamängd</option>{DATA_NEEDS.map(v=><option key={v}>{v}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="duration-need" className="mb-3 flex items-center gap-2 text-sm font-semibold"><CalendarDays className="size-4"/> Resans längd</label>
        <select id="duration-need" value={duration} onChange={e=>setDuration(e.target.value)} className="h-12 w-full rounded-xl border border-[#dedcd7] bg-[#f9f8f5] px-4 text-sm outline-none focus:border-[#666]">
          <option value="">Välj reslängd</option>{DURATION_NEEDS.map(v=><option key={v}>{v}</option>)}
        </select>
      </div>
    </div>
    <div className="border-t border-[#eceae6] bg-[#f8f7f4] p-6 sm:p-8">
      {dataNeed&&duration&&<p className="mb-4 flex items-center gap-2 text-sm text-[#555]"><CheckCircle2 className="size-4"/> Dina önskemål: {dataNeed}, {duration.toLowerCase()}.</p>}
      <a href={provider.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="flex min-h-14 items-center justify-center gap-3 rounded-xl bg-[#181818] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#333]">Se verifierade paket hos {provider.name} <ArrowUpRight className="size-5"/></a>
      <p className="mt-4 text-xs leading-6 text-[#777]">Aktuell datapott, giltighet, täckning, pris och övriga villkor kontrolleras på leverantörens webbplats. Länken kan ge oss provision.</p>
      <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"><Smartphone className="size-4"/> Så installerar du eSIM</Link>
    </div>
  </section>
}
