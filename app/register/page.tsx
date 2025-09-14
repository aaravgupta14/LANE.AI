"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft, Upload, Mail, CheckCircle } from "lucide-react"

export default function RegisterPage() {
  const [step, setStep] = useState<"email" | "upload" | "success">("email")
  const [email, setEmail] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [registrationId, setRegistrationId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (result.success) {
        setRegistrationId(result.registration.id)
        setStep("upload")
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("video/")) {
        setUploadedFile(file)
      }
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("video/")) {
        setUploadedFile(file)
      }
    }
  }

  const handleUploadSubmit = async () => {
    if (!uploadedFile || !registrationId) return

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("video", uploadedFile)
      formData.append("registrationId", registrationId)

      const response = await fetch("/api/upload-video", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setStep("success")
      } else {
        setError(result.error || "Upload failed")
      }
    } catch (err) {
      setError("Network error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-dvh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-semibold tracking-tight">LANE.AI</span>
          </Link>
        </div>
      </header>

      <div className="py-16 px-4">
        <div className="mx-auto max-w-md">
          {step === "email" && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" />
                  Get Started
                </CardTitle>
                <CardDescription>Enter your email to begin lane detection analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      disabled={loading}
                    />
                  </div>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Registering..." : "Continue"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {step === "upload" && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Video
                </CardTitle>
                <CardDescription>Upload a dashcam video for lane detection analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your video here, or click to browse
                  </p>
                  <input type="file" accept="video/*" onChange={handleFileInput} className="hidden" id="video-upload" />
                  <Button asChild variant="outline" size="sm">
                    <label htmlFor="video-upload" className="cursor-pointer">
                      Choose File
                    </label>
                  </Button>
                </div>

                {uploadedFile && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">{uploadedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(uploadedFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                  </div>
                )}

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Button onClick={handleUploadSubmit} disabled={!uploadedFile || loading} className="w-full">
                  {loading ? "Uploading..." : "Analyze Video"}
                </Button>
              </CardContent>
            </Card>
          )}

          {step === "success" && (
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-green-600">
                  <CheckCircle className="w-5 h-5" />
                  Analysis Started
                </CardTitle>
                <CardDescription>Your video is being processed for lane detection</CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  We'll send the results to <strong>{email}</strong> when processing is complete.
                </p>
                <div className="flex gap-2">
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href="/">Back to Home</Link>
                  </Button>
                  <Button onClick={() => setStep("upload")} className="flex-1">
                    Upload Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  )
}
