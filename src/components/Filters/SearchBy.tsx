import React from 'react';
import {View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {Label, RadioGroup, SizeTokens, XStack, YStack} from 'tamagui';
import {Action} from '../../store/filtersReducer';
import {Title} from '../common/Title';

interface SearchByProps {
  onChange: (key: Action['type']) => void;
}

export const SearchBy: React.FC<SearchByProps> = ({onChange}) => {
  return (
    <View>
      <Title label="Search by" />
      <ScrollView horizontal>
        <RadioGroup
          defaultValue="beer_name"
          name="form"
          onValueChange={v => onChange(v as Action['type'])}>
          <YStack
            flexDirection="row"
            alignItems="center"
            space="$2"
            marginBottom={12}>
            <RadioGroupItemWithLabel
              size="$3"
              value="beer_name"
              label="Beer name"
            />
            <RadioGroupItemWithLabel size="$3" value="yeast" label="Yeast" />
          </YStack>
          <YStack flexDirection="row" alignItems="center" space="$2">
            <RadioGroupItemWithLabel size="$3" value="hops" label="Hops" />
            <RadioGroupItemWithLabel size="$3" value="malt" label="Malt" />
            <RadioGroupItemWithLabel size="$3" value="food" label="Food" />
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
