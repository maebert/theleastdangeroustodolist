import React, { useEffect, useState } from "react";
import * as InAppPurchases from "expo-in-app-purchases";
import { useSettings } from "./settings";
const IAPItems = ["hardcore"];

const useIap = () => {
  const { hardcore, dispatch } = useSettings();
  const [price, setPrice] = useState();

  const restorePurchases = async () => {
    const {
      responseCode,
      results,
    } = await InAppPurchases.getPurchaseHistoryAsync();
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      (results as InAppPurchases.InAppPurchase[]).forEach((purchase) => {
        if (purchase.productId === "hardcore" && purchase.acknowledged) {
          console.info("Hardcore previously purchased");
          dispatch({ hardcore: true });
        }
      });
    }
  };

  const getItems = async () => {
    try {
      await InAppPurchases.connectAsync();
    } catch (error) {}

    const items = await InAppPurchases.getProductsAsync(IAPItems);
    if (items.responseCode === 0 && items.results) {
      setPrice(items.results[0].price);
    }
  };
  const purchase = async (item: string) => {
    console.info("Purchasing...");
    InAppPurchases.purchaseItemAsync("hardcore");
  };

  const listener = ({
    responseCode,
    results,
    errorCode,
  }: InAppPurchases.IAPQueryResponse) => {
    // Purchase was successful
    if (responseCode === InAppPurchases.IAPResponseCode.OK) {
      (results as InAppPurchases.InAppPurchase[]).forEach((purchase) => {
        if (purchase.productId === "hardcore" && !purchase.acknowledged) {
          console.log(`Successfully purchased ${purchase.productId}`);
          dispatch({ hardcore: true });
          InAppPurchases.finishTransactionAsync(purchase, true);
        }
      });
    }

    // Else find out what went wrong
    if (responseCode === InAppPurchases.IAPResponseCode.USER_CANCELED) {
      console.log("User canceled the transaction");
    } else if (responseCode === InAppPurchases.IAPResponseCode.DEFERRED) {
      console.log(
        "User does not have permissions to buy but requested parental approval (iOS only)"
      );
    } else {
      console.warn(
        `Something went wrong with the purchase. Received errorCode ${errorCode}`
      );
    }
  };

  useEffect(() => {
    if (!price) getItems();
  }, [price]);

  return { price, purchase, listener, restorePurchases };
};

export default useIap;
