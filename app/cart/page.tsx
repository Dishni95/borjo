"use client"
import { IoCloseOutline } from "react-icons/io5";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const {items, removeItem} = useCart()
    return (
        <div>
            {items.length === 0 ? (
                <div>
                    <h1>Cart is empty</h1>
                </div>
            ):(
                <div className="flex flex-col gap-4 max-w-screen-xl mx-auto mt-10">
                    {[...items].reverse().map((item) => (
                        <div className="flex flex-row gap-4">
                            <img src={item.image || ''} alt={item.name} className="w-20 h-auto" />
                            <div key={item.id}>
                                <p>{item.name}</p>
                            </div>
                            <p>{item.price}</p>
                            <p>{item.quantity}</p>
                            <button onClick={() => removeItem(item)}><IoCloseOutline /></button>
                        </div>
                    ))}
                    
                </div>
                
                
        )}
        </div>
    )
}