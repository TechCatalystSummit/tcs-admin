import { supabase } from "@/shared/lib/supabase/client";
import type { Session } from "@supabase/supabase-js";

const MIN_PASSWORD_LENGTH = 6;

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "http://localhost:3000";
}

/** Member Summit email links — must match Summit EXPO_PUBLIC_AUTH_WEB_CALLBACK_URL and tcs-api MEMBER_AUTH_WEB_CALLBACK_URL */
export function getMemberAuthRedirectUrl(): string {
  return `${getSiteUrl()}/auth/callback`;
}

export function getAdminAuthRedirectUrl(): string {
  return `${getSiteUrl()}/admin/auth/callback`;
}

export async function getAccessToken(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data.session?.access_token ?? null;
}

export async function getSession(): Promise<Session | null> {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function signInWithPassword(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export function onAuthStateChange(callback: (session: Session | null) => void) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return data.subscription;
}

export async function createSessionFromParams(params: Record<string, string>) {
  if (params.error || params.error_description) {
    throw new Error(params.error_description ?? params.error ?? "Auth failed");
  }

  if (params.access_token && params.refresh_token) {
    const { data, error } = await supabase.auth.setSession({
      access_token: params.access_token,
      refresh_token: params.refresh_token,
    });
    if (error) throw error;
    return data.session;
  }

  if (params.code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(params.code);
    if (error) throw error;
    return data.session;
  }

  return null;
}

export async function resetPasswordForEmail(email: string, redirectTo: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo,
  });
  if (error) throw error;
}

export async function updateUserPassword(password: string) {
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`);
  }
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
  return data.user;
}
