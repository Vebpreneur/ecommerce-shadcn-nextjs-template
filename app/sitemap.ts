import type { MetadataRoute } from "next"
import { PROVIDERS, DESTINATIONS } from "@/lib/esim"
import { ARTICLES } from "@/lib/esim-articles"

const base=(process.env.NEXT_PUBLIC_SITE_URL||"https://esimval.se").replace(/\/$/,"")
export default function sitemap():MetadataRoute.Sitemap {
 const staticRoutes=[
  {path:"",priority:1,frequency:"weekly"},
  {path:"/shop",priority:.9,frequency:"weekly"},
  {path:"/providers",priority:.9,frequency:"weekly"},
  {path:"/jamfor",priority:.9,frequency:"weekly"},
  {path:"/about",priority:.7,frequency:"monthly"},
  {path:"/faq",priority:.7,frequency:"monthly"},
  {path:"/contact",priority:.4,frequency:"monthly"},
  {path:"/artiklar",priority:.8,frequency:"weekly"},
 ]
 return [
  ...staticRoutes.map(r=>({url:`${base}${r.path}`,changeFrequency:r.frequency as MetadataRoute.Sitemap[number]["changeFrequency"],priority:r.priority})),
  ...PROVIDERS.map(p=>({url:`${base}/providers/${p.slug}`,changeFrequency:"weekly" as const,priority:.8})),
  ...PROVIDERS.flatMap(p=>DESTINATIONS.map(d=>({url:`${base}/providers/${p.slug}/${d.slug}`,changeFrequency:"monthly" as const,priority:.45}))),
  ...ARTICLES.map(a=>({url:`${base}/artiklar/${a.slug}`,changeFrequency:"monthly" as const,priority:.7})),
 ]
}
