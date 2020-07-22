import React from "react";
import {
  Animated,
  View,
  Linking,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Constants from "./constants";
import Colors, { Theme } from "./themes";
import { handleAction } from "./util";

const URL_REGEX = /((https?|tldtdl):\/\/[^\s]+)/g;

type TodoProps = {
  theme: Theme;
  done: boolean;
  text: string;
  index: number;
  fade: Animated.Value | null;
};

const Todo = ({ theme, done, text, index, fade }: TodoProps) => {
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
    if (done) return Colors[Theme.Greys][index];
    if (fade === null) return Colors[theme][index];
    return fade.interpolate({
      inputRange: [0, 0.2, 0.2],
      outputRange: [
        Colors[theme][index],
        Colors[Theme.Greys][index],
        Colors[Theme.Greys][index],
      ],
    });
  };

  const renderUrl = () => (
    <Animated.Image
      source={require("../assets/url.png")}
      style={{
        opacity: getOpacity(0),
        height: 30,
        width: 30,
        right: 30,
        position: "absolute",
      }}
    />
  );

  const renderText = () => (
    <Animated.Text style={[styles.text, { opacity: getOpacity(0.5) }]}>
      {displayText}
    </Animated.Text>
  );

  const renderTouchable = (inner: React.ReactNode) => {
    if (!url) return null;
    const action = url.startsWith("tldtdl://")
      ? () => handleAction(url as string)
      : () => Linking.openURL(url as string);

    return (
      <TouchableHighlight
        underlayColor="#fff4"
        activeOpacity={0.2}
        style={styles.todo}
        onPress={action}
      >
        <React.Fragment>
          {inner}
          {renderUrl()}
        </React.Fragment>
      </TouchableHighlight>
    );
  };

  const inner = renderText();
  return (
    <Animated.View
      style={{
        backgroundColor: getColor(),
        paddingTop: index === 0 ? Constants.statusBarHeight : 0,
        height:
          Constants.itemHeight + (index === 0 ? Constants.statusBarHeight : 0),
      }}
    >
      {url && !done ? (
        renderTouchable(inner)
      ) : (
        <View style={styles.todo}>{inner}</View>
      )}
    </Animated.View>
  );
};

Todo.defaultProps = {
  theme: Theme.Default,
  done: false,
  text: "",
  index: 0,
  fade: null,
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
  tag: {
    fontSize: 14,
    backgroundColor: "#fff3",
    paddingHorizontal: 10,
    lineHeight: 14,
    borderRadius: 10,
  },
});

export default Todo;
