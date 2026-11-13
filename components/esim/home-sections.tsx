import Link from "next/link"
import { ArrowUpRight, ArrowRight, Globe, Smartphone, QrCode, MapPin, ShieldCheck } from "lucide-react"
import { ARTICLES } from "@/lib/esim-articles"
import { ArticleCard } from "@/components/esim/article-card"
import { DESTINATIONS } from "@/lib/esim"

export function HomeCategories() {
  const highlights=[DESTINATIONS[0],DESTINATIONS[1],DESTINATIONS[2],DESTINATIONS[3],DESTINATIONS[5]]
  return <section className="esim-section alt px-4 sm:px-6">
    <div className="mx-auto max-w-7xl lg:px-16">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="esim-eyebrow">UPPTÄCK RESMÅL</p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-.05em] sm:text-5xl">Vart vill du resa?</h2>
          <p className="esim-text-muted mt-4 max-w-lg text-sm leading-7">Börja med en destination och utforska eSIM-alternativ.</p></div>
        <Link href="/providers/airalo" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">Fler destinationer <ArrowUpRight className="size-4"/></Link>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-6">
        {highlights.map((place,i)=><Link key={place.slug} href={`/providers/airalo/${place.slug}`}
          className={`esim-image-tile group relative flex min-h-[260px] flex-col justify-end overflow-hidden rounded-[20px] bg-[#242424] p-6 text-white md:min-h-[330px] ${i<2?"md:col-span-3":"md:col-span-2"}`}>
          <img src={place.image} alt="" loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"/>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"/>
          <div className="relative flex items-end justify-between gap-4"><div>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/75">{place.kind}</span>
            <h3 className="mt-2 text-3xl font-semibold tracking-tight">{place.name}</h3>
          </div><span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/50 bg-white/15 transition-colors group-hover:bg-white group-hover:text-black"><ArrowUpRight className="size-5"/></span></div>
        </Link>)}
      </div>
      <p className="mt-5 text-xs text-[#888]">Destinationerna är exempel. Faktiskt utbud och priser kontrolleras hos respektive leverantör.</p>
    </div>
  </section>
}

export function HomeEditorial() {
  return <section className="esim-section soft px-4 sm:px-6">
    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:px-16">
      <div className="overflow-hidden rounded-[24px] bg-[#edf0ec]">
        <img src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1500&q=85" alt="Vy från flygplansfönster under resa" loading="lazy" className="aspect-[1.1] w-full object-cover"/>
      </div>
      <div><p className="esim-eyebrow">UPPKOPPLING UTAN KRÅNGEL</p>
        <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-[-.05em] sm:text-5xl">Din resa börjar innan du landar.</h2>
        <p className="esim-text-muted mt-6 text-base leading-8">Med en kompatibel telefon kan en eSIM-profil installeras digitalt. Det viktiga är att välja rätt destination, kontrollera enheten och läsa paketets giltighetsvillkor innan du aktiverar.</p>
        <div className="mt-9 divide-y divide-[#d9d7d1] border-y border-[#d9d7d1]">
          {[
            {Icon:Smartphone,title:"Kontrollera enheten",copy:"Alla telefoner har inte eSIM-stöd."},
            {Icon:QrCode,title:"Installera digitalt",copy:"Följ leverantörens instruktioner för QR-kod eller manuell installation."},
            {Icon:MapPin,title:"Välj rätt täckning",copy:"Se vilka länder som faktiskt ingår i paketet."},
          ].map(({Icon,title,copy})=><div key={title} className="flex items-start gap-4 py-5"><Icon className="mt-1 size-6 shrink-0"/><div><h3 className="font-semibold">{title}</h3><p className="esim-text-muted mt-1 text-sm leading-7">{copy}</p></div></div>)}
        </div>
        <Link href="/about" className="esim-button mt-8">Se installationsguiden <ArrowUpRight className="size-4"/></Link>
      </div>
    </div>
  </section>
}

export function HomeKnowledge() {
  return <section className="esim-section px-4 sm:px-6">
    <div className="mx-auto max-w-7xl lg:px-16">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div><p className="esim-eyebrow">INSPIRATION & KUNSKAP</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Guider för smartare resor.</h2>
          <p className="esim-text-muted mt-4 max-w-xl text-sm leading-7">Läs om digitala SIM-kort, installation och hur du förbereder dig.</p></div>
        <Link href="/artiklar" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">Alla artiklar <ArrowRight className="size-4"/></Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">{ARTICLES.map(article=><ArticleCard key={article.slug} article={article}/>)}</div>
    </div>
  </section>
}

export function HomeFAQ() {
  const faq=[
    ["Vad är eSIM?","Ett eSIM är en digital SIM-profil som installeras i en kompatibel telefon utan ett fysiskt SIM-kort."],
    ["Måste jag köpa direkt på eSIMval?","Nej. eSIMval är en katalog och guide. Priser, paket och betalning hanteras av den valda leverantören."],
    ["Hur vet jag hur mycket data jag behöver?","Det beror på hur du använder mobilen. Kartor och meddelanden kräver ofta mindre data än videostreaming. Jämför datapott och giltighetstid hos leverantören."],
    ["När börjar eSIM-paketet gälla?","Det varierar beroende på paket. Läs alltid när giltighetstiden startar och hur aktivering fungerar."],
  ]
  return <section className="esim-section alt border-t border-[#e5e8e5] px-4 sm:px-6">
    <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.75fr_1.25fr] lg:px-16">
      <div><p className="esim-eyebrow">VANLIGA FRÅGOR</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.05em]">Bra att veta före resan.</h2><p className="esim-text-muted mt-5 leading-8">Här är svar på några av de vanligaste frågorna om eSIM.</p>
        <Link href="/about" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Läs vår eSIM-guide <ArrowUpRight className="size-4"/></Link>
      </div>
      <div className="space-y-3">{faq.map(([q,a])=><details key={q} className="group rounded-xl border border-[#e8e6e1] bg-[#faf9f7] px-6 py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">{q}<span className="text-lg text-[#777]">+</span></summary><p className="esim-text-muted mt-4 text-sm leading-7">{a}</p></details>)}</div>
    </div>
  </section>
}
