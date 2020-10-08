import { Dimensions } from "react-native";
import Constants from "expo-constants";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default {
  todos: 6,
  historyLenth: 84,
  debug: false,
  namespace: "LDTLD-1.0",
  screenWidth,
  screenHeight,
  itemHeight: (screenHeight - Constants.statusBarHeight) / 6,
  statusBarHeight: Constants.statusBarHeight,
};
