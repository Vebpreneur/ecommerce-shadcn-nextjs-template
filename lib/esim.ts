/**
 * eSIM storefront pilot content.
 * This is destination navigation, NOT a live product feed: no plans, prices,
 * availability, ratings or coverage are asserted without provider data.
 */
export type Provider = {
  slug: string
  name: string
  website: string
  /** Optional local high-resolution brand asset, e.g. /assets/providers/airalo.png */
  logo?: string
  affiliateUrl: string
  cover: string
  description: string
  tagline: string
}
export type Destination = {
  slug: string
  name: string
  kind: "Länder" | "Regioner" | "Globalt"
  image: string
}

const photo = (id: string, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const PROVIDERS: Provider[] = [
  { slug: "airalo", name: "Airalo", website: "airalo.com", affiliateUrl: "https://airalo.tpx.lu/JaG8IjYH", cover: photo("photo-1488085061387-422e29b40080"), description: "Utforska destinationer och eSIM-alternativ från Airalo.", tagline: "Upptäck världen med Airalo." },
  { slug: "yesim", name: "Yesim", website: "yesim.app", affiliateUrl: "https://yesim.tpx.lu/qpivuLfq", cover: photo("photo-1500530855697-b586d89ba3ee"), description: "Se destinationer och hitta vägen till Yesims eSIM-utbud.", tagline: "Res vidare med Yesim." },
  { slug: "drimsim", name: "Drimsim", website: "drimsim.com", affiliateUrl: "https://drimsim.tpx.lu/1QFyOUD1", cover: photo("photo-1469854523086-cc02fe5d8800"), description: "Upptäck Drimsim och deras alternativ för uppkoppling på resan.", tagline: "Upptäck Drimsim." },
  { slug: "saily", name: "Saily", website: "saily.com", affiliateUrl: "https://saily.tpx.lu/DhFQGrPS", cover: photo("photo-1533105079780-92b9be482077"), description: "Utforska Saily och deras eSIM för resenärer.", tagline: "Se världen med Saily." },
  { slug: "cosim", name: "Co:sim", website: "cosim.io", affiliateUrl: "https://impact.cosim.io/L0NDvo", cover: photo("photo-1499856871958-5b9627545d1a"), description: "Läs mer om Co:sim och deras reseuppkoppling.", tagline: "Uppkoppling med Co:sim." },
  { slug: "roamic", name: "Roamic", website: "roamic.com", affiliateUrl: "https://clk.roamic.com/5kNje3", cover: photo("photo-1500534623283-312aade485b7"), description: "Utforska Roamic som alternativ inför din nästa resa.", tagline: "Res med Roamic." },
  { slug: "bytesim", name: "ByteSIM", website: "bytesim.com", affiliateUrl: "https://bytesimlimited.pxf.io/L0NDvL", cover: photo("photo-1527631746610-bca00a040d60"), description: "Upptäck ByteSIM och deras eSIM-utbud.", tagline: "Utforska ByteSIM." },
  { slug: "voye-global", name: "Voye Global", website: "voyeglobal.com", affiliateUrl: "https://voyeglobalconnectivity.pxf.io/k4qRnn", cover: photo("photo-1501785888041-af3ef285b470"), description: "Hitta vidare till Voye Globals reseuppkoppling.", tagline: "Res längre med Voye Global." },
  { slug: "simzy", name: "Simzy", website: "simzy.com", affiliateUrl: "https://simzy.sjv.io/MKLqeJ", cover: photo("photo-1436491865332-7a61a109cc05"), description: "Utforska Simzys eSIM-utbud och se vilka resepaket som passar din destination.", tagline: "Uppkopplad på resan med Simzy." },
  { slug: "quibity", name: "Quibity", website: "quibity.com", affiliateUrl: "https://quib.to/d_FIRWQZQS", cover: photo("photo-1470770841072-f978cf4d019e"), description: "Upptäck Quibity och deras eSIM-alternativ.", tagline: "Världen med Quibity." },
]

export const DESTINATIONS: Destination[] = [
  { slug: "turkiet", name: "Turkiet", kind: "Länder", image: photo("photo-1541432901042-2d8bd64b4a9b", 1100) },
  { slug: "usa", name: "USA", kind: "Länder", image: photo("photo-1485738422979-f5c462d49f74", 1100) },
  { slug: "thailand", name: "Thailand", kind: "Länder", image: photo("photo-1528181304800-259b08848526", 1100) },
  { slug: "europa", name: "Europa", kind: "Regioner", image: photo("photo-1477959858617-67f85cf4f1df", 1100) },
  { slug: "asien", name: "Asien", kind: "Regioner", image: photo("photo-1513415277900-a62401e19be4", 1100) },
  { slug: "globalt", name: "Globalt", kind: "Globalt", image: photo("photo-1451187580459-43490279c0fa", 1100) },
]

export const getProvider = (slug: string) =>
  PROVIDERS.find(provider => provider.slug === slug)

export const getDestination = (slug: string) =>
  DESTINATIONS.find(destination => destination.slug === slug)
