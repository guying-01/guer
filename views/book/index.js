/*
 * @Author       : gy
 * @Date         : 2020-11-06 21:22:59
 * @LastEditors: gy
 * @LastEditTime: 2020-12-10 17:06:20
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
} from 'react-native';
const Tabs = [
  {name: '都市', id: 1},
  {name: '玄幻', id: 2},
  {name: '修真', id: 3},
];

export default class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookList: [],
      activeTab: 1,
      refreshing: true,
    };
  }

  componentDidMount() {
    this.getList({category: '都市'});
  }

  getItem(data, index) {
    return data.length == 0
      ? {id: Math.random().toString(12).substring(0), name: ''}
      : data[index];
  }

  rederItem({name, cover, auth, viewed, last_modify_time}) {
    return (
      <View style={styles.itemStyle}>
        <Image
          style={styles.coverStyle}
          source={{
            uri: cover
              ? `https://guying.club/static/book/cover/${cover}`
              : 'https://guying.club/static/book/cover/default.jpg',
          }}
        />
        <View style={styles.itemContentStyle}>
          <Text style={styles.itemTitleStyle}>{name}</Text>
          <Text style={styles.itemSubTitleStyle}>{auth}</Text>
          <Text>
            热度：
            <Text style={styles.itemViewedStyle}>{viewed}</Text>
          </Text>
          <Text>最后更新：{last_modify_time}</Text>
        </View>
      </View>
    );
  }

  handleChangeTab(item) {
    this.setState({
      activeTab: item.id,
    });

    this.getList();
  }

  emptyComponent() {
    return (
      <View style={styles.centering}>
        <Text>暂无数据</Text>
      </View>
    );
  }

  getList(param = {}) {
    let category = Tabs.find((item) => {
      return item.id == this.state.activeTab;
    }).name;
    const url = `https://guying.club:3001/book/getBookList?category=${category}`;
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status == 200) {
          this.setState({
            bookList: res.data,
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
        this.setState({
          refreshing: false,
        });
        console.log(e.message);
      });
  }

  render() {
    return (
      <View style={styles.wrapperStyle}>
        <View style={styles.tabStyle}>
          {Tabs.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => this.handleChangeTab(item)}>
                <Text
                  style={[
                    styles.tabItemStyle,
                    this.state.activeTab == item.id
                      ? styles.activeTabStyle
                      : '',
                  ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <SafeAreaView style={styles.containerStyle}>
          {/* <ActivityIndicator
            size="large"
            color="#61dafb"
            style={[
              styles.centering,
              {flex: 1, backgroundColor: 'gray', transform: [{scale: 5}]},
            ]}
          /> */}
          <VirtualizedList
            data={this.state.bookList}
            initialNumToRender={10}
            renderItem={({item}) => {
              return this.rederItem(item);
            }}
            keyExtractor={(item) => {
              return item.id.toString();
            }}
            getItemCount={(data) => data.length}
            getItem={this.getItem}
            onEndReachedThreshold={0.2}
            maxToRenderPerBatch={10}
            onRefresh={() => this.getList()}
            refreshing={this.state.refreshing}
            ListEmptyComponent={this.emptyComponent}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperStyle: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  tabStyle: {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    height: 30,
    borderRadius: 20,
    backgroundColor: '#dedede',
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  tabItemStyle: {
    color: '#1a1a1a',
  },
  activeTabStyle: {
    color: '#61dafb',
  },
  containerStyle: {
    flex: 1,
    // display: 'none',
  },
  itemStyle: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
  },
  coverStyle: {
    width: 100,
    height: 130,
  },
  itemContentStyle: {
    flex: 1,
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemTitleStyle: {
    fontSize: 20,
  },
  itemSubTitleStyle: {
    fontSize: 15,
    color: '#9e9e9e',
  },
  itemViewedStyle: {
    color: '#61dafb',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
});
