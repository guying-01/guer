import React, {Component} from 'react';
import {Text, View} from 'react-native';
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
        this.props.navigation.navigate('首页');
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
      <View>
        <Text>群聊id:{this.props.route.params.groupId}</Text>
        <Text>群聊设置</Text>
        <Text onPress={() => this.dissolveGroup()}>解散该群</Text>
      </View>
    );
  }
}
