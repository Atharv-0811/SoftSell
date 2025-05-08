import './globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SoftSell - The Smart Way to Sell Software Licenses',
  description: 'SoftSell helps you get the best value for your unused software licenses with a fast, secure, and transparent process.',
  keywords: 'software resale, license resale, software marketplace, sell licenses',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}