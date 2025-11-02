import { generateStructuredOutput } from '../openaiClient.js'
import { ResearchInsights } from '../researchAgent.js'
import { logger } from '../../utils/logger.js'

interface Monetization {
  strategies: Array<{
    name: string
    description: string
    potential: string
  }>
}

export async function generateMonetization(
  context: string,
  name: string,
  research: ResearchInsights
): Promise<Monetization> {
  logger.info('Generating monetization strategies...')

  const prompt = `Analyze and recommend monetization strategies for "${name}".

MVP Context: ${context}

Market Context:
- Industry: ${research.industry}
- Market Size: ${research.marketSize}
- Target Audience: ${research.targetAudience}
- Competitors: ${research.competitors.join(', ')}

Research and recommend 4-6 monetization strategies. Consider:

1. Primary Revenue Models:
   - Subscription (SaaS, tiers)
   - Transaction fees/Marketplace
   - Freemium
   - Usage-based pricing
   - Enterprise licensing
   - Advertising

2. Secondary Revenue Streams:
   - API access fees
   - Premium features/add-ons
   - White-label solutions
   - Data/analytics products
   - Professional services
   - Partnerships/affiliates

For each strategy, provide:
- Name (e.g., "Tiered Subscription Model")
- Detailed description with pricing examples
- Revenue potential (High/Medium/Low with rationale)

Base recommendations on successful models from:
- B2B SaaS: Slack, Zoom, Salesforce pricing
- Consumer: Spotify, Netflix, Notion tiers
- Marketplace: Airbnb, Stripe fee structures
- API: Twilio, SendGrid usage pricing

Be specific with numbers and examples.`

  const schema = `{
  "strategies": [
    {
      "name": "string",
      "description": "string (detailed with examples)",
      "potential": "string (High/Medium/Low with explanation)"
    }
  ]
}`

  return await generateStructuredOutput<Monetization>(prompt, schema)
}
