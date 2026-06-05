'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="neumorphism-page bg-[var(--bg-base)] text-[var(--text-primary)]">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="neumorphism-h1">
            Virlet
          </h1>
          <p className="neumorphism-body">
            Instagram Creator Analytics & Management
          </p>
        </header>

        <div className="neumorphism-card bg-[var(--bg-raised)] border-[var(--border-color)] text-[var(--text-primary)]">
          <h2 className="neumorphism-h2 mb-4">
            Hello, World! 👋
          </h2>
          <p className="neumorphism-body mb-4">
            Welcome to Virlet! This is a boilerplate Next.js application with 
            App Router, Neumorphism design, and dark mode enabled.
          </p>
          <p className="neumorphism-muted mb-8">
            The app is ready for Instagram creator analytics and management.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="neumorphism-btn"
              type="button"
            >
              Count: {count}
            </button>
            <span className="neumorphism-muted">
              Click the button to test interactivity
            </span>
          </div>
        </div>

        <footer className="mt-8 text-center">
          <p className="neumorphism-muted">
            © {new Date().getFullYear()} Virlet. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}
