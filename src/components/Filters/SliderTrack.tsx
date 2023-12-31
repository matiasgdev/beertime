import React from 'react-native';
import {Paragraph, Slider, SliderProps, XStack, YStack} from 'tamagui';

import {darkColors, lightColors} from '@tamagui/themes';

export function SliderTrack({
  title,
  max,
  value,
  volume,
  setVolume,
  ...props
}: SliderProps & {
  title: string;
  max: number;
  volume: number;
  setVolume: (value: number) => void;
}) {
  return (
    <YStack height={48}>
      <Paragraph color={darkColors.gray8}>
        {title} ({volume})
      </Paragraph>
      <XStack flex={1} alignItems="center" space="$2">
        <Slide
          width={200}
          {...{...props, max, value: [volume]}}
          onValueChange={v => setVolume(v[0])}
        />
      </XStack>
    </YStack>
  );
}

function Slide({children, max, value, ...props}: SliderProps) {
  return (
    <Slider value={value} max={max} step={1} {...props}>
      <Slider.Track backgroundColor={lightColors.gray8}>
        <Slider.TrackActive backgroundColor="orange" />
      </Slider.Track>
      <Slider.Thumb
        backgroundColor={darkColors.orange9}
        borderColor={lightColors.orange9}
        index={0}
        circular
        elevate
        size={22}
        shadowColor="white"
      />
      {children}
    </Slider>
  );
}
