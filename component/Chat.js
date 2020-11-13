import React from 'react';
import {Component} from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Button,
  Platform,
  Keyboard,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from 'react-native';
import JMessage from 'jmessage-react-plugin';
let curUsername = '';
global.Storage.getItem('username').then((res) => {
  curUsername = res;
});
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      msgArr: [],
    };
  }

  componentDidMount() {
    const username = this.props.route.params.name;
    var listener = (message) => {
      console.log(message, this.state.msgArr);

      // 收到的消息会返回一个消息对象. 对象字段可以参考对象说明
      if (message.from.username == username) {
        let arr = this.state.msgArr;
        arr.push(message);
        this.setState({msgArr: arr});
      }
    };

    JMessage.addReceiveMessageListener(listener);
  }

  sendMsg() {
    const groupId = this.props.route.params.groupId;
    const inputText = this.state.inputValue;
    const username = this.props.route.params.name;
    if (!inputText || inputText.length == 0) {
      return ToastAndroid.show('不能发送空消息', ToastAndroid.SHORT);
    }
    JMessage.createSendMessage(
      {
        type: 'single',
        username,
        appKey: '',
        messageType: 'text',
        text: this.state.inputValue,
        groupId,
      },
      (message) => {
        JMessage.sendTextMessage(
          {
            id: message.id,
            type: 'single',
            username,
            text: this.state.inputValue,
            extras: {},
            appKey: '',
          },
          (res) => {
            console.log(message);
            let arr = this.state.msgArr;
            arr.push(message);
            this.setState({msgArr: arr, inputValue: ''});
            // 成功回调
          },
          (err) => {
            ToastAndroid.show('发送失败', err, ToastAndroid.SHORT);
            // 失败回调
          },
        );
      },
    );
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <ScrollView
              ref="scrollView"
              onContentSizeChange={(width, height) =>
                this.refs.scrollView.scrollTo({y: height})
              }>
              {this.state.msgArr.map((item) => {
                // return (
                //   <Text key={item.serverMessageId}>{item && item.text}</Text>
                // );
                if (item.from.username == curUsername) {
                  return (
                    <Text
                      key={item.serverMessageId}
                      style={styles.selfMsgStyle}>
                      {item && item.text}
                    </Text>
                  );
                } else {
                  return (
                    <View
                      key={item.serverMessageId}
                      style={styles.msgWrapperStyle}>
                      <Image
                        style={styles.avatarStyle}
                        source={require('../assets/img/avatar.jpeg')}
                      />
                      <Text style={styles.msgStyle}>{item.text}</Text>
                    </View>
                  );
                }
              })}
            </ScrollView>
            <View style={styles.keyboardWrapperStyle}>
              <TextInput
                placeholder=""
                style={styles.textInput}
                onChangeText={(value) => this.setState({inputValue: value})}
                value={this.state.inputValue}
              />
              <TouchableOpacity>
                <Text style={styles.submit} onPress={() => this.sendMsg()}>
                  发送
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
    flex: 1,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  keyboardWrapperStyle: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'flex-start',
  },
  submit: {
    width: 60,
    lineHeight: 40,
    backgroundColor: '#61dafb',
    textAlign: 'center',
    color: '#fff',
    height: 40,
  },
  msgWrapperStyle: {
    maxWidth: 200,
    alignItems: 'center',
    marginBottom: 10,
    flex: 1,
    flexDirection: 'row',
  },
  msgStyle: {
    backgroundColor: '#666',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
  },
  selfMsgStyle: {
    maxWidth: 200,
    alignItems: 'flex-end',
    marginLeft: 'auto',
    backgroundColor: '#61dafb',
    color: '#000',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  avatarStyle: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
});
