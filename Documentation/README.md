<div align="center">

# DesignBetter Frontend

### Designing the Future of Frontend Innovation

[![Last Commit](https://img.shields.io/github/last-commit/Ultimate-Truth-Seeker/DesignBetterFrontend?color=blue&label=last%20commit)](https://github.com/Ultimate-Truth-Seeker/DesignBetterFrontend)
[![Languages](https://img.shields.io/github/languages/count/Ultimate-Truth-Seeker/DesignBetterFrontend?color=brightgreen&label=languages)](https://github.com/Ultimate-Truth-Seeker/DesignBetterFrontend)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

**[Production Demo](https://designbetter.vercel.app/)** • **[Backend API](https://designbetterbackend.onrender.com/)** • **[Report Bug](https://github.com/Ultimate-Truth-Seeker/DesignBetterFrontend/issues)**

</div>

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Contributing](#contributing)
- [License](#license)

---

## Features

**Optimized Performance**
- Server-Side Rendering (SSR) with Next.js
- Automatic code splitting
- Image optimization with Next/Image
- Component lazy loading

**TypeScript First**
- Type safety throughout the project
- Schema validation with Zod
- Enhanced IntelliSense
- Fewer bugs in production

**Modern UI/UX**
- Mobile-first responsive design
- Reusable components
- Smooth animations
- Integrated accessibility (a11y)

**Complete Authentication**
- Login/Registration with JWT
- Social login (Google, Facebook)
- Session management
- Protected routes

**Robust Testing**
- Unit tests with Vitest
- E2E tests with Cypress
- Coverage reports
- Integrated CI/CD

---

## Tech Stack

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

</div>

### Main Dependencies

- **TypeScript** - Typed superset of JavaScript
- **React 18+** - UI library
- **Next.js** - React framework with SSR
- **Zod** - TypeScript-first schema validation
- **date-fns** - Modern date manipulation
- **Yarn** - Fast package manager
- **Vitest** - Unit testing framework
- **Cypress** - End-to-End testing
- **ESLint** - Code quality linter
- **npm** - Scripts and package management

### Development Tools

![JSON](https://img.shields.io/badge/JSON-000000?style=flat&logo=json&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=flat&logo=markdown&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=flat&logo=npm&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white)
![Cypress](https://img.shields.io/badge/Cypress-17202C?style=flat&logo=cypress&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white)

---

## Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/Ultimate-Truth-Seeker/DesignBetterFrontend.git
cd DesignBetterFrontend

# 2. Install dependencies
yarn install
# or
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start development server
yarn dev
# or
npm run dev

# 5. Access the application
# http://localhost:3000
```

Ready! The frontend will be running with hot-reload enabled.

---

## Installation

### Option A: With Yarn (Recommended)

**Prerequisites:**
- Node.js 18.x+
- Yarn 1.22+
- Git

**Steps:**

```bash
# Install dependencies
yarn install

# Start development
yarn dev
```

---

### Option B: With npm

**Prerequisites:**
- Node.js 18.x+
- npm 9+
- Git

**Steps:**

```bash
# Install dependencies
npm install

# Start development
npm run dev
```

---

### Option C: With Docker

**Prerequisites:**
- Docker 20.x+
- Docker Compose 2.x+

**Steps:**

```bash
# Build image
docker build -t designbetter-frontend .

# Run container
docker run -p 3000:3000 designbetter-frontend

# Or use Docker Compose
docker-compose up
```

**Available services:**
- Frontend: `http://localhost:3000`

---

## Configuration

### Environment Variables

Create a `.env.local` file at the project root:

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8000` | Yes |
| `NEXT_PUBLIC_FRONTEND_URL` | Frontend URL | `http://localhost:3000` | Yes |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google OAuth Client ID | `your-client-id.apps.googleusercontent.com` | Warning |
| `NEXT_PUBLIC_FACEBOOK_APP_ID` | Facebook App ID | `123456789` | Warning |
| `NEXT_PUBLIC_ENV` | Execution environment | `development` / `production` | Yes |
| `ANALYZE` | Enable bundle analyzer | `true` / `false` | No |

**Example `.env.local`:**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_ENV=development
```

**Notes:**
- Variables with `NEXT_PUBLIC_` prefix are exposed to the browser
- Don't include sensitive secrets in public variables
- In production, configure these variables on your deployment platform (Vercel, Netlify, etc.)

### TypeScript Configuration

The project uses strict TypeScript configuration:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

## Usage

### Local Development

```bash
# Start development server
yarn dev

# Server will be at http://localhost:3000
# Hot reload enabled automatically
```

### Production Build

```bash
# Create optimized build
yarn build

# Start production server
yarn start
```

### Linting and Formatting

```bash
# Run ESLint
yarn lint

# Auto-fix issues
yarn lint:fix

# Format code (if you have Prettier configured)
yarn format
```

### Bundle Analysis

```bash
# Analyze bundle size
ANALYZE=true yarn build

# A visual report will open in the browser
```

---

## Testing

### Unit Tests (Vitest)

```bash
# Run all tests
yarn test

# Watch mode (re-runs on file changes)
yarn test:watch

# Coverage report
yarn test:coverage

# Interactive Vitest UI
yarn test:ui
```

### E2E Tests (Cypress)

```bash
# Open Cypress UI
yarn cypress:open

# Run tests in headless mode
yarn cypress:run

# Run specific tests
yarn cypress:run --spec "cypress/e2e/auth.cy.ts"
```

### Test Structure

```
src/
├── __tests__/              # Unit tests
│   ├── components/
│   ├── hooks/
│   └── utils/
│
cypress/
├── e2e/                    # E2E tests
│   ├── auth.cy.ts
│   ├── orders.cy.ts
│   └── templates.cy.ts
├── fixtures/               # Test data
└── support/                # Custom commands
```

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

---

## Project Structure

```
DesignBetterFrontend/
│
├── public/                     # Static files
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── src/                        # Source code
│   ├── app/                    # App Router (Next.js 13+)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Main page
│   │   ├── (auth)/             # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/        # Protected routes
│   │   │   ├── orders/
│   │   │   └── templates/
│   │   └── api/                # API routes
│   │
│   ├── components/             # React components
│   │   ├── ui/                 # Base components (buttons, inputs)
│   │   ├── layout/             # Layout components (header, footer)
│   │   ├── forms/              # Forms
│   │   └── features/           # Feature components
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useOrders.ts
│   │   └── useTemplates.ts
│   │
│   ├── lib/                    # Utilities and configurations
│   │   ├── api.ts              # API client
│   │   ├── auth.ts             # Authentication logic
│   │   └── validators.ts       # Zod schemas
│   │
│   ├── types/                  # TypeScript types
│   │   ├── auth.ts
│   │   ├── orders.ts
│   │   └── templates.ts
│   │
│   ├── styles/                 # Global styles
│   │   └── globals.css
│   │
│   └── utils/                  # Helper functions
│       ├── formatters.ts       # Formatting with date-fns
│       └── helpers.ts
│
├── cypress/                    # E2E tests
│   ├── e2e/
│   ├── fixtures/
│   └── support/
│
├── __tests__/                  # Unit tests
│
├── Dockerfile                  # Docker configuration
├── docker-compose.yml          # Docker orchestration
├── package.json                # Dependencies and scripts
├── yarn.lock                   # Yarn lock file
├── tsconfig.json               # TypeScript configuration
├── next.config.js              # Next.js configuration
├── vitest.config.ts            # Vitest configuration
├── cypress.config.ts           # Cypress configuration
├── .eslintrc.json              # ESLint configuration
└── README.md                   # This documentation
```

---

## Available Scripts

### Development

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `yarn dev` | Start development server |
| `build` | `yarn build` | Create production build |
| `start` | `yarn start` | Start production server |
| `lint` | `yarn lint` | Run ESLint |
| `lint:fix` | `yarn lint --fix` | Auto-fix lint issues |

### Testing

| Script | Command | Description |
|--------|---------|-------------|
| `test` | `yarn test` | Run unit tests |
| `test:watch` | `yarn test --watch` | Tests in watch mode |
| `test:coverage` | `yarn test --coverage` | Coverage report |
| `test:ui` | `yarn test --ui` | Interactive Vitest UI |
| `cypress:open` | `yarn cypress open` | Open Cypress UI |
| `cypress:run` | `yarn cypress run` | Headless E2E tests |

### Utilities

| Script | Command | Description |
|--------|---------|-------------|
| `type-check` | `yarn tsc --noEmit` | Check types without compiling |
| `analyze` | `ANALYZE=true yarn build` | Analyze bundle size |
| `clean` | `rm -rf .next out` | Clean build files |

---

## Architecture

```
┌─────────────────────────────────────────┐
│           User / Browser                │
└──────────────────┬──────────────────────┘
                   │ HTTPS
                   ▼
┌─────────────────────────────────────────┐
│       Next.js Frontend (Vercel)         │
│   ┌─────────────────────────────┐       │
│   │  React Components + SSR      │       │
│   │  TypeScript + Zod Validation │       │
│   │  State Management + Hooks    │       │
│   └──────────────┬──────────────┘       │
└──────────────────┼──────────────────────┘
                   │ REST API (JWT)
                   ▼
┌─────────────────────────────────────────┐
│    Django Backend (Render.com)          │
│         + PostgreSQL + pgvector         │
└─────────────────────────────────────────┘
```

**Data Flow:**
1. User interacts with React components
2. Data validation with Zod
3. API requests with JWT Bearer token
4. Backend processes and responds
5. State updates with custom hooks
6. UI re-renders automatically

**Architectural Features:**
- **SSR/SSG**: Server rendering for SEO and performance
- **Code Splitting**: Lazy component loading
- **Type Safety**: TypeScript + Zod end-to-end
- **Optimistic Updates**: Responsive UI with optimistic updates
- **Error Boundaries**: Robust error handling

---

## Contributing

Contributions are welcome! Follow these steps:

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/DesignBetterFrontend.git
cd DesignBetterFrontend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Create a Branch

```bash
git checkout -b feature/new-feature
```

### 4. Make Your Changes

- Write clean and typed code
- Add tests for new features
- Follow style guidelines
- Update documentation if needed

### 5. Run Tests and Linter

```bash
yarn lint
yarn test
yarn type-check
```

### 6. Commit and Push

```bash
git add .
git commit -m "feat: add new feature X"
git push origin feature/new-feature
```

### 7. Create a Pull Request

Go to GitHub and create a PR describing your changes.

### Style Guidelines

- **TypeScript**: Strict mode enabled
- **React**: Functional components + hooks
- **Commits**: [Conventional Commits](https://www.conventionalcommits.org/)
  - `feat:` New feature
  - `fix:` Bug fix
  - `docs:` Documentation changes
  - `style:` Formatting, semicolons, etc.
  - `refactor:` Code refactoring
  - `test:` Add tests
  - `chore:` Maintenance tasks
- **Branches**: `feature/`, `bugfix/`, `hotfix/`

### Code Review Checklist

- [ ] Code passes all tests
- [ ] Code passes linter without warnings
- [ ] TypeScript has no errors
- [ ] Components have propTypes/interfaces
- [ ] Unit tests were added
- [ ] Documentation was updated
- [ ] Commit follows Conventional Commits

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 DesignBetter Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
```

---

## Authors

- Pablo Méndez
- Roberto Nájera
- Luis Palacios
- André Pivaral

---

## Acknowledgments

- Next.js and React community
- Vercel for excellent hosting
- All open-source dependency maintainers
- Project contributors

---

## Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [Vitest Guide](https://vitest.dev/guide/)
- [Cypress Documentation](https://docs.cypress.io/)

---

## Roadmap

- [ ] Migration to Next.js 15
- [ ] Implement React Server Components
- [ ] PWA (Progressive Web App)
- [ ] Offline mode
- [ ] Push notifications
- [ ] Internationalization (i18n)
- [ ] Dark/light theme
- [ ] Storybook for components

---

<div align="center">


</div>