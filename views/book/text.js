/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-12-18 14:06:32
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
// const stylePageWidth = {
//   width: Dimensions.get('window').width,
//   height: Dimensions.get('window').height,
//   textAlign: 'center',
// };
let deviceWidth = Dimensions.get('window').width;
let book_id = '';
let line = '10'; //屏幕可以展示10行
let words = '25'; //一行可以显示25个字
let viewHeight = '';
let viewWidth = '';
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
      refreshing: true,
    };
  }

  componentDidMount() {
    book_id = this.props.route.params.id;
    this.getChapter();
    console.log('device height' + Dimensions.get('window').height);
    console.log('device width' + Dimensions.get('window').width);
  }

  getChapter(chapter) {
    let url = `https://guying.club:3001/book/getChapter?id=${book_id}&chapter=${this.state.chapter}`;
    console.log(url);
    fetch(url, {
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          let section = this.state.section;
          let title = res.data.chapter;
          let parsedContent = res.data.content.replace(/<br>/g, '');
          let br = parsedContent.match(/<br>/g);
          //计算有几个换行符
          let pageWord = line * words;
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
          console.log(res.msg);
        }

        this.setState({
          refreshing: false,
        });
      })
      .catch((e) => {
        ToastAndroid.show(e.message, ToastAndroid.SHORT);
        this.setState({
          refreshing: false,
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

  _contentViewScroll = (e) => {
    var offsetX = e.nativeEvent.contentOffset.x; //滑动距离
    var contentSizeWidth = e.nativeEvent.contentSize.width; //scrollView contentSize高度
    var oriageScrollWidth = e.nativeEvent.layoutMeasurement.width; //scrollView高度

    if (offsetX + oriageScrollWidth >= contentSizeWidth / 2) {
      console.log('到底了');
      // this._scrollViewRef.scrollTo({x: 0});
      let chapter = this.state.chapter;
      this.setState({
        chapter: chapter + 1,
      });
      this.getChapter();
      //在这里面加入你需要指行得方法和加载数据;
    } else if (offsetX + oriageScrollWidth <= 1) {
      //这个是没有数据了然后给了false  得时候还在往上拉
    } else if (offsetX == 0) {
      //这个地方是下拉刷新，意思是到顶了还在指行，可以在这个地方进行处理需要刷新得数据
    }
  };

  render() {
    return (
      <ScrollView
        ref={(ref) => (this._scrollViewRef = ref)}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={5}
        style={styles.scrollViewStyle}
        refreshing={this.state.refreshing}
        onMomentumScrollEnd={this._contentViewScroll}
        onLayout={(event) => this.onLayout(event)}>
        {this.state.section.map((item, index) => {
          return (
            <View style={styles.fullScreenStyle} key={index}>
              <HTMLView value={item} style={styles.textStyle} />
              {/* <Text style={styles.textStyle}>{item}</Text> */}
            </View>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
  },
  scrollViewStyle: {
    flex: 1,
    // display: 'flex',
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
    // color: '#333',
    fontSize: 20,
    borderWidth: 1,
  },
});
