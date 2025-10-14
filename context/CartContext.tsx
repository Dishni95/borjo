"use client"
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { CartItem, CartContextType } from "@/types"

interface CartProviderProps {
    children: ReactNode
}

const CartContext = createContext({} as CartContextType)


export function useCart() {
    return useContext(CartContext)
}


export function CartProvider({children}: CartProviderProps) {
    const [cartItem, setCartItem] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    //Load cart from localstorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
            try {
                setCartItem(JSON.parse(savedCart))
            } catch (error) {
                console.error('Error loading cart from localstorage:', error)
            }
        }
        setIsLoaded(true)
    }, [])

    //Save cart to localstorage onb changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('cart', JSON.stringify(cartItem))
        }
    }, [cartItem, isLoaded])

    function addItem(item: CartItem){
        setCartItem(prev => {
            const existingItem = prev.find(i => i.id === item.id)
            if (existingItem){
                return prev.map(i => i.id === item.id ? {...i, quantity: i.quantity + item.quantity} : i)
            }
            return [...prev, item]
        })
    }

    function removeItem(item: CartItem){
        setCartItem(prev => {
            return prev.filter(i => i.id !== item.id)
        })
    }
    
    function clearCart() {
        setCartItem([])
    }
    
    return (
        <CartContext.Provider value={{items: cartItem, addItem, removeItem, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}