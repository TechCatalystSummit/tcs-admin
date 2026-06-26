import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const API = "http://localhost:4000";

const dashboardStatsFixture = {
  members: { total: 42, approved: 38, pending: 2 },
  events: { upcoming: 3, totalRsvps: 12 },
  intros: { pending: 1, approved: 0, completed: 4 },
  revenue: { mtdCents: 250_000, activeSubscriptions: 5 },
  trends: {
    revenueByMonth: [
      { label: "Jan", valueCents: 0 },
      { label: "Feb", valueCents: 50000 },
      { label: "Mar", valueCents: 0 },
      { label: "Apr", valueCents: 0 },
      { label: "May", valueCents: 100000 },
      { label: "Jun", valueCents: 100000 },
    ],
    signupsByWeek: [
      { label: "May 1", count: 1 },
      { label: "May 8", count: 0 },
      { label: "May 15", count: 2 },
      { label: "May 22", count: 0 },
      { label: "May 29", count: 1 },
      { label: "Jun 5", count: 0 },
    ],
  },
  recentSignups: [
    {
      id: "a1111111-1111-4111-8111-111111111111",
      name: "Jane Doe",
      company: "Acme",
      joinedAt: "2026-06-20T10:00:00.000Z",
    },
  ],
  recentOutcomes: [
    {
      id: "o1",
      outcomeType: "meeting_completed",
      createdAt: "2026-06-21T10:00:00.000Z",
    },
  ],
  outreach: { activeCampaigns: 0, emailsSent30d: 0 },
  outcomes: { estimatedValueTotal: 0 },
};

export const handlers = [
  http.get(`${API}/api/analytics/dashboard`, () =>
    HttpResponse.json({ success: true, data: dashboardStatsFixture }),
  ),
  http.get(`${API}/api/members/pending`, () =>
    HttpResponse.json({
      success: true,
      data: [
        {
          id: "p1111111-1111-4111-8111-111111111111",
          role: "member",
          name: "Pending User",
          email: "pending@example.com",
          company: "Startup",
          isApproved: false,
          createdAt: "2026-06-01T10:00:00.000Z",
          tier: "community",
        },
      ],
      meta: { page: 1, perPage: 100, total: 1 },
    }),
  ),
  http.get(`${API}/api/payments`, () =>
    HttpResponse.json({
      success: true,
      data: [],
      meta: { page: 1, perPage: 100, total: 0 },
    }),
  ),
  http.get(`${API}/api/intros`, () =>
    HttpResponse.json({
      success: true,
      data: [],
      meta: { page: 1, perPage: 100, total: 0 },
    }),
  ),
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
          eventType: "summit",
          startsAt: "2025-08-01T18:00:00.000Z",
          endsAt: "2025-08-01T21:00:00.000Z",
          city: "Austin",
          capacity: 50,
        },
      ],
      meta: { page: 1, perPage: 100, total: 1 },
    }),
  ),
  http.get(`${API}/api/events/admin/:id`, ({ params }) =>
    HttpResponse.json({
      success: true,
      data: {
        id: params.id,
        title: "Demo Night",
        status: "draft",
        eventType: "summit",
        startsAt: "2025-08-01T18:00:00.000Z",
        endsAt: "2025-08-01T21:00:00.000Z",
        city: "Austin",
        venueName: "Convention Center",
        capacity: 50,
        speakers: [{ name: "Jane Doe", title: "CEO", company: "Acme", bio: "Speaker bio" }],
        agenda: [{ time: "09:00", title: "Opening", speaker_id: "speaker-0" }],
        sponsorIds: [],
      },
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
