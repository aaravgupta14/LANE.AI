import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }

    const supabase = await createClient()

    // Check if email already exists
    const { data: existing } = await supabase
      .from("registrations")
      .select("id, email, status")
      .eq("email", email)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        registration: existing,
        message: "Email already registered",
      })
    }

    // Create new registration
    const { data: registration, error } = await supabase.from("registrations").insert({ email }).select().single()

    if (error) {
      console.error("Registration error:", error)
      return NextResponse.json({ error: "Failed to register email" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      registration,
      message: "Registration successful",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
