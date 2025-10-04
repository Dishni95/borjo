import Menu from "../components/Menu";
import { createClient } from "@/utils/supabase/server";
import ProductGrid from "../components/ProductGrid";

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
    console.log(data)
    
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
    console.log(category)
    const products = await getCategoryProducts(category)
    console.log(products)
    return (
        <div className="max-w-screen-xl mx-auto">
            <Menu />
            <div className="mt-28">
            <ProductGrid products={products} />
            </div>
        </div>
    )
}