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
} from 'react-native';
import JMessage from 'jmessage-react-plugin';
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      msgArr: [{text: '123123', serverMessageId: 1}],
    };
  }

  componentDidMount() {
    var listener = (message) => {
      console.log(message.text, this.state.msgArr);

      // 收到的消息会返回一个消息对象. 对象字段可以参考对象说明
      if (message.target.id == global.groupId) {
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
    if (!inputText || inputText.length == 0) {
      return ToastAndroid.show('不能发送空消息', ToastAndroid.SHORT);
    }
    JMessage.createSendMessage(
      {
        type: 'group',
        username: '',
        appKey: '',
        messageType: 'text',
        text: this.state.inputValue,
        groupId,
      },
      (message) => {
        JMessage.sendTextMessage(
          {
            id: message.id,
            type: 'group',
            username: '',
            text: this.state.inputValue,
            groupId,
            extras: {},
            appKey: '',
          },
          (res) => {
            let arr = this.state.msgArr;
            arr.push(message);
            this.setState({msgArr: arr});
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
                return (
                  <Text key={item.serverMessageId}>{item && item.text}</Text>
                );
              })}
            </ScrollView>
            <View style={styles.keyboardWrapperStyle}>
              <TextInput
                placeholder=""
                style={styles.textInput}
                onChangeText={(value) => this.setState({inputValue: value})}
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
  },
  submit: {
    width: 60,
    lineHeight: 40,
    backgroundColor: '#61dafb',
    textAlign: 'center',
    color: '#fff',
  },
});
