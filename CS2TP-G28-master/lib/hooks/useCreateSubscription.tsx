"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useCreateSubscription() {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubscription = async (productId: string) => {
    setLoading(true);
    setError(null);

    try {
      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setError("You must be logged in to subscribe.");
        setLoading(false);
        return { success: false };
      }

      // Check if user already subscribed
      const { data: existing } = await supabase
        .from("subscriptions")
        .select("id")
        .eq("user_id", user.id)
        .eq("product_id", productId)
        .eq("status", "active")
        .single();

      if (existing) {
        setError("You already own this product.");
        setLoading(false);
        return { success: false };
      }

      // Create subscription
      const { error: subError } = await supabase.from("subscriptions").insert({
        user_id: user.id,
        product_id: productId,
        status: "active",
      });

      if (subError) {
        setError(subError.message);
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

  return { createSubscription, loading, error };
}
