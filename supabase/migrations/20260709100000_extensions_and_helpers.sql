-- Coach Zone — extensions and helper functions
-- Migration 1 of 4. Run this first.

-- pgcrypto provides gen_random_bytes(), used below to generate share tokens.
-- (gen_random_uuid() used elsewhere is already built into Postgres core.)
create extension if not exists pgcrypto;

-- Generates a short, URL-safe random token for public workout share links.
create or replace function public.generate_share_id()
returns text
language sql
volatile
as $$
  select rtrim(translate(encode(gen_random_bytes(9), 'base64'), '+/', '-_'), '=');
$$;
