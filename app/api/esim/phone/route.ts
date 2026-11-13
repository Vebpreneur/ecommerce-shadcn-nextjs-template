import { NextRequest, NextResponse } from "next/server"

export const runtime="nodejs"

export async function GET(request:NextRequest){
 const model=(request.nextUrl.searchParams.get("model")||"").trim()
 if(model.length<3||model.length>80)return NextResponse.json({ok:false,error:"Skriv en telefonmodell (3–80 tecken)."}, {status:400})
 const controller=new AbortController()
 const timer=setTimeout(()=>controller.abort(),6000)
 try{
  const response=await fetch(`https://esimdata.app/api/v1/phones?model=${encodeURIComponent(model)}`,{
   headers:{Accept:"application/json"},next:{revalidate:86400},signal:controller.signal
  })
  if(!response.ok)throw Error("Kompatibilitetstjänsten kunde inte nås")
  const body:unknown=await response.json()
  return NextResponse.json({ok:true,source:"esimdata.app",result:body},{headers:{"Cache-Control":"public, s-maxage=86400"}})
 }catch{
  return NextResponse.json({ok:false,error:"Kunde inte kontrollera modellen just nu."},{status:503})
 }finally{clearTimeout(timer)}
}
