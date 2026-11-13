import type { Metadata } from "next"
import Link from "next/link"
import { ARTICLES } from "@/lib/esim-articles"
import { ArticleCard } from "@/components/esim/article-card"
export const metadata: Metadata = { title:"Artiklar och guider | eSIMval", description:"Guider om eSIM, reseuppkoppling och vad du behöver veta inför resan." }
export default function ArticlesPage() {
  return <main className="esim-page">
    <div className="esim-hero px-4 pb-20 pt-28 text-center">
      <p className="esim-eyebrow">ESIMVAL / KUNSKAP</p>
      <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-6xl">Artiklar & guider</h1>
      <p className="esim-hero-copy mx-auto mt-5 max-w-xl leading-8">Guider som hjälper dig förstå eSIM och förbereda resan.</p>
    </div>
    <div className="esim-section mx-auto max-w-7xl px-4 sm:px-6 lg:px-16">
      <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">{ARTICLES.map(article=><ArticleCard key={article.slug} article={article} />)}</div>
      <div className="mt-14"><Link href="/about" className="text-sm font-semibold underline underline-offset-4">Så installerar du eSIM</Link></div>
    </div>
  </main>
}
