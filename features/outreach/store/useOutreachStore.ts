"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import {
  mockDecks,
  mockOutreachChartData,
  mockOutreachEvents,
  mockOutreachStats,
} from "../data/mockDecks";
import { mockLeads } from "../data/mockLeads";
import { mockSequences } from "../data/mockSequences";
import { mockTemplates } from "../data/mockTemplates";
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

interface OutreachState {
  leads: Lead[];
  sequences: Sequence[];
  templates: Template[];
  decks: Deck[];
  events: typeof mockOutreachEvents;
  chartData: OutreachChartPoint[];
  stats: typeof mockOutreachStats;
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
  eventId: "evt_summit",
  deckId: "deck_001",
  templateId: "tpl_001",
};

export const useOutreachStore = create<OutreachState>()(
  immer((set, get) => ({
    leads: mockLeads,
    sequences: mockSequences,
    templates: mockTemplates,
    decks: mockDecks,
    events: mockOutreachEvents,
    chartData: mockOutreachChartData,
    stats: mockOutreachStats,
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
    addLead: (input) =>
      set((state) => {
        const nextId = `lead_${String(state.leads.length + 1).padStart(3, "0")}`;
        state.leads.unshift({
          id: nextId,
          ...input,
          stage: "new",
          lastContacted: new Date().toISOString().slice(0, 10),
          opens: 0,
          clicks: 0,
          replies: 0,
          meetingBooked: false,
          activity: [],
        });
        state.addLeadModalOpen = false;
      }),
    updateLeadStatus: (id, status) =>
      set((state) => {
        const lead = state.leads.find((l) => l.id === id);
        if (lead) lead.status = status;
      }),
    deleteLeads: (ids) =>
      set((state) => {
        state.leads = state.leads.filter((l) => !ids.includes(l.id));
        state.selectedLeadIds = state.selectedLeadIds.filter((id) => !ids.includes(id));
      }),
    toggleSequence: (id) =>
      set((state) => {
        const seq = state.sequences.find((s) => s.id === id);
        if (seq) seq.status = seq.status === "active" ? "paused" : "active";
      }),
    toggleDeckActive: (id) =>
      set((state) => {
        const deck = state.decks.find((d) => d.id === id);
        if (deck) deck.isActive = !deck.isActive;
      }),
    toggleDeckDefault: (id) =>
      set((state) => {
        const deck = state.decks.find((d) => d.id === id);
        if (!deck) return;
        state.decks.forEach((d) => {
          if (d.type === deck.type) d.isDefault = d.id === id;
        });
      }),
    updateTemplate: (id, updates) =>
      set((state) => {
        const tpl = state.templates.find((t) => t.id === id);
        if (tpl) Object.assign(tpl, updates);
      }),
    deleteTemplate: (id) =>
      set((state) => {
        state.templates = state.templates.filter((t) => t.id !== id);
      }),
    duplicateTemplate: (id) =>
      set((state) => {
        const tpl = state.templates.find((t) => t.id === id);
        if (!tpl) return;
        const nextId = `tpl_${String(state.templates.length + 1).padStart(3, "0")}`;
        state.templates.unshift({
          ...tpl,
          id: nextId,
          name: `${tpl.name} (Copy)`,
          lastUsed: undefined,
        });
      }),
    addDeck: (deck) =>
      set((state) => {
        const nextId = `deck_${String(state.decks.length + 1).padStart(3, "0")}`;
        state.decks.unshift({
          ...deck,
          id: nextId,
          lastUpdated: new Date().toISOString().slice(0, 10),
        });
        state.uploadDeckModalOpen = false;
      }),
    setQuickSendField: (key, value) =>
      set((state) => {
        state.quickSend[key] = value;
      }),
    sendQuickEmail: () =>
      set((state) => {
        state.stats.sentToday += 1;
        state.quickSend = { ...defaultQuickSend };
      }),
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
