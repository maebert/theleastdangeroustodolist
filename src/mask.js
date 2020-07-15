import React, { useRef } from "react";
import { Animated, View } from "react-native";
import Constants from "./constants";
import Themes from "./themes";

const useMask = () => {
  const opacity = useRef(new Animated.Value(0)).current;

  const conceal = (callback) => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      callback();
      Animated.timing(opacity, {
        toValue: 0.0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  };

  const render = ({ theme }) => (
    <Animated.View
      pointerEvents="none"
      style={{
        opacity,
        position: "absolute",
        top: 0,
        left: 0,
        height: Constants.screenHeight,
        width: Constants.screenWidth,
      }}
    >
      {Themes[theme || "default"].map((color, index) => (
        <View
          style={{
            backgroundColor: color,
            paddingTop: index === 0 ? Constants.statusBarHeight : 0,
            height:
              Constants.itemHeight +
              (index === 0 ? Constants.statusBarHeight : 0),
          }}
          key={color}
        />
      ))}
    </Animated.View>
  );

  return { conceal, Mask: render };
};

export default useMask;
