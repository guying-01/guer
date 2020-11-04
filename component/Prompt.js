import React, {Component} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';

let {width, height} = Dimensions.get('window');
export default class Prompt extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string,
    left: PropTypes.object,
    right: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  _renderTitle() {
    return (
      <View style={styles.titleWrapperStyle}>
        <Text style={styles.titleStyle}>{this.props.title || '提示'}</Text>
      </View>
    );
  }

  _renderContent() {
    return (
      <View>
        <TextInput
          style={styles.inputStyle}
          value={this.state.inputValue}
          placeholder="请输入名称"
          onChangeText={(value) => this.setState({inputValue: value})}
        />
      </View>
    );
  }

  handleInputChange(value) {
    this.setState({inputValue: value});
  }

  _renderButtons() {
    const {left, right} = this.props;
    let leftAction = left.onPress;
    let rightAction = right.onPress;
    return (
      <View style={styles.btnWrapperStyle}>
        <TouchableOpacity style={styles.btnStyle}>
          <Text
            style={[{fontSize: 16, color: '#3981FD'}]}
            onPress={() => leftAction(this.state.inputValue)}>
            确认
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnStyle}>
          <Text
            style={[{fontSize: 16, color: '#3981FD'}]}
            onPress={rightAction}>
            取消
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <Modal animationType="slide" visible={this.props.visible}>
        <View style={styles.bgContainViewStyle} />
        <View style={styles.containerStyle}>
          <View style={[styles.alertViewStyle]}>
            <ScrollView style={{marginTop: 20, marginBottom: 20}}>
              {this._renderTitle()}
              {this._renderContent()}
            </ScrollView>
            <View style={styles.horizontalLineStyle} />
            {this._renderButtons()}
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  bgContainViewStyle: {
    top: 0,
    width: width,
    position: 'absolute',
    opacity: 0.4,
    backgroundColor: 'rgb(0,0,0)',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    bottom: 0,
    top: 0,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
  },
  alertViewStyle: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    position: 'absolute',
    maxHeight: height - 40,
  },
  titleWrapperStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  inputStyle: {
    // height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    fontSize: 14,
    textAlign: 'left',
    color: '#666666',
  },
  horizontalLineStyle: {
    height: 0.5,
    backgroundColor: 'lightgrey',
  },
  btnWrapperStyle: {flexDirection: 'row', width: width - 100, height: 48},
  btnStyle: {
    flex: 1,
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
