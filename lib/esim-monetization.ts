/**
 * Sponsored placements are intentionally empty until a verified campaign
 * creative, link, and sponsor label are configured.
 * Do not inject arbitrary third-party scripts or invent affiliate IDs.
 */
export type EditorialSponsor = {
  sponsor: string
  imageSrc: string // local: /assets/ads/name.webp
  imageAlt: string
  href: string // verified tracked HTTPS landing page
}
export type ArticlePlacement = {
  sidebar?: EditorialSponsor
  inline?: EditorialSponsor
}
export const ARTICLE_PLACEMENTS: Record<string, ArticlePlacement> = {}

export function articlePlacement(slug: string):ArticlePlacement {
  return ARTICLE_PLACEMENTS[slug] || {}
}

/**
 * Travelpayouts or another partner may be enabled later per country/article.
 * Populate only with the actual widget code and campaign IDs supplied by the
 * authenticated publisher dashboard. Do not auto-inject unrelated widgets.
 */
export type TravelPartnerWidget = {
  provider:"travelpayouts"
  topic:"hotel"|"flights"|"activities"|"insurance"
  campaignName:string
  slot:"article-sidebar"|"article-inline"
  approvedEmbedCode?:string
}
export const TRAVEL_WIDGETS: Record<string, TravelPartnerWidget[]> = {}
