export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-600 dark:text-teal-400">
            Virlet
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Instagram Creator Analytics & Management
          </p>
        </header>

        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Hello, World! 👋
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Welcome to Virlet! This is a boilerplate Next.js application.
          </p>
          <p className="text-gray-500 dark:text-gray-400">
            The app is ready for Instagram creator analytics and management.
          </p>
        </div>

        <footer className="mt-8 text-center text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Virlet. All rights reserved.</p>
        </footer>
      </div>
    </main>
  )
}
