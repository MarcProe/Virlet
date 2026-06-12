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

export default function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    // Check system preference for dark mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? darkTheme : lightTheme);
  }, []);

  useEffect(() => {
    // Update document class when theme changes
    document.documentElement.classList.toggle('dark', theme === darkTheme);
  }, [theme]);

  return (
    <>
      <Head>
        <title>Virlet</title>
        <meta name="description" content="Instagram Creator Analytics & Management" />
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
        `}</style>
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}
