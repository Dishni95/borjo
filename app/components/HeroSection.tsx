import ProductCard from "./ProductCard";
import { createClient } from '@/utils/supabase/client'
import { Product, Category } from "@/types";
import Menu from "./Menu";

const BUCKET_NAME = 'borjo_bucket'


async function getProducts(): Promise<Product[]> {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('products')
        .select('*, product_images(file_path), product_item(price)')

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


const HeroSection = async () => {

    const products = await getProducts();
    console.log(products)
    return (
        <section>
            <div className="mb-20 mt-10 max-w-screen-xl mx-2 lg:mx-auto">
                <div>
                    <Menu />
                    <div className="mt-6 lg:w-1/2">
                        <p className="text-gray-700 leading-relaxed transition-opacity duration-300 ease-in-out">
                            Discover our collection of handmade leather goods — crafted with care, precision and style.
                        </p>
                    </div>
                    <div className="mt-20">
                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                             {products.map((product) => (
                                 <ProductCard
                                     key={product.id}
                                     product={product}
                                 />
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection