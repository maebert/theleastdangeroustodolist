import React from "react";
import { Text, Animated, View } from "react-native";
import Constants from "./constants";

const COLORS = [
  "#464152",
  "#533848",
  "#84374E",
  "#BB5056",
  "#D8906A",
  "#C7A97F"
];

const GREYS = [
  "#707070",
  "#7a7a7a",
  "#808080",
  "#8a8a8a",
  "#909090",
  "#9a9a9a"
];

export default class Todo extends React.Component {
  renderTag() {
    return (
      <View
        style={{
          fontSize: 14,
          backgroundColor: "#fff3",
          paddingHorizontal: 10,
          lineHeight: 14,
          borderRadius: 10
        }}
      >
        <Text>#{this.props.pack}</Text>
      </View>
    );
  }

  render() {
    const { text, index, done, fade } = this.props;

    let bg, fg;
    if (done) {
      bg = GREYS[index];
      fg = 0.5;
    } else if (!fade) {
      bg = COLORS[index];
      fg = 1;
    } else {
      bg = fade.interpolate({
        inputRange: [0, 0.2, 0.2],
        outputRange: [COLORS[index], GREYS[index], GREYS[index]]
      });
      fg = fade.interpolate({
        inputRange: [0, 0.2, 0.2],
        outputRange: [1, 0.5, 0.5]
      });
    }

    return (
      <Animated.View
        style={{
          width: "100%",
          paddingHorizontal: 40,
          justifyContent: "center",
          backgroundColor: bg,
          paddingTop: index === 0 ? Constants.statusBarHeight : 0,
          height:
            Constants.itemHeight + (index === 0 ? Constants.statusBarHeight : 0)
        }}
      >
        <Animated.Text
          style={{
            color: "white",
            fontSize: 24,

            opacity: fg
          }}
        >
          {text}
        </Animated.Text>
      </Animated.View>
    );
  }
}
