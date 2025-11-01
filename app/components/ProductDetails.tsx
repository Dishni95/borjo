"use client"

import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Product } from "@/types"
import { useCart } from "@/context/CartContext";
import { PiHeartStraightLight } from "react-icons/pi";
import { MdOutlineCheck } from "react-icons/md";
import { useTranslations } from 'next-intl';



export default function ProductDetails({ product }: { product: Product }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const {addItem, items} = useCart();
    const router = useRouter();
    const t = useTranslations('product');

    const isInCart = items.some(item => item.id === product.id);

    const handleAddToCart = async () => {
        if (isInCart) {
            router.push('/cart');
            return;
        }
        
        addItem({
            id: product.id, 
            name: product.name, 
            price: product.product_item[0].price.toString(), 
            quantity: 1, 
            image: product.product_images[0].public_url
        });

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-xl mx-auto lg:mt-10">
            {/* Mobile: snap slider */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-2 lg:hidden">
                {product.product_images.map((image, index) => (
                <img
                    key={index}
                    src={image.public_url || ''}
                    alt={`${product.name} ${index + 1}`}
                    className="snap-center w-full flex-shrink-0 object-contain"
                    style={{ maxHeight: '80vh' }}
                />
                ))}
            </div>

            {/* Thumbnail column */}
            <div className="hidden lg:flex gap-2 justify-center">
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

            <div className="lg:pr-20 lg:pl-10 mt-10 lg:mt-0 mx-4 lg:mx-0">
                <h1 className="text-2xl font-medium">{product.name}</h1>
                <p className="text-black mt-4">{product.details}</p>
                <p className="text-black text-xl mt-8">{product.product_item[0].price} €</p>
                <div className="flex items-center gap-2 mt-10 lg:mt-20">
                    <button 
                        onClick={handleAddToCart}
                        className="bg-zinc-100 text-black px-4 py-2 rounded-3xl hover:bg-zinc-50 w-full lg:w-auto
                        transition-all disabled:opacity-70 min-w-[140px] flex items-center justify-center gap-2"
                    >
                       { showSuccess ? (
                            <>
                                <MdOutlineCheck className="" />
                                <span>{t('addToBag')}</span>
                            </>
                        ) : isInCart ? (
                            <>
                                <span>{t('addToBag')}</span>
                            </>
                        ) : (
                            t('addToBag')
                        )}
                    </button>
                    <button className="bg-zinc-100 rounded-full transition-all px-2 py-2 hover:bg-zinc-50">
                        <PiHeartStraightLight size={25} />
                    </button>
                </div>

                <div className="mt-10">
                    <p className="text-black">{product.composition}</p>
                    <p className="text-black">{t('madeIn')} {product.madein}</p>
                </div>

                <div>
                    <p className="text-black text-sm mt-4">Estimated delivery: 7-10 days</p>
                </div>
            </div>
        </div>
    )
}