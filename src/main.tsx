/**
 * Divine Comedy Reader Application
 * 
 * A React-based web application for reading Dante's Divine Comedy in Portuguese prose.
 * Features include:
 * - Reading all three books: Inferno, Purgatory, and Paradise
 * - Theme switching with book-specific styling
 * - Search functionality across all content
 * - Responsive design with modern UI
 * 
 * Built with: React, TypeScript, Vite, TailwindCSS
 */
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './styles/themes.css'
import App from './App'

// Initialize React application with Strict Mode enabled
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
