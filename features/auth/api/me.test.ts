import { describe, expect, it, vi } from "vitest";
import { fetchMe, isAdminRole } from "./me";

vi.mock("@/shared/lib/api/client", () => ({
  apiFetch: vi.fn(),
}));

import { apiFetch } from "@/shared/lib/api/client";

describe("auth me", () => {
  it("isAdminRole accepts admin roles", () => {
    expect(isAdminRole("admin")).toBe(true);
    expect(isAdminRole("super_admin")).toBe(true);
    expect(isAdminRole("member")).toBe(false);
  });

  it("fetchMe rejects non-admin profiles", async () => {
    vi.mocked(apiFetch).mockResolvedValueOnce({
      data: {
        id: "1",
        role: "member",
        name: "Member",
        email: "m@x.com",
      },
    });

    await expect(fetchMe("token")).rejects.toThrow("Admin credentials required");
  });

  it("fetchMe returns admin profile", async () => {
    const profile = {
      id: "1",
      role: "admin",
      name: "Admin",
      email: "a@x.com",
    };
    vi.mocked(apiFetch).mockResolvedValueOnce({ data: profile });

    await expect(fetchMe("token")).resolves.toEqual(profile);
  });
});
