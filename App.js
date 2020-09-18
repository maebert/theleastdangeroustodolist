import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { TodoList, Listeners } from "./src/components";
import { ThemeProvider, SettingsProvider } from "./src/hooks";

const IMAGES = [
  require("./assets/line1.png"),
  require("./assets/url.png"),
  require("./assets/crown.png"),
  require("./assets/fuckyeah.png"),
  require("./assets/tinycrown.png"),
  require("./assets/cancel.png"),
  require("./assets/palette.png"),
  require("./assets/pen.png"),
  require("./assets/pen2.png"),
  require("./assets/dollar.png"),
];

const FONTS = {
  "Lato Regular": require("./assets/fonts/Lato-Regular.ttf"),
  "Lato Bold": require("./assets/fonts/Lato-Bold.ttf"),
  "Lato Black": require("./assets/fonts/Lato-Black.ttf"),
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

  const loadAssetsAsync = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (e) {}

    const imageAssets = IMAGES.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const fontAssets = Font.loadAsync(FONTS);
    await Promise.all([...imageAssets, fontAssets]);
    setIsReady(true);
  };

  useEffect(() => {
    loadAssetsAsync();
  }, []);

  if (!isReady) return null;

  return (
    <SettingsProvider>
      <Listeners>
        <ThemeProvider>
          <TodoList />
        </ThemeProvider>
      </Listeners>
    </SettingsProvider>
  );
};

export default App;
