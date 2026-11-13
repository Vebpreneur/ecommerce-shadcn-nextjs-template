import { NextRequest, NextResponse } from "next/server"
import { getLiveDestination } from "@/lib/esim-live/destinations"
import { fetchLiveSource } from "@/lib/esim-live/sources"

export const runtime="nodejs"
export const dynamic="force-dynamic"

/**
 * Same public read-only data as the MCP servers, exposed as bounded JSON for
 * the Next.js UI. Browser never accesses third-party endpoints directly.
 */
export async function GET(request:NextRequest){
 const country=request.nextUrl.searchParams.get("country")||""
 const target=getLiveDestination(country)
 if(!target)return NextResponse.json({ok:false,error:"Välj ett land i listan.",items:[]},{status:400})
 const source=request.nextUrl.searchParams.get("source")||"all"
 if(!["all","esimadvice","esimdata"].includes(source))
  return NextResponse.json({ok:false,error:"Ogiltig källa.",items:[]},{status:400})
 const limit=Math.min(40,Math.max(1,Number(request.nextUrl.searchParams.get("limit"))||15))
 const sources=(source==="all"?["esimadvice","esimdata"]:[source]) as ("esimadvice"|"esimdata")[]
 const responses=await Promise.all(sources.map(s=>fetchLiveSource(s,target.iso,limit)))
 const items=responses.flatMap(result=>result.plans)
 // No dedupe across sources until authoritative provider SKU mapping exists.
 const byCurrency=items.reduce<Record<string,number>>((a,p)=>(a[p.currency]=(a[p.currency]||0)+1,a),{})
 const healthy=responses.some(s=>s.ok)
 return NextResponse.json({
  ok:healthy,country:target.iso,destination:target.name,
  items,sources:responses.map(({source,ok,error,plans})=>({source,ok,error,count:plans.length})),
  currencyBreakdown:byCurrency,
  attribution:["https://esimadvice.com/developers","https://esimdata.app/agents/"],
  warning:"Priser ändras. Kontrollera alltid slutpris, villkor och täckning hos leverantören. Köplänkar från datakällorna är inte nödvändigtvis eSIMvals affiliatelänkar."
 },{status:healthy?200:503,headers:{"Cache-Control":"public, s-maxage=900, stale-while-revalidate=900"}})
}
