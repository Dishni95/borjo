import { SupabaseClient } from '@supabase/supabase-js';
import { Product, Category } from '@/types';

const BUCKET_NAME = 'borjo_bucket';

/**
 * Get products with translations for a specific locale
 * Falls back to English if translation doesn't exist
 */
export async function getProductsWithLocale(
  supabase: SupabaseClient,
  locale: string = 'en',
  categoryId?: number | null
): Promise<Product[]> {
  // Ensure locale is valid, default to 'en'
  const validLocale = ['en', 'de', 'fr', 'ru'].includes(locale) ? locale : 'en';
  
  // First, get products
  let productsQuery = supabase
    .from('products')
    .select('*, product_images(file_path, position), product_item(price)');

  if (categoryId) {
    productsQuery = productsQuery.eq('category_id', categoryId);
  }

  const { data: products, error: productsError } = await productsQuery;

  if (productsError || !products || products.length === 0) {
    return [];
  }

  // Get translations for all products
  const productIds = products.map(p => p.id);
  const { data: translations, error: translationsError } = await supabase
    .from('product_translations')
    .select('product_id, name, description, details, composition')
    .in('product_id', productIds)
    .eq('locale', validLocale);

  // If no translations found for this locale, try English
  if ((translationsError || !translations || translations.length === 0) && validLocale !== 'en') {
    const { data: enTranslations } = await supabase
      .from('product_translations')
      .select('product_id, name, description, details, composition')
      .in('product_id', productIds)
      .eq('locale', 'en');
    
    return mergeProductsWithTranslations(products, enTranslations || [], supabase);
  }

  return mergeProductsWithTranslations(products, translations || [], supabase);
}

function mergeProductsWithTranslations(
  products: any[],
  translations: any[],
  supabase: SupabaseClient
): Product[] {
  // Create a map of translations by product_id
  const translationMap = new Map(
    translations.map(t => [t.product_id, t])
  );

  // Get storage URL once
  const { data: { publicUrl: baseUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl('');

  // Merge products with translations
  return products.map((product: any) => {
    const translation = translationMap.get(product.id) || {};
    return {
      ...product,
      name: translation.name || product.name || '',
      description: translation.description || product.description || '',
      details: translation.details || product.details || '',
      composition: translation.composition || product.composition || '',
      product_images: (product.product_images || []).map((image: { file_path: string }) => ({
        ...image,
        public_url: `${baseUrl}${image.file_path}`
      }))
    };
  });
}

/**
 * Get a single product with translations for a specific locale
 */
export async function getProductWithLocale(
  supabase: SupabaseClient,
  productId: string | number,
  locale: string = 'en'
): Promise<Product | null> {
  const validLocale = ['en', 'de', 'fr', 'ru'].includes(locale) ? locale : 'en';

  // Get product
  const { data: product, error: productError } = await supabase
    .from('products')
    .select('*, product_images(id, file_path, position), product_item(price)')
    .eq('id', productId)
    .single();

  if (productError || !product) {
    return null;
  }

  // Get translation
  const { data: translation, error: translationError } = await supabase
    .from('product_translations')
    .select('name, description, details, composition')
    .eq('product_id', productId)
    .eq('locale', validLocale)
    .single();

  // Fallback to English if translation not found
  let finalTranslation = translation;
  if ((translationError || !translation) && validLocale !== 'en') {
    const { data: enTranslation } = await supabase
      .from('product_translations')
      .select('name, description, details, composition')
      .eq('product_id', productId)
      .eq('locale', 'en')
      .single();
    finalTranslation = enTranslation;
  }

  // Get storage URL
  const { data: { publicUrl: baseUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl('');

  return {
    ...product,
    name: finalTranslation?.name || product.name || '',
    description: finalTranslation?.description || product.description || '',
    details: finalTranslation?.details || product.details || '',
    composition: finalTranslation?.composition || product.composition || '',
    product_images: (product.product_images || []).map((image: { file_path: string }) => ({
      ...image,
      public_url: `${baseUrl}${image.file_path}`
    }))
  };
}

/**
 * Get categories with translations for a specific locale
 */
export async function getCategoriesWithLocale(
  supabase: SupabaseClient,
  locale: string = 'en'
): Promise<Category[]> {
  const validLocale = ['en', 'de', 'fr', 'ru'].includes(locale) ? locale : 'en';

  // Get all categories
  const { data: categories, error: categoriesError } = await supabase
    .from('product_categories')
    .select('id, parent_id');

  if (categoriesError || !categories || categories.length === 0) {
    return [];
  }

  // Get translations
  const categoryIds = categories.map(c => c.id);
  const { data: translations, error: translationsError } = await supabase
    .from('category_translations')
    .select('category_id, category_name')
    .in('category_id', categoryIds)
    .eq('locale', validLocale);

  // Fallback to English if no translations found
  let finalTranslations = translations;
  if ((translationsError || !translations || translations.length === 0) && validLocale !== 'en') {
    const { data: enTranslations } = await supabase
      .from('category_translations')
      .select('category_id, category_name')
      .in('category_id', categoryIds)
      .eq('locale', 'en');
    finalTranslations = enTranslations;
  }

  // Create translation map
  const translationMap = new Map(
    (finalTranslations || []).map(t => [t.category_id, t.category_name])
  );

  return categories.map((category: any) => ({
    id: category.id,
    parent_id: category.parent_id,
    category_name: translationMap.get(category.id) || ''
  }));
}

/**
 * Get category name with translations for a specific locale
 */
export async function getCategoryNameWithLocale(
  supabase: SupabaseClient,
  categoryId: number,
  locale: string = 'en'
): Promise<string | null> {
  const validLocale = ['en', 'de', 'fr', 'ru'].includes(locale) ? locale : 'en';

  const { data, error } = await supabase
    .from('category_translations')
    .select('category_name')
    .eq('category_id', categoryId)
    .eq('locale', validLocale)
    .single();

  if (error || !data) {
    // Fallback to English
    if (validLocale !== 'en') {
      return getCategoryNameWithLocale(supabase, categoryId, 'en');
    }
    return null;
  }

  return data.category_name;
}

