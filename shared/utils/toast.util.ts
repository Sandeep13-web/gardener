import { notification } from "antd";

export enum TOAST_TYPES {
  info,
  success,
  error,
  warning,
}

export const showToast = (type: TOAST_TYPES, message: string) => {
  notification.destroy();
  const placement = 'topRight'; //topLeft bottomRight bottomLeft
  switch (type) {
    case TOAST_TYPES.info:
      notification.info({
        message: message,
        placement
      })
      break;
    case TOAST_TYPES.error:
      notification.error({
        message: message,
        placement
      })
      break;
    case TOAST_TYPES.success:
      notification.success({
        message: message,
        placement
      })
      break;
    default:
      notification.success({
        message: message,
        placement
      })
  }
};
