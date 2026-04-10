import { createClient } from '@supabase/supabase-js';

// These will be set from environment variables in production
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Stub email logger (in production, call Supabase Edge Function → Resend)
export const sendEmail = async (to: string, subject: string, body: string) => {
  console.log('[EMAIL STUB] Would send email:', { to, subject, body: body.substring(0, 100) + '...' });
  return { success: true };
};
