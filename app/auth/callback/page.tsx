"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        return;
      }

      if (data.session) {
        const user = data.session.user;

        // Upsert user into 'users' table
        const { error: dbError } = await supabase.from("users").upsert({
          id: user.id,
          email: user.email,
          updated_at: new Date(),
        });

        if (dbError) console.error("Error upserting user:", dbError.message);

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        // If no session, redirect to login
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router]);

  return <div>Loading...</div>;
}
