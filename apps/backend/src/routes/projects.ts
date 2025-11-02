import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import { ProjectStore } from '../services/projectStore.js'
import { generateAllAssets } from '../services/assetGenerator.js'
import { exportToPDF, exportToPPTX, exportToJSON } from '../services/exportService.js'
import { logger } from '../utils/logger.js'

const router = express.Router()
const projectStore = new ProjectStore()

// Create new project
router.post('/', async (req, res) => {
  try {
    const { context } = req.body

    if (!context || typeof context !== 'string' || context.trim().length < 50) {
      return res.status(400).json({
        error: 'Invalid context',
        message: 'Please provide a detailed context (minimum 50 characters)',
      })
    }

    const projectId = uuidv4()
    const project = projectStore.createProject(projectId, context)

    // Start asset generation in background
    generateAllAssets(projectId, context, projectStore).catch((error) => {
      logger.error(`Failed to generate assets for project ${projectId}:`, error)
      projectStore.updateProject(projectId, {
        status: 'error',
        error: error.message,
      })
    })

    res.json({ projectId, status: project.status })
  } catch (error) {
    logger.error('Error creating project:', error)
    res.status(500).json({ error: 'Failed to create project' })
  }
})

// Get all projects
router.get('/', (req, res) => {
  try {
    const projects = projectStore.getAllProjects()
    res.json(projects)
  } catch (error) {
    logger.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

// Get single project
router.get('/:projectId', (req, res) => {
  try {
    const { projectId } = req.params
    const project = projectStore.getProject(projectId)

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    res.json(project)
  } catch (error) {
    logger.error('Error fetching project:', error)
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

// Export project
router.get('/:projectId/export/:format', async (req, res) => {
  try {
    const { projectId, format } = req.params
    const project = projectStore.getProject(projectId)

    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    if (project.status !== 'completed' || !project.assets) {
      return res.status(400).json({ error: 'Project not completed yet' })
    }

    switch (format) {
      case 'pdf':
        const pdfBuffer = await exportToPDF(project)
        res.contentType('application/pdf')
        res.send(pdfBuffer)
        break
      case 'pptx':
        const pptxBuffer = await exportToPPTX(project)
        res.contentType('application/vnd.openxmlformats-officedocument.presentationml.presentation')
        res.send(pptxBuffer)
        break
      case 'json':
        const jsonData = exportToJSON(project)
        res.contentType('application/json')
        res.send(JSON.stringify(jsonData, null, 2))
        break
      default:
        res.status(400).json({ error: 'Invalid export format' })
    }
  } catch (error) {
    logger.error('Error exporting project:', error)
    res.status(500).json({ error: 'Failed to export project' })
  }
})

export { router as projectRoutes }
