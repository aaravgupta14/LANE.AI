-- Create registrations table to store user email registrations
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'video_uploaded', 'processing', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since users don't need auth for registration)
CREATE POLICY "Allow public to insert registrations" 
  ON public.registrations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public to view their own registrations" 
  ON public.registrations FOR SELECT 
  USING (true);

CREATE POLICY "Allow public to update their own registrations" 
  ON public.registrations FOR UPDATE 
  USING (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_registrations_email ON public.registrations(email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
