"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useClearCart() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearCart = async () => {
    setLoading(true);
    setError(null);

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to clear cart.");
        setLoading(false);
        return { success: false };
      }

      const { error: deleteError } = await supabase
        .from("cart")
        .delete()
        .eq("user_id", user.id);

      if (deleteError) {
        setError(deleteError.message);
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

  return { clearCart, loading, error };
}
