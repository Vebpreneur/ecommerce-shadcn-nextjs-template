import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { DESTINATIONS, PROVIDERS, getDestination, getProvider } from "@/lib/esim"
import { ProviderLogo } from "@/components/esim/provider-logo"
import { EsimPlanFinder } from "@/components/esim/plan-finder"

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
    <main className="bg-[#f8f7f4] text-[#181818]">
      <div className="border-b border-[#252629] bg-[#111214] px-4 pb-14 pt-24 text-white">
        <nav aria-label="Brödsmulor" className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 text-xs text-white/60 sm:px-6 lg:px-16">
          <Link href="/providers" className="hover:text-white">Leverantörer</Link><span>/</span>
          <Link href={`/providers/${provider.slug}`} className="hover:text-white">{provider.name}</Link><span>/</span>
          <span className="text-white">{place.name}</span>
        </nav>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-16">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative overflow-hidden rounded-[24px] border border-[#e7e5e0] bg-white">
            <img src={place.image} alt={place.name} className="aspect-[4/3] w-full object-cover"/>
            <div className="flex items-center gap-3 p-5">
              <ProviderLogo provider={provider} size="inline" />
              <div><p className="text-xs uppercase tracking-widest text-[#888]">{place.kind}</p>
                <p className="font-semibold">{provider.name}</p></div>
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">{provider.name} / eSIM</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-.055em] sm:text-6xl">eSIM för {place.name}</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-[#6e6e6e]">Utforska din nästa destination och välj vad du behöver. Kontrollera sedan datapaket, giltighetstid och aktuella villkor hos {provider.name}.</p>
            <div className="mt-9"><EsimPlanFinder provider={provider}/></div>
          </div>
        </div>
        <div className="mt-20 grid gap-10 border-t border-[#e5e3dd] pt-14 lg:grid-cols-[.7fr_1.3fr]">
          <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-[#777]">INNAN DU BESTÄLLER</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Det här behöver du veta.</h2>
            <p className="mt-4 leading-8 text-[#777]">Kontrollera alltid det exakta paketets information innan betalning.</p></div>
          <div className="space-y-2">
            {[
              ["Vilken datapott ingår?","Datamängder och eventuella hastighetsbegränsningar varierar mellan paket."],
              ["Hur länge gäller paketet?","Kontrollera giltighetstiden och när den börjar räknas, exempelvis vid aktivering eller anslutning."],
              ["Vilka länder ingår?","Granska täckningslistan och eventuella nätverks- och roamingvillkor."],
              ["Är telefonen kompatibel?","Kontrollera att den exakta telefonmodellen stöder eSIM och uppfyller leverantörens krav."],
              ["Hur installerar jag mitt eSIM?","Läs installationsinstruktionerna hos leverantören och vår guide innan du börjar."],
            ].map(([question,answer])=><details key={question} className="group rounded-xl border border-[#e7e5e0] bg-white px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:hidden">{question}<span className="text-lg text-[#777] group-open:rotate-45">+</span></summary>
              <p className="mt-3 text-sm leading-7 text-[#777]">{answer}</p>
            </details>)}
          </div>
        </div>
        <div className="mt-12 flex flex-wrap gap-6 border-t border-[#e5e3dd] pt-7">
          <Link href={`/providers/${provider.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold hover:underline"><ArrowLeft className="size-4"/> Fler destinationer hos {provider.name}</Link>
          <Link href="/about" className="inline-flex items-center gap-2 text-sm font-semibold hover:underline">eSIM-installationsguide <ArrowUpRight className="size-4"/></Link>
        </div>
      </div>
    </main>
  )
}
