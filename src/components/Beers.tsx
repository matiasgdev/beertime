import {ActivityIndicator, StyleSheet} from 'react-native';
import {darkColors, lightColors} from '@tamagui/themes';
import {BeerIcon, ShoppingCart} from 'lucide-react-native';

import React, {FlatList, SafeAreaView, Dimensions} from 'react-native';
import Animated, {FadeInUp} from 'react-native-reanimated';
import {Paragraph, XStack, Image, Button} from 'tamagui';
import {getVolumeUnit} from '../lib/getVolumeUnit';

import {useStore} from '../store/BeerStore';
import {EmtpyState} from './EmptyState';
import {Skeletons} from './common/SkeletonCard';
import {Title} from './common/Title';
import {Beer} from '../models/Beer';

export const Beers = () => {
  const {beers, status, error, dispatch, reachLimit, globalQuery} = useStore();

  const footer =
    reachLimit || globalQuery ? null : (
      <Button
        disabled={status === 'pending' || status === 'refetching'}
        marginTop={16}
        minWidth={110}
        onPress={() => {
          dispatch({type: 'set_page'});
        }}>
        {status === 'refetching' ? (
          <ActivityIndicator color="#fff" />
        ) : (
          'Load more'
        )}
      </Button>
    );

  if (status === 'rejected') {
    // fire error boundary
    throw error;
  }

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
          ListFooterComponent={footer}
          refreshing={status === 'refetching'}
        />
      ) : (
        <EmtpyState />
      )}
    </SafeAreaView>
  );
};

function Item(beer: Beer) {
  const {id, name, image_url, volume, abv, ph} = beer;

  return (
    <XStack style={{position: 'relative'}}>
      <Animated.View
        entering={FadeInUp}
        style={styles.card}
        sharedTransitionTag={`card-${id}`}>
        <XStack
          position="absolute"
          bottom={-12}
          padding={8}
          borderRadius={16}
          backgroundColor={darkColors.orange10}
          shadowColor={darkColors.gray1}
          shadowOffset={{width: 8, height: 8}}
          shadowOpacity={0.6}
          elevation={24}>
          <ShoppingCart size={14} color="white" />
        </XStack>
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
            backgroundColor={lightColors.orange8}>
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
    </XStack>
  );
}

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
    marginBottom: 12,
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
});
