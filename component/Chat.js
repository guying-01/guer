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
} from 'react-native';
import JMessage from 'jmessage-react-plugin';
export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  sendMsg() {
    console.log(global.roomId);

    JMessage.sendTextMessage(
      {
        type: 'group',
        username: '',
        appKey: '5197b5beda256e4329b5f195',
        text: this.state.inputValue,
        extras: {},
        messageSendingOptions: JMessage.messageSendingOptions,
        roomId: '2',
      },
      (res) => {
        console.log('发送成功');
        // do something.
      },
      (error) => {
        console.log('消息发送失败', error);
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
            <ScrollView>
              <Text>这是中间的滚动页面 (flex: 1)</Text>
              <Text>页面展示在这个组件中</Text>
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
