import { createClient } from "@/utils/supabase/server";
import ProductGrid from "../components/ProductGrid";
import Breadcrumbs from "../components/Breadcrumbs";

const BUCKET_NAME = 'borjo_bucket'

async function getCategoryProducts(category: string | null) {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*, product_images(file_path), product_item(price)')
        .eq('category_id', category)
    
    if (!data) return []
    
    // Get storage URL once
    const { data: { publicUrl: baseUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl('')
    
    // Transform data synchronously
    return data.map(product => ({
        ...product,
        product_images: product.product_images.map((image: { file_path: string }) => ({
            ...image,
            public_url: `${baseUrl}${image.file_path}`
        }))
    }))
}


export default async function CategoryPage({searchParams}: {searchParams: {category: number}}) {
    const resolved = await searchParams
    const category = typeof resolved.category === 'string' ? resolved.category : null
    const products = await getCategoryProducts(category)

    // Fetch category name
    const supabase = await createClient()
    const { data: categoryData } = category 
        ? await supabase
            .from('product_categories')
            .select('category_name')
            .eq('id', category)
            .single()
        : { data: null }

    const crumbs = categoryData ? [
        { text: categoryData.category_name, link: `/products?category=${category}` },
    ] : [
        { text: "Products", link: '/products' },
    ]

    return (
        <div className="max-w-screen-xl mx-2 lg:mx-auto">
            <div className="mt-10">
                <Breadcrumbs crumbs={crumbs} />
            </div>
            <div className="mt-20">
                <ProductGrid products={products} />
            </div>
        </div>
    )
}