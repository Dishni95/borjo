// app/checkout/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from '@/i18n/routing';
import { useEffect } from 'react';
import EmbeddedCheckoutForm from '@/app/components/EmbeddedCheckoutForm';
import { useTranslations } from 'next-intl';

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();
  const t = useTranslations('checkout');

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto mt-20 text-center">
        <p>{t('loading')}</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-10 px-4 min-h-[calc(100vh-300px)]">
      <EmbeddedCheckoutForm items={items} />
    </div>
  );
}