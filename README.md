# Next.js Dynamic Blog Platform
 [Deployment](https://blog-platform-2pg5ghwed-dfdf1534gmailcoms-projects.vercel.app/)

## Overview

This is a dynamic blog platform built with Next.js, demonstrating server-side rendering (SSR), client-side rendering (CSR), and comprehensive API integration. The application provides a modern, responsive blog experience with advanced search and state management capabilities.

## 🚀 Features

- **Server-Side Rendering (SSR)**: Efficient data fetching and rendering for improved performance and SEO
- **Dynamic Blog Posts**: Individual post pages with comprehensive content display
- **Advanced Search**: Real-time blog post filtering with debounced search functionality
- **State Management**: Robust global state handling using Zustand
- **Responsive Design**: Full mobile, tablet, and desktop support using Tailwind CSS

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18.0.0 or later)
- npm (v9.0.0 or later)
- Git

## 🛠 Technology Stack

- **Framework**: Next.js 15 and React 19
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **API Integration**: Fetch API / Axios
- **Language**: TypeScript

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/nextjs-blog-platform.git
cd nextjs-blog-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the project root (if required for API configurations)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser


## 🔍 Key Components

### 1. Homepage (`pages/index.tsx`)
- Displays recent blog posts
- Implements server-side rendering
- Includes search functionality

### 2. Blog Post Page (`pages/blog/[slug].tsx`)
- Dynamic routing for individual blog posts
- Fetches post details via API
- Displays comprehensive post information

### 3. Search Functionality
- Debounced search input
- Real-time filtering of blog posts
- Optimized performance

### 4. State Management
- Zustand store for managing blog list state
- Handles search filters and loading states

## 🚧 Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Create production build
- `npm run start`: Start production server
- `npm run test`: Run tests (if configured)

## 🌐 API Integration

The project uses a mock API (JSONPlaceholder) for demonstration. In a production environment, replace with your actual backend API endpoint.

## 🎨 Styling

Tailwind CSS is used for styling, providing a utility-first approach with full responsiveness across devices.

## 📦 Dependencies

Key dependencies include:
- Next.js
- React
- Zustand
- Tailwind CSS
- TypeScript
