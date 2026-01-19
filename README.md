# AI-SUM

A full-stack application built with NestJS and Vue 3.

## Project Structure

This is a pnpm monorepo containing:

- `apps/api` - NestJS backend API
- `apps/web` - Vue 3 + TypeScript + Vite frontend

## Prerequisites

- Node.js (v18+)
- pnpm (v9.0.0+)

## Setup

Install dependencies for all apps:

```bash
pnpm install
```

## Development

Run all apps in parallel:

```bash
pnpm dev
```

Or run individual apps:

```bash
# API only (from root)
pnpm --filter api dev

# Web only (from root)
pnpm --filter web dev
```

See individual app READMEs for more details:
- [API Documentation](./apps/api/README.md)
- [Web Documentation](./apps/web/README.md)

## Build

Build all apps:

```bash
pnpm build
```

## Testing

Run tests for all apps:

```bash
pnpm test
```

## Linting

Run linting for all apps:

```bash
pnpm lint
```

## Type Checking

Run type checking for all apps:

```bash
pnpm typecheck
```
