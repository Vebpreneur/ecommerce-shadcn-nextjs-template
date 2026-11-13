import Link from "next/link"
import type { Article } from "@/lib/esim-articles"
import { ArrowUpRight, Clock3 } from "lucide-react"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artiklar/${article.slug}`} className="esim-card group flex h-full flex-col">
      <div className="aspect-[1.6] overflow-hidden bg-[#f2f3f0]">
        <img src={article.cover} alt={article.imageAlt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="esim-card-body space-y-3">
        <div className="flex justify-between gap-3 text-[11px] font-medium uppercase tracking-wider text-[#626a6c]">
          <span>{article.category}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" />{article.readingMinutes} min</span>
        </div>
        <h3 className="esim-card-title">{article.title}</h3>
        <p className="esim-card-copy mb-4 text-sm">{article.description}</p>
        <div className="esim-card-link">Läs artikeln <ArrowUpRight className="size-4" /></div>
      </div>
    </Link>
  )
}
