import React from "react";
import { SwipeListView, SwipeRow } from "react-native-swipe-list-view";
import { Dimensions, StyleSheet, Text, View, Animated } from "react-native";
import Constants from "./constants";
import update from "immutability-helper";

const COLORS = [
  "#464152",
  "#533848",
  "#84374E",
  "#BB5056",
  "#D8906A",
  "#C7A97F",
];

const GREYS = [
  "#444",
  "#555",
  "#666",
  "#777",
  "#888",
  "#999",
];

const styles = StyleSheet.create({
  todolist: {
    width: "100%"
  },
  rowFront: {
    width: "100%",
    paddingHorizontal: 40,
    justifyContent: "center"
  },
  rowBack: {
    paddingLeft: 20,
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#6C836DFF"
  },
  text: {
    color: "white",
    fontSize: 24
  }
});

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: new Animated.Value(this.props.done ? 0 : 1)
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.done !== this.props.done) {
      Animated.timing(this.state.color, {
        toValue: this.props.done ? 0 : 1,
        duration: 500
      }).start();
    }
  }

  render() {
    const { text, index, done } = this.props;
    return (
      <Animated.View
        style={[
          styles.rowFront,
          {
            backgroundColor: this.state.color.interpolate({
              inputRange: [0, 1],
              outputRange: [GREYS[index], COLORS[index]]
            }),
            paddingTop: index === 0 ? Constants.statusBarHeight : 0,
            height:
              Constants.itemHeight +
              (index === 0 ? Constants.statusBarHeight : 0)
          }
        ]}
      >
        <Animated.Text
          style={[
            styles.text,
            {
              opacity: this.state.color.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1]
              })
            }
          ]}
        >
          {text}
        </Animated.Text>
      </Animated.View>
    );
  }
}

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.data };
  }

  onRowOpen = key => {
    console.log(key);
    // if (value > Constants.screenWidth / 4 && !this.state.data[key].done) {
      const newData = update(this.state.data, {
        [key]: { done: { $set: true }, disableRightSwipe: { $set: true }}
      });
      this.setState({ data: newData });
    // // }
  };

  render() {
    return (
      <SwipeListView
        style={styles.todolist}
        data={this.state.data}
        renderItem={(data, rowMap) => (
          <Todo {...data.item} index={data.index} />
        )}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <Text style={styles.text}>✔︎</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        leftOpenValue={0.1}
        rightOpenValue={0}
        disableLeftSwipe={true}
        onRowOpen={this.onRowOpen}
      />
    );
  }
}
