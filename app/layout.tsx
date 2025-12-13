import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WhisperrConnect",
  description: "The ultimate online connection platform.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0", // App-like viewport
};

import { AuthOverlay } from '@/components/auth/AuthOverlay';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthOverlay />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
