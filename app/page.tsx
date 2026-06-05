'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen p-8" style={{ backgroundColor: '#111827', color: '#f9fafb' }}>
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4" style={{ color: '#38bdf8' }}>
            Virlet
          </h1>
          <p className="text-xl mb-12" style={{ color: '#d1d5db' }}>
            Instagram Creator Analytics & Management
          </p>
        </header>

        <section className="rounded-xl p-8 shadow-lg" style={{ backgroundColor: '#1f2937', border: '1px solid #374151' }}>
          <h2 className="text-2xl font-semibold mb-6" style={{ color: '#f9fafb' }}>
            Hello, World! 👋
          </h2>
          <p className="mb-6" style={{ color: '#9ca3af' }}>
            Welcome to Virlet! This is a boilerplate Next.js application with 
            App Router, Tailwind CSS, and dark mode enabled.
          </p>
          <p className="mb-8" style={{ color: '#9ca3af' }}>
            The app is ready for Instagram creator analytics and management.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount((c) => c + 1)}
              style={{
                backgroundColor: '#0284c7',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                border: 'none'
              }}
              type="button"
            >
              Count: {count}
            </button>
            <span style={{ color: '#9ca3af' }}>
              Click the button to test interactivity
            </span>
          </div>
        </section>

        <footer className="mt-12 text-center" style={{ color: '#6b7280' }}>
          <p>© {new Date().getFullYear()} Virlet. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
