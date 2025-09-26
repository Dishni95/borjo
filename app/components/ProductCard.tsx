"use client"
import Image from "next/image";

interface ProductCardProps {
    id: string;
    name: string;
    image: string;
    price: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onHover: (id: string) => void;
    onLeave: () => void;
}

const ProductCard = ({ id, name, image, price, isSelected, onSelect, onHover, onLeave }: ProductCardProps) => {
    return (
        <div 
            className={`cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 ${
                isSelected ? 'ring-2 ring-gray-900 shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => onSelect(id)}
            onMouseEnter={() => onHover(id)}
            onMouseLeave={onLeave}
        >
            <div className="bg-white rounded-lg overflow-hidden">
                <div className="relative w-full h-20">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-1">{name}</h3>
                    <p className="text-gray-600 text-sm">{price}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
