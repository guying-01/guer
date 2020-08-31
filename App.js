/*
 * @Author: gy
 * @Date: 2020-08-31 13:32:20
 * @LastEditors: gy
 * @LastEditTime: 2020-08-31 17:18:02
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  DrawerLayoutAndroid,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
const App: () => React$Node = () => {
  const [drawerPosition, setDrawerPosition] = useState('left');
  const changeDrawerPosition = () => {
    if (drawerPosition === 'left') {
      setDrawerPosition('right');
    } else {
      setDrawerPosition('left');
    }
  };

  const navigationView = (
    <View style={styles.navigationContainer}>
      <Text style={{margin: 10, fontSize: 15}}>I'm in the Drawer!</Text>
    </View>
  );

  const drawerRef = useRef();
  return (
    <ScrollableTabView
      style={styles.container}
      tabBarUnderlineStyle={styles.lineStyle}
      tabBarPosition="bottom"
      tabBarActiveTextColor="#000">
      <Text style={styles.textStyle} tabLabel="消息">
        消息
      </Text>
      <Text style={styles.textStyle} tabLabel="广场">
        广场
      </Text>
      <Text style={styles.textStyle} tabLabel="我">
        我
        <DrawerLayoutAndroid
          drawerWidth={300}
          drawerPosition={drawerPosition}
          renderNavigationView={() => navigationView}>
          <View style={styles.container}>
            <Text style={{margin: 10, fontSize: 15}}>
              DrawerLayoutAndroid example
            </Text>
            <Button
              title="Change Drawer Position"
              onPress={() => changeDrawerPosition()}
            />
            <Text style={{margin: 10, fontSize: 15}}>
              Drawer on the {drawerPosition}! Swipe from the side to see!
            </Text>
          </View>
        </DrawerLayoutAndroid>
      </Text>
    </ScrollableTabView>
  );
};

const styles = StyleSheet.create({
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
