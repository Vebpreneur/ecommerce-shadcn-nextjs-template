import type { Metadata } from "next"
import { notFound } from "next/navigation"
import EsimCollection from "@/components/esim/collection"
import { PROVIDERS, getProvider } from "@/lib/esim"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return PROVIDERS.map(provider => ({ slug: provider.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const provider = getProvider(slug)
  if (!provider) return { title: "Leverantören kunde inte hittas" }
  return {
    title: `${provider.name} – eSIM & destinationer | Nova Store`,
    description: provider.description,
  }
}

export default async function ProviderPage({ params }: Props) {
  const { slug } = await params
  const provider = getProvider(slug)
  if (!provider) notFound()

  return <EsimCollection provider={provider} />
}
