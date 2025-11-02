import { generateStructuredOutput } from '../openaiClient.js'
import { ResearchInsights } from '../researchAgent.js'
import { logger } from '../../utils/logger.js'

interface Presentation {
  slides: Array<{
    title: string
    content: string
    notes?: string
  }>
}

export async function generatePresentation(
  context: string,
  name: string,
  tagline: string,
  research: ResearchInsights
): Promise<Presentation> {
  logger.info('Generating presentation...')

  const prompt = `Create a 5-slide investor pitch deck for "${name}" - ${tagline}

MVP Context: ${context}

Market Research:
- Industry: ${research.industry}
- Market Size: ${research.marketSize}
- Competitors: ${research.competitors.join(', ')}
- Trends: ${research.trends.join(', ')}
- Opportunities: ${research.opportunities.join(', ')}
- Target Audience: ${research.targetAudience}

Create exactly 5 slides following this structure:

Slide 1 - Problem/Opportunity
- Hook with the pain point
- Market statistics
- Why now?

Slide 2 - Solution
- How ${name} solves it
- Key differentiators
- Demo/example use case

Slide 3 - Market & Business Model
- TAM/SAM/SOM
- Revenue model
- Go-to-market strategy

Slide 4 - Product & Technology
- Key features
- Technical approach
- Product roadmap highlights

Slide 5 - Traction & Ask
- Current metrics/progress
- Milestones achieved
- Future plans and funding needs

Each slide should have:
- A punchy title (5-8 words)
- Concise bullet points (3-5 points)
- Speaker notes with additional context

Model this after successful pitch decks from Airbnb, Uber, LinkedIn, etc.`

  const schema = `{
  "slides": [
    {
      "title": "string",
      "content": "string (bullet points separated by newlines)",
      "notes": "string (speaker notes)"
    }
  ]
}`

  return await generateStructuredOutput<Presentation>(prompt, schema)
}
