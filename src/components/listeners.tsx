import React, { useState, useEffect } from "react";
import { DeviceMotion } from "expo-sensors";
import { useSettings, useIAP } from "../hooks";
import {
  purchaseErrorListener,
  purchaseUpdatedListener,
} from "react-native-iap";

type EEProps = {
  children: React.ReactNode;
};
const Listeners = ({ children }: EEProps) => {
  const [debug, setDebug] = useState(0);
  const { dispatch } = useSettings();
  const { init: initIAP, listener, errorListener } = useIAP();

  useEffect(() => {
    console.debug("Setting purchase listener");
    initIAP();
    const iapListener = purchaseUpdatedListener(listener);
    const iapErrorListener = purchaseErrorListener(errorListener);

    console.debug("Setting Device Motion listener");
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
    // throw "Whaaat?";
    console.debug("Listener all set up");

    return () => {
      DeviceMotion.removeAllListeners();
      if (iapListener) iapListener.remove();
      if (iapErrorListener) iapErrorListener.remove();
    };
  }, []);

  return <>{children}</>;
};
export default Listeners;
