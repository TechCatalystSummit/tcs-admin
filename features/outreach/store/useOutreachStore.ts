"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { apiFetch } from "@/shared/lib/api/client";
import { showMutationError } from "@/shared/lib/api/handleApiError";
import { toast } from "sonner";
import {
  leadStatusToApi,
  mapContact,
  mapDeck,
  mapSequence,
  mapTemplate,
  type ApiContact,
  type ApiDeck,
  type ApiOutreachAnalytics,
  type ApiSequence,
  type ApiTemplate,
} from "../api/mappers";
import type {
  AddLeadInput,
  Deck,
  Lead,
  LeadFilters,
  LeadStatus,
  OutreachChartPoint,
  QuickSendState,
  Sequence,
  Template,
} from "../types";

const emptyStats = { sentToday: 0, opensToday: 0, clicksToday: 0, repliesToday: 0 };

interface OutreachState {
  loading: boolean;
  loadError: string | null;
  load: () => Promise<void>;
  leads: Lead[];
  sequences: Sequence[];
  templates: Template[];
  decks: Deck[];
  events: { id: string; label: string }[];
  chartData: OutreachChartPoint[];
  stats: typeof emptyStats;
  filters: LeadFilters;
  selectedLeadIds: string[];
  activeLeadId: string | null;
  leadDetailOpen: boolean;
  addLeadModalOpen: boolean;
  uploadDeckModalOpen: boolean;
  activeTemplateId: string | null;
  templateEditorOpen: boolean;
  quickSend: QuickSendState;
  setFilter: (key: keyof LeadFilters, value: string) => void;
  clearFilters: () => void;
  toggleLeadSelect: (id: string) => void;
  selectAllLeads: (ids: string[]) => void;
  clearLeadSelection: () => void;
  openLeadDetail: (id: string) => void;
  closeLeadDetail: () => void;
  openAddLeadModal: () => void;
  closeAddLeadModal: () => void;
  openUploadDeckModal: () => void;
  closeUploadDeckModal: () => void;
  openTemplateEditor: (id: string) => void;
  closeTemplateEditor: () => void;
  addLead: (input: AddLeadInput) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  deleteLeads: (ids: string[]) => void;
  toggleSequence: (id: string) => void;
  toggleDeckActive: (id: string) => void;
  toggleDeckDefault: (id: string) => void;
  updateTemplate: (id: string, updates: Partial<Pick<Template, "name" | "subject" | "body">>) => void;
  deleteTemplate: (id: string) => void;
  duplicateTemplate: (id: string) => void;
  addDeck: (deck: Omit<Deck, "id" | "lastUpdated">) => void;
  setQuickSendField: (key: keyof QuickSendState, value: string) => void;
  sendQuickEmail: () => void;
  getFilteredLeads: () => Lead[];
  getActiveLead: () => Lead | undefined;
  getActiveTemplate: () => Template | undefined;
  getActiveSequences: () => Sequence[];
}

const defaultFilters: LeadFilters = {
  stage: "",
  status: "",
  source: "",
  industry: "",
  search: "",
};

const defaultQuickSend: QuickSendState = {
  email: "",
  name: "",
  company: "",
  // Empty = let the API auto-pick the next sponsorable event, default deck and template.
  eventId: "",
  deckId: "",
  templateId: "",
};

export const useOutreachStore = create<OutreachState>()(
  immer((set, get) => ({
    loading: false,
    loadError: null,
    load: async () => {
      set((st) => { st.loading = true; st.loadError = null; });
      try {
        const [contacts, templates, decks, sequences, events, analytics] = await Promise.all([
          apiFetch<ApiContact[]>("/api/outreach/contacts", { params: { page: 1, perPage: 100 } }),
          apiFetch<ApiTemplate[]>("/api/outreach/templates", { params: { page: 1, perPage: 100 } }),
          apiFetch<ApiDeck[]>("/api/outreach/decks", { params: { page: 1, perPage: 100 } }),
          apiFetch<ApiSequence[]>("/api/outreach/sequences", { params: { page: 1, perPage: 100 } }),
          apiFetch<{ id: string; title: string }[]>("/api/events/admin", { params: { page: 1, perPage: 100 } }),
          apiFetch<ApiOutreachAnalytics>("/api/outreach/analytics"),
        ]);
        set((st) => {
          st.leads = contacts.data.map(mapContact);
          st.templates = templates.data.map(mapTemplate);
          st.decks = decks.data.map(mapDeck);
          st.sequences = sequences.data.map(mapSequence);
          st.events = events.data.map((e) => ({ id: e.id, label: e.title }));
          const a = analytics.data;
          st.stats = {
            sentToday: a.today.sent,
            opensToday: a.today.opens,
            clicksToday: a.today.clicks,
            repliesToday: a.today.replies,
          };
          st.chartData = a.chart.map((c) => ({ date: c.date.slice(5), sent: c.sent, openRate: c.openRate / 100 }));
          st.loading = false;
        });
      } catch (e) {
        set((st) => { st.loading = false; st.loadError = e instanceof Error ? e.message : "Failed to load outreach data"; });
      }
    },
    leads: [],
    sequences: [],
    templates: [],
    decks: [],
    events: [],
    chartData: [],
    stats: emptyStats,
    filters: defaultFilters,
    selectedLeadIds: [],
    activeLeadId: null,
    leadDetailOpen: false,
    addLeadModalOpen: false,
    uploadDeckModalOpen: false,
    activeTemplateId: null,
    templateEditorOpen: false,
    quickSend: defaultQuickSend,
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    toggleLeadSelect: (id) =>
      set((state) => {
        const idx = state.selectedLeadIds.indexOf(id);
        if (idx >= 0) state.selectedLeadIds.splice(idx, 1);
        else state.selectedLeadIds.push(id);
      }),
    selectAllLeads: (ids) => set((state) => { state.selectedLeadIds = ids; }),
    clearLeadSelection: () => set((state) => { state.selectedLeadIds = []; }),
    openLeadDetail: (id) =>
      set((state) => {
        state.activeLeadId = id;
        state.leadDetailOpen = true;
      }),
    closeLeadDetail: () =>
      set((state) => {
        state.leadDetailOpen = false;
        state.activeLeadId = null;
      }),
    openAddLeadModal: () => set((state) => { state.addLeadModalOpen = true; }),
    closeAddLeadModal: () => set((state) => { state.addLeadModalOpen = false; }),
    openUploadDeckModal: () => set((state) => { state.uploadDeckModalOpen = true; }),
    closeUploadDeckModal: () => set((state) => { state.uploadDeckModalOpen = false; }),
    openTemplateEditor: (id) =>
      set((state) => {
        state.activeTemplateId = id;
        state.templateEditorOpen = true;
      }),
    closeTemplateEditor: () =>
      set((state) => {
        state.templateEditorOpen = false;
        state.activeTemplateId = null;
      }),
    addLead: (input) => {
      void apiFetch("/api/outreach/contacts", {
        method: "POST",
        body: {
          name: input.name,
          email: input.email,
          company: input.company || undefined,
          title: input.title || undefined,
          phone: input.phone || undefined,
          industry: input.industry || undefined,
          source: input.source || undefined,
          sponsorType: input.sponsorType || undefined,
          eventInterest: input.eventInterest || undefined,
          consentSource: "admin_manual_entry",
        },
      }).then(async () => {
        set((state) => { state.addLeadModalOpen = false; });
        toast.success("Lead added");
        await get().load();
      }, showMutationError);
    },
    updateLeadStatus: (id, status) => {
      void apiFetch(`/api/outreach/contacts/${id}`, {
        method: "PATCH",
        body: { status: leadStatusToApi(status) },
      }).then(() => {
        set((state) => {
          const lead = state.leads.find((l) => l.id === id);
          if (lead) lead.status = status;
        });
      }, showMutationError);
    },
    deleteLeads: (ids) => {
      void Promise.all(
        ids.map((id) => apiFetch(`/api/outreach/contacts/${id}`, { method: "DELETE" })),
      ).then(() => {
        set((state) => {
          state.leads = state.leads.filter((l) => !ids.includes(l.id));
          state.selectedLeadIds = state.selectedLeadIds.filter((id) => !ids.includes(id));
        });
      }, showMutationError);
    },
    toggleSequence: (id) => {
      const seq = get().sequences.find((s) => s.id === id);
      if (!seq) return;
      const isActive = seq.status !== "active";
      void apiFetch(`/api/outreach/sequences/${id}`, { method: "PATCH", body: { isActive } }).then(() => {
        set((state) => {
          const s = state.sequences.find((x) => x.id === id);
          if (s) s.status = isActive ? "active" : "paused";
        });
      }, showMutationError);
    },
    toggleDeckActive: (id) => {
      const deck = get().decks.find((d) => d.id === id);
      if (!deck) return;
      void apiFetch(`/api/outreach/decks/${id}`, {
        method: "PATCH",
        body: { isActive: !deck.isActive },
      }).then(() => {
        set((state) => {
          const d = state.decks.find((x) => x.id === id);
          if (d) d.isActive = !d.isActive;
        });
      }, showMutationError);
    },
    toggleDeckDefault: (id) => {
      void apiFetch(`/api/outreach/decks/${id}`, {
        method: "PATCH",
        body: { isDefault: true },
      }).then(() => get().load(), showMutationError);
    },
    updateTemplate: (id, updates) => {
      const body: Record<string, unknown> = {};
      if (updates.name !== undefined) body.name = updates.name;
      if (updates.subject !== undefined) body.subject = updates.subject;
      if (updates.body !== undefined) body.bodyHtml = updates.body;
      void apiFetch(`/api/outreach/templates/${id}`, { method: "PATCH", body }).then(() => {
        set((state) => {
          const tpl = state.templates.find((t) => t.id === id);
          if (tpl) Object.assign(tpl, updates);
        });
        toast.success("Template saved");
      }, showMutationError);
    },
    deleteTemplate: (id) => {
      void apiFetch(`/api/outreach/templates/${id}`, { method: "DELETE" }).then(() => {
        set((state) => {
          state.templates = state.templates.filter((t) => t.id !== id);
        });
      }, showMutationError);
    },
    duplicateTemplate: (id) => {
      const tpl = get().templates.find((t) => t.id === id);
      if (!tpl) return;
      void apiFetch("/api/outreach/templates", {
        method: "POST",
        body: {
          name: `${tpl.name} (Copy)`,
          templateType: tpl.type,
          subject: tpl.subject,
          bodyHtml: tpl.body,
          variables: tpl.variables,
        },
      }).then(() => get().load(), showMutationError);
    },
    addDeck: (deck) => {
      void apiFetch("/api/outreach/decks", {
        method: "POST",
        body: {
          title: deck.title,
          deckType: deck.type,
          fileUrl: deck.fileUrl,
          version: deck.version,
          eventId: deck.eventAssociation || undefined,
          isActive: deck.isActive,
        },
      }).then(async () => {
        set((state) => { state.uploadDeckModalOpen = false; });
        toast.success("Deck added");
        await get().load();
      }, showMutationError);
    },
    setQuickSendField: (key, value) =>
      set((state) => {
        state.quickSend[key] = value;
      }),
    sendQuickEmail: () => {
      const q = get().quickSend;
      if (!q.email.trim()) {
        toast.error("Enter an email address");
        return;
      }
      void apiFetch("/api/outreach/quick-send", {
        method: "POST",
        body: {
          email: q.email.trim(),
          name: q.name.trim() || undefined,
          company: q.company.trim() || undefined,
          eventId: q.eventId || undefined,
          deckId: q.deckId || undefined,
          templateId: q.templateId || undefined,
        },
      }).then(async () => {
        toast.success("Email sent");
        set((state) => { state.quickSend = { ...defaultQuickSend }; });
        await get().load();
      }, showMutationError);
    },
    getFilteredLeads: () => {
      const { leads, filters } = get();
      return leads.filter((lead) => {
        if (filters.stage && lead.stage !== filters.stage) return false;
        if (filters.status && lead.status !== filters.status) return false;
        if (filters.source && lead.source !== filters.source) return false;
        if (filters.industry && lead.industry !== filters.industry) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            lead.name.toLowerCase().includes(q) ||
            lead.company.toLowerCase().includes(q) ||
            lead.email.toLowerCase().includes(q) ||
            lead.title.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },
    getActiveLead: () => {
      const { leads, activeLeadId } = get();
      return leads.find((l) => l.id === activeLeadId);
    },
    getActiveTemplate: () => {
      const { templates, activeTemplateId } = get();
      return templates.find((t) => t.id === activeTemplateId);
    },
    getActiveSequences: () => {
      const { sequences } = get();
      return sequences.filter((s) => s.status === "active").slice(0, 3);
    },
  })),
);
