import {useNavigation} from '@react-navigation/native';
import {FC, PropsWithChildren} from 'react';
import React, {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {Beer} from '../models/Beer';
import {useStore} from '../store/BeerStore';

const Item: FC<PropsWithChildren<Beer>> = ({name, image_url}) => {
  const {navigate} = useNavigation();

  const onSelect = () => {
    navigate('Details');
  };

  return (
    <TouchableWithoutFeedback onPress={onSelect}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: image_url,
          }}
        />
        <Text style={styles.title}>{name}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export const List = () => {
  const {beers} = useStore();
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
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
    height: 195,
    width: 160,
    paddingVertical: 8,
    margin: 4,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  image: {
    height: 100,
    width: 150,
    resizeMode: 'contain',
  },
  title: {
    textAlign: 'center',
    marginTop: 8,
  },
});
