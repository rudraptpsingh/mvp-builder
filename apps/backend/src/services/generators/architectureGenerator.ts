import { generateStructuredOutput, deepResearch } from '../openaiClient.js'
import { ResearchInsights } from '../researchAgent.js'
import { logger } from '../../utils/logger.js'

interface TechnicalArchitecture {
  overview: string
  components: string[]
  techStack: Record<string, string>
}

interface ProductArchitecture {
  overview: string
  features: string[]
  userFlow: string
}

export async function generateTechnicalArchitecture(
  context: string,
  name: string,
  research: ResearchInsights
): Promise<TechnicalArchitecture> {
  logger.info('Generating technical architecture...')

  const prompt = `Design a modern, scalable technical architecture for "${name}".

MVP Context: ${context}

Industry: ${research.industry}
Scale Requirements: ${research.marketSize}

Create a professional technical architecture that includes:

1. System Overview
   - High-level architecture description
   - Design principles (microservices, serverless, monolith, etc.)
   - Scalability approach

2. Key Components
   - Frontend applications
   - Backend services
   - Data layer
   - Infrastructure
   - Third-party integrations

3. Technology Stack
   - Frontend: Framework, state management, styling
   - Backend: Runtime, framework, API design
   - Database: Primary DB, caching, search
   - Infrastructure: Cloud provider, hosting, CDN
   - DevOps: CI/CD, monitoring, logging
   - AI/ML: If applicable

Base recommendations on proven stacks from:
- Modern SaaS: Vercel, Supabase, PlanetScale
- Scalable systems: Netflix, Airbnb, Uber architectures
- Best practices: AWS Well-Architected, Google Cloud best practices

Be specific with technology choices and explain the rationale.`

  const architectureText = await deepResearch(prompt)

  // Structure the response
  const structurePrompt = `Convert this technical architecture into structured JSON:

${architectureText}

Return JSON with this structure:
{
  "overview": "string (2-3 paragraph overview)",
  "components": ["array", "of", "key", "system", "components"],
  "techStack": {
    "Frontend": "string",
    "Backend": "string",
    "Database": "string",
    "Infrastructure": "string",
    "DevOps": "string",
    "AI/ML": "string (if applicable)"
  }
}`

  const schema = `{
  "overview": "string",
  "components": ["array"],
  "techStack": {}
}`

  return await generateStructuredOutput<TechnicalArchitecture>(structurePrompt, schema)
}

export async function generateProductArchitecture(
  context: string,
  name: string,
  research: ResearchInsights
): Promise<ProductArchitecture> {
  logger.info('Generating product architecture...')

  const prompt = `Design a comprehensive product architecture for "${name}".

MVP Context: ${context}

Target Audience: ${research.targetAudience}
Value Proposition: ${research.valueProposition}

Create a product architecture that includes:

1. Product Overview
   - Core user experience
   - Key user personas
   - Primary user journeys

2. Feature Architecture (MVP + Future)
   - Core features (must-have for MVP)
   - Important features (phase 2)
   - Nice-to-have features (future)
   - Feature dependencies

3. User Flow
   - Onboarding flow
   - Core workflow
   - Key user actions
   - Success metrics per flow

Base this on product best practices from:
- Notion's feature hierarchy
- Linear's focused product design
- Figma's collaborative features
- Stripe's developer experience

Be specific about features and user flows.`

  const productText = await deepResearch(prompt)

  // Structure the response
  const structurePrompt = `Convert this product architecture into structured JSON:

${productText}

Return JSON with this structure:
{
  "overview": "string (2-3 paragraphs about product structure)",
  "features": ["array", "of", "specific", "features", "with", "descriptions"],
  "userFlow": "string (detailed description of primary user journey)"
}`

  const schema = `{
  "overview": "string",
  "features": ["array"],
  "userFlow": "string"
}`

  return await generateStructuredOutput<ProductArchitecture>(structurePrompt, schema)
}
