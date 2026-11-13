import "server-only"
import { getLiveDestination } from "./destinations"

/** All third-party requests run server-side, read-only and with a short timeout. */
export type LivePlan={
 id:string
 source:"esimadvice"|"esimdata"
 sourceLabel:string
 provider:string
 providerSlug:string
 name:string
 destination:string
 dataGb:number|null
 unlimited:boolean
 days:number|null
 price:number
 currency:string
 checkedAt:string|null
 buyUrl:string|null
 buyVia:"source"|"provider"|"none"
 hotspot:boolean|null
 fiveG:boolean|null
 note:string|null
}
export type SourceResult={source:LivePlan["source"];ok:boolean;plans:LivePlan[];error?:string}

const isRecord=(v:unknown):v is Record<string,unknown>=>!!v&&typeof v==="object"&&!Array.isArray(v)
const str=(v:unknown)=>typeof v==="string"?v.trim():""
const num=(v:unknown)=>typeof v==="number"&&Number.isFinite(v)?v:typeof v==="string"&&v.trim()!==""&&Number.isFinite(Number(v))?Number(v):null
const bool=(v:unknown):boolean|null=>typeof v==="boolean"?v:null
const field=(obj:Record<string,unknown>,names:string[])=>names.map(k=>obj[k]).find(v=>v!==undefined&&v!==null)
const safeUrl=(link:string,domain:string)=>{
 try {const u=new URL(link,domain);return u.protocol==="https:"&&u.hostname===new URL(domain).hostname?u.toString():null}
 catch{return null}
}
function listFromBody(body:unknown):unknown[]{
 if(Array.isArray(body))return body
 if(!isRecord(body))return []
 for(const key of ["items","plans","results","data"]){
  const value=body[key]
  if(Array.isArray(value))return value
  if(isRecord(value)){
   for(const child of ["items","plans","results"])if(Array.isArray(value[child]))return value[child] as unknown[]
  }
 }
 return []
}
function normalize(body:unknown,source:LivePlan["source"],iso:string):LivePlan[]{
 const label=source==="esimadvice"?"eSIM Advice":"esimdata.app"
 const sourceHost=source==="esimadvice"?"https://esimadvice.com":"https://esimdata.app"
 return listFromBody(body).flatMap((item,index)=>{
  if(!isRecord(item))return []
  const provider=str(field(item,["providerName","provider_name","provider","brand","seller"]))||
    (isRecord(item.provider)?str(item.provider.name):"")
  const title=str(field(item,["planName","plan_name","title","name"]))||`eSIM – ${provider||"leverantör"}`
  const price=num(field(item,["priceValue","price_usd","priceUsd","price","amount","final_price","price_after_discount"]))
  const priceObject=isRecord(item.price)?item.price:null
  const priceValue=price??(priceObject?num(field(priceObject,["usd","amount","value"])):null)
  const currency=str(field(item,["currency","currency_code"]))||"USD"
  const priceCurrency=priceObject?str(field(priceObject,["currency"])):""
  const currencyCode=(priceCurrency||currency).toUpperCase()
  // A bare number is not evidence of a valid offer.
  if(!provider||priceValue===null||priceValue<0||!/^[A-Z]{3}$/.test(currencyCode))return []
  const rawData=field(item,["dataGb","data_gb","gb","dataAmountGb"])
  let dataGb=num(rawData)
  if(dataGb===null&&isRecord(item.data))dataGb=num(field(item.data,["gb","amountGb","amount_gb"]))
  const unlimited=bool(field(item,["isUnlimited","unlimited","is_unlimited"]))===true
  if(dataGb===null&&!unlimited){
    const label=str(field(item,["dataLabel","data_label","data"]))
    const match=label.match(/(\d+(?:[.,]\d+)?)\s*(GB|MB)/i)
    if(match)dataGb=Number(match[1].replace(",","."))*(match[2].toUpperCase()==="MB"?.001:1)
  }
  let days=num(field(item,["validityDays","validity_days","days","duration_days"]))
  if(days===null){
   const validity=str(field(item,["validityLabel","validity_label","validity"]))
   const match=validity.match(/(\d+)\s*(?:day|dag)/i)
   if(match)days=Number(match[1])
  }
  const checkedAt=str(field(item,["checked_at","checkedAt","last_checked","verified_at","verifiedAt","updated_at"]))||null
  const rawLink=str(field(item,["buyHref","buy_url","buyUrl","purchase_url","checkout_url","url"]))
  const buyUrl=rawLink?safeUrl(rawLink,sourceHost):null
  const rawId=field(item,["id","plan_id","sku"])??index
  const providerSlug=str(field(item,["providerSlug","provider_slug"]))||provider.toLocaleLowerCase("en").replace(/[^a-z0-9]+/g,"-")
  return [{id:`${source}:${String(rawId)}`,source,sourceLabel:label,provider,providerSlug,name:title,
   destination:iso,dataGb,unlimited,days,price:priceValue,currency:currencyCode,checkedAt,buyUrl,
   buyVia:buyUrl?"source":"none" as const,
   hotspot:bool(field(item,["hotspotAllowed","hotspot_allowed","hotspot"])),
   fiveG:typeof item.networkType==="string"?/5g/i.test(item.networkType):bool(field(item,["fiveg","has_5g"])),
   note:null}]
 })
}

async function getJson(url:string):Promise<unknown>{
 const controller=new AbortController()
 const timer=setTimeout(()=>controller.abort(),6500)
 try{
  const response=await fetch(url,{headers:{Accept:"application/json"},next:{revalidate:900},signal:controller.signal})
  if(!response.ok)throw Error(`Källan svarade med HTTP ${response.status}`)
  const type=response.headers.get("content-type")||""
  if(!type.includes("json"))throw Error("Svar är inte JSON")
  return await response.json()
 } finally{clearTimeout(timer)}
}
export async function fetchLiveSource(source:LivePlan["source"],destination:string,limit:number):Promise<SourceResult>{
 const dest=getLiveDestination(destination)
 if(!dest)return {source,ok:false,plans:[],error:"Destinationen stöds ännu inte i eSIMvals datakoppling."}
 const max=Math.min(40,Math.max(1,Math.floor(limit)))
 const url=source==="esimadvice"
  ?`https://esimadvice.com/api/countries/${dest.slug}/plans?limit=${max}&currency=USD&sort=cheapest`
  :`https://esimdata.app/api/v1/plans?country=${dest.iso}&limit=${max}&sort=price`
 try{
  const response=await getJson(url)
  return {source,ok:true,plans:normalize(response,source,dest.iso).slice(0,max)}
 }catch(error){
  return {source,ok:false,plans:[],error:error instanceof Error?error.message:"Källan kunde inte hämtas"}
 }
}
