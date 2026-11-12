"use client"

import type { ReactNode } from "react"
import { ArrowUpRight, ArrowRight, Search } from "lucide-react"
import "./printify-controls.css"

/** Uses the animated noise-border concept from Commercify's Printify listing. */
export function PrintifyPrimaryLink({ href, children, external = false }: { href: string; children: ReactNode; external?: boolean }) {
  return (
    <span className="esim-printify-noise inline-flex rounded-[15px] p-[3px] transition-transform duration-200 hover:-translate-y-0.5">
      <a href={href} {...(external ? { target: "_blank", rel: "sponsored noopener noreferrer" } : {})}
        className="relative z-10 inline-flex min-h-13 items-center justify-center gap-3 rounded-[12px] bg-[#141414] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#262626]">
        {children} <ArrowUpRight className="size-4" aria-hidden="true" />
      </a>
    </span>
  )
}

export function PrintifySecondaryButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick}
      className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-xl border border-[#d8d8d8] bg-white px-6 py-3 text-sm font-semibold text-[#181818] transition-colors hover:border-[#aaa] hover:bg-[#f3f3f3]">
      {children} <ArrowRight className="size-4" aria-hidden="true" />
    </button>
  )
}

export function LargeHeroSearch({ value, onChange, onSearch, placeholder, label }: {
  value: string
  onChange: (value: string) => void
  onSearch: () => void
  placeholder: string
  label: string
}) {
  return (
    <form onSubmit={event => { event.preventDefault(); onSearch() }}
      role="search" aria-label={label}
      className="esim-hero-search mx-auto flex min-h-[76px] w-full items-center gap-4 rounded-[22px] border border-[#ddd] bg-white px-4 py-3 text-[#181818] shadow-[0_24px_85px_rgba(0,0,0,.26)] sm:min-h-[86px] sm:gap-5 sm:px-6">
      <Search className="size-6 shrink-0 text-[#707070]" aria-hidden="true" />
      <label className="min-w-0 flex-1">
        <span className="sr-only">{label}</span>
        <input type="search" value={value} onChange={event => onChange(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent py-3 text-base text-[#171717] outline-none placeholder:text-[#888] sm:text-lg" />
      </label>
      <button type="submit" className="min-h-12 shrink-0 rounded-xl bg-[#171717] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#383838] sm:min-h-14 sm:px-8 sm:text-base">
        Sök
      </button>
    </form>
  )
}
