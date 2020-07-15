import React, { useState, useRef } from "react";
import { Animated, Image } from "react-native";
import Constants from "./constants";
import * as Haptics from "expo-haptics";

const Marker = ({ startX, startY, width, direction, style }) => (
  <Animated.View
    style={[
      {
        height: (Constants.screenWidth - 80) / 10,
        width: width,
        position: "absolute",
        top: startY,
      },
      direction ? { left: startX } : { right: startX },
    ]}
    overflow={"hidden"}
  >
    <Image
      source={require("../assets/line1.png")}
      resizeMode={"cover"}
      style={[
        {
          opacity: 0.9,
          width: Constants.screenWidth - 80,
          height: ((Constants.screenWidth - 80) * 6) / 10,
          position: "absolute",
          top: 0,
          transform: [
            {
              translateY: (-(Constants.screenWidth - 80) / 10) * style,
            },
            { rotateY: direction ? "0deg" : "180deg" },
          ],
        },
        direction ? { left: 0 } : { right: 0 },
      ]}
    />
  </Animated.View>
);

export const useMarker = () => {
  lineWidth = useRef(new Animated.Value(0)).current;
  lineX = useRef(new Animated.Value(0)).current;
  lineY = useRef(new Animated.Value(0)).current;

  const [style, setStyle] = useState(0);
  const [activeTodo, setActiveTodo] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [direction, setDirection] = useState(false);

  const startDrawing = (x, y) => {
    Haptics.selectionAsync();
    lineWidth.setValue(0);
    lineX.setValue(x);
    lineY.setValue(y);
    const activeTodo = Math.floor(
      ((y - Constants.statusBarHeight + 10) /
        (Constants.screenHeight - Constants.statusBarHeight)) *
        Constants.todos
    );
    setIsDrawing(true);
    setStyle(Math.floor(Math.random() * Constants.todos));
    setActiveTodo(activeTodo);
    return activeTodo;
  };

  const setLength = (length) => {
    setDirection(length > 0);
    lineWidth.setValue(Math.abs(length));
  };

  const cancelDrawing = () => {
    Animated.timing(lineWidth, {
      toValue: 0,
      duration: 100,
    }).start();
    Animated.timing(fade, {
      toValue: 0,
      duration: 500,
    }).start();
    setIsDrawing(false);
  };

  const endDrawing = () => {
    const newLine = {
      startX: direction ? lineX._value : Constants.screenWidth - lineX._value,
      startY: lineY._value,
      width: lineWidth._value,
      style: style,
      direction: direction,
    };

    setIsDrawing(false);
    return newLine;
  };

  const render = () => {
    return (
      <Marker
        startX={
          direction ? lineX : Animated.subtract(Constants.screenWidth, lineX)
        }
        startY={lineY}
        width={lineWidth}
        direction={direction}
        style={style}
      />
    );
  };

  return {
    startDrawing,
    endDrawing,
    cancelDrawing,
    render,
    activeTodo,
    isDrawing,
    setLength,
  };
};

export default Marker;
