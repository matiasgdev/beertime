import {useNavigation} from '@react-navigation/native';
import {FC, PropsWithChildren} from 'react';
import React, {FlatList, SafeAreaView, Text} from 'react-native';
import {Beer} from '../models/Beer';
import {useStore} from '../store/BeerStore';

const Item: FC<PropsWithChildren<Beer>> = ({name}) => {
  const {navigate} = useNavigation();

  const onSelect = () => {
    navigate('Details');
  };

  return <Text onPress={onSelect}>{name}</Text>;
};

export const List = () => {
  const {beers} = useStore();
  return (
    <SafeAreaView>
      <FlatList
        data={beers}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};
