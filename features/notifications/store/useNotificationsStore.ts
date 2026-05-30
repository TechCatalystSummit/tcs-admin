"use client";

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { mockNotifications } from "../data/mockNotifications";
import type { NotificationRecord, SendNotificationInput } from "../types";

interface NotificationsState {
  notifications: NotificationRecord[];
  sendNotification: (input: SendNotificationInput) => void;
}

export const useNotificationsStore = create<NotificationsState>()(
  immer((set) => ({
    notifications: mockNotifications,
    sendNotification: (input) =>
      set((state) => {
        const nextId = `notif_${String(state.notifications.length + 1).padStart(3, "0")}`;
        state.notifications.unshift({
          id: nextId,
          ...input,
          status: "sent",
          sentAt: new Date().toISOString(),
          recipientCount: input.audience === "all" ? 1247 : input.audience === "member" ? 1 : 150,
          openRate: 0,
        });
      }),
  })),
);
