"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockApprovals } from "../data/mockApprovals";
import { mockMembers } from "../data/mockMembers";
import type { AdminMember, ApprovalRequest, MemberFilters } from "../types";

interface MembersState {
  members: AdminMember[];
  approvals: ApprovalRequest[];
  filters: MemberFilters;
  selectedIds: string[];
  approvalTab: "all" | "pending" | "approved" | "declined";
  setFilter: (key: keyof MemberFilters, value: string) => void;
  clearFilters: () => void;
  setApprovalTab: (tab: MembersState["approvalTab"]) => void;
  toggleSelect: (id: string) => void;
  selectAll: (ids: string[]) => void;
  clearSelection: () => void;
  approveMember: (id: string) => void;
  declineMember: (id: string) => void;
  bulkApproveMembers: (ids: string[]) => void;
  approveApproval: (id: string) => void;
  declineApproval: (id: string) => void;
  getFilteredMembers: () => AdminMember[];
  getFilteredApprovals: () => ApprovalRequest[];
}

const defaultFilters: MemberFilters = { tier: "", role: "", status: "", search: "" };

export const useMembersStore = create<MembersState>()(
  immer((set, get) => ({
    members: mockMembers,
    approvals: mockApprovals,
    filters: defaultFilters,
    selectedIds: [],
    approvalTab: "all",
    setFilter: (key, value) =>
      set((state) => {
        state.filters[key] = value;
      }),
    clearFilters: () => set((state) => { state.filters = defaultFilters; }),
    setApprovalTab: (tab) => set((state) => { state.approvalTab = tab; }),
    toggleSelect: (id) =>
      set((state) => {
        const idx = state.selectedIds.indexOf(id);
        if (idx >= 0) state.selectedIds.splice(idx, 1);
        else state.selectedIds.push(id);
      }),
    selectAll: (ids) => set((state) => { state.selectedIds = ids; }),
    clearSelection: () => set((state) => { state.selectedIds = []; }),
    approveMember: (id) =>
      set((state) => {
        const m = state.members.find((x) => x.id === id);
        if (m) m.status = "active";
      }),
    declineMember: (id) =>
      set((state) => {
        const m = state.members.find((x) => x.id === id);
        if (m) m.status = "declined";
      }),
    bulkApproveMembers: (ids) =>
      set((state) => {
        for (const id of ids) {
          const m = state.members.find((x) => x.id === id);
          if (m) m.status = "active";
        }
        state.selectedIds = [];
      }),
    approveApproval: (id) =>
      set((state) => {
        const a = state.approvals.find((x) => x.id === id);
        if (a) a.status = "approved";
      }),
    declineApproval: (id) =>
      set((state) => {
        const a = state.approvals.find((x) => x.id === id);
        if (a) a.status = "declined";
      }),
    getFilteredMembers: () => {
      const { members, filters } = get();
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
    getFilteredApprovals: () => {
      const { approvals, approvalTab } = get();
      if (approvalTab === "all") return approvals;
      return approvals.filter((a) => a.status === approvalTab);
    },
  })),
);
