import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react"
import { ARTICLES, getArticle } from "@/lib/esim-articles"
import { ArticleCard } from "@/components/esim/article-card"

type Props = { params: Promise<{ slug:string }> }
export function generateStaticParams(){ return ARTICLES.map(article=>({slug:article.slug})) }
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;const article=getArticle(slug)
  return article?{title:`${article.title} | eSIMval`,description:article.description}:{title:"Artikeln hittades inte"}
}
export default async function ArticlePage({params}:Props){
  const {slug}=await params;const article=getArticle(slug)
  if(!article)notFound()
  const related=ARTICLES.filter(a=>a.slug!==slug).slice(0,2)
  return <main className="esim-page">
    <div className="mx-auto max-w-7xl px-4 pt-24 sm:px-6 lg:px-16">
      <Link href="/artiklar" className="inline-flex items-center gap-2 text-sm font-semibold text-[#626262] hover:text-black"><ArrowLeft className="size-4"/> Alla artiklar</Link>
    </div>
    <header className="esim-hero mx-auto max-w-none px-4 pb-16 pt-12 text-center">
      <p className="esim-eyebrow">{article.category}</p>
      <h1 className="mt-5 text-4xl font-semibold leading-[1.12] tracking-[-.045em] sm:text-6xl">{article.title}</h1>
      <p className="esim-text-muted mx-auto mt-6 max-w-2xl text-lg leading-8">{article.description}</p>
      <p className="esim-text-muted mt-5 inline-flex items-center gap-2 text-xs"><Clock3 className="size-4"/>{article.readingMinutes} minuters läsning</p>
    </header>
    <figure className="mx-auto max-w-6xl overflow-hidden rounded-3xl px-4 sm:px-6"><img src={article.cover} alt={article.imageAlt} className="aspect-[2.1] w-full rounded-2xl object-cover"/></figure>
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="space-y-16">
        {article.sections.map((section,i)=><section key={i}>
          <h2 className="text-3xl font-semibold tracking-tight">{section.heading}</h2>
          {section.paragraphs.map((paragraph,j)=><p key={j} className="esim-text-muted mt-5 text-base leading-9">{paragraph}</p>)}
          {section.image&&<figure className="mt-9"><img src={section.image.src} alt={section.image.alt} className="aspect-[1.8] w-full rounded-2xl object-cover"/>{section.image.caption&&<figcaption className="mt-3 text-xs text-[#777]">{section.image.caption}</figcaption>}</figure>}
        </section>)}
      </div>
      <div className="esim-card mt-16 p-8">
        <h2 className="text-2xl font-semibold">Redo att utforska?</h2>
        <p className="esim-text-muted mt-3 leading-7">Hitta leverantörer och destinationer på eSIMval. Kontrollera aktuella villkor direkt hos respektive leverantör.</p>
        <Link href="/providers" className="esim-button mt-5">Se leverantörer <ArrowUpRight className="size-4"/></Link>
      </div>
    </div>
    {related.length>0&&<aside className="esim-section border-t border-[#e5e8e5] px-4"><div className="mx-auto max-w-6xl"><h2 className="mb-8 text-3xl font-semibold">Läs vidare</h2><div className="grid gap-7 md:grid-cols-2">{related.map(a=><ArticleCard key={a.slug} article={a}/>)}</div></div></aside>}
  </main>
}
