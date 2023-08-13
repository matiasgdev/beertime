import {darkColors} from '@tamagui/themes';
import React from 'react';
import {Paragraph, YStack} from 'tamagui';

import {ResetFiltersButton} from './common/ResetButton';

export function EmtpyState() {
  return (
    <YStack flex={1} alignItems="center">
      <Paragraph color={darkColors.gray1} fontSize={20}>
        No results were founded
      </Paragraph>
      <ResetFiltersButton />
    </YStack>
  );
}
