import React, { createContext, useContext, useState, useEffect } from "react";
import { Store } from "../util";
import { omit } from "underscore";

type Settings = {
  debug?: boolean;
  customTodo?: string;
  addTodo?: boolean;
  hardcore?: boolean;
  hardcorePrice?: string;
  showTutorial?: boolean;
  history?: string[];
  setNumber?: number;
  completionHistory?: { [key: string]: number };
  showIAP?: boolean;
  showThemes?: boolean;
};

type SettingsState = Settings & {
  dispatch: (settings: Settings) => any;
};

const LOCAL_SETTINGS = ["showIAP", "showThemes"];
const KEY = "settings1";

const defaults: Settings = {
  debug: false,
  setNumber: 0,
  customTodo: "",
  completionHistory: {},
  history: [],
  addTodo: false,
  hardcore: false,
  hardcorePrice: "$90",
  showTutorial: true,
  showIAP: false,
  showThemes: false,
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
      Store.save(KEY, omit(s, ...LOCAL_SETTINGS));
      return s;
    });
  };

  useEffect(() => {
    const load = async () => {
      const result = (await Store.get(KEY)) as Settings;
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
