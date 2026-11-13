"use client"

import Link from "next/link"
import { Marquee } from "@/components/shadcn-space/animations/marquee"
import { PROVIDERS } from "@/lib/esim"

/** Uses the template's original marquee animation, with real catalog providers. */
export function ProviderMarquee({ dark = false }: { dark?: boolean }) {
  return (
    <section aria-label="Utforska leverantörer" className={dark ? "border-y border-white/10 bg-[#1a1d1f] text-white" : "border-y border-[#e5e8e5] bg-white text-[#1a1d1f]"}>
      <div className="mx-auto max-w-7xl px-4 pt-5 text-center sm:px-6">
        <p className={dark ? "text-[10px] font-semibold uppercase tracking-[.2em] text-white/50" : "text-[10px] font-semibold uppercase tracking-[.2em] text-[#818181]"}>UTFORSKA LEVERANTÖRER PÅ ESIMVAL</p>
      </div>
      <Marquee pauseOnHover className="py-4 [--duration:42s]">
        {PROVIDERS.map(provider => (
          <Link key={provider.slug} href={`/providers/${provider.slug}`} className={`group mx-2 flex h-14 items-center gap-3 rounded-xl border px-5 transition-colors sm:mx-4 ${dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-[#e5e8e5] bg-white hover:bg-[#f3f5f2]"}`}>
            <span className="flex size-9 items-center justify-center rounded-lg bg-white p-1.5">
              <img src={provider.logo || `https://www.google.com/s2/favicons?domain=${provider.website}&sz=128`} alt="" className="size-full object-contain" />
            </span>
            <span className="whitespace-nowrap text-sm font-semibold">{provider.name}</span>
          </Link>
        ))}
      </Marquee>
    </section>
  )
}
