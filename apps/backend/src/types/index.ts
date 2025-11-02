export interface Project {
  id: string
  context: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  assets?: MVPAssets
  progress?: number
  currentTask?: string
  createdAt: string
  updatedAt: string
  error?: string
}

export interface MVPAssets {
  name: string
  tagline: string
  description: string
  onePager: string
  presentation: {
    slides: Array<{
      title: string
      content: string
      notes?: string
    }>
  }
  roadmap: {
    phases: Array<{
      name: string
      duration: string
      milestones: string[]
    }>
  }
  monetization: {
    strategies: Array<{
      name: string
      description: string
      potential: string
    }>
  }
  technicalArchitecture: {
    overview: string
    components: string[]
    techStack: Record<string, string>
  }
  productArchitecture: {
    overview: string
    features: string[]
    userFlow: string
  }
  apiSpecification: {
    openapi: string
    endpoints: Array<{
      path: string
      method: string
      description: string
    }>
  }
}

export interface ResearchContext {
  mvpIdea: string
  industryData: string[]
  competitorData: string[]
  marketTrends: string[]
}
