/* eslint-disable react-native/no-inline-styles */
import React, {SafeAreaView, StatusBar} from 'react-native';
import {SlidersHorizontalIcon} from 'lucide-react-native';
import {Beers} from '../components/Beers';
import {useRef, useState} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import {GlobalFilters} from '../components/filters/GlobalFilters';
import {Button, XStack} from 'tamagui';
import {darkColors} from '@tamagui/themes';
import {InputSearch} from '../components/common/InputSearch';

export const HomeScreen = () => {
  const [query, setQuery] = useState('');
  const $refSheet = useRef<BottomSheet>(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <XStack
        justifyContent="center"
        marginTop={StatusBar.currentHeight || 12}
        paddingHorizontal={38}>
        <InputSearch flex={1} marginRight={16} {...{query, setQuery}} />
        <Button
          size="$4"
          width={48}
          alignItems="center"
          shadowColor={darkColors.gray1}
          shadowOffset={{width: 4, height: 4}}
          shadowOpacity={0.7}
          elevate
          borderRadius={14}
          backgroundColor={darkColors.orange10}
          icon={<SlidersHorizontalIcon color="#fff" size={24} />}
          onPress={() => {
            $refSheet.current?.expand();
          }}
        />
      </XStack>
      <Beers />
      <BottomSheet ref={$refSheet} snapPoints={['1%', '65%']}>
        <GlobalFilters
          toggleBottomSheet={() => {
            $refSheet.current?.close({duration: 500});
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};
