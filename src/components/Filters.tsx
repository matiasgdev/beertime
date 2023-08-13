import React, {FC, useState} from 'react';
import {Button, Input, YStack} from 'tamagui';
import {colorTokens} from '@tamagui/themes';
import {Search} from 'lucide-react-native';
import {NativeViewGestureHandler} from 'react-native-gesture-handler';
import {SearchBy} from './Filters/SearchBy';
import {SliderTrack} from './Slider';
import {Title} from './Title';
import {useStore} from '../store/BeerStore';
import {MAX_ABV, MAX_EBC, MAX_IBU} from '../const/measurements';

interface FiltersProps {
  toggleBottomSheet: () => void;
}

export const Filters: FC<FiltersProps> = ({toggleBottomSheet}) => {
  const {filters, setFilters, call} = useStore();
  const {abv_gt, ebc_gt, ibu_gt} = filters;
  const [search, setSearch] = useState('');

  const setABV = (v: number) => setFilters({abv_gt: v});
  const setIBU = (v: number) => setFilters({ibu_gt: v});
  const setEBC = (v: number) => setFilters({ebc_gt: v});

  const handleOnShow = () => {
    call(filters);
    toggleBottomSheet();
  };

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
            max={MAX_ABV}
            volume={abv_gt!}
            setVolume={setABV}
          />
          <SliderTrack
            title="IBU"
            max={MAX_IBU}
            volume={ibu_gt!}
            setVolume={setIBU}
          />
          <SliderTrack
            title="EBC"
            max={MAX_EBC}
            volume={ebc_gt!}
            setVolume={setEBC}
          />
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
            borderWidth={2}
            onPress={handleOnShow}>
            Show
          </Button>
        </YStack>
      </YStack>
    </NativeViewGestureHandler>
  );
};
