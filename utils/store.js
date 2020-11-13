import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Storage {
  async setItem(key, value) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  }
  async getItem(key) {
    let res = '';
    let value = await AsyncStorage.getItem(key);
    // console.log(value, key, 'value');
    if (value != null) {
      res = JSON.parse(value);
    }
    return res;
  }

  clear() {
    AsyncStorage.clear();
  }

  removeItem(key) {
    AsyncStorage.removeItem(key);
  }
}
