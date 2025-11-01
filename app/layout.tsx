import type { Metadata } from "next";
import { Geist, Geist_Mono, Scope_One, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { routing } from '@/i18n/routing';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const scopeOne = Scope_One({
  variable: "--font-scope-one",
  subsets: ["latin"],
  weight: "400",
});

const shipporiMinchoRegular = Shippori_Mincho({
  variable: "--font-shippori-mincho-regular",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Borjo - Handcrafted Leather Goods",
  description: "Discover our collection of handmade leather goods — crafted with care, precision and style.",
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${scopeOne.variable} ${shipporiMinchoRegular.variable} antialiased min-h-screen flex flex-col`}
      >
        {children}
      </body>
    </html>
  );
}
