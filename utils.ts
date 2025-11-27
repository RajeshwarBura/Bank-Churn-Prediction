import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Quick Supabase connection test helper
export async function testSupabaseConnection(supabase: any) {
  try {
    const { error } = await supabase.from('profiles').select('id').limit(1);
    if (error) return { ok: false, error };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e };
  }
}
