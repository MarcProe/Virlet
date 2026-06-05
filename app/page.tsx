'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen p-8 bg-neumorphism-base">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="neumorphism-h1">
            Virlet
          </h1>
          <p className="neumorphism-body text-neumorphism-secondary">
            Instagram Creator Analytics & Management
          </p>
        </header>

        <div className="neumorphism-card">
          <h2 className="neumorphism-h2 mb-6">
            Hello, World! 👋
          </h2>
          <p className="neumorphism-body mb-6">
            Welcome to Virlet! This is a boilerplate Next.js application with 
            App Router, Neumorphism design, and dark mode enabled.
          </p>
          <p className="neumorphism-muted mb-8">
            The app is ready for Instagram creator analytics and management.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="neumorphism-btn neumorphism-btn-primary"
              type="button"
            >
              Count: {count}
            </button>
            <span className="neumorphism-muted">
              Click the button to test interactivity
            </span>
          </div>
        </div>

        <footer className="mt-12 text-center">
          <p className="neumorphism-muted">
            © {new Date().getFullYear()} Virlet. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}
