import Link from "next/link"
import type { Article } from "@/lib/esim-articles"
import { ArrowUpRight, Clock3 } from "lucide-react"

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/artiklar/${article.slug}`} className="group overflow-hidden rounded-[22px] border border-[#e5e3df] bg-white transition-all hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[1.6] overflow-hidden bg-[#eae8e4]">
        <img src={article.cover} alt={article.imageAlt} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="space-y-3 p-6 text-[#181818]">
        <div className="flex justify-between gap-3 text-[11px] font-medium uppercase tracking-wider text-[#777]">
          <span>{article.category}</span><span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" />{article.readingMinutes} min</span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight">{article.title}</h3>
        <p className="text-sm leading-7 text-[#777]">{article.description}</p>
        <div className="flex items-center justify-between border-t border-[#e8e7e3] pt-4 text-sm font-semibold">Läs artikeln <ArrowUpRight className="size-4" /></div>
      </div>
    </Link>
  )
}
