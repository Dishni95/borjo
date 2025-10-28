"use client"
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import { RiArrowUpWideLine } from "react-icons/ri";

const Footer = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    return (
        <footer className="bg-gray-100 border-t rounded-t-3xl border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 pt-8 pb-4">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Customer Service */}
                    <div className="border-b md:border-b-0 pb-4 md:pb-0">
                        <button 
                            onClick={() => toggleSection('customer')}
                            className="flex justify-between items-center w-full md:cursor-default"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4 md:mb-4">Customer Service</h3>
                            <span className="md:hidden text-gray-600 transition-transform duration-300">
                                {openSection === 'customer' ? <RiArrowUpWideLine size={20} /> : <RiArrowDownWideLine size={20} />}
                            </span>
                        </button>
                        <div className={`grid transition-all duration-300 ease-in-out md:block ${openSection === 'customer' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:opacity-100 md:grid-rows-[1fr]'}`}>
                            <div className="overflow-hidden">
                            <ul className="space-y-2 text-sm text-gray-600 mb-4">
                                <li><Link href="/contact" className="hover:text-gray-900">Contact Us</Link></li>
                                <li><Link href="/shipping" className="hover:text-gray-900">Shipping Info</Link></li>
                                <li><Link href="/returns" className="hover:text-gray-900">Returns</Link></li>
                                <li><Link href="/faq" className="hover:text-gray-900">FAQ</Link></li>                            
                            </ul>
                            <div className="flex flex-wrap items-center gap-4">
                                <Image src="/paymentmethods/Visa.png" alt="Visa" width={30} height={30} className="object-contain" />
                                <Image src="/paymentmethods/Mastercard.png" alt="Mastercard" width={30} height={30} className="object-contain" />
                                <Image src="/paymentmethods/PayPal.png" alt="PayPal" width={30} height={30} className="object-contain" />
                                <Image src="/paymentmethods/ApplePay.png" alt="Apple Pay" width={30} height={30} className="object-contain" />
                            </div>
                            </div>
                        </div>
                    </div>

                    {/* Legal & Compliance */}
                    <div className="border-b md:border-b-0 pb-4 md:pb-0">
                        <button 
                            onClick={() => toggleSection('legal')}
                            className="flex justify-between items-center w-full md:cursor-default"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4 md:mb-4">Legal</h3>
                            <span className="md:hidden text-gray-600 transition-transform duration-300">
                                {openSection === 'legal' ? <RiArrowUpWideLine size={20} /> : <RiArrowDownWideLine size={20} />}
                            </span>
                        </button>
                        <div className={`grid transition-all duration-300 ease-in-out md:block ${openSection === 'legal' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:opacity-100 md:grid-rows-[1fr]'}`}>
                            <div className="overflow-hidden">
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/terms" className="hover:text-gray-900">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                            <li><Link href="/cookies" className="hover:text-gray-900">Cookie Policy</Link></li>
                        </ul>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info */}
                    <div className="border-b md:border-b-0 pb-4 md:pb-0">
                        <button 
                            onClick={() => toggleSection('contact')}
                            className="flex justify-between items-center w-full md:cursor-default"
                        >
                            <h3 className="font-semibold text-gray-900 mb-4 md:mb-4">Contact</h3>
                            <span className="md:hidden text-gray-600 transition-transform duration-300">
                                {openSection === 'contact' ? <RiArrowUpWideLine size={20} /> : <RiArrowDownWideLine size={20} />}
                            </span>
                        </button>
                        <div className={`grid transition-all duration-300 ease-in-out md:block ${openSection === 'contact' ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 md:opacity-100 md:grid-rows-[1fr]'}`}>
                            <div className="overflow-hidden">
                        <div className="text-sm text-gray-600 space-y-2">
                            <p>Email: info@borjo.com</p>
                            <p>Phone: +49 (0) 123 456 789</p>
                            <p>Mon-Fri: 9:00-18:00 CET</p>
                            <div className="mt-4">
                                <p className="font-semibold mb-1">Address:</p>
                                <p>Musterstraße 123</p>
                                <p>12345 Berlin, Germany</p>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>

                    {/* Company Info & Logo - Last on mobile, first on desktop */}
                    <div className="order-last md:col-span-1">
                        
                        <p className="text-gray-600 text-sm mb-4">
                            Handcrafted premium leather goods with timeless elegance and modern functionality.
                        </p>
                        <div className="flex items-center justify-between gap-4"> 
                            <Link href="/" className="flex items-center mb-4">
                                <Image 
                                    src="/logo/Borjo.png" 
                                    alt="Borjo Logo" 
                                    width={80} 
                                    height={20} 
                                    className="object-contain"
                                />
                            </Link>
                            <p className="text-gray-600 text-sm mb-4">2025 Borjo. All rights reserved.</p>
                        </div>
                       
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
