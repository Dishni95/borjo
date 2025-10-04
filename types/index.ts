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
}