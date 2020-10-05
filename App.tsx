import React, { useState, useEffect } from "react";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { TodoList, Listeners } from "./src/components";
import { ThemeProvider, SettingsProvider } from "./src/hooks";
import { scheduleNotifications } from "./src/util";
import * as Sentry from "@sentry/react-native";
import { ScrollView, Text, Button } from "react-native";

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
    const imageAssets = IMAGES.map((image) =>
      Asset.fromModule(image).downloadAsync()
    );
    const fontAssets = Font.loadAsync(FONTS);
    await Promise.all([...imageAssets, fontAssets]);
    setIsReady(true);
  };

  useEffect(() => {
    scheduleNotifications();
    loadAssetsAsync();
  }, []);
  if (!isReady) return null;

  type FCProps = {
    error: string;
    componentStack: string;
    resetError: () => any;
  };

  const fallbackComponent = ({
    error,
    componentStack,
    resetError,
  }: FCProps) => (
    <ScrollView
      style={{
        width: "100%",
        height: "100%",
        paddingHorizontal: 20,
        paddingTop: 60,
      }}
    >
      <Text>This is unfortunate.</Text>
      <Text>{error}</Text>
      <Text>{componentStack}</Text>
      <Button onClick={resetError} title="Try again" />
    </ScrollView>
  );

  return (
    <Sentry.ErrorBoundary onError={console.error} fallback={fallbackComponent}>
      <SettingsProvider>
        <Listeners>
          <ThemeProvider>
            <Sentry.TouchEventBoundary>
              <TodoList />
            </Sentry.TouchEventBoundary>
          </ThemeProvider>
        </Listeners>
      </SettingsProvider>
    </Sentry.ErrorBoundary>
  );
};

export default App;
