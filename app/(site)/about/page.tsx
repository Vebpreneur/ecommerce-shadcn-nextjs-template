import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Check, CircleHelp, QrCode, Settings2, Smartphone, Wifi, BadgeCheck, ArrowRight, ScanLine } from "lucide-react"
import { ARTICLES } from "@/lib/esim-articles"
import { ArticleCard } from "@/components/esim/article-card"

export const metadata: Metadata = {
  title: "Så fungerar eSIM – installationsguide | eSIMval",
  description: "Lär dig vad eSIM är, hur du kontrollerar kompatibilitet och hur du installerar och aktiverar en eSIM-profil.",
}

const STEPS = [
  {number:"01",Icon:Smartphone,title:"Kontrollera kompatibiliteten",copy:"Se till att den exakta mobilmodellen stöder eSIM och uppfyller leverantörens krav. Kontrollera även om telefonen är operatörslåst."},
  {number:"02",Icon:BadgeCheck,title:"Välj leverantör och paket",copy:"Granska destinationslista, datamängd, giltighetstid, startvillkor och priser på leverantörens webbplats."},
  {number:"03",Icon:QrCode,title:"Installera eSIM-profilen",copy:"Följ instruktionerna från leverantören. Det kan innebära att skanna en QR-kod eller installera profilen manuellt."},
  {number:"04",Icon:Wifi,title:"Aktivera rätt mobilprofil",copy:"Välj eSIM-profilen för mobildata i telefonens inställningar. Anpassa roaminginställningar enligt leverantörens instruktioner."},
]

export default function AboutPage(){
  return <main className="esim-page">
    <section className="esim-hero relative overflow-hidden px-4 pb-20 pt-28">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{backgroundImage:"linear-gradient(#b5c0ba44 1px, transparent 1px),linear-gradient(90deg,#b5c0ba44 1px,transparent 1px)",backgroundSize:"64px 64px"}}/>
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 sm:px-6 lg:grid-cols-2 lg:px-16">
        <div><p className="esim-eyebrow">GUIDE / ESIM</p>
          <h1 className="mt-6 text-5xl font-semibold leading-[1.08] tracking-[-.055em] sm:text-6xl">Uppkopplad på resan. Utan fysiskt SIM-kort.</h1>
          <p className="esim-hero-copy mt-6 max-w-xl text-base leading-8">En visuell introduktion till hur eSIM fungerar, hur du installerar en digital mobilprofil och vad du behöver kontrollera före avresan.</p>
          <Link href="/providers" className="esim-button mt-8">Utforska leverantörer <ArrowUpRight className="size-4"/></Link>
        </div>
        <div className="relative mx-auto flex w-full max-w-sm items-center justify-center rounded-[24px] border border-[#dfe5df] bg-white/70 p-8 shadow-[0_18px_50px_rgba(20,30,25,.08)]">
          <div className="relative w-60 overflow-hidden rounded-[36px] border-[8px] border-[#343434] bg-[#faf9f7] p-5 shadow-2xl">
            <div className="mx-auto mb-10 h-2 w-20 rounded-full bg-[#333]"/>
            <div className="rounded-2xl border border-[#e9e7e1] bg-white p-5 text-[#171717]">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#777]">MOBILNÄT</span>
              <div className="mt-6 flex size-14 items-center justify-center rounded-xl bg-[#f0efe9]"><QrCode className="size-8"/></div>
              <p className="mt-5 text-base font-semibold">Lägg till eSIM</p>
              <p className="mt-2 text-xs leading-6 text-[#777]">Skanna den riktiga QR-koden som du får från din leverantör.</p>
            </div>
            <div className="mt-9 h-3 rounded-full bg-[#e2e2e2]"/>
            <div className="mt-3 h-3 w-3/4 rounded-full bg-[#e8e8e8]"/>
            <div className="my-8 h-2 rounded-full bg-[#d6d6d6]"/>
          </div>
          <span className="absolute bottom-8 right-0 flex items-center gap-2 rounded-xl border border-[#dde3dd] bg-white px-4 py-3 text-xs text-[#626a6c] shadow-sm"><ScanLine className="size-5"/> Illustration – ingen aktiv QR-kod</span>
        </div>
      </div>
    </section>

    <section className="esim-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
      <div className="grid items-start gap-12 lg:grid-cols-[.7fr_1.3fr]">
        <div><p className="esim-eyebrow">FRÅN VAL TILL UPPKOPPLING</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Fyra steg till ditt eSIM.</h2>
          <p className="esim-text-muted mt-5 leading-8">Stegen är generella. Menynamn och installationsförfarande varierar mellan olika telefoner och leverantörer.</p></div>
        <div className="grid gap-4 sm:grid-cols-2">{STEPS.map(step=><div key={step.number} className="esim-card p-7">
          <div className="flex items-start justify-between"><span className="text-xs font-semibold text-[#999]">{step.number}</span><step.Icon className="size-7 text-[#333]" strokeWidth={1.5}/></div>
          <h3 className="mt-9 text-xl font-semibold tracking-tight">{step.title}</h3>
          <p className="esim-text-muted mt-3 text-sm leading-7">{step.copy}</p>
        </div>)}</div>
      </div>
    </section>

    <section className="esim-section alt border-y border-[#e5e8e5] px-4 sm:px-6">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:px-16">
        <div className="overflow-hidden rounded-[26px]"><img src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9?auto=format&fit=crop&w=1300&q=85" alt="Mobiltelefon i handen" className="aspect-[1.25] w-full object-cover"/></div>
        <div><p className="esim-eyebrow">INSTALLATION & AKTIVERING</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.045em]">QR-kod eller manuell installation?</h2>
          <p className="esim-text-muted mt-6 leading-8">De flesta leverantörer erbjuder instruktioner för att lägga till en eSIM-profil. Ofta används en QR-kod, men vissa använder också en aktiveringskod eller en app.</p>
          <div className="mt-8 space-y-5">{[
            ["Använd stabilt internet","Du behöver normalt internet för att hämta eSIM-profilen."],
            ["Skanna leverantörens kod","QR-koden är personlig och tillhandahålls vid köp. Illustrationen ovan är ingen aktiveringskod."],
            ["Kontrollera startvillkoren","Giltighetstiden kan börja vid installation, aktivering eller första nätverksanslutning."],
          ].map(([title,copy])=><div key={title} className="flex items-start gap-3"><span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-[#181818] text-white"><Check className="size-4"/></span><div><h3 className="font-semibold">{title}</h3><p className="esim-text-muted mt-1 text-sm leading-7">{copy}</p></div></div>)}</div>
        </div>
      </div>
    </section>

    <section className="esim-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
      <p className="esim-eyebrow">BRA ATT VETA</p><h2 className="mt-4 text-4xl font-semibold">Vanliga frågor</h2>
      <div className="mt-9 grid gap-3 lg:grid-cols-2">{[
        ["Behöver jag ta ut mitt vanliga SIM-kort?","Inte nödvändigtvis. Många kompatibla telefoner kan ha flera SIM-profiler, men vilka som kan vara aktiva samtidigt beror på enheten."],
        ["Fungerar eSIM på alla telefoner?","Nej. Kontrollera modellens exakta eSIM-stöd och eventuella operatörslåsningar."],
        ["Behövs dataroaming?","Det beror på eSIM-paketet och leverantörens anvisningar. Kontrollera inställningarna innan du aktiverar mobildata."],
        ["Ingår telefonnummer och vanliga samtal?","Vissa erbjudanden är endast för mobildata. Kontrollera paketets innehåll innan köp."],
      ].map(([question,answer])=><details key={question} className="group rounded-xl border border-[#e6e4df] bg-white px-6 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold">{question}<span className="text-[#888]">+</span></summary><p className="mt-4 text-sm leading-7 text-[#777]">{answer}</p></details>)}</div>
      <div className="mt-16 flex items-center justify-between gap-4"><h2 className="text-2xl font-semibold">Fördjupa dig i våra guider</h2><Link href="/artiklar" className="inline-flex items-center gap-2 text-sm font-semibold">Alla artiklar <ArrowRight className="size-4"/></Link></div>
      <div className="mt-7 grid gap-6 md:grid-cols-2">{ARTICLES.map(a=><ArticleCard key={a.slug} article={a}/>)}</div>
    </section>
  </main>
}
