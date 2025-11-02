import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, FileText, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import axios from 'axios'

interface Project {
  id: string
  context: string
  status: 'pending' | 'processing' | 'completed' | 'error'
  createdAt: string
}

export function DashboardPage() {
  const navigate = useNavigate()

  const { data: projects, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get('/api/projects')
      return response.data as Project[]
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Your MVP Projects</h1>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin text-4xl">⚡</div>
            <p className="mt-4 text-gray-600">Loading projects...</p>
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/results/${project.id}`)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === 'completed'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : project.status === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <CardTitle className="text-lg mt-4">
                    {project.context.slice(0, 60)}...
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3" />
                    {new Date(project.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="max-w-md mx-auto text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No projects yet</p>
              <Button onClick={() => navigate('/')}>Create Your First MVP</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
