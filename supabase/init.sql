-- Supabase initialization SQL
-- Ensure crypto functions for gen_random_uuid()
create extension if not exists "pgcrypto";

-- Supabase initialization SQL
-- Users table
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  name text,
  battalion text,
  created_at timestamptz default now(),
  is_early_history_completed boolean default false,
  is_otef_aza_completed boolean default false
);

-- Idempotent column add for DBs created before `battalion` existed.
alter table users add column if not exists battalion text;

-- Rooms table
create table if not exists rooms (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  host_id uuid references users(id) on delete set null,
  participants jsonb default '[]'::jsonb,
  status text default 'waiting',
  created_at timestamptz default now()
);

-- Defense-in-depth: API routes use the service role key which BYPASSES RLS.
-- These policies only matter if the anon/authenticated key is ever used to
-- talk to the DB directly (e.g. via supabaseBrowser). Deny-by-default.
alter table users enable row level security;
alter table rooms enable row level security;
-- No policies = anon/authenticated have zero access. Service role unaffected.
