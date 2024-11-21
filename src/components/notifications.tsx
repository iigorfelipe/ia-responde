import Toast from 'react-native-toast-message';

type NotificationFunction = (title: string, message: string, duration?: number) => void;

type Notification = {
  success: NotificationFunction;
  error: NotificationFunction;
  info: NotificationFunction;
};

const DEFAULT_DURATION = 3000;

export const Notification: Notification = {
  success: (title, message, duration) => {
    const displayDuration = duration || DEFAULT_DURATION;
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      visibilityTime: displayDuration,
      autoHide: true,
    });
  },
  error: (title, message, duration) => {
    const displayDuration = duration || DEFAULT_DURATION;
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      visibilityTime: displayDuration,
      autoHide: true,
    });
  },
  info: (title, message, duration) => {
    const displayDuration = duration || DEFAULT_DURATION;
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      visibilityTime: displayDuration,
      autoHide: true,
    });
  },
};

export default Notification;
