import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { WalletProvider } from '@/context/WalletContext';
import { Toaster } from '@/components/ui/toaster';
// import StarfieldBackground from '@/components/StarfieldBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AGIforge - Decentralized AI Model Platform',
  description: 'A decentralized platform for AI model sharing and collaboration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <WalletProvider>
            {/* <StarfieldBackground /> */}
            <div className="flex flex-col min-h-screen relative z-30">
              <Navbar />
              <main className="flex-grow pt-16">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}