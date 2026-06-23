import { apiFetch } from "@/shared/lib/api/client";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "./session";

export interface MeProfile {
  id: string;
  role: string;
  name: string;
  email: string;
  phone?: string | null;
  title?: string | null;
  company?: string | null;
  city?: string | null;
  bio?: string | null;
  photoUrl?: string | null;
  isVerified?: boolean;
  isApproved?: boolean;
  tier?: string;
  membership?: {
    tier?: { name: string };
  };
}

const ADMIN_ROLES = new Set(["admin", "super_admin"]);

export function isAdminRole(role: string): boolean {
  return ADMIN_ROLES.has(role);
}

export async function fetchMe(token?: string | null) {
  const { data } = await apiFetch<MeProfile>("/api/me", { token: token ?? undefined });
  if (!isAdminRole(data.role)) {
    throw new Error("Access denied. Admin credentials required.");
  }
  return data;
}

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = await getAccessToken();
      if (!token) throw new Error("Not authenticated");
      return fetchMe(token);
    },
    enabled,
    retry: false,
  });
}
