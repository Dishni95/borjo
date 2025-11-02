import ProductCard from "./ProductCard";
import { createClient } from '@/utils/supabase/server'
import { Product, Category } from "@/types";
import { getTranslations } from 'next-intl/server';
import { getProductsWithLocale } from '@/utils/supabase/products';
import { getLocale } from 'next-intl/server';

const HeroSection = async () => {
    const t = await getTranslations('hero');
    const locale = await getLocale();
    const supabase = await createClient();
    const products = await getProductsWithLocale(supabase, locale);
    return (
        <section>
            <div className="mb-20 mt-4 max-w-screen-xl mx-2 lg:mx-auto">
                <div className="mt-10">
                    <div className="mt-6 lg:w-1/2">
                        <p className="text-gray-700 leading-relaxed transition-opacity duration-300 ease-in-out">
                            {t('description')}
                        </p>
                    </div>
                    <div className="lg:mt-20 mt-10">
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