import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import JMessage from 'jmessage-react-plugin';

async function getOfflineContactMsg() {
  let offlineContactMsg =
    (await global.Storage.getItem('offlineContactMsg')) || [];

  return offlineContactMsg;
}
export default class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async UNSAFE_componentWillMount() {
    let offlineContactMsg =
      (await global.Storage.getItem('offlineContactMsg')) || [];
    console.log(offlineContactMsg);
    // let data = this.state.data;
    // data = offlineContactMsg;
    this.setState({
      data: offlineContactMsg,
    });
    // this.state.data = offlineContactMsg;
  }

  acceptInvitation(item) {
    JMessage.acceptInvitation(
      {username: item.fromUsername, appKey: ''},
      () => {
        ToastAndroid.show('添加成功');
      },
      (error) => {
        var desc = error.description;
        ToastAndroid.show('添加失败' + desc, ToastAndroid.SHORT);
      },
    );
  }

  declineInvitation(item) {
    JMessage.declineInvitation(
      {username: item.fromUsername, appKey: '', reason: '拒绝理由'},
      () => {
        ToastAndroid.show('已拒绝', ToastAndroid.SHORT);
      },
      (error) => {
        var desc = error.description;
        ToastAndroid.show('拒绝失败' + desc, ToastAndroid.SHORT);
      },
    );
  }

  renderItem({item, index}) {
    console.log(item);
    const map = {
      invite_received: '申请添加好友',
      invite_accepted: '同意了您的好友申请',
      invite_declined: '拒绝了您的好友申请',
      contact_deleted: '删除了您',
    };
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.name}>
          {item.fromUsername}
          {map[item.type]}
        </Text>
        {item.type == 'invite_received' && (
          <View>
            <Text
              onPress={() => {
                this.acceptInvitation(item);
              }}>
              同意
            </Text>
            <Text
              onPress={() => {
                this.declineInvitation(item);
              }}>
              拒绝
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
          )}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
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
    backgroundColor: '#fff',
    padding: 20,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    // backgroundColor: '#CCC',
  },
  name: {
    fontSize: 20,
  },
  myInfoStyle: {
    padding: 20,
    fontSize: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#d6d6d6',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
});
