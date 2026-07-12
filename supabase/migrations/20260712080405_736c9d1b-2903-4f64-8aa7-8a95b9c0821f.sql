
DROP POLICY IF EXISTS "Anyone can submit complaints" ON public.complaints;
CREATE POLICY "Anyone can submit valid complaints"
  ON public.complaints FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    length(trim(student_name)) > 0
    AND length(trim(student_id)) > 0
    AND length(trim(category)) > 0
    AND length(trim(description)) > 0
  );
