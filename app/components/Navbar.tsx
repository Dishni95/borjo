"use client"

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { TbMenu } from "react-icons/tb";
import { IoCloseOutline } from "react-icons/io5";
import { PiHeartStraightLight } from "react-icons/pi";
import { PiHandbagSimpleLight } from "react-icons/pi";
import Link from "next/link";
import { Category } from "@/types";
import useCategories from "@/hooks/useMenu";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {items} = useCart()
    const { categories, loading } = useCategories();
    const cartItemCount = items.reduce((total, item) => total + item.quantity, 0)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    
    return (
        <>
            <nav className="sticky h-30 top-0 z-50 bg-white">
                <div className="flex h-14 lg:mt-4 justify-between items-center p-4 max-w-screen-xl mx-auto">
                    {/* Left section - Mobile menu + Desktop navigation */}
                    <div className="flex h-14 items-center gap-4">
                        <div className="lg:hidden pr-2 pt-1">
                            <button 
                                onClick={toggleMenu} 
                                className="text-gray-950 focus:outline-none mt-2 relative z-50"
                                aria-label={isOpen ? "Close menu" : "Open menu"}
                            >
                                <TbMenu className={`h-8 w-8 transition-opacity duration-200 ${isOpen ? 'opacity-0 absolute' : 'opacity-100'}`} />
                                <IoCloseOutline className={`h-8 w-8 transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0 absolute'}`} />
                            </button>
                        </div>
                    </div>   
                    
                    {/* Center section - Logo */}
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link href="/" className="flex z-40 px-3 py-2">
                            <img src="/logo/Borjo.png" alt="Logo" className="h-12 w-48 mt-4 lg:w-40 object-contain" />
                        </Link>
                    </div>

                    {/* Right section - Cart, Favs & Profile */}
                    <div className="flex h-14 lg:mr-4 items-center mt-2">
                        <Link href="/favourite">
                            <div className="relative p-2 lg:mr-2 lg:p-2 mt-1 hover:bg-zinc-100 rounded-3xl transition-all">
                                <PiHeartStraightLight size={25} />
                            </div>
                        </Link>
                        <Link href="/cart">
                            <div className="relative p-2 lg:p-2 mt-1.5 hover:bg-zinc-100 rounded-3xl transition-all">
                                <PiHandbagSimpleLight size={25}/>
                                {cartItemCount > 0 && (
                                    <span className="absolute top-5 right-5 bg-zinc-100 text-black rounded-full text-xs w-5 h-5 text-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>
                
                {/* Desktop categories menu */}
                <div className="bg-white pb-4 mt-6 max-w-screen-xl mx-auto hidden lg:block">
                    <ul className="flex space-x-8 text-2xl font-normal mt-0">
                        {categories.map((category: Category) => (
                            <Link href={`/products?category=${category.id}`} key={category.id}>
                                <li className="hover:font-bold transition-all ease-in-out">{category.category_name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
            </nav>
            
            {/* Mobile categories menu - Full screen overlay */}
            <div 
                className={`
                    fixed inset-0 top-10 bg-white z-40 lg:hidden
                    transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                `}
            >
                <ul className="flex flex-col p-8 pt-20 space-y-6">
                    {categories.map((category: Category) => (
                        <Link 
                            href={`/products?category=${category.id}`} 
                            key={category.id}
                            onClick={() => setIsOpen(false)}
                        >
                            <li className="text-2xl py-2 hover:font-bold transition-all ease-in-out">
                                {category.category_name}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Navbar