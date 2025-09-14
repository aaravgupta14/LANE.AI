import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Get all registrations with their video uploads
    const { data: registrations, error } = await supabase
      .from("registrations")
      .select(`
        *,
        video_uploads (*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Admin query error:", error)
      return NextResponse.json({ error: "Failed to fetch registrations" }, { status: 500 })
    }

    // Get summary statistics
    const totalRegistrations = registrations?.length || 0
    const videosUploaded = registrations?.filter((r) => r.status !== "pending").length || 0
    const processingComplete = registrations?.filter((r) => r.status === "completed").length || 0

    return NextResponse.json({
      success: true,
      data: {
        registrations,
        stats: {
          totalRegistrations,
          videosUploaded,
          processingComplete,
        },
      },
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
