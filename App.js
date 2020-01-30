import React from "react";
import { StyleSheet, View } from "react-native";
import Data from "./src/data";
import { sampleSize, range, keyBy } from "lodash";
import TodoList from "./src/todo";

const getTodos = (pack, n) => {
  return sampleSize(range(Data[pack].length), n).map(i => ({
    index: i,
    text: Data[pack][i],
    done: false,
    pack: pack
  }));
};

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList data={getTodos("basic", 6)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  }
});
