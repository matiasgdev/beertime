import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Label, RadioGroup, SizeTokens, XStack, YStack} from 'tamagui';
import {Title} from '../Title';

export const SearchBy = () => {
  return (
    <View>
      <Title label="Search by" />
      <ScrollView horizontal>
        <RadioGroup defaultValue="3" name="form">
          <YStack
            flexDirection="row"
            alignItems="center"
            space="$2"
            marginBottom={12}>
            <RadioGroupItemWithLabel size="$4" value="1" label="Beer name" />
            <RadioGroupItemWithLabel size="$4" value="2" label="Yeast" />
          </YStack>
          <YStack flexDirection="row" alignItems="center" space="$2">
            <RadioGroupItemWithLabel size="$4" value="3" label="Hops" />
            <RadioGroupItemWithLabel size="$4" value="4" label="Malt" />
            <RadioGroupItemWithLabel size="$4" value="5" label="Food" />
          </YStack>
        </RadioGroup>
      </ScrollView>
    </View>
  );
};

function RadioGroupItemWithLabel(props: {
  size: SizeTokens;
  value: string;
  label: string;
}) {
  const id = `radiogroup-${props.value}`;
  return (
    <XStack
      paddingHorizontal="$3"
      borderRadius="$8"
      alignItems="center"
      space="$2"
      backgroundColor="black">
      <RadioGroup.Item value={props.value} id={id} size={props.size}>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <Label size={props.size} htmlFor={id}>
        {props.label}
      </Label>
    </XStack>
  );
}
