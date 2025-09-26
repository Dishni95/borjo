"use client"

import { useState, useEffect } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { PiHeartStraightLight } from "react-icons/pi";
import { PiHandbagSimpleThin } from "react-icons/pi";
import Link from "next/link";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    return (
        <nav className="sticky h-14 top-0 z-50 bg-white">
            <div className="flex h-14 lg:mt-4 justify-between items-center p-4">
                {/* Left section - Mobile menu + Desktop navigation */}
                <div className="flex h-14 items-center gap-4">
                    <div className="lg:hidden pr-2 pt-1">
                        <button onClick={toggleMenu} className="text-gray-950 focus:outline-none">
                            <CiMenuBurger className={`h-8 w-8 ${isOpen ? 'hidden' : 'block'}`} />
                            <IoCloseOutline className={`h-8 w-8 ${isOpen ? 'block' : 'hidden'}`} />
                        </button>
                    </div>
                </div>   
                
                {/* Center section - Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link href="/mens" className="flex z-40 px-3 py-2">
                        <img src="/logo/Borjo.png" alt="Logo" className="h-12 w-48 mt-4 lg:w-40 object-contain" />
                    </Link>
                </div>

                {/* Right section - Cart, Favs & Profile */}
                <div className="flex h-14 lg:mr-4 items-center">
                    <Link href="/favourite">
                        <div className="relative p-2 lg:mr-2 lg:p-2 mt-1 hover:bg-zinc-100 rounded-3xl transition-all">
                            <PiHeartStraightLight size={25} />
                        </div>
                    </Link>
                    <Link href="/cart">
                        <div className="relative p-2 lg:p-2 mt-1 hover:bg-zinc-100 rounded-3xl transition-all">
                            <PiHandbagSimpleThin size={25}/>
                        </div>
                    </Link>
                </div>

            </div>
        </nav>
    )
}

export default Navbar