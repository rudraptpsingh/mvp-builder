import { deepResearch } from '../openaiClient.js'
import { ResearchInsights } from '../researchAgent.js'
import { logger } from '../../utils/logger.js'

export async function generateOnePager(
  context: string,
  name: string,
  tagline: string,
  research: ResearchInsights
): Promise<string> {
  logger.info('Generating one-pager...')

  const prompt = `Create a professional one-page executive summary for "${name}".

Tagline: ${tagline}
MVP Context: ${context}

Market Research:
- Industry: ${research.industry}
- Market Size: ${research.marketSize}
- Competitors: ${research.competitors.join(', ')}
- Trends: ${research.trends.join(', ')}
- Target Audience: ${research.targetAudience}

Structure the one-pager with these sections (use markdown):

# ${name}
## ${tagline}

### Problem
[3-4 sentences about the problem]

### Solution
[3-4 sentences about the solution]

### Market Opportunity
[Market size, trends, and growth potential]

### Product
[Key features and capabilities]

### Business Model
[How it makes money]

### Competitive Advantage
[What makes it unique]

### Traction/Roadmap
[Current status and next steps]

### Team/Vision
[Brief vision statement]

Make it concise, compelling, and investor-ready. Model it after successful Y Combinator applications.`

  return await deepResearch(prompt)
}
