# Multi-Language Implementation Guide

This document describes the internationalization (i18n) implementation for the Borjo e-commerce platform.

## Overview

The application now supports **4 languages**: English (EN), German (DE), French (FR), and Russian (RU), with automatic locale detection based on user location and manual language switching capability.

## Implementation Details

### Technology Stack
- **next-intl**: Industry-standard i18n library for Next.js App Router
- **Automatic locale detection**: Via middleware using `Accept-Language` headers
- **SEO-friendly URLs**: Each language has its own URL path (e.g., `/en/products`, `/de/products`)

### File Structure

```
borjo/
├── app/
│   ├── [locale]/              # All localized routes
│   │   ├── layout.tsx         # Locale-specific layout with NextIntlClientProvider
│   │   ├── page.tsx           # Home page
│   │   ├── cart/
│   │   ├── checkout/
│   │   └── products/
│   ├── api/                   # API routes (not localized)
│   ├── components/            # Shared components
│   │   ├── LanguageSwitcher.tsx  # Language switcher dropdown
│   │   ├── Navbar.tsx         # Updated with translations
│   │   ├── Footer.tsx         # Updated with translations
│   │   └── ...
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Root redirect to default locale
├── i18n/
│   ├── request.ts             # i18n configuration
│   └── routing.ts             # Routing configuration & navigation helpers
├── messages/                  # Translation files
│   ├── en.json
│   ├── de.json
│   ├── fr.json
│   └── ru.json
├── middleware.ts              # Locale detection middleware
└── next.config.ts             # Updated with next-intl plugin
```

## Key Features

### 1. Automatic Locale Detection
The middleware automatically detects the user's preferred language from:
- Browser's `Accept-Language` header
- User's geographic location
- Previous language selection (stored in cookies)

### 2. Language Switcher
Located in the navigation bar, the language switcher allows users to:
- See the current language with a flag icon
- Switch between any of the 4 supported languages
- Maintains the current page when switching languages

### 3. Translated Content
All user-facing text is translated across:
- Navigation and footer
- Product pages
- Cart and checkout
- Error messages
- UI labels and buttons

## Translation Files

Translation files are organized by namespace for better maintainability:

```json
{
  "nav": { ... },           // Navigation items
  "hero": { ... },          // Homepage content
  "cart": { ... },          // Shopping cart
  "product": { ... },       // Product pages
  "footer": { ... },        // Footer content
  "checkout": { ... },      // Checkout process
  "language": { ... }       // Language names
}
```

## Usage in Components

### Client Components
```tsx
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

### Server Components
```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyComponent() {
  const t = await getTranslations('namespace');
  return <h1>{t('key')}</h1>;
}
```

### Links (always use i18n routing)
```tsx
import { Link } from '@/i18n/routing';

<Link href="/products">Products</Link>
// Automatically becomes /en/products, /de/products, etc.
```

## Supported Languages

| Code | Language | Flag |
|------|----------|------|
| en   | English  | 🇬🇧   |
| de   | Deutsch  | 🇩🇪   |
| fr   | Français | 🇫🇷   |
| ru   | Русский  | 🇷🇺   |

## Adding New Languages

To add a new language:

1. **Update routing configuration** (`i18n/routing.ts`):
```typescript
locales: ['en', 'de', 'fr', 'ru', 'es'], // Add 'es' for Spanish
```

2. **Create translation file** (`messages/es.json`):
```json
{
  "nav": {
    "favourite": "Favoritos",
    "cart": "Carrito"
  },
  // ... complete translations
}
```

3. **Update LanguageSwitcher** (`app/components/LanguageSwitcher.tsx`):
```typescript
const languages = {
  // ... existing languages
  es: { name: 'Español', flag: '🇪🇸' },
};
```

4. **Update middleware** (`middleware.ts`):
```typescript
matcher: ['/', '/(de|en|fr|ru|es)/:path*']
```

## URL Structure

All routes are prefixed with the locale:

- `/en/` - English homepage
- `/de/products` - German products page
- `/fr/cart` - French cart page
- `/ru/checkout` - Russian checkout page

The root `/` redirects to the default locale (`/en/`).

## SEO Considerations

✅ **Implemented:**
- Separate URLs per language
- Proper `lang` attribute in HTML
- Static page generation for all locales
- Automatic locale detection

📝 **Recommended additions:**
- Add `hreflang` tags for SEO
- Generate localized sitemaps
- Implement language-specific metadata

## Best Practices

1. **Always use i18n routing**: Import `Link`, `useRouter`, etc. from `@/i18n/routing`, not from `next/navigation`
2. **Keep translations organized**: Use namespaces to group related translations
3. **Provide context**: Translation keys should be descriptive
4. **Test all languages**: Ensure UI doesn't break with longer text (German) or different scripts (Russian)
5. **Update all translations**: When adding new features, update all 4 language files

## Development

### Running Locally
```bash
npm run dev
```
Visit:
- http://localhost:3000/en
- http://localhost:3000/de
- http://localhost:3000/fr
- http://localhost:3000/ru

### Building
```bash
npm run build
```

All locales are pre-rendered during build for optimal performance.

## Troubleshooting

### Issue: Wrong locale shown
- Clear browser cookies and localStorage
- Check browser's `Accept-Language` settings

### Issue: Missing translations
- Check that the translation key exists in all language files
- Ensure the namespace is correct

### Issue: Build errors
- Verify all translation files are valid JSON
- Check that all components use correct import paths

## Future Enhancements

- [ ] Add more languages (ES, IT, PT, etc.)
- [ ] Implement currency conversion
- [ ] Add region-specific content
- [ ] Localize dates and numbers
- [ ] Add translation management system
- [ ] Implement language-specific product descriptions (requires database changes)

---

**Implementation Date**: October 31, 2025  
**Next.js Version**: 15.5.4  
**next-intl Version**: Latest (installed)

