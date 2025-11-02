# Database Translations Guide

## Overview

Your Supabase database now supports multi-language content for products and categories. All product names, descriptions, details, composition, and category names can be translated into EN, DE, FR, and RU.

## Database Structure

### Translation Tables

1. **`product_translations`** - Stores translated product information
   - `product_id` (references `products.id`)
   - `locale` (en, de, fr, ru)
   - `name` - Product name
   - `description` - Product description
   - `details` - Product details
   - `composition` - Product composition

2. **`category_translations`** - Stores translated category names
   - `category_id` (references `product_categories.id`)
   - `locale` (en, de, fr, ru)
   - `category_name` - Category name

## How It Works

- The application automatically fetches translations based on the current user's selected language
- If a translation doesn't exist for the requested locale, it falls back to English
- All existing product/category data has been migrated to English translations

## Adding Translations

### Via Supabase Dashboard

1. **For Products:**
   ```sql
   INSERT INTO product_translations (product_id, locale, name, description, details, composition)
   VALUES (
     1,  -- product_id
     'de',  -- locale (de, fr, or ru)
     'Lederetui',  -- German name
     'Hochwertiges Lederetui...',  -- German description
     'Handgefertigt aus echtem Leder...',  -- German details
     '100% Leder'  -- German composition
   );
   ```

2. **For Categories:**
   ```sql
   INSERT INTO category_translations (category_id, locale, category_name)
   VALUES (
     1,  -- category_id
     'de',  -- locale
     'Geldbörsen'  -- German category name
   );
   ```

### Example: Adding German Translations

```sql
-- Product translation example
INSERT INTO product_translations (product_id, locale, name, description, details, composition)
SELECT 
  id,
  'de',
  -- You would translate these fields
  name || ' (DE)',  -- Placeholder - replace with actual German translation
  description || ' (DE)',
  details || ' (DE)',
  composition || ' (DE)'
FROM products
WHERE id = 1;

-- Category translation example
INSERT INTO category_translations (category_id, locale, category_name)
SELECT 
  id,
  'de',
  CASE 
    WHEN category_name = 'wallets' THEN 'Geldbörsen'
    WHEN category_name = 'cases' THEN 'Hüllen'
    ELSE category_name || ' (DE)'
  END
FROM product_categories;
```

## Updating Translations

```sql
-- Update product translation
UPDATE product_translations
SET 
  name = 'Neuer deutscher Name',
  description = 'Neue deutsche Beschreibung'
WHERE product_id = 1 AND locale = 'de';

-- Update category translation
UPDATE category_translations
SET category_name = 'Neuer Kategoriename'
WHERE category_id = 1 AND locale = 'de';
```

## Querying Translations

The application automatically handles translations. If you need to query manually:

```sql
-- Get product with German translation
SELECT 
  p.*,
  pt.name,
  pt.description,
  pt.details,
  pt.composition
FROM products p
LEFT JOIN product_translations pt ON p.id = pt.product_id AND pt.locale = 'de'
WHERE p.id = 1;

-- Get all categories in German
SELECT 
  c.id,
  c.parent_id,
  ct.category_name
FROM product_categories c
LEFT JOIN category_translations ct ON c.id = ct.category_id AND ct.locale = 'de';
```

## Best Practices

1. **Always provide English translations** - English is the fallback language
2. **Keep translations consistent** - Use the same terminology across products
3. **Review translations** - Have native speakers review your translations
4. **Test all languages** - Verify products display correctly in all locales

## Current Status

✅ Database tables created
✅ Existing data migrated to English
✅ Application updated to use translations
✅ Fallback to English if translation missing

## Next Steps

1. Add German (DE) translations for all products and categories
2. Add French (FR) translations
3. Add Russian (RU) translations
4. Test each language on the website

## Helper Functions

The application uses these helper functions (in `utils/supabase/products.ts`):

- `getProductsWithLocale()` - Get products with translations
- `getProductWithLocale()` - Get single product with translation
- `getCategoriesWithLocale()` - Get categories with translations
- `getCategoryNameWithLocale()` - Get category name with translation

All functions automatically:
- Use the current locale from the URL
- Fall back to English if translation missing
- Handle missing data gracefully

