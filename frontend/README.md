# Roy's Shack Est. 1888 — Frontend

Modern, multilingual pharmacy webshop built with Angular 21.

## Tech stack

- **Framework:** Angular 21 (standalone components)
- **Language:** TypeScript 5.9
- **Styling:** CSS Custom Properties (light/dark theming)
- **i18n:** ngx-translate (Hungarian, English, German)
- **State:** Angular Signals + RxJS
- **Testing:** Vitest (unit) + Cypress (E2E)
- **Backend:** C# .NET custom HTTP server (port 90)
- **Database:** MariaDB

## Features

- Product catalog with filtering, sorting, search, and pagination
- Three-language support with automatic currency switching (HUF/USD/EUR)
- Dark/light theme with localStorage persistence
- User authentication (two-step email confirmation)
- Shopping cart with guest checkout support
- Forum/blog with categories, search, and comments
- Admin panel (users, orders, products, image management)
- Responsive design (mobile, tablet, desktop)
- Scroll reveal animations
- Skeleton loading states

## Getting started

### Prerequisites

- Node.js 20+
- npm 11+
- Backend server running on port 90

### Install and run

```bash
npm install
ng serve
```

Open http://localhost:4200

### Production build

```bash
ng build -c production
```

Output: `dist/frontend/browser/`

### Run tests

```bash
# Unit tests (Vitest)
ng test

# E2E tests (Cypress) — requires ng serve running
npx cypress open
```

## Project structure

src/
├── app/
│ ├── core/ # Services, models, guards, interceptors, constants
│ ├── pages/ # Route-level page components
│ └── shared/ # Reusable components, directives, pipes
├── assets/
│ ├── i18n/ # Translation files (hu/en/de.json)
│ ├── icons/ # Icon set (.webp)
│ ├── fonts/ # Inconsolata font
│ └── products/ # Product images
├── environments/ # Dev/prod config
└── styles/ # Global CSS, variables, themes

## Team

- **Frontend:** Kaponyi Benedek Péter — Angular
- **Backend:** Kerepesi Áron — C# Servo
- **Database:** Katona Roland — MariaDB

## License

Educational project — KKK Software Developer & Tester exam (vizsgaremek).
