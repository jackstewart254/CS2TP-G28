"use client";
import { createClient } from "@/lib/supabase/client";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/auth/login");
  };

  return (
    <button
      onClick={logout}
      className="
        flex items-center gap-2 
        px-3 py-1.5 rounded-md text-sm font-medium
        border border-red-300 text-red-700
        hover:bg-red-50 dark:hover:bg-red-950
        transition-all
        justify-center
      "
    >
      Logout
    </button>
  );
}
