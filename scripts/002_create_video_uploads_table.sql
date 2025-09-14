-- Create video uploads table to store uploaded videos and processing results
CREATE TABLE IF NOT EXISTS public.video_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id UUID NOT NULL REFERENCES public.registrations(id) ON DELETE CASCADE,
  original_filename TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size BIGINT,
  processing_status TEXT NOT NULL DEFAULT 'uploaded' CHECK (processing_status IN ('uploaded', 'processing', 'completed', 'failed')),
  lane_detection_result JSONB,
  processed_video_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.video_uploads ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public to insert video uploads" 
  ON public.video_uploads FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public to view video uploads" 
  ON public.video_uploads FOR SELECT 
  USING (true);

CREATE POLICY "Allow public to update video uploads" 
  ON public.video_uploads FOR UPDATE 
  USING (true);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_video_uploads_registration_id ON public.video_uploads(registration_id);
CREATE INDEX IF NOT EXISTS idx_video_uploads_status ON public.video_uploads(processing_status);
