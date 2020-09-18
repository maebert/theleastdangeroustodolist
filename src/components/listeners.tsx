import React, { useState, useEffect } from "react";
import { DeviceMotion } from "expo-sensors";
import { useSettings, useIAP } from "../hooks";
import * as InAppPurchases from "expo-in-app-purchases";

type EEProps = {
  children: React.ReactNode;
};
const EasterEggWrapper = ({ children }: EEProps) => {
  const [debug, setDebug] = useState(0);
  const { dispatch } = useSettings();
  const { listener } = useIAP();

  useEffect(() => {
    console.info("Setting purchase listeer");
    InAppPurchases.setPurchaseListener(listener);

    DeviceMotion.addListener((event) => {
      if (!event.rotation || !event.rotation.beta) return;
      if (debug == 0 && event.rotation.beta <= -1) {
        setDebug(1);
      } else if (debug == 1 && event.rotation.beta >= 0.65) {
        setDebug(2);
        dispatch({ debug: true });
        alert("Super-secret debug mode on");
      } else if (debug == 2 && event.rotation.beta <= -1) {
        setDebug(3);
      } else if (debug == 3 && event.rotation.beta >= 0.65) {
        setDebug(0);
        dispatch({ debug: false });
        alert("Debug mode off");
      }
    });
    return () => DeviceMotion.removeAllListeners();
  }, []);

  return <>{children}</>;
};
export default EasterEggWrapper;
