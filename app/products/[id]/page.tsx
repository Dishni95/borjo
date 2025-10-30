import { createClient } from "@/utils/supabase/server"
import { Product } from "@/types"
import ProductDetails from "@/app/components/ProductDetails"
import Breadcrumbs from "@/app/components/Breadcrumbs"


const BUCKET_NAME = 'borjo_bucket'


export default async function ProductPage ({params}: {params: {id: string}}){
    const {id} = params
    const supabase = await createClient()

    const {data, error} = await supabase
        .from('products')
        .select('*, product_images(id, file_path, position), product_item(price)')
        .eq('id', id)
        .single()

    const {data: categoryData, error: categoryError} = await supabase
        .from('product_categories')
        .select('category_name')
        .eq('id', data.category_id)
        .single()

    if (!data) {
        return <div>Product not found</div>
    }

    const crumbs = categoryData ? [ 
        { text: categoryData.category_name, link: `/products?category=${data.category_id}` },
        { text: data.name, link: `/products/${id}` },
    ] : [
        { text: data.name, link: `/products/${id}` },
    ]


    const { data: { publicUrl: baseUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl('')
    
    const productWithImages = ({
        ...data,
        product_images: data.product_images.map((image: { file_path: string }) => ({
            ...image,
            public_url: `${baseUrl}${image.file_path}`
        }))
    })

    return (
        <div className="max-w-screen-xl mx-2 mt-4 lg:mx-auto">
            <div className="mt-2">
                <Breadcrumbs crumbs={crumbs} />
            </div>
            <ProductDetails product={productWithImages} />
        </div>
    )
}