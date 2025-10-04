"use client"
import useCategories from "@/hooks/useMenu";
import { Category } from "@/types";
import Link from "next/link";



export default function Menu() {
    const { categories, loading } = useCategories();

    return (
        <div className="sticky top-20 z-50 bg-white pb-4">
            <ul className="flex space-x-8 text-2xl font-normal mt-10">
                {categories.map((category: Category) => (
                    <Link href={`/products?category=${category.id}`} key={category.id}>
                        <li className="hover:font-bold transition-all ease-in-out" key={category.id}>{category.category_name}</li>
                    </Link>
                ))}

            </ul>
        </div>
    )
}