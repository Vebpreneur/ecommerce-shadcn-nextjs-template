import type { Metadata } from "next"
import EsimHome from "@/components/esim/home"

export const metadata: Metadata = {
  title: "eSIMval | Hitta rätt eSIM för resan",
  description: "Utforska eSIM-leverantörer och destinationer. Se aktuella alternativ och erbjudanden direkt hos leverantören.",
}

export default function Page() {
  return <EsimHome />
}
