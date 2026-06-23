import { describe, expect, it } from "vitest";
import { ApiError } from "./types";
import { getErrorMessage, isApiError, isHandledGlobally } from "./errors";

describe("errors", () => {
  it("getErrorMessage handles strings", () => {
    expect(getErrorMessage("Invalid login credentials")).toBe("Invalid login credentials");
  });

  it("getErrorMessage handles ApiError", () => {
    expect(getErrorMessage(new ApiError(401, "UNAUTHORIZED", "Unauthorized"))).toBe("Unauthorized");
  });

  it("isHandledGlobally for 401 and 403", () => {
    expect(isHandledGlobally(new ApiError(401, "UNAUTHORIZED", "x"))).toBe(true);
    expect(isHandledGlobally(new ApiError(403, "FORBIDDEN", "x"))).toBe(true);
    expect(isHandledGlobally(new ApiError(500, "INTERNAL_ERROR", "x"))).toBe(false);
  });

  it("isApiError narrows type", () => {
    const err = new ApiError(422, "VALIDATION_ERROR", "Bad input");
    expect(isApiError(err)).toBe(true);
    expect(isApiError(new Error("nope"))).toBe(false);
  });
});
