import {darkColors} from '@tamagui/themes';
import {Search} from 'lucide-react-native';
import {Input, YStack, StackProps} from 'tamagui';

interface InputSearchProps {
  query: string;
  setQuery: (q: string) => void;
}

export function InputSearch({
  query,
  setQuery,
  ...stackProps
}: InputSearchProps & StackProps) {
  return (
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
        color={darkColors.gray12}
        placeholder="Search..."
        value={query}
        onChangeText={setQuery}
      />
      <Search color={darkColors.gray11} size={16} />
    </YStack>
  );
}
