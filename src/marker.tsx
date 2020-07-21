import React, { useState, useRef } from "react";
import { Animated, Image } from "react-native";
import Constants from "./constants";
import * as Haptics from "expo-haptics";

export type Line = {
  startX: number | Animated.Value;
  startY: number | Animated.Value;
  length: number | Animated.Value;
  direction: boolean;
  style: number;
};

const Marker = ({ startX, startY, length, direction, style }: Line) => (
  <Animated.View
    style={[
      {
        height: (Constants.screenWidth - 80) / 10,
        width: length,
        position: "absolute",
        top: startY,
      },
      direction ? { left: startX } : { right: startX },
    ]}
    overflow="hidden"
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
  const length = useRef(new Animated.Value(0)).current;
  const lineX = useRef(new Animated.Value(0)).current;
  const lineY = useRef(new Animated.Value(0)).current;

  const [style, setStyle] = useState(0);
  const [activeTodo, setActiveTodo] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [direction, setDirection] = useState(false);

  const startDrawing = (x, y) => {
    Haptics.selectionAsync();
    length.setValue(0);
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

  const setLength = (dirLength: number) => {
    setDirection(dirLength > 0);
    length.setValue(Math.abs(dirLength));
  };

  const cancelDrawing = () => {
    Animated.timing(length, {
      toValue: 0,
      duration: 100,
      useNativeDriver: false,
    }).start();
    setIsDrawing(false);
  };

  const endDrawing = () => {
    const newLine = {
      startX: direction ? lineX._value : Constants.screenWidth - lineX._value,
      startY: lineY._value,
      length: length._value,
      style: style,
      direction: direction,
    };
    setActiveTodo(null);
    setIsDrawing(false);
    return newLine;
  };

  const render = () => {
    if (!isDrawing) return null;
    return (
      <Marker
        startX={
          direction ? lineX : Animated.subtract(Constants.screenWidth, lineX)
        }
        startY={lineY}
        length={length}
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
