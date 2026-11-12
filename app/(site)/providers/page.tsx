import type { Metadata } from "next"
import EsimCollection from "@/components/esim/collection"

export const metadata: Metadata = {
  title: "Alla eSIM-leverantörer | Nova Store",
  description: "Utforska eSIM-leverantörer och upptäck deras destinationer på en och samma plats.",
}

export default function ProvidersPage() {
  return <EsimCollection />
}
