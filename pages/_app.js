import { Space_Mono, JetBrains_Mono } from 'next/font/google';
import Head from 'next/head';
import '../styles/globals.css';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jetbrains',
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${spaceMono.variable} ${jetbrainsMono.variable}`}>
      <Head>
        <title>Virlet</title>
        <meta name="description" content="Instagram Creator Analytics & Management" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
