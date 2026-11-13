/**
 * Curated destination mapping for live sources. Additional country codes can be
 * added without changing the API/UI; only these reviewed mappings are exposed.
 */
export type LiveDestination={iso:string;slug:string;name:string;region?:string}
export const LIVE_DESTINATIONS:LiveDestination[]=[
 {iso:"TR",slug:"turkey",name:"Turkiet",region:"Europa & Asien"},
 {iso:"US",slug:"united-states",name:"USA",region:"Nordamerika"},
 {iso:"TH",slug:"thailand",name:"Thailand",region:"Asien"},
 {iso:"JP",slug:"japan",name:"Japan",region:"Asien"},
 {iso:"GB",slug:"united-kingdom",name:"Storbritannien",region:"Europa"},
 {iso:"FR",slug:"france",name:"Frankrike",region:"Europa"},
 {iso:"ES",slug:"spain",name:"Spanien",region:"Europa"},
 {iso:"IT",slug:"italy",name:"Italien",region:"Europa"},
 {iso:"DE",slug:"germany",name:"Tyskland",region:"Europa"},
 {iso:"GR",slug:"greece",name:"Grekland",region:"Europa"},
 {iso:"AE",slug:"united-arab-emirates",name:"Förenade Arabemiraten",region:"Mellanöstern"},
 {iso:"ID",slug:"indonesia",name:"Indonesien",region:"Asien"},
 {iso:"VN",slug:"vietnam",name:"Vietnam",region:"Asien"},
 {iso:"CN",slug:"china",name:"Kina",region:"Asien"},
 {iso:"IN",slug:"india",name:"Indien",region:"Asien"},
 {iso:"CA",slug:"canada",name:"Kanada",region:"Nordamerika"},
 {iso:"MX",slug:"mexico",name:"Mexiko",region:"Nordamerika"},
 {iso:"BR",slug:"brazil",name:"Brasilien",region:"Sydamerika"},
 {iso:"AU",slug:"australia",name:"Australien",region:"Oceanien"},
 {iso:"NZ",slug:"new-zealand",name:"Nya Zeeland",region:"Oceanien"},
 {iso:"EG",slug:"egypt",name:"Egypten",region:"Afrika"},
 {iso:"MA",slug:"morocco",name:"Marocko",region:"Afrika"},
 {iso:"ZA",slug:"south-africa",name:"Sydafrika",region:"Afrika"},
 {iso:"CH",slug:"switzerland",name:"Schweiz",region:"Europa"},
 {iso:"NO",slug:"norway",name:"Norge",region:"Europa"},
 {iso:"DK",slug:"denmark",name:"Danmark",region:"Europa"},
 {iso:"SE",slug:"sweden",name:"Sverige",region:"Europa"},
 {iso:"PT",slug:"portugal",name:"Portugal",region:"Europa"},
 {iso:"NL",slug:"netherlands",name:"Nederländerna",region:"Europa"},
 {iso:"PL",slug:"poland",name:"Polen",region:"Europa"},
 {iso:"KR",slug:"south-korea",name:"Sydkorea",region:"Asien"},
 {iso:"SG",slug:"singapore",name:"Singapore",region:"Asien"},
 {iso:"MY",slug:"malaysia",name:"Malaysia",region:"Asien"},
 {iso:"PH",slug:"philippines",name:"Filippinerna",region:"Asien"},
 {iso:"SA",slug:"saudi-arabia",name:"Saudiarabien",region:"Mellanöstern"},
 {iso:"IL",slug:"israel",name:"Israel",region:"Mellanöstern"}
]
const aliases:Record<string,string>={turkiet:"TR",usa:"US",thailand:"TH",japan:"JP",europa:"",asien:"",globalt:""}
export function getLiveDestination(value:string){
 const input=value.trim().toLocaleLowerCase("en")
 const iso=aliases[input]??input.toUpperCase()
 return LIVE_DESTINATIONS.find(x=>x.iso===iso||x.slug===input||x.name.toLocaleLowerCase("sv")===input)
}
