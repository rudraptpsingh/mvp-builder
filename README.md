# MVP Asset Generator

A professional, AI-powered platform that transforms your MVP idea into comprehensive, investor-ready assets through deep research and industry best practices.

## 🚀 Features

Generate **10 professional assets** for your MVP:

1. **MVP Name** - Memorable, brandable product name
2. **Tagline** - Compelling, concise value proposition
3. **MVP Description** - Comprehensive product overview
4. **One-Pager** - Executive summary for investors
5. **5-Slide Pitch Deck** - Investor-ready presentation
6. **Product Roadmap** - Strategic 12-18 month timeline
7. **Monetization Strategies** - Data-driven revenue models
8. **Technical Architecture** - Scalable system design
9. **Product Architecture** - Feature hierarchy and user flows
10. **API Specification** - Complete OpenAPI documentation

## 🎯 What Makes This Platform Special

- **Deep AI Research**: Leverages OpenAI's advanced models to conduct comprehensive market research
- **Industry Best Practices**: Insights based on successful companies like Stripe, Notion, Figma, and Airbnb
- **Professional Quality**: Assets match the quality of top consulting firms (McKinsey, BCG)
- **Multiple Export Formats**: Download as PDF, PowerPoint, or JSON
- **Real-Time Progress**: Watch your assets generate with live progress tracking
- **Modern Tech Stack**: Built with React, TypeScript, Node.js, and Express

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Tailwind CSS** for professional styling
- **Framer Motion** for smooth animations
- **React Query** for efficient data fetching
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **OpenAI API** for deep research and generation
- **PDFKit** for PDF generation
- **PptxGenJS** for PowerPoint exports
- **Winston** for logging

## 📋 Prerequisites

- Node.js 18+ and npm 9+
- OpenAI API key (for deep research capabilities)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd mvp-builder
```

### 2. Install Dependencies

```bash
npm install
```

This will install dependencies for both frontend and backend workspaces.

### 3. Configure Environment Variables

Create a `.env` file in the `apps/backend` directory:

```bash
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env` and add your OpenAI API key:

```env
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

### 4. Start the Development Servers

```bash
npm run dev
```

This will start both:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📖 Usage Guide

### Creating Your First MVP Assets

1. **Navigate to the Homepage** (http://localhost:3000)

2. **Enter Your MVP Context**
   - Describe your product idea in detail
   - Include target market, problem, solution, and vision
   - Minimum 50 characters (more detail = better results)

   Example:
   ```
   I want to build a SaaS platform that helps small businesses
   manage their social media content using AI. The target market
   is small business owners who don't have time or budget for a
   full marketing team. The platform will use AI to generate
   content ideas, schedule posts, and analyze engagement across
   all major social platforms.
   ```

3. **Click "Generate Assets"**
   - The platform will conduct deep market research
   - Specialized AI agents will generate each asset
   - Progress updates show in real-time

4. **Review Your Assets**
   - View all 10 generated assets
   - Each asset is professionally formatted
   - Based on industry best practices and real market data

5. **Export Your Assets**
   - **PDF**: Complete document with all assets
   - **PowerPoint**: Presentation-ready slides
   - **JSON**: Structured data for further processing

## 🧪 Asset Generation Process

The platform uses a sophisticated multi-agent system:

### Phase 1: Research (10%)
- Conducts comprehensive market research
- Analyzes industry trends and competitors
- Identifies opportunities and challenges
- Studies successful companies in your space

### Phase 2: Basic Assets (20-30%)
- Generates compelling MVP name
- Creates memorable tagline
- Writes comprehensive description

### Phase 3: Documents (40-50%)
- Creates executive one-pager
- Designs 5-slide pitch deck

### Phase 4: Strategy (60-70%)
- Plans product roadmap with phases
- Analyzes monetization strategies

### Phase 5: Architecture (80-90%)
- Designs technical architecture
- Defines product architecture

### Phase 6: Technical Specs (95-100%)
- Generates OpenAPI specification
- Documents all API endpoints

## 🎨 UI/UX Features

- **Glass-morphism Design**: Modern, professional aesthetic
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Works on all screen sizes
- **Real-time Progress**: Live updates during generation
- **Dark Mode Ready**: CSS variables for easy theming

## 🔧 Development

### Project Structure

```
mvp-builder/
├── apps/
│   ├── frontend/          # React application
│   │   ├── src/
│   │   │   ├── components/  # UI components
│   │   │   ├── pages/       # Route pages
│   │   │   ├── lib/         # Utilities
│   │   │   └── ...
│   │   └── package.json
│   └── backend/           # Express API
│       ├── src/
│       │   ├── routes/      # API routes
│       │   ├── services/    # Business logic
│       │   │   └── generators/  # Asset generators
│       │   ├── types/       # TypeScript types
│       │   └── utils/       # Utilities
│       └── package.json
└── package.json           # Root workspace config
```

### Available Scripts

**Root Level:**
```bash
npm run dev              # Start both frontend and backend
npm run build            # Build both applications
npm run dev:frontend     # Start only frontend
npm run dev:backend      # Start only backend
```

**Frontend:**
```bash
cd apps/frontend
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build
```

**Backend:**
```bash
cd apps/backend
npm run dev             # Start with hot reload
npm run build           # Compile TypeScript
npm start               # Run production build
```

## 🔌 API Endpoints

### Projects

**Create Project**
```
POST /api/projects
Body: { "context": "Your MVP description..." }
Response: { "projectId": "uuid", "status": "pending" }
```

**Get All Projects**
```
GET /api/projects
Response: [{ id, context, status, createdAt, ... }]
```

**Get Project Details**
```
GET /api/projects/:projectId
Response: { id, context, status, assets, progress, ... }
```

**Export Project**
```
GET /api/projects/:projectId/export/pdf
GET /api/projects/:projectId/export/pptx
GET /api/projects/:projectId/export/json
```

## 🎯 Customization

### Adding New Asset Generators

1. Create a new generator in `apps/backend/src/services/generators/`
2. Import and call it in `apps/backend/src/services/assetGenerator.ts`
3. Update the `MVPAssets` type in `apps/backend/src/types/index.ts`
4. Add UI components in the frontend to display the new asset

### Customizing Research Prompts

Edit the prompts in each generator file to:
- Focus on specific industries
- Add more data sources
- Adjust tone and style
- Include additional metrics

### Styling Customization

- Edit `apps/frontend/tailwind.config.js` for theme changes
- Modify CSS variables in `apps/frontend/src/index.css`
- Update component styles in respective files

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build settings:
   - Build Command: `npm run build:frontend`
   - Output Directory: `apps/frontend/dist`
   - Root Directory: `apps/frontend`

### Backend (Railway/Heroku)

1. Set environment variables (OPENAI_API_KEY, PORT)
2. Deploy from `apps/backend` directory
3. Update frontend API URL in production

### Database (Optional)

Replace the in-memory `ProjectStore` with a real database:
- PostgreSQL with Prisma
- MongoDB with Mongoose
- Supabase for backend-as-a-service

## 🔐 Security Considerations

- Never commit `.env` files with real API keys
- Implement rate limiting for API endpoints
- Add authentication for production use
- Validate and sanitize all user inputs
- Use HTTPS in production

## 📊 Performance Optimization

- Assets are generated asynchronously in the background
- Frontend polls for updates every 2 seconds during processing
- OpenAI responses are streamed where possible
- PDF/PPTX generation is done on-demand

## 🐛 Troubleshooting

**OpenAI API Errors:**
- Verify your API key is correct
- Check your OpenAI account has credits
- Review rate limits on your account

**Build Errors:**
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

**Port Conflicts:**
- Change ports in `apps/backend/.env` and `apps/frontend/vite.config.ts`

## 🤝 Contributing

This is a professional MVP builder designed for high-quality asset generation. Contributions are welcome!

## 📝 License

MIT License - Feel free to use this project for your own MVPs!

## 🙏 Acknowledgments

- OpenAI for powerful language models
- Industry leaders (Stripe, Notion, Figma) for inspiration
- Open source community for excellent tools and libraries

---

Built with ❤️ for entrepreneurs and innovators

**Start building your MVP today!** 🚀
