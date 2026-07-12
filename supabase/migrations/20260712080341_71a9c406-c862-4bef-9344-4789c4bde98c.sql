
CREATE TABLE public.complaints (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  complaint_code TEXT NOT NULL UNIQUE DEFAULT ('CMP-' || lpad((floor(random() * 90000) + 10000)::text, 5, '0')),
  student_name TEXT NOT NULL,
  student_id TEXT NOT NULL,
  hostel_block TEXT,
  room_number TEXT,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.complaints TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.complaints TO authenticated;
GRANT ALL ON public.complaints TO service_role;

ALTER TABLE public.complaints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit complaints"
  ON public.complaints FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can view complaints"
  ON public.complaints FOR SELECT
  TO anon, authenticated
  USING (true);
