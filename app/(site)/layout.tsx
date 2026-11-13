import "@/components/esim/design.css"
import Header from "@/components/shadcn-space/blocks/hero-01/header"
import type { NavigationSection } from "@/components/shadcn-space/blocks/hero-01/header"
import Footer from "@/components/shadcn-space/blocks/footer-01/footer"
import { CartProvider } from "@/components/cart-context"
import { AnnouncementBar } from "@/components/announcement-bar"

const navigationData: NavigationSection[] = [
  {
    title: "Hem",
    href: "/",
    isActive: true,
  },
  {
    title: "Utbud",
    href: "/shop",
  },
  {
    title: "Leverantörer",
    href: "/providers",
  },
  {
    title: "Jämför",
    href: "/jamfor",
  },
  {
    title: "Guide",
    href: "/about",
  },
  {
    title: "Kontakt",
    href: "/contact",
  },
]

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <AnnouncementBar />
      <Header navigationData={navigationData} />
      <main>{children}</main>
      <Footer />
    </>
  )
}
