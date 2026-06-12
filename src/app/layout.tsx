import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import LayoutProvider from '@/components/layout/layout-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'FlexPass - Multi-Gym Subscription Platform',
  description: 'Ghar ke paas, office ke paas, hometown mein - one subscription, 75+ premium gyms.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable} font-sans h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors">
        <AuthProvider>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
