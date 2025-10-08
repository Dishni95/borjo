// app/checkout/return/page.tsx
'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

function ReturnContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { items } = useCart();
  const [status, setStatus] = useState<string | null>(null);
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      router.push('/cart');
      return;
    }

    fetch(`/api/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.payment_status);
        setCustomerEmail(data.customer_email || '');
        
        // Clear cart on successful payment
        if (data.payment_status === 'paid') {
          localStorage.removeItem('cart');
        }
      })
      .catch((error) => console.error('Error:', error));
  }, [searchParams, router]);

  if (status === 'paid') {
    return (
      <div className="max-w-screen-xl mx-auto mt-20 px-4 text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 max-w-2xl mx-auto">
          <svg
            className="w-16 h-16 text-green-500 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-3xl font-bold mb-4 text-green-800">
            Payment Successful!
          </h1>
          <p className="text-gray-700 mb-2">
            Thank you for your purchase. Confirmation email has been sent to:
          </p>
          <p className="font-semibold text-gray-900 mb-6">{customerEmail}</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl mx-auto mt-20 px-4 text-center">
      <div className="animate-pulse">
        <p className="text-gray-600">Processing your payment...</p>
      </div>
    </div>
  );
}

export default function ReturnPage() {
  return (
    <Suspense fallback={
      <div className="max-w-screen-xl mx-auto mt-20 px-4 text-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    }>
      <ReturnContent />
    </Suspense>
  );
}