"use client";

import { useEffect, useState } from "react";
import { useCheckUser } from "../useCheckUser";
import { createClient } from "../../supabase/client";
import { generateApiKey } from "@/components/generate-api-key";

const InsertKey = async ({ name }: { name: string }) => {
  const supabase = createClient();
  const api_key = generateApiKey();

  const { data: user } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("user_api_keys")
    .insert([{ user_id: user.user.id, name, key: api_key }]);
  console.log(data, error);
};

export { InsertKey };
