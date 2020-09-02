/*
 * @Author: gy
 * @Date: 2020-09-01 15:01:01
 * @LastEditors: gy
 * @LastEditTime: 2020-09-02 14:08:13
 */

import React, {Component} from 'react';
import {View, Text, Icon, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

class BarView extends Component {
  renderTabOption(tab, i) {
    console.log(this.props);
    const color = this.props.activeTab == i ? '#6B8E23' : '#ADADAD'; // 判断i是否是当前选中的tab，设置不同的颜色
    return (
      <TouchableOpacity
        // onPress={() => this.props.goToPage(i)}
        style={styles.tab}>
        key={i}
        <View style={styles.tabItem}>
          {/* <Icon
            name={this.props.tabIconNames[i]} // 图标
            size={30}
            color={color}
          /> */}
          {/* <Text style={{color: color}}>{this.props.tabs[i]}</Text> */}
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View key={this.props}>
        {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
      </View>
    );
  }
}

export default BarView;

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
