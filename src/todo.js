import React from "react";
import {
  Text,
  Animated,
  View,
  Linking,
  TouchableHighlight,
  StyleSheet
} from "react-native";
import Constants from "./constants";
import Palette from "./palette";
import {handleAction} from './util'

const URL_REGEX = /((https?|tldtdl):\/\/[^\s]+)/g;

export default class Todo extends React.Component {
  static defaultProps = {
    palette: "default",
    done: false,
    text: "",
    index: 0,
    fade: null
  };

  state = {}

  static getDerivedStateFromProps(props, state) {
    const url = props.text.match(URL_REGEX);
    if (url) return { text: props.text.replace(URL_REGEX, ""), url: url[0] };
    return { text: props.text }
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

  getOpacity = (range) => {
    const { done, fade } = this.props;
    if (done) return 0.5;
    if (fade === null) return 1;
    return fade.interpolate({
      inputRange: [0, 0.2, 0.2],
      outputRange: [1, range, range]
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

  renderUrl() {
    return (
      <Animated.Image
        source={require("../assets/url.png")}
        style={{
          opacity: this.getOpacity(0),
          height: 30,
          width: 30,
          right: 30,
          position: "absolute"
        }}
      />
    );
  }

  renderText() {
    return (
        <Animated.Text style={[styles.text, { opacity: this.getOpacity(.5) }]}>
          {this.state.text}
        </Animated.Text>
    );
  }

  renderTouchable(inner) {
    const action = this.state.url.startsWith("tldtdl://")
      ? () => handleAction(this.state.url)
      : () => Linking.openURL(this.state.url);

    return (
      <TouchableHighlight
        underlayColor="#fff4"
        activeOpacity={0.2}
        style={styles.todo}
        onPress={action}
      >
        <React.Fragment>
        {inner}
        {this.renderUrl()}
        </React.Fragment>
      </TouchableHighlight>
    );
  }

  render() {
    const { index } = this.props;
    const inner = this.renderText();
    return (
      <Animated.View
        style={{
          backgroundColor: this.getColor(),
          paddingTop: index === 0 ? Constants.statusBarHeight : 0,
          height:
            Constants.itemHeight + (index === 0 ? Constants.statusBarHeight : 0)
        }}
      >
        {this.state.url && !this.props.done ? (
          this.renderTouchable(inner)
        ) : (
          <View style={styles.todo}>{inner}</View>
        )}
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
    flexDirection: "row",
    height: "100%"
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
