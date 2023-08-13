import {darkColors} from '@tamagui/themes';
import {Search} from 'lucide-react-native';
import {useEffect, useState} from 'react';
import {Dimensions, FlexStyle, Keyboard, ViewStyle} from 'react-native';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Input, YStack, StackProps} from 'tamagui';
import {useKeyboard} from '../../hooks/useKeyboard';

interface InputSearchProps {
  query: string;
  setQuery: (q: string) => void;
  keyboard?: boolean;
}

const keyboardStyles: FlexStyle & ViewStyle = {
  position: 'absolute',
  zIndex: 1000,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
};

export function InputSearch({
  query,
  setQuery,
  keyboard = false,
  ...stackProps
}: InputSearchProps & StackProps) {
  const [isKeyboard] = useKeyboard();

  return (
    <YStack flexGrow={1} {...(isKeyboard && keyboard ? keyboardStyles : {})}>
      <YStack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        height={44}
        paddingVertical={8}
        paddingHorizontal={16}
        borderRadius={12}
        shadowColor={darkColors.gray12}
        shadowOffset={{width: 8, height: 0}}
        shadowOpacity={0.8}
        backgroundColor="white"
        {...stackProps}>
        <Input
          unstyled
          height={48}
          paddingLeft={8}
          color={darkColors.gray4}
          placeholder="Search..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={Keyboard.dismiss}
        />
        <Search color={darkColors.gray11} size={16} />
      </YStack>
    </YStack>
  );
}
