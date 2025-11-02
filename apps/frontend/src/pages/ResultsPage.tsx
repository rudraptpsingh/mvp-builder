import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Download,
  FileText,
  Presentation,
  TrendingUp,
  Code,
  Layers,
  DollarSign,
  MapPin,
  Tag,
  FileCode,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'

interface MVPAssets {
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

interface Project {
  id: string
  context: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  assets?: MVPAssets
  progress?: number
  currentTask?: string
}

export function ResultsPage() {
  const { projectId } = useParams()
  const navigate = useNavigate()

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const response = await axios.get(`/api/projects/${projectId}`)
      return response.data as Project
    },
    refetchInterval: (data) => {
      return data?.status === 'processing' ? 2000 : false
    },
  })

  const handleExport = async (format: 'pdf' | 'pptx' | 'json') => {
    try {
      const response = await axios.get(`/api/projects/${projectId}/export/${format}`, {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', `mvp-assets-${projectId}.${format}`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      console.error('Export failed:', error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="text-center py-8">
            <p className="text-gray-600 mb-4">Project not found</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            {project.status === 'completed' && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleExport('pdf')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
                <Button variant="outline" onClick={() => handleExport('pptx')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export PPTX
                </Button>
                <Button variant="outline" onClick={() => handleExport('json')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Processing Status */}
        {project.status === 'processing' && (
          <Card className="mb-8 glass-effect">
            <CardContent className="py-6">
              <div className="flex items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium">{project.currentTask || 'Processing your MVP...'}</p>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-500"
                      style={{ width: `${project.progress || 0}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{project.progress || 0}% complete</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {project.status === 'error' && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="py-6">
              <p className="text-red-800">
                An error occurred while generating your MVP assets. Please try again.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Results */}
        {project.status === 'completed' && project.assets && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* MVP Overview */}
            <Card className="mb-8 glass-effect">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Tag className="h-8 w-8 text-blue-600" />
                  <div>
                    <CardTitle className="text-3xl">{project.assets.name}</CardTitle>
                    <CardDescription className="text-lg mt-1">
                      {project.assets.tagline}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ReactMarkdown className="prose max-w-none">
                  {project.assets.description}
                </ReactMarkdown>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* 1-Pager */}
              <Card>
                <CardHeader>
                  <FileText className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>One-Pager</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReactMarkdown className="prose prose-sm max-w-none">
                    {project.assets.onePager}
                  </ReactMarkdown>
                </CardContent>
              </Card>

              {/* Presentation */}
              <Card>
                <CardHeader>
                  <Presentation className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Pitch Deck (5 Slides)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.assets.presentation.slides.map((slide, index) => (
                      <div key={index} className="border-l-4 border-blue-600 pl-4">
                        <h4 className="font-semibold mb-2">
                          Slide {index + 1}: {slide.title}
                        </h4>
                        <p className="text-sm text-gray-600">{slide.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Product Roadmap */}
              <Card>
                <CardHeader>
                  <MapPin className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Product Roadmap</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.assets.roadmap.phases.map((phase, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-blue-600">
                          {phase.name} ({phase.duration})
                        </h4>
                        <ul className="mt-2 space-y-1">
                          {phase.milestones.map((milestone, i) => (
                            <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                              <span className="text-blue-600 mt-1">•</span>
                              {milestone}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Monetization */}
              <Card>
                <CardHeader>
                  <DollarSign className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Monetization Strategies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.assets.monetization.strategies.map((strategy, index) => (
                      <div key={index}>
                        <h4 className="font-semibold">{strategy.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{strategy.description}</p>
                        <p className="text-xs text-blue-600 mt-1 font-medium">
                          Potential: {strategy.potential}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Technical Architecture */}
              <Card>
                <CardHeader>
                  <Code className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Technical Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReactMarkdown className="prose prose-sm max-w-none mb-4">
                    {project.assets.technicalArchitecture.overview}
                  </ReactMarkdown>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Tech Stack</h4>
                    <div className="space-y-1">
                      {Object.entries(project.assets.technicalArchitecture.techStack).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between text-sm">
                            <span className="text-gray-600">{key}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Architecture */}
              <Card>
                <CardHeader>
                  <Layers className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>Product Architecture</CardTitle>
                </CardHeader>
                <CardContent>
                  <ReactMarkdown className="prose prose-sm max-w-none mb-4">
                    {project.assets.productArchitecture.overview}
                  </ReactMarkdown>
                  <div className="mt-4">
                    <h4 className="font-semibold mb-2">Key Features</h4>
                    <ul className="space-y-1">
                      {project.assets.productArchitecture.features.map((feature, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-blue-600 mt-1">✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* API Specification */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <FileCode className="h-6 w-6 text-blue-600 mb-2" />
                  <CardTitle>API Specification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {project.assets.apiSpecification.endpoints.map((endpoint, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <span
                          className={`px-2 py-1 rounded text-xs font-mono font-semibold ${
                            endpoint.method === 'GET'
                              ? 'bg-green-100 text-green-800'
                              : endpoint.method === 'POST'
                              ? 'bg-blue-100 text-blue-800'
                              : endpoint.method === 'PUT'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {endpoint.method}
                        </span>
                        <div className="flex-1">
                          <code className="text-sm font-mono">{endpoint.path}</code>
                          <p className="text-xs text-gray-600 mt-1">{endpoint.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <details className="mt-4">
                    <summary className="cursor-pointer font-semibold text-sm text-blue-600">
                      View Full OpenAPI Spec
                    </summary>
                    <pre className="mt-2 p-4 bg-gray-900 text-gray-100 rounded-lg overflow-x-auto text-xs">
                      {project.assets.apiSpecification.openapi}
                    </pre>
                  </details>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
