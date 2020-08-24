import React from "react";
import { Animated, Linking, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../hooks";
import { Constants, handleAction } from "../util";

const URL_REGEX = /((https?|tldtdl):\/\/[^\s]+)/g;

type TodoProps = {
  done: boolean;
  text: string;
  index: number;
  fade: Animated.Value | null;
  onUndo: () => any;
};

const Todo = ({ onUndo, done, text, index, fade }: TodoProps) => {
  const { theme, themeName, greys } = useTheme();
  const color = theme[index];
  const urlMatch = text.match(URL_REGEX);
  let url: string | null = null,
    displayText = text;

  if (urlMatch) {
    url = urlMatch[0];
    displayText = text.replace(URL_REGEX, "");
  }

  const getOpacity = (range: number) => {
    if (done) return 0.5;
    if (fade === null) return 1;
    return fade.interpolate({
      inputRange: [0, 0.2, 0.2],
      outputRange: [1, range, range],
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

  const renderUrl = () => (
    <Animated.Image
      source={require("../../assets/url.png")}
      style={{
        opacity: getOpacity(0),
        height: 30,
        width: 30,
        right: 30,
        position: "absolute",
      }}
    />
  );

  let action: () => any = () => undefined;
  if (url) {
    action = url.startsWith("tldtdl://")
      ? () => handleAction(url as string)
      : () => Linking.openURL(url as string);
  }

  return (
    <Animated.View
      style={{
        backgroundColor: computedColor,
        paddingTop: index === 0 ? Constants.statusBarHeight : 0,
        height:
          Constants.itemHeight + (index === 0 ? Constants.statusBarHeight : 0),
      }}
    >
      <TouchableOpacity
        style={styles.todo}
        onPress={action}
        onLongPress={onUndo}
        activeOpacity={0.8}
      >
        <>
          <Animated.Text
            style={[
              styles.text,
              // displayText.length > 60 && styles.smallText,
              {
                opacity: getOpacity(0.5),
                width: url && !done ? "auto" : "100%",
              },
            ]}
          >
            {displayText}
          </Animated.Text>
          {url && !done && renderUrl()}
        </>
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
    marginRight: 30,
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
