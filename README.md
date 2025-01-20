# Better-T Stack

A modern TypeScript monorepo template powered by Hono, tRPC, TanStack Router, Tailwind CSS, shadcn/ui, Better-Auth, and
Drizzle with libSQL - all bundled together with Bun for maximum performance.

## 🚀 Tech Stack

### Core
- [Bun](https://bun.sh/) - Fast all-in-one JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) - Type safety across the stack
- [tRPC](https://trpc.io/) - End-to-end type-safe APIs

### Frontend
- [TanStack Router](https://tanstack.com/router) - Type-safe routing
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components

### Backend
- [Hono](https://hono.dev/) - Ultrafast web framework
- [Better-Auth](https://www.better-auth.com/) - Modern authentication solution
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [libSQL](https://github.com/libsql/libsql) - SQLite-compatible database engine

## 📁 Project Structure

```bash
.
├── packages/
│   ├── client/                 # Frontend React application
│   │   ├── src/
│   │   │   ├── components/    # UI components
│   │   │   ├── routes/        # TanStack Router routes
│   │   │   └── lib/           # Utilities and configurations
│   │   └── ...
│   └── server/                 # Backend Hono API
│       ├── src/
│       │   ├── db/            # Database schema and config
│       │   ├── lib/           # Auth and tRPC setup
│       │   └── routers/       # tRPC routers
│       └── ...
```

## 🚦 Getting Started

1. Clone (or use github template) and install dependencies:
```bash
npx degit AmanVarshney01/Better-T-Stack my-project
cd my-project
bun install
```

2. Set up the database:
```bash
# Start local SQLite database with turso
bun run db:local

# Push database schema
bun run db:push
```

3. Start development servers:
```bash
# Start both client and server
bun run dev

# Or individually:
bun run dev:client
bun run dev:server
```

The client will be available at `http://localhost:3001`

## 📝 Available Scripts

### Root
- `bun dev` - Start all development servers
- `bun dev:client` - Start client development server
- `bun dev:server` - Start server development server
- `bun db:local` - Start local SQLite database
- `bun db:push` - Push database schema changes
- `bun clean` - Clean all node_modules and lock files

### Client
- `bun typecheck` - Run TypeScript type checking
- `bun build` - Build for production
- `bun serve` - Preview production build

### Server
- `bun dev` - Start development server with hot reload
- `bun wrangler:dev` - Run with Cloudflare Workers locally
- `bun wrangler:deploy` - Deploy to Cloudflare Workers

## 💻 Development

This template is configured for an optimal development experience out of the box:

- Full-stack TypeScript configuration
- End-to-end type safety with tRPC
- Modern authentication with Better-Auth
- Beautiful UI components from shadcn/ui
- Fast development server with Bun
- Production-ready with Cloudflare Workers support
