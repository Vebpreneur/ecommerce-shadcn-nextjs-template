import Link from "next/link"
import { ArrowUpRight, ArrowRight, CircleHelp, Globe2, ShieldCheck } from "lucide-react"
import { PROVIDERS } from "@/lib/esim"
import { ProviderLogo } from "@/components/esim/provider-logo"
import type { Article } from "@/lib/esim-articles"
import { articlePlacement } from "@/lib/esim-monetization"

/**
 * Reusable editorial offer module. These are navigation links, not specific
 * product packages. Never display prices, GB, reviews or coverage without
 * matching verified records.
 */
export function ArticleProviderWidget({ providerSlugs, destinationSlug, compact=false }:{
  providerSlugs:string[]
  destinationSlug?:string
  compact?:boolean
}) {
  const providers=providerSlugs.map(slug=>PROVIDERS.find(p=>p.slug===slug)).filter(p=>p!==undefined)
  if(!providers.length)return null
  return <aside className="esim-card not-prose p-5 sm:p-7" aria-label="Utforska eSIM-leverantörer">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><p className="esim-eyebrow">LEVERANTÖRER</p><h3 className="mt-2 text-xl font-semibold">Utforska eSIM-alternativ</h3></div>
      <Link href="/jamfor" className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Jämför <ArrowRight className="size-4"/></Link>
    </div>
    <p className="esim-text-muted mt-2 text-sm leading-6">Se aktuellt utbud och villkor hos varje leverantör. Länkarna kan ge eSIMval provision.</p>
    <div className={`mt-5 grid gap-3 ${compact?"grid-cols-1":"sm:grid-cols-2"}`}>
      {providers.map(p=><div className="flex items-center gap-3 rounded-xl border border-[#e5e8e5] bg-[#f8f8f6] p-3" key={p.slug}>
        <ProviderLogo provider={p} size="inline"/>
        <div className="min-w-0 flex-1"><p className="font-semibold">{p.name}</p>
          <Link className="esim-text-muted text-xs underline underline-offset-2" href={`/providers/${p.slug}`}>Leverantörssida</Link></div>
        <a className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[#d7ddda] bg-white transition-colors hover:bg-[#edf2ee]" href={p.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer" aria-label={`Besök ${p.name}s webbplats`}><ArrowUpRight className="size-4"/></a>
      </div>)}
    </div>
    {destinationSlug&&<p className="esim-text-muted mt-4 text-xs leading-6">Kontrollera att leverantören faktiskt erbjuder ett paket för ditt resmål innan du köper.</p>}
  </aside>
}

/** Reusable native ad space; stays hidden until a legitimate creative is supplied. */
export type AdCreative = { imageSrc:string; imageAlt:string; href:string; sponsor:string }
export function EditorialAd({ creative, placement="sidebar" }:{ creative?:AdCreative; placement?:"sidebar"|"inline" }) {
  if(!creative)return null
  if(!creative.imageSrc.startsWith("/assets/ads/"))return null
  if(!/^https:\/\//.test(creative.href))return null
  return <aside className="esim-card p-3" aria-label={`Annons från ${creative.sponsor}`}>
    <span className="esim-eyebrow mb-3 block text-right">ANNONS</span>
    <a href={creative.href} rel="sponsored noopener noreferrer" target="_blank">
      <img loading="lazy" src={creative.imageSrc} alt={creative.imageAlt} className={`w-full rounded-xl object-cover ${placement==="sidebar"?"aspect-[4/5]":"aspect-[3/1]"}`}/>
      <p className="esim-text-muted mt-2 text-center text-xs">{creative.sponsor}</p>
    </a>
  </aside>
}

export function ArticleSidebar({article}:{article:Article}) {
  const providers=article.providers?.length ? article.providers : ["airalo","yesim","saily"]
  const placements=articlePlacement(article.slug)
  return <aside className={`space-y-5 lg:sticky lg:top-28 lg:self-start ${article.sidebarSide==="left"?"lg:order-1":"lg:order-2"}`}>
    <div className="esim-card p-6">
      <p className="esim-eyebrow">I DEN HÄR GUIDEN</p>
      <nav aria-label="Artikelinnehåll" className="mt-5 space-y-3">
        {article.sections.map((section,i)=><a key={i} href={`#avsnitt-${i+1}`} className="esim-text-muted block border-l-2 border-[#dce3dd] pl-3 text-sm leading-6 transition-colors hover:border-[#1a1d1f] hover:text-[#1a1d1f]">{section.heading}</a>)}
      </nav>
    </div>
    <ArticleProviderWidget providerSlugs={providers} destinationSlug={article.destinationSlug} compact/>
    <EditorialAd creative={placements.sidebar} placement="sidebar"/>
    <div className="esim-editorial p-6">
      <Globe2 className="size-6"/>
      <h3 className="mt-5 text-lg font-semibold">Ska du resa snart?</h3>
      <p className="esim-text-muted mt-3 text-sm leading-7">Kontrollera kompatibilitet och aktiveringsregler innan du beställer ett rese-eSIM.</p>
      <Link href="/about" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Installationsguide <ArrowUpRight className="size-4"/></Link>
    </div>
  </aside>
}

export function ArticleSourceLinks({sources}:{sources?:{label:string;url:string}[]}) {
  if(!sources?.length)return null
  return <section className="border-t border-[#e5e8e5] pt-7">
    <h2 className="text-lg font-semibold">Källor och vidare läsning</h2>
    <ul className="mt-4 space-y-3">{sources.map(source=><li key={source.url}>
      <a className="esim-text-muted inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-[#1a1d1f]" target="_blank" rel="noopener noreferrer" href={source.url}>{source.label}<ArrowUpRight className="size-4"/></a>
    </li>)}</ul>
  </section>
}
