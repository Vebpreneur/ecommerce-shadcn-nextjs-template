import type { Metadata } from "next"
import Link from "next/link"
import { ARTICLES } from "@/lib/esim-articles"
import { ArticleCard } from "@/components/esim/article-card"
export const metadata: Metadata = { title:"Artiklar och guider | eSIMval", description:"Guider om eSIM, reseuppkoppling och vad du behöver veta inför resan." }
export default function ArticlesPage() {
  return <main className="bg-[#f8f7f4] text-[#191919]">
    <div className="border-b border-white/10 bg-[#111214] px-4 pb-20 pt-28 text-center text-white">
      <p className="text-xs font-semibold uppercase tracking-[.2em] text-white/55">ESIMVAL / KUNSKAP</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-6xl">Artiklar & guider</h1>
      <p className="mx-auto mt-5 max-w-xl leading-8 text-white/65">Guider som hjälper dig förstå eSIM och förbereda resan.</p>
    </div>
    <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-16">
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{ARTICLES.map(article=><ArticleCard key={article.slug} article={article} />)}</div>
      <div className="mt-14"><Link href="/about" className="text-sm font-semibold underline underline-offset-4">Så installerar du eSIM</Link></div>
    </div>
  </main>
}
