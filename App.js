/*
 * @Author: gy
 * @Date: 2020-08-31 13:32:20
 * @LastEditors: gy
 * @LastEditTime: 2020-11-04 17:19:14
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

class App extends React.Component {
  componentDidMount() {
    JMessage.init({
      appkey: '5197b5beda256e4329b5f195',
      isOpenMessageRoaming: true,
      isProduction: false,
      channel: '',
    });
    JMessage.setDebugMode({enable: true});
  }
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen name="首页" component={Tabs} />
          <RootStack.Screen name="Chat" component={Chat} />
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
