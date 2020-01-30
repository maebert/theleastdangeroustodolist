import React from "react";
import { StyleSheet, View } from "react-native";
import TodoList from "./src/todolist";
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';

const IMAGES = [
  require("./assets/line1.png")
]

const FONTS = {
  // "Megrim": require("./assets/fonts/megrim.ttf"),
  // "Quicksand": require("./assets/fonts/Quicksand-Regular.ttf"),
}

class App extends React.Component {
    state = { isReady: false };

    async _loadAssetsAsync() {
        const imageAssets = IMAGES.map(image =>
            Asset.fromModule(image).downloadAsync()
        );
        // const fontAssets = Font.loadAsync(FONTS)
        // await Promise.all([...imageAssets, fontAssets]);
        await Promise.all([...imageAssets]);
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({ isReady: true })}
                    onError={console.warn}
                />
            );
        }
        return <TodoList />;
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
