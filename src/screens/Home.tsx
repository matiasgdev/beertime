import React, {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import {Search, ListFilter, ChevronsUpDown} from 'lucide-react-native';
import {List} from '../components/List';
import {useState} from 'react';

export const Home = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView>
      <View style={styles.filters}>
        <View style={styles.searchBox}>
          <Search color="#545454" size={24} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={search}
            onChangeText={query => setSearch(query)}
          />
        </View>
        <View style={styles.filtersButtons}>
          <TouchableHighlight style={styles.buttonContainer}>
            <View style={styles.button}>
              <ChevronsUpDown color="#656363" size={22} />
              <Text style={styles.buttonText}>Sort by</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonContainer}>
            <View style={styles.button}>
              <ListFilter color="#656363" size={22} />
              <Text style={styles.buttonText}>Filter</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <List />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filters: {
    paddingHorizontal: 42,
    paddingTop: StatusBar.currentHeight || 12,
    paddingBottom: StatusBar.currentHeight || 12,
    backgroundColor: '#ececec',
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
  buttonContainer: {
    flex: 1,
  },
  button: {
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
