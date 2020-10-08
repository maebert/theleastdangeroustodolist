import React, { createContext, useContext, useState, useEffect } from "react";
import { Store, Constants } from "../util";
import { omit, defaults } from "underscore";

type Settings = {
  debug: boolean;
  customTodo: string;
  addTodo: boolean;
  hardcore: boolean;
  hardcorePrice: string;
  showTutorial: boolean;
  history: string[];
  setNumber: number;
  completionHistory: { [key: string]: number };
  showIAP: boolean;
  showThemes: boolean;
};

type SettingsState = Settings & {
  dispatch: (settings: Partial<Settings>) => any;
  loading: boolean;
};

const LOCAL_SETTINGS = ["showIAP", "showThemes"];
const KEY = `${Constants.namespace}-settings`;

const DEFAULTS: Settings = {
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
  ...DEFAULTS,
  dispatch: () => {},
  loading: true,
});

type UPProps = {
  children: React.ReactNode;
};

const SettingsProvider = ({ children }: UPProps) => {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [loading, setLoading] = useState(true);

  const dispatch = (settings: Partial<Settings>) => {
    setSettings((prev) => {
      const s = { ...prev, ...settings };
      Store.save(KEY, omit(s, ...LOCAL_SETTINGS));
      return s;
    });
  };

  useEffect(() => {
    const load = async () => {
      const result = (await Store.get(KEY)) as Settings;
      setSettings(defaults(result, DEFAULTS));
      setLoading(false);
    };
    load();
  }, []);

  return (
    <SettingsContext.Provider value={{ ...settings, loading, dispatch }}>
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
