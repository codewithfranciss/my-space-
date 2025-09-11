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

export async function POST(req: Request) {
    const body = await req.json();
    const { name, is_private, shortId, pin, expiration_type, expiration_value, expires_at, user_id } = body;
    
    if (!user_id) {
        return NextResponse.json({ error: "User Id is required" }, { status: 400 });
    }

    const { data, error } = await supabase.from("spaces").insert([{
        name,
        is_private,
        shortId,
        pin,
        expiration_type,
        expiration_value,
        expires_at,
        user_id
    }]).select().single();
    
    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}