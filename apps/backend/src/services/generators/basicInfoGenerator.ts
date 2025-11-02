import { generateStructuredOutput, deepResearch } from '../openaiClient.js'
import { ResearchInsights } from '../researchAgent.js'
import { logger } from '../../utils/logger.js'

export async function generateMVPName(
  context: string,
  research: ResearchInsights
): Promise<string> {
  logger.info('Generating MVP name...')

  const prompt = `Based on this MVP concept and market research, generate a compelling, memorable product name.

MVP Context: ${context}

Industry: ${research.industry}
Target Audience: ${research.targetAudience}
Value Proposition: ${research.valueProposition}

Guidelines:
- Easy to pronounce and remember
- Reflects the core value or benefit
- Modern and professional
- Available as a domain (assume .com, .io, or .ai)
- Similar quality to names like: Stripe, Notion, Linear, Figma, Vercel, Supabase

Generate 3 options and pick the best one. Explain your reasoning briefly.`

  const result = await deepResearch(prompt)

  // Extract the chosen name (assuming it's mentioned clearly)
  const nameMatch = result.match(/(?:chosen|best|selected|recommend).*?name.*?[:is]\s*([A-Z][a-zA-Z]+)/i)
  return nameMatch ? nameMatch[1] : 'InnovateMVP'
}

export async function generateTagline(
  context: string,
  name: string,
  research: ResearchInsights
): Promise<string> {
  logger.info('Generating tagline...')

  const prompt = `Create a compelling tagline for "${name}".

MVP Context: ${context}

Value Proposition: ${research.valueProposition}
Target Audience: ${research.targetAudience}

Guidelines:
- 5-8 words maximum
- Clear benefit or transformation
- Memorable and quotable
- Professional tone
- Examples of great taglines:
  * Stripe: "Payments infrastructure for the internet"
  * Notion: "One workspace. Every team."
  * Linear: "Built for modern product teams"
  * Vercel: "Develop. Preview. Ship."

Generate 3 options and pick the best one.`

  const result = await deepResearch(prompt)

  // Extract the chosen tagline (usually in quotes)
  const taglineMatch = result.match(/"([^"]{10,60})"/)
  return taglineMatch ? taglineMatch[1] : 'Transform your workflow with AI'
}

export async function generateDescription(
  context: string,
  name: string,
  tagline: string,
  research: ResearchInsights
): Promise<string> {
  logger.info('Generating MVP description...')

  const prompt = `Write a comprehensive, professional MVP description for "${name}" - ${tagline}

MVP Context: ${context}

Market Research:
- Industry: ${research.industry}
- Market Size: ${research.marketSize}
- Target Audience: ${research.targetAudience}
- Value Proposition: ${research.valueProposition}
- Key Opportunities: ${research.opportunities.join(', ')}

Write a 300-400 word description that covers:
1. The problem being solved
2. The solution approach
3. Key benefits and features
4. Target market and use cases
5. Competitive advantages
6. Vision for impact

Write in a professional, compelling style similar to successful startup pitch decks.
Use markdown formatting for structure.`

  return await deepResearch(prompt)
}
