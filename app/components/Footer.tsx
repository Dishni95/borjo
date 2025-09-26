"use client"
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-20">
            <div className="max-w-7xl mx-auto px-4 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Company Info & Logo */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center mb-4">
                            <Image 
                                src="/logo/Borjo.png" 
                                alt="Borjo Logo" 
                                width={120} 
                                height={40} 
                                className="object-contain"
                            />
                        </Link>
                        <p className="text-gray-600 text-sm mb-4">
                            Handcrafted premium leather goods with timeless elegance and modern functionality.
                        </p>
                        <p className="text-gray-600 text-sm mb-4">2025 Borjo. All rights reserved.</p>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/contact" className="hover:text-gray-900">Contact Us</Link></li>
                            <li><Link href="/shipping" className="hover:text-gray-900">Shipping Info</Link></li>
                            <li><Link href="/returns" className="hover:text-gray-900">Returns</Link></li>
                            <li><Link href="/faq" className="hover:text-gray-900">FAQ</Link></li>                            
                        </ul>
                    </div>

                    {/* Legal & Compliance */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link href="/terms" className="hover:text-gray-900">Terms & Conditions</Link></li>
                            <li><Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link></li>
                            <li><Link href="/cookies" className="hover:text-gray-900">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
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


                {/* Payment Methods */}
                <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-900 mb-4">We Accept</h3>
                    <div className="flex flex-wrap items-center gap-4">
                        {/* Visa */}
                        <div>
                            <Image
                                src="/paymentmethods/Visa.png"
                                alt="Visa"
                                width={48}
                                height={30}
                                className="object-contain"
                            />
                        </div>
                        
                        {/* Mastercard */}
                        <div>
                            <Image
                                src="/paymentmethods/Mastercard.png"
                                alt="Mastercard"
                                width={48}
                                height={30}
                                className="object-contain"
                            />
                        </div>

                        {/* PayPal */}
                        <div>
                            <Image
                                src="/paymentmethods/PayPal.png"
                                alt="PayPal"
                                width={48}
                                height={30}
                                className="object-contain"
                            />
                        </div>

                        {/* Apple Pay */}
                        <div>
                            <Image
                                src="/paymentmethods/ApplePay.png"
                                alt="Apple Pay"
                                width={48}
                                height={30}
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
