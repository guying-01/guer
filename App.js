/*
 * @Author: gy
 * @Date: 2020-08-31 13:32:20
 * @LastEditors: gy
 * @LastEditTime: 2020-11-05 15:38:55
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import JMessage from 'jmessage-react-plugin';
import Tabs from './component/Tabs';
import Chat from './component/Chat';
import Register from './component/Login/Register';
import Login from './component/Login/Login';

import Ionicons from 'react-native-vector-icons/Ionicons';
import GroupSetting from './component/GroupSetting';

import codePush from 'react-native-code-push';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Alert,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const RootStack = createStackNavigator();
const LoginStack = createStackNavigator();

function LoginScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="Register" component={Register} />
      <LoginStack.Screen name="Login" component={Login} />
    </LoginStack.Navigator>
  );
}

global.appkey = '5197b5beda256e4329b5f195';
class App extends React.Component {
  componentDidMount() {
    codePush.checkForUpdate().then((update) => {
      if (update) {
        console.log('有新的更新！');
      } else {
        console.log('已是最新，不需要更新！');
      }
    });

    JMessage.init({
      appkey: '5197b5beda256e4329b5f195',
      isOpenMessageRoaming: true,
      isProduction: false,
      channel: '',
    });
    JMessage.setDebugMode({enable: true});
    var listener = (message) => {
      // 收到的消息会返回一个消息对象. 对象字段可以参考对象说明
      console.log('收到新消息', message);
    };

    JMessage.addReceiveMessageListener(listener);
  }
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="首页" component={Tabs} />
          <RootStack.Screen
            name="Chat"
            component={Chat}
            options={({navigation, route}) => ({
              headerTitle: (props) => {
                return <Text> {route.params.name}</Text>;
              },
              headerRight: () => (
                <Ionicons
                  name="menu"
                  size={20}
                  color="#000"
                  style={{paddingRight: 5}}
                  onPress={() =>
                    navigation.navigate('GroupSetting', {
                      groupId: route.params.groupId,
                    })
                  }
                />
              ),
            })}
          />
          <RootStack.Screen name="GroupSetting" component={GroupSetting} />
          <RootStack.Screen name="User" component={LoginScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  textStyle: {
    padding: 20,
  },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  navigationContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#fff',
    padding: 8,
  },
});

export default App;
