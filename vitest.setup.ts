import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./test/msw/handlers";

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
