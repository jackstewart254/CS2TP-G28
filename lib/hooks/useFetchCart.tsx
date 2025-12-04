"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useFetchCart() {
  const supabase = createClient();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCart() {
    setLoading(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error fetching cart:", error.message);
        setError(error.message);
      } else {
        setCartItems(data || []);
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCart();
  }, []);

  return { cartItems, loading, error, refetch: loadCart };
}
