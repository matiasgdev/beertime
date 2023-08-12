import React, {useState} from 'react';
import {Button, Input, YStack} from 'tamagui';
import {colorTokens} from '@tamagui/themes';
import {Search} from 'lucide-react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {SearchBy} from './Filters/SearchBy';
import {SliderTrack} from './Slider';
import {Title} from './Title';

export const Filters = () => {
  const [search, setSearch] = useState('');
  const [alcohol, setAlcohol] = useState(0);
  const [ibu, setIbu] = useState(0);
  const [ebc, setEbc] = useState(0);

  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <YStack>
        <YStack
          borderBottomColor={colorTokens.dark.gray.gray12}
          borderBottomWidth={1}
          paddingHorizontal={16}
          paddingBottom={12}>
          <Title label="Filters" />
          <SliderTrack
            title="Alcohol volume"
            volume={alcohol}
            setVolume={setAlcohol}
          />
          <SliderTrack title="IBU" volume={ibu} setVolume={setIbu} />
          <SliderTrack title="EBC" volume={ebc} setVolume={setEbc} />
        </YStack>
        <YStack marginTop={12} paddingHorizontal={16}>
          <SearchBy />
        </YStack>
        <YStack
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
          borderWidth={0.5}
          paddingVertical={8}
          paddingHorizontal={12}
          height={48}
          marginHorizontal={16}
          marginTop={12}
          borderColor={colorTokens.dark.gray.gray6}
          borderRadius={24}>
          <Search color={colorTokens.dark.gray.gray6} size={24} />
          <Input
            unstyled
            height={48}
            paddingLeft={16}
            color="black"
            placeholder="Search..."
            value={search}
            onChangeText={query => setSearch(query)}
          />
        </YStack>
        <YStack marginTop={36} paddingHorizontal={16}>
          <Button
            size="$5"
            fontSize={20}
            backgroundColor={colorTokens.light.orange.orange9}
            borderColor={colorTokens.light.orange.orange10}
            borderWidth={2}>
            Show
          </Button>
        </YStack>
      </YStack>
    </NativeViewGestureHandler>
  );
};
