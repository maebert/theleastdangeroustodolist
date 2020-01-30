import { Dimensions, Platform } from "react-native";
import Constants from 'expo-constants';


const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

export default {
    screenWidth,
    screenHeight,
    itemHeight: (screenHeight - Constants.statusBarHeight) / 6,
    statusBarHeight: Constants.statusBarHeight,
}
