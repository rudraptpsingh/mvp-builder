# Quick Start Guide

Get your MVP Asset Generator running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all dependencies for both frontend and backend.

### 2. Add Your OpenAI API Key

Edit `apps/backend/.env` and replace the placeholder with your actual API key:

```bash
nano apps/backend/.env
# or
code apps/backend/.env
```

Replace:
```
OPENAI_API_KEY=sk-your-api-key-here
```

With your actual key:
```
OPENAI_API_KEY=sk-proj-abc123...
```

### 3. Start the Platform

```bash
npm run dev
```

This starts both servers:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

### 4. Generate Your First MVP Assets

1. Open http://localhost:3000 in your browser
2. Enter a detailed description of your MVP idea (minimum 50 characters)
3. Click "Generate Assets"
4. Watch the magic happen! ✨

## Example MVP Context

Try this example to see the platform in action:

```
I want to build a SaaS platform called "ScheduleSmart" that helps freelancers
and consultants manage their appointments and client communications. The platform
will integrate with calendar apps, send automated reminders, handle payment
collection, and provide analytics on booking patterns. Target market is freelance
professionals earning $50k-$150k annually who currently use fragmented tools.
Key differentiator is AI-powered scheduling that learns client preferences and
optimizes meeting times for both parties.
```

## What You'll Get

After 2-3 minutes, you'll receive:

1. ✅ MVP Name & Tagline
2. ✅ Professional Description
3. ✅ One-Page Executive Summary
4. ✅ 5-Slide Pitch Deck
5. ✅ 12-18 Month Product Roadmap
6. ✅ Monetization Strategies
7. ✅ Technical Architecture
8. ✅ Product Architecture
9. ✅ Complete API Specification

## Export Options

Download your assets in multiple formats:
- **PDF** - Complete document with all assets
- **PowerPoint** - Ready-to-present slides
- **JSON** - Structured data for integration

## Troubleshooting

**"Failed to create project"**
- Check that backend is running on port 5000
- Verify your OpenAI API key is valid
- Check backend logs in the terminal

**"Project stuck at processing"**
- OpenAI may be rate-limited
- Check backend logs for errors
- Wait a moment and refresh the page

**"Port already in use"**
- Another app is using port 3000 or 5000
- Change ports in:
  - Backend: `apps/backend/.env`
  - Frontend: `apps/frontend/vite.config.ts`

## Next Steps

- Read the full [README.md](./README.md) for detailed documentation
- Customize prompts in `apps/backend/src/services/generators/`
- Adjust styling in `apps/frontend/src/index.css`
- Deploy to production (see deployment section in README)

## Need Help?

Check the troubleshooting section in the main README or review the code comments for guidance.

---

**Happy Building!** 🚀
