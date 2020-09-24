import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import SplashScreen from "react-native-splash-screen";

import { TodoList, Listeners } from "./src/components";
import { ThemeProvider, SettingsProvider } from "./src/hooks";
import { scheduleNotifications } from "./src/util";
import * as Sentry from "@sentry/react-native";

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
  require("./assets/lock.png"),
  require("./assets/more.png"),
  require("./assets/tinylock.png"),
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
    SplashScreen.hide();
  };

  useEffect(() => {
    scheduleNotifications();
    loadAssetsAsync();
  }, []);
  if (!isReady) return null;

  return (
    <SettingsProvider>
      <Listeners>
        <ThemeProvider>
          <Sentry.TouchEventBoundary>
            <TodoList />
          </Sentry.TouchEventBoundary>
        </ThemeProvider>
      </Listeners>
    </SettingsProvider>
  );
};

export default App;
