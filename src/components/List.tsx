import {useNavigation} from '@react-navigation/native';
import {darkColors} from '@tamagui/themes';
import {BeerIcon} from 'lucide-react-native';

import {FC, useMemo} from 'react';
import React, {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {Paragraph, XStack} from 'tamagui';
import {getTotalIngredientsMap} from '../lib/getTotalIngredients';

import {Beer} from '../models/Beer';
import {useStore} from '../store/BeerStore';
import {Skeletons} from './SkeletonCard';
import {Title} from './Title';

const Item: FC<Beer> = beer => {
  const {id, name, image_url, volume, abv} = beer;
  const {navigate} = useNavigation();
  const ingredientsMap = useMemo(() => getTotalIngredientsMap(beer), [beer]);

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
          style={styles.image}
          source={{
            uri: image_url,
          }}
        />
        <XStack
          width={160}
          flex={1}
          alignItems="flex-end"
          justifyContent="space-between"
          columnGap={4}
          paddingHorizontal={8}
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
            color={darkColors.gray12}
            borderRadius={12}
            backgroundColor="black"
            fontSize={12}>{`${volume.value}${volume.unit
            .at(0)
            ?.toUpperCase()}`}</Paragraph>
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
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          data={beers}
          renderItem={({item}) => <Item {...item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 8,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 160,
    paddingVertical: 12,
    margin: 8,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    borderRadius: 8,
    position: 'relative',
    shadowColor: '#9d9d9d',
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  image: {
    flexGrow: 1,
    height: 100,
    width: 150,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
  },
});
