/**
 * Future package feed model. Only plans verified against a provider's current
 * official offer should be inserted here. Empty by design for this prototype.
 */
export type EsimPlan = {
  id: string
  providerSlug: string
  destinationSlug: string
  name: string
  data: { amountGb: number } | { unlimited: true }
  validityDays: number
  currency: string
  price: number
  coverageCountries: string[]
  networkNotes?: string
  activationConditions?: string
  speedLimitNotes?: string
  callsAndSms?: boolean
  purchaseUrl: string
  verifiedAt: string
}

export const VERIFIED_ESIM_PLANS: EsimPlan[] = []

export function getVerifiedPlans(providerSlug: string, destinationSlug: string) {
  return VERIFIED_ESIM_PLANS.filter(plan =>
    plan.providerSlug === providerSlug && plan.destinationSlug === destinationSlug
  )
}
