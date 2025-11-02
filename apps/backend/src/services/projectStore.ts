import { Project, MVPAssets } from '../types/index.js'

export class ProjectStore {
  private projects: Map<string, Project> = new Map()

  createProject(id: string, context: string): Project {
    const project: Project = {
      id,
      context,
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    this.projects.set(id, project)
    return project
  }

  getProject(id: string): Project | undefined {
    return this.projects.get(id)
  }

  getAllProjects(): Project[] {
    return Array.from(this.projects.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
  }

  updateProject(
    id: string,
    updates: Partial<Omit<Project, 'id' | 'createdAt'>>
  ): Project | undefined {
    const project = this.projects.get(id)
    if (!project) return undefined

    const updatedProject = {
      ...project,
      ...updates,
      updatedAt: new Date().toISOString(),
    }
    this.projects.set(id, updatedProject)
    return updatedProject
  }

  updateProgress(id: string, progress: number, currentTask?: string): void {
    this.updateProject(id, { progress, currentTask })
  }

  setAssets(id: string, assets: MVPAssets): void {
    this.updateProject(id, { assets, status: 'completed', progress: 100 })
  }
}
