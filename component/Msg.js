import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  Alert,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './Chat';
import JMessage from 'jmessage-react-plugin';
import Prompt from './Prompt';
let {width, height} = Dimensions.get('window');

function rand(m) {
  m = m > 16 ? 16 : m;
  var num = Math.random().toString();
  if (num.substr(num.length - m, 1) === '0') {
    return rand(m);
  }
  return num.substring(num.length - m);
}

export default class Msg extends Component {
  // const navigation = useNavigation();
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      modalVisible: false,
      chatRoomList: [],
      groupList: [],
    };
  }
  componentDidMount() {
    JMessage.getMyInfo((info) => {
      console.log(info);
      global.groupId = '45927173';
      if (info.username == undefined) {
        // this.setState({modalVisible: true});
        this.props.navigation.navigate('Login');
      } else {
        this.getPublicGroups();
      }
    });

    // JMessage.getUserInfo(
    //   {username: '6890036662881356', appKey: ''},
    //   (userInfo) => {
    //     console.log(userInfo);
    //   },
    //   (error) => {
    //     var code = error.code;
    //     var desc = error.description;
    //   },
    // );
  }

  componentDidUpdate() {
    this.getPublicGroups();
  }

  createGroup() {
    JMessage.createGroup(
      {name: '十里春风', desc: '默认群组', groupType: 'public'},
      (groupId) => {
        console.log('创建群组成功', groupId);
        global.groupId = groupId;
      },
      (error) => {
        console.log('创建群组失败', error);
      },
    );
  }

  getPublicGroups() {
    JMessage.getPublicGroupInfos(
      {appKey: global.appKey, start: 0, count: 20},
      (groupArr) => {
        this.setState({groupList: groupArr});
      },
      (error) => {
        var code = error.code;
        var desc = error.description;
        console.log('公开群组', desc);
      },
    );
  }

  getJoinedGroup() {
    JMessage.getGroupIds(
      (result) => {
        /**
         * result {Array[Number]} 当前用户所加入的群组的groupID的list
         */
        console.log(result, '当前用户加入的群组id');
        if (result.length == 0) {
          this.createGroup();
        } else {
          global.groupId = result[0];
        }
      },
      (error) => {
        console.log('获取用户加入群组信息失败', error.desc);
      },
    );
    JMessage.getConversation(
      {
        type: 'group',
        username: '',
        appKey: '5197b5beda256e4329b5f195',
        groupId: '45921644',
      },
      (chatRoomList) => {
        console.log(chatRoomList, '聊天室列表');
        if (chatRoomList.length == 0) {
          this.createChatRoom();
        } else {
          this.setState({chatRoomList: [chatRoomList]});
          // this.joinChatRoom('3');
          global.groupId = '45921644';
        }
      },
      (error) => {
        console.log('获取聊天室列表失败', error);
      },
    );
  }

  createChatRoom() {
    JMessage.createConversation(
      {
        type: 'group',
        username: '',
        appKey: '5197b5beda256e4329b5f195',
        groupId: '003',
      },
      (conversation) => {
        console.log(conversation);
        let room_id = conversation.target.id;
        console.log(room_id);
        this.joinChatRoom(room_id);
        // do something.
      },
      (error) => {
        console.log('聊天室创建失败', error);
      },
    );
  }

  joinChatRoom(roomId) {
    JMessage.enterConversation(
      {
        type: 'group',
        username: '',
        appKey: '5197b5beda256e4329b5f195',
        groupId: roomId,
      },
      (conversation) => {
        console.log('加入聊天室十里春风成功', conversation);
        // 进入聊天室，会自动创建并返回该聊天室会话信息。
        // do something.
      },
      (chatRoomError) => {
        console.log(chatRoomError);
      },
    );
  }

  register(input) {
    const userId = rand(16);
    console.log(input);
    if (!input) {
      Alert.alert('提示', '请输入用户名', [
        {
          text: '确认',
        },
      ]);
      return false;
    }
    JMessage.register(
      {
        username: userId,
        password: 'Wsgy127938',
      },
      (res) => {
        console.log('注册成功');
        JMessage.login(
          {
            username: userId,
            password: 'Wsgy127938',
          },
          (loginRes) => {
            this.getChatRoom();
            JMessage.updateMyInfo(
              {
                nickname: 'nickname',
                birthday: 1604475231313,
                gender: 'male',
                signature: '',
                region: '',
                address: '',
              },
              (info) => {
                console.log(info);
              },
              (error) => {
                console.log(error);
                console.log('更新用户信息失败');
              },
            );
          },
          (loginError) => {
            console.log('登陆失败' + loginError);
          },
        );
      },
      (error) => {
        console.log(error);
        console.log('注册失败');
      },
    );
  }

  _renderItem({item}) {
    return (
      <View style={styles.itemStyle}>
        <TouchableOpacity>
          <Text
            style={styles.title}
            onPress={() =>
              this.props.navigation.navigate('Chat', {
                groupId: item.id,
                name: item.name,
              })
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.groupList}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
        <Prompt
          title="请输入用户名"
          visible={this.state.modalVisible}
          left={{onPress: this.register}}
          right={{onPress: () => this.setState({modalVisible: false})}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  item: {},
  title: {
    fontSize: 20,
  },
  itemStyle: {
    width: width,
    padding: 5,
    // flex: 1,
    // marginVertical: 8,
    // marginHorizontal: 16,
    // backgroundColor: '#f9c2ff',
    borderBottomWidth: 1,
    borderBottomColor: '#61dafb',
  },
});
