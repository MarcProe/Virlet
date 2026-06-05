import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary: Teal for Instagram/creator feel (dark mode)
        primary: {
          50: '#e0f2fe',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // Neumorphism surface colors (DARK MODE ONLY)
        surface: {
          base: '#111827',      // Dark background
          raised: '#1f2937',    // Raised elements (cards, buttons)
          pressed: '#374151',   // Pressed/inset elements
          border: '#374151',    // Borders
        },
        // Text colors (DARK MODE ONLY)
        text: {
          primary: '#f9fafb',   // Main text
          secondary: '#9ca3af', // Secondary text
          muted: '#6b7280',     // Muted text
        },
      },
      // Neumorphism box shadows for dark mode
      boxShadow: {
        'neumorphism': '4px 4px 8px rgba(0, 0, 0, 0.3), -4px -4px 8px rgba(255, 255, 255, 0.05)',
        'neumorphism-inset': 'inset 2px 2px 4px rgba(0, 0, 0, 0.3), inset -2px -2px 4px rgba(255, 255, 255, 0.05)',
        'neumorphism-hover': '6px 6px 12px rgba(0, 0, 0, 0.3), -6px -6px 12px rgba(255, 255, 255, 0.05)',
        'neumorphism-active': 'inset 2px 2px 4px rgba(0, 0, 0, 0.2), inset -2px -2px 4px rgba(255, 255, 255, 0.05)',
      },
      // Typography - Space Mono as primary
      fontFamily: {
        sans: ['var(--font-inter)', 'Space Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      // Border radius for neumorphism
      borderRadius: {
        'neumorphism': '12px',
        'neumorphism-sm': '8px',
      },
      // Transition for interactive elements
      transitionTimingFunction: {
        'neumorphism': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        'neumorphism': '200ms',
      },
    },
  },
  plugins: [],
}

export default config
