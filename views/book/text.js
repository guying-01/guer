/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-12-11 17:45:39
 * @FilePath     : /guer/component/GroupSetting.js
 * @Description  : 页面描述
 */
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  VirtualizedList,
  SafeAreaView,
  Image,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from 'react-native';
const stylePageWidth = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
  textAlign: 'center',
};
let book_id = '';
let line = '10'; //屏幕可以展示10行
let words = '25'; //一行可以显示25个字
// const DOMParser = require('react-native-html-parser').DOMParser;

import HTMLView from 'react-native-htmlview';
export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chapter: 1,
      prev: '0',
      current: '123',
      next: '456',
      chapterList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      curSecIdx: 0,
      secLen: 0,
      section: [],
    };
  }

  componentDidMount() {
    book_id = this.props.route.params.id;
    this.getChapter();
  }

  getChapter() {
    let url = `https://guying.club:3001/book/getChapter?id=${book_id}&chapter=${this.state.chapter}`;
    console.log(url);
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          let section = [];
          let title = res.data.chapter;
          let pageWord = line * words;
          let parsedContent = res.data.content;
          let secLen = Math.ceil(parsedContent.length / pageWord);
          for (let i = 0; i < secLen; i++) {
            section.push(parsedContent.substr(i * pageWord, pageWord));
          }

          this.setState({
            title,
            section,
            secLen,
          });
        } else {
          ToastAndroid.show(res.msg, ToastAndroid.SHORT);
        }

        this.setState({
          refreshing: false,
        });
      })
      .catch((e) => {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
        console.log(e.message);
      });
  }

  render() {
    return (
      // <SafeAreaView style={styles.wrapperStyle}>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={5}>
        <View style={stylePageWidth}>
          <HTMLView value={this.state.section[this.state.curSecIdx]} />
          {/* <Text>{this.state.section[this.state.curSecIdx]}</Text> */}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    backgroundColor: 'red',
    flex: 1,
  },
  fullScreenStyle: {
    // backgroundColor: 'blue',
    width: '90%',
    height: '100%',
    // flex: 1,
    // alignItems: 'center',
  },
  fullScreenStyle1: {
    // backgroundColor: 'yellow',
    width: '90%',
    height: '100%',
  },
});
