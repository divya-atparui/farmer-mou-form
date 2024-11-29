# Farmers MOUs Form Application

## Overview
A web application for managing and tracking carbon credits through land details registration. The application supports multilingual interfaces (English and Kannada) and provides a comprehensive form system for land owners, property details, and witness information.

## Features
- 🔐 User Authentication (Login/Register)
- 🌍 Multilingual Support (English/Kannada)
- 📝 Land Details Management
  - Bank Account Information
  - Land Owner Details
  - Property Information
  - Witness Records
- 🎯 Form Validation using Zod
- 🎨 Modern UI with Tailwind CSS
- 🔄 Real-time Form Updates

## Tech Stack
- **Frontend Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **State Management**: 
  - React Query (TanStack Query) for server state
  - React Context for app state
- **Styling**: 
  - Tailwind CSS
  - Shadcn UI Components
- **Form Management**: 
  - React Hook Form
  - Zod for validation
- **HTTP Client**: Axios
- **UI Components**:
  - Lucide React for icons
  - Sonner for toast notifications

## Recent Updates

### Land Details Management Enhancement (Latest)
- **Individual Land Details Page**
  - Dynamic routing with `/land-details/[id]` structure
  - Detailed view for each land record
  - Interactive data tables using @tanstack/react-table

- **Improved Navigation**
  - Restructured navigation components in dedicated `/nav` directory
  - New NavUser component with avatar and dropdown menu
  - Enhanced AppSidebar with improved layout and user section

- **API & Data Management**
  - Added cache revalidation for better data freshness
  - Implemented individual land details API endpoints
  - Improved error handling and removed debug logs
  - Production API endpoint configuration

- **New Dependencies**
  - @radix-ui/react-avatar: ^1.1.1 (User avatars)
  - @tanstack/react-table: ^8.20.5 (Data tables)

## Getting Started

First, install the dependencies:
```bash
npm install
# or
yarn install
```

Then, run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure
```
src/
├── api/          # API integration and hooks
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── contexts/     # React contexts (Language, etc.)
├── lib/          # Utility functions
├── messages/     # Internationalization files
└── types/        # TypeScript type definitions
```

## Future Improvements
- [ ] Add comprehensive error handling
- [ ] Implement data caching strategy
- [ ] Add unit and integration tests
- [ ] Enhance form validation rules
- [ ] Add data export functionality
- [ ] Implement document upload feature
- [ ] Add admin dashboard
- [ ] Enhance security measures

## Deployment
The application can be deployed using [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
