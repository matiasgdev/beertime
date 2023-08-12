import {useNavigation} from '@react-navigation/native';
import {darkColors} from '@tamagui/themes';
import {BeerIcon} from 'lucide-react-native';

import {FC, PropsWithChildren} from 'react';
import React, {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Image,
} from 'react-native';
import {Paragraph, XStack} from 'tamagui';

import {Beer} from '../models/Beer';
import {useStore} from '../store/BeerStore';
import {Title} from './Title';

const Item: FC<PropsWithChildren<Beer>> = ({name, image_url, volume, abv}) => {
  const {navigate} = useNavigation();

  const onSelect = () => {
    navigate('Details');
  };

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.card}>
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
      </View>
    </TouchableWithoutFeedback>
  );
};

export const List = () => {
  const {beers} = useStore();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        data={beers}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id.toString()}
      />
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
