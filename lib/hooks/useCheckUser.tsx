"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BooleanKeyframeTrack } from "three";

type CheckedUser = {
  name: string;
  valid: boolean;
  id: string;
  admin: boolean;
};

export function useCheckUser() {
  const supabase = createClient();
  const [user, setUser] = useState<CheckedUser>({
    name: "",
    valid: false,
    id: "",
    admin: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      setError(null);

      // I will need to fetch user metadata/subscription table and return it.
      // I will also fetch the api keys, which I need to make in the database.

      try {
        const { data: resUser } = await supabase.auth.getUser();

        console.log("Res user", resUser);

        if (resUser.user) {
          const { data: metadata } = await supabase
            .from("user_profiles")
            .select("admin")
            .eq("id", resUser.user?.id)
            .single();

          setUser({
            ...user,
            valid: true,
            id: resUser.user?.id,
            admin: metadata?.admin,
          });
          setLoading(false);
          return;
        } else {
          setLoading(false);
          setUser({ valid: false, name: "", id: "", admin: false });
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  return { user, loading, error };
}
