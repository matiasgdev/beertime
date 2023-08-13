import React from 'react';
import {darkColors} from '@tamagui/themes';
import {Paragraph} from 'tamagui';
import {useStore} from '../../store/BeerStore';

export function ResetFiltersButton({title = 'Try reset filters'}) {
  const {dispatch, refetch} = useStore();

  return (
    <Paragraph
      textDecorationLine="underline"
      color={darkColors.blue10}
      onPress={() => {
        refetch({});
        dispatch({type: 'reset'});
      }}>
      {title}
    </Paragraph>
  );
}
