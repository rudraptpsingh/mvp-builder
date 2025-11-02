import { deepResearch } from './openaiClient.js'
import { logger } from '../utils/logger.js'

export interface ResearchInsights {
  industry: string
  marketSize: string
  competitors: string[]
  trends: string[]
  opportunities: string[]
  challenges: string[]
  targetAudience: string
  valueProposition: string
}

export async function conductMarketResearch(
  mvpContext: string,
  progressCallback?: (progress: number, message: string) => void
): Promise<ResearchInsights> {
  logger.info('Conducting comprehensive market research...')

  // Update: Starting research
  progressCallback?.(1, 'Initializing market research...')

  const researchPrompt = `Based on this MVP idea:

${mvpContext}

Conduct deep market research and provide insights on:
1. Industry classification and market size
2. Top 5 competitors and their approaches
3. Current market trends (2024-2025)
4. Key opportunities in this space
5. Major challenges to address
6. Target audience demographics and psychographics
7. Unique value proposition opportunities

Research as if you're analyzing reports from McKinsey, BCG, and leading tech analysts.
Consider real companies and products in this space.

Provide detailed, actionable insights based on current market realities.`

  // Update: Analyzing market
  progressCallback?.(3, 'Analyzing industry and competitors...')
  const research = await deepResearch(researchPrompt)

  // Parse research into structured format
  progressCallback?.(7, 'Structuring research insights...')
  const structurePrompt = `Convert this research into structured JSON:

${research}

Return JSON with this exact structure:
{
  "industry": "string",
  "marketSize": "string with specific numbers if possible",
  "competitors": ["array", "of", "competitor", "names"],
  "trends": ["array", "of", "current", "trends"],
  "opportunities": ["array", "of", "opportunities"],
  "challenges": ["array", "of", "challenges"],
  "targetAudience": "detailed description",
  "valueProposition": "compelling value prop"
}`

  const insights = await deepResearch(structurePrompt)

  try {
    return JSON.parse(insights)
  } catch {
    // Fallback structure if parsing fails
    return {
      industry: 'Technology/SaaS',
      marketSize: 'Research in progress',
      competitors: [],
      trends: [],
      opportunities: [],
      challenges: [],
      targetAudience: mvpContext.substring(0, 200),
      valueProposition: 'Value proposition in development',
    }
  }
}

export async function researchBestPractices(topic: string, context: string): Promise<string> {
  logger.info(`Researching best practices for: ${topic}`)

  const prompt = `Research and provide expert insights on best practices for: ${topic}

Context: ${context}

Analyze approaches from industry leaders like:
- For SaaS: Salesforce, HubSpot, Atlassian, Notion, Linear
- For Marketplaces: Airbnb, Uber, Amazon, Etsy
- For Consumer Apps: Instagram, TikTok, Spotify, Netflix
- For B2B: Slack, Zoom, Stripe, Twilio

Provide specific, actionable recommendations based on proven patterns from these companies.
Include concrete examples and data points where possible.`

  return await deepResearch(prompt)
}
