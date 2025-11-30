// app/check/[slug]/page.tsx

import { redirect } from "next/navigation";
import { createClient } from "./supabase/server";

const CheckPage = async (page: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }
};

export { CheckPage };
