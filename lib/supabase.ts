import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

function isPlaceholderEnv(value: string): boolean {
  return /your-project|your-anon-key/i.test(value);
}

export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  !isPlaceholderEnv(supabaseUrl) &&
  !isPlaceholderEnv(supabaseAnonKey);

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured) return null;

  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }

  return client;
}