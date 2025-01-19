# THT

A modern web application built with Tanstack Router, tRPC, and Hono.

## Project Structure

The project is organized into two main directories:

- `client/` - Frontend React application
- `server/` - Backend API service

### Tech Stack

#### Frontend (client)
- React
- TanStack Router
- tRPC with react query
- Typescript
- Tailwind CSS
- Shadcn/UI
- Vite

#### Backend (server)
- Hono
- tRPC
- Typescript
- Drizzle ORM
- LibSQL/Turso
- Cloudflare Workers

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd THT
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
bun install

# Install server dependencies
cd ../server
bun install
```

### Development

1. Start the local database:
```bash
cd server
bun run db:local
```

2. Start the development server:
```bash
# In server directory
bun run dev

# In a new terminal, in client directory
bun run dev
```

The client will be available at `http://localhost:3001`

### Database Management

- Push schema changes: `bun run db:push`
- Open database studio: `bun run db:studio`


## Scripts

### Client
- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run typecheck` - Run TypeScript type checking
- `bun run serve` - Preview production build

### Server
- `bun run dev` - Start development server
- `bun run db:local` - Run local database
- `bun run db:push` - Push database schema changes
- `bun run db:studio` - Open database management UI
- `bun run wrangler:dev` - Run Cloudflare Workers locally
- `bun run wrangler:deploy` - Deploy to Cloudflare Workers
