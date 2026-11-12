"use client"

import Link from "next/link"
import { Marquee } from "@/components/shadcn-space/animations/marquee"
import { PROVIDERS } from "@/lib/esim"

/** Uses the template's original marquee animation, with real catalog providers. */
export function ProviderMarquee({ dark = true }: { dark?: boolean }) {
  return (
    <section aria-label="Utforska leverantörer" className={dark ? "border-y border-white/10 bg-[#101113] text-white" : "border-y border-[#e9e7e2] bg-white text-[#171717]"}>
      <div className="mx-auto max-w-7xl px-4 pt-6 text-center sm:px-6">
        <p className={dark ? "text-[10px] font-semibold uppercase tracking-[.2em] text-white/50" : "text-[10px] font-semibold uppercase tracking-[.2em] text-[#818181]"}>UTFORSKA LEVERANTÖRER PÅ ESIMVAL</p>
      </div>
      <Marquee pauseOnHover className="py-5 [--duration:30s]">
        {PROVIDERS.map(provider => (
          <Link key={provider.slug} href={`/providers/${provider.slug}`} className={`group mx-5 flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors sm:mx-9 ${dark ? "border-white/10 bg-white/5 hover:bg-white/10" : "border-[#e7e5e0] bg-[#faf9f6] hover:bg-[#eeede9]"}`}>
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
