// app/api/create-checkout-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/app/lib/stripe';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      );
    }

    // Calculate total and prepare line items
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: item.name,
          images: item.image ? [item.image] : [],
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // Convert to cents
      },
      quantity: item.quantity,
    }));

    // Extract locale from the referer header (the page that called this API)
    const referer = request.headers.get('referer') || '';
    const refererUrl = new URL(referer || request.url);
    const pathParts = refererUrl.pathname.split('/').filter(Boolean);
    // First part of path should be the locale (en, de, fr, ru)
    const locale = ['en', 'de', 'fr', 'ru'].includes(pathParts[0]) ? pathParts[0] : 'en';
    
    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      ui_mode: 'embedded',
      line_items: lineItems,
      mode: 'payment',
      return_url: `${request.headers.get('origin')}/${locale}/checkout/return?session_id={CHECKOUT_SESSION_ID}`,
      automatic_tax: { enabled: true },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'FR', 'DE', 'ES', 'IT', 'NL', 'BE'],
      },
    });

    // Create order in Supabase
    const supabase = await createClient();
    const totalAmount = items.reduce(
      (sum: number, item: any) => sum + parseFloat(item.price) * item.quantity,
      0
    );

    const { data: order, error } = await supabase
      .from('orders')
      .insert({
        stripe_session_id: session.id,
        total_amount: totalAmount,
        currency: 'eur',
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating order:', error);
    } else if (order) {
      // Insert order items
      const orderItems = items.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id || null,
        product_item_id: item.id,
        product_name: item.name,
        sku: item.sku || '',
        size: item.size || '',
        price: parseFloat(item.price),
        quantity: item.quantity,
        subtotal: parseFloat(item.price) * item.quantity,
      }));

      await supabase.from('order_items').insert(orderItems);
    }

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error: any) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}