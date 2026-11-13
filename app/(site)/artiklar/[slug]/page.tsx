import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react"
import { ARTICLES, getArticle } from "@/lib/esim-articles"
import { ArticleCard } from "@/components/esim/article-card"
import { ArticleProviderWidget, ArticleSidebar, ArticleSourceLinks } from "@/components/esim/article-widgets"

const siteUrl=process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/,"") || "https://esimval.se"
type Props={params:Promise<{slug:string}>}

export function generateStaticParams(){return ARTICLES.map(article=>({slug:article.slug}))}

export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const article=getArticle(slug)
 if(!article)return{title:"Artikeln hittades inte"}
 return{
  title:`${article.title} | eSIMval`,
  description:article.description,
  alternates:{canonical:`${siteUrl}/artiklar/${article.slug}`},
  openGraph:{type:"article",locale:"sv_SE",title:article.title,description:article.description,images:[{url:article.cover,alt:article.imageAlt}]},
  twitter:{card:"summary_large_image",title:article.title,description:article.description,images:[article.cover]}
 }
}

export default async function ArticlePage({params}:Props){
 const {slug}=await params
 const article=getArticle(slug)
 if(!article)notFound()
 const related=ARTICLES.filter(a=>a.slug!==slug).slice(0,3)
 const jsonLd={
  "@context":"https://schema.org",
  "@type":"Article",
  "headline":article.title,
  "description":article.description,
  "image":article.cover,
  "inLanguage":"sv-SE",
  "author":{"@type":"Organization","name":"eSIMval"},
  "publisher":{"@type":"Organization","name":"eSIMval"},
  "mainEntityOfPage":`${siteUrl}/artiklar/${article.slug}`,
 }
 return <main className="esim-page">
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd).replace(/</g,"\\u003c")}}/>
   <header className="esim-hero px-4 pb-16 pt-28">
     <div className="esim-container">
       <Link href="/artiklar" className="esim-text-muted inline-flex items-center gap-2 text-sm font-semibold hover:text-[#1a1d1f]"><ArrowLeft className="size-4"/> Alla artiklar</Link>
       <div className="mx-auto mt-12 max-w-4xl text-center">
         <p className="esim-eyebrow">{article.category}</p>
         <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-[-.045em] sm:text-6xl">{article.title}</h1>
         <p className="esim-hero-copy mx-auto mt-6 max-w-2xl text-lg leading-8">{article.description}</p>
         <p className="esim-text-muted mt-5 inline-flex items-center gap-2 text-xs"><Clock3 className="size-4"/>{article.readingMinutes} minuters uppskattad läsning</p>
       </div>
     </div>
   </header>
   <div className="esim-container relative -mt-6">
     <figure className="overflow-hidden rounded-[24px] border border-[#e5e8e5] bg-[#f2f3f0]">
       <img src={article.cover} alt={article.imageAlt} className="aspect-[2.25] w-full object-cover" />
     </figure>
   </div>
   <div className="esim-section">
     <div className="esim-container grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_310px]">
       <article className="min-w-0">
         <div className="space-y-14">
           {article.sections.map((section,i)=><section key={i} id={`avsnitt-${i+1}`} className="scroll-mt-28">
             <h2 className="text-3xl font-semibold tracking-tight">{section.heading}</h2>
             {section.paragraphs.map((paragraph,j)=><p key={j} className="esim-text-muted mt-5 text-base leading-9">{paragraph}</p>)}
             {section.image&&<figure className="mt-8 overflow-hidden rounded-[20px] border border-[#e5e8e5] bg-white">
               <img src={section.image.src} alt={section.image.alt} className="aspect-[1.8] w-full object-cover" loading="lazy"/>
               {section.image.caption&&<figcaption className="esim-text-muted p-4 text-xs">{section.image.caption}</figcaption>}
             </figure>}
             {section.widget==="providers" && <div className="mt-9"><ArticleProviderWidget providerSlugs={article.providers||["airalo","yesim","saily"]} destinationSlug={article.destinationSlug}/></div>}
             {section.widget==="comparison" && <div className="esim-editorial mt-9 p-7">
               <p className="esim-eyebrow">JÄMFÖR INNAN DU KÖPER</p>
               <h3 className="mt-3 text-xl font-semibold">Vilken leverantör passar resan?</h3>
               <p className="esim-text-muted mt-3 text-sm leading-7">Välj leverantörer sida vid sida. Priser och datapaket visas när uppgifterna är verifierade.</p>
               <Link href="/jamfor" className="esim-button mt-5">Öppna jämförelsen <ArrowUpRight className="size-4"/></Link>
             </div>}
           </section>)}
         </div>
         <div className="mt-16 space-y-8">
           <ArticleProviderWidget providerSlugs={article.providers||["airalo","yesim","saily"]} destinationSlug={article.destinationSlug}/>
           <ArticleSourceLinks sources={article.sources}/>
           <div className="esim-editorial p-7 sm:p-9">
             <h2 className="text-2xl font-semibold">Nästa steg inför din resa</h2>
             <p className="esim-text-muted mt-4 leading-7">Utforska leverantörerna och kontrollera deras aktuella paket. eSIMval är en katalog och kan få provision när du besöker en leverantör via våra länkar.</p>
             <div className="mt-6 flex flex-wrap gap-3">
               <Link href="/jamfor" className="esim-button">Jämför leverantörer <ArrowUpRight className="size-4"/></Link>
               <Link href="/about" className="esim-button esim-button-secondary">Installationsguide <ArrowUpRight className="size-4"/></Link>
             </div>
           </div>
         </div>
       </article>
       <ArticleSidebar article={article}/>
     </div>
   </div>
   {related.length>0&&<section className="esim-section alt border-t border-[#e5e8e5]">
     <div className="esim-container">
       <div className="mb-8 flex flex-wrap items-end justify-between gap-3"><h2 className="text-3xl font-semibold">Läs vidare</h2>
         <Link href="/artiklar" className="inline-flex items-center gap-2 text-sm font-semibold">Alla guider <ArrowUpRight className="size-4"/></Link>
       </div>
       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map(a=><ArticleCard key={a.slug} article={a}/>)}</div>
     </div>
   </section>}
 </main>
}
