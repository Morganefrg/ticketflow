# TicketFlow Frontend - AI Instructions

## Project Overview
**TicketFlow** is a React + Vite ticket management application. It's a lightweight frontend for creating and displaying tickets with a simple state-based UI architecture. The app is in early development stages (French comments indicate this is a learning/development project).

## Architecture & Key Patterns

### Tech Stack
- **React 19** with Hooks (useState for state management - no Redux/Context yet)
- **Vite 7** for build & dev server with HMR
- **No TypeScript** (uses JSX directly in .jsx files)
- **Mock data** in [mockTickets.js](src/mockTickets.js) - hardcoded tickets for development

### State Management Approach
All state lives in [App.jsx](src/App.jsx) as React component state:
- `tickets`: array of `{id, title}` objects
- `title`: current input field value
- Uses `useState` hook exclusively - **no Context API or external state management**

### Component Structure
- **Single component**: [App.jsx](src/App.jsx) - currently monolithic, contains input, button, and ticket list
- **Data flow**: Linear from mockTickets → state → UI rendering
- **No child components yet** - all logic in App component

### Ticket Model
```javascript
{ id: number, title: string }
```
- `id`: generated as `Date.now()` when creating new tickets
- `title`: user input text

## Developer Workflows

### Essential Commands
```bash
npm run dev        # Start dev server (Vite HMR enabled)
npm run build      # Create production build
npm run lint       # ESLint check
npm run preview    # Preview production build locally
```

### Development Pattern
1. Frontend uses Vite's fast refresh - changes appear immediately in browser
2. Mock data loads directly; no backend API integration yet
3. CSS in [App.css](src/App.css) and [index.css](src/index.css)

## Code Conventions & Notes

### French Comments in Code
The codebase uses **French comments and variable names** (e.g., "Zone de créqation d'un ticket"). Preserve this for consistency with existing code.

### Current Issues to Be Aware Of
- Input placeholder has duplicate comment lines (line 17-18 in App.jsx)
- Comment on line 30-31 has typo `ticket.map((ticket))` before correct line
- App has UI bugs: no delete functionality, no persistence, no error handling for empty titles

### ESLint Configuration
- Uses [@eslint/js](https://eslint.org/) with React plugin rules
- Check [eslint.config.js](eslint.config.js) for exact rules
- React Hooks plugin enabled but React Compiler NOT enabled (performance consideration noted in README)

## Integration Points (Future)
When expanding this project:
- **No backend API yet** - will need to add fetch/axios calls to replace mockTickets
- **No routing** - currently single page (React Router may be added later)
- **No form validation** - currently accepts any input including empty strings
- **No UI library** - using inline styles, may want to add Tailwind or Material-UI

## Important Patterns to Follow

### Adding Features
1. Keep state in App.jsx until multiple components need shared state
2. Use React Hooks exclusively (useState, useEffect, etc.)
3. Test with mock data first before connecting to any backend
4. Maintain French naming/comments for consistency

### When Refactoring
- Extract components from App.jsx when single component becomes too large (>200 lines)
- Consider Context API or state management only if prop drilling becomes problematic
- Keep CSS inline (style props) or in adjacent CSS files

## File Reference Guide
- **App.jsx** → Main component, all state & logic
- **mockTickets.js** → Initial data source
- **vite.config.js** → Build configuration
- **eslint.config.js** → Linting rules
- **index.css** + **App.css** → Global and component styles
