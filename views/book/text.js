/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-12-24 17:14:45
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
  PanResponder,
} from 'react-native';
// const stylePageWidth = {
//   width: Dimensions.get('window').width,
//   height: Dimensions.get('window').height,
//   textAlign: 'center',
// };
import HTMLView from 'react-native-htmlview';
let deviceWidth = Dimensions.get('window').width;
let book_id = '';
let line = '10'; //屏幕可以展示10行
let words = '25'; //一行可以显示25个字
let viewHeight = '';
let viewWidth = '';
let cache = {1: []};
let chapter = 1;

let spaceStr = (len) => {
  let str = '';
  for (let i = 0; i < len; i++) {
    str += ' ';
  }

  return str;
};

export default class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: '0',
      current: '123',
      next: '456',
      chapterList: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      curSecIdx: 0,
      secLen: 0,
      section: [],
      loading: false,
    };

    this._panResponse = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderRelease: (event, ges) => {
        let idx = this.state.curSecIdx;
        //左滑展示下一段
        if (ges.dx < 0) {
          if (idx + 1 > cache[chapter].length - 1) {
            chapter += 1;
            this.setState({
              curSecIdx: 0,
            });
          } else {
            this.setState({
              curSecIdx: idx + 1,
            });
          }

          if (idx >= cache[chapter].length / 2) {
            this.getChapter(chapter + 1);
          }
        }
        //右滑展示上一段
        else if (ges.dx > 0) {
          if (idx == 0) {
            chapter -= 1;
            this.setState({
              curSecIdx: cache[chapter].length - 1,
            });
          } else {
            this.setState({
              curSecIdx: idx - 1,
            });
          }

          if (idx >= cache[chapter].length / 2) {
            this.getChapter(chapter == 1 ? 1 : chapter - 1);
          }
        }
      },
    });
  }

  componentDidMount() {
    book_id = this.props.route.params.id;
    console.log(book_id, 'book_id');
    this.getChapter(chapter);
  }

  replaceWrapLetter(str) {
    let idx = str.indexOf('\n');
    if (idx != -1) {
      let spaceL = words - (idx % words);
      return this.replaceWrapLetter(str.replace('\n', spaceStr(spaceL)));
    } else {
      return str;
    }
  }

  getChapter(chap) {
    if (cache[chap] && cache[chap].length != 0) {
      chapter = chap;
      return;
    }

    let url = `https://guying.club:3001/book/getChapter?id=${book_id}&chapter=${chap}`;
    console.log(url);
    this.setState({
      loading: true,
    });
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          let section = this.state.section;
          let title = res.data.chapter;
          let parsedContent = res.data.content.replace(/<br>/g, '');
          // parsedContent = parsedContent.replace(/\n/g, '<br>');
          parsedContent = this.replaceWrapLetter(parsedContent);
          let pageWord = line * words;
          let secLen = Math.ceil(parsedContent.length / pageWord);
          for (let i = 0; i < secLen; i++) {
            section.push(parsedContent.substr(i * pageWord, pageWord));
          }
          console.log(section[0]);
          cache[chap] = section;
        } else {
          ToastAndroid.show(res.msg, ToastAndroid.SHORT);
          console.log(res.msg);
        }

        this.setState({
          loading: false,
        });
      })
      .catch((e) => {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
        this.setState({
          loading: false,
        });
        console.log(e.message);
      });
  }

  onLayout = (event) => {
    viewHeight = event.nativeEvent.layout.height;
    viewWidth = event.nativeEvent.layout.width;
    line = Math.floor(viewHeight / 20);
    words = Math.floor(viewWidth / 20);
  };

  viewText(str) {
    if (!str) {
      return '';
    }
    let arr = str.split('');
    console.log(str.match(/\s/g).length, 'len');
    return (
      <Text>
        {arr.map((item, index) => {
          if (item == ' ') {
            return <Text key={index}>&emsp;</Text>;
          } else {
            return <Text key={index}>{item}</Text>;
          }
        })}
      </Text>
    );
  }

  render() {
    if (this.state.loading) {
      return (
        <View
          style={[styles.scrollViewStyle, styles.center]}
          onLayout={(event) => this.onLayout(event)}>
          <ActivityIndicator size="large" color="#61dafb" />
        </View>
      );
    } else {
      return (
        <ScrollView
          {...this._panResponse.panHandlers}
          style={styles.scrollViewStyle}
          ref={(ref) => (this._scrollViewRef = ref)}
          onRefresh={() => this.getChapter(chapter)}
          refreshing={this.state.refreshing}>
          <Text style={styles.textStyle}>
            {/* {'好的吧广泛的萨嘎是公司大股东撒故事"&nbsp;"大 纲 大使馆'} */}
            {/* {cache[chapter][this.state.curSecIdx]} */}
            {this.viewText(cache[chapter][this.state.curSecIdx])}
          </Text>
          {/* <HTMLView value={}/> */}
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreenStyle: {
    flex: 1,
    borderWidth: 1,

    // height: 600,
    // width: 400,
    width: deviceWidth,
    // height: '100%',
    // flex: 1,
    // alignItems: 'center',
  },
  textStyle: {
    color: '#333',
    fontSize: 20,
  },
});
