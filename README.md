# Enterprise Frontend

Production-ready enterprise frontend project built with Next.js 14, TypeScript, and Strapi CMS.

## Overview

A scalable, SEO-optimized web application with:

- **Next.js 14** - App Router with SSR/SSG
- **TypeScript** - Full type safety
- **Strapi CMS** - Headless CMS integration via OpenAPI
- **i18n** - Vietnamese (vi) and English (en) support
- **TailwindCSS** - Utility-first styling
- **TanStack Query** - Server state management ready
- **Zod** - Runtime validation ready
- **ESLint + Prettier** - Code quality

## Project Structure

```
src/
├── app/
│   ├── [locale]/               # Locale-based routing (en/vi)
│   │   ├── layout.tsx         # Root layout with providers
│   │   ├── page.tsx           # Home page (SSG)
│   │   ├── error.tsx          # Error boundary
│   │   ├── not-found.tsx      # 404 page
│   │   └── blog/
│   │       ├── page.tsx       # Blog listing (SSG)
│   │       └── [slug]/        # Blog post (Dynamic)
│   │           └── page.tsx
│   ├── globals.css            # Global styles
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Robots.txt
│
├── components/
│   ├── ui/                    # Base UI components
│   │   ├── Button.tsx
│   │   ├── Container.tsx
│   │   ├── Heading.tsx
│   │   ├── Input.tsx
│   │   └── Text.tsx
│   ├── layout/                # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MainLayout.tsx
│   │   └── ErrorBoundary.tsx
│   └── seo/                   # SEO utilities
│       └── Seo.tsx
│
├── services/                  # Business logic & API
│   └── index.ts              # Strapi API services
│
├── hooks/                     # Custom React hooks
│   └── index.ts
│
├── lib/
│   ├── config/               # Environment config
│   │   └── index.ts
│   ├── error/                # Error handling
│   │   ├── api-error.ts
│   │   └── error-handler.ts
│   └── utils/                # Utilities
│       └── index.ts          # cn() - classname merge
│
├── messages/                  # Translation files
│   ├── en.json
│   └── vi.json
│
└── config/
    └── i18n/                 # i18n configuration
        └── index.ts
```

## Important Configurations

### Environment Variables

Create environment files in project root:

```bash
# .env.local (development)
NEXT_PUBLIC_API_URL=http://localhost:1337
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DEFAULT_LOCALE=en

# .env.staging (staging)
NEXT_PUBLIC_API_URL=https://api-staging.example.com
NEXT_PUBLIC_SITE_URL=https://staging.example.com

# .env.production (production)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_SITE_URL=https://example.com
```

### Path Aliases

Configured in `tsconfig.json`:

```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/api/*": ["./src/api/*"],
    "@/services/*": ["./src/services/*"],
    "@/hooks/*": ["./src/hooks/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/config/*": ["./src/config/*"],
    "@/messages/*": ["./src/messages/*"]
  }
}
```

### TailwindCSS Theme

Extended in `tailwind.config.js`:
- Custom primary colors
- Container sizes
- Font families

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Generate API client from OpenAPI (optional)
npm run generate:api
```

### Development

```bash
# Start development server
npm run dev

# Run with custom port
PORT=3001 npm run dev
```

Server runs at: http://localhost:3000

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Linting & Formatting

```bash
# Lint
npm run lint

# Fix lint errors
npm run lint:fix

# Check formatting
npm run format:check

# Format code
npm run format
```

### Type Checking

```bash
npm run typecheck
```

## API Integration

### OpenAPI Generator

Generate TypeScript client from OpenAPI spec:

```bash
npm run generate:api
```

This reads from `openapi.yaml` and generates types to `src/api/generated/`.

### Service Layer

Add new services in `src/services/index.ts`:

```typescript
class PageService {
  async getPages(locale?: string): Promise<Page[]> {
    const response = await apiClient.get(`${env.apiUrl}/api/pages`, {
      params: { locale },
    });
    return response.data.data;
  }
}

export const pageService = new PageService();
```

### API Client Configuration

Axios client with interceptors in `src/api/client.ts`:
- Request interceptors for auth tokens
- Response interceptors for error handling
- Timeout configuration

## Internationalization

### Adding Translations

1. Add keys to `src/messages/en.json` and `src/messages/vi.json`
2. Use in components:

```typescript
// Server Component
import { useTranslations } from 'next-intl/server';

export default function Page() {
  const t = useTranslations('common');
  return <h1>{t('home')}</h1>;
}

// Client Component
import { useTranslations } from 'next-intl';

export function Component() {
  const t = useTranslations('common');
  return <h1>{t('home')}</h1>;
}
```

### Adding New Locale

1. Add locale to `src/config/i18n/index.ts`
2. Add translation file in `src/messages/`
3. Update middleware matcher in `src/middleware.ts`

## Code Conventions

### TypeScript

- Always use explicit types for function parameters and return values
- Use `interface` for object shapes, `type` for unions/aliases
- Avoid `any`, use `unknown` when type is truly unknown
- Prefix unused parameters with `_`

```typescript
// Good
interface BlogPost {
  id: number;
  title: string;
  content: string;
}

async function getPost(id: number): Promise<BlogPost | null> {
  // implementation
}

// Unused parameter
function handleEvent(_event: MouseEvent) {
  // only uses default prevented
}
```

### React Components

- Use functional components with arrow functions or `function` keyword
- Use `forwardRef` for components that need ref forwarding
- Define prop types with explicit interface
- Use `'use client'` directive for client components

```typescript
// Good - Server Component
export default async function HomePage({ params }: Props) {
  const data = await fetchData();
  return <div>{data.title}</div>;
}

// Good - Client Component with ref
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return <button ref={ref} {...props}>{children}</button>;
  }
);
```

### File Naming

- PascalCase for components: `BlogPost.tsx`, `Header.tsx`
- camelCase for utilities: `cn.ts`, `api-client.ts`
- kebab-case for configs: `next.config.js`, `postcss.config.js`

### Component Structure

```typescript
// 1. Imports
import { useState } from 'react';
import { cn } from '@/lib/utils';

// 2. Types
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
}

// 3. Component
export function Button({ variant = 'primary', children }: ButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button className={cn('btn', variant === 'primary' && 'btn-primary')}>
      {children}
    </button>
  );
}
```

### CSS / Tailwind

- Use utility classes from TailwindCSS
- Use `cn()` from `@/lib/utils` for conditional classes
- Keep custom CSS to minimum, use Tailwind config for theming

```typescript
// Good
<div className={cn(
  'flex items-center justify-between',
  isActive && 'bg-primary-100'
)} />

// Avoid
<div style={{ display: 'flex', alignItems: 'center' }} />
```

### API Error Handling

```typescript
import { ApiError } from '@/lib/error/api-error';
import { handleApiError, logError } from '@/lib/error/error-handler';

try {
  const data = await service.getData();
} catch (error) {
  const apiError = handleApiError(error);
  logError(error, 'getData');
  
  if (apiError.isNotFound) {
    notFound();
  }
  throw apiError;
}
```

### Git Conventions

Follow conventional commits:

```bash
# Features
git commit -m "feat: add blog post listing"

# Bug fixes
git commit -m "fix: resolve navigation issue"

# Documentation
git commit -m "docs: update API documentation"

# Refactoring
git commit -m "refactor: simplify error handling"
```

## SEO Optimization

### Metadata

Use Next.js Metadata API in `page.tsx`:

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Page Title',
    description: 'Page description',
    openGraph: {
      title: 'Page Title',
      description: 'Page description',
      type: 'website',
    },
  };
}
```

### Structured Data

Add JSON-LD in components:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Enterprise',
    }),
  }}
/>
```

### Sitemap

Auto-generated at `/sitemap.xml` via `src/app/sitemap.ts`

## Performance

### Rendering Strategies

- **SSG** (`export const revalidate`): For static content (home, about)
- **ISR**: For content that updates occasionally (blog)
- **Dynamic**: For personalized content

```typescript
// SSG with 1 hour revalidation
export const revalidate = 3600;

// ISR - on-demand revalidation
export const revalidate = false;
```

### Image Optimization

Use Next.js Image component:

```typescript
import Image from 'next/image';

<Image
  src={post.coverImage.url}
  alt={post.title}
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Type Errors

```bash
# Check TypeScript
npm run typecheck

# Update TypeScript
npm install typescript@latest
```

### API Connection

Ensure Strapi is running and `.env.local` has correct `NEXT_PUBLIC_API_URL`.

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev/docs)
- [TailwindCSS](https://tailwindcss.com/docs)
- [Strapi Documentation](https://docs.strapi.io)
