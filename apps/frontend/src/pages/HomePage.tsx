import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Rocket, TrendingUp, FileText, Presentation, Code } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import axios from 'axios'

export function HomePage() {
  const [context, setContext] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleGenerate = async () => {
    if (!context.trim()) return

    setLoading(true)
    try {
      const response = await axios.post('/api/projects', { context })
      navigate(`/results/${response.data.projectId}`)
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Failed to create project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    { icon: Sparkles, title: 'AI-Powered Research', desc: 'Deep analysis using OpenAI and web research' },
    { icon: FileText, title: 'Professional Documents', desc: '1-pagers and comprehensive descriptions' },
    { icon: Presentation, title: 'Pitch Decks', desc: 'Investor-ready 5-slide presentations' },
    { icon: TrendingUp, title: 'Monetization Plans', desc: 'Data-driven revenue strategies' },
    { icon: Code, title: 'Technical Specs', desc: 'Complete architecture and API documentation' },
    { icon: Rocket, title: 'Product Roadmap', desc: 'Strategic timeline for MVP launch' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MVP Asset Generator
              </h1>
            </div>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              Dashboard
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Transform Your Idea Into a Professional MVP
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your MVP concept and get comprehensive, professional assets powered by deep AI research
          </p>
        </motion.div>

        {/* Main Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="max-w-4xl mx-auto glass-effect">
            <CardHeader>
              <CardTitle>Describe Your MVP Idea</CardTitle>
              <CardDescription>
                Provide as much context as possible about your product, target market, problem, and vision
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Example: I want to build a SaaS platform that helps small businesses manage their social media content using AI. The target market is small business owners who don't have time or budget for a full marketing team..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="min-h-[200px] text-base"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-muted-foreground">
                  {context.length} characters
                </p>
                <Button
                  onClick={handleGenerate}
                  disabled={loading || !context.trim()}
                  size="lg"
                  className="min-w-[200px]"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⚡</span>
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Generate Assets
                    </span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <h3 className="text-3xl font-bold text-center mb-8">What You'll Get</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-blue-600 mb-2" />
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-md mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>Powered by OpenAI Deep Research & Advanced AI Agents</p>
        </div>
      </footer>
    </div>
  )
}
