import { describe, expect, it } from "vitest";

import {
  buildSummitDeepLink,
  getAuthCallbackType,
  parseUrlParams,
} from "./authCallback";

describe("authCallback", () => {
  it("parses hash tokens", () => {
    const params = parseUrlParams(
      "https://example.com/auth/callback#access_token=abc&refresh_token=def&type=signup",
    );
    expect(params.access_token).toBe("abc");
    expect(params.refresh_token).toBe("def");
    expect(params.type).toBe("signup");
  });

  it("detects recovery type", () => {
    expect(getAuthCallbackType({ type: "recovery" })).toBe("recovery");
  });

  it("builds summit deep link", () => {
    expect(buildSummitDeepLink({ access_token: "a", refresh_token: "b" })).toBe(
      "tcs://auth/callback#access_token=a&refresh_token=b",
    );
  });
});
