import React from "react";
import { Dimensions, StyleSheet, Text, View, SafeAreaView } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Data from "./src/data";
import { sampleSize } from "lodash";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const COLORS = [
  "#CC0011FF",
  "#D10013FF",
  "#D42414FF",
  "#D84014FF",
  "#DA5F15FF",
  "#DF7F17FF",
  "#E2A018FF"
];

const ITEMS = 6;

class Todo extends React.Component {
  render() {
    const { text } = this.props;
    return <View></View>;
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SwipeListView
        useFlatList
        style={styles.todolist}
        data={this.props.data}
        renderItem={(data, rowMap) => (
          <View
            key={`front-${data.index}`}
            style={[styles.rowFront, { backgroundColor: COLORS[data.index], height: screenHeight / 6 }]}

          >
            <Text style={styles.text}>{data.item}</Text>
          </View>
        )}
        renderHiddenItem={(data, rowMap) => (
          <View key={`back-${data.index}`} style={styles.rowBack}>
            <Text style={styles.text}>✔︎</Text>
          </View>
        )}
        leftOpenValue={0}
        rightOpenValue={0}
        disableLeftSwipe={true}
      />
    );
  }
}

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList data={sampleSize(Data.basic, 6)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
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
    backgroundColor: 'green'

  },
  text: {
    color: "white",
    fontSize: 24,
  }
});
