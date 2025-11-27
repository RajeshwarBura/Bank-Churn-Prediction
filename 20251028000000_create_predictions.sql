-- Create predictions table to store churn predictions per user
CREATE TABLE IF NOT EXISTS public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  features JSONB NOT NULL,
  prediction INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;

-- Foreign key to auth.users (not enforced in Postgres without extension, but we keep reference)
-- Optionally: references auth.users(id) on delete cascade;

-- RLS policies
CREATE POLICY "Users can insert their own predictions"
  ON public.predictions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own predictions"
  ON public.predictions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS predictions_user_id_created_at_idx
  ON public.predictions (user_id, created_at DESC);


