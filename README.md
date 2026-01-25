# AI-SUM

AI-powered text summarization service with REST API and web interface.

## Features

- AI text summarization using Groq SDK
- Multiple summary modes: bullets, short, detailed
- Multi-language support (auto-detect, English, Russian)
- REST API with OpenAPI/Swagger documentation
- Type-safe shared types across frontend and backend
- Monorepo architecture with pnpm workspaces

## Project Structure

```
ai-summarizer/
├── apps/
│   ├── api/          # NestJS backend API
│   └── web/          # Vue 3 + TypeScript + Vite frontend
├── packages/
│   └── shared/       # Shared TypeScript types and DTOs
└── pnpm-workspace.yaml
```

## Prerequisites

- Node.js (v18+)
- pnpm (v9.0.0+)
- Groq API key ([get one here](https://console.groq.com))

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Configure environment variables:

```bash
# Copy example env file in apps/api
cp apps/api/.env.exmple apps/api/.env
```

Edit `apps/api/.env`:
```env
PORT=3000
AI_PROVIDER=groq
AI_API_KEY=your-groq-api-key
AI_MODEL=llama-3.1-8b-instant
```

3. Build shared package:

```bash
pnpm --filter @repo/shared build
```

## Development

Run all apps in parallel:

```bash
pnpm dev
```

Or run individual apps:

```bash
# API only
pnpm --filter @repo/api dev

# Web only
pnpm --filter @repo/web dev

# Shared package (watch mode)
pnpm --filter @repo/shared dev
```

### API Endpoints

Once running, access:
- API: http://localhost:3000
- Swagger UI: http://localhost:3000/api

**POST /ai/summarize**
```json
{
  "text": "Your text to summarize",
  "mode": "bullets",
  "language": "auto"
}
```

See individual app READMEs for more details:
- [API Documentation](./apps/api/README.md)
- [Web Documentation](./apps/web/README.md)

## Scripts

### Build

Build all apps:

```bash
pnpm build
```

### Testing

Run tests for all apps:

```bash
pnpm test
```

### Linting

Run linting for all apps:

```bash
pnpm lint
```

### Type Checking

Run type checking for all apps:

```bash
pnpm typecheck
```

## Monorepo Architecture

This project uses pnpm workspaces with a shared package pattern:

- **@repo/shared**: Contains shared TypeScript types and DTOs used by both frontend and backend
- **@repo/api**: NestJS backend with Groq AI integration
- **@repo/web**: Vue 3 frontend application

### Working with Shared Types

The shared package exports common types:

```typescript
import type { SummarizeRequest, SummarizeResponse } from '@repo/shared';
```

After modifying shared types, rebuild the package:

```bash
pnpm --filter @repo/shared build
```

## Tech Stack

- **Backend**: NestJS, TypeScript, Groq SDK, Swagger/OpenAPI
- **Frontend**: Vue 3, TypeScript, Vite
- **Shared**: TypeScript, CommonJS modules
- **Tooling**: pnpm workspaces, ESLint, Prettier

## License

UNLICENSED
