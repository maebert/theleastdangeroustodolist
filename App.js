import React from "react";
import { StyleSheet, View } from "react-native";
import TodoList from "./src/todolist";
import { Asset } from 'expo-asset';
import { AppLoading } from 'expo';
import * as Font from "expo-font";


const IMAGES = [
  require("./assets/line1.png"),
  require("./assets/url.png")
]

const FONTS = {
  "Lato Regular": require("./assets/fonts/Lato-Regular.ttf"),
  "Lato Bold": require("./assets/fonts/Lato-Bold.ttf"),
  "Lato Black": require("./assets/fonts/Lato-Black.ttf"),
}

class App extends React.Component {
    state = { isReady: false };

    async _loadAssetsAsync() {
        const imageAssets = IMAGES.map(image =>
            Asset.fromModule(image).downloadAsync()
        );
        const fontAssets = Font.loadAsync(FONTS)
        await Promise.all([...imageAssets, fontAssets]);
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
