import { create } from "zustand";

type NotificationType = "success" | "error" | "info" | "warning";
type NotificationPlacement =
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

type Notification = {
  type: NotificationType;
  message: string;
  description?: string;
  duration?: number;
  placement?: NotificationPlacement;
};

type NotificationState = {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  clearNotifications: () => set({ notifications: [] }),
}));
