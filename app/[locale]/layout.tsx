import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "@/context/CartContext";
import { createClient } from '@/utils/supabase/server';
import { getCategoriesWithLocale } from '@/utils/supabase/products';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Fetch categories server-side with locale
  const supabase = await createClient();
  const categories = await getCategoriesWithLocale(supabase, locale);

  return (
    <NextIntlClientProvider messages={messages}>
      <CartProvider>
        <Navbar categories={categories} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </CartProvider>
    </NextIntlClientProvider>
  );
}

