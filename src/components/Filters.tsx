import {colorTokens} from '@tamagui/themes';
import React, {useState} from 'react';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {YStack} from 'tamagui';
import {SearchBy} from './Filters/SearchBy';
import {SliderTrack} from './Slider';

import {Title} from './Title';

export const Filters = () => {
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
      </YStack>
    </NativeViewGestureHandler>
  );
};
