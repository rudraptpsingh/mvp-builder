import { generateStructuredOutput, deepResearch } from '../openaiClient.js'
import { ResearchInsights } from '../researchAgent.js'
import { logger } from '../../utils/logger.js'

interface APISpecification {
  openapi: string
  endpoints: Array<{
    path: string
    method: string
    description: string
  }>
}

export async function generateAPISpecification(
  context: string,
  name: string,
  research: ResearchInsights
): Promise<APISpecification> {
  logger.info('Generating API specification...')

  const prompt = `Design a comprehensive RESTful API specification for "${name}".

MVP Context: ${context}

Industry: ${research.industry}

Create a professional API design that includes:

1. Core Resources
   - Users/Authentication
   - Main domain entities
   - Relationships between entities

2. Endpoints
   - CRUD operations for each resource
   - Search and filtering
   - Bulk operations
   - Webhooks (if applicable)

3. Design Principles
   - RESTful conventions
   - Versioning strategy
   - Authentication/Authorization
   - Rate limiting
   - Error handling

Base this on API best practices from:
- Stripe's developer-friendly API
- Twilio's comprehensive docs
- GitHub's REST API
- Shopify's API design

Generate a complete OpenAPI 3.0 specification and extract key endpoints.

Be specific and production-ready.`

  const apiText = await deepResearch(prompt)

  // Generate OpenAPI spec
  const openapiPrompt = `Create a complete OpenAPI 3.0 YAML specification for "${name}".

Based on this API design:
${apiText}

Include:
- Info section with title, version, description
- Servers
- All endpoints with full details
- Request/response schemas
- Authentication schemes
- Error responses

Make it production-ready and well-documented.`

  const openapi = await deepResearch(openapiPrompt)

  // Extract endpoints for summary
  const endpointsPrompt = `From this API specification, extract the main endpoints:

${apiText}

Return JSON array of the 10-15 most important endpoints with:
- path (e.g., /api/users/{id})
- method (GET, POST, PUT, DELETE)
- description (one sentence)

Focus on the core CRUD operations and key business logic endpoints.`

  const schema = `{
  "endpoints": [
    {
      "path": "string",
      "method": "string",
      "description": "string"
    }
  ]
}`

  const endpointsData = await generateStructuredOutput<{ endpoints: APISpecification['endpoints'] }>(
    endpointsPrompt,
    schema
  )

  return {
    openapi,
    endpoints: endpointsData.endpoints,
  }
}
