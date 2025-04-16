# Arabic Academic Articles Repository

An Arabic academic article repository website inspired by Google Scholar with search functionality and PDF downloads.

## Features

- Arabic-first design with RTL support
- Responsive design for all device sizes
- Search functionality for articles
- Category-based article browsing
- Article detail pages with full content
- PDF download functionality
- Modern, clean UI with Shadcn components

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Express.js, Node.js
- **State Management**: TanStack Query (React Query)
- **Routing**: Wouter
- **Data Validation**: Zod
- **Styling**: Tailwind CSS

## Deployment to Vercel

This project is configured for easy deployment to Vercel. Follow these steps:

1. Push your code to a GitHub repository
2. Log in to your Vercel account
3. Create a new project and import your GitHub repository
4. Vercel will automatically detect the configuration in `vercel.json`
5. Deploy your project

The application uses an in-memory database by default, which will reset on each deployment. For a production environment, consider configuring an external database.

## Development

To run the project locally:

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5000`

## Project Structure

- `/client` - Frontend React application
- `/server` - Backend Express server
- `/shared` - Shared types and schemas
- `/vercel-build.sh` - Build script for Vercel deployment
- `/vercel.json` - Vercel deployment configuration