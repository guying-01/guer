/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors  : gy
 * @LastEditTime : 2020-11-08 18:53:01
 * @FilePath     : /guer/component/AddFriend.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ToastAndroid,
  Button,
} from 'react-native';
import JMessage from 'jmessage-react-plugin';

export default class AddFriend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      userInfo: {},
    };
  }

  getUserInfo(value) {
    this.setState({value: value});
    JMessage.getUserInfo(
      {username: value, appKey: ''},
      (userInfo) => {
        this.setState({userInfo: userInfo});
        console.log(userInfo);
      },
      (error) => {
        // ToastAndroid.show(error.description, ToastAndroid.SHORT);
      },
    );
  }

  addFriend() {
    JMessage.sendInvitationRequest(
      {
        username: this.state.userInfo.username,
        appKey: '',
        reason: '请求添加好友',
      },
      () => {
        ToastAndroid.show('已发送好友请求', ToastAndroid.SHORT);
      },
      (error) => {
        ToastAndroid.show(error.description, ToastAndroid.SHORT);
      },
    );
  }

  render() {
    let userInfo = <View />;
    if (this.state.userInfo && this.state.userInfo.username) {
      userInfo = (
        <View>
          <Text style={styles.usernameStyle}>
            {this.state.userInfo && this.state.userInfo.username}
          </Text>
          <Button
            title="添加好友"
            onPress={() => this.addFriend()}
            style={styles.buttonStyle}
          />
        </View>
      );
    }
    return (
      <View style={styles.wrapperStyle}>
        <TextInput
          placeholder="用户名"
          style={styles.textInput}
          onChangeText={(value) => {
            this.getUserInfo(value);
          }}
          value={this.state.value}
        />

        {userInfo}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    padding: 10,
  },
  usernameStyle: {
    marginBottom: 10,
  },
  buttonStyle: {
    margin: 10,
    // marginTop: 20,
  },
});
