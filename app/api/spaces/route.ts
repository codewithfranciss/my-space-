import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";


export async function GET(req: Request) {
    const {searchParams} = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json({ error: "Missing userId parameter" }, { status: 400 });
    }


    const { data, error } = await supabase.from("spaces").select("*").order("created_at", { ascending: false }).eq("user_id", userId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json(data);

}
