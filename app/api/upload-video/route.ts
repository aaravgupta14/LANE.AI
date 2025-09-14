import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("video") as File
    const registrationId = formData.get("registrationId") as string

    if (!file || !registrationId) {
      return NextResponse.json({ error: "Video file and registration ID are required" }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith("video/")) {
      return NextResponse.json({ error: "Only video files are allowed" }, { status: 400 })
    }

    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 100MB" }, { status: 400 })
    }

    const supabase = await createClient()

    // Verify registration exists
    const { data: registration } = await supabase.from("registrations").select("id").eq("id", registrationId).single()

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 })
    }

    // For now, we'll store a placeholder URL since we don't have actual file storage setup
    // In production, you would upload to Supabase Storage or another service
    const fileUrl = `/uploads/${registrationId}/${file.name}`

    // Create video upload record
    const { data: videoUpload, error } = await supabase
      .from("video_uploads")
      .insert({
        registration_id: registrationId,
        original_filename: file.name,
        file_url: fileUrl,
        file_size: file.size,
        processing_status: "uploaded",
      })
      .select()
      .single()

    if (error) {
      console.error("Video upload error:", error)
      return NextResponse.json({ error: "Failed to save video upload" }, { status: 500 })
    }

    // Update registration status
    await supabase
      .from("registrations")
      .update({
        status: "video_uploaded",
        updated_at: new Date().toISOString(),
      })
      .eq("id", registrationId)

    return NextResponse.json({
      success: true,
      videoUpload,
      message: "Video uploaded successfully",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
