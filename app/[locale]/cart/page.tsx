"use client"
import { IoCloseOutline } from "react-icons/io5";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/CartContext";
import { useTranslations } from 'next-intl';

export default function CartPage() {
    const {items, removeItem} = useCart()
    const t = useTranslations('cart');
    
    if (items.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
                <h1 className="text-2xl font-medium">{t('empty')}</h1>
                <Link className="mt-4" href="/">
                    <button className="bg-zinc-100 text-black px-4 py-2 rounded-3xl hover:bg-zinc-50">
                        {t('continueShopping')}
                    </button>
                </Link>
            </div>
        )
    }
    
    return (
        <div className="lg:grid lg:grid-cols-2 gap-4 max-w-screen-xl mx-auto mt-10 lg:mt-20">
            {/* Cart items section*/}
            <div className="col-span-1">
                <div className="flex flex-col gap-4 md:ml-20">
                    {[...items].reverse().map((item) => (
                        <div className="flex flex-row gap-4 p-2 border-t">
                            <img src={item.image || ''} alt={item.name} className="w-20 h-auto" />
                            <div className="basis-2/3">
                                <div className="flex flex-col gap-4">
                                    <div key={item.id}>
                                        <Link href={`/products/${item.id}`}>
                                            <p className="hover:underline cursor-pointer">{item.name}</p>
                                        </Link>
                                    </div>
                                    <p>{item.price}</p>
                                    <p>{t('quantity')}: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="basis-1/3 flex justify-end">
                                <p className="hover:underline cursor-pointer my-auto"
                                        onClick={() => removeItem(item)}>{t('remove')}
                                </p>
                            </div>
                        </div>
                    ))}
                    
                </div>  
             </div>

             {/* Checkout section*/}
             {items.length > 0 && (
             <div className="col-span-1 md:w-1/2 mt-20 lg:mt-0 mx-4 md:ml-20">
                <div className="flex mb-2 justify-between">
                    <span>{t('subtotal')} </span>
                    <span>{items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)} €</span>
                </div>
                <div className="flex mb-4 justify-between">
                    <span>{t('shipping')} </span>
                    <span>{t('free')}</span>
                </div>
                <div className="flex mb-4 justify-between border-t pt-2">
                    <span>{t('total')} </span>
                    <span>{items.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)} €</span>
                </div>
                <div className="flex justify-center mt-10">
                    <Link href="/checkout">
                        <button className="w-80 bg-zinc-100 text-black px-4 py-2 rounded-3xl hover:bg-zinc-50">
                            {t('checkout')}
                        </button>
                    </Link>
                </div>
             </div>
            )}
        </div>
    )
}