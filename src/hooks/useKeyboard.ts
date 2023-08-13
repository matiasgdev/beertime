import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export function useKeyboard() {
  const [isKeyboard, setStatus] = useState(false);

  useEffect(() => {
    const showHandler = Keyboard.addListener('keyboardDidShow', () => {
      setStatus(true);
    });
    const hideHandler = Keyboard.addListener('keyboardDidHide', () => {
      setStatus(false);
    });

    return () => {
      showHandler.remove();
      hideHandler.remove();
    };
  }, []);

  return [isKeyboard, setStatus];
}
