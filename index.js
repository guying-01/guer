/*
 * @Author: gy
 * @Date: 2020-08-31 13:32:20
 * @LastEditors: gy
 * @LastEditTime: 2020-11-13 14:28:46
 */
/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
LogBox.ignoreAllLogs();
AppRegistry.registerComponent(appName, () => App);
