import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, Globe2, Smartphone, ShieldCheck } from "lucide-react"
import { DESTINATIONS, PROVIDERS, getDestination, getProvider } from "@/lib/esim"
import { ProviderLogo } from "@/components/esim/provider-logo"

type Props = { params: Promise<{ slug: string; destination: string }> }

export function generateStaticParams() {
  return PROVIDERS.flatMap(provider =>
    DESTINATIONS.map(destination => ({ slug: provider.slug, destination: destination.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, destination } = await params
  const provider = getProvider(slug)
  const place = getDestination(destination)
  if (!provider || !place) return { title: "Destinationen kunde inte hittas" }
  return {
    title: `eSIM ${place.name} hos ${provider.name} | eSIMval`,
    description: `Utforska eSIM för ${place.name}. Kontrollera aktuella paket och villkor hos ${provider.name}.`,
  }
}

export default async function DestinationPage({ params }: Props) {
  const { slug, destination } = await params
  const provider = getProvider(slug)
  const place = getDestination(destination)
  if (!provider || !place) notFound()

  return (
    <main className="bg-background">
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-16">
        <nav aria-label="Brödsmulor" className="mb-9 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/providers" className="hover:text-foreground">Leverantörer</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/providers/${provider.slug}`} className="hover:text-foreground">{provider.name}</Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{place.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative min-h-[380px] overflow-hidden rounded-3xl bg-muted lg:min-h-[600px]">
            <img src={place.image} alt={place.name} className="absolute inset-0 size-full object-cover" />
            <span className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black">{place.kind}</span>
          </div>
          <div className="flex flex-col justify-center">
            <div className="mb-5 flex items-center gap-3">
              <ProviderLogo provider={provider} size="inline" />
              <span className="text-sm font-semibold text-foreground">{provider.name}</span>
            </div>
            <p className="text-xs font-semibold uppercase tracking-[.15em] text-muted-foreground">{provider.name} / DESTINATIONER</p>
            <h1 className="mt-5 text-5xl font-medium tracking-tight md:text-6xl">eSIM för {place.name}</h1>
            <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">
              Utforska alternativ för {place.name} hos {provider.name}. De aktuella abonnemangen, priserna,
              giltighetstiderna och täckningen hittar du på leverantörens webbplats.
            </p>
            <div className="mt-9 rounded-2xl border border-border bg-muted/30 p-7">
              <p className="mb-5 text-sm font-medium">Aktuella paket och erbjudanden</p>
              <a href={provider.affiliateUrl} target="_blank" rel="sponsored noopener noreferrer"
                className="group inline-flex w-full items-center justify-between gap-4 rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85">
                Se alternativ hos {provider.name}
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <p className="mt-4 text-xs leading-6 text-muted-foreground">
                Du lämnar vår katalog och fortsätter till leverantören. Länken kan ge oss provision.
                Denna sida visar inga verifierade paketpriser.
              </p>
            </div>
            <div className="mt-9 grid gap-5 border-t border-border pt-8 sm:grid-cols-3">
              {[
                { Icon: Smartphone, text: "Kontrollera eSIM-stöd" },
                { Icon: Globe2, text: "Jämför täckning" },
                { Icon: ShieldCheck, text: "Köp hos leverantören" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Icon className="size-5 shrink-0 text-foreground" aria-hidden="true" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
            <Link href={`/providers/${provider.slug}`} className="mt-10 inline-flex items-center gap-2 text-sm font-medium hover:underline">
              <ArrowLeft className="size-4" /> Tillbaka till {provider.name}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
