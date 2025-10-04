"use client"

import {useState} from 'react'
import ProductCard from './ProductCard'
import { Product } from '@/types'

interface ProductGridProps {
    products: Product[]
}


export default function ProductGrid({ products }: ProductGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}