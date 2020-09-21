import React, { useEffect, useState } from "react";
import RNIap, {
  PurchaseError,
  finishTransaction,
  InAppPurchase,
} from "react-native-iap";
import { Alert } from "react-native";
import { useSettings } from "./settings";
const IAPItems = ["hardcore"];

const useIap = () => {
  const { hardcore, dispatch } = useSettings();
  const [price, setPrice] = useState("");

  const getPrice = () => {
    return price;
  };

  const restorePurchases = async () => {
    const purchases = await RNIap.getAvailablePurchases();
    purchases.forEach((purchase) => {
      if (purchase.productId === "hardcore") {
        console.info("Restoring hardcore mode");
        Alert.alert("Restore successful", "You're so hardcore again.");
        dispatch({ hardcore: true });
      }
    });
  };

  const getItems = async () => {
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
      console.warn(err.code, err.message);
    }
  };

  const purchase = async (item: string) => {
    console.info("Purchasing...");
    try {
      RNIap.requestPurchase(item);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  };

  const listener = async (purchase: InAppPurchase) => {
    console.log("purchaseUpdatedListener", purchase);
    const receipt = purchase.transactionReceipt;
    if (receipt) {
      dispatch({ hardcore: true });
      try {
        const ackResult = await finishTransaction(purchase);
        console.log("ackResult", ackResult);
      } catch (ackErr) {
        console.warn("ackErr", ackErr);
      }
    }
  };

  const errorListener = (error: PurchaseError) => {
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
