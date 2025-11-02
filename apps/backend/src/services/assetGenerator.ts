import { ProjectStore } from './projectStore.js'
import { MVPAssets } from '../types/index.js'
import { conductMarketResearch } from './researchAgent.js'
import { generateMVPName, generateTagline, generateDescription } from './generators/basicInfoGenerator.js'
import { generateOnePager } from './generators/onePagerGenerator.js'
import { generatePresentation } from './generators/presentationGenerator.js'
import { generateRoadmap } from './generators/roadmapGenerator.js'
import { generateMonetization } from './generators/monetizationGenerator.js'
import { generateTechnicalArchitecture, generateProductArchitecture } from './generators/architectureGenerator.js'
import { generateAPISpecification } from './generators/apiSpecGenerator.js'
import { logger } from '../utils/logger.js'

export async function generateAllAssets(
  projectId: string,
  context: string,
  projectStore: ProjectStore
): Promise<void> {
  try {
    projectStore.updateProject(projectId, { status: 'processing' })

    // Step 1: Conduct market research (0-10%)
    logger.info(`[${projectId}] Starting market research`)
    const research = await conductMarketResearch(context, (progress, message) => {
      projectStore.updateProgress(projectId, progress, message)
    })
    projectStore.updateProgress(projectId, 10, 'Market research completed!')
    logger.info(`[${projectId}] Market research completed`)

    // Step 2: Generate MVP name (20%)
    projectStore.updateProgress(projectId, 20, 'Generating MVP name...')
    logger.info(`[${projectId}] Generating name`)
    const name = await generateMVPName(context, research)
    logger.info(`[${projectId}] Generated name: ${name}`)

    // Step 3: Generate tagline (25%)
    projectStore.updateProgress(projectId, 25, 'Creating compelling tagline...')
    const tagline = await generateTagline(context, name, research)
    logger.info(`[${projectId}] Generated tagline: ${tagline}`)

    // Step 4: Generate description (30%)
    projectStore.updateProgress(projectId, 30, 'Writing MVP description...')
    const description = await generateDescription(context, name, tagline, research)

    // Step 5: Generate one-pager (40%)
    projectStore.updateProgress(projectId, 40, 'Creating one-page executive summary...')
    const onePager = await generateOnePager(context, name, tagline, research)

    // Step 6: Generate presentation (50%)
    projectStore.updateProgress(projectId, 50, 'Designing 5-slide pitch deck...')
    const presentation = await generatePresentation(context, name, tagline, research)

    // Step 7: Generate roadmap (60%)
    projectStore.updateProgress(projectId, 60, 'Planning product roadmap...')
    const roadmap = await generateRoadmap(context, name, research)

    // Step 8: Generate monetization strategies (70%)
    projectStore.updateProgress(projectId, 70, 'Analyzing monetization strategies...')
    const monetization = await generateMonetization(context, name, research)

    // Step 9: Generate technical architecture (80%)
    projectStore.updateProgress(projectId, 80, 'Designing technical architecture...')
    const technicalArchitecture = await generateTechnicalArchitecture(context, name, research)

    // Step 10: Generate product architecture (85%)
    projectStore.updateProgress(projectId, 85, 'Defining product architecture...')
    const productArchitecture = await generateProductArchitecture(context, name, research)

    // Step 11: Generate API specification (95%)
    projectStore.updateProgress(projectId, 95, 'Creating API specifications...')
    const apiSpecification = await generateAPISpecification(context, name, research)

    // Step 12: Finalize (100%)
    projectStore.updateProgress(projectId, 100, 'Finalizing assets...')

    const assets: MVPAssets = {
      name,
      tagline,
      description,
      onePager,
      presentation,
      roadmap,
      monetization,
      technicalArchitecture,
      productArchitecture,
      apiSpecification,
    }

    projectStore.setAssets(projectId, assets)
    logger.info(`[${projectId}] All assets generated successfully`)
  } catch (error) {
    logger.error(`[${projectId}] Asset generation failed:`, error)
    projectStore.updateProject(projectId, {
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    })
    throw error
  }
}
