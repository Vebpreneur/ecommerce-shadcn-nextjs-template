import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, BookOpen, HelpCircle, Headphones, MessageSquare, ShieldCheck, Globe2 } from "lucide-react"
import { PROVIDERS } from "@/lib/esim"

export const metadata: Metadata = {
  title: "Kontakt och hjälp | eSIMval",
  description: "Hitta rätt hjälp om eSIM, installation, leverantörer och beställningar.",
}

export default function ContactPage() {
  return <main className="bg-[#f8f7f4] text-[#181818]">
    <section className="bg-[#111214] px-4 pb-24 pt-28 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[.18em] text-white/55">HJÄLP & KONTAKT</p>
      <h1 className="mx-auto mt-5 max-w-3xl text-5xl font-semibold tracking-[-.05em] sm:text-6xl">Vad behöver du hjälp med?</h1>
      <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/70">
        eSIMval hjälper dig att upptäcka leverantörer och destinationer. För ett redan köpt paket hjälper leverantören dig vidare.
      </p>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-16">
      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { Icon:BookOpen,title:"Hur fungerar eSIM?",copy:"Lär dig om installation, QR-koder och kompatibla enheter.",href:"/about",cta:"Läs guiden" },
          { Icon:Globe2,title:"Hitta en leverantör",copy:"Utforska våra leverantörssidor och gå vidare till deras aktuella erbjudanden.",href:"/providers",cta:"Visa leverantörer" },
          { Icon:HelpCircle,title:"Artiklar & frågor",copy:"Läs praktiska guider om dataanvändning, täckning och förberedelser inför resan.",href:"/artiklar",cta:"Se artiklar" },
        ].map(({Icon,title,copy,href,cta})=><Link href={href} key={title} className="group flex flex-col rounded-[22px] border border-[#e5e3de] bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
          <Icon className="size-8" strokeWidth={1.4}/>
          <h2 className="mt-12 text-2xl font-semibold">{title}</h2>
          <p className="mt-4 flex-1 text-sm leading-7 text-[#777]">{copy}</p>
          <span className="mt-8 flex items-center justify-between border-t border-[#e7e5e0] pt-5 text-sm font-semibold">{cta}<ArrowUpRight className="size-5"/></span>
        </Link>)}
      </div>
    </section>
    <section className="border-y border-[#e5e3df] bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:px-16">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">BESTÄLLNING & SUPPORT</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-.04em]">Behöver du hjälp med ditt köp?</h2>
          <p className="mt-5 leading-8 text-[#6c6c6c]">eSIMval säljer inga eSIM-paket. Om du har frågor om betalning, QR-kod, aktivering, täckning eller återbetalning ska du kontakta leverantören där du gjorde köpet.</p>
          <p className="mt-5 text-sm leading-7 text-[#777]">Vi anger inga obekräftade kontaktuppgifter för eSIMval. En egen kontaktkanal för plattformsfrågor läggs till före offentlig lansering.</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">{PROVIDERS.map(provider=><a key={provider.slug} href={provider.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-[#e5e3de] bg-[#faf9f6] p-4 transition-colors hover:bg-[#eeede8]">
          <span className="flex size-10 items-center justify-center rounded-lg bg-white p-2"><img src={provider.logo || `https://www.google.com/s2/favicons?domain=${provider.website}&sz=128`} alt="" className="size-full object-contain"/></span>
          <span className="flex-1 text-sm font-semibold">{provider.name}</span><ArrowUpRight className="size-4"/>
        </a>)}</div>
      </div>
    </section>
  </main>
}
