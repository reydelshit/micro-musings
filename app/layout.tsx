import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/components/auth-provider';
import { SiteHeader } from '@/components/site-header';

const inter = Inter({ subsets: ['latin'] });

// export const revalidate = 2;
export const fetchCache = 'force-no-store';

export const metadata: Metadata = {
  title: 'micro-musings',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={inter.className}>
          <SiteHeader />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
