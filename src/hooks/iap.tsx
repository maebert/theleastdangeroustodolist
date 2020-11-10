import React, { useState } from "react";
import RNIap, {
  PurchaseError,
  finishTransaction,
  InAppPurchase,
} from "react-native-iap";
import { Alert } from "react-native";
import DeviceInfo from "react-native-device-info";
import { useSettings } from "./settings";
import { AsyncAlert } from "../util";
const IAPItems = ["hardcore"];

const useIap = () => {
  const { dispatch } = useSettings();
  const [price, setPrice] = useState("");

  const getPrice = () => {
    return price;
  };

  const restorePurchases = async () => {
    if (DeviceInfo.isEmulatorSync()) {
      await AsyncAlert(
        "Can't restore purchases on the iOS Simulator",
        "Please use a real device to test In-App Purchases"
      );
      return;
    }
    console.info("Trying to restore purchases");
    const purchases = await RNIap.getAvailablePurchases();
    console.info(`getAvailablePurchases returned ${purchases}`);
    if (!purchases) return;
    purchases.forEach((purchase) => {
      if (purchase.productId === "hardcore") {
        console.info("Restoring hardcore mode");
        dispatch({ hardcore: true });
        Alert.alert("Restore successful", "You're so hardcore again.");
      }
    });
  };

  const getItems = async () => {
    if (DeviceInfo.isEmulatorSync()) {
      console.info("Skip getting products on emulator");
      return;
    }
    console.log("Get price for IAP");
    try {
      const products = await RNIap.getProducts(IAPItems);
      console.log("Products", products);
      products.forEach((product) => {
        if (product.productId === "hardcore") {
          console.info(`Price for hardcore: ${product.localizedPrice}`);
          dispatch({ hardcorePrice: product.localizedPrice });
          setPrice(product.localizedPrice);
        }
      });
    } catch (err) {
      console.warn(`Couldn't get products: ${err}`);
    }
  };

  const purchase = async (item: string): Promise<boolean> => {
    if (DeviceInfo.isEmulatorSync()) {
      await AsyncAlert(
        "Can't buy stuff on the iOS Simulator",
        "Please use a real device to test In-App Purchases"
      );
      return false;
    } else {
      console.info("Purchasing...");
      try {
        await RNIap.requestPurchase(item);
        return true;
      } catch (err) {
        console.warn(err.code, err.message);
        return false;
      }
    }
  };

  const listener = async (purchase: InAppPurchase) => {
    console.log("purchaseUpdatedListener", purchase);
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      try {
        const ackResult = await finishTransaction(purchase);
        console.log("ackResult", ackResult);
        dispatch({ hardcore: true });
      } catch (ackErr) {
        console.warn("ackErr", ackErr);
      }
    }
  };

  const errorListener = async (error: PurchaseError) => {
    console.warn("purchaseErrorListener", error);
    if (error.code === "E_USER_ERRO") {
      Alert.alert("Never mind then.", "You chickened out, didn't you?");
    } else {
      Alert.alert("Hmmmm...", error.message);
    }
  };

  const init = async () => {
    console.log("initing IAP");
    try {
      await RNIap.initConnection();
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
      await getItems();
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  return {
    getPrice,
    price,
    init,
    purchase,
    listener,
    errorListener,
    restorePurchases,
  };
};

export default useIap;
