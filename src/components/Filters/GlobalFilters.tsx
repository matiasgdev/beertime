import React, {FC, useState} from 'react';
import {Button, XStack, YStack} from 'tamagui';
import {colorTokens} from '@tamagui/themes';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {SearchBy} from './SearchBy';
import {SliderTrack} from './SliderTrack';
import {Title} from '../common/Title';
import {useStore} from '../../store/BeerStore';
import {MAX_ABV, MAX_EBC, MAX_IBU} from '../../const/measurements';
import {ResetFiltersButton} from '../common/ResetButton';
import {InputSearch} from '../common/InputSearch';
import {Action} from '../../store/filtersReducer';

interface GlobalFiltersProps {
  toggleBottomSheet: () => void;
}

export const GlobalFilters: FC<GlobalFiltersProps> = ({toggleBottomSheet}) => {
  const {filters, dispatch, refetch, query} = useStore();
  const {abv_gt, ebc_gt, ibu_gt} = filters;
  const [key, setKeySearch] = useState<Action['type']>('beer_name');

  const setQuery = (query: string) => {
    dispatch({type: key, [key]: query});
  };

  const handleOnShow = () => {
    refetch(filters);
    toggleBottomSheet();
  };

  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <YStack position="relative">
        <XStack justifyContent="flex-end" paddingRight={16}>
          <ResetFiltersButton title="Reset filters" />
        </XStack>
        <YStack
          borderBottomColor={colorTokens.dark.gray.gray12}
          borderBottomWidth={1}
          paddingHorizontal={16}
          paddingBottom={12}>
          <Title label="Filters" />
          <SliderTrack
            title="Alcohol volume"
            max={MAX_ABV}
            volume={abv_gt!}
            setVolume={v => dispatch({type: 'abv', abv_gt: v})}
          />
          <SliderTrack
            title="IBU"
            max={MAX_IBU}
            volume={ibu_gt!}
            setVolume={v => dispatch({type: 'ibu', ibu_gt: v})}
          />
          <SliderTrack
            title="EBC"
            max={MAX_EBC}
            volume={ebc_gt!}
            setVolume={v => dispatch({type: 'ebc', ebc_gt: v})}
          />
        </YStack>
        <YStack marginTop={12} paddingHorizontal={16}>
          <SearchBy onChange={setKeySearch} />
        </YStack>
        <InputSearch
          {...{query, setQuery}}
          marginTop={16}
          marginHorizontal={16}
          borderColor={colorTokens.dark.gray.gray12}
          borderWidth={1}
        />
        <YStack marginTop={36} paddingHorizontal={16}>
          <Button
            size="$5"
            fontSize={20}
            backgroundColor={colorTokens.light.orange.orange9}
            borderColor={colorTokens.light.orange.orange10}
            borderWidth={2}
            onPress={handleOnShow}>
            Show
          </Button>
        </YStack>
      </YStack>
    </NativeViewGestureHandler>
  );
};
