import { useState, useEffect } from 'react';
import Head from 'next/head';

// Design tokens from .typeui/DESIGN.md
const lightTheme = {
  primary: '#006666',
  secondary: '#F1F2F5',
  success: '#00A63D',
  warning: '#FE9900',
  danger: '#FF2157',
  surface: '#E7E5E4',
  text: '#1E2938',
  neutral: '#E7E5E4',
  background: '#F1F2F5',
};

const darkTheme = {
  primary: '#00A3A3',
  secondary: '#1E1E1E',
  success: '#00D4AA',
  warning: '#FFB347',
  danger: '#FF5E8A',
  surface: '#2D2D2D',
  text: '#E0E0E0',
  neutral: '#3A3A3A',
  background: '#1E1E1E',
};

// Neumorphic shadow styles
const getNeumorphicStyles = (theme) => ({
  boxShadow: `5px 5px 10px ${theme.neutral}, -5px -5px 10px ${theme.surface}`,
  borderRadius: '8px',
  backgroundColor: theme.surface,
  color: theme.text,
  border: 'none',
  transition: 'all 0.3s ease',
});

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setTheme(darkTheme);
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    setTheme(isDark ? lightTheme : darkTheme);
  };

  return (
    <>
      <Head>
        <title>Virlet - Instagram Creator Analytics</title>
        <meta name="description" content="Track, analyze, and optimize Instagram performance" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
        <style jsx global>{`
          :root {
            --primary: ${lightTheme.primary};
            --secondary: ${lightTheme.secondary};
            --success: ${lightTheme.success};
            --warning: ${lightTheme.warning};
            --danger: ${lightTheme.danger};
            --surface: ${lightTheme.surface};
            --text: ${lightTheme.text};
            --neutral: ${lightTheme.neutral};
            --background: ${lightTheme.background};
          }
          
          .dark {
            --primary: ${darkTheme.primary};
            --secondary: ${darkTheme.secondary};
            --success: ${darkTheme.success};
            --warning: ${darkTheme.warning};
            --danger: ${darkTheme.danger};
            --surface: ${darkTheme.surface};
            --text: ${darkTheme.text};
            --neutral: ${darkTheme.neutral};
            --background: ${darkTheme.background};
          }
          
          * {
            font-family: 'Space Mono', monospace;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            background-color: var(--background);
            color: var(--text);
            min-height: 100vh;
            transition: background-color 0.3s ease, color 0.3s ease;
          }
          
          .neumorphic {
            box-shadow: 5px 5px 10px var(--neutral), -5px -5px 10px var(--surface);
            border-radius: 8px;
            background-color: var(--surface);
            color: var(--text);
            border: none;
            padding: 1rem;
            transition: all 0.3s ease;
          }
          
          .neumorphic:hover {
            box-shadow: 3px 3px 8px var(--neutral), -3px -3px 8px var(--surface);
          }
          
          .neumorphic:active {
            box-shadow: inset 2px 2px 5px var(--neutral), inset -2px -2px 5px var(--surface);
          }
          
          .theme-toggle {
            position: fixed;
            top: 1rem;
            right: 1rem;
            z-index: 1000;
          }
        `}</style>
      </Head>
      
      <button 
        className="theme-toggle neumorphic"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {isDark ? '☀️' : '🌙'}
      </button>
      
      <Component {...pageProps} theme={theme} isDark={isDark} />
    </>
  );
}
