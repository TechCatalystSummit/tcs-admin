const MIN_PASSWORD_LENGTH = 6;

export const MEMBER_AUTH_HASH_KEY = "tcs_member_auth_hash";
export const SUMMIT_DEEP_LINK_BASE = "tcs://auth/callback";

export function parseUrlParams(url: string): Record<string, string> {
  const out: Record<string, string> = {};

  const hashIndex = url.indexOf("#");
  if (hashIndex >= 0) {
    const hash = url.slice(hashIndex + 1);
    for (const part of hash.split("&")) {
      const [key, value] = part.split("=");
      if (key && value) out[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }

  const queryIndex = url.indexOf("?");
  if (queryIndex >= 0) {
    const queryEnd = hashIndex >= 0 ? hashIndex : url.length;
    const query = url.slice(queryIndex + 1, queryEnd);
    for (const part of query.split("&")) {
      const [key, value] = part.split("=");
      if (key && value) out[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  }

  return out;
}

export function parseBrowserAuthParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const search = window.location.search ? `?${window.location.search.slice(1)}` : "";
  const hash = window.location.hash ? `#${window.location.hash.slice(1)}` : "";
  return parseUrlParams(`${search}${hash}`);
}

export function getAuthCallbackType(params: Record<string, string>): string | undefined {
  return params.type;
}

export function paramsToHashString(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
}

export function buildSummitDeepLink(params: Record<string, string>): string {
  const hash = paramsToHashString(params);
  return hash ? `${SUMMIT_DEEP_LINK_BASE}#${hash}` : SUMMIT_DEEP_LINK_BASE;
}

export function storeMemberAuthParams(params: Record<string, string>) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(MEMBER_AUTH_HASH_KEY, paramsToHashString(params));
}

export function readStoredMemberAuthParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const stored = sessionStorage.getItem(MEMBER_AUTH_HASH_KEY);
  if (!stored) return {};
  return parseUrlParams(`#${stored}`);
}

export function clearStoredMemberAuthParams() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(MEMBER_AUTH_HASH_KEY);
}

export function validatePassword(password: string, confirm: string): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }
  if (password !== confirm) {
    return "Passwords do not match.";
  }
  return null;
}
