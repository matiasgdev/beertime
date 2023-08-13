/* eslint-disable react-native/no-inline-styles */
import React, {SafeAreaView, StatusBar} from 'react-native';
import {SlidersHorizontalIcon} from 'lucide-react-native';
import {List} from '../components/List';
import {useRef} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import {Filters} from '../components/Filters';
import {Button, XStack} from 'tamagui';
import {darkColors} from '@tamagui/themes';

export const HomeScreen = () => {
  const $refSheet = useRef<BottomSheet>(null);

  return (
    <SafeAreaView style={{flex: 1}}>
      <XStack
        justifyContent="flex-end"
        paddingHorizontal={38}
        marginTop={StatusBar.currentHeight || 12}>
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
      <List />
      <BottomSheet ref={$refSheet} snapPoints={['1%', '65%']}>
        <Filters
          toggleBottomSheet={() => {
            $refSheet.current?.close({duration: 500});
          }}
        />
      </BottomSheet>
    </SafeAreaView>
  );
};
