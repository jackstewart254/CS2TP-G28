"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useAddToCart() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addToCart = async (productId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to add to cart.");
        setLoading(false);
        return { success: false };
      }

      // Check if product already in cart
      const { data: existing } = await supabase
        .from("cart")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .single();

      if (existing) {
        setError("Product is already in your cart.");
        setLoading(false);
        return { success: false };
      }

      // Insert into cart
      const { error: insertError } = await supabase.from("cart").insert({
        user_id: user.id,
        product_id: productId,
      });

      if (insertError) {
        setError(insertError.message);
        setLoading(false);
        return { success: false };
      }

      setLoading(false);
      return { success: true };
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      return { success: false };
    }
  };

  return { addToCart, loading, error };
}
