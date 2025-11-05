import { createClient } from "@/utils/supabase/server";
import ProductGrid from "../../components/ProductGrid";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getProductsWithLocale, getCategoryNameWithLocale } from '@/utils/supabase/products';
import { getLocale } from 'next-intl/server';

export default async function CategoryPage({searchParams, params}: {searchParams: Promise<{category?: number}>, params: Promise<{locale: string}>}) {
    const resolved = await searchParams;
    const { locale } = await params;
    const category = typeof resolved.category === 'string' ? Number(resolved.category) : resolved.category || null;
    
    const supabase = await createClient();
    const products = await getCategoryProducts(supabase, locale, category);

    // Fetch category name with locale
    const categoryName = category 
        ? await getCategoryNameWithLocale(supabase, category, locale)
        : null;

    const crumbs = categoryName ? [
        { text: categoryName, link: `/products?category=${category}` },
    ] : [
        { text: "Products", link: '/products' },
    ]

    return (
        <div className="max-w-screen-xl mx-2 mt-4 lg:mx-auto min-h-[calc(100vh-200px)]">
            <div className="mt-2">
                <Breadcrumbs crumbs={crumbs} />
            </div>
            <div className="mt-20">
                <ProductGrid products={products} />
            </div>
        </div>
    )
}

async function getCategoryProducts(supabase: any, locale: string, categoryId: number | null) {
    return await getProductsWithLocale(supabase, locale, categoryId);
}