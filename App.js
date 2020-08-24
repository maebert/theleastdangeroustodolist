import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Asset } from "expo-asset";
import { DeviceMotion } from "expo-sensors";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { TodoList } from "./src/components";
import { ThemeProvider } from "./src/hooks";

const IMAGES = [require("./assets/line1.png"), require("./assets/url.png")];

const FONTS = {
  "Lato Regular": require("./assets/fonts/Lato-Regular.ttf"),
  "Lato Bold": require("./assets/fonts/Lato-Bold.ttf"),
  "Lato Black": require("./assets/fonts/Lato-Black.ttf"),
};

const App = () => {
  const [isReady, setIsReady] = useState(false);
  const [debug, setDebug] = useState(0);

  useEffect(() => {
    DeviceMotion.addListener((event) => {
      if (!event.rotation || !event.rotation.beta) return;
      if (debug == 0 && event.rotation.beta <= -1) {
        setDebug(1);
      } else if (debug == 1 && event.rotation.beta >= 0.65) {
        setDebug(2);
        alert("Super-secret debug mode on");
      } else if (debug == 2 && event.rotation.beta <= -1) {
        setDebug(3);
      } else if (debug == 3 && event.rotation.beta >= 0.65) {
        setDebug(0);
        alert("Debug mode off");
      }
    });
    return () => DeviceMotion.removeAllListeners();
  });

  const _loadAssetsAsync = async () => {
    const imageAssets = IMAGES.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const fontAssets = Font.loadAsync(FONTS);
    await Promise.all([...imageAssets, fontAssets]);
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={_loadAssetsAsync}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }
  return (
    <ThemeProvider>
      <TodoList />
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
