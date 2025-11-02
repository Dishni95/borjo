"use client";

import { useState, useEffect } from "react";
import { Category } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { getCategoriesWithLocale } from "@/utils/supabase/products";
import { useParams } from "next/navigation";

export default function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const locale = (params?.locale as string) || 'en';

    useEffect(() => {
        const fetchCategories = async () => {
            const supabase = createClient();
            const localeCategories = await getCategoriesWithLocale(supabase, locale);
            setCategories(localeCategories);
            setLoading(false);
        };

        fetchCategories();
    }, [locale]);

    return { categories, loading };
}

