import type { Provider } from "@/lib/esim"

/**
 * Shared provider identity.
 * Upload real logos to public/assets/providers and set provider.logo in lib/esim.ts.
 * Until then, use the domain favicon as a temporary fallback.
 */
export function ProviderLogo({
  provider,
  size = "card",
  className = "",
}: {
  provider: Provider
  size?: "card" | "hero" | "inline"
  className?: string
}) {
  const dimensions = {
    card: "size-12 rounded-xl p-2",
    hero: "size-[76px] rounded-2xl p-3 sm:size-[88px]",
    inline: "size-11 rounded-xl p-2",
  }
  const logo = provider.logo || `https://www.google.com/s2/favicons?domain=${provider.website}&sz=128`

  return (
    <span className={`inline-flex shrink-0 items-center justify-center overflow-hidden border border-white/30 bg-white shadow-lg ${dimensions[size]} ${className}`}>
      <img src={logo} alt={`${provider.name} logotyp`} className="size-full object-contain" />
    </span>
  )
}
