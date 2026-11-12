import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Smartphone, Globe2, CreditCard, QrCode } from "lucide-react"

export const metadata: Metadata = {
  title:"Vanliga frågor om eSIM | eSIMval",
  description:"Svar om eSIM, installation, destinationer, giltighet, data och hur eSIMval fungerar.",
}
const CATEGORIES = [
  { title:"eSIM och kompatibilitet",Icon:Smartphone,items:[
    ["Vad är eSIM?","eSIM är en digital mobilprofil som installeras i en kompatibel telefon eller annan enhet, i stället för att du sätter in ett fysiskt SIM-kort."],
    ["Kan jag använda eSIM på min mobil?","Det beror på modell, region och eventuell operatörslåsning. Kontrollera den exakta modellen och leverantörens kompatibilitetslista före köp."],
    ["Behåller jag mitt vanliga nummer?","Många enheter kan behålla ett annat SIM aktivt, men hur flera profiler fungerar samtidigt beror på enheten. Många rese-eSIM är enbart för mobildata."]
  ]},
  { title:"Paket och destinationer",Icon:Globe2,items:[
    ["Vilka länder täcker ett paket?","Det varierar mellan leverantörer och paket. Läs den fullständiga täckningslistan hos leverantören innan du beställer."],
    ["Hur mycket data behöver jag?","Det beror på vad du använder mobilen till. Kartor och meddelanden är ofta mindre datakrävande än video. Kontrollera även eventuella begränsningar för hastighet och användning."],
    ["Hur länge gäller paketet?","Giltigheten och när den börjar räknas varierar. Den kan till exempel börja vid installation, aktivering eller första anslutning."]
  ]},
  { title:"Installation och aktivering",Icon:QrCode,items:[
    ["Hur installerar jag ett eSIM?","Följ leverantörens instruktioner. Ofta skannas en QR-kod, men manuell installation eller leverantörens app kan också användas."],
    ["Måste jag aktivera mitt eSIM innan resan?","Det beror på leverantörens villkor. Installera inte för tidigt om giltighetsperioden börjar vid installation."],
    ["Behöver jag dataroaming?","Vissa rese-eSIM kräver dataroaming på den nya profilen. Följ leverantörens instruktioner och kontrollera roaming på ditt vanliga abonnemang."]
  ]},
  { title:"Köp och support",Icon:CreditCard,items:[
    ["Säljer eSIMval egna abonnemang?","Nej. eSIMval är en katalog. Själva köpet, betalningen och leveransen av eSIM hanteras av den valda leverantören."],
    ["Vem kontaktar jag om ett paket inte fungerar?","Kontakta leverantören där du köpte paketet. Deras support ansvarar för installation, aktivering, täckning, återbetalningar och beställningar."],
    ["Kan eSIMval få provision?","Ja. Vissa länkar är affiliatelänkar och kan ge eSIMval provision när du går vidare till leverantören."]
  ]},
]
export default function FAQPage(){
  return <main className="bg-[#f8f7f4] text-[#181818]">
    <header className="bg-[#111214] px-4 pb-24 pt-28 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/55">HJÄLPCENTER</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-[-.05em] md:text-6xl">Vanliga frågor</h1>
      <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-white/65">Allt du behöver veta för att komma igång med eSIM och använda eSIMval.</p>
    </header>
    <div className="mx-auto max-w-5xl px-4 py-20">
      <div className="space-y-16">{CATEGORIES.map(({title,Icon,items})=><section key={title}>
        <div className="mb-6 flex items-center gap-4"><span className="flex size-12 items-center justify-center rounded-xl bg-white shadow-sm"><Icon className="size-6"/></span><h2 className="text-2xl font-semibold tracking-tight">{title}</h2></div>
        <div className="space-y-3">{items.map(([question,answer])=><details key={question} className="group rounded-2xl border border-[#e7e5e1] bg-white px-6 py-5 shadow-sm">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{question}<span className="text-xl text-[#888]">+</span></summary>
          <p className="mt-4 text-sm leading-7 text-[#777]">{answer}</p>
        </details>)}</div>
      </section>)}</div>
      <div className="mt-20 rounded-[24px] bg-[#191a1c] p-8 text-white sm:p-12">
        <h2 className="text-3xl font-semibold">Vill du veta mer?</h2><p className="mt-4 max-w-xl text-sm leading-7 text-white/65">Läs installationsguiden eller gå vidare till vår katalog med leverantörer.</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href="/about" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#181818]">eSIM-guide <ArrowUpRight className="size-4"/></Link>
          <Link href="/providers" className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3 text-sm font-semibold">Alla leverantörer <ArrowUpRight className="size-4"/></Link>
        </div>
      </div>
    </div>
  </main>
}
