import type { MetadataRoute } from "next"
const base=(process.env.NEXT_PUBLIC_SITE_URL||"https://esimval.se").replace(/\/$/,"")
export default function robots():MetadataRoute.Robots {
 return {rules:[{userAgent:"*",allow:"/",disallow:["/checkout","/login","/register"]}],sitemap:`${base}/sitemap.xml`}
}
