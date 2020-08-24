import * as StoreReview from "expo-store-review";

export { default as Constants } from "./constants";
export { default as Store } from "./store";
export { default as Analytics } from "./analytics";

const requestReview = async () => {
  const status = StoreReview.isAvailableAsync();
  if (status) StoreReview.requestReview();
};

export const handleAction = (action: string) => {
  action = action.replace("tldtdl://", "");
  if (action === "review") requestReview();
};
