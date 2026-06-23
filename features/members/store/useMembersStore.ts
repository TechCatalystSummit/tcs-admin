"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { AdminMember, ApprovalRequest, MemberFilters } from "../types";

interface MembersState {
  filters: MemberFilters;
  selectedIds: string[];
  sheetMemberId: string | null;
  approvalTab: "all" | "pending" | "approved" | "declined";
  setFilter: (key: keyof MemberFilters, value: string) => void;
  clearFilters: () => void;
  setApprovalTab: (tab: MembersState["approvalTab"]) => void;
  openMemberSheet: (id: string) => void;
  closeMemberSheet: () => void;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  filterMembers: (members: AdminMember[]) => AdminMember[];
  filterApprovals: (approvals: ApprovalRequest[]) => ApprovalRequest[];
}

const defaultFilters: MemberFilters = { tier: "", role: "", status: "", search: "" };

export const useMembersStore = create<MembersState>()(
  immer((set, get) => ({
    filters: defaultFilters,
    selectedIds: [],
    sheetMemberId: null,
    approvalTab: "all",

    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    setApprovalTab: (tab) => set((state) => { state.approvalTab = tab; }),
    openMemberSheet: (id) => set((state) => { state.sheetMemberId = id; }),
    closeMemberSheet: () => set((state) => { state.sheetMemberId = null; }),
    toggleSelect: (id) =>
      set((state) => {
        const idx = state.selectedIds.indexOf(id);
        if (idx >= 0) state.selectedIds.splice(idx, 1);
        else state.selectedIds.push(id);
      }),
    selectAll: (ids) => set((state) => { state.selectedIds = ids; }),
    clearSelection: () => set((state) => { state.selectedIds = []; }),

    filterMembers: (members) => {
      const { filters } = get();
      return members.filter((m) => {
        if (filters.tier && m.tier !== filters.tier) return false;
        if (filters.role && m.role !== filters.role) return false;
        if (filters.status && m.status !== filters.status) return false;
        if (filters.search) {
          const q = filters.search.toLowerCase();
          return (
            m.name.toLowerCase().includes(q) ||
            m.company.toLowerCase().includes(q) ||
            m.email.toLowerCase().includes(q)
          );
        }
        return true;
      });
    },

    filterApprovals: (approvals) => {
      const { approvalTab } = get();
      if (approvalTab === "all") return approvals;
      return approvals.filter((a) => a.status === approvalTab);
    },
  })),
);
