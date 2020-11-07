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

  register() {
    JMessage.register(
      {
        username: this.state.username,
        password: this.state.password,
      },
      (registerRes) => {
        JMessage.login(
          {
            username: this.state.username,
            password: this.state.password,
          },
          (loginRes) => {
            console.log(loginRes);
            this.props.navigation.navigate('顾尔');
          },
          (loginError) => {
            ToastAndroid.show('登陆失败' + loginError, ToastAndroid.SHORT);
            this.props.navigation.navigate('Login');
          },
        );
      },
      (registerError) => {
        ToastAndroid.show('注册失败' + registerError, ToastAndroid.SHORT);
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
              <Button title="注册" onPress={() => this.register()} />
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
