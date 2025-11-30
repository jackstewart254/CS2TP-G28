"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useFetchSubscriptions() {
  const supabase = createClient();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSubscriptions() {
      setLoading(true);
      setError(null);

      try {
        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setSubscriptions([]);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("subscriptions")
          .select("*")
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching subscriptions:", error.message);
          setError(error.message);
        } else {
          setSubscriptions(data || []);
        }

        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    loadSubscriptions();
  }, []);

  return { subscriptions, loading, error };
}
