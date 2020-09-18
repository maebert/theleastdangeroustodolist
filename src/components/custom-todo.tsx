import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks";
import { Constants } from "../util";

import Todo from "./todo";
import { useSettings } from "../hooks";

export type TodoProps = {
  done: boolean;
  index: number;
  fade: Animated.Value | null;
  onUndo: () => any;
};

const CustomTodo = ({ onUndo, done, index, fade }: TodoProps) => {
  const { theme, themeName, greys } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const { customTodo, dispatch } = useSettings();
  const grow = useRef(new Animated.Value(0)).current;
  const color = theme[index];

  const getOpacity = (max: number, min: number) => {
    if (done) return min;
    if (fade === null) return max;

    return fade.interpolate({
      inputRange: [0, 0.2, 0.2],
      outputRange: [max, min, min],
    });
  };

  const getColor = () => {
    if (done) return greys[index];
    if (fade === null) return color;
    return fade.interpolate({
      inputRange: [0, 0.2, 0.2],
      outputRange: [color, greys[index], greys[index]],
    });
  };

  const computedColor = getColor();

  const expand = () => {
    if (done) return;
    Animated.timing(grow, {
      toValue: expanded ? 0 : 1,
      duration: 250,
      useNativeDriver: false,
    }).start(() => setExpanded(grow._value === 1));
  };

  const renderText = () => {
    if (!expanded)
      return (
        <>
          <Animated.Text
            style={[
              styles.text,
              {
                opacity: !customTodo ? 0.5 : getOpacity(1, 0.5),
                width: !customTodo ? "auto" : "100%",
              },
            ]}
          >
            {customTodo || "Create a custom to-do"}
          </Animated.Text>
          {!customTodo && (
            <Animated.Image
              source={require("../../assets/pen.png")}
              style={{
                opacity: grow.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.4, 0],
                }),
                height: 20,
                width: 20,
                marginLeft: 15,
                marginTop: 2,
                //   position: "absolute",
              }}
            />
          )}
        </>
      );

    return (
      <TextInput
        value={customTodo}
        placeholder="Create a custom to-do"
        placeholderTextColor="#fff8"
        style={{ ...styles.text, marginRight: 0 }}
        onEndEditing={expand}
        blurOnSubmit
        multiline
        numberOfLines={3}
        autoFocus
        selectTextOnFocus
        onChangeText={(customTodo) => dispatch({ customTodo })}
      />
    );
  };

  return (
    <Animated.View
      style={{
        backgroundColor: computedColor,
        zIndex: grow.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 300],
        }),
        marginTop: grow.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -Constants.screenHeight + Constants.itemHeight],
        }),
        height: grow.interpolate({
          inputRange: [0, 1],
          outputRange: [Constants.itemHeight, Constants.screenHeight],
        }),
      }}
    >
      <TouchableOpacity
        style={styles.todo}
        onPress={expand}
        onLongPress={onUndo}
        activeOpacity={0.8}
      >
        {renderText()}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  todo: {
    width: "100%",
    paddingHorizontal: 30,
    alignItems: "center",
    flexDirection: "row",
    height: "100%",
  },
  text: {
    fontFamily: "Lato Bold",
    color: "white",
    fontSize: 24,
  },
  smallText: {
    fontSize: 20,
  },

  tag: {
    fontSize: 14,
    backgroundColor: "#fff3",
    paddingHorizontal: 10,
    lineHeight: 14,
    borderRadius: 10,
  },
});

export default Todo;

export default CustomTodo;
