import { generateStructuredOutput } from '../openaiClient.js'
import { ResearchInsights } from '../researchAgent.js'
import { logger } from '../../utils/logger.js'

interface Roadmap {
  phases: Array<{
    name: string
    duration: string
    milestones: string[]
  }>
}

export async function generateRoadmap(
  context: string,
  name: string,
  research: ResearchInsights
): Promise<Roadmap> {
  logger.info('Generating product roadmap...')

  const prompt = `Create a strategic product roadmap for "${name}".

MVP Context: ${context}

Market Insights:
- Industry: ${research.industry}
- Opportunities: ${research.opportunities.join(', ')}
- Challenges: ${research.challenges.join(', ')}

Create a 12-18 month roadmap with 4-5 phases:

Phase 1: MVP/Foundation (0-3 months)
- Core features to validate concept
- Early user acquisition
- Basic infrastructure

Phase 2: Market Fit (3-6 months)
- Feature iteration based on feedback
- User growth strategies
- Product-market fit validation

Phase 3: Scale (6-12 months)
- Advanced features
- Market expansion
- Team building

Phase 4: Growth (12-18 months)
- Platform capabilities
- Strategic partnerships
- Revenue optimization

Each phase should have:
- Clear name and duration
- 5-7 specific, measurable milestones
- Mix of product, business, and technical goals

Base this on successful product roadmaps from companies like:
- Notion's early growth
- Figma's journey to product-market fit
- Linear's launch strategy
- Stripe's expansion phases`

  const schema = `{
  "phases": [
    {
      "name": "string",
      "duration": "string (e.g., '0-3 months')",
      "milestones": ["array", "of", "specific", "milestones"]
    }
  ]
}`

  return await generateStructuredOutput<Roadmap>(prompt, schema)
}
