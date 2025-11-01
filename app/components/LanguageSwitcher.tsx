"use client";

import { useTransition } from 'react';
import { useParams } from 'next/navigation';
import { routing, useRouter, usePathname } from '@/i18n/routing';
import { useState, useEffect, useRef } from 'react';
import { IoLanguageOutline } from 'react-icons/io5';

const languages = {
  en: { name: 'English', code: 'EN' },
  de: { name: 'Deutsch', code: 'DE' },
  fr: { name: 'Français', code: 'FR' },
  ru: { name: 'Русский', code: 'RU' },
};

interface LanguageSwitcherProps {
  isMobile?: boolean;
  onLanguageChange?: () => void;
}

export default function LanguageSwitcher({ isMobile = false, onLanguageChange }: LanguageSwitcherProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = (params.locale as string) || routing.defaultLocale;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
    setIsOpen(false);
    onLanguageChange?.();
  }

  // Mobile version - horizontal list at bottom
  if (isMobile) {
    return (
      <div className="mt-auto pt-8 pb-4">
        <h3 className="text-sm font-semibold text-gray-500 mb-3 px-2">LANGUAGE</h3>
        <div className="flex gap-4">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => onSelectChange(locale)}
              className={`px-4 py-2 text-lg transition-all ease-in-out ${
                currentLocale === locale ? 'font-bold underline' : 'hover:font-bold'
              }`}
              disabled={isPending}
            >
              {languages[locale as keyof typeof languages].code}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Desktop version - dropdown with language code
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 lg:p-1 mt-1 hover:bg-zinc-100 rounded-3xl transition-all flex items-center gap-1"
        aria-label="Select language"
        disabled={isPending}
      >
        <span className="text-sm text-zinc-500 rounded-xl px-2 py-2 font-medium min-w-[2rem] text-center">
          {languages[currentLocale as keyof typeof languages]?.code}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-3xl shadow-lg border border-gray-200 py-2 z-50">
          {routing.locales.map((locale) => (
            <button
              key={locale}
              onClick={() => onSelectChange(locale)}
              className={`w-full rounded-xl text-left px-4 py-2 hover:bg-zinc-100 flex items-center gap-3 transition-colors ${
                currentLocale === locale ? 'bg-zinc-50 font-medium' : ''
              }`}
            >
              <span className="text-sm font-medium">{languages[locale as keyof typeof languages].code}</span>
              <span className="text-sm">{languages[locale as keyof typeof languages].name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

