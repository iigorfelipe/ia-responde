import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

export function useKeyboardSafeAreaIOS() {
  const [paddingBottom, setPaddingBottom] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      if (Platform.OS === 'ios') {
        setPaddingBottom(event.endCoordinates.height + 10);
      }
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (Platform.OS === 'ios') {
        setPaddingBottom(0);
      }
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return paddingBottom;
}
