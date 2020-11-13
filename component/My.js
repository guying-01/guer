/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-11-13 16:17:22
 * @FilePath     : /guer/component/My.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import Form from 'react-native-form';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SwipeListView} from 'react-native-swipe-list-view';
import JMessage from 'jmessage-react-plugin';

export default class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      contactMsgNum: 0,
      data: [
        // {
        //   id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        //   name:
        //     '你相信我无论在哪里，我一定会找到回来的方向，你是我的导航塔，我一定会朝着你飞回来，为了你，我一定会回来。',
        // },
        {
          name: '好友申请',
          next: true,
          num: 0,
        },
        {
          name: '离线消息',
          next: true,
        },
        {
          name: '退出登陆',
        },
      ],
    };
    this.refForm = React.createRef();
  }
  async UNSAFE_componentWillMount() {
    this.setState({username: await global.Storage.getItem('username')});
    let offlineContactMsg =
      (await global.Storage.getItem('offlineContactMsg')) || [];
    let data = this.state.data;
    console.log('消息条数', offlineContactMsg.length);
    data[0].num = offlineContactMsg.length;
    this.setState({data});
    global.Storage.setItem('offlineContactMsg', offlineContactMsg);
  }

  async componentDidUpdate() {}

  async componentDidMount() {
    var listener = async (event) => {
      let offlineContactMsg =
        (await global.Storage.getItem('offlineContactMsg')) || [];
      if (offlineContactMsg) {
        offlineContactMsg.push(event);
      }
      let data = this.state.data;
      data[0].num = offlineContactMsg.length;
      this.setState({data});
      global.Storage.setItem('offlineContactMsg', offlineContactMsg);
    };

    JMessage.addContactNotifyListener(listener); // 添加监听
  }

  logout() {
    JMessage.logout();
    global.Storage.clear();
    this.props.navigation.navigate('Login', {name: '登录'});
    DeviceEventEmitter.emit('GetFriends');
  }

  handlePress(item, index) {
    if (item.name == '退出登陆') {
      this.logout();
    } else if (item.name == '好友申请') {
      this.props.navigation.navigate('contact');
    }
  }

  renderItem({item, index}) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          this.handlePress(item, index);
        }}>
        <Text style={styles.name}>
          {item.name}
          {item.num != null && '(' + item.num + ')'}
        </Text>
        {item.next && (
          <Ionicons name="chevron-forward-outline" size={20} color="#000" />
        )}
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.myInfoStyle}>我的ID:{this.state.username}</Text>
        <SwipeListView
          useFlatList={true}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={({highlighted}) => (
            <View style={[styles.separator, highlighted && {marginLeft: 0}]} />
          )}
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          renderHiddenItem={(data, rowMap) => (
            <View style={styles.rowBack}>
              <Text>Left</Text>
              <Text>Right</Text>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      </SafeAreaView>
      // <Form ref={this.refForm}>
      //   <View>
      //     <View>
      //       <TextInput type="TextInput" name="myTextInput" />
      //     </View>
      //   </View>
      //   <Switch type="Switch" name="mySwitch" />
      //   <Slider type="Slider" name="mySlider" />
      //   <DatePickerIOS type="DatePickerIOS" name="myBirthday" />
      //   <Picker type="Picker" name="myPicker" />
      //   <PickerIOS type="PickerIOS" name="pickers[ios]" /> // Yes, we support
      //   form serialization, like the web
      // </Form>
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
