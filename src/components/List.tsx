import {useNavigation} from '@react-navigation/native';
import {darkColors} from '@tamagui/themes';
import {BeerIcon} from 'lucide-react-native';

import {FC} from 'react';
import React, {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {Paragraph, XStack, Image} from 'tamagui';
import {getVolumeUnit} from '../lib/getVolumeUnit';

import {Beer} from '../models/Beer';
import {useStore} from '../store/BeerStore';
import {EmtpyState} from './EmptyState';
import {Skeletons} from './SkeletonCard';
import {Title} from './Title';

const Item: FC<Beer> = beer => {
  const {id, name, image_url, volume, abv, ph} = beer;
  const {navigate} = useNavigation();

  const onSelect = () => {
    navigate('Details');
  };

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <Animated.View
        entering={FadeInUp}
        style={styles.card}
        sharedTransitionTag={`card-${id}`}>
        <Title
          label={name}
          paddingHorizontal={4}
          textAlign="center"
          fontSize={12}
          marginBottom={8}
        />
        <Image
          flexGrow={1}
          marginVertical={12}
          height={100}
          width={150}
          resizeMode="center"
          source={{
            uri: image_url,
          }}
        />
        <XStack
          width={160}
          flex={1}
          alignItems="flex-end"
          justifyContent="space-between"
          paddingHorizontal={16}
          marginTop={8}>
          <XStack
            paddingHorizontal={8}
            paddingVertical={2}
            borderRadius={12}
            columnGap={4}
            alignItems="center"
            backgroundColor={darkColors.orange11}>
            <BeerIcon color="white" size={12} />
            <Paragraph fontSize={12}>{abv}</Paragraph>
          </XStack>
          <Paragraph
            paddingHorizontal={8}
            paddingVertical={2}
            color={darkColors.gray1}
            fontWeight="bold"
            fontSize={12}>
            {`${ph}Ph`}
          </Paragraph>
        </XStack>
        <XStack
          width={160}
          flex={1}
          alignItems="flex-start"
          justifyContent="flex-end"
          paddingHorizontal={16}>
          <Paragraph
            paddingHorizontal={8}
            paddingVertical={2}
            color={darkColors.gray2}
            fontSize={12}>
            {getVolumeUnit(volume)}
          </Paragraph>
        </XStack>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const List = () => {
  const {beers, status} = useStore();
  return (
    <SafeAreaView style={styles.container}>
      {status === 'pending' ? (
        <Skeletons />
      ) : beers.length ? (
        <FlatList
          contentContainerStyle={{
            paddingBottom: 86,
            paddingVertical: 24,
            width: Dimensions.get('screen').width,
            alignItems: 'center',
          }}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={beers}
          renderItem={({item}) => <Item {...item} />}
          keyExtractor={item => item.id.toString()}
        />
      ) : (
        <EmtpyState />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 16,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    paddingTop: 16,
    paddingBottom: 8,
    margin: 8,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#7b7b7b',
    shadowOffset: {width: 6, height: 6},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 36,
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
  },
});
