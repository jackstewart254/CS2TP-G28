"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";

type BankCard = {
  id: string;
  card_number: number;
  cvv: number;
  holder: string;
  expiry: string;
  provider: string;
};

type ApiKey = {
  id: string;
  name: string;
  key: string;
};

type User = {
  email: string;
  fname: string;
  lname: string;
  apiKeys: ApiKey[];
  cards: BankCard[];
};

export function useFetchUser() {
  const supabase = createClient();
  const [user, setUser] = useState<User>({ email: "", cards: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const insertCard = async ({
    holder,
    card_number,
    cvv,
    expiry,
    provider,
  }: {
    holder: string;
    card_number: string;
    cvv: number;
    expiry: string;
    provider: string;
  }) => {
    console.log(holder, card_number, cvv, expiry);
    const { data: user } = await supabase.auth.getUser();

    const { data, error } = await supabase.from("bank_cards").insert([
      {
        holder,
        number: card_number,
        cvv,
        expiry,
        user_id: user.user.id,
        provider,
      },
    ]);

    console.log("Bank cards", data, error);
  };

  async function loadUser() {
    setLoading(true);
    setError(null);

    try {
      const { data: resUser } = await supabase.auth.getUser();
      const { data: metadata } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("id", resUser.user?.id)
        .single();

      const { data: api } = await supabase
        .from("user_api_keys")
        .select("*")
        .eq("user_id", resUser.user?.id);

      const { data: bank_cards } = await supabase
        .from("bank_cards")
        .select("*")
        .eq("user_id", resUser.user?.id);

      if (resUser) {
        setUser({
          email: resUser.user?.email ? resUser.user?.email : "",
          fname: metadata.fname,
          lname: metadata.lname,
          apiKeys: api.map((a) => ({ id: a.id, name: a.name, key: a.key })),
          cards: bank_cards.map((b) => ({
            id: b.id,
            card_number: b.number,
            cvv: b.cvv,
            holder: b.holder,
            provider: b.provider,
            expiry: b.expiry,
          })),
        });
        setLoading(false);
        return;
      }

      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUser();
  }, []);

  return { user, loading, error, refetch: loadUser, insertCard };
}
