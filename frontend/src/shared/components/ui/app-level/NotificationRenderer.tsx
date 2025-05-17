import { useEffect } from "react";
import { notification } from "antd";
import { useNotificationStore } from "../../../store/useNotificationStore";

export const NotificationRenderer = () => {
  const { notifications, clearNotifications } = useNotificationStore();

  useEffect(() => {
    if (notifications.length === 0) return;

    notifications.forEach(
      ({
        type,
        message,
        description,
        duration = 1,
        placement = "topRight",
      }) => {
        notification[type]({
          message,
          description,
          duration,
          placement,
        });
      }
    );

    clearNotifications();
  }, [notifications]);

  return null;
};
