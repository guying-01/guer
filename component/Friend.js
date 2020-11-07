/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors  : gy
 * @LastEditTime : 2020-11-07 19:24:31
 * @FilePath     : /guer/component/Friend.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList, StyleSheet} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name:
      '你相信我无论在哪里，我一定会找到回来的方向，你是我的导航塔，我一定会朝着你飞回来，为了你，我一定会回来。',
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
    backgroundColor: '#61dafb',
    padding: 20,
  },
  name: {
    fontSize: 20,
  },
});
