import React from "react";
import { Text, View, Animated, Image } from "react-native";
import Constants from "./constants";
import update from "immutability-helper";
import { PanGestureHandler } from "react-native-gesture-handler";
import Todo from "./todo";
import * as Haptics from 'expo-haptics';
import Marker from "./marker";

export default class TodoList extends React.Component {
  lineWidth = new Animated.Value(0);
  fade = new Animated.Value(0);
  lineX = new Animated.Value(0);
  lineY = new Animated.Value(0);

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      style: 0,
      lines: [],
      panRight: false,
      panTodo: 0
    };
  }

  handleGesture = evt => {
    this.lineWidth.setValue(Math.abs(evt.nativeEvent.translationX));
    this.fade.setValue(
      Math.abs(evt.nativeEvent.translationX) / Constants.screenWidth
    );
    this.setState({ panRight: evt.nativeEvent.translationX > 0 });
  };

  onStartSwipe = evt => {
    Haptics.selectionAsync()
    this.lineX.setValue(evt.x);
    this.lineY.setValue(evt.y);
    const panTodo = Math.floor(
      ((evt.y - Constants.statusBarHeight + 10) /
        (Constants.screenHeight - Constants.statusBarHeight)) *
        6
    );
    this.setState({ style: Math.floor(Math.random() * 6), panTodo });
  };

  onCancelSwipe = evt => {
    Animated.timing(this.lineWidth, {
      toValue: 0,
      duration: 500
    }).start();
    Animated.timing(this.fade, {
      toValue: 0,
      duration: 500
    }).start();
  };

  onEndSwipe = evt => {
    const newLine = {
      startX: this.state.panRight
        ? this.lineX._value
        : Constants.screenWidth - this.lineX._value,
      startY: this.lineY._value,
      width: this.lineWidth._value,
      style: this.state.style,
      direction: this.state.panRight
    };
    this.lineWidth.setValue(0);
    const newData = update(this.state.data, {
      [this.state.panTodo]: { done: { $set: true } }
    });
    this.setState({ data: newData, lines: [...this.state.lines, newLine] });
  };

  onGestureStateChange = evt => {
    const { nativeEvent } = evt;
    if (nativeEvent.oldState === 0 && nativeEvent.state === 2) {
      this.onStartSwipe(nativeEvent);
    }
    if (nativeEvent.oldState === 4 && nativeEvent.state === 5) {
      if (Math.abs(nativeEvent.translationX) < Constants.screenWidth * 0.2) {
        this.onCancelSwipe();
      } else {
        this.onEndSwipe();
      }
    }
  };

  renderMarker() {
    const { panRight } = this.state;
    return (
      <Marker
        startX={
          panRight
            ? this.lineX
            : Animated.subtract(Constants.screenWidth, this.lineX)
        }
        startY={this.lineY}
        width={this.lineWidth}
        direction={panRight}
        style={this.state.style}
      />
    );
  }

  render() {
    const todos = this.state.data.map((todo, index) => (
      <Todo
        key={index.toString()}
        {...todo}
        index={index}
        fade={this.state.panTodo === index ? this.fade : null}
      />
    ));

    return (
      <PanGestureHandler
        onGestureEvent={this.handleGesture}
        onHandlerStateChange={this.onGestureStateChange}
      >
        <View style={{ width: "100%" }}>
          {todos}
          {this.state.lines.map((line, idx) => (
            <Marker {...line} key={idx.toString()} />
          ))}
          {this.renderMarker()}
        </View>
      </PanGestureHandler>
    );
  }
}
