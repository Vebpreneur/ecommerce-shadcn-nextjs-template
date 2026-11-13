import type { Metadata } from "next"
import ShopHub from "@/components/esim/shop-hub"

export const metadata: Metadata = {
  title: "Utforska eSIM och destinationer | eSIMval",
  description: "Hitta eSIM-destinationer, leverantörer och gå vidare till jämförelseverktyget för resans uppkoppling.",
}

export default function ShopPage(){ return <ShopHub/> }
