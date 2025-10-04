import { useState, useEffect } from "react";
import { Category } from "@/types";
import { createClient } from "@/utils/supabase/client";

export default function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const supabase = createClient();
            const { data, error } = await supabase
                .from('product_categories').select('id, parent_id, category_name');
            setCategories(data || []);
            setLoading(false);
        };

        fetchCategories();
    }, []);

    return { categories, loading };
}

