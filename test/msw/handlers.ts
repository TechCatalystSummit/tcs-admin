import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const API = "http://localhost:4000";

export const handlers = [
  http.get(`${API}/api/members`, () =>
    HttpResponse.json({
      success: true,
      data: [
        {
          id: "a1111111-1111-4111-8111-111111111111",
          role: "member",
          name: "Jane Doe",
          email: "jane@example.com",
          isApproved: true,
          createdAt: "2025-01-15T10:00:00.000Z",
          tier: "builder",
        },
      ],
      meta: { page: 1, perPage: 25, total: 1 },
    }),
  ),
  http.get(`${API}/api/membership/tiers`, () =>
    HttpResponse.json({
      success: true,
      data: [
        {
          id: "t1",
          name: "builder",
          annualPrice: 99900,
          maxIntros: 10,
          dinnerCredits: 0,
          features: [],
          sortOrder: 2,
        },
      ],
    }),
  ),
  http.get(`${API}/api/outcomes`, () =>
    HttpResponse.json({ success: true, data: [], meta: { page: 1, perPage: 25, total: 0 } }),
  ),
  http.get(`${API}/api/events/admin`, () =>
    HttpResponse.json({
      success: true,
      data: [
        {
          id: "e1",
          title: "Demo Night",
          status: "published",
          startsAt: "2025-08-01T18:00:00.000Z",
          endsAt: "2025-08-01T21:00:00.000Z",
          location: "Austin",
          capacity: 50,
          rsvpCount: 10,
        },
      ],
      meta: { page: 1, perPage: 100, total: 1 },
    }),
  ),
  http.get(`${API}/api/sponsors`, () =>
    HttpResponse.json({
      success: true,
      data: [{ id: "s1", name: "Acme", status: "active", tier: "gold" }],
      meta: { page: 1, perPage: 25, total: 1 },
    }),
  ),
];

export const server = setupServer(...handlers);
