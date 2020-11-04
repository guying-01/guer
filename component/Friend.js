import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList, StyleSheet} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: '何足道',
  },
];

const Item = ({name}) => {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const renderItem = ({item}) => <Item name={item.name} />;
export default class Friend extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
  },
  name: {
    fontSize: 32,
  },
});
