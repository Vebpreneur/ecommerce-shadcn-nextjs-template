import type { Metadata } from "next"
import EsimCompare from "@/components/esim/compare"

export const metadata: Metadata = {
 title: "Jämför eSIM och leverantörer | eSIMval",
 description: "Jämför eSIM-leverantörer sida vid sida. Se verifierade datapaket, giltighet, priser och villkor när informationen finns tillgänglig.",
 alternates: {canonical:"/jamfor"},
}

export default function ComparePage(){return <EsimCompare/>}
