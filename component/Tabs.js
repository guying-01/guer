/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-12-22 17:08:48
 * @FilePath     : /guer/component/Tabs.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import My from './My';
import Msg from './Msg';
import Book from '../views/book/index';

const MsgStack = createStackNavigator();
function MsgScreen() {
  return (
    <MsgStack.Navigator>
      <MsgStack.Screen name="聊天" component={Msg} />
    </MsgStack.Navigator>
  );
}

const BookStack = createStackNavigator();
function BookScreen() {
  return (
    <BookStack.Navigator>
      {/* <BookStack.Screen name="text" component={Text} /> */}
      <BookStack.Screen name="book" component={Book} />
    </BookStack.Navigator>
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
            } else if (route.name === 'book') {
              iconName = focused ? 'book' : 'book-outline';
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
        <Tab.Screen
          name="book"
          component={BookScreen}
          options={{
            tabBarLabel: '阅读',
            tabBarBadge: 3,
          }}
        />
        <Tab.Screen name="我的" component={My} />
      </Tab.Navigator>
    );
  }
}
