/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors  : gy
 * @LastEditTime : 2020-11-08 20:37:54
 * @FilePath     : /guer/component/Friend.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {Text, View, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import JMessage from 'jmessage-react-plugin';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    console.log(JSON.parse(await AsyncStorage.getItem('offlineContactMsg')));
    var listener = async (event) => {
      let offlineContactMsg =
        JSON.parese(await AsyncStorage.getItem('offlineContactMsg')) || [];
      if (offlineContactMsg) {
        offlineContactMsg.push(event);
      }
      console.log(offlineContactMsg);
      await AsyncStorage.setItem(
        'offlineContactMsg',
        JSON.stringify(offlineContactMsg),
      );
    };

    JMessage.addContactNotifyListener(listener); // 添加监听
  }

  logout() {
    JMessage.logout();
    this.props.navigation.navigate('Login', {name: '登录', refresh: () => {}});
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.myInfoStyle}>我的ID:{global.username}</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        <Text style={styles.myInfoStyle} onPress={() => this.logout()}>
          退出登录
        </Text>
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
  myInfoStyle: {
    padding: 20,
    fontSize: 20,
  },
});
