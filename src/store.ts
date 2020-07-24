import { AsyncStorage } from "react-native";

const Store = {
  get: (key: string) =>
    AsyncStorage.getItem(key).then((value: any) => {
      return JSON.parse(value);
    }),

  save: (key: string, value: any) =>
    AsyncStorage.setItem(key, JSON.stringify(value)),

  del: (key: string) => AsyncStorage.removeItem(key),

  keys: () => AsyncStorage.getAllKeys(),
};

export default Store;
