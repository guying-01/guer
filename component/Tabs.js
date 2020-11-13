/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-11-13 15:40:02
 * @FilePath     : /guer/component/Tabs.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import My from './My';
import Msg from './Msg';
const MsgStack = createStackNavigator();

function MsgScreen() {
  return (
    <MsgStack.Navigator>
      <MsgStack.Screen name="聊天" component={Msg} />
    </MsgStack.Navigator>
  );
}
const Tab = createBottomTabNavigator();
export default class Tabs extends Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === '聊天') {
              iconName = focused
                ? 'chatbubble-ellipses'
                : 'chatbubble-ellipses-outline';
            } else if (route.name === '我的') {
              iconName = focused ? 'body' : 'body-outline';
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#61dafb',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="聊天" component={MsgScreen} />
        <Tab.Screen name="我的" component={My} />
      </Tab.Navigator>
    );
  }
}
