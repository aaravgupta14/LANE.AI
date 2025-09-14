-- Create admin users table for developer access control
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'developer')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies - only admins can manage admin users
CREATE POLICY "Allow admins to view admin users" 
  ON public.admin_users FOR SELECT 
  USING (email IN (SELECT email FROM public.admin_users));

-- Insert default admin user (replace with your email)
INSERT INTO public.admin_users (email, role) 
VALUES ('admin@lane.ai', 'developer')
ON CONFLICT (email) DO NOTHING;
