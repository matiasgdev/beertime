import React from 'react';
import {darkColors} from '@tamagui/themes';
import {Paragraph} from 'tamagui';
import {defaultFilters, useStore} from '../store/BeerStore';

export function ResetFiltersButton() {
  const {setFilters} = useStore();

  return (
    <Paragraph
      textDecorationLine="underline"
      color={darkColors.blue10}
      onPress={() => {
        setFilters(defaultFilters);
      }}>
      Try reset filters
    </Paragraph>
  );
}
