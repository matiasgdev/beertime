import React, {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {ListFilter, ChevronsUpDown} from 'lucide-react-native';
import {List} from '../components/List';
import {useRef} from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import {Filters} from '../components/Filters';
import {Button} from 'tamagui';

export const HomeScreen = () => {
  const $refSheet = useRef<BottomSheet>(null);

  return (
    <SafeAreaView>
      <View style={styles.filters}>
        <View style={styles.filtersButtons}>
          <Button
            color="white"
            backgroundColor="black"
            fontSize={16}
            size="$5"
            flex={1}
            icon={<ChevronsUpDown color="#fff" size={22} />}
            alignItems="center"
            onPress={() => {
              $refSheet.current?.expand();
            }}>
            Sorty by
          </Button>
          <Button
            color="white"
            backgroundColor="black"
            fontSize={16}
            size="$5"
            flex={1}
            icon={<ListFilter color="#fff" size={22} />}
            alignItems="center"
            onPress={() => {
              $refSheet.current?.expand();
            }}>
            Filter
          </Button>
        </View>
      </View>
      <List />
      <BottomSheet ref={$refSheet} snapPoints={['1%', '65%']}>
        <Filters />
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filters: {
    paddingHorizontal: 42,
    paddingTop: StatusBar.currentHeight || 12,
    paddingBottom: StatusBar.currentHeight || 12,
  },
  filtersButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
    columnGap: 8,
    height: 48,
    marginTop: 12,
  },
  searchBox: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 0.5,
    borderColor: '#b7b7b7',
    borderRadius: 24,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    columnGap: 4,
    paddingHorizontal: 16,
    borderWidth: 0.5,
    borderColor: '#b7b7b7',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  searchInput: {
    height: 48,
    paddingLeft: 16,
  },
});
