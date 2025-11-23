import ProductCard from "./ProductCard";
import { createClient } from '@/utils/supabase/server'
import { Product, Category } from "@/types";
import { getTranslations } from 'next-intl/server';
import { getProductsWithLocale } from '@/utils/supabase/products';
import { getLocale } from 'next-intl/server';
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "@/i18n/routing";

const HeroSection = async () => {
    const t = await getTranslations('hero');
    const locale = await getLocale();
    const supabase = await createClient();
    const products = await getProductsWithLocale(supabase, locale);
    return (
        <section>
            <div className="mb-20 mt-4 max-w-screen-xl mx-2 lg:mx-auto">
                <div className="mt-10">
                   
                    <div className="lg:mt-20 mt-10">
                        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
                             {products.map((product) => (
                                 <ProductCard
                                     key={product.id}
                                     product={product}
                                 />
                             ))}
                             <Link href="/products" className="flex group">
                                <div className="relative flex flex-col justify-center w-full
                                bg-white p-8 rounded-lg
                                hover:shadow-lg transition-all duration-300 ease-out
                                
                                hover:bg-gray-50">
                                    
                                    <div className="space-y-3">
                                        <h3 className="text-gray-900 font-serif text-xl font-medium tracking-wide">
                                            {t('browseTitle')}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed font-light">
                                            {t('browseDescription')}
                                        </p>
                                    </div>
                                    
                                    {/* Animated arrow */}
                                    <div className="flex justify-end mt-6">
                                        <BsArrowRightCircle className="text-gray-400 text-2xl 
                                        transform group-hover:translate-x-1 group-hover:text-gray-600 
                                        transition-all duration-300" />
                                    </div>
                                </div>  
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default HeroSection