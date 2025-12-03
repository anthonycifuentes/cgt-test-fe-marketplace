# CGTRANDER Marketplace MVP

A modern e-commerce marketplace application built as a technical assessment for CGTrader.

**Live Demo:** [https://cgt-test-fe-marketplace-mu.vercel.app/](https://cgt-test-fe-marketplace-mu.vercel.app/)

## Overview

This project implements a fully functional marketplace MVP where users can browse products, filter by various criteria, manage a shopping cart, and complete checkout. The original codebase was migrated from Create React App (now deprecated) to a modern Vite-based stack with TypeScript.

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | React 19 + TypeScript |
| Build Tool | Vite 7 |
| Routing | TanStack Router |
| State Management | Zustand |
| UI Components | shadcn/ui + Radix UI |
| Styling | Tailwind CSS 4 |
| Testing | Vitest + React Testing Library |
| Deployment | Vercel |

## Architecture

The project follows **Screaming Architecture** principles, organizing code by business domain rather than technical concerns:

```
src/
├── core/                    # Shared utilities and components
│   ├── components/
│   │   ├── layout/          # Layout components (navbar)
│   │   └── ui/              # Reusable UI components (shadcn)
│   └── lib/                 # Utility functions
├── modules/                 # Feature modules
│   ├── cart/                # Cart feature
│   │   ├── components/      # Cart-specific components
│   │   ├── interfaces/      # TypeScript interfaces
│   │   ├── store/           # Zustand store
│   │   └── templates/       # Page templates
│   └── products/            # Products feature
│       ├── components/      # Product-specific components
│       ├── data/            # Mock data
│       ├── interfaces/      # TypeScript interfaces
│       ├── store/           # Filter store
│       └── templates/       # Page templates
├── routes/                  # TanStack Router routes
└── __tests__/               # Unit tests
```

## Features

- **Product Catalog**: Browse tech products with images, prices, ratings, and stock status
- **Advanced Filtering**: Filter by category, price range, rating, and availability
- **Shopping Cart**: Add/remove items, adjust quantities, view totals
- **Coupon System**: Apply discount codes at checkout
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Order Confirmation**: Success dialog with order summary

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anthonycifuentes/cgt-test-fe-marketplace.git
cd cgt-test-fe-marketplace

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production with TypeScript check |
| `npm run serve` | Preview production build |
| `npm run test` | Run unit tests |

## Development Process

This project was developed using an iterative, branch-based workflow with clear PR history:

1. **Project Setup** - Migrated from CRA to Vite with TypeScript configuration
2. **UI Foundation** - Added shadcn/ui components and Radix UI dependencies
3. **State Management** - Implemented Zustand stores for filters and cart
4. **Product Module** - Built product interfaces, components, and listing
5. **Cart Module** - Developed cart functionality with checkout flow
6. **Responsive Layout** - Added mobile-first responsive design
7. **Testing** - Wrote unit tests for stores and critical functionality

### Pull Request History

| PR | Description |
|----|-------------|
| #1 | Project setup - Vite migration and TypeScript |
| #2 | Add shadcn/ui components and Radix UI dependencies |
| #3 | Add Zustand filter store and mock product data |
| #4 | Add product and filter TypeScript interfaces |
| #5 | Add product listing UI components |
| #6 | Add product listing template and wire up home route |
| #7 | Convert marketplace to tech products |
| #8 | Add cart page and fixed navbar with backdrop blur |
| #9 | Add payment checkout functionality |
| #10 | Add responsive layout and order success dialog |
| #11 | Add unit tests for cart and filter stores |

## Key Technical Decisions

### Why Vite over Create React App?
Create React App is deprecated and no longer maintained. Vite provides faster build times, better developer experience, and compatibility with modern libraries.

### Why Screaming Architecture?
This pattern makes the codebase self-documenting by organizing code around business domains (products, cart) rather than technical layers, making it easier to navigate and maintain.

### Why Zustand over Redux?
Zustand offers a simpler API with less boilerplate while providing the same functionality for this scale of application. It integrates well with TypeScript and React 19.

### Why TanStack Router?
Type-safe routing with built-in devtools and better TypeScript integration compared to React Router.

## Testing

The project includes unit tests for critical business logic:

```bash
npm run test
```

Tests cover:
- Cart store operations (add, remove, update quantities, clear)
- Filter store state management
- Coupon application logic

## AI-Assisted Development

This project was developed with the assistance of Claude Code AI agents, which helped with:
- Code generation and refactoring
- TypeScript type definitions
- Test writing
- Documentation

---

Built by Anthony Cifuentes for CGTrader Technical Assessment
