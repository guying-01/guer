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
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Chat from './Chat';
import JMessage from 'jmessage-react-plugin';
import Prompt from './Prompt';

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
    };
  }
  componentDidMount() {
    JMessage.getMyInfo((info) => {
      console.log(info);
      if (info.username == undefined) {
        this.setState({modalVisible: true});
      } else {
        this.getChatRoom();
        JMessage.createGroup(
          {name: 'group_name', desc: 'group_desc', groupType: 'public'},
          (groupId) => {
            console.log('\n\n\n');
            console.log('groupId', groupId);
            // groupId: 新创建的群组 ID
            // do something.
          },
          (error) => {
            var code = error.code;
            var desc = error.description;
          },
        );
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

  getChatRoom() {
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
        console.log('\n\n\n\n');
        JMessage.getChatRoomListByUser(
          (list) => {
            console.log('list', list);
            console.log('\n\n\n\n');
          },
          (err) => {
            console.log(err);
            console.log('\n\n\n\n');
          },
        );

        JMessage.getChatRoomInfos(
          {roomIds: ['2']},
          (list) => {
            console.log('infos', list);
            console.log('\n\n\n\n');
          },
          (err) => {
            console.log(err);
            console.log('\n\n\n\n');
          },
        );
        JMessage.createSendMessage(
          {
            type: 'group',
            username: '123',
            appKey: '5197b5beda256e4329b5f195',
            messageType: 'text',
            text: 'message text',
            groupId: '45921644',
          },
          (message) => {
            console.log(message, 'message1');
            JMessage.sendTextMessage(
              {
                id: message.id,
                type: 'group',
                username: '123',
                text: 'message text',
                groupId: '45921644',
                extras: {key1: 'value1'},
                appKey: '5197b5beda256e4329b5f195',
              },
              (res) => {
                console.log('发送成功', res);
                // 成功回调
              },
              (err) => {
                console.log('发送失败', err);
                // 失败回调
              },
            );
          },
        );
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
    console.log(this.props.navigation);
    return (
      <TouchableOpacity style={styles.item}>
        <Text
          style={styles.title}
          onPress={() => this.props.navigation.navigate('Chat')}>
          十里春风1213
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={this.state.chatRoomList}
            renderItem={this._renderItem.bind(this)}
            keyExtractor={(item) => item.target.roomId}
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
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
