import React from 'react';
import {H1} from 'tamagui';

interface TitleProps {
  label: string;
}

export const Title: React.FC<TitleProps> = ({label}) => {
  return (
    <H1
      color="black"
      fontWeight="bold"
      textTransform="uppercase"
      marginBottom="$2"
      letterSpacing={2}>
      {label}
    </H1>
  );
};
