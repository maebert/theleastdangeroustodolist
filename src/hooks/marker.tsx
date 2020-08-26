import React, { useState, useRef } from "react";
import * as Haptics from "expo-haptics";
import { Animated } from "react-native";

import { Constants } from "../util";
import { Marker } from "../components";

const useMarker = () => {
  const length = useRef(new Animated.Value(0)).current;
  const lineX = useRef(new Animated.Value(0)).current;
  const lineY = useRef(new Animated.Value(0)).current;

  const [style, setStyle] = useState(0);
  const [activeTodo, setActiveTodo] = useState<number | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [direction, setDirection] = useState(false);

  const getActiveTodo = (y: number) => {
    return Math.floor(
      ((y - Constants.statusBarHeight + 10) /
        (Constants.screenHeight - Constants.statusBarHeight)) *
        Constants.todos
    );
  };

  const startDrawing = (x: number, y: number) => {
    Haptics.selectionAsync();
    length.setValue(0);
    lineX.setValue(x);
    lineY.setValue(y);
    const activeTodo = getActiveTodo(y);
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
      todo: activeTodo,
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
    getActiveTodo,
    render,
    activeTodo,
    isDrawing,
    setLength,
  };
};

export default useMarker;
