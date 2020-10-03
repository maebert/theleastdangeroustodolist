import React, { createContext, useContext, useState, useEffect } from "react";
import { Theme, ThemeDef } from "../types";
import { Store } from "../util";

// Make more themes with colorcurves.app or Colorbox.io

const colors: { [key in Theme]: ThemeDef } = {
  [Theme.Default]: [
    "#493D64",
    "#763D60",
    "#9B3C5B",
    "#B64B5A",
    "#C4785D",
    "#CC8E5F",
  ],
  [Theme.Clear]: [
    "#DA0215",
    "#DE3A17",
    "#E3591A",
    "#E4751C",
    "#E7921C",
    "#E9AF1D",
  ],
  [Theme.Haze]: [
    "#F27281",
    "#DB6F80",
    "#AD6A80",
    "#84657E",
    "#61617E",
    "#375C7D",
  ],
  [Theme.Dark]: [
    "#36494E",
    "#324248",
    "#2F3C43",
    "#2B353D",
    "#272D36",
    "#232731",
  ],
  [Theme.Pride]: [
    "#F13529",
    "#FA9E21",
    "#E9D61D",
    "#2EAE54",
    "#564795",
    "#824492",
  ],
  [Theme.Floss]: [
    "#77CEA2",
    "#6BBCAB",
    "#5FAAB3",
    "#5396BD",
    "#4988C4",
    "#3D75CD",
  ],
  [Theme.Nightvision]: [
    "#275b2d",
    "#296235",
    "#2a6a40",
    "#2b714d",
    "#2c795d",
    "#2c826f",
  ],
  [Theme.Machine]: [
    "#3f3a39",
    "#4b3a3a",
    "#59393d",
    "#683740",
    "#783441",
    "#893041",
  ],
  [Theme.NotOk]: [
    "#B8BE9D",
    "#D9C6A4",
    "#FDCEAB",
    "#FDC1A2",
    "#FF857B",
    "#F57575",
  ],
  [Theme.Greys]: [
    "#707070",
    "#7a7a7a",
    "#808080",
    "#8a8a8a",
    "#909090",
    "#9a9a9a",
  ],
};

type ThemeState = {
  theme: ThemeDef;
  themeName: Theme;
  setTheme: (theme: Theme) => any;
  colors: { [key in Theme]: ThemeDef };
  greys: ThemeDef;
};

const ThemeContext = createContext<ThemeState>({
  theme: colors[Theme.Default],
  themeName: Theme.Default,
  setTheme: (theme: Theme) => {},
  colors,
  greys: colors[Theme.Greys],
});

type UPProps = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: UPProps) => {
  const [theme, setTheme] = useState<Theme>(Theme.Default);

  const setPersistedTheme = async (theme: Theme) => {
    await Store.save("theme", theme);
    setTheme(theme);
  };

  useEffect(() => {
    const load = async () => {
      const theme = await Store.get("theme");
      if (theme) setTheme(theme as Theme);
    };
    load();
  }, []);

  const value = {
    theme: colors[theme],
    themeName: theme,
    setTheme: setPersistedTheme,
    colors,
    greys: colors[Theme.Greys],
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { ThemeProvider, useTheme };
