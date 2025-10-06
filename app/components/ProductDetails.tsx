"use client"

import { useState } from "react";
import { Product } from "@/types"
import { useCart } from "@/context/CartContext";
import { PiHeartStraightLight } from "react-icons/pi";



export default function ProductDetails({ product }: { product: Product }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const {addItem, removeItem} = useCart()

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 space-x-4 max-w-screen-xl mx-auto mt-20">
            <div className="flex gap-2 ">
                {/* Thumbnail column */}
                <div className="flex flex-col gap-2 w-24  ">
                    {product.product_images.map((image, index) => (
                        <img
                            key={index}
                            src={image.public_url || ''}
                            alt={`${product.name} ${index + 1}`}
                            className={`w-full h-20 object-cover cursor-pointer border-2 transition-all ${
                                selectedImageIndex === index 
                                    ? 'border-gray-800' 
                                    : 'border-gray-200 hover:border-gray-400'
                            }`}
                            onMouseEnter={() => setSelectedImageIndex(index)}
                        />
                    ))}
                </div>

                {/* Main image */}
                <div className="">
                    <img 
                        src={product.product_images[selectedImageIndex]?.public_url || ''} 
                        className="w-full object-contain"
                        style={{ maxHeight: '80vh' }}
                        alt={product.name} 
                    />
                </div>
            </div>

            <div className="lg:pr-20 lg:pl-10">
                <h1 className="text-2xl font-medium">{product.name}</h1>
                <p className="text-black mt-4">{product.details}</p>
                <p className="text-black text-xl mt-10">{product.product_item[0].price}</p>
                <div className="flex items-center gap-2 mt-10">
                    <button onClick={() => 
                        addItem({id: product.id, name: product.name, price: product.product_item[0].price.toString(), quantity: 1, image: product.product_images[0].public_url})} 
                        className="bg-zinc-100 text-black px-4 py-2 rounded-3xl hover:bg-zinc-50">Add to cart</button>
                    <button className="bg-zinc-100 rounded-full transition-all px-2 py-2 hover:bg-zinc-50">
                        <PiHeartStraightLight size={25} />
                    </button>
                </div>

                <div className="mt-10">
                    <p className="text-black">{product.composition}</p>
                    <p className="text-black">Handmade in {product.madein}</p>
                </div>

                <div>
                    <p className="text-black text-sm mt-4">Estimated delivery: 7-10 days</p>
                </div>
            </div>
        </div>
    )
}