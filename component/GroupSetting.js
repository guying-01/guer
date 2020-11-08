/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors  : gy
 * @LastEditTime : 2020-11-07 20:18:09
 * @FilePath     : /guer/component/GroupSetting.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import JMessage from 'jmessage-react-plugin';

export default class GroupSetting extends Component {
  constructor(props) {
    super(props);
  }

  dissolveGroup() {
    console.log(this.props.route);
    JMessage.dissolveGroup(
      {groupId: this.props.route.params.groupId},
      () => {
        console.log('解散群成功');
        this.props.navigation.navigate('顾尔');
        //
        // do something.
      },
      (error) => {
        var code = error.code;
        var desc = error.description;
        console.log('解散群失败', error);
      },
    );
  }

  render() {
    return (
      <View style={styles.wrapperStyle}>
        <Text>群聊id:{this.props.route.params.groupId}</Text>
        <Text>群聊设置</Text>
        {/* <Text onPress={() => this.dissolveGroup()}>解散该群</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    padding: 10,
  },
});
