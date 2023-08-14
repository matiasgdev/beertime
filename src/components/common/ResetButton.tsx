import React from 'react';
import {darkColors} from '@tamagui/themes';
import {Paragraph} from 'tamagui';
import {useStore} from '../../store/BeerStore';
import {defaultFilters} from '../../store/filtersReducer';

export function ResetFiltersButton({title = 'Try reset filters'}) {
  const {dispatch, refetch} = useStore();

  return (
    <Paragraph
      textDecorationLine="underline"
      color={darkColors.blue10}
      onPress={() => {
        dispatch({type: 'reset'});
        refetch(defaultFilters);
      }}>
      {title}
    </Paragraph>
  );
}
