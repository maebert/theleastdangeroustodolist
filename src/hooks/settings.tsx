import React, { createContext, useContext, useState, useEffect } from "react";
import { Store } from "../util";

type Settings = {
  debug?: boolean;
  customTodo?: string;
  addTodo?: boolean;
  hardcore?: boolean;
  hardcorePrice?: string;
  showTutorial?: boolean;
  history?: string[];
};

type SettingsState = Settings & {
  dispatch: (settings: Settings) => any;
};

const defaults: Settings = {
  debug: false,
  customTodo: "",
  history: [],
  addTodo: false,
  hardcore: false,
  hardcorePrice: "$90",
  showTutorial: true,
};

const SettingsContext = createContext<SettingsState>({
  ...defaults,
  dispatch: () => {},
});

type UPProps = {
  children: React.ReactNode;
};

const SettingsProvider = ({ children }: UPProps) => {
  const [settings, setSettings] = useState<Settings>(defaults);

  const dispatch = (settings: Settings) => {
    setSettings((prev) => {
      const s = { ...prev, ...settings };
      Store.save("settings", s);
      return s;
    });
  };

  useEffect(() => {
    const load = async () => {
      const result = (await Store.get("settings")) as Settings;
      setSettings(result);
    };
    load();
  }, []);

  return (
    <SettingsContext.Provider value={{ ...settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export { SettingsProvider, useSettings };
