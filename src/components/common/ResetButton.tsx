import React from 'react';
import {darkColors} from '@tamagui/themes';
import {Paragraph} from 'tamagui';
import {defaultFilters, useStore} from '../../store/BeerStore';

export function ResetFiltersButton({title = 'Try reset filters'}) {
  const {setFilters, refetch} = useStore();

  return (
    <Paragraph
      textDecorationLine="underline"
      color={darkColors.blue10}
      onPress={() => {
        refetch({});
        setFilters(defaultFilters);
      }}>
      {title}
    </Paragraph>
  );
}
