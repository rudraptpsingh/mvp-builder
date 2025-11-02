import PDFDocument from 'pdfkit'
import PptxGenJS from 'pptxgenjs'
import { Project } from '../types/index.js'
import { logger } from '../utils/logger.js'

export async function exportToPDF(project: Project): Promise<Buffer> {
  logger.info(`Exporting project ${project.id} to PDF`)

  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50, size: 'LETTER' })
      const chunks: Buffer[] = []

      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      const assets = project.assets!

      // Title Page
      doc.fontSize(28).font('Helvetica-Bold').text(assets.name, { align: 'center' })
      doc.moveDown(0.5)
      doc.fontSize(16).font('Helvetica').text(assets.tagline, { align: 'center' })
      doc.moveDown(2)

      // Description
      doc.fontSize(14).font('Helvetica-Bold').text('Overview', { underline: true })
      doc.moveDown(0.5)
      doc.fontSize(11).font('Helvetica').text(assets.description)
      doc.moveDown(1.5)

      // One-Pager
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text('Executive Summary', { underline: true })
      doc.moveDown(0.5)
      doc.fontSize(10).font('Helvetica').text(assets.onePager)

      // Presentation
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text('Pitch Deck', { underline: true })
      doc.moveDown(0.5)
      assets.presentation.slides.forEach((slide, index) => {
        doc.fontSize(14).font('Helvetica-Bold').text(`Slide ${index + 1}: ${slide.title}`)
        doc.moveDown(0.3)
        doc.fontSize(10).font('Helvetica').text(slide.content)
        doc.moveDown(1)
      })

      // Product Roadmap
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text('Product Roadmap', { underline: true })
      doc.moveDown(0.5)
      assets.roadmap.phases.forEach((phase) => {
        doc.fontSize(12).font('Helvetica-Bold').text(`${phase.name} (${phase.duration})`)
        doc.moveDown(0.3)
        phase.milestones.forEach((milestone) => {
          doc.fontSize(10).font('Helvetica').text(`• ${milestone}`, { indent: 20 })
        })
        doc.moveDown(0.8)
      })

      // Monetization
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text('Monetization Strategies', { underline: true })
      doc.moveDown(0.5)
      assets.monetization.strategies.forEach((strategy) => {
        doc.fontSize(12).font('Helvetica-Bold').text(strategy.name)
        doc.moveDown(0.2)
        doc.fontSize(10).font('Helvetica').text(strategy.description)
        doc.fontSize(9).font('Helvetica-Oblique').text(`Potential: ${strategy.potential}`)
        doc.moveDown(0.8)
      })

      // Technical Architecture
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text('Technical Architecture', { underline: true })
      doc.moveDown(0.5)
      doc.fontSize(10).font('Helvetica').text(assets.technicalArchitecture.overview)
      doc.moveDown(0.8)
      doc.fontSize(12).font('Helvetica-Bold').text('Tech Stack')
      doc.moveDown(0.3)
      Object.entries(assets.technicalArchitecture.techStack).forEach(([key, value]) => {
        doc.fontSize(10).font('Helvetica').text(`${key}: ${value}`, { indent: 20 })
      })

      // Product Architecture
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text('Product Architecture', { underline: true })
      doc.moveDown(0.5)
      doc.fontSize(10).font('Helvetica').text(assets.productArchitecture.overview)
      doc.moveDown(0.8)
      doc.fontSize(12).font('Helvetica-Bold').text('Key Features')
      doc.moveDown(0.3)
      assets.productArchitecture.features.forEach((feature) => {
        doc.fontSize(10).font('Helvetica').text(`• ${feature}`, { indent: 20 })
      })

      // API Specification
      doc.addPage()
      doc.fontSize(18).font('Helvetica-Bold').text('API Specification', { underline: true })
      doc.moveDown(0.5)
      assets.apiSpecification.endpoints.forEach((endpoint) => {
        doc
          .fontSize(10)
          .font('Courier-Bold')
          .text(`${endpoint.method} ${endpoint.path}`, { indent: 20 })
        doc.fontSize(9).font('Helvetica').text(endpoint.description, { indent: 40 })
        doc.moveDown(0.5)
      })

      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}

export async function exportToPPTX(project: Project): Promise<Buffer> {
  logger.info(`Exporting project ${project.id} to PPTX`)

  const pptx = new PptxGenJS()
  const assets = project.assets!

  // Slide 1: Title
  const slide1 = pptx.addSlide()
  slide1.background = { color: '0F4C81' }
  slide1.addText(assets.name, {
    x: 1,
    y: 2,
    w: 8,
    h: 1,
    fontSize: 44,
    bold: true,
    color: 'FFFFFF',
    align: 'center',
  })
  slide1.addText(assets.tagline, {
    x: 1,
    y: 3.5,
    w: 8,
    h: 0.5,
    fontSize: 24,
    color: 'E0E0E0',
    align: 'center',
  })

  // Add presentation slides
  assets.presentation.slides.forEach((slideData) => {
    const slide = pptx.addSlide()
    slide.addText(slideData.title, {
      x: 0.5,
      y: 0.5,
      w: 9,
      h: 0.8,
      fontSize: 32,
      bold: true,
      color: '0F4C81',
    })
    slide.addText(slideData.content, {
      x: 0.5,
      y: 1.5,
      w: 9,
      h: 4,
      fontSize: 16,
      color: '333333',
      valign: 'top',
    })
  })

  // Roadmap slide
  const roadmapSlide = pptx.addSlide()
  roadmapSlide.addText('Product Roadmap', {
    x: 0.5,
    y: 0.5,
    w: 9,
    h: 0.8,
    fontSize: 32,
    bold: true,
    color: '0F4C81',
  })
  let yPos = 1.5
  assets.roadmap.phases.forEach((phase) => {
    roadmapSlide.addText(`${phase.name} (${phase.duration})`, {
      x: 0.5,
      y: yPos,
      w: 9,
      h: 0.4,
      fontSize: 18,
      bold: true,
      color: '333333',
    })
    yPos += 0.5
    const milestones = phase.milestones.slice(0, 3).join('\n• ')
    roadmapSlide.addText(`• ${milestones}`, {
      x: 0.7,
      y: yPos,
      w: 8.8,
      h: 0.8,
      fontSize: 12,
      color: '666666',
    })
    yPos += 1
  })

  return (await pptx.write({ outputType: 'nodebuffer' })) as Buffer
}

export function exportToJSON(project: Project): object {
  logger.info(`Exporting project ${project.id} to JSON`)

  return {
    project: {
      id: project.id,
      context: project.context,
      createdAt: project.createdAt,
    },
    assets: project.assets,
  }
}
