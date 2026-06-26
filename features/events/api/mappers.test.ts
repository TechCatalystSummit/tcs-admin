import { describe, expect, it } from "vitest";
import { mapApiAttendee, mapApiEvent } from "./mappers";
import type { ApiEventAttendee } from "./mappers";

const baseAttendee: ApiEventAttendee = {
  rsvpId: "r1111111-1111-4111-8111-111111111111",
  status: "confirmed",
  isVip: true,
  checkedInAt: "2026-03-15T09:15:00.000Z",
  user: {
    id: "a1111111-1111-4111-8111-111111111111",
    name: "Jane Doe",
    email: "jane@example.com",
    tier: "executive",
  },
};

describe("event mappers", () => {
  it("maps API attendee to EventAttendee", () => {
    const attendee = mapApiAttendee(baseAttendee);
    expect(attendee.name).toBe("Jane Doe");
    expect(attendee.tier).toBe("executive");
    expect(attendee.rsvpStatus).toBe("confirmed");
    expect(attendee.isVip).toBe(true);
    expect(attendee.checkedInAt).toBe(baseAttendee.checkedInAt);
  });

  it("defaults unknown tier to community", () => {
    const attendee = mapApiAttendee({
      ...baseAttendee,
      user: { ...baseAttendee.user, tier: "unknown" },
    });
    expect(attendee.tier).toBe("community");
  });

  it("maps waitlisted RSVP status", () => {
    const attendee = mapApiAttendee({ ...baseAttendee, status: "waitlisted" });
    expect(attendee.rsvpStatus).toBe("waitlist");
  });

  it("maps API event speakers and agenda", () => {
    const event = mapApiEvent({
      id: "e1",
      title: "Summit",
      startsAt: "2026-01-01T09:00:00.000Z",
      speakers: [{ name: "Jane", title: "CTO", company: "Acme", bio: "Bio" }],
      agenda: [{ time: "10:00", title: "Keynote", speaker_id: "s1" }],
    });
    expect(event.speakers[0]?.name).toBe("Jane");
    expect(event.agenda[0]?.title).toBe("Keynote");
    expect(event.agenda[0]?.speakerId).toBe("s1");
  });
});
