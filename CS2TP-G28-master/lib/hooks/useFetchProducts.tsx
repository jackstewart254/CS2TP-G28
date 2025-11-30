"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useFetchProducts(categoryId?: string) {
  const supabase = createClient();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProducts() {
      let query = supabase.from("products").select("*");

      if (categoryId) {
        query = query.eq("category_id", categoryId);
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching products:", error.message);
        setError(error.message);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    loadProducts();
  }, [categoryId]);

  return { products, loading, error };
}
