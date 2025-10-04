import { createClient } from "@/utils/supabase/server"
import { Product } from "@/types"
import ProductDetails from "@/app/components/ProductDetails"


const BUCKET_NAME = 'borjo_bucket'


export default async function ProductPage ({params}: {params: {id: string}}){
    const {id} = params
    const supabase = await createClient()
    const {data, error} = await supabase
        .from('products')
        .select('*, product_images(id, file_path, position), product_item(price)')
        .eq('id', id)
        .single()

    if (!data) {
        return <div>Product not found</div>
    }

    const { data: { publicUrl: baseUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl('')
    
    const productWithImages = ({
        ...data,
        product_images: data.product_images.map((image: { file_path: string }) => ({
            ...image,
            public_url: `${baseUrl}${image.file_path}`
        }))
    })

    return <ProductDetails product={productWithImages} />
}