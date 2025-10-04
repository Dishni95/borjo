"use client"
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

const ProductCard = ( { product }: ProductCardProps) => {

    const display_image = product.product_images[0].public_url

    return (
        <Link href={`/products/${product.id}`}>
        <div 
            className={`cursor-pointer transition-all duration-300 ease-in-out}`}
        >   
            
            <div className="bg-white overflow-hidden">
                <div className="relative w-full lg:h-full h-64">
                    <img
                        src={display_image || ''}
                        alt={product.name}
                        className="w-full object-cover"
                    />
                </div>
                <div className="p-0">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm">{product.product_item[0].price}</p>
                </div>
            </div>
            
        </div>
        </Link>
    );
};

export default ProductCard;
