import React from "react";
import {
  Text,
  Animated,
  View,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Constants from "./constants";
import Palette from "./palette";

export default class Todo extends React.Component {
    static defaultProps = {
    palette: "default",
    done: false,
    text: "",
    index: 0,
    fade: null
  }

  renderTag() {
    return (
      <View style={styles.tag}>
        <Text>#{this.props.pack}</Text>
      </View>
    );
  }

  renderBox() {
    return (
      <TouchableHighlight
        underlayColor="white"
        style={{
          height: 32,
          width: 32,
          borderRadius: 4,
          borderWidth: 2,
          borderColor: "white",
          marginRight: 15,
          opacity: this.props.done ? 0.5 : 1,
          padding: 3
        }}
        onPress={() => this.props.onComplete()}
      >
        <View
          style={{
            backgroundColor: this.props.done ? "#ffff" : "#fff0",
            width: "100%",
            height: "100%",
            borderRadius: 2
          }}
        />
      </TouchableHighlight>
    );
  }

  getOpacity = () => {
    const { done, fade } = this.props;
    if (done) return 0.5;
    if (fade === null) return 1;
    return fade.interpolate({
      inputRange: [0, 0.2, 0.2],
      outputRange: [1, 0.5, 0.5]
    });
  };

  getColor = () => {
    const { done, fade, index, palette } = this.props;
    if (done) return Palette.greys[index];
    if (fade === null) return Palette[palette][index];
    return fade.interpolate({
      inputRange: [0, 0.2, 0.2],
      outputRange: [
        Palette[palette][index],
        Palette.greys[index],
        Palette.greys[index]
      ]
    });
  };

  render() {
    const { text, index } = this.props;

    return (
      <Animated.View
        style={[
          styles.todo,
          {
            backgroundColor: this.getColor(),
            paddingTop: index === 0 ? Constants.statusBarHeight : 0,
            height:
              Constants.itemHeight +
              (index === 0 ? Constants.statusBarHeight : 0)
          }
        ]}
      >
        <Animated.Text style={[styles.text, { opacity: this.getOpacity() }]}>
          {text}
        </Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  todo: {
    width: "100%",
    paddingHorizontal: 30,
    // justifyContent: "left",
    alignItems: "center",
    flexDirection: "row"
  },
  text: {
    fontFamily: "Lato Bold",
    color: "white",
    fontSize: 24,
    marginRight: 30
  },
  tag: {
    fontSize: 14,
    backgroundColor: "#fff3",
    paddingHorizontal: 10,
    lineHeight: 14,
    borderRadius: 10
  }
});
