import React, {Component} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  ToastAndroid,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import JMessage from 'jmessage-react-plugin';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  login() {
    JMessage.login(
      {
        username: this.state.username,
        password: this.state.password,
      },
      (loginRes) => {
        global.username = this.state.username;
        global.Storage.setItem('isLogin', true);
        global.Storage.setItem('username', global.username);
        global.Storage.setItem('password', this.state.password);
        this.props.navigation.navigate('顾尔');
        DeviceEventEmitter.emit('GetFriends');
      },
      (loginError) => {
        ToastAndroid.show(
          '登陆失败' + loginError.description,
          ToastAndroid.SHORT,
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
            <TextInput
              placeholder="账号"
              style={styles.textInput}
              onChangeText={(value) => this.setState({username: value})}
            />
            <TextInput
              placeholder="密码"
              style={styles.textInput}
              onChangeText={(value) => this.setState({password: value})}
            />
            <View style={styles.btnContainer}>
              <Button title="登陆" onPress={() => this.login()} />
            </View>
            <View>
              <TouchableOpacity>
                <Text
                  style={{color: '#61dafb'}}
                  onPress={() => {
                    this.props.navigation.navigate('Register', {
                      name: '注册',
                    });
                  }}>
                  还没有账号？去注册
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
    marginBottom: 12,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
