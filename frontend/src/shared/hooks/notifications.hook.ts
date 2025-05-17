import { notification } from "antd";

const DEFAULT_DURATION = 3;

export const useAppNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openSuccess = (
    message: string,
    description?: string,
    duration: number = DEFAULT_DURATION
  ) => {
    api.success({ message, description, duration });
  };

  const openError = (
    message: string,
    description?: string,
    duration: number = DEFAULT_DURATION
  ) => {
    api.error({ message, description, duration });
  };

  return {
    contextHolder,
    openSuccess,
    openError,
  };
};
