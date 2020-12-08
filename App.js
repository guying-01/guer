/*
 * @Author: gy
 * @Date: 2020-08-31 13:32:20
 * @LastEditors: gy
 * @LastEditTime: 2020-12-08 16:19:28
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {ToastAndroid, TouchableOpacity} from 'react-native';
import {NavigationContainer, TabActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import JMessage from 'jmessage-react-plugin';
import Tabs from './component/Tabs';
import Chat from './component/Chat';
import Register from './component/Login/Register';
import Login from './component/Login/Login';
import Contact from './component/Contact';

import Ionicons from 'react-native-vector-icons/Ionicons';
import GroupSetting from './component/GroupSetting';
import AddFriend from './component/AddFriend';
import Popover from 'react-native-popover-view';

import codePush from 'react-native-code-push';

import Storage from './utils/store';
global.Storage = new Storage();
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
  return <LoginStack.Navigator />;
}

global.appkey = '5197b5beda256e4329b5f195';
class App extends React.Component {
  componentDidMount() {
    codePush.notifyAppReady();
    codePush
      .checkForUpdate('w2ixDpVU_44n-kzQxDa2D4xtQyLRBQWoDYaIV')
      .then((update) => {
        if (update) {
          codePush.sync({
            deploymentKey: 'w2ixDpVU_44n-kzQxDa2D4xtQyLRBQWoDYaIV',
            updateDialog: {
              appendReleaseDescription: true,
              descriptionPrefix: '\n\n更新内容：\n',
              title: '发现新版本',
              mandatoryUpdateMessage:
                '更新内容：\n' + (update.description || '无'),
              optionalUpdateMessage:
                '更新内容：\n' + (update.description || '无'),
              optionalInstallButtonLabel: '后台更新',
              optionalIgnoreButtonLabel: '忽略',
              mandatoryContinueButtonLabel: '确定',
            },
          });
        } else {
          codePush.notifyAppReady();
        }
      });

    JMessage.init({
      appkey: '5197b5beda256e4329b5f195',
      isOpenMessageRoaming: true,
      isProduction: false,
      channel: '',
    });
    JMessage.setDebugMode({enable: true});

    JMessage.addSyncOfflineMessageListener(async (result) => {
      let offlineMsg = await global.Storage.getItem('offlineMsg');
      if (offlineMsg) {
        offlineMsg.push(result);
      }
      console.log(offlineMsg);
      global.Storage.setItem('offlineMsg', offlineMsg);
    });
  }
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name="顾尔"
            component={Tabs}
            options={({navigation, route}) => ({
              headerRight: () => (
                <Ionicons
                  name="add-circle-outline"
                  size={20}
                  color="#000"
                  style={{paddingRight: 5}}
                  onPress={() =>
                    navigation.navigate('AddFriend', {
                      name: '添加好友',
                    })
                  }
                />

                // <Popover
                //   // arrowStyle={{display: 'none'}}
                //   // arrowShift={0.24}
                //   from={
                //     // <Ionicons
                //     //   name="add-circle-outline"
                //     //   size={20}
                //     //   color="#000"
                //     //   style={{paddingRight: 5}}
                //     //   // onPress={() =>
                //     //   //   navigation.navigate('GroupSetting', {
                //     //   //     groupId: route.params.groupId,
                //     //   //     name: '群组设置',
                //     //   //   })
                //     //   // }
                //     // />

                //     <TouchableOpacity>
                //       <Text>Press here to open popover!</Text>
                //     </TouchableOpacity>
                //   }>
                //   <View style={styles.popoverWrapperStyle}>
                //     <Text>添加好友</Text>
                //   </View>
                // </Popover>
              ),
            })}
          />
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
                      name: '群组设置',
                    })
                  }
                />
              ),
            })}
          />
          <RootStack.Screen
            name="GroupSetting"
            component={GroupSetting}
            options={({navigation, route}) => ({
              headerTitle: (props) => {
                return <Text> {route.params.name}</Text>;
              },
            })}
          />
          <RootStack.Screen
            name="Login"
            component={Login}
            options={({navigation, route}) => ({
              headerTitle: (props) => {
                return <Text> {route.params.name || '登录'}</Text>;
              },
            })}
          />
          <RootStack.Screen
            name="Register"
            component={Register}
            options={({navigation, route}) => ({
              headerTitle: (props) => {
                return <Text> {route.params.name || '注册'}</Text>;
              },
            })}
          />
          <RootStack.Screen
            name="AddFriend"
            component={AddFriend}
            options={({navigation, route}) => ({
              headerTitle: (props) => {
                return <Text> {route.params.name}</Text>;
              },
            })}
          />
          <RootStack.Screen
            name="contact"
            component={Contact}
            options={({navigation, route}) => ({
              headerTitle: (props) => {
                return <Text> 好友申请</Text>;
              },
            })}
          />
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
