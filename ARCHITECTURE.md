# FASE Fullstack Enterprise Architecture

## Architecture Overview

The FASE project has been refactored into a scalable, enterprise-grade fullstack architecture with clean separation of concerns.

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend Layer                            │
├─────────────────────────────────────────────────────────────────┤
│  Components → Hooks → Services → API Endpoints                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                         Backend Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  Controllers → Services → Repositories → Supabase Database       │
└─────────────────────────────────────────────────────────────────┘
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public website pages
│   ├── admin/                    # Admin dashboard
│   ├── client/                   # Client portal
│   ├── auth/                     # Authentication pages
│   └── api/                      # API routes
│       ├── clients/              # Client CRUD endpoints
│       ├── projects/             # Project CRUD endpoints
│       └── dashboard/            # Dashboard stats endpoint
│
├── components/                   # React components
│   ├── ui/                       # Reusable UI components
│   ├── admin/                    # Admin dashboard components
│   └── layout/                   # Layout components
│
├── hooks/                        # Custom React hooks
│   ├── api/                      # API hooks (useClients, useProjects)
│   └── useCounter.ts             # Utility hooks
│
├── lib/                          # Core libraries
│   └── supabase/                 # Supabase configuration
│       ├── client.ts             # Browser client
│       ├── server.ts             # Server client (SSR)
│       └── middleware.ts         # Auth middleware
│
├── server/                       # Backend layer
│   ├── controllers/              # Request/response handlers
│   ├── services/                 # Business logic
│   │   ├── client.service.ts     # Client business logic
│   │   └── project.service.ts    # Project business logic
│   └── repositories/             # Data access layer
│       ├── base.repository.ts    # Base repository
│       ├── client.repository.ts  # Client data access
│       └── project.repository.ts # Project data access
│
├── services/                     # Frontend API services
│   └── api/                      # API client services
│       ├── clients.ts            # Client API calls
│       ├── projects.ts           # Project API calls
│       └── dashboard.ts          # Dashboard API calls
│
├── types/                        # TypeScript types
│   └── database.types.ts         # Database schema types
│
└── utils/                        # Utility functions
```

## Data Flow

### Frontend Data Flow
```
Component
   ↓
Custom Hook (useClients, useProjects)
   ↓
API Service (clientApiService, projectApiService)
   ↓
API Endpoint (/api/clients, /api/projects)
   ↓
Backend Service (clientService, projectService)
   ↓
Repository (clientRepository, projectRepository)
   ↓
Supabase Database
```

## API Endpoints

### Clients
- `GET /api/clients` - List all clients with pagination, filtering, sorting
- `GET /api/clients/:id` - Get single client
- `POST /api/clients` - Create new client
- `PUT /api/clients/:id` - Update client
- `DELETE /api/clients/:id` - Delete client

### Projects
- `GET /api/projects` - List all projects with pagination, filtering, sorting
- `GET /api/projects/:id` - Get single project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Dashboard
- `GET /api/dashboard/stats` - Get dashboard statistics

## Repository Pattern

Each repository follows the same pattern:

1. **BaseRepository** - Provides common functionality
2. **Specific Repository** - Implements domain-specific queries
3. **Service Layer** - Contains business logic and validation
4. **API Route** - Handles HTTP request/response

Example:
```typescript
// Repository: Data access
clientRepository.findAll(params)

// Service: Business logic
clientService.createClient(input)
  → Validates input
  → Checks duplicates
  → Calls repository

// API: HTTP handling
POST /api/clients
  → Parses request
  → Calls service
  → Returns response
```

## Frontend Hooks

Reactive hooks for consuming APIs:

```typescript
// List with pagination
const { clients, loading, refetch } = useClients({ page: 1, limit: 10 })

// Single item
const { client, loading } = useClient(id)

// Create mutation
const { createClient, loading } = useCreateClient()

// Update mutation
const { updateClient, loading } = useUpdateClient()

// Delete mutation
const { deleteClient, loading } = useDeleteClient()
```

## Supabase Integration

### Authentication
- SSR-compatible session handling
- Middleware-protected routes
- Role-based access control

### Database
- PostgreSQL with Row Level Security (RLS)
- Type-safe queries with TypeScript
- Repository pattern for clean data access

### Client Setup
```typescript
// Browser
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

// Server (SSR)
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()
```

## Performance Optimizations

### React Optimizations
- `useCallback` for event handlers
- `useMemo` for computed values
- `React.memo` for component memoization

### API Optimizations
- Pagination to limit data transfer
- Server-side filtering and sorting
- Debounced search queries

## Security

### Route Protection
Middleware protects `/admin/*` and `/client/*` routes:
```typescript
// src/middleware.ts
- Checks for valid session
- Redirects unauthenticated users to login
- Updates session on each request
```

### API Security
- Input validation in service layer
- SQL injection prevention via Supabase
- Row Level Security (RLS) in database

## Database Schema

### Tables
- `profiles` - User profiles with roles
- `clients` - Client information
- `projects` - Project management
- `project_members` - Project team assignments
- `invoices` - Invoice management
- `files` - File attachments

### Roles
- `super_admin` - Full system access
- `admin` - Administrative access
- `project_manager` - Project management
- `designer` - Design tasks
- `developer` - Development tasks
- `client` - Client portal access

## Migration Strategy

### Phase 1: ✅ Architecture Setup
- Repository pattern implementation
- Service layer creation
- API endpoints setup
- Frontend services and hooks

### Phase 2: 🔄 Admin Dashboard Integration
- Refactor admin pages to use APIs
- Implement loading states
- Add error handling
- Optimize with React performance patterns

### Phase 3: 📋 Database Setup
- Create Supabase tables
- Implement RLS policies
- Seed initial data
- Set up indexes

### Phase 4: 🚀 Production Ready
- Testing and validation
- Performance optimization
- Security hardening
- Documentation

## Best Practices

### Frontend
- Use hooks for data fetching
- Implement proper loading states
- Handle errors gracefully
- Debounce user inputs
- Use React.memo for expensive components

### Backend
- Validate all inputs
- Use repositories for data access
- Implement proper error handling
- Log errors for debugging
- Use transactions for multi-step operations

### Database
- Use RLS for security
- Create proper indexes
- Use foreign keys for relationships
- Implement soft deletes
- Timestamp all records

## Future Enhancements

- Real-time updates with Supabase Realtime
- File upload with Supabase Storage
- Advanced search with full-text search
- Analytics dashboard with charts
- Email notifications
- Webhook integrations
- Advanced reporting
- Export functionality (CSV, PDF)
