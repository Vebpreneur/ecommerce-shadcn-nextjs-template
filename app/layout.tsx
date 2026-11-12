import { Geist_Mono, Inter } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { CartProvider } from "@/components/cart-context"
import { WishlistProvider } from "@/components/wishlist-context"

export const metadata: Metadata = {
  title: "eSIMval | Jämför eSIM-leverantörer",
  description:
    "Elevate your everyday look with eSIMval. Shop our curated collection of premium quality products with free shipping and secure payments.",
  keywords: "esim, esimval, reseuppkoppling, leverantörer, destinationer",
  openGraph: {
    title: "eSIMval | Premium Everyday Style",
    description:
      "Utforska eSIM-leverantörer och destinationer på eSIMval.",
    type: "website",
    locale: "sv_SE",
  },
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="sv"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>{children}</WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
