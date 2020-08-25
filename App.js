import React, { useState } from "react";
import { Asset } from "expo-asset";
import { AppLoading } from "expo";
import * as Font from "expo-font";

import { TodoList, EasterEggWrapper } from "./src/components";
import { ThemeProvider, SettingsProvider } from "./src/hooks";

const IMAGES = [require("./assets/line1.png"), require("./assets/url.png")];

const FONTS = {
  "Lato Regular": require("./assets/fonts/Lato-Regular.ttf"),
  "Lato Bold": require("./assets/fonts/Lato-Bold.ttf"),
  "Lato Black": require("./assets/fonts/Lato-Black.ttf"),
};

const App = () => {
  const [isReady, setIsReady] = useState(false);

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
    <SettingsProvider>
      <ThemeProvider>
        <EasterEggWrapper>
          <TodoList />
        </EasterEggWrapper>
      </ThemeProvider>
    </SettingsProvider>
  );
};

export default App;
