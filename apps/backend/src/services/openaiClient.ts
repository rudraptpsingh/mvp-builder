import OpenAI from 'openai'
import { logger } from '../utils/logger.js'

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY
  
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required')
  }
  
  return new OpenAI({ apiKey })
}

let openaiInstance: OpenAI | null = null

export const openai = new Proxy({} as OpenAI, {
  get(target, prop) {
    if (!openaiInstance) {
      openaiInstance = getOpenAIClient()
    }
    return (openaiInstance as any)[prop]
  }
})

export async function deepResearch(prompt: string, context?: string): Promise<string> {
  try {
    logger.info('Starting deep research...')

    const systemPrompt = `You are an expert business analyst, market researcher, and product strategist with deep knowledge of:
- Industry best practices and market trends
- Competitive analysis and positioning
- Product development and go-to-market strategies
- Technical architecture and system design
- Monetization models and revenue strategies

Conduct thorough research and provide detailed, professional insights based on current market standards and industry leader practices.`

    const fullPrompt = context
      ? `${context}\n\n${prompt}`
      : prompt

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: fullPrompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
    })

    return response.choices[0].message.content || ''
  } catch (error) {
    logger.error('Deep research failed:', error)
    throw new Error(`Deep research failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

export async function generateStructuredOutput<T>(
  prompt: string,
  schema: string,
  context?: string
): Promise<T> {
  try {
    const systemPrompt = `You are an expert AI assistant that generates structured, professional outputs.
Always respond with valid JSON that matches the requested schema.
Base your output on industry best practices and real-world examples from market leaders.`

    const fullPrompt = `${context ? context + '\n\n' : ''}${prompt}\n\nRespond with JSON matching this schema:\n${schema}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: fullPrompt },
      ],
      temperature: 0.3,
      max_tokens: 4000,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content || '{}'
    return JSON.parse(content) as T
  } catch (error) {
    logger.error('Structured generation failed:', error)
    throw new Error(`Structured generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}
