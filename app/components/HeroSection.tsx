"use client"
import Image from "next/image";
import { useState } from "react";
import ProductCard from "./ProductCard";

const categories = [
    { 
        name: "Wallets", 
        description: "Handcrafted with precision and care, our premium leather wallets combine timeless elegance with modern functionality. Each piece is meticulously designed to age beautifully while keeping your essentials organized in style.",
        products: [
            { id: "wallet3", name: "Executive Wallet", image: "/wallets/mywallet2.jpg", price: "$229" },
            { id: "wallet4", name: "Luxury Wallet", image: "/wallets/mywallet1.jpg", price: "$279" }
        ]
    },
    { 
        name: "Leather Cases", 
        description: "Expertly crafted leather cases that provide superior protection without compromising on sophistication. Our artisans use traditional techniques to create durable, luxurious cases that complement your lifestyle.",
        products: [
            { id: "case1", name: "Phone Case", image: "/leathercase1.jpg", price: "$89" }
        ]
    }
];

const HeroSection = () => {
    const [currentImage, setCurrentImage] = useState(categories[0].products[0].image);
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [currentDescription, setCurrentDescription] = useState(categories[0].description);
    const [currentProducts, setCurrentProducts] = useState(categories[0].products);
    const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
    const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
    const [categoryImage, setCategoryImage] = useState(categories[0].products[0].image);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleCategoryHover = (category: { name: string; description: string; products: any[] }) => {
        const firstProductImage = category.products[0].image;
        if (firstProductImage !== categoryImage) {
            setIsTransitioning(true);
            setTimeout(() => {
                setCategoryImage(firstProductImage);
                setCurrentImage(firstProductImage);
                setCurrentDescription(category.description);
                setCurrentProducts(category.products);
                setHoveredCategory(category.name);
                setSelectedProductId(null); // Reset selected product when switching categories
                setHoveredProductId(null); // Reset hovered product when switching categories
                setIsTransitioning(false);
            }, 150);
        } else {
            setHoveredCategory(category.name);
            setCurrentDescription(category.description);
            setCurrentProducts(category.products);
        }
    };

    const handleProductSelect = (productId: string) => {
        const selectedProduct = currentProducts.find(product => product.id === productId);
        if (selectedProduct) {
            setSelectedProductId(productId);
            setCurrentImage(selectedProduct.image);
        }
    };

    const handleProductHover = (productId: string) => {
        const hoveredProduct = currentProducts.find(product => product.id === productId);
        if (hoveredProduct) {
            setHoveredProductId(productId);
            setCurrentImage(hoveredProduct.image);
        }
    };

    const handleProductLeave = () => {
        setHoveredProductId(null);
        // Return to selected product image or category image
        if (selectedProductId) {
            const selectedProduct = currentProducts.find(product => product.id === selectedProductId);
            if (selectedProduct) {
                setCurrentImage(selectedProduct.image);
            }
        } else {
            setCurrentImage(categoryImage);
        }
    };

    return (
        <section>
            <div className="flex flex-row justify-between m-20">
                <div className="max-w-lg">
                    <ul className="flex space-x-8 text-2xl font-normal mt-10">
                        {categories.map((category) => (
                            <li 
                                key={category.name}
                                className={`cursor-pointer transition-all duration-300 ease-in-out ${
                                    hoveredCategory === category.name 
                                        ? 'font-bold text-3xl text-gray-900' 
                                        : 'font-normal text-2xl text-gray-600 hover:text-gray-800'
                                }`}
                                onMouseEnter={() => handleCategoryHover(category)}
                            >
                                {category.name}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <p className="text-gray-700 leading-relaxed transition-opacity duration-300 ease-in-out">
                            {currentDescription}
                        </p>
                    </div>
                    <div className="mt-20">
                        <div className="grid grid-cols-4 gap-4">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    isSelected={selectedProductId === product.id}
                                    onSelect={handleProductSelect}
                                    onHover={handleProductHover}
                                    onLeave={handleProductLeave}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="relative w-[500px] h-[500px] overflow-hidden rounded-lg">
                    <Image 
                        src={currentImage} 
                        alt="Hero" 
                        fill
                        className={`object-cover transition-opacity duration-300 ease-in-out ${
                            isTransitioning ? 'opacity-0' : 'opacity-100'
                        }`}
                    />
                </div>
            </div>
        </section>
    )
}

export default HeroSection