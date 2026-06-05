'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="neumorphism-page">
      <div style={{ maxWidth: '48rem', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="neumorphism-h1">
            Virlet
          </h1>
          <p className="neumorphism-body">
            Instagram Creator Analytics & Management
          </p>
        </header>

        <div className="neumorphism-card">
          <h2 className="neumorphism-h2" style={{ marginBottom: '1.5rem' }}>
            Hello, World! 👋
          </h2>
          <p className="neumorphism-body" style={{ marginBottom: '1.5rem' }}>
            Welcome to Virlet! This is a boilerplate Next.js application with 
            App Router, Neumorphism design, and dark mode enabled.
          </p>
          <p className="neumorphism-muted" style={{ marginBottom: '2rem' }}>
            The app is ready for Instagram creator analytics and management.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

        <footer style={{ marginTop: '3rem', textAlign: 'center' }}>
          <p className="neumorphism-muted">
            © {new Date().getFullYear()} Virlet. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}
