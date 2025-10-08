// app/checkout/page.tsx
'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EmbeddedCheckoutForm from '@/app/components/EmbeddedCheckoutForm';

export default function CheckoutPage() {
  const { items } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items, router]);

  if (items.length === 0) {
    return (
      <div className="max-w-screen-xl mx-auto mt-20 text-center">
        <p>Your cart is empty. Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <EmbeddedCheckoutForm items={items} />
    </div>
  );
}