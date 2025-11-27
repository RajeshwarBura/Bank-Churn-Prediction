-- Create business users table (linked to auth.users via user_id)

-- Reusable enums
DO $$ BEGIN
  CREATE TYPE public.gender_enum AS ENUM ('male','female');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.contract_enum AS ENUM ('month_to_month','one_year','two_year');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.payment_method_enum AS ENUM ('electronic_check','mailed_check','bank_transfer','credit_card');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Main table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- owner from auth.users

  customer_id TEXT,                       -- CustomerId
  gender gender_enum,                     -- Gender
  age INTEGER,                            -- Age
  senior_citizen BOOLEAN,                 -- SeniorCitiz
  tenure INTEGER,                         -- Tenure (months)
  plan_type TEXT,                         -- PlanType
  monthly_charges NUMERIC,                -- MonthlyCharges
  total_charges NUMERIC,                  -- TotalCharges
  home_internet BOOLEAN,                  -- HomeInter
  mobile_device BOOLEAN,                  -- MobileDev
  phone_service BOOLEAN,                  -- PhoneServ
  multiple_products BOOLEAN,              -- MultiplePr
  family_members INTEGER,                 -- FamilyMer
  online_security BOOLEAN,                -- OnlineSecu
  online_backup BOOLEAN,                  -- OnlineBac(k)
  device_protection BOOLEAN,              -- DevicePro
  tech_support BOOLEAN,                   -- TechSuppo
  additional_services TEXT,               -- Additionals (free text)
  streaming_tv BOOLEAN,                   -- StreamingT/V
  streaming_movies BOOLEAN,               -- StreamingM
  contract contract_enum,                 -- Contract
  paperless_billing BOOLEAN,              -- PaperlessBi
  payment_method payment_method_enum,     -- PaymentM
  fcr_last_call BOOLEAN,                  -- FCRLastCa (First Contact Resolution)
  time_to_solve_minutes INTEGER,          -- TimeToSol
  customer_complaints INTEGER,            -- CustomerComplaints
  it_tickets_raised INTEGER,              -- ITTicketsR
  churn BOOLEAN,                          -- Churn

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

  CONSTRAINT users_user_id_not_null CHECK (user_id IS NOT NULL)
);

-- RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Ownership policy: users can see and modify their own rows
CREATE POLICY "users can select own rows" ON public.users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "users can insert own rows" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users can update own rows" ON public.users
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin policy via existing public.has_role function
CREATE POLICY "admins can select all users" ON public.users
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to keep updated_at fresh
DO $$ BEGIN
  CREATE TRIGGER users_set_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Helpful index
CREATE INDEX IF NOT EXISTS users_user_id_idx ON public.users (user_id);







