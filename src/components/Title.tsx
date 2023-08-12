import React from 'react';
import {H1, TextProps} from 'tamagui';

interface TitleProps extends TextProps {
  label: string;
}

export const Title: React.FC<TitleProps> = ({label, ...props}) => {
  return (
    <H1
      color="black"
      fontWeight="bold"
      textTransform="uppercase"
      marginBottom="$2"
      letterSpacing={2}
      {...props}>
      {label}
    </H1>
  );
};
