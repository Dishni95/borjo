import { createClient } from "@/utils/supabase/server"
import { Product } from "@/types"
import ProductDetails from "../../../components/ProductDetails"
import Breadcrumbs from "../../../components/Breadcrumbs"
import { getProductWithLocale, getCategoryNameWithLocale } from '@/utils/supabase/products';

export default async function ProductPage ({params}: {params: Promise<{id: string, locale: string}>}){
    const {id, locale} = await params
    const supabase = await createClient()

    const product = await getProductWithLocale(supabase, id, locale)

    if (!product) {
        return <div>Product not found</div>
    }

    const categoryName = product.category_id 
        ? await getCategoryNameWithLocale(supabase, product.category_id, locale)
        : null

    const crumbs = categoryName ? [ 
        { text: categoryName, link: `/products?category=${product.category_id}` },
        { text: product.name, link: `/products/${id}` },
    ] : [
        { text: product.name, link: `/products/${id}` },
    ]

    return (
        <div className="max-w-screen-xl mx-2 mt-4 lg:mx-auto">
            <div className="mt-2">
                <Breadcrumbs crumbs={crumbs} />
            </div>
            <ProductDetails product={product} />
        </div>
    )
}