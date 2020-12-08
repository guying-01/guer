/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-12-08 16:51:36
 * @FilePath     : /guer/component/My.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
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
import ImagePicker from 'react-native-image-crop-picker';

export default class My extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      contactMsgNum: 0,
      avatarSource:'',
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

  openImagePicker() {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      // this._fetchImage(image);
      this.setState({
        avatarSource: image.path
     });
    });
  }

  _fetchImage(image) {
    let url = 'http:。。。。。。。。'; // 接口地址
    let file = {uri: image.path, type: 'multipart/form-data', name:'image.png' } ; // file 中这三个元素缺一不可。 type 必须为 multipart/form-data。

    let formData = new FormData();
    formData.append('file', file); // 这里的 file 要与后台名字对应。

    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'multipart/form-data',
        },
        body:formData,
    }).then(function (response) {
        console.log("response",response);
        return response.json();
    })
}

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.infoBox}>
          <TouchableOpacity onPress={() => this.openImagePicker()}>
            <Image
              style={styles.tinyLogo}
              source={{
                uri: this.state.avatarSource || 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
          </TouchableOpacity>

          <Text style={styles.myInfoStyle}>{this.state.username}</Text>
        </View>
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
    // flex: 1,
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
  infoBox: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
  },
  myInfoStyle: {
    marginLeft: 20,
    fontSize: 20,
  },
});
