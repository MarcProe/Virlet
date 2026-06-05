'use client'

import { useState } from 'react'

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Virlet
          </h1>
          <p className="text-xl mb-12">
            Instagram Creator Analytics & Management
          </p>
        </header>

        <section className="rounded-xl p-8 shadow-lg" style={{ border: '1px solid #374151' }}>
          <h2 className="text-2xl font-semibold mb-6">
            Hello, World! 👋
          </h2>
          <p className="mb-6">
            Welcome to Virlet! This is a boilerplate Next.js application with 
            App Router, Tailwind CSS, and dark mode enabled.
          </p>
          <p className="mb-8">
            The app is ready for Instagram creator analytics and management.
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCount((c) => c + 1)}
              className="btn-primary"
              type="button"
            >
              Count: {count}
            </button>
            <span>
              Click the button to test interactivity
            </span>
          </div>
        </section>

        <footer className="mt-12 text-center">
          <p>© {new Date().getFullYear()} Virlet. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
