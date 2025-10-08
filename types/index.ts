export interface Category {
    id: number;
    parent_id: number;
    category_name: string;
}

export interface Product {
  id: number;
  parent_id: number;
  category_id: number;
  name: string;
  description: string;
  details: string;
  composition: string;
  madein: string;
  product_images: ProductImage[];
  product_item: ProductItem[];
}

interface ProductImage {
    id: number;
    file_path: string;
    public_url: string | null;
    position?: number;
  }
  
interface ProductItem {
    id: number;
    products: Product;
    sku: string;
    stock: number;
    size: string;
    price: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
  image: string | null;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (id: CartItem) => void;
  removeItem: (id: CartItem) => void;
  clearCart: () => void;
}


export interface Order {
  id: string;
  created_at: string;
  updated_at: string;
  stripe_session_id: string;
  stripe_payment_intent_id: string | null;
  stripe_customer_id: string | null;
  customer_email: string | null;
  customer_name: string | null;
  total_amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'paid' | 'failed' | 'cancelled';
  shipping_address: any;
  metadata: any;
}

export interface OrderItem {
  id: string;
  created_at: string;
  order_id: string;
  product_id: number | null;
  product_item_id: number | null;
  product_name: string;
  sku: string | null;
  size: string | null;
  price: number;
  quantity: number;
  subtotal: number;
}