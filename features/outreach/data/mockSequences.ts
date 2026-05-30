import type { Sequence } from "../types";

export const mockSequences: Sequence[] = [
  {
    id: "seq_001",
    name: "Sponsor Follow-up — Standard",
    description: "5-touch sequence for warm sponsor leads after initial deck send.",
    status: "active",
    contactCount: 47,
    steps: [
      { id: "s1_1", dayOffset: 0, templateId: "tpl_001", subject: "TCS Summit 2026 — Sponsorship Opportunity" },
      { id: "s1_2", dayOffset: 2, templateId: "tpl_002", subject: "Quick follow-up on TCS partnership" },
      { id: "s1_3", dayOffset: 5, templateId: "tpl_003", subject: "Case study: ROI from last year's sponsors" },
      { id: "s1_4", dayOffset: 8, templateId: "tpl_004", subject: "Limited booth slots remaining" },
      { id: "s1_5", dayOffset: 12, templateId: "tpl_005", subject: "Final check-in before early-bird deadline" },
    ],
  },
  {
    id: "seq_002",
    name: "Investor Outreach — Post Event",
    description: "3-step nurture for investors met at regional events.",
    status: "active",
    contactCount: 23,
    steps: [
      { id: "s2_1", dayOffset: 0, templateId: "tpl_006", subject: "Great meeting you at TCS" },
      { id: "s2_2", dayOffset: 3, templateId: "tpl_007", subject: "Member portfolio highlights" },
      { id: "s2_3", dayOffset: 7, templateId: "tpl_008", subject: "Exclusive investor dinner invite" },
    ],
  },
  {
    id: "seq_003",
    name: "Vendor Re-engagement",
    description: "Re-activate cold vendor leads from previous quarters.",
    status: "paused",
    contactCount: 89,
    steps: [
      { id: "s3_1", dayOffset: 0, templateId: "tpl_009", subject: "Reconnecting — TCS 2026 vendor program" },
      { id: "s3_2", dayOffset: 4, templateId: "tpl_002", subject: "What's new at TechCatalyst Summit" },
      { id: "s3_3", dayOffset: 10, templateId: "tpl_010", subject: "Last chance: vendor showcase slots" },
    ],
  },
];
